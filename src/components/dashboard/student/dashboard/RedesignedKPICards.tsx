
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { KpiData } from '@/hooks/useKpiTracking';
import { CircleHelp } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface KPICardProps {
  label: string;
  value: string | number;
  changePercentage?: number;
  sparkLineData?: Array<{ value: number }>;
  tooltipContent?: string;
  color: 'blue' | 'green' | 'purple' | 'amber';
  icon: React.ReactNode;
}

const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  changePercentage,
  sparkLineData,
  tooltipContent,
  color,
  icon
}) => {
  const colorClass = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    amber: 'text-amber-600 dark:text-amber-400'
  }[color];

  const bgColorClass = {
    blue: 'bg-blue-50 dark:bg-blue-950/30',
    green: 'bg-green-50 dark:bg-green-950/30',
    purple: 'bg-purple-50 dark:bg-purple-950/30',
    amber: 'bg-amber-50 dark:bg-amber-950/30'
  }[color];

  const gradientColor = {
    blue: ['#DBEAFE', '#93C5FD'],
    green: ['#DCFCE7', '#86EFAC'],
    purple: ['#F3E8FF', '#C4B5FD'],
    amber: ['#FEF3C7', '#FCD34D']
  }[color];

  const strokeColor = {
    blue: '#3B82F6',
    green: '#10B981',
    purple: '#8B5CF6',
    amber: '#F59E0B'
  }[color];

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground">{label}</span>
              {tooltipContent && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CircleHelp className="h-3.5 w-3.5 ml-1 text-muted-foreground/70" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-xs">{tooltipContent}</p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
            <div className="text-2xl font-bold">{value}</div>
            {changePercentage !== undefined && (
              <div className={`text-xs font-medium ${changePercentage >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {changePercentage >= 0 ? '↑' : '↓'} {Math.abs(changePercentage)}% from last week
              </div>
            )}
          </div>
          
          <div className={`p-2.5 rounded-full ${bgColorClass}`}>
            <div className={`${colorClass}`}>
              {icon}
            </div>
          </div>
        </div>
        
        {sparkLineData && sparkLineData.length > 0 && (
          <div className="h-16 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparkLineData}>
                <defs>
                  <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={gradientColor[0]} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={gradientColor[1]} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <RechartsTooltip 
                  formatter={(value: number) => [`${value}`, 'Value']}
                  labelFormatter={(label: number) => `Week ${label + 1}`}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={strokeColor}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4 }}
                  fill={`url(#gradient-${color})`}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface RedesignedKPICardsProps {
  kpis: KpiData[];
}

const RedesignedKPICards: React.FC<RedesignedKPICardsProps> = ({ kpis }) => {
  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <KPICard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            changePercentage={kpi.changePercentage}
            sparkLineData={kpi.sparkLineData}
            tooltipContent={kpi.tooltipContent}
            color={kpi.color as 'blue' | 'green' | 'purple' | 'amber'}
            icon={kpi.icon}
          />
        ))}
      </div>
    </TooltipProvider>
  );
};

export default RedesignedKPICards;
