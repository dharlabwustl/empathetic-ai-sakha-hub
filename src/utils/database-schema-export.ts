
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
    'system_logs': 'Application and system event logging'
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
        csvContent += `"${moduleName}","${moduleDescription}","${table.tableName}","${tableDescriptions[table.tableName] || 'General purpose table'}","${field.name}","${field.type}",${field.isRequired},${field.isPrimaryKey},${field.isForeignKey},"${field.references || ''}","Field description here"\n`;
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

// Optionally expose a function to generate Excel via CSV
export const downloadDatabaseSchemaCSV = () => {
  exportDatabaseSchemaToCSV();
};
