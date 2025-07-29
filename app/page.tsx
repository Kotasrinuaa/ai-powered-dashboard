'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Car, 
  Activity, 
  Users, 
  Wind, 
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Brain,
  Database,
  Download,
  Settings,
  Eye,
  Target
} from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <main className="p-8">
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
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <Car className="w-8 h-8 text-blue-400" />
              <span className="text-sm text-green-400">+12.5%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">2.4M</h3>
            <p className="text-gray-400 text-sm">Total Vehicles</p>
          </div>
          
          <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-red-400" />
              <span className="text-sm text-red-400">-8.2%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">156K</h3>
            <p className="text-gray-400 text-sm">Disease Cases</p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <AlertTriangle className="w-8 h-8 text-orange-400" />
              <span className="text-sm text-green-400">-15.3%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">2.1K</h3>
            <p className="text-gray-400 text-sm">Total Deaths</p>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <Wind className="w-8 h-8 text-green-400" />
              <span className="text-sm text-yellow-400">+5.7%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">142</h3>
            <p className="text-gray-400 text-sm">Avg AQI</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-purple-400" />
              <span className="text-sm text-green-400">+2.1%</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">1.4B</h3>
            <p className="text-gray-400 text-sm">Population</p>
          </div>
        </div>

        {/* Data Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Vehicle Distribution by Class
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Two Wheeler</span>
                <span className="text-white font-semibold">1,200,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Car</span>
                <span className="text-white font-semibold">800,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Bus</span>
                <span className="text-white font-semibold">150,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Truck</span>
                <span className="text-white font-semibold">200,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Others</span>
                <span className="text-white font-semibold">50,000</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Air Quality Status Distribution
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white/80">Good</span>
                <span className="text-white font-semibold">45%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Moderate</span>
                <span className="text-white font-semibold">30%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Poor</span>
                <span className="text-white font-semibold">15%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/80">Very Poor</span>
                <span className="text-white font-semibold">10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Strategic Recommendations */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
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

        {/* Coming Soon Section */}
        <div className="mt-8 text-center py-12">
          <Brain className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-white mb-2">AI-Powered Analytics Coming Soon!</h3>
          <p className="text-gray-400">Interactive charts, real-time data processing, and advanced AI insights will be available in the next update.</p>
        </div>
      </main>
    </div>
  );
}