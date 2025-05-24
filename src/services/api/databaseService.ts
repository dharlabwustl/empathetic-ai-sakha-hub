
import apiClient from './apiClient';
import { API_ENDPOINTS } from './apiConfig';

export interface DatabaseTable {
  name: string;
  rowCount: number;
  size: string;
  lastModified: string;
  columns: DatabaseColumn[];
}

export interface DatabaseColumn {
  name: string;
  type: string;
  nullable: boolean;
  defaultValue?: string;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  references?: string;
}

export interface DatabaseSchema {
  tables: DatabaseTable[];
  relationships: DatabaseRelationship[];
  indexes: DatabaseIndex[];
  totalSize: string;
  version: string;
}

export interface DatabaseRelationship {
  fromTable: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
}

export interface DatabaseIndex {
  name: string;
  table: string;
  columns: string[];
  type: 'primary' | 'unique' | 'index';
}

// Database service for handling database operations
const databaseService = {
  // Get complete database schema
  async getSchema(): Promise<DatabaseSchema> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.DATABASE.SCHEMA);
      return response.data;
    } catch (error) {
      console.error('Error fetching database schema:', error);
      return mockDatabaseSchema;
    }
  },

  // Get specific table schema
  async getTableSchema(tableName: string): Promise<DatabaseTable> {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.DATABASE.SCHEMA}/tables/${tableName}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching schema for table ${tableName}:`, error);
      const mockTable = mockDatabaseSchema.tables.find(t => t.name === tableName);
      if (mockTable) return mockTable;
      throw error;
    }
  },

  // Sync database between admin and student dashboards
  async syncDatabase(): Promise<boolean> {
    try {
      const response = await apiClient.post(API_ENDPOINTS.DATABASE.SYNC);
      return response.data.success;
    } catch (error) {
      console.error('Error syncing database:', error);
      return false;
    }
  },

  // Export database
  async exportDatabase(format: 'sql' | 'json' | 'csv'): Promise<Blob> {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.DATABASE.EXPORT}?format=${format}`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      console.error('Error exporting database:', error);
      throw error;
    }
  },

  // Check database health
  async checkHealth(): Promise<any> {
    try {
      const response = await apiClient.get(API_ENDPOINTS.DATABASE.HEALTH);
      return response.data;
    } catch (error) {
      console.error('Error checking database health:', error);
      return {
        status: 'unknown',
        connections: 0,
        responseTime: 0,
        lastChecked: new Date().toISOString()
      };
    }
  }
};

// Mock database schema for development
const mockDatabaseSchema: DatabaseSchema = {
  tables: [
    {
      name: 'users',
      rowCount: 1580,
      size: '45 MB',
      lastModified: new Date().toISOString(),
      columns: [
        { name: 'id', type: 'UUID', nullable: false, isPrimaryKey: true, isForeignKey: false },
        { name: 'email', type: 'VARCHAR(255)', nullable: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'name', type: 'VARCHAR(255)', nullable: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', nullable: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', nullable: false, isPrimaryKey: false, isForeignKey: false }
      ]
    },
    {
      name: 'exam_questions',
      rowCount: 8540,
      size: '125 MB',
      lastModified: new Date().toISOString(),
      columns: [
        { name: 'id', type: 'UUID', nullable: false, isPrimaryKey: true, isForeignKey: false },
        { name: 'exam_type', type: 'VARCHAR(50)', nullable: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'subject', type: 'VARCHAR(100)', nullable: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'topic', type: 'VARCHAR(100)', nullable: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'question', type: 'TEXT', nullable: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'options', type: 'JSON', nullable: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'correct_answer', type: 'INTEGER', nullable: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'explanation', type: 'TEXT', nullable: true, isPrimaryKey: false, isForeignKey: false },
        { name: 'difficulty', type: 'VARCHAR(20)', nullable: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'marks', type: 'INTEGER', nullable: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'concept_tags', type: 'JSON', nullable: true, isPrimaryKey: false, isForeignKey: false }
      ]
    },
    {
      name: 'student_goals',
      rowCount: 3650,
      size: '32 MB',
      lastModified: new Date().toISOString(),
      columns: [
        { name: 'id', type: 'UUID', nullable: false, isPrimaryKey: true, isForeignKey: false },
        { name: 'user_id', type: 'UUID', nullable: false, isPrimaryKey: false, isForeignKey: true, references: 'users.id' },
        { name: 'exam_type', type: 'VARCHAR(50)', nullable: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'target_subjects', type: 'JSON', nullable: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'target_date', type: 'DATE', nullable: false, isPrimaryKey: false, isForeignKey: false },
        { name: 'current_level', type: 'VARCHAR(20)', nullable: false, isPrimaryKey: false, isForeignKey: false }
      ]
    }
  ],
  relationships: [
    {
      fromTable: 'student_goals',
      fromColumn: 'user_id',
      toTable: 'users',
      toColumn: 'id',
      type: 'many-to-one'
    }
  ],
  indexes: [
    {
      name: 'idx_exam_questions_type_subject',
      table: 'exam_questions',
      columns: ['exam_type', 'subject'],
      type: 'index'
    },
    {
      name: 'idx_student_goals_user',
      table: 'student_goals',
      columns: ['user_id'],
      type: 'index'
    }
  ],
  totalSize: '2.4 GB',
  version: '1.3.0'
};

export default databaseService;
