
import { 
  AdminUser,
  StudentProfile,
  StudentGoal,
  OnboardingData,
  StudyPlan,
  StudySession,
  ContentItemReference,
  ConceptCard,
  Flashcard,
  Question,
  ExamPaper,
  MoodLog,
  FeelGoodContent,
  SurroundingInfluence,
  UserDoubts,
  TutorChat,
  Notification
} from "@/types/admin";

type TableSchema = {
  tableName: string;
  fields: {
    name: string;
    type: string;
    isRequired: boolean;
    isPrimaryKey: boolean;
    isForeignKey: boolean;
    references?: string;
  }[];
};

// Helper function to get type as string
const getType = (val: any): string => {
  if (val === String) return 'VARCHAR(255)';
  if (val === Number) return 'INT';
  if (val === Boolean) return 'BOOLEAN';
  if (val === Date) return 'DATETIME';
  if (Array.isArray(val)) return `JSON`;
  if (typeof val === 'object') return 'JSON';
  return 'VARCHAR(255)';
};

export const generateDatabaseSchema = (): TableSchema[] => {
  // This is a simplified schema generator
  // In a real application, you would extract this from your database or ORM

  return [
    {
      tableName: 'admin_users',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'name', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'email', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'role', type: 'ENUM("admin", "superadmin")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'permissions', type: 'JSON', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'last_login', type: 'DATETIME', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'password_hash', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'created_at', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'updated_at', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'students',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'user_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'users(id)' },
        { name: 'name', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'email', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'phone_number', type: 'VARCHAR(20)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'registration_date', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'last_active', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'completed_onboarding', type: 'BOOLEAN', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'role', type: 'ENUM("student", "tutor", "admin")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'preferences', type: 'JSON', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'student_goals',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'student_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'students(id)' },
        { name: 'title', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'target_date', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'current_progress', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'status', type: 'ENUM("active", "completed", "abandoned")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'created_at', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'onboarding_data',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'student_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'students(id)' },
        { name: 'exam_type', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'study_hours', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'study_pace', type: 'ENUM("relaxed", "balanced", "intensive")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'preferred_study_time', type: 'ENUM("morning", "afternoon", "evening", "night")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'subjects_selected', type: 'JSON', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'learning_style', type: 'ENUM("visual", "auditory", "reading", "kinesthetic", "mixed")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'completed_at', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'study_plans',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'student_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'students(id)' },
        { name: 'title', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'description', type: 'TEXT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'created_at', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'valid_until', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'status', type: 'ENUM("active", "completed", "expired")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'generation_type', type: 'ENUM("ai", "manual", "mixed")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'study_sessions',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'plan_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'study_plans(id)' },
        { name: 'date', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'start_time', type: 'VARCHAR(10)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'duration', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'subject', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'topics', type: 'JSON', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'status', type: 'ENUM("pending", "completed", "missed")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'content_item_references',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'session_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'study_sessions(id)' },
        { name: 'content_type', type: 'ENUM("concept", "flashcard", "question", "exam")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'content_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'status', type: 'ENUM("pending", "completed")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'score', type: 'INT', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'time_spent', type: 'INT', isRequired: false, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'concept_cards',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'subject', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'topic', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'title', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'content', type: 'TEXT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'difficulty', type: 'ENUM("easy", "medium", "hard")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'tags', type: 'JSON', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'image_url', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'created_at', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'created_by', type: 'ENUM("ai", "admin")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'approved', type: 'BOOLEAN', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'usage_count', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'flashcards',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'subject', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'topic', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'front', type: 'TEXT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'back', type: 'TEXT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'difficulty', type: 'ENUM("easy", "medium", "hard")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'tags', type: 'JSON', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'image_url', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'created_at', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'created_by', type: 'ENUM("ai", "admin")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'approved', type: 'BOOLEAN', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'usage_count', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'questions',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'subject', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'topic', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'question_text', type: 'TEXT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'options', type: 'JSON', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'correct_answer', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'explanation', type: 'TEXT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'difficulty', type: 'ENUM("easy", "medium", "hard")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'tags', type: 'JSON', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'image_url', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'created_at', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'created_by', type: 'ENUM("ai", "admin")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'approved', type: 'BOOLEAN', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'usage_count', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'exam_papers',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'title', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'subject', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'description', type: 'TEXT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'duration', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'total_marks', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'difficulty', type: 'ENUM("easy", "medium", "hard")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'question_ids', type: 'JSON', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'created_at', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'created_by', type: 'ENUM("ai", "admin")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'approved', type: 'BOOLEAN', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'usage_count', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'mood_logs',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'student_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'students(id)' },
        { name: 'score', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'notes', type: 'TEXT', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'timestamp', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'feel_good_content',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'type', type: 'ENUM("meme", "joke", "quote", "puzzle", "video")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'content', type: 'TEXT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'image_url', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'video_url', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'tags', type: 'JSON', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'mood_tags', type: 'JSON', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'usage_count', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'approved', type: 'BOOLEAN', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'created_at', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'surrounding_influences',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'student_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'students(id)' },
        { name: 'timestamp', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'confidence_level', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'peer_influence', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'environmental_factors', type: 'JSON', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'overall_score', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'user_doubts',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'student_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'students(id)' },
        { name: 'question', type: 'TEXT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'subject', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'topic', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'response', type: 'TEXT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'response_source', type: 'ENUM("ai", "tutor")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'satisfied', type: 'BOOLEAN', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'timestamp', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'escalated', type: 'BOOLEAN', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'tutor_chats',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'student_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'students(id)' },
        { name: 'tutor_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'messages', type: 'JSON', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'subject', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'topic', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'status', type: 'ENUM("active", "closed")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'rating', type: 'INT', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'started_at', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'ended_at', type: 'DATETIME', isRequired: false, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'notifications',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'user_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'users(id)' },
        { name: 'title', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'body', type: 'TEXT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'type', type: 'ENUM("reminder", "achievement", "suggestion", "system")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'read', type: 'BOOLEAN', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'action_url', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'created_at', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'expires_at', type: 'DATETIME', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'priority', type: 'ENUM("low", "normal", "high")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
  ];
};

// Function to generate SQL for creating tables
export const generateSQLSchema = (): string => {
  const tables = generateDatabaseSchema();
  
  let sqlScript = '-- Sakha AI Database Schema\n';
  sqlScript += '-- Generated on ' + new Date().toISOString().split('T')[0] + '\n\n';
  
  // Add SQL to drop existing tables (in reverse order to handle foreign key constraints)
  sqlScript += '-- Drop existing tables (if they exist)\n';
  [...tables].reverse().forEach(table => {
    sqlScript += `DROP TABLE IF EXISTS ${table.tableName};\n`;
  });
  sqlScript += '\n';
  
  // Add SQL to create tables
  tables.forEach(table => {
    sqlScript += `-- Table: ${table.tableName}\n`;
    sqlScript += `CREATE TABLE ${table.tableName} (\n`;
    
    const fieldDefinitions = table.fields.map(field => {
      let definition = `  ${field.name} ${field.type}`;
      if (field.isRequired) definition += ' NOT NULL';
      if (field.isPrimaryKey) definition += ' PRIMARY KEY';
      if (field.isForeignKey && field.references) 
        definition += `, FOREIGN KEY (${field.name}) REFERENCES ${field.references}`;
      return definition;
    });
    
    sqlScript += fieldDefinitions.join(',\n');
    sqlScript += '\n);\n\n';
  });
  
  return sqlScript;
};

// Function to generate a downloadable schema file
export const downloadDatabaseSchema = (): void => {
  const sqlSchema = generateSQLSchema();
  const blob = new Blob([sqlSchema], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sakha_ai_database_schema.sql';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
