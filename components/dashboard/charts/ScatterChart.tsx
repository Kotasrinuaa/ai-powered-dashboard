'use client';

import React from 'react';
import { ScatterChart as RechartsScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Card } from '@/components/ui/card';

interface ScatterChartProps {
  data: any[];
  title: string;
  xKey: string;
  yKey: string;
  color?: string;
  gradient?: string;
}

export function ScatterChart({ 
  data, 
  title, 
  xKey, 
  yKey, 
  color = '#ec4899',
  gradient = 'from-pink-500/20 to-rose-500/20'
}: ScatterChartProps) {
  return (
    <Card className={`p-6 bg-gradient-to-br ${gradient} border-gray-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-pink-500/10 transition-all duration-300`}>
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="h-80 w-full">
        <RechartsScatterChart width={600} height={300} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey={xKey} 
            stroke="#9ca3af"
            fontSize={12}
          />
          <YAxis stroke="#9ca3af" fontSize={12} />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#f9fafb'
            }}
          />
          <Scatter 
            dataKey={yKey} 
            fill={color}
            stroke={color}
            strokeWidth={1}
          />
        </RechartsScatterChart>
      </div>
    </Card>
  );
}