
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { ArrowRight, ArrowDown, ArrowUp } from "lucide-react";
import { KpiData } from '@/hooks/useKpiTracking';

interface KpiSectionProps {
  kpis: KpiData[];
}

// Sample weekly trend data for each KPI
const kpiTrendData = {
  "studyTime": [
    { week: "W1", value: 8 },
    { week: "W2", value: 10 },
    { week: "W3", value: 7 },
    { week: "W4", value: 12 },
    { week: "W5", value: 14 },
  ],
  "practiceTests": [
    { week: "W1", value: 3 },
    { week: "W2", value: 5 },
    { week: "W3", value: 4 },
    { week: "W4", value: 8 },
    { week: "W5", value: 12 },
  ],
  "conceptMastery": [
    { week: "W1", value: 45 },
    { week: "W2", value: 52 },
    { week: "W3", value: 58 },
    { week: "W4", value: 63 },
    { week: "W5", value: 68 },
  ],
  "studyStreak": [
    { week: "W1", value: 3 },
    { week: "W2", value: 5 },
    { week: "W3", value: 7 },
    { week: "W4", value: 6 },
    { week: "W5", value: 5 },
  ],
};

// Get trend data based on KPI label
const getKpiTrendData = (label: string) => {
  if (label.includes('Study Hours') || label.includes('Study Time')) {
    return kpiTrendData.studyTime;
  } else if (label.includes('Practice Tests')) {
    return kpiTrendData.practiceTests;
  } else if (label.includes('Concept Mastery')) {
    return kpiTrendData.conceptMastery;
  } else if (label.includes('Study Streak')) {
    return kpiTrendData.studyStreak;
  }
  // Default trend data
  return [
    { week: "W1", value: 5 },
    { week: "W2", value: 7 },
    { week: "W3", value: 10 },
    { week: "W4", value: 8 },
    { week: "W5", value: 12 },
  ];
};

// Get color based on trend direction
const getTrendColor = (trend?: 'up' | 'down' | 'neutral') => {
  switch (trend) {
    case 'up':
      return {
        text: 'text-green-600 dark:text-green-500',
        icon: <ArrowUp className="h-3 w-3 mr-1" />,
        stroke: '#22c55e', // green-500
        area: 'rgba(34, 197, 94, 0.2)'
      };
    case 'down':
      return {
        text: 'text-red-600 dark:text-red-500',
        icon: <ArrowDown className="h-3 w-3 mr-1" />,
        stroke: '#ef4444', // red-500
        area: 'rgba(239, 68, 68, 0.2)'
      };
    default:
      return {
        text: 'text-blue-600 dark:text-blue-500',
        icon: <ArrowRight className="h-3 w-3 mr-1" />,
        stroke: '#3b82f6', // blue-500
        area: 'rgba(59, 130, 246, 0.2)'
      };
  }
};

const KpiSection: React.FC<KpiSectionProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const trendData = getKpiTrendData(kpi.label);
        const trendColor = getTrendColor(kpi.trend);
        
        return (
          <Card key={kpi.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.label}</p>
                  <h3 className="text-2xl font-bold mt-1">{kpi.value}</h3>
                  {kpi.change && (
                    <p className={`text-xs flex items-center mt-1 ${trendColor.text}`}>
                      {trendColor.icon}
                      {kpi.change} {kpi.since && <span className="text-muted-foreground ml-1">{kpi.since}</span>}
                    </p>
                  )}
                </div>
                <div className="w-20 h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <defs>
                        <linearGradient id={`colorKpi${kpi.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={trendColor.stroke} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={trendColor.stroke} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Tooltip contentStyle={{ fontSize: '10px' }} />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={trendColor.stroke} 
                        strokeWidth={2} 
                        fill={`url(#colorKpi${kpi.id})`} 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t">
                <ResponsiveContainer width="100%" height={30}>
                  <LineChart data={trendData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <XAxis 
                      dataKey="week" 
                      tick={{ fontSize: 10 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis hide={true} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={trendColor.stroke}
                      strokeWidth={2}
                      dot={{ strokeWidth: 2, r: 2, fill: 'white' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default KpiSection;
