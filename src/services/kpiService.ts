
export interface KpiMetric {
  id: string;
  title: string;
  value: number;
  unit?: string;
  icon: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  description: string;
  category: 'user' | 'engagement' | 'performance' | 'revenue' | 'system';
  target?: number;
  lastUpdated: string;
  navigateTo?: string;
}

export interface KpiData {
  metrics: KpiMetric[];
  summary: {
    totalUsers: number;
    activeUsers: number;
    revenue: number;
    avgStudyTime: number;
    examReadiness: number;
    stressReduction: number;
  };
}

class KpiService {
  private baseData: KpiData = {
    metrics: [
      {
        id: 'total-users',
        title: 'Total Users',
        value: 10000,
        icon: '👥',
        change: 12,
        changeType: 'increase',
        description: 'Total registered users on the platform',
        category: 'user',
        target: 15000,
        lastUpdated: new Date().toISOString(),
        navigateTo: '/admin/users'
      },
      {
        id: 'dau',
        title: 'Daily Active Users',
        value: 2500,
        icon: '📊',
        change: 5,
        changeType: 'increase',
        description: 'Users active in the last 24 hours',
        category: 'engagement',
        target: 3000,
        lastUpdated: new Date().toISOString(),
        navigateTo: '/admin/analytics'
      },
      {
        id: 'wau',
        title: 'Weekly Active Users',
        value: 7500,
        icon: '📈',
        change: 8,
        changeType: 'increase',
        description: 'Users active in the last 7 days',
        category: 'engagement',
        target: 10000,
        lastUpdated: new Date().toISOString(),
        navigateTo: '/admin/analytics'
      },
      {
        id: 'mau',
        title: 'Monthly Active Users',
        value: 8500,
        icon: '👤',
        change: 15,
        changeType: 'increase',
        description: 'Users active in the last 30 days',
        category: 'engagement',
        target: 12000,
        lastUpdated: new Date().toISOString(),
        navigateTo: '/admin/analytics'
      },
      {
        id: 'total-concepts',
        title: 'Total Concepts',
        value: 850000,
        icon: '🧠',
        change: 3,
        changeType: 'increase',
        description: 'Total concepts learned across all users',
        category: 'performance',
        target: 1000000,
        lastUpdated: new Date().toISOString(),
        navigateTo: '/admin/content'
      },
      {
        id: 'total-flashcards',
        title: 'Total Flashcards',
        value: 2000000,
        icon: '📚',
        change: 7,
        changeType: 'increase',
        description: 'Total flashcards completed by all users',
        category: 'performance',
        target: 3000000,
        lastUpdated: new Date().toISOString(),
        navigateTo: '/admin/content'
      },
      {
        id: 'exams-taken',
        title: 'Exams Taken',
        value: 125000,
        icon: '📝',
        change: 10,
        changeType: 'increase',
        description: 'Total practice exams completed',
        category: 'performance',
        target: 200000,
        lastUpdated: new Date().toISOString(),
        navigateTo: '/admin/analytics'
      },
      {
        id: 'study-plans-completed',
        title: 'Study Plans Completed',
        value: 4250,
        unit: '%',
        icon: '✅',
        change: 6,
        changeType: 'increase',
        description: 'Percentage of study plans completed by users',
        category: 'performance',
        target: 5000,
        lastUpdated: new Date().toISOString(),
        navigateTo: '/admin/study-plans'
      },
      {
        id: 'avg-exam-readiness',
        title: 'Avg Exam Readiness',
        value: 75,
        unit: '%',
        icon: '🎯',
        change: 4,
        changeType: 'increase',
        description: 'Average exam readiness score across all users',
        category: 'performance',
        target: 85,
        lastUpdated: new Date().toISOString(),
        navigateTo: '/admin/analytics'
      },
      {
        id: 'stress-reduction',
        title: 'Stress Reduction',
        value: 68,
        unit: '%',
        icon: '😌',
        change: 12,
        changeType: 'increase',
        description: 'Users reporting reduced stress levels',
        category: 'performance',
        target: 80,
        lastUpdated: new Date().toISOString(),
        navigateTo: '/admin/wellness'
      },
      {
        id: 'avg-study-time',
        title: 'Avg Study Time',
        value: 6.5,
        unit: 'hrs/day',
        icon: '⏰',
        change: 2,
        changeType: 'increase',
        description: 'Average daily study time per user',
        category: 'engagement',
        target: 8,
        lastUpdated: new Date().toISOString(),
        navigateTo: '/admin/analytics'
      },
      {
        id: 'revenue',
        title: 'Monthly Revenue',
        value: 150000,
        unit: '$',
        icon: '💰',
        change: 18,
        changeType: 'increase',
        description: 'Total monthly revenue from subscriptions',
        category: 'revenue',
        target: 200000,
        lastUpdated: new Date().toISOString(),
        navigateTo: '/admin/revenue'
      }
    ],
    summary: {
      totalUsers: 10000,
      activeUsers: 8500,
      revenue: 150000,
      avgStudyTime: 6.5,
      examReadiness: 75,
      stressReduction: 68
    }
  };

  async getKpiData(): Promise<KpiData> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Add some random variation to simulate real-time data
        const updatedMetrics = this.baseData.metrics.map(metric => ({
          ...metric,
          value: this.addRandomVariation(metric.value, 0.02), // 2% variation
          change: this.addRandomVariation(metric.change, 0.1),
          lastUpdated: new Date().toISOString()
        }));

        resolve({
          ...this.baseData,
          metrics: updatedMetrics
        });
      }, 300);
    });
  }

  async getKpisByCategory(category: string): Promise<KpiMetric[]> {
    const data = await this.getKpiData();
    return data.metrics.filter(metric => metric.category === category);
  }

  async updateKpi(id: string, value: number): Promise<boolean> {
    // Simulate API update
    const metricIndex = this.baseData.metrics.findIndex(m => m.id === id);
    if (metricIndex !== -1) {
      this.baseData.metrics[metricIndex].value = value;
      this.baseData.metrics[metricIndex].lastUpdated = new Date().toISOString();
      return true;
    }
    return false;
  }

  private addRandomVariation(value: number, percentage: number): number {
    const variation = value * percentage * (Math.random() - 0.5) * 2;
    return Math.round((value + variation) * 100) / 100;
  }

  // Student-specific KPIs
  async getStudentKpis(userId: string): Promise<KpiMetric[]> {
    return [
      {
        id: 'study-streak',
        title: 'Study Streak',
        value: 7,
        unit: 'days',
        icon: '🔥',
        change: 2,
        changeType: 'increase',
        description: 'Consecutive days of studying',
        category: 'engagement',
        target: 30,
        lastUpdated: new Date().toISOString(),
        navigateTo: '/dashboard/student/progress'
      },
      {
        id: 'concepts-mastered',
        title: 'Concepts Mastered',
        value: 42,
        icon: '🎓',
        change: 8,
        changeType: 'increase',
        description: 'Total concepts you have mastered',
        category: 'performance',
        target: 100,
        lastUpdated: new Date().toISOString(),
        navigateTo: '/dashboard/student/concepts'
      },
      {
        id: 'exam-readiness',
        title: 'Exam Readiness',
        value: 78,
        unit: '%',
        icon: '📊',
        change: 5,
        changeType: 'increase',
        description: 'Your current exam readiness level',
        category: 'performance',
        target: 90,
        lastUpdated: new Date().toISOString(),
        navigateTo: '/dashboard/student/analytics'
      },
      {
        id: 'study-plan-progress',
        title: 'Study Plan Progress',
        value: 65,
        unit: '%',
        icon: '📋',
        change: 12,
        changeType: 'increase',
        description: 'Progress on your current study plan',
        category: 'performance',
        target: 100,
        lastUpdated: new Date().toISOString(),
        navigateTo: '/dashboard/student/study-plan'
      }
    ];
  }
}

export const kpiService = new KpiService();
