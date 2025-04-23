
import React from 'react';
import { KpiData } from '@/types/user/base';
import KpiCard from './KpiCard';

interface KpiCardGridProps {
  kpis: KpiData[];
}

const KpiCardGrid: React.FC<KpiCardGridProps> = ({ kpis }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.id} kpi={kpi} size="md" />
      ))}
    </div>
  );
};

export default KpiCardGrid;
