
export interface DatabaseTable {
  id: string;
  name: string;
  description: string;
  fields: DatabaseField[];
  uiMapping?: UIMapping;
  exportFormats: ExportFormat[];
}

export interface DatabaseField {
  id: string;
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'array' | 'object';
  required: boolean;
  description: string;
  uiComponent?: string;
  dashboardMapping?: string;
}

export interface UIMapping {
  componentPath: string;
  fieldMappings: Record<string, string>;
  dashboardCards: string[];
  analyticsIntegration: boolean;
}

export interface ExportFormat {
  format: 'csv' | 'json' | 'sql';
  available: boolean;
}

export const getDatabaseSchema = (): DatabaseTable[] => {
  return [
    {
      id: 'students',
      name: 'Students',
      description: 'Student profile and academic information',
      fields: [
        { id: 'student_id', name: 'Student ID', type: 'string', required: true, description: 'Unique identifier', uiComponent: 'ProfileCard', dashboardMapping: 'dashboard.student.profile' },
        { id: 'name', name: 'Name', type: 'string', required: true, description: 'Student full name', uiComponent: 'NameSection', dashboardMapping: 'dashboard.student.name' },
        { id: 'email', name: 'Email', type: 'string', required: true, description: 'Student email address', uiComponent: 'ContactInfo', dashboardMapping: 'dashboard.student.contact' },
        { id: 'exam_goal', name: 'Exam Goal', type: 'string', required: true, description: 'Target exam (NEET, JEE)', uiComponent: 'ExamGoalCard', dashboardMapping: 'dashboard.student.examGoal' },
        { id: 'target_date', name: 'Target Date', type: 'date', required: true, description: 'Exam target date', uiComponent: 'ExamDateCard', dashboardMapping: 'dashboard.student.examDate' },
        { id: 'learning_pace', name: 'Learning Pace', type: 'string', required: false, description: 'slow/medium/fast', uiComponent: 'StudyPreferences', dashboardMapping: 'dashboard.student.preferences' },
        { id: 'study_hours_per_day', name: 'Study Hours/Day', type: 'number', required: false, description: 'Daily study hours', uiComponent: 'StudySchedule', dashboardMapping: 'dashboard.student.schedule' },
        { id: 'subscription_plan', name: 'Subscription', type: 'string', required: false, description: 'Current plan', uiComponent: 'SubscriptionCard', dashboardMapping: 'dashboard.student.subscription' }
      ],
      uiMapping: {
        componentPath: '/dashboard/student',
        fieldMappings: {
          'student_id': 'ProfileCard.id',
          'name': 'NameSection.displayName',
          'exam_goal': 'ExamGoalCard.examType',
          'target_date': 'ExamDateCard.targetDate'
        },
        dashboardCards: ['NameSection', 'ExamGoalCard', 'SubscriptionCard'],
        analyticsIntegration: true
      },
      exportFormats: [
        { format: 'csv', available: true },
        { format: 'json', available: true },
        { format: 'sql', available: true }
      ]
    },
    {
      id: 'study_plans',
      name: 'Study Plans',
      description: 'Comprehensive study plan data with adaptive features',
      fields: [
        { id: 'plan_id', name: 'Plan ID', type: 'string', required: true, description: 'Unique plan identifier', uiComponent: 'StudyPlanPage', dashboardMapping: 'study-plan.header' },
        { id: 'student_id', name: 'Student ID', type: 'string', required: true, description: 'Associated student', uiComponent: 'StudentProfileSection', dashboardMapping: 'study-plan.profile' },
        { id: 'exam_name', name: 'Exam Name', type: 'string', required: true, description: 'Target exam', uiComponent: 'ExamGoalDisplay', dashboardMapping: 'study-plan.examGoal' },
        { id: 'exam_date', name: 'Exam Date', type: 'date', required: true, description: 'Scheduled exam date', uiComponent: 'ExamDateDisplay', dashboardMapping: 'study-plan.examDate' },
        { id: 'total_hours', name: 'Total Hours', type: 'number', required: true, description: 'Total study hours planned', uiComponent: 'StudyHoursCard', dashboardMapping: 'study-plan.totalHours' },
        { id: 'weekly_hours', name: 'Weekly Hours', type: 'number', required: true, description: 'Hours per week', uiComponent: 'WeeklyTargetCard', dashboardMapping: 'study-plan.weeklyTarget' },
        { id: 'progress_percent', name: 'Progress %', type: 'number', required: false, description: 'Overall completion percentage', uiComponent: 'ProgressCard', dashboardMapping: 'study-plan.progress' },
        { id: 'learning_pace', name: 'Learning Pace', type: 'string', required: false, description: 'slow/medium/fast', uiComponent: 'SettingsSection', dashboardMapping: 'study-plan.settings.pace' },
        { id: 'preferred_study_time', name: 'Study Time', type: 'string', required: false, description: 'morning/afternoon/evening/night', uiComponent: 'SettingsSection', dashboardMapping: 'study-plan.settings.time' },
        { id: 'available_days_per_week', name: 'Days/Week', type: 'number', required: false, description: 'Available study days', uiComponent: 'SettingsSection', dashboardMapping: 'study-plan.settings.days' }
      ],
      uiMapping: {
        componentPath: '/dashboard/student/study-plan',
        fieldMappings: {
          'plan_id': 'StudyPlanPage.planId',
          'progress_percent': 'ProgressCard.value',
          'weekly_hours': 'WeeklyTargetCard.target'
        },
        dashboardCards: ['ProgressCard', 'WeeklyTargetCard', 'StudyHoursCard'],
        analyticsIntegration: true
      },
      exportFormats: [
        { format: 'csv', available: true },
        { format: 'json', available: true },
        { format: 'sql', available: true }
      ]
    },
    {
      id: 'subjects',
      name: 'Subjects',
      description: 'Subject-wise performance and analysis data',
      fields: [
        { id: 'subject_id', name: 'Subject ID', type: 'string', required: true, description: 'Unique subject identifier', uiComponent: 'SubjectCard', dashboardMapping: 'study-plan.subjects' },
        { id: 'student_id', name: 'Student ID', type: 'string', required: true, description: 'Associated student', uiComponent: 'SubjectAnalysisSection', dashboardMapping: 'study-plan.analysis' },
        { id: 'name', name: 'Subject Name', type: 'string', required: true, description: 'Physics/Chemistry/Biology', uiComponent: 'SubjectCard.title', dashboardMapping: 'study-plan.subjects.name' },
        { id: 'proficiency', name: 'Proficiency', type: 'string', required: true, description: 'weak/medium/strong', uiComponent: 'SubjectCard.proficiency', dashboardMapping: 'study-plan.subjects.proficiency' },
        { id: 'confidence_level', name: 'Confidence', type: 'number', required: false, description: '1-5 scale', uiComponent: 'ConfidenceRating', dashboardMapping: 'study-plan.subjects.confidence' },
        { id: 'hours_per_week', name: 'Hours/Week', type: 'number', required: true, description: 'Weekly allocation', uiComponent: 'SubjectCard.hours', dashboardMapping: 'study-plan.subjects.hours' },
        { id: 'progress_percent', name: 'Progress %', type: 'number', required: false, description: 'Subject completion', uiComponent: 'SubjectProgress', dashboardMapping: 'study-plan.subjects.progress' },
        { id: 'priority', name: 'Priority', type: 'string', required: false, description: 'low/medium/high', uiComponent: 'PriorityBadge', dashboardMapping: 'study-plan.subjects.priority' },
        { id: 'color', name: 'Color Code', type: 'string', required: false, description: 'UI color identifier', uiComponent: 'SubjectCard.color', dashboardMapping: 'study-plan.subjects.color' }
      ],
      uiMapping: {
        componentPath: '/dashboard/student/study-plan',
        fieldMappings: {
          'subject_id': 'SubjectCard.id',
          'name': 'SubjectCard.title',
          'proficiency': 'SubjectCard.proficiencyBadge'
        },
        dashboardCards: ['SubjectCard', 'SubjectProgress', 'PriorityBadge'],
        analyticsIntegration: true
      },
      exportFormats: [
        { format: 'csv', available: true },
        { format: 'json', available: true },
        { format: 'sql', available: true }
      ]
    },
    {
      id: 'daily_plans',
      name: 'Daily Study Plans',
      description: 'Daily study schedule with adaptive features',
      fields: [
        { id: 'daily_plan_id', name: 'Daily Plan ID', type: 'string', required: true, description: 'Unique daily plan identifier', uiComponent: 'AdaptivePlanTable', dashboardMapping: 'study-plan.dailyPlan' },
        { id: 'student_id', name: 'Student ID', type: 'string', required: true, description: 'Associated student', uiComponent: 'AdaptivePlanTable.row', dashboardMapping: 'study-plan.dailyPlan.student' },
        { id: 'date', name: 'Date', type: 'date', required: true, description: 'Study date', uiComponent: 'DateCell', dashboardMapping: 'study-plan.dailyPlan.date' },
        { id: 'subject', name: 'Subject', type: 'string', required: true, description: 'Subject to study', uiComponent: 'SubjectCell', dashboardMapping: 'study-plan.dailyPlan.subject' },
        { id: 'topics', name: 'Topics', type: 'array', required: true, description: 'Topics to cover', uiComponent: 'TopicsCell', dashboardMapping: 'study-plan.dailyPlan.topics' },
        { id: 'study_hours', name: 'Study Hours', type: 'number', required: true, description: 'Planned hours', uiComponent: 'HoursCell', dashboardMapping: 'study-plan.dailyPlan.hours' },
        { id: 'time_of_study', name: 'Study Time', type: 'string', required: false, description: 'Morning/Afternoon/Evening/Night', uiComponent: 'TimeSelect', dashboardMapping: 'study-plan.dailyPlan.time' },
        { id: 'focus_level', name: 'Focus Level', type: 'string', required: false, description: 'High/Medium/Low', uiComponent: 'FocusSelect', dashboardMapping: 'study-plan.dailyPlan.focus' },
        { id: 'status', name: 'Status', type: 'string', required: false, description: 'Done/Skipped/Pending', uiComponent: 'StatusSelect', dashboardMapping: 'study-plan.dailyPlan.status' },
        { id: 'mood', name: 'Mood', type: 'string', required: false, description: 'Study session mood', uiComponent: 'MoodTracker', dashboardMapping: 'study-plan.dailyPlan.mood' }
      ],
      uiMapping: {
        componentPath: '/dashboard/student/study-plan',
        fieldMappings: {
          'daily_plan_id': 'AdaptivePlanTable.rowId',
          'status': 'StatusSelect.value',
          'focus_level': 'FocusSelect.value'
        },
        dashboardCards: ['AdaptivePlanTable', 'StatusTracker', 'FocusLevelIndicator'],
        analyticsIntegration: true
      },
      exportFormats: [
        { format: 'csv', available: true },
        { format: 'json', available: true },
        { format: 'sql', available: true }
      ]
    },
    {
      id: 'concept_cards',
      name: 'Concept Cards',
      description: 'Interactive concept learning cards with analytics',
      fields: [
        { id: 'concept_id', name: 'Concept ID', type: 'string', required: true, description: 'Unique concept identifier', uiComponent: 'ConceptCard', dashboardMapping: 'concepts.card' },
        { id: 'title', name: 'Title', type: 'string', required: true, description: 'Concept title', uiComponent: 'ConceptCard.title', dashboardMapping: 'concepts.card.title' },
        { id: 'subject', name: 'Subject', type: 'string', required: true, description: 'Physics/Chemistry/Biology', uiComponent: 'SubjectBadge', dashboardMapping: 'concepts.card.subject' },
        { id: 'difficulty', name: 'Difficulty', type: 'string', required: false, description: 'Easy/Medium/Hard', uiComponent: 'DifficultyBadge', dashboardMapping: 'concepts.card.difficulty' },
        { id: 'mastery_level', name: 'Mastery Level', type: 'number', required: false, description: '0-100 percentage', uiComponent: 'MasteryProgress', dashboardMapping: 'concepts.card.mastery' },
        { id: 'study_time', name: 'Study Time', type: 'number', required: false, description: 'Minutes spent', uiComponent: 'StudyTimeTracker', dashboardMapping: 'concepts.card.studyTime' },
        { id: 'last_studied', name: 'Last Studied', type: 'date', required: false, description: 'Last study date', uiComponent: 'LastStudiedIndicator', dashboardMapping: 'concepts.card.lastStudied' },
        { id: 'bookmarked', name: 'Bookmarked', type: 'boolean', required: false, description: 'Is bookmarked', uiComponent: 'BookmarkButton', dashboardMapping: 'concepts.card.bookmarked' }
      ],
      uiMapping: {
        componentPath: '/dashboard/student/concepts',
        fieldMappings: {
          'concept_id': 'ConceptCard.id',
          'mastery_level': 'MasteryProgress.value',
          'bookmarked': 'BookmarkButton.active'
        },
        dashboardCards: ['ConceptCard', 'MasteryProgress', 'StudyTimeTracker'],
        analyticsIntegration: true
      },
      exportFormats: [
        { format: 'csv', available: true },
        { format: 'json', available: true },
        { format: 'sql', available: true }
      ]
    },
    {
      id: 'performance_tracker',
      name: 'Performance Tracker',
      description: 'Student performance metrics and analytics',
      fields: [
        { id: 'performance_id', name: 'Performance ID', type: 'string', required: true, description: 'Unique performance record', uiComponent: 'PerformanceCard', dashboardMapping: 'performance.tracker' },
        { id: 'student_id', name: 'Student ID', type: 'string', required: true, description: 'Associated student', uiComponent: 'PerformanceSection', dashboardMapping: 'performance.student' },
        { id: 'subject', name: 'Subject', type: 'string', required: true, description: 'Subject name', uiComponent: 'SubjectPerformance', dashboardMapping: 'performance.subject' },
        { id: 'current_score', name: 'Current Score', type: 'number', required: false, description: 'Current performance %', uiComponent: 'ScoreDisplay', dashboardMapping: 'performance.currentScore' },
        { id: 'previous_score', name: 'Previous Score', type: 'number', required: false, description: 'Previous performance %', uiComponent: 'PreviousScoreDisplay', dashboardMapping: 'performance.previousScore' },
        { id: 'improvement', name: 'Improvement', type: 'number', required: false, description: 'Improvement percentage', uiComponent: 'ImprovementBadge', dashboardMapping: 'performance.improvement' },
        { id: 'study_hours', name: 'Study Hours', type: 'number', required: false, description: 'Total hours studied', uiComponent: 'StudyHoursDisplay', dashboardMapping: 'performance.studyHours' },
        { id: 'concepts_mastered', name: 'Concepts Mastered', type: 'number', required: false, description: 'Number of mastered concepts', uiComponent: 'ConceptsMastered', dashboardMapping: 'performance.conceptsMastered' },
        { id: 'weak_areas', name: 'Weak Areas', type: 'array', required: false, description: 'Areas needing improvement', uiComponent: 'WeakAreasDisplay', dashboardMapping: 'performance.weakAreas' },
        { id: 'strong_areas', name: 'Strong Areas', type: 'array', required: false, description: 'Strong performance areas', uiComponent: 'StrongAreasDisplay', dashboardMapping: 'performance.strongAreas' }
      ],
      uiMapping: {
        componentPath: '/dashboard/student/study-plan',
        fieldMappings: {
          'performance_id': 'PerformanceCard.id',
          'current_score': 'ScoreDisplay.value',
          'improvement': 'ImprovementBadge.value'
        },
        dashboardCards: ['PerformanceCard', 'ScoreDisplay', 'ImprovementBadge'],
        analyticsIntegration: true
      },
      exportFormats: [
        { format: 'csv', available: true },
        { format: 'json', available: true },
        { format: 'sql', available: true }
      ]
    }
  ];
};

export const exportDatabaseSchema = (format: 'csv' | 'json' | 'sql' = 'json'): string => {
  const schema = getDatabaseSchema();
  
  switch (format) {
    case 'csv':
      const csvHeaders = ['Table', 'Field ID', 'Field Name', 'Type', 'Required', 'UI Component', 'Dashboard Mapping'];
      const csvRows = schema.flatMap(table => 
        table.fields.map(field => [
          table.name,
          field.id,
          field.name,
          field.type,
          field.required.toString(),
          field.uiComponent || '',
          field.dashboardMapping || ''
        ])
      );
      return [csvHeaders, ...csvRows].map(row => row.join(',')).join('\n');
      
    case 'sql':
      return schema.map(table => {
        const fields = table.fields.map(field => 
          `  ${field.id} ${field.type.toUpperCase()}${field.required ? ' NOT NULL' : ''} -- ${field.description}`
        ).join(',\n');
        return `CREATE TABLE ${table.id} (\n${fields}\n);`;
      }).join('\n\n');
      
    default:
      return JSON.stringify(schema, null, 2);
  }
};
