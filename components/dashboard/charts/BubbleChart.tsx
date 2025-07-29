'use client';

import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { Card } from '@/components/ui/card';

interface BubbleChartProps {
  data: any[];
  title: string;
  xLabel: string;
  yLabel: string;
  gradient?: string;
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'];

export function BubbleChart({ 
  data, 
  title, 
  xLabel,
  yLabel,
  gradient = 'from-cyan-500/20 to-blue-500/20'
}: BubbleChartProps) {
  // Normalize data for better visualization
  const normalizedData = data.map((item, index) => ({
    ...item,
    size: Math.max(5, Math.min(20, (item.value || 1) / 10))
  }));

  return (
    <Card className={`p-6 bg-gradient-to-br ${gradient} border-gray-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300`}>
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="h-80 w-full">
        <ScatterChart width={600} height={300} data={normalizedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="x" 
            stroke="#9ca3af"
            fontSize={12}
            name={xLabel}
          />
          <YAxis 
            dataKey="y" 
            stroke="#9ca3af" 
            fontSize={12}
            name={yLabel}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#f9fafb'
            }}
          />
          <Scatter dataKey="y" fill="#06b6d4">
            {normalizedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Scatter>
        </ScatterChart>
      </div>
    </Card>
  );
}