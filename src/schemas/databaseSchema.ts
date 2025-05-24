
export interface DatabaseSchema {
  tables: DatabaseTable[];
  relationships: DatabaseRelationship[];
  indexes: DatabaseIndex[];
  version: string;
}

export interface DatabaseTable {
  name: string;
  description: string;
  columns: DatabaseColumn[];
  constraints: DatabaseConstraint[];
}

export interface DatabaseColumn {
  name: string;
  type: string;
  nullable: boolean;
  default?: string;
  description: string;
}

export interface DatabaseConstraint {
  name: string;
  type: 'PRIMARY_KEY' | 'FOREIGN_KEY' | 'UNIQUE' | 'CHECK';
  columns: string[];
  referencedTable?: string;
  referencedColumns?: string[];
}

export interface DatabaseRelationship {
  fromTable: string;
  toTable: string;
  type: 'ONE_TO_ONE' | 'ONE_TO_MANY' | 'MANY_TO_MANY';
  foreignKey: string;
  description: string;
}

export interface DatabaseIndex {
  name: string;
  table: string;
  columns: string[];
  unique: boolean;
  type: 'BTREE' | 'HASH' | 'GIN' | 'GIST';
}

export const studentDashboardSchema: DatabaseSchema = {
  version: "1.0.0",
  tables: [
    {
      name: "users",
      description: "Core user information and authentication",
      columns: [
        { name: "id", type: "uuid", nullable: false, default: "gen_random_uuid()", description: "Primary key" },
        { name: "email", type: "varchar(255)", nullable: false, description: "User email address" },
        { name: "name", type: "varchar(255)", nullable: true, description: "Full name" },
        { name: "avatar", type: "text", nullable: true, description: "Profile image URL" },
        { name: "exam_goal", type: "varchar(100)", nullable: true, description: "Target exam (JEE, NEET, etc.)" },
        { name: "study_streak", type: "integer", nullable: false, default: "0", description: "Current study streak in days" },
        { name: "subscription_type", type: "varchar(50)", nullable: false, default: "'free'", description: "Subscription plan type" },
        { name: "onboarding_completed", type: "boolean", nullable: false, default: "false", description: "Onboarding completion status" },
        { name: "created_at", type: "timestamp", nullable: false, default: "now()", description: "Account creation timestamp" },
        { name: "updated_at", type: "timestamp", nullable: false, default: "now()", description: "Last update timestamp" }
      ],
      constraints: [
        { name: "users_pkey", type: "PRIMARY_KEY", columns: ["id"] },
        { name: "users_email_unique", type: "UNIQUE", columns: ["email"] }
      ]
    },
    {
      name: "user_profiles",
      description: "Extended user profile information",
      columns: [
        { name: "id", type: "uuid", nullable: false, default: "gen_random_uuid()", description: "Primary key" },
        { name: "user_id", type: "uuid", nullable: false, description: "Reference to users table" },
        { name: "grade", type: "varchar(20)", nullable: true, description: "Current grade/class" },
        { name: "school", type: "varchar(255)", nullable: true, description: "School name" },
        { name: "preferred_language", type: "varchar(10)", nullable: false, default: "'en'", description: "Preferred interface language" },
        { name: "timezone", type: "varchar(50)", nullable: true, description: "User timezone" },
        { name: "study_preferences", type: "jsonb", nullable: true, description: "Study preferences and settings" },
        { name: "goals", type: "jsonb", nullable: true, description: "User goals and targets" },
        { name: "created_at", type: "timestamp", nullable: false, default: "now()", description: "Profile creation timestamp" },
        { name: "updated_at", type: "timestamp", nullable: false, default: "now()", description: "Last update timestamp" }
      ],
      constraints: [
        { name: "user_profiles_pkey", type: "PRIMARY_KEY", columns: ["id"] },
        { name: "user_profiles_user_id_fkey", type: "FOREIGN_KEY", columns: ["user_id"], referencedTable: "users", referencedColumns: ["id"] }
      ]
    },
    {
      name: "mood_logs",
      description: "User mood tracking data",
      columns: [
        { name: "id", type: "uuid", nullable: false, default: "gen_random_uuid()", description: "Primary key" },
        { name: "user_id", type: "uuid", nullable: false, description: "Reference to users table" },
        { name: "mood", type: "varchar(50)", nullable: false, description: "Mood type (happy, motivated, etc.)" },
        { name: "intensity", type: "integer", nullable: true, description: "Mood intensity (1-10)" },
        { name: "note", type: "text", nullable: true, description: "Optional mood note" },
        { name: "context", type: "jsonb", nullable: true, description: "Additional context data" },
        { name: "created_at", type: "timestamp", nullable: false, default: "now()", description: "Mood log timestamp" }
      ],
      constraints: [
        { name: "mood_logs_pkey", type: "PRIMARY_KEY", columns: ["id"] },
        { name: "mood_logs_user_id_fkey", type: "FOREIGN_KEY", columns: ["user_id"], referencedTable: "users", referencedColumns: ["id"] }
      ]
    },
    {
      name: "study_plans",
      description: "User study plans and schedules",
      columns: [
        { name: "id", type: "uuid", nullable: false, default: "gen_random_uuid()", description: "Primary key" },
        { name: "user_id", type: "uuid", nullable: false, description: "Reference to users table" },
        { name: "title", type: "varchar(255)", nullable: false, description: "Study plan title" },
        { name: "exam_type", type: "varchar(100)", nullable: false, description: "Target exam type" },
        { name: "target_date", type: "date", nullable: true, description: "Target exam date" },
        { name: "subjects", type: "jsonb", nullable: false, description: "Subject-wise plan details" },
        { name: "weekly_hours", type: "integer", nullable: false, description: "Weekly study hours target" },
        { name: "status", type: "varchar(50)", nullable: false, default: "'active'", description: "Plan status" },
        { name: "ai_generated", type: "boolean", nullable: false, default: "false", description: "Whether plan was AI-generated" },
        { name: "created_at", type: "timestamp", nullable: false, default: "now()", description: "Plan creation timestamp" },
        { name: "updated_at", type: "timestamp", nullable: false, default: "now()", description: "Last update timestamp" }
      ],
      constraints: [
        { name: "study_plans_pkey", type: "PRIMARY_KEY", columns: ["id"] },
        { name: "study_plans_user_id_fkey", type: "FOREIGN_KEY", columns: ["user_id"], referencedTable: "users", referencedColumns: ["id"] }
      ]
    },
    {
      name: "content_repository",
      description: "Educational content storage",
      columns: [
        { name: "id", type: "uuid", nullable: false, default: "gen_random_uuid()", description: "Primary key" },
        { name: "title", type: "varchar(255)", nullable: false, description: "Content title" },
        { name: "type", type: "varchar(50)", nullable: false, description: "Content type (concept-card, flashcard, etc.)" },
        { name: "format", type: "varchar(50)", nullable: false, description: "Content format (text, visual, interactive, etc.)" },
        { name: "subject", type: "varchar(100)", nullable: false, description: "Subject area" },
        { name: "topic", type: "varchar(255)", nullable: false, description: "Specific topic" },
        { name: "exam", type: "varchar(100)", nullable: false, description: "Target exam" },
        { name: "difficulty", type: "varchar(20)", nullable: false, description: "Difficulty level" },
        { name: "tags", type: "text[]", nullable: true, description: "Content tags" },
        { name: "content_data", type: "jsonb", nullable: false, description: "Actual content data" },
        { name: "ai_model", type: "varchar(100)", nullable: true, description: "AI model used for generation" },
        { name: "quality_score", type: "decimal(3,2)", nullable: true, description: "Content quality score" },
        { name: "usage_count", type: "integer", nullable: false, default: "0", description: "Times content was accessed" },
        { name: "created_by", type: "uuid", nullable: true, description: "Creator user ID" },
        { name: "created_at", type: "timestamp", nullable: false, default: "now()", description: "Content creation timestamp" },
        { name: "updated_at", type: "timestamp", nullable: false, default: "now()", description: "Last update timestamp" }
      ],
      constraints: [
        { name: "content_repository_pkey", type: "PRIMARY_KEY", columns: ["id"] },
        { name: "content_repository_created_by_fkey", type: "FOREIGN_KEY", columns: ["created_by"], referencedTable: "users", referencedColumns: ["id"] }
      ]
    },
    {
      name: "ai_model_performance",
      description: "AI model performance tracking",
      columns: [
        { name: "id", type: "uuid", nullable: false, default: "gen_random_uuid()", description: "Primary key" },
        { name: "model_name", type: "varchar(100)", nullable: false, description: "AI model identifier" },
        { name: "model_type", type: "varchar(50)", nullable: false, description: "Model type (content-generation, mood-analysis, etc.)" },
        { name: "accuracy_score", type: "decimal(5,2)", nullable: true, description: "Model accuracy percentage" },
        { name: "latency_ms", type: "integer", nullable: true, description: "Average response latency in milliseconds" },
        { name: "total_requests", type: "integer", nullable: false, default: "0", description: "Total requests processed" },
        { name: "successful_requests", type: "integer", nullable: false, default: "0", description: "Successful requests count" },
        { name: "error_rate", type: "decimal(5,2)", nullable: true, description: "Error rate percentage" },
        { name: "last_tested", type: "timestamp", nullable: true, description: "Last performance test timestamp" },
        { name: "status", type: "varchar(20)", nullable: false, default: "'active'", description: "Model status" },
        { name: "created_at", type: "timestamp", nullable: false, default: "now()", description: "Record creation timestamp" },
        { name: "updated_at", type: "timestamp", nullable: false, default: "now()", description: "Last update timestamp" }
      ],
      constraints: [
        { name: "ai_model_performance_pkey", type: "PRIMARY_KEY", columns: ["id"] },
        { name: "ai_model_performance_model_name_unique", type: "UNIQUE", columns: ["model_name"] }
      ]
    },
    {
      name: "subscriptions",
      description: "User subscription management",
      columns: [
        { name: "id", type: "uuid", nullable: false, default: "gen_random_uuid()", description: "Primary key" },
        { name: "user_id", type: "uuid", nullable: false, description: "Reference to users table" },
        { name: "plan_type", type: "varchar(50)", nullable: false, description: "Subscription plan type" },
        { name: "status", type: "varchar(20)", nullable: false, description: "Subscription status" },
        { name: "start_date", type: "timestamp", nullable: false, description: "Subscription start date" },
        { name: "end_date", type: "timestamp", nullable: true, description: "Subscription end date" },
        { name: "features", type: "jsonb", nullable: true, description: "Available features" },
        { name: "price", type: "decimal(10,2)", nullable: true, description: "Subscription price" },
        { name: "currency", type: "varchar(3)", nullable: false, default: "'USD'", description: "Price currency" },
        { name: "auto_renew", type: "boolean", nullable: false, default: "true", description: "Auto-renewal status" },
        { name: "created_at", type: "timestamp", nullable: false, default: "now()", description: "Subscription creation timestamp" },
        { name: "updated_at", type: "timestamp", nullable: false, default: "now()", description: "Last update timestamp" }
      ],
      constraints: [
        { name: "subscriptions_pkey", type: "PRIMARY_KEY", columns: ["id"] },
        { name: "subscriptions_user_id_fkey", type: "FOREIGN_KEY", columns: ["user_id"], referencedTable: "users", referencedColumns: ["id"] }
      ]
    },
    {
      name: "payment_transactions",
      description: "Payment transaction records",
      columns: [
        { name: "id", type: "uuid", nullable: false, default: "gen_random_uuid()", description: "Primary key" },
        { name: "user_id", type: "uuid", nullable: false, description: "Reference to users table" },
        { name: "subscription_id", type: "uuid", nullable: true, description: "Reference to subscriptions table" },
        { name: "amount", type: "decimal(10,2)", nullable: false, description: "Transaction amount" },
        { name: "currency", type: "varchar(3)", nullable: false, description: "Transaction currency" },
        { name: "payment_method", type: "varchar(50)", nullable: false, description: "Payment method used" },
        { name: "transaction_id", type: "varchar(255)", nullable: false, description: "External transaction ID" },
        { name: "status", type: "varchar(20)", nullable: false, description: "Transaction status" },
        { name: "metadata", type: "jsonb", nullable: true, description: "Additional transaction data" },
        { name: "created_at", type: "timestamp", nullable: false, default: "now()", description: "Transaction timestamp" }
      ],
      constraints: [
        { name: "payment_transactions_pkey", type: "PRIMARY_KEY", columns: ["id"] },
        { name: "payment_transactions_user_id_fkey", type: "FOREIGN_KEY", columns: ["user_id"], referencedTable: "users", referencedColumns: ["id"] },
        { name: "payment_transactions_subscription_id_fkey", type: "FOREIGN_KEY", columns: ["subscription_id"], referencedTable: "subscriptions", referencedColumns: ["id"] }
      ]
    }
  ],
  relationships: [
    {
      fromTable: "user_profiles",
      toTable: "users",
      type: "ONE_TO_ONE",
      foreignKey: "user_id",
      description: "Each user has one profile"
    },
    {
      fromTable: "mood_logs",
      toTable: "users",
      type: "MANY_TO_MANY",
      foreignKey: "user_id",
      description: "Users can have multiple mood logs"
    },
    {
      fromTable: "study_plans",
      toTable: "users",
      type: "ONE_TO_MANY",
      foreignKey: "user_id",
      description: "Users can have multiple study plans"
    },
    {
      fromTable: "subscriptions",
      toTable: "users",
      type: "ONE_TO_MANY",
      foreignKey: "user_id",
      description: "Users can have multiple subscriptions (history)"
    },
    {
      fromTable: "payment_transactions",
      toTable: "users",
      type: "ONE_TO_MANY",
      foreignKey: "user_id",
      description: "Users can have multiple payment transactions"
    },
    {
      fromTable: "payment_transactions",
      toTable: "subscriptions",
      type: "MANY_TO_MANY",
      foreignKey: "subscription_id",
      description: "Payments are linked to subscriptions"
    }
  ],
  indexes: [
    {
      name: "idx_users_email",
      table: "users",
      columns: ["email"],
      unique: true,
      type: "BTREE"
    },
    {
      name: "idx_mood_logs_user_created",
      table: "mood_logs",
      columns: ["user_id", "created_at"],
      unique: false,
      type: "BTREE"
    },
    {
      name: "idx_content_repository_subject_exam",
      table: "content_repository",
      columns: ["subject", "exam"],
      unique: false,
      type: "BTREE"
    },
    {
      name: "idx_content_repository_tags",
      table: "content_repository",
      columns: ["tags"],
      unique: false,
      type: "GIN"
    },
    {
      name: "idx_study_plans_user_status",
      table: "study_plans",
      columns: ["user_id", "status"],
      unique: false,
      type: "BTREE"
    },
    {
      name: "idx_ai_model_performance_type",
      table: "ai_model_performance",
      columns: ["model_type"],
      unique: false,
      type: "BTREE"
    }
  ]
};
