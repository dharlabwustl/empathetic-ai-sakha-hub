
export interface DashboardCardAnalytics {
  id: string;
  userId: string;
  cardType: string;
  interactionCount: number;
  timeSpent: number; // in seconds
  lastInteraction: string;
  clickThroughRate: number;
  engagementScore: number; // 0-100
  usefulness: number; // 1-5 user rating
  position: number; // card position on dashboard
  isCustomized: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserInteractionTracking {
  id: string;
  userId: string;
  pageUrl: string;
  actionType: 'click' | 'scroll' | 'hover' | 'form_submit' | 'search' | 'navigation';
  elementId?: string;
  timestamp: string;
  sessionId: string;
  deviceType: 'desktop' | 'tablet' | 'mobile';
  browserInfo: string;
  duration?: number;
  metadata?: Record<string, any>;
}

export interface FeatureUsageAnalytics {
  id: string;
  userId: string;
  featureName: string;
  usageFrequency: number; // uses per week
  totalUsageTime: number; // in minutes
  effectivenessScore: number; // 0-100
  userFeedback: {
    rating: number; // 1-5
    comment?: string;
    date: string;
  }[];
  adoptionDate: string;
  lastUsed: string;
  createdAt: string;
}

export interface NavigationAnalytics {
  id: string;
  userId: string;
  pathTaken: string[];
  timeSpent: number;
  bounceRate: number;
  conversionEvents: string[];
  sessionDuration: number;
  pagesVisited: number;
  backtrackCount: number;
  searchQueries: string[];
  createdAt: string;
}

export interface TimeSpentAnalytics {
  id: string;
  userId: string;
  featureName: string;
  sessionDuration: number;
  engagementLevel: 'low' | 'medium' | 'high';
  productivityScore: number; // 0-100
  timeOfDay: string;
  dayOfWeek: string;
  studyQuality: number; // 1-5
  distractionCount: number;
  createdAt: string;
}
