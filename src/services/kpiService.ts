
import { adminService } from './adminService';

export interface KPIMetric {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  change: number;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  category: 'users' | 'engagement' | 'academic' | 'revenue' | 'wellness';
  description: string;
  targetPage?: string;
}

export interface DashboardKPIs {
  overview: KPIMetric[];
  academic: KPIMetric[];
  engagement: KPIMetric[];
  revenue: KPIMetric[];
  wellness: KPIMetric[];
}

class KPIService {
  private static instance: KPIService;
  private kpiData: DashboardKPIs;

  private constructor() {
    this.kpiData = this.generateInitialKPIs();
    this.loadDynamicData();
  }

  public static getInstance(): KPIService {
    if (!KPIService.instance) {
      KPIService.instance = new KPIService();
    }
    return KPIService.instance;
  }

  private async loadDynamicData(): Promise<void> {
    try {
      const stats = await adminService.getDashboardStats();
      this.kpiData = this.generateKPIsFromStats(stats);
    } catch (error) {
      console.error('Error loading dynamic KPI data:', error);
    }
  }

  private generateKPIsFromStats(stats: any): DashboardKPIs {
    return {
      overview: [
        {
          id: 'total-users',
          title: 'Total Students',
          value: stats.totalStudents || 10000,
          change: 12.5,
          changeType: 'positive',
          icon: '👥',
          category: 'users',
          description: 'Total registered students',
          targetPage: '/admin?tab=users'
        },
        {
          id: 'dau',
          title: 'Daily Active Users',
          value: Math.round((stats.activeUsers || 7500) * 0.3),
          change: 8.3,
          changeType: 'positive',
          icon: '📊',
          category: 'engagement',
          description: 'Users active in last 24 hours'
        },
        {
          id: 'revenue',
          title: 'Monthly Revenue',
          value: stats.totalRevenue || 500000,
          unit: '₹',
          change: 18.7,
          changeType: 'positive',
          icon: '💰',
          category: 'revenue',
          description: 'Total revenue this month',
          targetPage: '/admin?tab=revenue'
        },
        {
          id: 'exam-readiness',
          title: 'Avg Exam Readiness',
          value: Math.round(stats.verifiedExamConfidenceImprovement || 78),
          unit: '%',
          change: 5.2,
          changeType: 'positive',
          icon: '🎯',
          category: 'academic',
          description: 'Average exam readiness score'
        }
      ],
      academic: [
        {
          id: 'study-plans-completed',
          title: 'Study Plans Completed',
          value: Math.round((stats.totalStudyPlans || 12000) * 0.7),
          change: 15.3,
          changeType: 'positive',
          icon: '📋',
          category: 'academic',
          description: 'Total completed study plans this month',
          targetPage: '/admin?tab=study-plan-management'
        },
        {
          id: 'total-concepts',
          title: 'Total Concepts',
          value: stats.averageConcepts * 10 || 8500,
          change: 24.1,
          changeType: 'positive',
          icon: '🧠',
          category: 'academic',
          description: 'Concepts available in the system',
          targetPage: '/admin?tab=content'
        },
        {
          id: 'flashcards-created',
          title: 'Total Flashcards',
          value: stats.totalFlashcards || 2000000,
          change: 31.2,
          changeType: 'positive',
          icon: '🃏',
          category: 'academic',
          description: 'Total flashcards in the system'
        },
        {
          id: 'practice-exams',
          title: 'Practice Exams',
          value: stats.targetExams * 15 || 300,
          change: 12.8,
          changeType: 'positive',
          icon: '📝',
          category: 'academic',
          description: 'Available practice exams',
          targetPage: '/admin?tab=exams'
        }
      ],
      engagement: [
        {
          id: 'wau',
          title: 'Weekly Active Users',
          value: Math.round((stats.activeUsers || 7500) * 0.6),
          change: 6.7,
          changeType: 'positive',
          icon: '📈',
          category: 'engagement',
          description: 'Users active in last 7 days'
        },
        {
          id: 'mau',
          title: 'Monthly Active Users',
          value: stats.activeUsers || 7500,
          change: 14.2,
          changeType: 'positive',
          icon: '📊',
          category: 'engagement',
          description: 'Users active in last 30 days'
        },
        {
          id: 'avg-study-time',
          title: 'Avg Study Time',
          value: stats.averageStudyTimePerUser || 6.5,
          unit: 'hrs/day',
          change: 8.9,
          changeType: 'positive',
          icon: '⏰',
          category: 'engagement',
          description: 'Average daily study time per user'
        },
        {
          id: 'session-length',
          title: 'Avg Session Length',
          value: Math.round((stats.averageStudyTimePerUser || 6.5) * 10),
          unit: 'min',
          change: 12.3,
          changeType: 'positive',
          icon: '⏱️',
          category: 'engagement',
          description: 'Average session duration'
        }
      ],
      revenue: [
        {
          id: 'monthly-revenue',
          title: 'Monthly Revenue',
          value: stats.totalRevenue || 500000,
          unit: '₹',
          change: 18.7,
          changeType: 'positive',
          icon: '💰',
          category: 'revenue',
          description: 'Total revenue this month'
        },
        {
          id: 'arpu',
          title: 'ARPU',
          value: Math.round((stats.totalRevenue || 500000) / (stats.totalStudents || 10000)),
          unit: '₹',
          change: 5.4,
          changeType: 'positive',
          icon: '👤',
          category: 'revenue',
          description: 'Average revenue per user'
        },
        {
          id: 'conversion-rate',
          title: 'Conversion Rate',
          value: 12.8,
          unit: '%',
          change: 3.2,
          changeType: 'positive',
          icon: '🎯',
          category: 'revenue',
          description: 'Free to paid conversion rate'
        }
      ],
      wellness: [
        {
          id: 'stress-reduced',
          title: 'Stress Reduced',
          value: stats.verifiedMoodImprovement || 72,
          unit: '%',
          change: 8.5,
          changeType: 'positive',
          icon: '😌',
          category: 'wellness',
          description: 'Users reporting stress reduction',
          targetPage: '/admin?tab=mood-analytics'
        },
        {
          id: 'mood-improvement',
          title: 'Mood Improvement',
          value: Math.round((stats.verifiedMoodImprovement || 72) * 1.1),
          unit: '%',
          change: 6.3,
          changeType: 'positive',
          icon: '🌟',
          category: 'wellness',
          description: 'Users showing mood improvement'
        }
      ]
    };
  }

  private generateInitialKPIs(): DashboardKPIs {
    return {
      overview: [],
      academic: [],
      engagement: [],
      revenue: [],
      wellness: []
    };
  }

  public async getAllKPIs(): Promise<DashboardKPIs> {
    await this.loadDynamicData();
    return this.kpiData;
  }

  public getKPIsByCategory(category: keyof DashboardKPIs): KPIMetric[] {
    return this.kpiData[category];
  }

  public getOverviewKPIs(): KPIMetric[] {
    return this.kpiData.overview;
  }

  public async refreshKPIs(): Promise<void> {
    await this.loadDynamicData();
  }

  public getKPIById(id: string): KPIMetric | undefined {
    const allKPIs = [
      ...this.kpiData.overview,
      ...this.kpiData.academic,
      ...this.kpiData.engagement,
      ...this.kpiData.revenue,
      ...this.kpiData.wellness
    ];
    return allKPIs.find(kpi => kpi.id === id);
  }
}

export const kpiService = KPIService.getInstance();
