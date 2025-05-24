
import { API_ENDPOINTS, API_BASE_URL } from './apiConfig';
import databaseService from './databaseService';

// API endpoint checker service
export const apiEndpointChecker = {
  // Check all critical API endpoints
  async checkAllEndpoints(): Promise<Record<string, { exists: boolean; status?: number; message: string }>> {
    const endpoints = [
      { name: 'Auth Login', url: API_ENDPOINTS.AUTH.LOGIN },
      { name: 'Students Profile', url: API_ENDPOINTS.STUDENTS.PROFILE('test') },
      { name: 'Content Concepts', url: API_ENDPOINTS.CONTENT.CONCEPTS },
      { name: 'Content Questions', url: API_ENDPOINTS.CONTENT.QUESTIONS },
      { name: 'Content Exams', url: API_ENDPOINTS.CONTENT.EXAMS },
      { name: 'Admin Dashboard', url: API_ENDPOINTS.ADMIN.DASHBOARD },
      { name: 'Admin Students', url: API_ENDPOINTS.ADMIN.STUDENTS },
      { name: 'Admin Exams', url: API_ENDPOINTS.ADMIN.EXAMS },
      { name: 'Database Schema', url: API_ENDPOINTS.DATABASE.SCHEMA },
      { name: 'Database Sync', url: API_ENDPOINTS.DATABASE.SYNC },
      { name: 'AI Personalize', url: API_ENDPOINTS.AI.PERSONALIZE },
      { name: 'AI Exam Recommendations', url: API_ENDPOINTS.AI.EXAM_RECOMMENDATIONS }
    ];

    const results: Record<string, { exists: boolean; status?: number; message: string }> = {};

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint.url}`, {
          method: 'HEAD',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        results[endpoint.name] = {
          exists: response.ok,
          status: response.status,
          message: response.ok ? 'Endpoint is accessible' : `HTTP ${response.status}: ${response.statusText}`
        };
      } catch (error) {
        results[endpoint.name] = {
          exists: false,
          message: `Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
      }
    }

    return results;
  }
};

// Get database schema
export const getDatabaseSchema = async () => {
  try {
    return await databaseService.getSchema();
  } catch (error) {
    console.error('Error getting database schema:', error);
    throw error;
  }
};

// Get database schema as SQL
export const getDatabaseSchemaSql = () => {
  return `
-- SAKHA AI Database Schema
-- Generated on ${new Date().toISOString()}

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE student_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    target_exam VARCHAR(100),
    current_level VARCHAR(50),
    study_hours_per_day INTEGER DEFAULT 2,
    subjects JSON,
    learning_style VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exam_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exam_type VARCHAR(50) NOT NULL,
    subject VARCHAR(100) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    question TEXT NOT NULL,
    options JSON NOT NULL,
    correct_answer INTEGER NOT NULL,
    explanation TEXT,
    difficulty VARCHAR(20) DEFAULT 'medium',
    marks INTEGER DEFAULT 4,
    time_limit INTEGER DEFAULT 60,
    concept_tags JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE student_goals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    exam_type VARCHAR(50) NOT NULL,
    target_subjects JSON NOT NULL,
    target_date DATE NOT NULL,
    current_level VARCHAR(20) DEFAULT 'beginner',
    progress INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE study_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    subject VARCHAR(100) NOT NULL,
    topic VARCHAR(100),
    duration INTEGER NOT NULL, -- in minutes
    concepts_covered JSON,
    performance_score INTEGER,
    mood_before VARCHAR(50),
    mood_after VARCHAR(50),
    session_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE exam_readiness_tests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    exam_type VARCHAR(50) NOT NULL,
    subject VARCHAR(100),
    questions JSON NOT NULL,
    answers JSON NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    time_spent INTEGER NOT NULL, -- in seconds
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_exam_questions_type_subject ON exam_questions(exam_type, subject);
CREATE INDEX idx_student_goals_user ON student_goals(user_id);
CREATE INDEX idx_study_sessions_user_date ON study_sessions(user_id, session_date);
CREATE INDEX idx_exam_readiness_tests_user ON exam_readiness_tests(user_id);
CREATE INDEX idx_student_profiles_user ON student_profiles(user_id);
  `;
};

// Export database schema as JSON
export const exportDatabaseSchemaAsJson = () => {
  const schema = {
    version: '1.3.0',
    generatedAt: new Date().toISOString(),
    tables: {
      users: {
        columns: {
          id: { type: 'UUID', primaryKey: true, nullable: false },
          email: { type: 'VARCHAR(255)', unique: true, nullable: false },
          name: { type: 'VARCHAR(255)', nullable: false },
          password_hash: { type: 'VARCHAR(255)', nullable: false },
          role: { type: 'VARCHAR(50)', default: 'student' },
          created_at: { type: 'TIMESTAMP', default: 'CURRENT_TIMESTAMP' },
          updated_at: { type: 'TIMESTAMP', default: 'CURRENT_TIMESTAMP' }
        }
      },
      exam_questions: {
        columns: {
          id: { type: 'UUID', primaryKey: true, nullable: false },
          exam_type: { type: 'VARCHAR(50)', nullable: false },
          subject: { type: 'VARCHAR(100)', nullable: false },
          topic: { type: 'VARCHAR(100)', nullable: false },
          question: { type: 'TEXT', nullable: false },
          options: { type: 'JSON', nullable: false },
          correct_answer: { type: 'INTEGER', nullable: false },
          explanation: { type: 'TEXT', nullable: true },
          difficulty: { type: 'VARCHAR(20)', default: 'medium' },
          marks: { type: 'INTEGER', default: 4 },
          concept_tags: { type: 'JSON', nullable: true }
        },
        indexes: ['idx_exam_questions_type_subject']
      },
      student_goals: {
        columns: {
          id: { type: 'UUID', primaryKey: true, nullable: false },
          user_id: { type: 'UUID', foreignKey: 'users.id', nullable: false },
          exam_type: { type: 'VARCHAR(50)', nullable: false },
          target_subjects: { type: 'JSON', nullable: false },
          target_date: { type: 'DATE', nullable: false },
          current_level: { type: 'VARCHAR(20)', default: 'beginner' }
        },
        indexes: ['idx_student_goals_user']
      }
    },
    relationships: [
      {
        from: 'student_goals.user_id',
        to: 'users.id',
        type: 'many-to-one'
      }
    ]
  };

  return JSON.stringify(schema, null, 2);
};

export default apiEndpointChecker;
