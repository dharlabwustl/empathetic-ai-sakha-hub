
import { adminService } from './adminService';

export interface EnhancedKpiData {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  icon: React.ReactNode;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  description: string;
  category: 'users' | 'engagement' | 'revenue' | 'performance' | 'satisfaction';
  trend: Array<{ date: string; value: number }>;
  target?: number;
  isConnected: boolean;
  pageLink?: string;
}

export const enhancedKpiService = {
  // Get comprehensive KPI data
  getEnhancedKpis: async (): Promise<EnhancedKpiData[]> => {
    const dashboardStats = await adminService.getDashboardStats();
    
    // Calculate dynamic values based on existing data
    const studyPlanCompletionRate = Math.round((dashboardStats.totalStudyPlans / dashboardStats.totalStudents) * 100);
    const examReadinessAverage = Math.round((dashboardStats.successRate + dashboardStats.verifiedExamConfidenceImprovement) / 2);
    const stressReductionRate = dashboardStats.verifiedMoodImprovement || 72;
    
    // Generate trend data (last 7 days)
    const generateTrend = (baseValue: number, variance: number = 10) => {
      return Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        value: Math.max(0, baseValue + (Math.random() - 0.5) * variance)
      }));
    };

    return [
      // User Metrics
      {
        id: 'total-users',
        title: 'Total Users',
        value: dashboardStats.totalStudents?.toLocaleString() || '50K',
        unit: '',
        icon: '👥',
        change: 12.5,
        changeType: 'increase' as const,
        description: 'Total registered students',
        category: 'users' as const,
        trend: generateTrend(dashboardStats.totalStudents || 50000, 1000),
        target: 75000,
        isConnected: true,
        pageLink: '/admin/dashboard?tab=users'
      },
      {
        id: 'dau',
        title: 'Daily Active Users',
        value: Math.round((dashboardStats.activeStudents || 7500) * 0.15).toLocaleString(),
        unit: '',
        icon: '📊',
        change: 8.3,
        changeType: 'increase' as const,
        description: 'Students active today',
        category: 'engagement' as const,
        trend: generateTrend(1125, 150),
        isConnected: true,
        pageLink: '/admin/dashboard?tab=analytics'
      },
      {
        id: 'wau',
        title: 'Weekly Active Users',
        value: Math.round((dashboardStats.activeStudents || 7500) * 0.6).toLocaleString(),
        unit: '',
        icon: '📈',
        change: 15.2,
        changeType: 'increase' as const,
        description: 'Students active this week',
        category: 'engagement' as const,
        trend: generateTrend(4500, 300),
        isConnected: true,
        pageLink: '/admin/dashboard?tab=analytics'
      },
      {
        id: 'mau',
        title: 'Monthly Active Users',
        value: (dashboardStats.activeStudents || 7500).toLocaleString(),
        unit: '',
        icon: '🗓️',
        change: 22.1,
        changeType: 'increase' as const,
        description: 'Students active this month',
        category: 'engagement' as const,
        trend: generateTrend(7500, 500),
        isConnected: true,
        pageLink: '/admin/dashboard?tab=analytics'
      },

      // Academic Performance
      {
        id: 'total-concepts',
        title: 'Total Concepts Mastered',
        value: (dashboardStats.averageConcepts || 1200).toLocaleString(),
        unit: 'avg/student',
        icon: '🧠',
        change: 18.5,
        changeType: 'increase' as const,
        description: 'Average concepts mastered per student',
        category: 'performance' as const,
        trend: generateTrend(1200, 50),
        target: 1500,
        isConnected: true,
        pageLink: '/dashboard/student/concepts'
      },
      {
        id: 'flashcards-completed',
        title: 'Flashcards Completed',
        value: (dashboardStats.totalFlashcards || 2000000).toLocaleString(),
        unit: 'total',
        icon: '🗃️',
        change: 25.3,
        changeType: 'increase' as const,
        description: 'Total flashcards completed across platform',
        category: 'engagement' as const,
        trend: generateTrend(2000000, 50000),
        isConnected: true,
        pageLink: '/dashboard/student/flashcards'
      },
      {
        id: 'exam-readiness',
        title: 'Average Exam Readiness',
        value: examReadinessAverage,
        unit: '%',
        icon: '📝',
        change: 12.8,
        changeType: 'increase' as const,
        description: 'Average student exam readiness score',
        category: 'performance' as const,
        trend: generateTrend(examReadinessAverage, 5),
        target: 95,
        isConnected: true,
        pageLink: '/dashboard/student/practice-exam'
      },

      // Study Plans & Time
      {
        id: 'study-plans-completed',
        title: 'Study Plans Completed',
        value: studyPlanCompletionRate,
        unit: '%',
        icon: '📋',
        change: 16.7,
        changeType: 'increase' as const,
        description: 'Students with completed study plans',
        category: 'performance' as const,
        trend: generateTrend(studyPlanCompletionRate, 3),
        target: 85,
        isConnected: true,
        pageLink: '/dashboard/student/today'
      },
      {
        id: 'avg-study-time',
        title: 'Average Study Time',
        value: dashboardStats.averageStudyTimePerUser || 6.5,
        unit: 'hrs/day',
        icon: '⏱️',
        change: 8.9,
        changeType: 'increase' as const,
        description: 'Average daily study time per user',
        category: 'engagement' as const,
        trend: generateTrend(6.5, 0.5),
        target: 8,
        isConnected: true,
        pageLink: '/dashboard/student'
      },

      // Well-being & Satisfaction
      {
        id: 'stress-reduced',
        title: 'Stress Reduction',
        value: stressReductionRate,
        unit: '%',
        icon: '😌',
        change: 14.2,
        changeType: 'increase' as const,
        description: 'Students reporting reduced stress levels',
        category: 'satisfaction' as const,
        trend: generateTrend(stressReductionRate, 3),
        target: 80,
        isConnected: true,
        pageLink: '/dashboard/student/feel-good-corner'
      },

      // Revenue Metrics
      {
        id: 'total-revenue',
        title: 'Total Revenue',
        value: '₹12.5L',
        unit: '/month',
        icon: '💰',
        change: 19.4,
        changeType: 'increase' as const,
        description: 'Monthly recurring revenue',
        category: 'revenue' as const,
        trend: generateTrend(1250000, 50000),
        target: 2000000,
        isConnected: true,
        pageLink: '/admin/dashboard?tab=subscription'
      }
    ];
  },

  // Update KPI value
  updateKpi: async (kpiId: string, newValue: number): Promise<boolean> => {
    // In a real app, this would update the backend
    console.log(`Updating KPI ${kpiId} to ${newValue}`);
    return true;
  },

  // Get KPI by category
  getKpisByCategory: async (category: string): Promise<EnhancedKpiData[]> => {
    const allKpis = await enhancedKpiService.getEnhancedKpis();
    return allKpis.filter(kpi => kpi.category === category);
  }
};
