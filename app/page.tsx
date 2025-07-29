'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FilterSidebar } from '@/components/dashboard/FilterSidebar';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { AIInsights } from '@/components/dashboard/AIInsights';
import { DataSummary } from '@/components/dashboard/DataSummary';
import { useEnhancedDataAnalysis } from '@/hooks/useEnhancedDataAnalysis';
import { 
  Car, 
  Activity, 
  Users, 
  Wind, 
  AlertTriangle,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Brain,
  Database,
  Download,
  RefreshCw,
  Settings,
  Eye,
  Target
} from 'lucide-react';

export default function Dashboard() {
  const { 
    data, 
    rawData, 
    filters, 
    setFilters, 
    availableOptions, 
    analytics, 
    insights,
    dataSummary,
    refreshInsights,
    isLoading, 
    error 
  } = useEnhancedDataAnalysis();

  const [activeTab, setActiveTab] = useState('overview');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold mb-2">Loading Data...</h2>
          <p className="text-gray-400">Processing CSV files and generating insights</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2 text-red-400">Error Loading Data</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-blue-600 hover:bg-blue-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="flex">
        <FilterSidebar
          filters={filters}
          onFiltersChange={setFilters}
          availableOptions={availableOptions}
        />
        
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  AI-Powered Data Intelligence Platform
                </h1>
                <p className="text-white/80 text-lg">
                  Advanced analytics for Vehicle, Health, Population, and Air Quality data
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50 hover:text-white">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" size="sm" className="bg-gray-800/50 border-gray-600 text-white hover:bg-gray-700/50 hover:text-white">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-gray-900/80 border border-gray-700/50 backdrop-blur-sm">
                <TabsTrigger value="overview" className="flex items-center gap-2 text-white data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-300">
                  <Eye className="w-4 h-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="deep-dive" className="flex items-center gap-2 text-white data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-300">
                  <BarChart3 className="w-4 h-4" />
                  Deep Dive
                </TabsTrigger>
                <TabsTrigger value="ai-insights" className="flex items-center gap-2 text-white data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-300">
                  <Brain className="w-4 h-4" />
                  AI Insights
                </TabsTrigger>
                <TabsTrigger value="data-summary" className="flex items-center gap-2 text-white data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-300">
                  <Database className="w-4 h-4" />
                  Data Summary
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8 mt-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  <MetricCard
                    title="Total Vehicles"
                    value={analytics.totalVehicles}
                    icon={<Car className="w-6 h-6" />}
                    gradient="from-blue-500/20 to-cyan-500/20"
                    change={12.5}
                    changeLabel="vs last month"
                  />
                  <MetricCard
                    title="Disease Cases"
                    value={analytics.totalCases}
                    icon={<Activity className="w-6 h-6" />}
                    gradient="from-red-500/20 to-pink-500/20"
                    change={-8.2}
                    changeLabel="vs last month"
                  />
                  <MetricCard
                    title="Total Deaths"
                    value={analytics.totalDeaths}
                    icon={<AlertTriangle className="w-6 h-6" />}
                    gradient="from-orange-500/20 to-red-500/20"
                    change={-15.3}
                    changeLabel="vs last month"
                  />
                  <MetricCard
                    title="Avg AQI"
                    value={analytics.avgAqi}
                    icon={<Wind className="w-6 h-6" />}
                    gradient="from-green-500/20 to-emerald-500/20"
                    change={5.7}
                    changeLabel="vs last month"
                  />
                  <MetricCard
                    title="Population"
                    value={`${(analytics.totalPopulation / 1000000).toFixed(1)}M`}
                    icon={<Users className="w-6 h-6" />}
                    gradient="from-purple-500/20 to-indigo-500/20"
                    change={2.1}
                    changeLabel="vs last year"
                  />
                </div>

                {/* Data Summary Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Vehicle Distribution by Class
                    </h3>
                    <div className="space-y-3">
                      {analytics.vehicleByClass?.slice(0, 5).map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-white/80">{item.name}</span>
                          <span className="text-white font-semibold">{item.value.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <PieChartIcon className="w-5 h-5" />
                      Air Quality Status Distribution
                    </h3>
                    <div className="space-y-3">
                      {analytics.aqiByStatus?.slice(0, 5).map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-white/80">{item.name}</span>
                          <span className="text-white font-semibold">{item.value.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Disease Cases by State
                    </h3>
                    <div className="space-y-3">
                      {analytics.diseasesByState?.slice(0, 5).map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-white/80">{item.name}</span>
                          <span className="text-white font-semibold">{item.value.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Vehicle Registration Trends
                    </h3>
                    <div className="space-y-3">
                      {data.vahan?.slice(0, 5).map((item, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-white/80">{`${item.year}-${item.month.toString().padStart(2, '0')}`}</span>
                          <span className="text-white font-semibold">{item.value.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Deep Dive Tab */}
              <TabsContent value="deep-dive" className="space-y-8 mt-8">
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-2">Advanced Analytics</h3>
                  <p className="text-gray-400">Interactive charts and visualizations coming soon!</p>
                </div>
              </TabsContent>

              {/* AI Insights Tab */}
              <TabsContent value="ai-insights" className="mt-8">
                <AIInsights insights={insights} onRefresh={refreshInsights} />
              </TabsContent>

              {/* Data Summary Tab */}
              <TabsContent value="data-summary" className="mt-8">
                <DataSummary summary={dataSummary} />
              </TabsContent>
            </Tabs>
          </div>

          {/* Strategic Recommendations - Always visible at bottom */}
          <div className="mt-12 bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-green-400" />
              Strategic Recommendations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-blue-400">Environmental Action</h3>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">Increase monitoring stations in high AQI areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">Promote electric vehicle adoption in urban centers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">Implement stricter emission standards</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-purple-400">Health Interventions</h3>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">Deploy targeted health programs in disease hotspots</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">Enhance early warning systems for outbreaks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">Strengthen healthcare infrastructure in vulnerable areas</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-cyan-400">Policy & Planning</h3>
                <ul className="space-y-2 text-white/80">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">Develop integrated urban planning strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-teal-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">Create cross-sector data sharing protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm">Implement predictive analytics for resource allocation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}