
import { useState, useEffect } from 'react';

export const useStudentDashboardData = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setDashboardData({
        examGoal: "JEE Advanced 2025",
        studyPlan: {
          todaysTasks: [],
          totalTasks: 5,
          completedTasks: 2
        },
        subjects: [
          { id: "physics", name: "Physics", progress: 75, color: "#3B82F6" },
          { id: "chemistry", name: "Chemistry", progress: 68, color: "#10B981" },
          { id: "mathematics", name: "Mathematics", progress: 82, color: "#8B5CF6" }
        ],
        progressTracker: {
          examReadiness: 72,
          conceptsMastered: 45,
          totalConcepts: 60,
          weeklyGoal: 25,
          weeklyProgress: 18
        }
      });
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const refreshData = () => {
    setLoading(true);
    // Simulate refresh
    setTimeout(() => setLoading(false), 500);
  };

  return {
    loading,
    dashboardData,
    refreshData
  };
};
