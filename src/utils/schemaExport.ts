
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
      tableName: 'users',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'name', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'email', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'phone_number', type: 'VARCHAR(20)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'password_hash', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'role', type: 'ENUM("student", "employee", "doctor", "founder", "admin")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'created_at', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'updated_at', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'last_login', type: 'DATETIME', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'completed_onboarding', type: 'BOOLEAN', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'subscription_type', type: 'ENUM("free", "basic", "premium", "enterprise")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'avatar_url', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
      ]
    },
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
        { name: 'education_level', type: 'VARCHAR(50)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'study_streak', type: 'INT', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'quizzes_taken', type: 'INT', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'flashcards_created', type: 'INT', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'exam_preparation', type: 'VARCHAR(50)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'strong_subjects', type: 'JSON', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'weak_subjects', type: 'JSON', isRequired: false, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'employees',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'user_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'users(id)' },
        { name: 'job_title', type: 'VARCHAR(100)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'work_experience', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'skills', type: 'JSON', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'company', type: 'VARCHAR(100)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'industry', type: 'VARCHAR(100)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'career_goal', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'projects_completed', type: 'INT', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'training_completed', type: 'INT', isRequired: false, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'doctors',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'user_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'users(id)' },
        { name: 'specialization', type: 'VARCHAR(100)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'qualifications', type: 'JSON', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'research_interests', type: 'JSON', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'publications', type: 'INT', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'institution', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'years_of_practice', type: 'INT', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'certifications', type: 'JSON', isRequired: false, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'founders',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'user_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'users(id)' },
        { name: 'startup_name', type: 'VARCHAR(100)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'industry', type: 'VARCHAR(100)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'founding_year', type: 'VARCHAR(4)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'team_size', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'funding', type: 'VARCHAR(100)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'stage', type: 'VARCHAR(100)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'mvp_status', type: 'INT', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'pitch_deck_ready', type: 'BOOLEAN', isRequired: false, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'student_goals',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'student_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'students(id)' },
        { name: 'title', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'description', type: 'TEXT', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'target_date', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'current_progress', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'status', type: 'ENUM("active", "completed", "abandoned", "not-started", "in-progress")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'created_at', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'student_subjects',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'student_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'students(id)' },
        { name: 'name', type: 'VARCHAR(100)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'progress', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'last_studied', type: 'DATETIME', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'color', type: 'VARCHAR(20)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'subject_topics',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'subject_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'student_subjects(id)' },
        { name: 'name', type: 'VARCHAR(100)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'completed', type: 'BOOLEAN', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'mastery_level', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'last_practiced', type: 'DATETIME', isRequired: false, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'quiz_scores',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'subject_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'student_subjects(id)' },
        { name: 'title', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'score', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'max_score', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'date', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'time_taken', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'study_hours',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'subject_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'student_subjects(id)' },
        { name: 'date', type: 'DATE', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'hours', type: 'FLOAT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'student_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'students(id)' },
      ]
    },
    {
      tableName: 'study_streaks',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'student_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'students(id)' },
        { name: 'current', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'longest', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'last_study_date', type: 'DATE', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'onboarding_data',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'user_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'users(id)' },
        { name: 'role', type: 'ENUM("student", "employee", "doctor", "founder")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'name', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'phone_number', type: 'VARCHAR(20)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'age', type: 'INT', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'grade', type: 'VARCHAR(50)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'location', type: 'VARCHAR(100)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'exam_goal', type: 'VARCHAR(100)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'job_title', type: 'VARCHAR(100)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'experience', type: 'VARCHAR(50)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'industry', type: 'VARCHAR(100)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'skills', type: 'JSON', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'specialization', type: 'VARCHAR(100)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'institution', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'research_topic', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'startup_stage', type: 'VARCHAR(50)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'team_size', type: 'INT', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'startup_goal', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'personality_type', type: 'ENUM("analytical", "creative", "practical", "social", "independent")', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'mood', type: 'ENUM("motivated", "curious", "neutral", "tired", "stressed", "focused", "happy", "okay", "overwhelmed", "sad")', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'sleep_schedule', type: 'VARCHAR(100)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'focus_hours', type: 'INT', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'stress_management', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'break_routine', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'interests', type: 'JSON', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'institute', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'preferred_subjects', type: 'JSON', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'completed_at', type: 'DATETIME', isRequired: false, isPrimaryKey: false, isForeignKey: false },
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
        { name: 'exam_date', type: 'DATE', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'daily_study_hours', type: 'INT', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'study_pace', type: 'ENUM("Aggressive", "Balanced", "Relaxed")', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'preferred_study_time', type: 'ENUM("Morning", "Afternoon", "Evening", "Night")', isRequired: false, isPrimaryKey: false, isForeignKey: false },
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
        { name: 'mood_type', type: 'ENUM("motivated", "curious", "neutral", "tired", "stressed", "focused", "happy", "okay", "overwhelmed", "sad")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
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
    {
      tableName: 'login_history',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'user_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'users(id)' },
        { name: 'timestamp', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'ip_address', type: 'VARCHAR(45)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'device_info', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'location', type: 'VARCHAR(255)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'success', type: 'BOOLEAN', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'user_settings',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'user_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'users(id)' },
        { name: 'theme', type: 'ENUM("light", "dark", "system")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'notifications_enabled', type: 'BOOLEAN', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'email_notifications', type: 'BOOLEAN', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'sms_notifications', type: 'BOOLEAN', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'push_notifications', type: 'BOOLEAN', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'language', type: 'VARCHAR(10)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'timezone', type: 'VARCHAR(50)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'subscriptions',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'user_id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: false, isForeignKey: true, references: 'users(id)' },
        { name: 'plan_type', type: 'ENUM("free", "basic", "premium", "enterprise")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'start_date', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'end_date', type: 'DATETIME', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'auto_renew', type: 'BOOLEAN', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'payment_status', type: 'ENUM("paid", "pending", "failed", "cancelled")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'payment_method', type: 'VARCHAR(50)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'amount', type: 'DECIMAL(10,2)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'currency', type: 'VARCHAR(3)', isRequired: false, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'ai_model_settings',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'model_name', type: 'VARCHAR(100)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'api_key', type: 'VARCHAR(255)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'temperature', type: 'FLOAT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'max_tokens', type: 'INT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'active', type: 'BOOLEAN', isRequired: true, isPrimaryKey: false, isForeignKey: false },
      ]
    },
    {
      tableName: 'system_logs',
      fields: [
        { name: 'id', type: 'VARCHAR(36)', isRequired: true, isPrimaryKey: true, isForeignKey: false },
        { name: 'timestamp', type: 'DATETIME', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'level', type: 'ENUM("info", "warning", "error")', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'message', type: 'TEXT', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'source', type: 'VARCHAR(100)', isRequired: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'details', type: 'JSON', isRequired: false, isPrimaryKey: false, isForeignKey: false },
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
