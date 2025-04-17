
import { generateDatabaseSchema } from './schemaExport';

export const exportDatabaseSchemaToCSV = (): void => {
  const tables = generateDatabaseSchema();
  
  // Create CSV content
  let csvContent = 'Module,Table Name,Field Name,Field Type,Is Required,Is Primary Key,Is Foreign Key,References\n';
  
  // Group tables by module (based on naming convention)
  const moduleGroups = {
    'User Management': ['users', 'admin_users', 'login_history', 'user_settings', 'subscriptions', 'onboarding_data'],
    'Student Management': ['students', 'student_goals', 'student_subjects', 'subject_topics', 'quiz_scores', 'study_hours', 'study_streaks'],
    'Learning Content': ['concept_cards', 'flashcards', 'questions', 'exam_papers', 'study_plans', 'study_sessions', 'content_item_references'],
    'Personalization': ['mood_logs', 'feel_good_content', 'surrounding_influences', 'user_doubts', 'tutor_chats'],
    'System Management': ['ai_model_settings', 'system_logs', 'notifications'],
    'Employee Management': ['employees', 'founders', 'doctors']
  };

  Object.entries(moduleGroups).forEach(([moduleName, moduleTableNames]) => {
    const moduleTables = tables.filter(table => moduleTableNames.includes(table.tableName));
    
    moduleTables.forEach(table => {
      table.fields.forEach(field => {
        csvContent += `"${moduleName}","${table.tableName}","${field.name}","${field.type}",${field.isRequired},${field.isPrimaryKey},${field.isForeignKey},"${field.references || ''}"\n`;
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

