
import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieChartData[];
  innerRadius?: number;
  outerRadius?: number;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  showLabel?: boolean;
  className?: string;
}

export const PieChart: React.FC<PieChartProps> = ({
  data,
  innerRadius = 40,
  outerRadius = 60,
  showLabel = false,
  className = ''
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill="#8884d8"
          dataKey="value"
          paddingAngle={2}
          label={showLabel ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%` : undefined}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number, name: string) => [`${value}%`, name]}
          contentStyle={{ 
            borderRadius: '8px', 
            border: 'none',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '8px 12px',
            backgroundColor: 'white'
          }}
        />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};
