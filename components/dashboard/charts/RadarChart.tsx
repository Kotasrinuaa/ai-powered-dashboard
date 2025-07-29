'use client';

import React from 'react';
import { RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';
import { Card } from '@/components/ui/card';

interface RadarChartProps {
  data: any[];
  title: string;
  dataKey: string;
  gradient?: string;
}

export function RadarChart({ 
  data, 
  title, 
  dataKey,
  gradient = 'from-indigo-500/20 to-purple-500/20'
}: RadarChartProps) {
  return (
    <Card className={`p-6 bg-gradient-to-br ${gradient} border-gray-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300`}>
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="h-80 w-full flex justify-center">
        <RechartsRadarChart width={400} height={300} data={data}>
          <PolarGrid stroke="#374151" />
          <PolarAngleAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
          <PolarRadiusAxis angle={90} domain={[0, 'auto']} stroke="#9ca3af" fontSize={12} />
          <Radar
            name="Value"
            dataKey={dataKey}
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.3}
          />
          <Legend />
        </RechartsRadarChart>
      </div>
    </Card>
  );
}