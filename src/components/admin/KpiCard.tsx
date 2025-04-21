
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: { 
    value: number;
    trend: 'up' | 'down' | 'neutral';
  };
  icon: React.ReactNode;
  className?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, icon, className }) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold">{value}</h3>
              
              {change && (
                <span 
                  className={cn(
                    "ml-2 text-xs flex items-center", 
                    change.trend === 'up' ? "text-green-600" : 
                    change.trend === 'down' ? "text-red-600" : 
                    "text-gray-500"
                  )}
                >
                  {change.trend === 'up' && <ArrowUp className="h-3 w-3 mr-0.5" />}
                  {change.trend === 'down' && <ArrowDown className="h-3 w-3 mr-0.5" />}
                  {change.value}%
                </span>
              )}
            </div>
          </div>
          <div className="p-2 bg-primary/10 rounded-full">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KpiCard;
