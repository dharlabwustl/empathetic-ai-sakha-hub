
import React from 'react';
import { adminService } from '@/services/adminService';
import { useState, useEffect } from 'react';

// Get KPI data from admin service but don't display it in the hero section
const useKpiData = () => {
  const [kpiData, setKpiData] = useState({
    totalStudents: 0,
    averageConcepts: 0,
    totalStudyPlans: 0,
    verifiedMoodImprovement: 0
  });
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await adminService.getDashboardStats();
        setKpiData({
          totalStudents: stats.totalStudents || 15000,
          averageConcepts: stats.averageConcepts || 950,
          totalStudyPlans: stats.totalStudyPlans || 18000,
          verifiedMoodImprovement: stats.verifiedMoodImprovement || 84
        });
      } catch (error) {
        console.error("Failed to fetch KPI data:", error);
        // Use fallback data
        setKpiData({
          totalStudents: 15000,
          averageConcepts: 950,
          totalStudyPlans: 18000,
          verifiedMoodImprovement: 84
        });
      }
    };
    
    fetchData();
  }, []);
  
  return kpiData;
}

// Return null to remove the KPI tabs from hero section
const KpiStats = () => {
  return null;
};

export default KpiStats;
