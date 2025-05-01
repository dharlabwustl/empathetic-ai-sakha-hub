
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: number | string;
  unit?: string;
  icon?: React.ReactNode;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
}

export function KpiCard({ title, value, unit, icon, change, changeType = 'neutral' }: KpiCardProps) {
  return (
    <Card className="hover:shadow-md transition-all">
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          {icon && icon}
        </div>
        
        <div className="flex items-baseline gap-1 mt-2">
          <span className="text-2xl font-semibold">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        
        {typeof change !== 'undefined' && (
          <div className={`flex items-center mt-2 text-xs ${
            changeType === 'increase' ? 'text-green-600' : 
            changeType === 'decrease' ? 'text-red-600' : 
            'text-gray-500'
          }`}>
            {changeType === 'increase' ? <ArrowUp className="h-3 w-3 mr-1" /> : 
             changeType === 'decrease' ? <ArrowDown className="h-3 w-3 mr-1" /> : 
             <Minus className="h-3 w-3 mr-1" />}
            <span>{Math.abs(change)}% from last week</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
