
import { useState, useEffect } from 'react';
import { UserRole } from '@/types/user/base';
import { KpiData, NudgeData } from './types';
import { getRoleSpecificKpis } from './roleSpecificKpis';
import { getRoleSpecificNudges } from './roleSpecificNudges';

export function useKpiTracking(role: UserRole) {
  const [kpis, setKpis] = useState<KpiData[]>([]);
  const [nudges, setNudges] = useState<NudgeData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch KPIs and nudges
    const fetchKpisAndNudges = () => {
      setLoading(true);
      
      setTimeout(() => {
        // Set role-specific KPIs
        const roleSpecificKpis = getRoleSpecificKpis(role);
        setKpis(roleSpecificKpis);
        
        // Set role-specific nudges
        const roleSpecificNudges = getRoleSpecificNudges(role);
        setNudges(roleSpecificNudges);
        
        setLoading(false);
      }, 1000);
    };

    fetchKpisAndNudges();
  }, [role]);

  const markNudgeAsRead = (nudgeId: string) => {
    setNudges(prev => 
      prev.map(nudge => 
        nudge.id === nudgeId ? { ...nudge, read: true } : nudge
      )
    );
  };

  return { kpis, nudges, loading, markNudgeAsRead };
}
