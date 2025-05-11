
/**
 * Page to Database Field Mapping
 * 
 * This utility file provides a comprehensive mapping between frontend pages/components
 * and their corresponding database tables and fields. It's intended as documentation
 * for developers to understand the data flow in the application.
 */

export interface DatabaseFieldMapping {
  component: string;
  databaseTable: string;
  fields: {
    frontendField: string;
    databaseField: string;
    dataType: string;
    description: string;
  }[];
  apiEndpoint?: string;
}

export interface PageDatabaseMapping {
  pageName: string;
  description: string;
  components: DatabaseFieldMapping[];
}

/**
 * Complete database mapping for all pages in the application
 */
export const pageDatabaseMappings: PageDatabaseMapping[] = [
  // DASHBOARD PAGE
  {
    pageName: "Dashboard",
    description: "Main user dashboard showing overview of study progress and activities",
    components: [
      {
        component: "ProfileSummary",
        databaseTable: "users",
        apiEndpoint: "/students/:studentId/profile",
        fields: [
          { frontendField: "name", databaseField: "name", dataType: "string", description: "User's full name" },
          { frontendField: "email", databaseField: "email", dataType: "string", description: "User's email address" },
          { frontendField: "role", databaseField: "role", dataType: "enum", description: "User role (student, teacher, etc.)" },
          { frontendField: "avatar", databaseField: "avatar_url", dataType: "string", description: "Profile picture URL" },
          { frontendField: "enrollmentDate", databaseField: "created_at", dataType: "timestamp", description: "Account creation date" }
        ]
      },
      {
        component: "StudyProgress",
        databaseTable: "study_sessions",
        apiEndpoint: "/students/:studentId/statistics",
        fields: [
          { frontendField: "completedSessions", databaseField: "COUNT(*)", dataType: "integer", description: "Number of completed study sessions" },
          { frontendField: "totalStudyTime", databaseField: "SUM(duration_minutes)", dataType: "integer", description: "Total minutes studied" },
          { frontendField: "streakDays", databaseField: "streak_days", dataType: "integer", description: "Consecutive days of study" },
          { frontendField: "weeklyProgress", databaseField: "weekly_target_percentage", dataType: "float", description: "Progress toward weekly goal" }
        ]
      },
      {
        component: "MoodTracker",
        databaseTable: "user_moods",
        apiEndpoint: "/students/:studentId/mood-logs",
        fields: [
          { frontendField: "currentMood", databaseField: "current_mood", dataType: "enum", description: "Current mood state" },
          { frontendField: "moodTimestamp", databaseField: "timestamp", dataType: "timestamp", description: "When mood was recorded" },
          { frontendField: "moodHistory", databaseField: "mood_history", dataType: "array", description: "Previous mood entries" }
        ]
      },
      {
        component: "TodaysPlan",
        databaseTable: "daily_plans",
        apiEndpoint: "/students/:studentId/daily-plan",
        fields: [
          { frontendField: "todaysTasks", databaseField: "tasks", dataType: "array", description: "Tasks scheduled for today" },
          { frontendField: "scheduledBreaks", databaseField: "breaks", dataType: "array", description: "Scheduled breaks" },
          { frontendField: "priorities", databaseField: "priority_tasks", dataType: "array", description: "High priority tasks" },
          { frontendField: "completionRate", databaseField: "completion_rate", dataType: "float", description: "Percentage of completed tasks" }
        ]
      },
      {
        component: "SubjectBreakdown",
        databaseTable: "user_subjects",
        apiEndpoint: "/students/:studentId/subjects",
        fields: [
          { frontendField: "subjectList", databaseField: "subject_id", dataType: "array", description: "List of student's subjects" },
          { frontendField: "proficiency", databaseField: "proficiency_level", dataType: "integer", description: "Subject proficiency level (1-10)" },
          { frontendField: "weakAreas", databaseField: "is_weak_area", dataType: "boolean", description: "Flagged weak areas" },
          { frontendField: "studyTimeAllocation", databaseField: "time_allocation", dataType: "integer", description: "Minutes allocated per week" }
        ]
      }
    ]
  },
  
  // TODAY'S PLAN PAGE
  {
    pageName: "Today's Plan",
    description: "Daily study plan showing scheduled tasks and activities",
    components: [
      {
        component: "DailySchedule",
        databaseTable: "daily_plans",
        apiEndpoint: "/students/:studentId/daily-plan",
        fields: [
          { frontendField: "timeSlots", databaseField: "time_slots", dataType: "array", description: "Study time slots for the day" },
          { frontendField: "activities", databaseField: "activities", dataType: "array", description: "Scheduled study activities" },
          { frontendField: "duration", databaseField: "duration_minutes", dataType: "integer", description: "Duration of each activity" },
          { frontendField: "date", databaseField: "plan_date", dataType: "date", description: "Date of the plan" }
        ]
      },
      {
        component: "SubjectTasks",
        databaseTable: "subject_tasks",
        apiEndpoint: "/students/:studentId/tasks",
        fields: [
          { frontendField: "taskId", databaseField: "id", dataType: "uuid", description: "Unique task identifier" },
          { frontendField: "subjectId", databaseField: "subject_id", dataType: "uuid", description: "Related subject" },
          { frontendField: "priority", databaseField: "priority", dataType: "enum", description: "Task priority level" },
          { frontendField: "isCompleted", databaseField: "is_completed", dataType: "boolean", description: "Completion status" },
          { frontendField: "description", databaseField: "description", dataType: "string", description: "Task description" }
        ]
      },
      {
        component: "SmartExtras",
        databaseTable: "recommended_content",
        apiEndpoint: "/students/:studentId/recommendations",
        fields: [
          { frontendField: "contentType", databaseField: "content_type", dataType: "enum", description: "Type of content (video, article, etc.)" },
          { frontendField: "contentId", databaseField: "content_id", dataType: "uuid", description: "Content identifier" },
          { frontendField: "reasonForRecommendation", databaseField: "recommendation_reason", dataType: "string", description: "Why this was recommended" }
        ]
      },
      {
        component: "StudyHistory",
        databaseTable: "study_sessions",
        apiEndpoint: "/students/:studentId/study-sessions",
        fields: [
          { frontendField: "date", databaseField: "session_date", dataType: "date", description: "Session date" },
          { frontendField: "duration", databaseField: "duration_minutes", dataType: "integer", description: "Session duration in minutes" },
          { frontendField: "subject", databaseField: "subject_id", dataType: "uuid", description: "Subject studied" },
          { frontendField: "completion", databaseField: "completion_percentage", dataType: "float", description: "Percentage completed" }
        ]
      }
    ]
  },
  
  // ACADEMIC ADVISOR PAGE
  {
    pageName: "Academic Advisor",
    description: "Study planning and academic guidance tools",
    components: [
      {
        component: "StudyPlans",
        databaseTable: "study_plans",
        apiEndpoint: "/students/:studentId/study-plans",
        fields: [
          { frontendField: "planId", databaseField: "id", dataType: "uuid", description: "Plan identifier" },
          { frontendField: "name", databaseField: "name", dataType: "string", description: "Plan name" },
          { frontendField: "duration", databaseField: "duration_days", dataType: "integer", description: "Plan duration" },
          { frontendField: "startDate", databaseField: "start_date", dataType: "date", description: "Start date" },
          { frontendField: "endDate", databaseField: "end_date", dataType: "date", description: "End date" }
        ]
      },
      {
        component: "PlanDetails",
        databaseTable: "study_plan_details",
        apiEndpoint: "/students/:studentId/study-plans/:planId",
        fields: [
          { frontendField: "dailyHours", databaseField: "daily_hours", dataType: "float", description: "Hours per day" },
          { frontendField: "focusAreas", databaseField: "focus_areas", dataType: "array", description: "Areas of focus" },
          { frontendField: "milestones", databaseField: "milestones", dataType: "array", description: "Plan milestones" },
          { frontendField: "subjects", databaseField: "subjects", dataType: "array", description: "Included subjects" }
        ]
      },
      {
        component: "WeeklySchedule",
        databaseTable: "weekly_schedule",
        apiEndpoint: "/students/:studentId/study-plans/:planId/schedule",
        fields: [
          { frontendField: "dayOfWeek", databaseField: "day_of_week", dataType: "enum", description: "Day of week" },
          { frontendField: "timeSlots", databaseField: "time_slots", dataType: "array", description: "Scheduled time slots" },
          { frontendField: "subjectAllocation", databaseField: "subject_allocation", dataType: "jsonb", description: "Subject time allocations" }
        ]
      },
      {
        component: "AIRecommendations",
        databaseTable: "ai_study_recommendations",
        apiEndpoint: "/ai/study-recommendations/:studentId",
        fields: [
          { frontendField: "recommendationType", databaseField: "recommendation_type", dataType: "enum", description: "Type of recommendation" },
          { frontendField: "content", databaseField: "content", dataType: "text", description: "Recommendation content" },
          { frontendField: "confidenceScore", databaseField: "confidence_score", dataType: "float", description: "AI confidence score" }
        ]
      }
    ]
  },
  
  // EXAM SYLLABUS PAGE
  {
    pageName: "Exam Syllabus",
    description: "Complete curriculum and syllabus information for exams",
    components: [
      {
        component: "SyllabusTree",
        databaseTable: "exam_syllabus",
        apiEndpoint: "/content/exams/:examId/syllabus",
        fields: [
          { frontendField: "examId", databaseField: "exam_id", dataType: "uuid", description: "Exam identifier" },
          { frontendField: "subjects", databaseField: "subjects", dataType: "array", description: "List of subjects" },
          { frontendField: "topics", databaseField: "topics", dataType: "array", description: "Topics within subjects" },
          { frontendField: "hierarchy", databaseField: "hierarchy", dataType: "jsonb", description: "Topic hierarchy" }
        ]
      },
      {
        component: "SyllabusProgressTracker",
        databaseTable: "student_syllabus_progress",
        apiEndpoint: "/students/:studentId/syllabus-progress/:examId",
        fields: [
          { frontendField: "completionPercentage", databaseField: "completion_percentage", dataType: "float", description: "Overall completion %" },
          { frontendField: "topicStatus", databaseField: "topic_status", dataType: "jsonb", description: "Status of each topic" },
          { frontendField: "lastStudied", databaseField: "last_studied", dataType: "timestamp", description: "Last study timestamp" }
        ]
      },
      {
        component: "ImportantTopics",
        databaseTable: "syllabus_topic_importance",
        apiEndpoint: "/content/exams/:examId/important-topics",
        fields: [
          { frontendField: "topicId", databaseField: "topic_id", dataType: "uuid", description: "Topic identifier" },
          { frontendField: "importanceScore", databaseField: "importance_score", dataType: "float", description: "Topic importance (0-10)" },
          { frontendField: "previousYearFrequency", databaseField: "previous_year_frequency", dataType: "integer", description: "Appearance frequency" }
        ]
      }
    ]
  },
  
  // PREVIOUS YEAR PAPER PAGE
  {
    pageName: "Previous Year Papers",
    description: "Analysis and practice with past exam papers",
    components: [
      {
        component: "PaperList",
        databaseTable: "previous_year_papers",
        apiEndpoint: "/content/exams/:examId/previous-papers",
        fields: [
          { frontendField: "paperId", databaseField: "id", dataType: "uuid", description: "Paper identifier" },
          { frontendField: "year", databaseField: "year", dataType: "integer", description: "Exam year" },
          { frontendField: "examDate", databaseField: "exam_date", dataType: "date", description: "Date of exam" },
          { frontendField: "difficultyRating", databaseField: "difficulty_rating", dataType: "float", description: "Difficulty (1-10)" },
          { frontendField: "questionCount", databaseField: "question_count", dataType: "integer", description: "Number of questions" }
        ]
      },
      {
        component: "TopicwiseAnalysis",
        databaseTable: "paper_topic_distribution",
        apiEndpoint: "/content/exams/:examId/papers/:paperId/topic-distribution",
        fields: [
          { frontendField: "topicId", databaseField: "topic_id", dataType: "uuid", description: "Topic identifier" },
          { frontendField: "questionCount", databaseField: "question_count", dataType: "integer", description: "Questions in topic" },
          { frontendField: "marks", databaseField: "marks", dataType: "integer", description: "Marks allocated" },
          { frontendField: "recommendedStudyHours", databaseField: "recommended_study_hours", dataType: "float", description: "Study hours needed" }
        ]
      },
      {
        component: "DifficultyDistribution",
        databaseTable: "paper_difficulty_distribution",
        apiEndpoint: "/content/exams/:examId/papers/:paperId/difficulty-distribution",
        fields: [
          { frontendField: "easy", databaseField: "easy_percentage", dataType: "float", description: "% of easy questions" },
          { frontendField: "medium", databaseField: "medium_percentage", dataType: "float", description: "% of medium questions" },
          { frontendField: "hard", databaseField: "hard_percentage", dataType: "float", description: "% of hard questions" },
          { frontendField: "veryHard", databaseField: "very_hard_percentage", dataType: "float", description: "% of very hard questions" }
        ]
      }
    ]
  },
  
  // CONCEPT CARDS PAGE
  {
    pageName: "Concept Cards",
    description: "Learning materials for key academic concepts",
    components: [
      {
        component: "ConceptsList",
        databaseTable: "concepts",
        apiEndpoint: "/content/concepts",
        fields: [
          { frontendField: "id", databaseField: "id", dataType: "uuid", description: "Concept identifier" },
          { frontendField: "title", databaseField: "title", dataType: "string", description: "Concept title" },
          { frontendField: "description", databaseField: "description", dataType: "text", description: "Short description" },
          { frontendField: "subjectId", databaseField: "subject_id", dataType: "uuid", description: "Related subject" },
          { frontendField: "difficulty", databaseField: "difficulty", dataType: "enum", description: "Difficulty level" }
        ]
      },
      {
        component: "ConceptDetail",
        databaseTable: "concept_details",
        apiEndpoint: "/content/concepts/:conceptId",
        fields: [
          { frontendField: "fullDescription", databaseField: "full_description", dataType: "text", description: "Detailed explanation" },
          { frontendField: "examples", databaseField: "examples", dataType: "array", description: "Illustrative examples" },
          { frontendField: "diagrams", databaseField: "diagrams", dataType: "array", description: "Visual diagrams URLs" },
          { frontendField: "videos", databaseField: "videos", dataType: "array", description: "Explanatory videos URLs" },
          { frontendField: "prerequisites", databaseField: "prerequisites", dataType: "array", description: "Prerequisite concepts" }
        ]
      },
      {
        component: "ConceptFormulas",
        databaseTable: "concept_formulas",
        apiEndpoint: "/content/concepts/:conceptId/formulas",
        fields: [
          { frontendField: "formulaId", databaseField: "id", dataType: "uuid", description: "Formula identifier" },
          { frontendField: "latex", databaseField: "latex", dataType: "string", description: "Formula in LaTeX" },
          { frontendField: "variables", databaseField: "variables", dataType: "jsonb", description: "Variable descriptions" },
          { frontendField: "applications", databaseField: "applications", dataType: "array", description: "Real-world applications" }
        ]
      },
      {
        component: "ConceptProgress",
        databaseTable: "user_concept_progress",
        apiEndpoint: "/students/:studentId/concepts/:conceptId/progress",
        fields: [
          { frontendField: "completionPercentage", databaseField: "completion_percentage", dataType: "float", description: "Study completion %" },
          { frontendField: "lastAccessed", databaseField: "last_accessed", dataType: "timestamp", description: "Last study timestamp" },
          { frontendField: "masteryLevel", databaseField: "mastery_level", dataType: "float", description: "Knowledge mastery (0-1)" },
          { frontendField: "notes", databaseField: "notes", dataType: "text", description: "User's personal notes" }
        ]
      }
    ]
  },
  
  // FLASHCARDS PAGE
  {
    pageName: "Flashcards",
    description: "Spaced repetition flashcard learning system",
    components: [
      {
        component: "FlashcardDecks",
        databaseTable: "flashcard_decks",
        apiEndpoint: "/content/flashcards/decks",
        fields: [
          { frontendField: "deckId", databaseField: "id", dataType: "uuid", description: "Deck identifier" },
          { frontendField: "deckName", databaseField: "name", dataType: "string", description: "Deck name" },
          { frontendField: "cardCount", databaseField: "card_count", dataType: "integer", description: "Number of cards" },
          { frontendField: "subject", databaseField: "subject_id", dataType: "uuid", description: "Subject area" },
          { frontendField: "creator", databaseField: "creator_id", dataType: "uuid", description: "Creator user ID" }
        ]
      },
      {
        component: "FlashcardCards",
        databaseTable: "flashcards",
        apiEndpoint: "/content/flashcards/decks/:deckId/cards",
        fields: [
          { frontendField: "cardId", databaseField: "id", dataType: "uuid", description: "Card identifier" },
          { frontendField: "front", databaseField: "front", dataType: "text", description: "Question side" },
          { frontendField: "back", databaseField: "back", dataType: "text", description: "Answer side" },
          { frontendField: "hints", databaseField: "hints", dataType: "array", description: "Optional hints" },
          { frontendField: "media", databaseField: "media_urls", dataType: "array", description: "Images/diagrams" }
        ]
      },
      {
        component: "UserFlashcardProgress",
        databaseTable: "user_flashcard_progress",
        apiEndpoint: "/students/:studentId/flashcards/stats",
        fields: [
          { frontendField: "masteredCards", databaseField: "mastered_count", dataType: "integer", description: "Mastered cards count" },
          { frontendField: "needReview", databaseField: "need_review_count", dataType: "integer", description: "Cards needing review" },
          { frontendField: "lastPracticed", databaseField: "last_practiced", dataType: "timestamp", description: "Last practice timestamp" }
        ]
      },
      {
        component: "FlashcardSpacedRepetition",
        databaseTable: "spaced_repetition_data",
        apiEndpoint: "/students/:studentId/flashcards/:cardId/progress",
        fields: [
          { frontendField: "confidenceLevel", databaseField: "confidence_level", dataType: "float", description: "Recall confidence (0-1)" },
          { frontendField: "nextReviewDate", databaseField: "next_review", dataType: "timestamp", description: "Next scheduled review" },
          { frontendField: "repetitionData", databaseField: "repetition_data", dataType: "jsonb", description: "Algorithm parameters" },
          { frontendField: "interval", databaseField: "interval_days", dataType: "integer", description: "Days until next review" }
        ]
      }
    ]
  },
  
  // PRACTICE EXAM PAGE
  {
    pageName: "Practice Exams",
    description: "Mock exams and practice tests",
    components: [
      {
        component: "ExamList",
        databaseTable: "practice_exams",
        apiEndpoint: "/content/exams",
        fields: [
          { frontendField: "examId", databaseField: "id", dataType: "uuid", description: "Exam identifier" },
          { frontendField: "title", databaseField: "title", dataType: "string", description: "Exam title" },
          { frontendField: "duration", databaseField: "time_limit_minutes", dataType: "integer", description: "Time limit in minutes" },
          { frontendField: "questionCount", databaseField: "total_questions", dataType: "integer", description: "Number of questions" },
          { frontendField: "difficulty", databaseField: "difficulty", dataType: "enum", description: "Difficulty level" }
        ]
      },
      {
        component: "ExamQuestions",
        databaseTable: "exam_questions",
        apiEndpoint: "/content/exams/:examId/questions",
        fields: [
          { frontendField: "questionId", databaseField: "id", dataType: "uuid", description: "Question identifier" },
          { frontendField: "content", databaseField: "content", dataType: "text", description: "Question text" },
          { frontendField: "options", databaseField: "options", dataType: "array", description: "Answer options" },
          { frontendField: "correctAnswer", databaseField: "correct_answer", dataType: "string", description: "Correct answer" },
          { frontendField: "explanation", databaseField: "explanation", dataType: "text", description: "Answer explanation" },
          { frontendField: "marks", databaseField: "marks", dataType: "integer", description: "Points for correct answer" }
        ]
      },
      {
        component: "ExamResults",
        databaseTable: "user_exam_results",
        apiEndpoint: "/students/:studentId/exams/:examId/results",
        fields: [
          { frontendField: "score", databaseField: "score", dataType: "float", description: "Score achieved" },
          { frontendField: "timeTaken", databaseField: "time_taken_minutes", dataType: "integer", description: "Time taken in minutes" },
          { frontendField: "answeredCorrectly", databaseField: "correctly_answered", dataType: "integer", description: "Number correct" },
          { frontendField: "weakAreas", databaseField: "weak_areas", dataType: "array", description: "Identified weak areas" },
          { frontendField: "percentile", databaseField: "percentile", dataType: "float", description: "Performance percentile" }
        ]
      },
      {
        component: "TimeManagement",
        databaseTable: "exam_time_tracking",
        apiEndpoint: "/students/:studentId/exams/:examId/time-tracking",
        fields: [
          { frontendField: "timePerQuestion", databaseField: "time_per_question", dataType: "jsonb", description: "Time spent per question" },
          { frontendField: "overallPace", databaseField: "overall_pace", dataType: "float", description: "Pace relative to ideal" },
          { frontendField: "optimalTimeUsage", databaseField: "optimal_time_usage", dataType: "jsonb", description: "Time optimization data" }
        ]
      }
    ]
  },
  
  // FORMULA PRACTICE PAGE
  {
    pageName: "Formula Practice",
    description: "Interactive formula learning and practice",
    components: [
      {
        component: "FormulaList",
        databaseTable: "subject_formulas",
        apiEndpoint: "/content/formulas",
        fields: [
          { frontendField: "formulaId", databaseField: "id", dataType: "uuid", description: "Formula identifier" },
          { frontendField: "name", databaseField: "name", dataType: "string", description: "Formula name" },
          { frontendField: "latex", databaseField: "latex", dataType: "string", description: "LaTeX representation" },
          { frontendField: "subject", databaseField: "subject_id", dataType: "uuid", description: "Related subject" },
          { frontendField: "difficulty", databaseField: "difficulty", dataType: "enum", description: "Formula complexity" }
        ]
      },
      {
        component: "FormulaDetails",
        databaseTable: "formula_details",
        apiEndpoint: "/content/formulas/:formulaId",
        fields: [
          { frontendField: "description", databaseField: "description", dataType: "text", description: "Detailed explanation" },
          { frontendField: "variables", databaseField: "variables", dataType: "jsonb", description: "Variable descriptions" },
          { frontendField: "units", databaseField: "units", dataType: "jsonb", description: "Unit information" },
          { frontendField: "derivation", databaseField: "derivation", dataType: "text", description: "Formula derivation" },
          { frontendField: "applications", databaseField: "applications", dataType: "array", description: "Real-world applications" }
        ]
      },
      {
        component: "FormulaPractice",
        databaseTable: "formula_practice_exercises",
        apiEndpoint: "/content/formulas/:formulaId/exercises",
        fields: [
          { frontendField: "exerciseId", databaseField: "id", dataType: "uuid", description: "Exercise identifier" },
          { frontendField: "problem", databaseField: "problem", dataType: "text", description: "Problem statement" },
          { frontendField: "givenValues", databaseField: "given_values", dataType: "jsonb", description: "Given values" },
          { frontendField: "solutionSteps", databaseField: "solution_steps", dataType: "array", description: "Solving steps" },
          { frontendField: "answer", databaseField: "answer", dataType: "jsonb", description: "Correct answer with units" }
        ]
      },
      {
        component: "FormulaMastery",
        databaseTable: "user_formula_mastery",
        apiEndpoint: "/students/:studentId/formulas/mastery",
        fields: [
          { frontendField: "formulaId", databaseField: "formula_id", dataType: "uuid", description: "Formula reference" },
          { frontendField: "masteryLevel", databaseField: "mastery_level", dataType: "float", description: "Mastery level (0-1)" },
          { frontendField: "practiceCount", databaseField: "practice_count", dataType: "integer", description: "Times practiced" },
          { frontendField: "successRate", databaseField: "success_rate", dataType: "float", description: "Correct answers percentage" },
          { frontendField: "lastPracticed", databaseField: "last_practiced", dataType: "timestamp", description: "Last practice timestamp" }
        ]
      }
    ]
  },
  
  // PROFILE PAGE
  {
    pageName: "Profile",
    description: "User profile and account settings",
    components: [
      {
        component: "ProfileInfo",
        databaseTable: "users",
        apiEndpoint: "/students/:studentId/profile",
        fields: [
          { frontendField: "name", databaseField: "name", dataType: "string", description: "User's name" },
          { frontendField: "email", databaseField: "email", dataType: "string", description: "Email address" },
          { frontendField: "phone", databaseField: "phone_number", dataType: "string", description: "Phone number" },
          { frontendField: "avatarUrl", databaseField: "avatar_url", dataType: "string", description: "Profile picture URL" },
          { frontendField: "joinDate", databaseField: "created_at", dataType: "timestamp", description: "Account creation date" }
        ]
      },
      {
        component: "AcademicProfile",
        databaseTable: "user_demographics",
        apiEndpoint: "/students/:studentId/demographics",
        fields: [
          { frontendField: "grade", databaseField: "grade", dataType: "string", description: "Academic grade/year" },
          { frontendField: "institution", databaseField: "institution", dataType: "string", description: "School/college name" },
          { frontendField: "examGoal", databaseField: "exam_goal", dataType: "string", description: "Target examination" },
          { frontendField: "examDate", databaseField: "exam_date", dataType: "date", description: "Exam target date" }
        ]
      },
      {
        component: "StudyPreferences",
        databaseTable: "user_preferences",
        apiEndpoint: "/students/:studentId/preferences",
        fields: [
          { frontendField: "studyTime", databaseField: "preferred_study_time", dataType: "enum", description: "Preferred time of day" },
          { frontendField: "studyPace", databaseField: "study_pace", dataType: "enum", description: "Study pace preference" },
          { frontendField: "dailyStudyHours", databaseField: "daily_study_hours", dataType: "float", description: "Target hours per day" },
          { frontendField: "weeklyStudyDays", databaseField: "weekly_study_days", dataType: "integer", description: "Study days per week" },
          { frontendField: "notificationPrefs", databaseField: "notification_preferences", dataType: "jsonb", description: "Notification settings" }
        ]
      },
      {
        component: "SubscriptionDetails",
        databaseTable: "subscriptions",
        apiEndpoint: "/students/:studentId/subscription",
        fields: [
          { frontendField: "planName", databaseField: "plan_name", dataType: "string", description: "Subscription plan name" },
          { frontendField: "startDate", databaseField: "start_date", dataType: "date", description: "Subscription start date" },
          { frontendField: "endDate", databaseField: "end_date", dataType: "date", description: "Subscription end date" },
          { frontendField: "status", databaseField: "status", dataType: "enum", description: "Active/expired/cancelled" },
          { frontendField: "autoRenew", databaseField: "auto_renew", dataType: "boolean", description: "Auto-renewal status" }
        ]
      }
    ]
  },
  
  // NOTIFICATIONS PAGE
  {
    pageName: "Notifications",
    description: "User notification center",
    components: [
      {
        component: "NotificationList",
        databaseTable: "notifications",
        apiEndpoint: "/students/:studentId/notifications",
        fields: [
          { frontendField: "id", databaseField: "id", dataType: "uuid", description: "Notification identifier" },
          { frontendField: "type", databaseField: "type", dataType: "enum", description: "Notification category" },
          { frontendField: "title", databaseField: "title", dataType: "string", description: "Notification title" },
          { frontendField: "message", databaseField: "message", dataType: "text", description: "Notification content" },
          { frontendField: "isRead", databaseField: "is_read", dataType: "boolean", description: "Read status" },
          { frontendField: "createdAt", databaseField: "created_at", dataType: "timestamp", description: "Creation timestamp" },
          { frontendField: "actionUrl", databaseField: "action_url", dataType: "string", description: "Related action link" }
        ]
      },
      {
        component: "NotificationPreferences",
        databaseTable: "notification_preferences",
        apiEndpoint: "/students/:studentId/notification-preferences",
        fields: [
          { frontendField: "emailNotifications", databaseField: "email_enabled", dataType: "boolean", description: "Email notifications toggle" },
          { frontendField: "pushNotifications", databaseField: "push_enabled", dataType: "boolean", description: "Push notifications toggle" },
          { frontendField: "studyReminders", databaseField: "study_reminders_enabled", dataType: "boolean", description: "Study reminder toggle" },
          { frontendField: "examAlerts", databaseField: "exam_alerts_enabled", dataType: "boolean", description: "Exam alerts toggle" },
          { frontendField: "marketingEmails", databaseField: "marketing_enabled", dataType: "boolean", description: "Marketing communications toggle" }
        ]
      }
    ]
  }
];

/**
 * Utility function to get database mapping for a specific page
 */
export const getPageDatabaseMapping = (pageName: string): PageDatabaseMapping | undefined => {
  return pageDatabaseMappings.find(mapping => 
    mapping.pageName.toLowerCase() === pageName.toLowerCase()
  );
};

/**
 * Utility function to get all table names used in the application
 */
export const getAllDatabaseTables = (): string[] => {
  const tableSet = new Set<string>();
  
  pageDatabaseMappings.forEach(page => {
    page.components.forEach(component => {
      tableSet.add(component.databaseTable);
    });
  });
  
  return Array.from(tableSet);
};

/**
 * Export database mapping for documentation generation
 */
export const getDatabaseMappingAsMarkdown = (): string => {
  let markdown = "# PREPZR Database Mapping Documentation\n\n";
  
  pageDatabaseMappings.forEach(page => {
    markdown += `## ${page.pageName}\n\n`;
    markdown += `${page.description}\n\n`;
    
    page.components.forEach(component => {
      markdown += `### ${component.component}\n\n`;
      markdown += `**Database Table:** \`${component.databaseTable}\`\n\n`;
      
      if (component.apiEndpoint) {
        markdown += `**API Endpoint:** \`${component.apiEndpoint}\`\n\n`;
      }
      
      markdown += "| Frontend Field | Database Field | Data Type | Description |\n";
      markdown += "|---------------|---------------|-----------|-------------|\n";
      
      component.fields.forEach(field => {
        markdown += `| ${field.frontendField} | ${field.databaseField} | ${field.dataType} | ${field.description} |\n`;
      });
      
      markdown += "\n";
    });
  });
  
  return markdown;
};

export default pageDatabaseMappings;
