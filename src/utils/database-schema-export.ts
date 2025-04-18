
import { generateDatabaseSchema } from './schemaExport';

export const exportDatabaseSchemaToCSV = (): void => {
  const tables = generateDatabaseSchema();
  
  // Create CSV content with more detailed headers
  let csvContent = 'Module,Module Description,Table Name,Table Description,Field Name,Field Type,Is Required,Is Primary Key,Is Foreign Key,References,Description\n';
  
  // Detailed module descriptions
  const moduleDescriptions = {
    'User Management': 'Manages user accounts, authentication, and basic profile information across different user types.',
    'Student Management': 'Tracks student-specific data including goals, subjects, study progress, and academic metrics.',
    'Learning Content': 'Stores educational content like concept cards, flashcards, questions, and study materials.',
    'Personalization': 'Captures user mood, interactions, and personalization data to enhance learning experience.',
    'System Management': 'Manages system-level configurations, logs, and AI model settings.',
    'Employee Management': 'Handles professional user profiles including employees, doctors, and founders.'
  };

  // Detailed table descriptions
  const tableDescriptions = {
    'users': 'Core user account information for all user types',
    'students': 'Detailed student profile and academic information',
    'student_goals': 'Individual learning goals and progress tracking',
    'concept_cards': 'Educational concept cards for various subjects',
    'mood_logs': 'User mood tracking and emotional analysis',
    'system_logs': 'Application and system event logging',
    'admin_users': 'Administrative user accounts with special privileges',
    'login_history': 'User login and authentication history',
    'user_settings': 'User preferences and configuration settings',
    'subscriptions': 'User subscription plans and payment information',
    'onboarding_data': 'Data collected during the onboarding process',
    'student_subjects': 'Subjects that students are studying',
    'subject_topics': 'Topics within each subject',
    'quiz_scores': 'Student performance in quizzes',
    'study_hours': 'Time spent studying by students',
    'study_streaks': 'Consecutive days of study activity',
    'flashcards': 'Study flashcards for memorization',
    'questions': 'Practice and assessment questions',
    'exam_papers': 'Mock and practice exam papers',
    'study_plans': 'Structured learning plans for students',
    'study_sessions': 'Individual study session records',
    'content_item_references': 'References to content items across the platform',
    'feel_good_content': 'Positive content to improve student mood',
    'surrounding_influences': 'Environmental factors affecting student learning',
    'user_doubts': 'Questions and uncertainties raised by students',
    'tutor_chats': 'Conversations between students and tutors',
    'ai_model_settings': 'Configuration for AI models used in the system',
    'notifications': 'User notification preferences and history',
    'employees': 'Employee user profiles',
    'founders': 'Founder user profiles',
    'doctors': 'Doctor user profiles'
  };

  Object.entries(moduleDescriptions).forEach(([moduleName, moduleDescription]) => {
    const moduleTableNames = Object.keys(generateDatabaseSchema().reduce((acc, table) => {
      // Group tables by module based on naming convention
      const tableToModuleMap = {
        'User Management': ['users', 'admin_users', 'login_history', 'user_settings', 'subscriptions', 'onboarding_data'],
        'Student Management': ['students', 'student_goals', 'student_subjects', 'subject_topics', 'quiz_scores', 'study_hours', 'study_streaks'],
        'Learning Content': ['concept_cards', 'flashcards', 'questions', 'exam_papers', 'study_plans', 'study_sessions', 'content_item_references'],
        'Personalization': ['mood_logs', 'feel_good_content', 'surrounding_influences', 'user_doubts', 'tutor_chats'],
        'System Management': ['ai_model_settings', 'system_logs', 'notifications'],
        'Employee Management': ['employees', 'founders', 'doctors']
      }[moduleName] || [];
      
      tableToModuleMap.forEach(tableName => {
        acc[tableName] = true;
      });
      return acc;
    }, {}));

    const moduleTables = tables.filter(table => 
      moduleTableNames.includes(table.tableName)
    );
    
    moduleTables.forEach(table => {
      table.fields.forEach(field => {
        csvContent += `"${moduleName}","${moduleDescription}","${table.tableName}","${tableDescriptions[table.tableName] || 'General purpose table'}","${field.name}","${field.type}",${field.isRequired},${field.isPrimaryKey},${field.isForeignKey},"${field.references || ''}","${field.description || 'Field description here'}"\n`;
      });
    });
  });

  // Create downloadable file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'sakha_ai_database_schema.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Expose a function to generate Excel via CSV
export const downloadDatabaseSchemaCSV = () => {
  exportDatabaseSchemaToCSV();
};
