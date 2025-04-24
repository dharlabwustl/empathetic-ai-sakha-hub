
import React from 'react';
import KpiCard from './KpiCard';
import { KpiData } from '@/types/user/base';

interface KpiCardGridProps {
  kpis: KpiData[];
  className?: string;
}

const KpiCardGrid: React.FC<KpiCardGridProps> = ({
  kpis,
  className = ""
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
      {kpis.map((kpi) => (
        <KpiCard
          key={kpi.id}
          kpi={{
            ...kpi,
            label: kpi.title || "",
            unit: "",
            change: typeof kpi.value === 'object' ? kpi.value.trend : kpi.trend || 'neutral'
          }}
        />
      ))}
    </div>
  );
};

export default KpiCardGrid;
