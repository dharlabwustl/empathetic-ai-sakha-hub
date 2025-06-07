
export interface DatabaseTable {
  tableName: string;
  fieldId: string;
  uiComponent: string;
  dashboardPage: string;
  dataType: string;
  description: string;
  isExportable: boolean;
}

export const databaseTables: DatabaseTable[] = [
  // Analytics & Performance Tables
  {
    tableName: 'study_analytics',
    fieldId: 'analytics_001',
    uiComponent: 'AnalyticsCard',
    dashboardPage: 'StudentDashboard',
    dataType: 'object',
    description: 'Overall study performance metrics',
    isExportable: true
  },
  {
    tableName: 'subject_performance',
    fieldId: 'analytics_002', 
    uiComponent: 'SubjectProgressChart',
    dashboardPage: 'StudentDashboard',
    dataType: 'array',
    description: 'Individual subject performance data',
    isExportable: true
  },
  {
    tableName: 'daily_study_logs',
    fieldId: 'analytics_003',
    uiComponent: 'DailyStudyTracker',
    dashboardPage: 'TodaysPlan',
    dataType: 'array',
    description: 'Daily study session logs and time tracking',
    isExportable: true
  },
  {
    tableName: 'mock_test_results',
    fieldId: 'analytics_004',
    uiComponent: 'MockTestAnalytics',
    dashboardPage: 'PracticeExams',
    dataType: 'array',
    description: 'Mock test scores and performance analysis',
    isExportable: true
  },

  // Concept Cards Tables
  {
    tableName: 'concept_cards',
    fieldId: 'concept_001',
    uiComponent: 'ConceptCard',
    dashboardPage: 'ConceptsPage',
    dataType: 'object',
    description: 'Individual concept card data with content',
    isExportable: true
  },
  {
    tableName: 'concept_progress',
    fieldId: 'concept_002',
    uiComponent: 'ConceptProgressTracker',
    dashboardPage: 'ConceptsPage',
    dataType: 'object',
    description: 'User progress on concept understanding',
    isExportable: true
  },
  {
    tableName: 'concept_interactions',
    fieldId: 'concept_003',
    uiComponent: 'InteractionLogger',
    dashboardPage: 'ConceptDetailPage',
    dataType: 'array',
    description: 'User interactions with concept cards',
    isExportable: true
  },

  // Flashcards Tables
  {
    tableName: 'flashcard_sets',
    fieldId: 'flashcard_001',
    uiComponent: 'FlashcardSetCard',
    dashboardPage: 'FlashcardsPage',
    dataType: 'object',
    description: 'Flashcard set metadata and organization',
    isExportable: true
  },
  {
    tableName: 'flashcard_progress',
    fieldId: 'flashcard_002',
    uiComponent: 'FlashcardProgress',
    dashboardPage: 'FlashcardsPage',
    dataType: 'object',
    description: 'User progress through flashcard sets',
    isExportable: true
  },
  {
    tableName: 'flashcard_reviews',
    fieldId: 'flashcard_003',
    uiComponent: 'ReviewTracker',
    dashboardPage: 'InteractiveFlashcard',
    dataType: 'array',
    description: 'Spaced repetition and review data',
    isExportable: true
  },

  // Practice Exams Tables
  {
    tableName: 'practice_exams',
    fieldId: 'exam_001',
    uiComponent: 'ExamCard',
    dashboardPage: 'PracticeExamsList',
    dataType: 'object',
    description: 'Practice exam metadata and questions',
    isExportable: true
  },
  {
    tableName: 'exam_attempts',
    fieldId: 'exam_002',
    uiComponent: 'ExamAttemptHistory',
    dashboardPage: 'ExamReviewPage',
    dataType: 'array',
    description: 'User exam attempt records and scores',
    isExportable: true
  },
  {
    tableName: 'question_analytics',
    fieldId: 'exam_003',
    uiComponent: 'QuestionAnalytics',
    dashboardPage: 'ExamReviewPage',
    dataType: 'object',
    description: 'Individual question performance metrics',
    isExportable: true
  },

  // Feel Good Corner Tables
  {
    tableName: 'mood_tracking',
    fieldId: 'mood_001',
    uiComponent: 'MoodTracker',
    dashboardPage: 'FeelGoodCornerPage',
    dataType: 'object',
    description: 'Daily mood and wellness tracking',
    isExportable: true
  },
  {
    tableName: 'motivational_content',
    fieldId: 'mood_002',
    uiComponent: 'MotivationalCard',
    dashboardPage: 'FeelGoodCornerPage',
    dataType: 'array',
    description: 'Motivational quotes and content delivery',
    isExportable: false
  },
  {
    tableName: 'wellness_activities',
    fieldId: 'mood_003',
    uiComponent: 'WellnessActivity',
    dashboardPage: 'FeelGoodCornerPage',
    dataType: 'array',
    description: 'Wellness and break activity recommendations',
    isExportable: true
  },

  // AI Tutor Tables
  {
    tableName: 'tutor_conversations',
    fieldId: 'tutor_001',
    uiComponent: 'ChatInterface',
    dashboardPage: 'TutorView',
    dataType: 'array',
    description: 'AI tutor conversation history and context',
    isExportable: true
  },
  {
    tableName: 'doubt_resolution',
    fieldId: 'tutor_002',
    uiComponent: 'DoubtTracker',
    dashboardPage: 'TutorView',
    dataType: 'object',
    description: 'Student doubt resolution tracking',
    isExportable: true
  },
  {
    tableName: 'tutor_recommendations',
    fieldId: 'tutor_003',
    uiComponent: 'RecommendationPanel',
    dashboardPage: 'TutorView',
    dataType: 'array',
    description: 'AI-generated study recommendations',
    isExportable: true
  },

  // Formula Practice Tables
  {
    tableName: 'formula_sessions',
    fieldId: 'formula_001',
    uiComponent: 'FormulaLabInterface',
    dashboardPage: 'FormulaLabPage',
    dataType: 'object',
    description: 'Interactive formula practice sessions',
    isExportable: true
  },
  {
    tableName: 'formula_mastery',
    fieldId: 'formula_002',
    uiComponent: 'FormulaMasteryTracker',
    dashboardPage: 'ConceptDetailPage',
    dataType: 'object',
    description: 'Formula understanding and mastery levels',
    isExportable: true
  },

  // Study Plan Tables
  {
    tableName: 'study_plans',
    fieldId: 'plan_001',
    uiComponent: 'StudyPlanCard',
    dashboardPage: 'StudyPlanPage',
    dataType: 'object',
    description: 'Comprehensive study plan configuration',
    isExportable: true
  },
  {
    tableName: 'daily_schedules',
    fieldId: 'plan_002',
    uiComponent: 'DailyScheduleTable',
    dashboardPage: 'AdaptiveStudyPlanPage',
    dataType: 'array',
    description: 'Daily study schedule and task planning',
    isExportable: true
  },
  {
    tableName: 'adaptive_adjustments',
    fieldId: 'plan_003',
    uiComponent: 'AdaptiveLogger',
    dashboardPage: 'StudyPlanPage',
    dataType: 'array',
    description: 'AI-driven study plan adjustments',
    isExportable: true
  },

  // Dashboard Overview Tables
  {
    tableName: 'dashboard_widgets',
    fieldId: 'dash_001',
    uiComponent: 'DashboardCard',
    dashboardPage: 'StudentDashboard',
    dataType: 'object',
    description: 'Dashboard widget configuration and data',
    isExportable: false
  },
  {
    tableName: 'quick_actions',
    fieldId: 'dash_002',
    uiComponent: 'QuickActionButton',
    dashboardPage: 'StudentDashboard',
    dataType: 'array',
    description: 'Quick action buttons and shortcuts',
    isExportable: false
  },
  {
    tableName: 'notification_center',
    fieldId: 'dash_003',
    uiComponent: 'NotificationBell',
    dashboardPage: 'StudentDashboard',
    dataType: 'array',
    description: 'System and study notifications',
    isExportable: true
  }
];

export const downloadDatabaseSchemaCSV = () => {
  const headers = ['Table Name', 'Field ID', 'UI Component', 'Dashboard Page', 'Data Type', 'Description', 'Exportable'];
  
  const csvContent = [
    headers.join(','),
    ...databaseTables.map(table => [
      table.tableName,
      table.fieldId,
      table.uiComponent,
      table.dashboardPage,
      table.dataType,
      `"${table.description}"`,
      table.isExportable
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'database_schema_with_field_mapping.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
