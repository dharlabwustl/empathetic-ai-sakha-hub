
// Generate database schema for export
export const generateDatabaseSchema = () => {
  return [
    {
      tableName: 'users',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'email', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'phone_number', type: 'VARCHAR(15)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'password_hash', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'role', type: 'ENUM', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'last_login', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'status', type: 'ENUM', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'students',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'user_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'users.id' },
        { name: 'name', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'age', type: 'INT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'grade', type: 'VARCHAR(50)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'school', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'location', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'target_exam', type: 'VARCHAR(100)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'parent_name', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'parent_contact', type: 'VARCHAR(15)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'profile_image', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'personality_type', type: 'VARCHAR(50)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'onboarding_data',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'user_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'users.id' },
        { name: 'goal', type: 'VARCHAR(100)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'sleep_schedule', type: 'VARCHAR(100)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'focus_hours', type: 'INT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'stress_management', type: 'VARCHAR(100)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'break_routine', type: 'VARCHAR(100)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'interests', type: 'JSON', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'completed', type: 'BOOLEAN', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'student_goals',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'student_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'students.id' },
        { name: 'title', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'description', type: 'TEXT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'target_date', type: 'DATE', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'progress', type: 'FLOAT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'status', type: 'ENUM', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'student_subjects',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'student_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'students.id' },
        { name: 'name', type: 'VARCHAR(100)', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'progress', type: 'FLOAT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'total_topics', type: 'INT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'completed_topics', type: 'INT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'weak_areas', type: 'JSON', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'strong_areas', type: 'JSON', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'last_studied', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'average_score', type: 'FLOAT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'color', type: 'VARCHAR(20)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'subject_topics',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'subject_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'student_subjects.id' },
        { name: 'name', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'progress', type: 'FLOAT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'status', type: 'ENUM', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'last_practiced', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'score', type: 'FLOAT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'completed', type: 'BOOLEAN', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'mastery_level', type: 'INT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'concept_cards',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'subject_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'student_subjects.id' },
        { name: 'topic_id', type: 'UUID', isPrimaryKey: false, isRequired: false, isForeignKey: true, references: 'subject_topics.id' },
        { name: 'title', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'content', type: 'TEXT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'complexity', type: 'ENUM', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'examples', type: 'JSON', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'images', type: 'JSON', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'related_concepts', type: 'JSON', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'practice_questions', type: 'JSON', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'flashcards',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'deck_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'flashcard_decks.id' },
        { name: 'front_content', type: 'TEXT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'back_content', type: 'TEXT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'front_image', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'back_image', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'difficulty', type: 'ENUM', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'tags', type: 'JSON', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'flashcard_decks',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'student_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'students.id' },
        { name: 'subject_id', type: 'UUID', isPrimaryKey: false, isRequired: false, isForeignKey: true, references: 'student_subjects.id' },
        { name: 'name', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'description', type: 'TEXT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'card_count', type: 'INT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'mastered_count', type: 'INT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'exams',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'title', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'description', type: 'TEXT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'subject', type: 'VARCHAR(100)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'total_questions', type: 'INT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'total_points', type: 'INT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'time_limit', type: 'INT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'difficulty', type: 'ENUM', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'average_score', type: 'FLOAT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'top_score', type: 'FLOAT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'completion_rate', type: 'FLOAT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'tags', type: 'JSON', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'recommended_for', type: 'JSON', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'required_score', type: 'FLOAT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'status', type: 'ENUM', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'exam_questions',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'exam_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'exams.id' },
        { name: 'question', type: 'TEXT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'options', type: 'JSON', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'correct_answer', type: 'JSON', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'explanation', type: 'TEXT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'type', type: 'ENUM', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'points', type: 'INT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'feedback', type: 'TEXT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'image_path', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'has_image', type: 'BOOLEAN', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'difficulty', type: 'ENUM', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'tags', type: 'JSON', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'subject', type: 'VARCHAR(100)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'chapter', type: 'VARCHAR(100)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'time_recommended', type: 'INT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'exam_attempts',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'student_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'students.id' },
        { name: 'exam_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'exams.id' },
        { name: 'started_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'completed_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'score', type: 'FLOAT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'total_points', type: 'INT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'time_spent', type: 'INT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'percentile', type: 'FLOAT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'accuracy', type: 'FLOAT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'speed_index', type: 'FLOAT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'subjectwise_performance', type: 'JSON', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'exam_answers',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'attempt_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'exam_attempts.id' },
        { name: 'question_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'exam_questions.id' },
        { name: 'user_answer', type: 'JSON', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'correct', type: 'BOOLEAN', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'points', type: 'INT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'feedback', type: 'TEXT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'time_taken', type: 'INT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'mood_logs',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'student_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'students.id' },
        { name: 'mood', type: 'ENUM', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'note', type: 'TEXT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'recorded_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'energy_level', type: 'INT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'stress_level', type: 'INT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'motivation_level', type: 'INT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'study_plans',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'student_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'students.id' },
        { name: 'title', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'description', type: 'TEXT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'start_date', type: 'DATE', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'end_date', type: 'DATE', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'target_goal_id', type: 'UUID', isPrimaryKey: false, isRequired: false, isForeignKey: true, references: 'student_goals.id' },
        { name: 'completion_rate', type: 'FLOAT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'status', type: 'ENUM', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'study_sessions',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'student_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'students.id' },
        { name: 'study_plan_id', type: 'UUID', isPrimaryKey: false, isRequired: false, isForeignKey: true, references: 'study_plans.id' },
        { name: 'subject_id', type: 'UUID', isPrimaryKey: false, isRequired: false, isForeignKey: true, references: 'student_subjects.id' },
        { name: 'title', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'description', type: 'TEXT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'start_time', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'end_time', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'duration_minutes', type: 'INT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'completed', type: 'BOOLEAN', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'productivity_score', type: 'INT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'mood_before_id', type: 'UUID', isPrimaryKey: false, isRequired: false, isForeignKey: true, references: 'mood_logs.id' },
        { name: 'mood_after_id', type: 'UUID', isPrimaryKey: false, isRequired: false, isForeignKey: true, references: 'mood_logs.id' },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'study_streaks',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'student_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'students.id' },
        { name: 'current', type: 'INT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'longest', type: 'INT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'last_study_date', type: 'DATE', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'weekly_data', type: 'JSON', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'monthly_data', type: 'JSON', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'this_week', type: 'JSON', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'subscriptions',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'user_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'users.id' },
        { name: 'plan_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'subscription_plans.id' },
        { name: 'start_date', type: 'DATE', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'end_date', type: 'DATE', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'status', type: 'ENUM', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'is_active', type: 'BOOLEAN', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'auto_renew', type: 'BOOLEAN', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'subscription_plans',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'name', type: 'VARCHAR(100)', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'type', type: 'ENUM', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'price', type: 'DECIMAL', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'interval', type: 'ENUM', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'features', type: 'JSON', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'max_users', type: 'INT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'description', type: 'TEXT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'trial_days', type: 'INT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'features',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'title', type: 'VARCHAR(100)', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'description', type: 'TEXT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'path', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'is_premium', type: 'BOOLEAN', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'icon', type: 'VARCHAR(100)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'free_access_limit', type: 'JSON', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'allowed_plans', type: 'JSON', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'user_feature_access',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'user_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'users.id' },
        { name: 'feature_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'features.id' },
        { name: 'has_access', type: 'BOOLEAN', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'usage_left', type: 'INT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'expires_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'feel_good_content',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'title', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'content_type', type: 'ENUM', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'content', type: 'TEXT', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'mood_tag', type: 'VARCHAR(100)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'image_url', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'video_url', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'external_url', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'author', type: 'VARCHAR(100)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'likes', type: 'INT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    },
    {
      tableName: 'tutor_chats',
      fields: [
        { name: 'id', type: 'UUID', isPrimaryKey: true, isRequired: true, isForeignKey: false },
        { name: 'student_id', type: 'UUID', isPrimaryKey: false, isRequired: true, isForeignKey: true, references: 'students.id' },
        { name: 'session_id', type: 'VARCHAR(100)', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'subject', type: 'VARCHAR(100)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'topic', type: 'VARCHAR(255)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'messages', type: 'JSON', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'helpful_rating', type: 'INT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'start_time', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'end_time', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'duration_minutes', type: 'INT', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'mood_context', type: 'VARCHAR(50)', isPrimaryKey: false, isRequired: false, isForeignKey: false },
        { name: 'created_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false },
        { name: 'updated_at', type: 'TIMESTAMP', isPrimaryKey: false, isRequired: true, isForeignKey: false }
      ]
    }
  ];
};
