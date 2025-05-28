
export interface PersonalizationProfile {
  userId: string;
  examType: string;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  studyPreferences: {
    preferredTimeStart: string;
    preferredTimeEnd: string;
    sessionDuration: number;
    breakDuration: number;
    dailyHours: number;
  };
  performanceLevel: 'beginner' | 'intermediate' | 'advanced';
  weakSubjects: string[];
  strongSubjects: string[];
  moodPatterns: {
    typical: string;
    current: string;
    stressFactors: string[];
  };
  priorities: string[];
}

export interface DashboardWidget {
  id: string;
  type: 'kpi' | 'action' | 'content' | 'progress' | 'social';
  title: string;
  priority: number;
  visibility: boolean;
  position: { row: number; col: number };
  size: 'small' | 'medium' | 'large';
  content: any;
}

export interface PersonalizedDashboardLayout {
  widgets: DashboardWidget[];
  theme: string;
  layout: 'grid' | 'list' | 'masonry';
  priorityOrder: string[];
}
