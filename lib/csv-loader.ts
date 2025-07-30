import Papa from 'papaparse';
import { VahanData, IdspData, PopulationData, AqiData } from '@/types/data';

// Cache for parsed data to avoid re-parsing
const dataCache = new Map<string, any[]>();

// Configuration for Papa Parse with optimized settings
const PAPA_CONFIG: Papa.ParseConfig = {
  header: true,
  skipEmptyLines: true,
  transformHeader: (header: string) => header.trim().toLowerCase().replace(/\s+/g, '_'),
  dynamicTyping: true, // Automatically convert numbers
};

export class CSVLoader {
  private static async loadCSVWithRetry(filePath: string, maxRetries = 3): Promise<string> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(filePath, {
          method: 'GET',
          headers: {
            'Cache-Control': 'max-age=3600', // Cache for 1 hour
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const text = await response.text();
        
        // Validate that we got actual CSV content
        if (!text.trim() || text.trim().length < 10) {
          throw new Error('Empty or invalid CSV content');
        }
        
        return text;
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        console.warn(`Attempt ${attempt} failed for ${filePath}:`, lastError.message);
        
        if (attempt < maxRetries) {
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }
    
    throw new Error(`Failed to load ${filePath} after ${maxRetries} attempts: ${lastError?.message}`);
  }

  private static parseCSVWithCache<T>(
    csvContent: string, 
    transformer: (row: any) => T | null,
    cacheKey: string
  ): T[] {
    // Check cache first
    if (dataCache.has(cacheKey)) {
      return dataCache.get(cacheKey) as T[];
    }
    
    if (!csvContent.trim()) {
      return [];
    }
    
    try {
      const result = Papa.parse(csvContent, PAPA_CONFIG);
      
      if (result.errors.length > 0) {
        console.warn('CSV parsing warnings:', result.errors);
      }
      
      const transformedData = result.data
        .map(transformer)
        .filter((item): item is T => item !== null);
      
      // Cache the result
      dataCache.set(cacheKey, transformedData);
      
      return transformedData;
    } catch (error) {
      console.error('Error parsing CSV:', error);
      return [];
    }
  }

  private static transformVahanData(row: any): VahanData | null {
    try {
      // Validate required fields
      if (!row.year || !row.month || !row.value) {
        return null;
      }
      
      const year = parseInt(row.year);
      const month = parseInt(row.month);
      const value = parseFloat(row.value);
      
      if (isNaN(year) || isNaN(month) || isNaN(value) || value < 0) {
        return null;
      }

      // Validate month range
      if (month < 1 || month > 12) {
        return null;
      }

      return {
        state: String(row.state || '').trim(),
        district: String(row.district || '').trim(),
        vehicle_class: String(row.vehicle_class || '').trim(),
        fuel: String(row.fuel || '').trim(),
        year,
        month,
        value,
      };
    } catch {
      return null;
    }
  }

  private static transformIdspData(row: any): IdspData | null {
    try {
      // Validate required fields
      if (!row.outbreak_starting_date || !row.reporting_date) {
        return null;
      }
      
      const cases = parseInt(row.cases) || 0;
      const deaths = parseInt(row.deaths) || 0;
      
      const outbreakDate = new Date(row.outbreak_starting_date);
      const reportingDate = new Date(row.reporting_date);
      
      if (isNaN(outbreakDate.getTime()) || isNaN(reportingDate.getTime())) {
        return null;
      }

      // Validate date logic
      if (outbreakDate > reportingDate) {
        return null;
      }

      return {
        state: String(row.state || '').trim(),
        district: String(row.district || '').trim(),
        disease_illness_name: String(row.disease_illness_name || '').trim(),
        outbreak_starting_date: outbreakDate,
        reporting_date: reportingDate,
        cases: Math.max(0, cases),
        deaths: Math.max(0, deaths),
        status: String(row.status || '').trim(),
      };
    } catch {
      return null;
    }
  }

  private static transformPopulationData(row: any): PopulationData | null {
    try {
      // Validate required fields
      if (!row.year || !row.value) {
        return null;
      }
      
      const year = parseInt(row.year);
      const value = parseFloat(row.value);
      
      if (isNaN(year) || isNaN(value) || value < 0) {
        return null;
      }

      // Validate year range (reasonable range for population data)
      if (year < 1900 || year > 2100) {
        return null;
      }

      return {
        state: String(row.state || '').trim(),
        district: String(row.district || '').trim(),
        gender: String(row.gender || '').trim(),
        year,
        value,
      };
    } catch {
      return null;
    }
  }

  private static transformAqiData(row: any): AqiData | null {
    try {
      // Validate required fields
      if (!row.aqi_value || !row.date) {
        return null;
      }
      
      const aqiValue = parseFloat(row.aqi_value);
      const monitoringStations = parseInt(row.number_of_monitoring_stations) || 0;
      const date = new Date(row.date);
      
      if (isNaN(aqiValue) || isNaN(date.getTime()) || aqiValue < 0) {
        return null;
      }

      // Validate AQI range (typical range is 0-500)
      if (aqiValue > 1000) {
        return null;
      }

      return {
        state: String(row.state || '').trim(),
        area: String(row.area || '').trim(),
        date,
        aqi_value: aqiValue,
        air_quality_status: String(row.air_quality_status || '').trim(),
        prominent_pollutants: String(row.prominent_pollutants || '').trim(),
        number_of_monitoring_stations: Math.max(0, monitoringStations),
      };
    } catch {
      return null;
    }
  }

  static async loadAllData() {
    const startTime = performance.now();
    
    try {
      console.log('Starting CSV data loading...');
      
      // Load all CSV files in parallel with progress tracking
      const loadPromises = [
        this.loadCSVWithRetry('/data/vahan.csv').then(csv => ({
          type: 'vahan',
          data: this.parseCSVWithCache(csv, this.transformVahanData, 'vahan')
        })),
        this.loadCSVWithRetry('/data/idsp.csv').then(csv => ({
          type: 'idsp',
          data: this.parseCSVWithCache(csv, this.transformIdspData, 'idsp')
        })),
        this.loadCSVWithRetry('/data/population_projection.csv').then(csv => ({
          type: 'population',
          data: this.parseCSVWithCache(csv, this.transformPopulationData, 'population')
        })),
        this.loadCSVWithRetry('/data/aqi.csv').then(csv => ({
          type: 'aqi',
          data: this.parseCSVWithCache(csv, this.transformAqiData, 'aqi')
        }))
      ];

      const results = await Promise.allSettled(loadPromises);
      
      const data: any = {
        vahan: [],
        idsp: [],
        population: [],
        aqi: [],
      };

      // Process results and handle partial failures
      results.forEach((result, index) => {
        const fileTypes = ['vahan', 'idsp', 'population', 'aqi'];
        const fileType = fileTypes[index];
        
        if (result.status === 'fulfilled') {
          data[fileType] = result.value.data;
          console.log(`✓ Loaded ${fileType}: ${result.value.data.length} records`);
        } else {
          console.error(`✗ Failed to load ${fileType}:`, result.reason);
          // Keep empty array as fallback
        }
      });

      const endTime = performance.now();
      console.log(`Data loading completed in ${(endTime - startTime).toFixed(2)}ms`);
      
      // Log summary statistics
      console.log('Data Summary:', {
        vahan: data.vahan.length,
        idsp: data.idsp.length,
        population: data.population.length,
        aqi: data.aqi.length,
        totalRecords: data.vahan.length + data.idsp.length + data.population.length + data.aqi.length
      });

      return data;
    } catch (error) {
      console.error('Critical error loading CSV data:', error);
      // Return empty arrays as fallback
      return {
        vahan: [],
        idsp: [],
        population: [],
        aqi: [],
      };
    }
  }

  // Method to clear cache if needed
  static clearCache() {
    dataCache.clear();
    console.log('CSV data cache cleared');
  }

  // Method to get cache statistics
  static getCacheStats() {
    return {
      size: dataCache.size,
      keys: Array.from(dataCache.keys()),
    };
  }
}