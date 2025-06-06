
export interface ConceptCardAnalytics {
  id: string;
  userId: string;
  conceptId: string;
  completionRate: number; // 0-100
  masteryLevel: number; // 0-100
  averageTime: number; // in seconds
  attempts: number;
  lastAttempt: string;
  difficultyProgression: number[];
  visualContentViewed: boolean;
  threeDModelInteracted: boolean;
  formulaLabCompleted: boolean;
  interactionHeatmap: {
    section: string;
    timeSpent: number;
    clickCount: number;
  }[];
  performanceTrend: 'improving' | 'stable' | 'declining';
  confidenceLevel: number; // 1-5
  bookmarked: boolean;
  notesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ConceptVisualAnalytics {
  id: string;
  conceptId: string;
  userId: string;
  visualType: 'image' | 'video' | 'animation' | '3d_model';
  viewDuration: number;
  interactionCount: number;
  zoomLevel: number;
  annotationsAdded: number;
  shareCount: number;
  effectivenessRating: number; // 1-5
  createdAt: string;
}

export interface FormulaLabAnalytics {
  id: string;
  userId: string;
  conceptId: string;
  formulaId: string;
  practiceTime: number;
  problemsSolved: number;
  accuracyRate: number;
  hintsUsed: number;
  mistakesCount: number;
  difficultyLevel: number;
  masteryAchieved: boolean;
  createdAt: string;
}
