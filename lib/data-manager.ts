import { VahanData, IdspData, PopulationData, AqiData } from '@/types/data';
import { CSVLoader } from './csv-loader';

export interface DataStats {
  mean: number;
  median: number;
  min: number;
  max: number;
  stdDev: number;
  count: number;
}

export interface ColumnInfo {
  name: string;
  type: 'categorical' | 'numeric' | 'date' | 'text';
  uniqueValues?: string[];
  stats?: DataStats;
}

export class DataManager {
  private static instance: DataManager;
  private vahanData: VahanData[] = [];
  private idspData: IdspData[] = [];
  private populationData: PopulationData[] = [];
  private aqiData: AqiData[] = [];
  private isLoaded = false;
  private isLoading = false;
  private loadPromise: Promise<void> | null = null;

  static getInstance(): DataManager {
    if (!DataManager.instance) {
      DataManager.instance = new DataManager();
    }
    return DataManager.instance;
  }

  async loadAllData(): Promise<void> {
    // If already loaded, return immediately
    if (this.isLoaded) return;
    
    // If currently loading, return the existing promise
    if (this.isLoading && this.loadPromise) {
      return this.loadPromise;
    }

    // Start loading
    this.isLoading = true;
    this.loadPromise = this.performLoad();
    
    try {
      await this.loadPromise;
    } finally {
      this.isLoading = false;
      this.loadPromise = null;
    }
  }

  private async performLoad(): Promise<void> {
    try {
      console.log('DataManager: Starting data load...');
      const startTime = performance.now();
      
      // Use the optimized CSV loader with timeout
      const loadPromise = CSVLoader.loadAllData();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Data loading timeout')), 30000) // 30 second timeout
      );
      
      const data = await Promise.race([loadPromise, timeoutPromise]) as any;
      
      this.vahanData = data.vahan || [];
      this.idspData = data.idsp || [];
      this.populationData = data.population || [];
      this.aqiData = data.aqi || [];

      this.isLoaded = true;
      
      const endTime = performance.now();
      console.log(`DataManager: Data loaded successfully in ${(endTime - startTime).toFixed(2)}ms:`, {
        vahan: this.vahanData.length,
        idsp: this.idspData.length,
        population: this.populationData.length,
        aqi: this.aqiData.length,
        totalRecords: this.vahanData.length + this.idspData.length + this.populationData.length + this.aqiData.length
      });
      
      // If no data was loaded, use mock data
      if (this.vahanData.length === 0 && this.idspData.length === 0 && 
          this.populationData.length === 0 && this.aqiData.length === 0) {
        console.warn('DataManager: No data loaded, using mock data as fallback');
        this.loadMockData();
      }
    } catch (error) {
      console.error('DataManager: Error loading data:', error);
      // Use fallback mock data
      this.loadMockData();
    }
  }

  private loadMockData(): void {
    console.log('DataManager: Loading mock data as fallback...');
    
    // Enhanced mock data with more realistic patterns
    this.vahanData = [
      { state: 'Maharashtra', district: 'Mumbai', vehicle_class: 'Car', fuel: 'Petrol', year: 2023, month: 1, value: 15000 },
      { state: 'Maharashtra', district: 'Mumbai', vehicle_class: 'Motorcycle', fuel: 'Petrol', year: 2023, month: 1, value: 25000 },
      { state: 'Maharashtra', district: 'Pune', vehicle_class: 'Car', fuel: 'Diesel', year: 2023, month: 1, value: 8000 },
      { state: 'Delhi', district: 'New Delhi', vehicle_class: 'Car', fuel: 'CNG', year: 2023, month: 1, value: 12000 },
      { state: 'Karnataka', district: 'Bangalore', vehicle_class: 'Bus', fuel: 'Diesel', year: 2023, month: 2, value: 800 },
      { state: 'Tamil Nadu', district: 'Chennai', vehicle_class: 'Truck', fuel: 'Diesel', year: 2023, month: 2, value: 1200 },
    ];

    this.idspData = [
      { 
        state: 'Maharashtra', district: 'Mumbai', disease_illness_name: 'Dengue', 
        outbreak_starting_date: new Date('2023-01-15'), reporting_date: new Date('2023-01-20'), 
        cases: 150, deaths: 2, status: 'Active' 
      },
      { 
        state: 'Delhi', district: 'New Delhi', disease_illness_name: 'Malaria', 
        outbreak_starting_date: new Date('2023-02-01'), reporting_date: new Date('2023-02-05'), 
        cases: 89, deaths: 1, status: 'Controlled' 
      },
    ];

    this.populationData = [
      { state: 'Maharashtra', district: 'Mumbai', gender: 'Male', year: 2023, value: 6200000 },
      { state: 'Maharashtra', district: 'Mumbai', gender: 'Female', year: 2023, value: 5800000 },
      { state: 'Delhi', district: 'New Delhi', gender: 'Male', year: 2023, value: 8900000 },
      { state: 'Delhi', district: 'New Delhi', gender: 'Female', year: 2023, value: 8100000 },
    ];

    this.aqiData = [
      { 
        state: 'Maharashtra', area: 'Mumbai Central', date: new Date('2023-01-15'), 
        aqi_value: 156, air_quality_status: 'Moderate', prominent_pollutants: 'PM2.5, NO2', 
        number_of_monitoring_stations: 5 
      },
      { 
        state: 'Delhi', area: 'Connaught Place', date: new Date('2023-01-15'), 
        aqi_value: 289, air_quality_status: 'Poor', prominent_pollutants: 'PM2.5, PM10', 
        number_of_monitoring_stations: 8 
      },
    ];

    this.isLoaded = true;
    console.log('DataManager: Mock data loaded successfully');
  }

  // Data access methods with validation
  getVahanData(): VahanData[] { 
    if (!this.isLoaded) {
      console.warn('DataManager: Data not loaded yet, returning empty array');
      return [];
    }
    return this.vahanData; 
  }
  
  getIdspData(): IdspData[] { 
    if (!this.isLoaded) {
      console.warn('DataManager: Data not loaded yet, returning empty array');
      return [];
    }
    return this.idspData; 
  }
  
  getPopulationData(): PopulationData[] { 
    if (!this.isLoaded) {
      console.warn('DataManager: Data not loaded yet, returning empty array');
      return [];
    }
    return this.populationData; 
  }
  
  getAqiData(): AqiData[] { 
    if (!this.isLoaded) {
      console.warn('DataManager: Data not loaded yet, returning empty array');
      return [];
    }
    return this.aqiData; 
  }

  // Check if data is loaded
  isDataLoaded(): boolean {
    return this.isLoaded;
  }

  // Get loading status
  getLoadingStatus(): { isLoading: boolean; isLoaded: boolean } {
    return { isLoading: this.isLoading, isLoaded: this.isLoaded };
  }

  // Clear cache and reload data
  async reloadData(): Promise<void> {
    console.log('DataManager: Reloading data...');
    this.isLoaded = false;
    this.isLoading = false;
    this.loadPromise = null;
    CSVLoader.clearCache();
    await this.loadAllData();
  }

  // Statistical analysis methods with performance optimizations
  calculateStats(values: number[]): DataStats {
    if (values.length === 0) {
      return { mean: 0, median: 0, min: 0, max: 0, stdDev: 0, count: 0 };
    }

    // Use more efficient calculation for large datasets
    const sorted = [...values].sort((a, b) => a - b);
    const sum = values.reduce((acc, val) => acc + val, 0);
    const mean = sum / values.length;
    
    const median = sorted.length % 2 === 0 
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];
    
    // Use more efficient variance calculation
    const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);

    return {
      mean,
      median,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      stdDev,
      count: values.length,
    };
  }

  getUniqueValues<T>(data: T[], key: keyof T): string[] {
    const uniqueSet = new Set<string>();
    for (const item of data) {
      const value = String(item[key]);
      if (value && value.trim()) {
        uniqueSet.add(value.trim());
      }
    }
    return Array.from(uniqueSet).sort();
  }

  getUniqueNumbers<T>(data: T[], key: keyof T): number[] {
    const uniqueSet = new Set<number>();
    for (const item of data) {
      const value = Number(item[key]);
      if (!isNaN(value)) {
        uniqueSet.add(value);
      }
    }
    return Array.from(uniqueSet).sort((a, b) => a - b);
  }

  // Correlation analysis with validation
  calculateCorrelation(x: number[], y: number[]): number {
    if (x.length !== y.length || x.length === 0) return 0;

    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);

    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

    return denominator === 0 ? 0 : numerator / denominator;
  }

  // Anomaly detection with configurable threshold
  detectAnomalies(values: number[], threshold: number = 2): number[] {
    if (values.length === 0) return [];
    
    const stats = this.calculateStats(values);
    const thresholdValue = threshold * stats.stdDev;
    
    return values.filter(value => 
      Math.abs(value - stats.mean) > thresholdValue
    );
  }

  // Get data summary for performance monitoring
  getDataSummary(): {
    totalRecords: number;
    vahanCount: number;
    idspCount: number;
    populationCount: number;
    aqiCount: number;
    isLoaded: boolean;
    isLoading: boolean;
  } {
    return {
      totalRecords: this.vahanData.length + this.idspData.length + this.populationData.length + this.aqiData.length,
      vahanCount: this.vahanData.length,
      idspCount: this.idspData.length,
      populationCount: this.populationData.length,
      aqiCount: this.aqiData.length,
      isLoaded: this.isLoaded,
      isLoading: this.isLoading,
    };
  }
}