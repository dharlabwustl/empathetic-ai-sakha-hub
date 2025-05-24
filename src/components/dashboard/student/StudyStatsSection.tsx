
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiData } from "@/hooks/useKpiTracking";

interface StudyStatsSectionProps {
  kpis?: KpiData[];
}

const StudyStatsSection: React.FC<StudyStatsSectionProps> = ({ kpis = [] }) => {
  const defaultKpis: KpiData[] = kpis.length > 0 ? kpis : [
    { id: "1", title: "Streak Days", value: 12, icon: "🔥", change: 2, changeType: "positive" },
    { id: "2", title: "Concepts Mastered", value: 48, icon: "📚", change: 5, changeType: "positive" },
    { id: "3", title: "Study Plans", value: 24, unit: "delivered", icon: "📝", change: 3, changeType: "positive" },
    { id: "4", title: "Feel Stress Reduced", value: 72, unit: "%", icon: "💆", change: 4, changeType: "positive" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {defaultKpis.map((kpi) => (
            <div key={kpi.id} className="text-center">
              <div className="text-2xl mb-1">{kpi.icon}</div>
              <div className="text-2xl font-bold">{kpi.value}{kpi.unit}</div>
              <div className="text-sm text-muted-foreground">{kpi.title}</div>
              {kpi.change && (
                <div className={`text-xs ${kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                  +{kpi.change} this week
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyStatsSection;
