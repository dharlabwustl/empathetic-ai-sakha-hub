export const exportDatabaseSchemaToCSV = (): string => {
  const schema = [
    // Core User Management
    {
      table: 'users',
      fieldId: 'user_id',
      fieldName: 'User ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'UserProfile, Dashboard Header',
      pageMapping: 'All Pages',
      description: 'Primary user identifier'
    },
    {
      table: 'users',
      fieldId: 'email',
      fieldName: 'Email',
      dataType: 'VARCHAR(255)',
      required: true,
      uiComponent: 'Login Form, Profile Settings',
      pageMapping: '/login, /profile',
      description: 'User email address'
    },
    {
      table: 'users',
      fieldId: 'name',
      fieldName: 'Full Name',
      dataType: 'VARCHAR(255)',
      required: true,
      uiComponent: 'NameSectionCard, StudentProfile',
      pageMapping: '/dashboard/student, /profile',
      description: 'User full name'
    },
    {
      table: 'users',
      fieldId: 'avatar',
      fieldName: 'Profile Picture',
      dataType: 'TEXT',
      required: false,
      uiComponent: 'Avatar Component, Sidebar',
      pageMapping: 'All Pages',
      description: 'User profile picture URL'
    },
    
    // Student Profile & Goals
    {
      table: 'student_profiles',
      fieldId: 'profile_id',
      fieldName: 'Profile ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'StudentProfileSection',
      pageMapping: '/study-plan',
      description: 'Student profile identifier'
    },
    {
      table: 'student_profiles',
      fieldId: 'exam_goal',
      fieldName: 'Exam Goal',
      dataType: 'VARCHAR(100)',
      required: true,
      uiComponent: 'NEETStrategyCard, GoalCard',
      pageMapping: '/dashboard/student, /study-plan',
      description: 'Target exam (NEET, JEE, etc.)'
    },
    {
      table: 'student_profiles',
      fieldId: 'target_exam_date',
      fieldName: 'Target Exam Date',
      dataType: 'DATE',
      required: true,
      uiComponent: 'CountdownCard, ExamDateWidget',
      pageMapping: '/dashboard/student, /study-plan',
      description: 'Exam date for countdown'
    },
    {
      table: 'student_profiles',
      fieldId: 'learning_pace',
      fieldName: 'Learning Pace',
      dataType: 'ENUM(slow,medium,fast)',
      required: true,
      uiComponent: 'StudentProfileSection',
      pageMapping: '/study-plan',
      description: 'Student learning speed preference'
    },
    {
      table: 'student_profiles',
      fieldId: 'preferred_study_time',
      fieldName: 'Preferred Study Time',
      dataType: 'ENUM(morning,afternoon,evening,night)',
      required: true,
      uiComponent: 'StudentProfileSection, TodaysPlan',
      pageMapping: '/study-plan, /today',
      description: 'Best study time for student'
    },
    {
      table: 'student_profiles',
      fieldId: 'study_hours_per_day',
      fieldName: 'Study Hours Per Day',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'StudyTargetCard, ProgressTracker',
      pageMapping: '/dashboard/student, /study-plan',
      description: 'Daily study hour target'
    },
    
    // Concept Cards & Analytics
    {
      table: 'concept_cards',
      fieldId: 'concept_id',
      fieldName: 'Concept ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'ConceptCard, ConceptDetail',
      pageMapping: '/concepts, /concepts/:id',
      description: 'Unique concept identifier'
    },
    {
      table: 'concept_cards',
      fieldId: 'title',
      fieldName: 'Concept Title',
      dataType: 'VARCHAR(255)',
      required: true,
      uiComponent: 'ConceptCard Header, DetailPage Title',
      pageMapping: '/concepts, /concepts/:id',
      description: 'Concept name/title'
    },
    {
      table: 'concept_cards',
      fieldId: 'subject',
      fieldName: 'Subject',
      dataType: 'ENUM(Physics,Chemistry,Biology,Mathematics)',
      required: true,
      uiComponent: 'SubjectBadge, FilterTabs',
      pageMapping: '/concepts, /study-plan',
      description: 'Academic subject category'
    },
    {
      table: 'concept_cards',
      fieldId: 'difficulty_level',
      fieldName: 'Difficulty Level',
      dataType: 'ENUM(easy,medium,hard)',
      required: true,
      uiComponent: 'DifficultyBadge, ProgressTracker',
      pageMapping: '/concepts, /study-plan',
      description: 'Concept difficulty rating'
    },
    {
      table: 'concept_cards',
      fieldId: 'content_summary',
      fieldName: 'Content Summary',
      dataType: 'TEXT',
      required: true,
      uiComponent: 'ConceptCard Description',
      pageMapping: '/concepts',
      description: 'Brief concept overview'
    },
    {
      table: 'concept_cards',
      fieldId: 'visual_content',
      fieldName: 'Visual Content',
      dataType: 'JSON',
      required: false,
      uiComponent: 'VisualTab, DiagramViewer',
      pageMapping: '/concepts/:id/visual',
      description: 'Images, diagrams, videos'
    },
    {
      table: 'concept_cards',
      fieldId: 'three_d_content',
      fieldName: '3D Content',
      dataType: 'JSON',
      required: false,
      uiComponent: '3DTab, InteractiveViewer',
      pageMapping: '/concepts/:id/3d',
      description: '3D models and simulations'
    },
    {
      table: 'concept_cards',
      fieldId: 'formula_lab_data',
      fieldName: 'Formula Lab Data',
      dataType: 'JSON',
      required: false,
      uiComponent: 'FormulaLabTab, Calculator',
      pageMapping: '/concepts/:id/formula-lab',
      description: 'Interactive formulas and calculations'
    },
    
    // Concept Analytics
    {
      table: 'concept_analytics',
      fieldId: 'analytics_id',
      fieldName: 'Analytics ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'AnalyticsCard, PerformanceTracker',
      pageMapping: '/concepts/:id, /study-plan/performance',
      description: 'Analytics record identifier'
    },
    {
      table: 'concept_analytics',
      fieldId: 'completion_rate',
      fieldName: 'Completion Rate',
      dataType: 'DECIMAL(5,2)',
      required: true,
      uiComponent: 'ProgressBar, CompletionBadge',
      pageMapping: '/concepts, /study-plan',
      description: 'Percentage of concept completed'
    },
    {
      table: 'concept_analytics',
      fieldId: 'mastery_level',
      fieldName: 'Mastery Level',
      dataType: 'DECIMAL(5,2)',
      required: true,
      uiComponent: 'MasteryIndicator, SubjectAnalysis',
      pageMapping: '/study-plan/analysis, /concepts/:id',
      description: 'Understanding level (0-100)'
    },
    {
      table: 'concept_analytics',
      fieldId: 'average_study_time',
      fieldName: 'Average Study Time',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'TimeTracker, StudyMetrics',
      pageMapping: '/study-plan/performance',
      description: 'Average time spent in minutes'
    },
    {
      table: 'concept_analytics',
      fieldId: 'total_attempts',
      fieldName: 'Total Attempts',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'AttemptsCounter, AnalyticsDashboard',
      pageMapping: '/study-plan/performance',
      description: 'Number of study attempts'
    },
    {
      table: 'concept_analytics',
      fieldId: 'last_accessed',
      fieldName: 'Last Accessed',
      dataType: 'TIMESTAMP',
      required: true,
      uiComponent: 'RecentActivity, LastSeen',
      pageMapping: '/dashboard/student',
      description: 'Last interaction timestamp'
    },
    
    // Flashcards & Analytics
    {
      table: 'flashcards',
      fieldId: 'flashcard_id',
      fieldName: 'Flashcard ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'FlashcardComponent, InteractiveCard',
      pageMapping: '/flashcards, /flashcards/:id',
      description: 'Unique flashcard identifier'
    },
    {
      table: 'flashcards',
      fieldId: 'front_content',
      fieldName: 'Front Content',
      dataType: 'TEXT',
      required: true,
      uiComponent: 'CardFront, QuestionSide',
      pageMapping: '/flashcards/:id/interactive',
      description: 'Question or prompt text'
    },
    {
      table: 'flashcards',
      fieldId: 'back_content',
      fieldName: 'Back Content',
      dataType: 'TEXT',
      required: true,
      uiComponent: 'CardBack, AnswerSide',
      pageMapping: '/flashcards/:id/interactive',
      description: 'Answer or explanation text'
    },
    {
      table: 'flashcards',
      fieldId: 'difficulty',
      fieldName: 'Difficulty',
      dataType: 'ENUM(easy,medium,hard)',
      required: true,
      uiComponent: 'DifficultyIndicator',
      pageMapping: '/flashcards',
      description: 'Card difficulty level'
    },
    
    // Flashcard Analytics
    {
      table: 'flashcard_analytics',
      fieldId: 'accuracy_rate',
      fieldName: 'Accuracy Rate',
      dataType: 'DECIMAL(5,2)',
      required: true,
      uiComponent: 'AccuracyMeter, PerformanceCard',
      pageMapping: '/flashcards, /study-plan/performance',
      description: 'Correct answer percentage'
    },
    {
      table: 'flashcard_analytics',
      fieldId: 'average_response_time',
      fieldName: 'Average Response Time',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'ResponseTimeChart, SpeedMetrics',
      pageMapping: '/study-plan/performance',
      description: 'Average response time in seconds'
    },
    {
      table: 'flashcard_analytics',
      fieldId: 'review_frequency',
      fieldName: 'Review Frequency',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'ReviewCounter, StudyFrequency',
      pageMapping: '/study-plan/performance',
      description: 'Number of reviews'
    },
    {
      table: 'flashcard_analytics',
      fieldId: 'confidence_level',
      fieldName: 'Confidence Level',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'ConfidenceIndicator, SelfAssessment',
      pageMapping: '/flashcards/:id/interactive',
      description: 'User confidence rating (1-5)'
    },
    
    // Study Plans
    {
      table: 'study_plans',
      fieldId: 'plan_id',
      fieldName: 'Study Plan ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'StudyPlanCard, PlanSelector',
      pageMapping: '/study-plan, /academic',
      description: 'Unique study plan identifier'
    },
    {
      table: 'study_plans',
      fieldId: 'plan_title',
      fieldName: 'Plan Title',
      dataType: 'VARCHAR(255)',
      required: true,
      uiComponent: 'PlanHeader, NEETStrategyCard',
      pageMapping: '/study-plan, /dashboard/student',
      description: 'Study plan name'
    },
    {
      table: 'study_plans',
      fieldId: 'exam_date',
      fieldName: 'Exam Date',
      dataType: 'DATE',
      required: true,
      uiComponent: 'ExamCountdown, DatePicker',
      pageMapping: '/study-plan, /dashboard/student',
      description: 'Target exam date'
    },
    {
      table: 'study_plans',
      fieldId: 'total_hours',
      fieldName: 'Total Study Hours',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'TotalHoursCard, ProgressTracker',
      pageMapping: '/study-plan',
      description: 'Planned total study hours'
    },
    {
      table: 'study_plans',
      fieldId: 'progress_percentage',
      fieldName: 'Progress Percentage',
      dataType: 'DECIMAL(5,2)',
      required: true,
      uiComponent: 'ProgressBar, CompletionMeter',
      pageMapping: '/study-plan, /dashboard/student',
      description: 'Overall completion percentage'
    },
    {
      table: 'study_plans',
      fieldId: 'status',
      fieldName: 'Plan Status',
      dataType: 'ENUM(active,paused,completed,draft)',
      required: true,
      uiComponent: 'StatusBadge, PlanCard',
      pageMapping: '/study-plan, /academic',
      description: 'Current plan status'
    },
    
    // Study Plan Subjects
    {
      table: 'study_plan_subjects',
      fieldId: 'subject_id',
      fieldName: 'Subject ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'SubjectCard, AnalysisSection',
      pageMapping: '/study-plan/analysis',
      description: 'Subject identifier in plan'
    },
    {
      table: 'study_plan_subjects',
      fieldId: 'subject_name',
      fieldName: 'Subject Name',
      dataType: 'VARCHAR(100)',
      required: true,
      uiComponent: 'SubjectBadge, ProgressCard',
      pageMapping: '/study-plan',
      description: 'Subject name (Physics, Chemistry, etc.)'
    },
    {
      table: 'study_plan_subjects',
      fieldId: 'weekly_hours',
      fieldName: 'Weekly Hours',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'WeeklyAllocation, TimeDistribution',
      pageMapping: '/study-plan/dashboard',
      description: 'Hours allocated per week'
    },
    {
      table: 'study_plan_subjects',
      fieldId: 'proficiency_level',
      fieldName: 'Proficiency Level',
      dataType: 'ENUM(weak,medium,strong)',
      required: true,
      uiComponent: 'ProficiencyIndicator, SubjectAnalysis',
      pageMapping: '/study-plan/analysis',
      description: 'Student strength in subject'
    },
    {
      table: 'study_plan_subjects',
      fieldId: 'priority',
      fieldName: 'Priority Level',
      dataType: 'ENUM(low,medium,high)',
      required: true,
      uiComponent: 'PriorityBadge, FocusIndicator',
      pageMapping: '/study-plan/analysis',
      description: 'Subject priority level'
    },
    
    // Practice Exams & Analytics
    {
      table: 'practice_exams',
      fieldId: 'exam_id',
      fieldName: 'Exam ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'ExamCard, ExamSelector',
      pageMapping: '/practice-exam',
      description: 'Unique exam identifier'
    },
    {
      table: 'practice_exams',
      fieldId: 'exam_title',
      fieldName: 'Exam Title',
      dataType: 'VARCHAR(255)',
      required: true,
      uiComponent: 'ExamHeader, ExamCard',
      pageMapping: '/practice-exam',
      description: 'Practice exam name'
    },
    {
      table: 'practice_exams',
      fieldId: 'total_questions',
      fieldName: 'Total Questions',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'QuestionCounter, ExamInfo',
      pageMapping: '/practice-exam/:id',
      description: 'Number of questions in exam'
    },
    {
      table: 'practice_exams',
      fieldId: 'duration_minutes',
      fieldName: 'Duration (Minutes)',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'TimerComponent, ExamInfo',
      pageMapping: '/practice-exam/:id/start',
      description: 'Exam time limit'
    },
    {
      table: 'practice_exams',
      fieldId: 'difficulty_level',
      fieldName: 'Difficulty Level',
      dataType: 'ENUM(easy,medium,hard)',
      required: true,
      uiComponent: 'DifficultyBadge',
      pageMapping: '/practice-exam',
      description: 'Overall exam difficulty'
    },
    
    // Exam Analytics
    {
      table: 'exam_analytics',
      fieldId: 'attempt_id',
      fieldName: 'Attempt ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'AttemptHistory, PerformanceTracker',
      pageMapping: '/study-plan/performance',
      description: 'Exam attempt identifier'
    },
    {
      table: 'exam_analytics',
      fieldId: 'score_percentage',
      fieldName: 'Score Percentage',
      dataType: 'DECIMAL(5,2)',
      required: true,
      uiComponent: 'ScoreCard, PerformanceChart',
      pageMapping: '/practice-exam/:id/review, /study-plan/performance',
      description: 'Exam score percentage'
    },
    {
      table: 'exam_analytics',
      fieldId: 'time_taken',
      fieldName: 'Time Taken',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'TimeAnalysis, SpeedMetrics',
      pageMapping: '/practice-exam/:id/review',
      description: 'Actual time taken in minutes'
    },
    {
      table: 'exam_analytics',
      fieldId: 'accuracy_by_subject',
      fieldName: 'Subject-wise Accuracy',
      dataType: 'JSON',
      required: true,
      uiComponent: 'SubjectBreakdown, AnalysisChart',
      pageMapping: '/practice-exam/:id/review',
      description: 'Accuracy for each subject'
    },
    {
      table: 'exam_analytics',
      fieldId: 'improvement_areas',
      fieldName: 'Improvement Areas',
      dataType: 'JSON',
      required: true,
      uiComponent: 'ImprovementSuggestions, WeakAreasList',
      pageMapping: '/practice-exam/:id/review',
      description: 'Areas needing improvement'
    },
    
    // Dashboard Cards & Analytics
    {
      table: 'dashboard_cards',
      fieldId: 'card_id',
      fieldName: 'Card ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'DashboardCard, Widget',
      pageMapping: '/dashboard/student',
      description: 'Dashboard card identifier'
    },
    {
      table: 'dashboard_cards',
      fieldId: 'card_type',
      fieldName: 'Card Type',
      dataType: 'VARCHAR(100)',
      required: true,
      uiComponent: 'CardContainer, WidgetType',
      pageMapping: '/dashboard/student',
      description: 'Type of dashboard card'
    },
    {
      table: 'dashboard_cards',
      fieldId: 'display_order',
      fieldName: 'Display Order',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'CardLayout, GridPosition',
      pageMapping: '/dashboard/student',
      description: 'Card position on dashboard'
    },
    {
      table: 'dashboard_cards',
      fieldId: 'is_visible',
      fieldName: 'Is Visible',
      dataType: 'BOOLEAN',
      required: true,
      uiComponent: 'VisibilityToggle, CardSettings',
      pageMapping: '/dashboard/student',
      description: 'Card visibility status'
    },
    {
      table: 'dashboard_cards',
      fieldId: 'card_data',
      fieldName: 'Card Data',
      dataType: 'JSON',
      required: true,
      uiComponent: 'CardContent, DataDisplay',
      pageMapping: '/dashboard/student',
      description: 'Dynamic card content and metrics'
    },
    
    // Feel Good Corner
    {
      table: 'feel_good_content',
      fieldId: 'content_id',
      fieldName: 'Content ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'ContentCard, FeelGoodItem',
      pageMapping: '/feel-good-corner',
      description: 'Feel good content identifier'
    },
    {
      table: 'feel_good_content',
      fieldId: 'content_type',
      fieldName: 'Content Type',
      dataType: 'ENUM(quote,story,achievement,tip)',
      required: true,
      uiComponent: 'ContentTypeFilter, CategoryBadge',
      pageMapping: '/feel-good-corner',
      description: 'Type of motivational content'
    },
    {
      table: 'feel_good_content',
      fieldId: 'title',
      fieldName: 'Content Title',
      dataType: 'VARCHAR(255)',
      required: true,
      uiComponent: 'ContentTitle, CardHeader',
      pageMapping: '/feel-good-corner',
      description: 'Content headline'
    },
    {
      table: 'feel_good_content',
      fieldId: 'content',
      fieldName: 'Content Text',
      dataType: 'TEXT',
      required: true,
      uiComponent: 'ContentBody, TextDisplay',
      pageMapping: '/feel-good-corner',
      description: 'Main content text'
    },
    {
      table: 'feel_good_content',
      fieldId: 'mood_tag',
      fieldName: 'Mood Tag',
      dataType: 'VARCHAR(50)',
      required: false,
      uiComponent: 'MoodBadge, EmotionFilter',
      pageMapping: '/feel-good-corner',
      description: 'Associated mood or emotion'
    },
    {
      table: 'feel_good_content',
      fieldId: 'interaction_count',
      fieldName: 'Interaction Count',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'PopularityIndicator, EngagementMetrics',
      pageMapping: '/feel-good-corner',
      description: 'Number of user interactions'
    },
    
    // AI Tutor Sessions
    {
      table: 'ai_tutor_sessions',
      fieldId: 'session_id',
      fieldName: 'Session ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'ChatSession, TutorInterface',
      pageMapping: '/tutor',
      description: 'AI tutor session identifier'
    },
    {
      table: 'ai_tutor_sessions',
      fieldId: 'session_start',
      fieldName: 'Session Start',
      dataType: 'TIMESTAMP',
      required: true,
      uiComponent: 'SessionTimer, ChatHeader',
      pageMapping: '/tutor',
      description: 'Session start timestamp'
    },
    {
      table: 'ai_tutor_sessions',
      fieldId: 'session_duration',
      fieldName: 'Session Duration',
      dataType: 'INTEGER',
      required: false,
      uiComponent: 'DurationCounter, SessionMetrics',
      pageMapping: '/tutor',
      description: 'Session length in minutes'
    },
    {
      table: 'ai_tutor_sessions',
      fieldId: 'query_count',
      fieldName: 'Query Count',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'QueryCounter, InteractionStats',
      pageMapping: '/tutor',
      description: 'Number of questions asked'
    },
    {
      table: 'ai_tutor_sessions',
      fieldId: 'subject_focus',
      fieldName: 'Subject Focus',
      dataType: 'VARCHAR(100)',
      required: false,
      uiComponent: 'SubjectTag, FocusIndicator',
      pageMapping: '/tutor',
      description: 'Primary subject discussed'
    },
    {
      table: 'ai_tutor_sessions',
      fieldId: 'satisfaction_rating',
      fieldName: 'Satisfaction Rating',
      dataType: 'INTEGER',
      required: false,
      uiComponent: 'RatingStars, FeedbackForm',
      pageMapping: '/tutor',
      description: 'Session satisfaction (1-5)'
    },
    
    // Formula Practice
    {
      table: 'formula_practice',
      fieldId: 'practice_id',
      fieldName: 'Practice ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'FormulaCard, PracticeInterface',
      pageMapping: '/concepts/:id/formula-lab',
      description: 'Formula practice session identifier'
    },
    {
      table: 'formula_practice',
      fieldId: 'formula_name',
      fieldName: 'Formula Name',
      dataType: 'VARCHAR(255)',
      required: true,
      uiComponent: 'FormulaTitle, PracticeHeader',
      pageMapping: '/concepts/:id/formula-lab',
      description: 'Mathematical formula name'
    },
    {
      table: 'formula_practice',
      fieldId: 'formula_expression',
      fieldName: 'Formula Expression',
      dataType: 'TEXT',
      required: true,
      uiComponent: 'FormulaDisplay, MathRenderer',
      pageMapping: '/concepts/:id/formula-lab',
      description: 'Mathematical expression'
    },
    {
      table: 'formula_practice',
      fieldId: 'practice_attempts',
      fieldName: 'Practice Attempts',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'AttemptCounter, ProgressTracker',
      pageMapping: '/concepts/:id/formula-lab',
      description: 'Number of practice attempts'
    },
    {
      table: 'formula_practice',
      fieldId: 'success_rate',
      fieldName: 'Success Rate',
      dataType: 'DECIMAL(5,2)',
      required: true,
      uiComponent: 'SuccessIndicator, AccuracyMeter',
      pageMapping: '/concepts/:id/formula-lab',
      description: 'Percentage of successful attempts'
    },
    {
      table: 'formula_practice',
      fieldId: 'average_solve_time',
      fieldName: 'Average Solve Time',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'TimeMetrics, SpeedIndicator',
      pageMapping: '/concepts/:id/formula-lab',
      description: 'Average time to solve in seconds'
    }
  ];

  // Convert to CSV format
  const headers = [
    'Table Name',
    'Field ID',
    'Field Name', 
    'Data Type',
    'Required',
    'UI Component',
    'Page Mapping',
    'Description'
  ];

  const csvContent = [
    headers.join(','),
    ...schema.map(row => [
      row.table,
      row.fieldId,
      `"${row.fieldName}"`,
      row.dataType,
      row.required,
      `"${row.uiComponent}"`,
      `"${row.pageMapping}"`,
      `"${row.description}"`
    ].join(','))
  ].join('\n');

  return csvContent;
};

export const exportDatabaseSchemaToJSON = (): string => {
  const schema = [
    // Core User Management
    {
      table: 'users',
      fieldId: 'user_id',
      fieldName: 'User ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'UserProfile, Dashboard Header',
      pageMapping: 'All Pages',
      description: 'Primary user identifier'
    },
    {
      table: 'users',
      fieldId: 'email',
      fieldName: 'Email',
      dataType: 'VARCHAR(255)',
      required: true,
      uiComponent: 'Login Form, Profile Settings',
      pageMapping: '/login, /profile',
      description: 'User email address'
    },
    {
      table: 'users',
      fieldId: 'name',
      fieldName: 'Full Name',
      dataType: 'VARCHAR(255)',
      required: true,
      uiComponent: 'NameSectionCard, StudentProfile',
      pageMapping: '/dashboard/student, /profile',
      description: 'User full name'
    },
    {
      table: 'users',
      fieldId: 'avatar',
      fieldName: 'Profile Picture',
      dataType: 'TEXT',
      required: false,
      uiComponent: 'Avatar Component, Sidebar',
      pageMapping: 'All Pages',
      description: 'User profile picture URL'
    },
    
    // Student Profile & Goals
    {
      table: 'student_profiles',
      fieldId: 'profile_id',
      fieldName: 'Profile ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'StudentProfileSection',
      pageMapping: '/study-plan',
      description: 'Student profile identifier'
    },
    {
      table: 'student_profiles',
      fieldId: 'exam_goal',
      fieldName: 'Exam Goal',
      dataType: 'VARCHAR(100)',
      required: true,
      uiComponent: 'NEETStrategyCard, GoalCard',
      pageMapping: '/dashboard/student, /study-plan',
      description: 'Target exam (NEET, JEE, etc.)'
    },
    {
      table: 'student_profiles',
      fieldId: 'target_exam_date',
      fieldName: 'Target Exam Date',
      dataType: 'DATE',
      required: true,
      uiComponent: 'CountdownCard, ExamDateWidget',
      pageMapping: '/dashboard/student, /study-plan',
      description: 'Exam date for countdown'
    },
    {
      table: 'student_profiles',
      fieldId: 'learning_pace',
      fieldName: 'Learning Pace',
      dataType: 'ENUM(slow,medium,fast)',
      required: true,
      uiComponent: 'StudentProfileSection',
      pageMapping: '/study-plan',
      description: 'Student learning speed preference'
    },
    {
      table: 'student_profiles',
      fieldId: 'preferred_study_time',
      fieldName: 'Preferred Study Time',
      dataType: 'ENUM(morning,afternoon,evening,night)',
      required: true,
      uiComponent: 'StudentProfileSection, TodaysPlan',
      pageMapping: '/study-plan, /today',
      description: 'Best study time for student'
    },
    {
      table: 'student_profiles',
      fieldId: 'study_hours_per_day',
      fieldName: 'Study Hours Per Day',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'StudyTargetCard, ProgressTracker',
      pageMapping: '/dashboard/student, /study-plan',
      description: 'Daily study hour target'
    },
    
    // Concept Cards & Analytics
    {
      table: 'concept_cards',
      fieldId: 'concept_id',
      fieldName: 'Concept ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'ConceptCard, ConceptDetail',
      pageMapping: '/concepts, /concepts/:id',
      description: 'Unique concept identifier'
    },
    {
      table: 'concept_cards',
      fieldId: 'title',
      fieldName: 'Concept Title',
      dataType: 'VARCHAR(255)',
      required: true,
      uiComponent: 'ConceptCard Header, DetailPage Title',
      pageMapping: '/concepts, /concepts/:id',
      description: 'Concept name/title'
    },
    {
      table: 'concept_cards',
      fieldId: 'subject',
      fieldName: 'Subject',
      dataType: 'ENUM(Physics,Chemistry,Biology,Mathematics)',
      required: true,
      uiComponent: 'SubjectBadge, FilterTabs',
      pageMapping: '/concepts, /study-plan',
      description: 'Academic subject category'
    },
    {
      table: 'concept_cards',
      fieldId: 'difficulty_level',
      fieldName: 'Difficulty Level',
      dataType: 'ENUM(easy,medium,hard)',
      required: true,
      uiComponent: 'DifficultyBadge, ProgressTracker',
      pageMapping: '/concepts, /study-plan',
      description: 'Concept difficulty rating'
    },
    {
      table: 'concept_cards',
      fieldId: 'content_summary',
      fieldName: 'Content Summary',
      dataType: 'TEXT',
      required: true,
      uiComponent: 'ConceptCard Description',
      pageMapping: '/concepts',
      description: 'Brief concept overview'
    },
    {
      table: 'concept_cards',
      fieldId: 'visual_content',
      fieldName: 'Visual Content',
      dataType: 'JSON',
      required: false,
      uiComponent: 'VisualTab, DiagramViewer',
      pageMapping: '/concepts/:id/visual',
      description: 'Images, diagrams, videos'
    },
    {
      table: 'concept_cards',
      fieldId: 'three_d_content',
      fieldName: '3D Content',
      dataType: 'JSON',
      required: false,
      uiComponent: '3DTab, InteractiveViewer',
      pageMapping: '/concepts/:id/3d',
      description: '3D models and simulations'
    },
    {
      table: 'concept_cards',
      fieldId: 'formula_lab_data',
      fieldName: 'Formula Lab Data',
      dataType: 'JSON',
      required: false,
      uiComponent: 'FormulaLabTab, Calculator',
      pageMapping: '/concepts/:id/formula-lab',
      description: 'Interactive formulas and calculations'
    },
    
    // Concept Analytics
    {
      table: 'concept_analytics',
      fieldId: 'analytics_id',
      fieldName: 'Analytics ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'AnalyticsCard, PerformanceTracker',
      pageMapping: '/concepts/:id, /study-plan/performance',
      description: 'Analytics record identifier'
    },
    {
      table: 'concept_analytics',
      fieldId: 'completion_rate',
      fieldName: 'Completion Rate',
      dataType: 'DECIMAL(5,2)',
      required: true,
      uiComponent: 'ProgressBar, CompletionBadge',
      pageMapping: '/concepts, /study-plan',
      description: 'Percentage of concept completed'
    },
    {
      table: 'concept_analytics',
      fieldId: 'mastery_level',
      fieldName: 'Mastery Level',
      dataType: 'DECIMAL(5,2)',
      required: true,
      uiComponent: 'MasteryIndicator, SubjectAnalysis',
      pageMapping: '/study-plan/analysis, /concepts/:id',
      description: 'Understanding level (0-100)'
    },
    {
      table: 'concept_analytics',
      fieldId: 'average_study_time',
      fieldName: 'Average Study Time',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'TimeTracker, StudyMetrics',
      pageMapping: '/study-plan/performance',
      description: 'Average time spent in minutes'
    },
    {
      table: 'concept_analytics',
      fieldId: 'total_attempts',
      fieldName: 'Total Attempts',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'AttemptsCounter, AnalyticsDashboard',
      pageMapping: '/study-plan/performance',
      description: 'Number of study attempts'
    },
    {
      table: 'concept_analytics',
      fieldId: 'last_accessed',
      fieldName: 'Last Accessed',
      dataType: 'TIMESTAMP',
      required: true,
      uiComponent: 'RecentActivity, LastSeen',
      pageMapping: '/dashboard/student',
      description: 'Last interaction timestamp'
    },
    
    // Flashcards & Analytics
    {
      table: 'flashcards',
      fieldId: 'flashcard_id',
      fieldName: 'Flashcard ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'FlashcardComponent, InteractiveCard',
      pageMapping: '/flashcards, /flashcards/:id',
      description: 'Unique flashcard identifier'
    },
    {
      table: 'flashcards',
      fieldId: 'front_content',
      fieldName: 'Front Content',
      dataType: 'TEXT',
      required: true,
      uiComponent: 'CardFront, QuestionSide',
      pageMapping: '/flashcards/:id/interactive',
      description: 'Question or prompt text'
    },
    {
      table: 'flashcards',
      fieldId: 'back_content',
      fieldName: 'Back Content',
      dataType: 'TEXT',
      required: true,
      uiComponent: 'CardBack, AnswerSide',
      pageMapping: '/flashcards/:id/interactive',
      description: 'Answer or explanation text'
    },
    {
      table: 'flashcards',
      fieldId: 'difficulty',
      fieldName: 'Difficulty',
      dataType: 'ENUM(easy,medium,hard)',
      required: true,
      uiComponent: 'DifficultyIndicator',
      pageMapping: '/flashcards',
      description: 'Card difficulty level'
    },
    
    // Flashcard Analytics
    {
      table: 'flashcard_analytics',
      fieldId: 'accuracy_rate',
      fieldName: 'Accuracy Rate',
      dataType: 'DECIMAL(5,2)',
      required: true,
      uiComponent: 'AccuracyMeter, PerformanceCard',
      pageMapping: '/flashcards, /study-plan/performance',
      description: 'Correct answer percentage'
    },
    {
      table: 'flashcard_analytics',
      fieldId: 'average_response_time',
      fieldName: 'Average Response Time',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'ResponseTimeChart, SpeedMetrics',
      pageMapping: '/study-plan/performance',
      description: 'Average response time in seconds'
    },
    {
      table: 'flashcard_analytics',
      fieldId: 'review_frequency',
      fieldName: 'Review Frequency',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'ReviewCounter, StudyFrequency',
      pageMapping: '/study-plan/performance',
      description: 'Number of reviews'
    },
    {
      table: 'flashcard_analytics',
      fieldId: 'confidence_level',
      fieldName: 'Confidence Level',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'ConfidenceIndicator, SelfAssessment',
      pageMapping: '/flashcards/:id/interactive',
      description: 'User confidence rating (1-5)'
    },
    
    // Study Plans
    {
      table: 'study_plans',
      fieldId: 'plan_id',
      fieldName: 'Study Plan ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'StudyPlanCard, PlanSelector',
      pageMapping: '/study-plan, /academic',
      description: 'Unique study plan identifier'
    },
    {
      table: 'study_plans',
      fieldId: 'plan_title',
      fieldName: 'Plan Title',
      dataType: 'VARCHAR(255)',
      required: true,
      uiComponent: 'PlanHeader, NEETStrategyCard',
      pageMapping: '/study-plan, /dashboard/student',
      description: 'Study plan name'
    },
    {
      table: 'study_plans',
      fieldId: 'exam_date',
      fieldName: 'Exam Date',
      dataType: 'DATE',
      required: true,
      uiComponent: 'ExamCountdown, DatePicker',
      pageMapping: '/study-plan, /dashboard/student',
      description: 'Target exam date'
    },
    {
      table: 'study_plans',
      fieldId: 'total_hours',
      fieldName: 'Total Study Hours',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'TotalHoursCard, ProgressTracker',
      pageMapping: '/study-plan',
      description: 'Planned total study hours'
    },
    {
      table: 'study_plans',
      fieldId: 'progress_percentage',
      fieldName: 'Progress Percentage',
      dataType: 'DECIMAL(5,2)',
      required: true,
      uiComponent: 'ProgressBar, CompletionMeter',
      pageMapping: '/study-plan, /dashboard/student',
      description: 'Overall completion percentage'
    },
    {
      table: 'study_plans',
      fieldId: 'status',
      fieldName: 'Plan Status',
      dataType: 'ENUM(active,paused,completed,draft)',
      required: true,
      uiComponent: 'StatusBadge, PlanCard',
      pageMapping: '/study-plan, /academic',
      description: 'Current plan status'
    },
    
    // Study Plan Subjects
    {
      table: 'study_plan_subjects',
      fieldId: 'subject_id',
      fieldName: 'Subject ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'SubjectCard, AnalysisSection',
      pageMapping: '/study-plan/analysis',
      description: 'Subject identifier in plan'
    },
    {
      table: 'study_plan_subjects',
      fieldId: 'subject_name',
      fieldName: 'Subject Name',
      dataType: 'VARCHAR(100)',
      required: true,
      uiComponent: 'SubjectBadge, ProgressCard',
      pageMapping: '/study-plan',
      description: 'Subject name (Physics, Chemistry, etc.)'
    },
    {
      table: 'study_plan_subjects',
      fieldId: 'weekly_hours',
      fieldName: 'Weekly Hours',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'WeeklyAllocation, TimeDistribution',
      pageMapping: '/study-plan/dashboard',
      description: 'Hours allocated per week'
    },
    {
      table: 'study_plan_subjects',
      fieldId: 'proficiency_level',
      fieldName: 'Proficiency Level',
      dataType: 'ENUM(weak,medium,strong)',
      required: true,
      uiComponent: 'ProficiencyIndicator, SubjectAnalysis',
      pageMapping: '/study-plan/analysis',
      description: 'Student strength in subject'
    },
    {
      table: 'study_plan_subjects',
      fieldId: 'priority',
      fieldName: 'Priority Level',
      dataType: 'ENUM(low,medium,high)',
      required: true,
      uiComponent: 'PriorityBadge, FocusIndicator',
      pageMapping: '/study-plan/analysis',
      description: 'Subject priority level'
    },
    
    // Practice Exams & Analytics
    {
      table: 'practice_exams',
      fieldId: 'exam_id',
      fieldName: 'Exam ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'ExamCard, ExamSelector',
      pageMapping: '/practice-exam',
      description: 'Unique exam identifier'
    },
    {
      table: 'practice_exams',
      fieldId: 'exam_title',
      fieldName: 'Exam Title',
      dataType: 'VARCHAR(255)',
      required: true,
      uiComponent: 'ExamHeader, ExamCard',
      pageMapping: '/practice-exam',
      description: 'Practice exam name'
    },
    {
      table: 'practice_exams',
      fieldId: 'total_questions',
      fieldName: 'Total Questions',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'QuestionCounter, ExamInfo',
      pageMapping: '/practice-exam/:id',
      description: 'Number of questions in exam'
    },
    {
      table: 'practice_exams',
      fieldId: 'duration_minutes',
      fieldName: 'Duration (Minutes)',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'TimerComponent, ExamInfo',
      pageMapping: '/practice-exam/:id/start',
      description: 'Exam time limit'
    },
    {
      table: 'practice_exams',
      fieldId: 'difficulty_level',
      fieldName: 'Difficulty Level',
      dataType: 'ENUM(easy,medium,hard)',
      required: true,
      uiComponent: 'DifficultyBadge',
      pageMapping: '/practice-exam',
      description: 'Overall exam difficulty'
    },
    
    // Exam Analytics
    {
      table: 'exam_analytics',
      fieldId: 'attempt_id',
      fieldName: 'Attempt ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'AttemptHistory, PerformanceTracker',
      pageMapping: '/study-plan/performance',
      description: 'Exam attempt identifier'
    },
    {
      table: 'exam_analytics',
      fieldId: 'score_percentage',
      fieldName: 'Score Percentage',
      dataType: 'DECIMAL(5,2)',
      required: true,
      uiComponent: 'ScoreCard, PerformanceChart',
      pageMapping: '/practice-exam/:id/review, /study-plan/performance',
      description: 'Exam score percentage'
    },
    {
      table: 'exam_analytics',
      fieldId: 'time_taken',
      fieldName: 'Time Taken',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'TimeAnalysis, SpeedMetrics',
      pageMapping: '/practice-exam/:id/review',
      description: 'Actual time taken in minutes'
    },
    {
      table: 'exam_analytics',
      fieldId: 'accuracy_by_subject',
      fieldName: 'Subject-wise Accuracy',
      dataType: 'JSON',
      required: true,
      uiComponent: 'SubjectBreakdown, AnalysisChart',
      pageMapping: '/practice-exam/:id/review',
      description: 'Accuracy for each subject'
    },
    {
      table: 'exam_analytics',
      fieldId: 'improvement_areas',
      fieldName: 'Improvement Areas',
      dataType: 'JSON',
      required: true,
      uiComponent: 'ImprovementSuggestions, WeakAreasList',
      pageMapping: '/practice-exam/:id/review',
      description: 'Areas needing improvement'
    },
    
    // Dashboard Cards & Analytics
    {
      table: 'dashboard_cards',
      fieldId: 'card_id',
      fieldName: 'Card ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'DashboardCard, Widget',
      pageMapping: '/dashboard/student',
      description: 'Dashboard card identifier'
    },
    {
      table: 'dashboard_cards',
      fieldId: 'card_type',
      fieldName: 'Card Type',
      dataType: 'VARCHAR(100)',
      required: true,
      uiComponent: 'CardContainer, WidgetType',
      pageMapping: '/dashboard/student',
      description: 'Type of dashboard card'
    },
    {
      table: 'dashboard_cards',
      fieldId: 'display_order',
      fieldName: 'Display Order',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'CardLayout, GridPosition',
      pageMapping: '/dashboard/student',
      description: 'Card position on dashboard'
    },
    {
      table: 'dashboard_cards',
      fieldId: 'is_visible',
      fieldName: 'Is Visible',
      dataType: 'BOOLEAN',
      required: true,
      uiComponent: 'VisibilityToggle, CardSettings',
      pageMapping: '/dashboard/student',
      description: 'Card visibility status'
    },
    {
      table: 'dashboard_cards',
      fieldId: 'card_data',
      fieldName: 'Card Data',
      dataType: 'JSON',
      required: true,
      uiComponent: 'CardContent, DataDisplay',
      pageMapping: '/dashboard/student',
      description: 'Dynamic card content and metrics'
    },
    
    // Feel Good Corner
    {
      table: 'feel_good_content',
      fieldId: 'content_id',
      fieldName: 'Content ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'ContentCard, FeelGoodItem',
      pageMapping: '/feel-good-corner',
      description: 'Feel good content identifier'
    },
    {
      table: 'feel_good_content',
      fieldId: 'content_type',
      fieldName: 'Content Type',
      dataType: 'ENUM(quote,story,achievement,tip)',
      required: true,
      uiComponent: 'ContentTypeFilter, CategoryBadge',
      pageMapping: '/feel-good-corner',
      description: 'Type of motivational content'
    },
    {
      table: 'feel_good_content',
      fieldId: 'title',
      fieldName: 'Content Title',
      dataType: 'VARCHAR(255)',
      required: true,
      uiComponent: 'ContentTitle, CardHeader',
      pageMapping: '/feel-good-corner',
      description: 'Content headline'
    },
    {
      table: 'feel_good_content',
      fieldId: 'content',
      fieldName: 'Content Text',
      dataType: 'TEXT',
      required: true,
      uiComponent: 'ContentBody, TextDisplay',
      pageMapping: '/feel-good-corner',
      description: 'Main content text'
    },
    {
      table: 'feel_good_content',
      fieldId: 'mood_tag',
      fieldName: 'Mood Tag',
      dataType: 'VARCHAR(50)',
      required: false,
      uiComponent: 'MoodBadge, EmotionFilter',
      pageMapping: '/feel-good-corner',
      description: 'Associated mood or emotion'
    },
    {
      table: 'feel_good_content',
      fieldId: 'interaction_count',
      fieldName: 'Interaction Count',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'PopularityIndicator, EngagementMetrics',
      pageMapping: '/feel-good-corner',
      description: 'Number of user interactions'
    },
    
    // AI Tutor Sessions
    {
      table: 'ai_tutor_sessions',
      fieldId: 'session_id',
      fieldName: 'Session ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'ChatSession, TutorInterface',
      pageMapping: '/tutor',
      description: 'AI tutor session identifier'
    },
    {
      table: 'ai_tutor_sessions',
      fieldId: 'session_start',
      fieldName: 'Session Start',
      dataType: 'TIMESTAMP',
      required: true,
      uiComponent: 'SessionTimer, ChatHeader',
      pageMapping: '/tutor',
      description: 'Session start timestamp'
    },
    {
      table: 'ai_tutor_sessions',
      fieldId: 'session_duration',
      fieldName: 'Session Duration',
      dataType: 'INTEGER',
      required: false,
      uiComponent: 'DurationCounter, SessionMetrics',
      pageMapping: '/tutor',
      description: 'Session length in minutes'
    },
    {
      table: 'ai_tutor_sessions',
      fieldId: 'query_count',
      fieldName: 'Query Count',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'QueryCounter, InteractionStats',
      pageMapping: '/tutor',
      description: 'Number of questions asked'
    },
    {
      table: 'ai_tutor_sessions',
      fieldId: 'subject_focus',
      fieldName: 'Subject Focus',
      dataType: 'VARCHAR(100)',
      required: false,
      uiComponent: 'SubjectTag, FocusIndicator',
      pageMapping: '/tutor',
      description: 'Primary subject discussed'
    },
    {
      table: 'ai_tutor_sessions',
      fieldId: 'satisfaction_rating',
      fieldName: 'Satisfaction Rating',
      dataType: 'INTEGER',
      required: false,
      uiComponent: 'RatingStars, FeedbackForm',
      pageMapping: '/tutor',
      description: 'Session satisfaction (1-5)'
    },
    
    // Formula Practice
    {
      table: 'formula_practice',
      fieldId: 'practice_id',
      fieldName: 'Practice ID',
      dataType: 'VARCHAR(36)',
      required: true,
      uiComponent: 'FormulaCard, PracticeInterface',
      pageMapping: '/concepts/:id/formula-lab',
      description: 'Formula practice session identifier'
    },
    {
      table: 'formula_practice',
      fieldId: 'formula_name',
      fieldName: 'Formula Name',
      dataType: 'VARCHAR(255)',
      required: true,
      uiComponent: 'FormulaTitle, PracticeHeader',
      pageMapping: '/concepts/:id/formula-lab',
      description: 'Mathematical formula name'
    },
    {
      table: 'formula_practice',
      fieldId: 'formula_expression',
      fieldName: 'Formula Expression',
      dataType: 'TEXT',
      required: true,
      uiComponent: 'FormulaDisplay, MathRenderer',
      pageMapping: '/concepts/:id/formula-lab',
      description: 'Mathematical expression'
    },
    {
      table: 'formula_practice',
      fieldId: 'practice_attempts',
      fieldName: 'Practice Attempts',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'AttemptCounter, ProgressTracker',
      pageMapping: '/concepts/:id/formula-lab',
      description: 'Number of practice attempts'
    },
    {
      table: 'formula_practice',
      fieldId: 'success_rate',
      fieldName: 'Success Rate',
      dataType: 'DECIMAL(5,2)',
      required: true,
      uiComponent: 'SuccessIndicator, AccuracyMeter',
      pageMapping: '/concepts/:id/formula-lab',
      description: 'Percentage of successful attempts'
    },
    {
      table: 'formula_practice',
      fieldId: 'average_solve_time',
      fieldName: 'Average Solve Time',
      dataType: 'INTEGER',
      required: true,
      uiComponent: 'TimeMetrics, SpeedIndicator',
      pageMapping: '/concepts/:id/formula-lab',
      description: 'Average time to solve in seconds'
    }
  ];
  
  return JSON.stringify(schema, null, 2);
};

export const exportDatabaseSchemaToSQL = (): string => {
  const sqlStatements = [
    // Core Users table
    `CREATE TABLE users (
      user_id VARCHAR(36) PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      avatar TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`,
    
    // Student Profiles
    `CREATE TABLE student_profiles (
      profile_id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      exam_goal VARCHAR(100) NOT NULL,
      target_exam_date DATE NOT NULL,
      learning_pace ENUM('slow','medium','fast') NOT NULL,
      preferred_study_time ENUM('morning','afternoon','evening','night') NOT NULL,
      study_hours_per_day INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    );`,
    
    // Concept Cards
    `CREATE TABLE concept_cards (
      concept_id VARCHAR(36) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      subject ENUM('Physics','Chemistry','Biology','Mathematics') NOT NULL,
      difficulty_level ENUM('easy','medium','hard') NOT NULL,
      content_summary TEXT NOT NULL,
      visual_content JSON,
      three_d_content JSON,
      formula_lab_data JSON,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
    
    // Flashcards
    `CREATE TABLE flashcards (
      flashcard_id VARCHAR(36) PRIMARY KEY,
      front_content TEXT NOT NULL,
      back_content TEXT NOT NULL,
      difficulty ENUM('easy','medium','hard') NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
    
    // Study Plans
    `CREATE TABLE study_plans (
      plan_id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      plan_title VARCHAR(255) NOT NULL,
      exam_date DATE NOT NULL,
      total_hours INTEGER NOT NULL,
      progress_percentage DECIMAL(5,2) NOT NULL,
      status ENUM('active','paused','completed','draft') NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    );`,
    
    // Study Plan Subjects
    `CREATE TABLE study_plan_subjects (
      subject_id VARCHAR(36) PRIMARY KEY,
      plan_id VARCHAR(36) NOT NULL,
      subject_name VARCHAR(100) NOT NULL,
      weekly_hours INTEGER NOT NULL,
      proficiency_level ENUM('weak','medium','strong') NOT NULL,
      priority ENUM('low','medium','high') NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (plan_id) REFERENCES study_plans(plan_id)
    );`,
    
    // Practice Exams
    `CREATE TABLE practice_exams (
      exam_id VARCHAR(36) PRIMARY KEY,
      exam_title VARCHAR(255) NOT NULL,
      total_questions INTEGER NOT NULL,
      duration_minutes INTEGER NOT NULL,
      difficulty_level ENUM('easy','medium','hard') NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
    
    // Exam Analytics
    `CREATE TABLE exam_analytics (
      attempt_id VARCHAR(36) PRIMARY KEY,
      exam_id VARCHAR(36) NOT NULL,
      score_percentage DECIMAL(5,2) NOT NULL,
      time_taken INTEGER NOT NULL,
      accuracy_by_subject JSON NOT NULL,
      improvement_areas JSON NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (exam_id) REFERENCES practice_exams(exam_id)
    );`,
    
    // Dashboard Cards
    `CREATE TABLE dashboard_cards (
      card_id VARCHAR(36) PRIMARY KEY,
      card_type VARCHAR(100) NOT NULL,
      display_order INTEGER NOT NULL,
      is_visible BOOLEAN NOT NULL,
      card_data JSON NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
    
    // Feel Good Content
    `CREATE TABLE feel_good_content (
      content_id VARCHAR(36) PRIMARY KEY,
      content_type ENUM('quote','story','achievement','tip') NOT NULL,
      title VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      mood_tag VARCHAR(50),
      interaction_count INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );`,
    
    // AI Tutor Sessions
    `CREATE TABLE ai_tutor_sessions (
      session_id VARCHAR(36) PRIMARY KEY,
      user_id VARCHAR(36) NOT NULL,
      session_start TIMESTAMP NOT NULL,
      session_duration INTEGER,
      query_count INTEGER NOT NULL,
      subject_focus VARCHAR(100),
      satisfaction_rating INTEGER,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    );`,
    
    // Formula Practice
    `CREATE TABLE formula_practice (
      practice_id VARCHAR(36) PRIMARY KEY,
      concept_id VARCHAR(36) NOT NULL,
      formula_name VARCHAR(255) NOT NULL,
      formula_expression TEXT NOT NULL,
      practice_attempts INTEGER NOT NULL,
      success_rate DECIMAL(5,2) NOT NULL,
      average_solve_time INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (concept_id) REFERENCES concept_cards(concept_id)
    );`
  ];
  
  return sqlStatements.join('\n\n');
};
