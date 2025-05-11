
// This utility provides the database mapping functionality for the documentation page

// Define mapping types
interface DatabaseField {
  frontendField: string;
  databaseColumn: string;
  description: string;
  type: string;
  isRequired: boolean;
}

interface DatabaseTable {
  name: string;
  description: string;
  primaryKey: string;
  fields: DatabaseField[];
  relationships?: {
    table: string;
    type: "one-to-one" | "one-to-many" | "many-to-many";
    throughTable?: string;
    description: string;
  }[];
}

interface ApiEndpoint {
  path: string;
  method: string;
  description: string;
  parameters?: {
    name: string;
    type: string;
    description: string;
    isRequired: boolean;
  }[];
}

interface ComponentMapping {
  name: string;
  description: string;
  location: string;
  databaseTables: DatabaseTable[];
  apiEndpoints: ApiEndpoint[];
}

interface PageMapping {
  name: string;
  route: string;
  description: string;
  components: ComponentMapping[];
}

// Define the database mappings for each page
const databaseMapping: PageMapping[] = [
  {
    name: "Dashboard",
    route: "/dashboard/student",
    description: "Main student dashboard showing overview of study progress, recommendations, and key metrics",
    components: [
      {
        name: "StudyProgressSection",
        description: "Shows progress across subjects",
        location: "src/components/dashboard/student/StudyProgress.tsx",
        databaseTables: [
          {
            name: "user_study_progress",
            description: "Tracks user's progress across subjects",
            primaryKey: "progress_id",
            fields: [
              { frontendField: "subject", databaseColumn: "subject_name", description: "Subject name", type: "string", isRequired: true },
              { frontendField: "progress", databaseColumn: "completion_percentage", description: "Progress percentage", type: "float", isRequired: true },
              { frontendField: "lastStudied", databaseColumn: "last_studied_at", description: "Last study timestamp", type: "datetime", isRequired: false },
            ],
            relationships: [
              {
                table: "users",
                type: "one-to-many",
                description: "One user has many subject progress records"
              }
            ]
          }
        ],
        apiEndpoints: [
          {
            path: "/api/student/progress",
            method: "GET",
            description: "Fetches study progress for the current user"
          }
        ]
      },
      {
        name: "MoodTracker",
        description: "Tracks and displays student mood",
        location: "src/components/dashboard/student/MoodSelector.tsx",
        databaseTables: [
          {
            name: "user_moods",
            description: "Stores user mood history",
            primaryKey: "mood_entry_id",
            fields: [
              { frontendField: "currentMood", databaseColumn: "mood_type", description: "Current mood", type: "enum", isRequired: true },
              { frontendField: "timestamp", databaseColumn: "created_at", description: "When mood was logged", type: "datetime", isRequired: true },
              { frontendField: "notes", databaseColumn: "notes", description: "Optional notes about mood", type: "text", isRequired: false },
            ]
          }
        ],
        apiEndpoints: [
          {
            path: "/api/student/mood",
            method: "POST",
            description: "Records a new mood entry"
          },
          {
            path: "/api/student/mood/history",
            method: "GET",
            description: "Fetches mood history for the current user"
          }
        ]
      }
    ]
  },
  {
    name: "Academic Advisor",
    route: "/dashboard/student/academic-advisor",
    description: "AI-powered study advisor that provides personalized guidance",
    components: [
      {
        name: "AcademicAdvisorView",
        description: "Main academic advisor interface",
        location: "src/components/dashboard/student/academic/AcademicAdvisorView.tsx",
        databaseTables: [
          {
            name: "study_recommendations",
            description: "Personalized study recommendations",
            primaryKey: "recommendation_id",
            fields: [
              { frontendField: "title", databaseColumn: "title", description: "Recommendation title", type: "string", isRequired: true },
              { frontendField: "description", databaseColumn: "description", description: "Detailed explanation", type: "text", isRequired: true },
              { frontendField: "priority", databaseColumn: "priority_level", description: "Recommendation priority", type: "integer", isRequired: true },
              { frontendField: "createdAt", databaseColumn: "created_at", description: "Creation timestamp", type: "datetime", isRequired: true },
            ]
          },
          {
            name: "user_study_patterns",
            description: "Analysis of user study habits and patterns",
            primaryKey: "pattern_id",
            fields: [
              { frontendField: "patternType", databaseColumn: "pattern_type", description: "Type of study pattern", type: "string", isRequired: true },
              { frontendField: "description", databaseColumn: "description", description: "Pattern description", type: "text", isRequired: true },
              { frontendField: "detectedAt", databaseColumn: "detected_at", description: "When pattern was detected", type: "datetime", isRequired: true },
            ]
          }
        ],
        apiEndpoints: [
          {
            path: "/api/advisor/recommendations",
            method: "GET",
            description: "Fetches personalized study recommendations"
          },
          {
            path: "/api/advisor/insights",
            method: "GET",
            description: "Gets AI insights based on study patterns"
          }
        ]
      }
    ]
  },
  {
    name: "Today's Plan",
    route: "/dashboard/student/todays-plan",
    description: "Personalized daily study schedule",
    components: [
      {
        name: "RedesignedTodaysPlan",
        description: "Shows today's study plan with tasks and schedule",
        location: "src/components/dashboard/student/todays-plan/RedesignedTodaysPlan.tsx",
        databaseTables: [
          {
            name: "study_sessions",
            description: "Scheduled study sessions",
            primaryKey: "session_id",
            fields: [
              { frontendField: "subject", databaseColumn: "subject_name", description: "Subject to study", type: "string", isRequired: true },
              { frontendField: "duration", databaseColumn: "duration_minutes", description: "Session duration", type: "integer", isRequired: true },
              { frontendField: "startTime", databaseColumn: "start_time", description: "Session start time", type: "datetime", isRequired: true },
              { frontendField: "completed", databaseColumn: "is_completed", description: "Completion status", type: "boolean", isRequired: true },
              { frontendField: "priority", databaseColumn: "priority_level", description: "Session priority", type: "integer", isRequired: false },
            ]
          },
          {
            name: "study_tasks",
            description: "Specific tasks within study sessions",
            primaryKey: "task_id",
            fields: [
              { frontendField: "description", databaseColumn: "task_description", description: "Task description", type: "string", isRequired: true },
              { frontendField: "completed", databaseColumn: "is_completed", description: "Task completion status", type: "boolean", isRequired: true },
              { frontendField: "estimatedTime", databaseColumn: "estimated_minutes", description: "Estimated completion time", type: "integer", isRequired: false },
            ],
            relationships: [
              {
                table: "study_sessions",
                type: "one-to-many",
                description: "One session has many tasks"
              }
            ]
          }
        ],
        apiEndpoints: [
          {
            path: "/api/student/plan/today",
            method: "GET",
            description: "Fetches the current day's study plan"
          },
          {
            path: "/api/student/task/{taskId}",
            method: "PATCH",
            description: "Updates a study task (e.g., mark as complete)"
          }
        ]
      }
    ]
  },
  {
    name: "Concept Cards",
    route: "/dashboard/student/concepts",
    description: "Library of concept cards for learning key topics",
    components: [
      {
        name: "ConceptsLandingPage",
        description: "Browse and search concept cards",
        location: "src/components/dashboard/student/concepts/ConceptsLandingPage.tsx",
        databaseTables: [
          {
            name: "concept_cards",
            description: "Core concept card content",
            primaryKey: "concept_id",
            fields: [
              { frontendField: "title", databaseColumn: "title", description: "Concept title", type: "string", isRequired: true },
              { frontendField: "subject", databaseColumn: "subject", description: "Subject area", type: "string", isRequired: true },
              { frontendField: "description", databaseColumn: "description", description: "Brief description", type: "text", isRequired: true },
              { frontendField: "difficulty", databaseColumn: "difficulty_level", description: "Difficulty rating", type: "enum", isRequired: true },
              { frontendField: "timeEstimate", databaseColumn: "estimated_minutes", description: "Estimated study time", type: "integer", isRequired: true },
            ]
          },
          {
            name: "user_concept_progress",
            description: "Tracks user's progress on each concept",
            primaryKey: "progress_id",
            fields: [
              { frontendField: "progress", databaseColumn: "completion_percentage", description: "Completion percentage", type: "float", isRequired: true },
              { frontendField: "lastStudied", databaseColumn: "last_studied_at", description: "Last studied timestamp", type: "datetime", isRequired: false },
              { frontendField: "isBookmarked", databaseColumn: "is_bookmarked", description: "Bookmark status", type: "boolean", isRequired: true },
            ],
            relationships: [
              {
                table: "concept_cards",
                type: "one-to-one",
                description: "Each progress entry relates to one concept card"
              },
              {
                table: "users",
                type: "many-to-one",
                description: "Many progress entries belong to one user"
              }
            ]
          }
        ],
        apiEndpoints: [
          {
            path: "/api/concepts",
            method: "GET",
            description: "Fetches all concept cards with optional filtering"
          },
          {
            path: "/api/concepts/{conceptId}/bookmark",
            method: "POST",
            description: "Toggles bookmark status for a concept"
          }
        ]
      }
    ]
  },
  {
    name: "Exam Syllabus",
    route: "/dashboard/student/exam-syllabus",
    description: "Structured exam curriculum and topic coverage",
    components: [
      {
        name: "ExamSyllabusPage",
        description: "Complete syllabus breakdown with progress tracking",
        location: "src/components/dashboard/student/syllabus/ExamSyllabusPage.tsx",
        databaseTables: [
          {
            name: "exam_syllabi",
            description: "Exam syllabus structure",
            primaryKey: "syllabus_id",
            fields: [
              { frontendField: "examName", databaseColumn: "exam_name", description: "Exam name", type: "string", isRequired: true },
              { frontendField: "examYear", databaseColumn: "exam_year", description: "Academic year", type: "integer", isRequired: true },
              { frontendField: "examBoard", databaseColumn: "exam_board", description: "Examining body", type: "string", isRequired: true },
              { frontendField: "lastUpdated", databaseColumn: "last_updated", description: "Last updated timestamp", type: "datetime", isRequired: true },
            ]
          },
          {
            name: "syllabus_topics",
            description: "Individual topics in the syllabus",
            primaryKey: "topic_id",
            fields: [
              { frontendField: "title", databaseColumn: "topic_name", description: "Topic name", type: "string", isRequired: true },
              { frontendField: "subject", databaseColumn: "subject_name", description: "Subject area", type: "string", isRequired: true },
              { frontendField: "description", databaseColumn: "description", description: "Topic description", type: "text", isRequired: false },
              { frontendField: "weightage", databaseColumn: "weightage_percentage", description: "Topic importance/weightage", type: "float", isRequired: true },
              { frontendField: "parentTopic", databaseColumn: "parent_topic_id", description: "Parent topic reference", type: "integer", isRequired: false },
            ],
            relationships: [
              {
                table: "exam_syllabi",
                type: "many-to-one",
                description: "Many topics belong to one syllabus"
              }
            ]
          },
          {
            name: "user_topic_progress",
            description: "User's progress on each syllabus topic",
            primaryKey: "progress_id",
            fields: [
              { frontendField: "isCompleted", databaseColumn: "is_completed", description: "Completion status", type: "boolean", isRequired: true },
              { frontendField: "confidence", databaseColumn: "confidence_level", description: "User's confidence (1-5)", type: "integer", isRequired: false },
              { frontendField: "lastStudied", databaseColumn: "last_studied_at", description: "Last studied timestamp", type: "datetime", isRequired: false },
            ],
            relationships: [
              {
                table: "syllabus_topics",
                type: "one-to-one",
                description: "Each progress entry relates to one topic"
              },
              {
                table: "users",
                type: "many-to-one", 
                description: "Many progress entries belong to one user"
              }
            ]
          }
        ],
        apiEndpoints: [
          {
            path: "/api/syllabus/{examId}",
            method: "GET",
            description: "Fetches complete syllabus structure for an exam"
          },
          {
            path: "/api/syllabus/topic/{topicId}/progress",
            method: "PATCH",
            description: "Updates progress for a specific topic"
          }
        ]
      }
    ]
  },
  {
    name: "Previous Year Papers",
    route: "/dashboard/student/papers",
    description: "Archive of previous year exam papers with analysis",
    components: [
      {
        name: "PreviousYearPapersPage",
        description: "Browse and practice with previous exam papers",
        location: "src/components/dashboard/student/papers/PreviousYearPapersPage.tsx",
        databaseTables: [
          {
            name: "past_papers",
            description: "Previous year exam papers",
            primaryKey: "paper_id",
            fields: [
              { frontendField: "title", databaseColumn: "paper_title", description: "Paper title", type: "string", isRequired: true },
              { frontendField: "examName", databaseColumn: "exam_name", description: "Exam name", type: "string", isRequired: true },
              { frontendField: "year", databaseColumn: "year", description: "Year of exam", type: "integer", isRequired: true },
              { frontendField: "difficulty", databaseColumn: "difficulty_rating", description: "Paper difficulty (1-5)", type: "integer", isRequired: true },
              { frontendField: "totalMarks", databaseColumn: "total_marks", description: "Maximum marks available", type: "integer", isRequired: true },
              { frontendField: "duration", databaseColumn: "duration_minutes", description: "Paper duration", type: "integer", isRequired: true },
            ]
          },
          {
            name: "paper_questions",
            description: "Questions from past papers",
            primaryKey: "question_id",
            fields: [
              { frontendField: "questionText", databaseColumn: "question_text", description: "Question content", type: "text", isRequired: true },
              { frontendField: "marks", databaseColumn: "marks_value", description: "Question marks", type: "integer", isRequired: true },
              { frontendField: "topicId", databaseColumn: "topic_id", description: "Related syllabus topic", type: "integer", isRequired: true },
              { frontendField: "difficulty", databaseColumn: "difficulty_rating", description: "Question difficulty (1-5)", type: "integer", isRequired: true },
              { frontendField: "answerKey", databaseColumn: "answer_key", description: "Correct answer", type: "text", isRequired: false },
              { frontendField: "solution", databaseColumn: "solution_text", description: "Detailed solution", type: "text", isRequired: false },
            ],
            relationships: [
              {
                table: "past_papers",
                type: "many-to-one",
                description: "Many questions belong to one paper"
              },
              {
                table: "syllabus_topics",
                type: "many-to-one",
                description: "Questions are linked to syllabus topics"
              }
            ]
          },
          {
            name: "user_paper_attempts",
            description: "User's attempts at past papers",
            primaryKey: "attempt_id",
            fields: [
              { frontendField: "score", databaseColumn: "score_achieved", description: "User's score", type: "integer", isRequired: true },
              { frontendField: "attemptDate", databaseColumn: "attempted_at", description: "When paper was attempted", type: "datetime", isRequired: true },
              { frontendField: "completionTime", databaseColumn: "completion_minutes", description: "Time taken to complete", type: "integer", isRequired: true },
              { frontendField: "status", databaseColumn: "completion_status", description: "Attempt status", type: "enum", isRequired: true },
            ],
            relationships: [
              {
                table: "past_papers",
                type: "many-to-one",
                description: "Many attempts for one paper"
              }
            ]
          }
        ],
        apiEndpoints: [
          {
            path: "/api/papers",
            method: "GET",
            description: "Fetches available past papers with optional filters"
          },
          {
            path: "/api/papers/{paperId}",
            method: "GET",
            description: "Fetches a specific paper with all questions"
          },
          {
            path: "/api/papers/{paperId}/attempt",
            method: "POST",
            description: "Records a new attempt at a paper"
          }
        ]
      }
    ]
  },
  {
    name: "Flashcards",
    route: "/dashboard/student/flashcards",
    description: "Interactive flashcards for quick review",
    components: [
      {
        name: "FlashcardsPage",
        description: "Create and review flashcards",
        location: "src/components/dashboard/student/flashcards/FlashcardsPage.tsx",
        databaseTables: [
          {
            name: "flashcard_decks",
            description: "Sets of related flashcards",
            primaryKey: "deck_id",
            fields: [
              { frontendField: "title", databaseColumn: "deck_title", description: "Deck name", type: "string", isRequired: true },
              { frontendField: "subject", databaseColumn: "subject", description: "Subject area", type: "string", isRequired: true },
              { frontendField: "description", databaseColumn: "description", description: "Description", type: "text", isRequired: false },
              { frontendField: "createdAt", databaseColumn: "created_at", description: "Creation timestamp", type: "datetime", isRequired: true },
              { frontendField: "lastReviewed", databaseColumn: "last_reviewed_at", description: "Last review timestamp", type: "datetime", isRequired: false },
            ]
          },
          {
            name: "flashcards",
            description: "Individual flashcards",
            primaryKey: "card_id",
            fields: [
              { frontendField: "frontText", databaseColumn: "front_content", description: "Front side content", type: "text", isRequired: true },
              { frontendField: "backText", databaseColumn: "back_content", description: "Back side content", type: "text", isRequired: true },
              { frontendField: "difficulty", databaseColumn: "difficulty_rating", description: "Difficulty rating (1-5)", type: "integer", isRequired: false },
              { frontendField: "nextReviewAt", databaseColumn: "next_review_at", description: "When to next review", type: "datetime", isRequired: false },
            ],
            relationships: [
              {
                table: "flashcard_decks",
                type: "many-to-one",
                description: "Many cards belong to one deck"
              }
            ]
          },
          {
            name: "flashcard_review_history",
            description: "Record of flashcard reviews",
            primaryKey: "review_id",
            fields: [
              { frontendField: "knownStatus", databaseColumn: "is_known", description: "Whether card was known", type: "boolean", isRequired: true },
              { frontendField: "reviewedAt", databaseColumn: "reviewed_at", description: "Review timestamp", type: "datetime", isRequired: true },
              { frontendField: "responseTimeMs", databaseColumn: "response_time_ms", description: "Response time", type: "integer", isRequired: false },
            ],
            relationships: [
              {
                table: "flashcards",
                type: "many-to-one",
                description: "Many reviews for one card"
              }
            ]
          }
        ],
        apiEndpoints: [
          {
            path: "/api/flashcards/decks",
            method: "GET",
            description: "Fetches all flashcard decks"
          },
          {
            path: "/api/flashcards/decks/{deckId}",
            method: "GET",
            description: "Fetches cards for a specific deck"
          },
          {
            path: "/api/flashcards/review",
            method: "POST",
            description: "Records a flashcard review session"
          }
        ]
      }
    ]
  },
  {
    name: "Practice Exams",
    route: "/dashboard/student/practice-exams",
    description: "Take practice exams to prepare for the real thing",
    components: [
      {
        name: "PracticeExamsPage",
        description: "Select and take practice exams",
        location: "src/components/dashboard/student/practice-exams/PracticeExamsPage.tsx",
        databaseTables: [
          {
            name: "practice_exams",
            description: "Available practice exams",
            primaryKey: "exam_id",
            fields: [
              { frontendField: "title", databaseColumn: "exam_title", description: "Exam title", type: "string", isRequired: true },
              { frontendField: "description", databaseColumn: "description", description: "Description", type: "text", isRequired: false },
              { frontendField: "difficulty", databaseColumn: "difficulty_level", description: "Difficulty level", type: "enum", isRequired: true },
              { frontendField: "totalQuestions", databaseColumn: "total_questions", description: "Number of questions", type: "integer", isRequired: true },
              { frontendField: "timeLimit", databaseColumn: "time_limit_minutes", description: "Time limit", type: "integer", isRequired: true },
              { frontendField: "totalMarks", databaseColumn: "total_marks", description: "Maximum marks", type: "integer", isRequired: true },
            ]
          },
          {
            name: "practice_exam_questions",
            description: "Questions for practice exams",
            primaryKey: "question_id",
            fields: [
              { frontendField: "questionText", databaseColumn: "question_text", description: "Question content", type: "text", isRequired: true },
              { frontendField: "questionType", databaseColumn: "question_type", description: "Type of question", type: "enum", isRequired: true },
              { frontendField: "options", databaseColumn: "answer_options", description: "Possible answers (JSON)", type: "json", isRequired: false },
              { frontendField: "correctAnswer", databaseColumn: "correct_answer", description: "Correct answer", type: "text", isRequired: true },
              { frontendField: "explanation", databaseColumn: "explanation_text", description: "Answer explanation", type: "text", isRequired: false },
              { frontendField: "marks", databaseColumn: "marks_value", description: "Question marks", type: "integer", isRequired: true },
            ],
            relationships: [
              {
                table: "practice_exams",
                type: "many-to-one",
                description: "Many questions belong to one exam"
              },
              {
                table: "syllabus_topics",
                type: "many-to-one",
                description: "Questions are linked to syllabus topics"
              }
            ]
          },
          {
            name: "user_exam_attempts",
            description: "User's attempts at practice exams",
            primaryKey: "attempt_id",
            fields: [
              { frontendField: "score", databaseColumn: "score_achieved", description: "User's score", type: "integer", isRequired: true },
              { frontendField: "startedAt", databaseColumn: "started_at", description: "Start timestamp", type: "datetime", isRequired: true },
              { frontendField: "completedAt", databaseColumn: "completed_at", description: "Completion timestamp", type: "datetime", isRequired: false },
              { frontendField: "status", databaseColumn: "completion_status", description: "Attempt status", type: "enum", isRequired: true },
            ],
            relationships: [
              {
                table: "practice_exams",
                type: "many-to-one",
                description: "Many attempts for one exam"
              }
            ]
          },
          {
            name: "user_question_responses",
            description: "User's responses to individual questions",
            primaryKey: "response_id",
            fields: [
              { frontendField: "userAnswer", databaseColumn: "user_answer", description: "User's answer", type: "text", isRequired: true },
              { frontendField: "isCorrect", databaseColumn: "is_correct", description: "Whether answer was correct", type: "boolean", isRequired: true },
              { frontendField: "timeSpent", databaseColumn: "time_spent_seconds", description: "Time spent on question", type: "integer", isRequired: false },
            ],
            relationships: [
              {
                table: "practice_exam_questions",
                type: "many-to-one",
                description: "Many responses for one question"
              },
              {
                table: "user_exam_attempts",
                type: "many-to-one",
                description: "Many responses in one attempt"
              }
            ]
          }
        ],
        apiEndpoints: [
          {
            path: "/api/practice-exams",
            method: "GET",
            description: "Fetches available practice exams"
          },
          {
            path: "/api/practice-exams/{examId}/start",
            method: "POST",
            description: "Starts a new exam attempt"
          },
          {
            path: "/api/practice-exams/{examId}/submit",
            method: "POST",
            description: "Submits answers and completes an attempt"
          }
        ]
      }
    ]
  },
  {
    name: "Formula Practice",
    route: "/dashboard/student/formula-practice",
    description: "Interactive formula practice and understanding",
    components: [
      {
        name: "FormulaPracticePage",
        description: "Interactive formula practice tools",
        location: "src/components/dashboard/student/formula/FormulaPracticePage.tsx",
        databaseTables: [
          {
            name: "formulas",
            description: "Academic formulas",
            primaryKey: "formula_id",
            fields: [
              { frontendField: "title", databaseColumn: "formula_title", description: "Formula name", type: "string", isRequired: true },
              { frontendField: "subject", databaseColumn: "subject", description: "Subject area", type: "string", isRequired: true },
              { frontendField: "latex", databaseColumn: "latex_notation", description: "LaTeX representation", type: "string", isRequired: true },
              { frontendField: "plainText", databaseColumn: "plain_text_notation", description: "Plain text representation", type: "string", isRequired: true },
              { frontendField: "description", databaseColumn: "description", description: "Formula description", type: "text", isRequired: true },
            ]
          },
          {
            name: "formula_variables",
            description: "Variables used in formulas",
            primaryKey: "variable_id",
            fields: [
              { frontendField: "symbol", databaseColumn: "variable_symbol", description: "Variable symbol", type: "string", isRequired: true },
              { frontendField: "name", databaseColumn: "variable_name", description: "Variable name", type: "string", isRequired: true },
              { frontendField: "description", databaseColumn: "description", description: "Variable description", type: "text", isRequired: false },
              { frontendField: "unit", databaseColumn: "unit", description: "Measurement unit", type: "string", isRequired: false },
            ],
            relationships: [
              {
                table: "formulas",
                type: "many-to-many",
                throughTable: "formula_variable_mappings",
                description: "Many variables used in many formulas"
              }
            ]
          },
          {
            name: "user_formula_mastery",
            description: "User's mastery of formulas",
            primaryKey: "mastery_id",
            fields: [
              { frontendField: "masteryLevel", databaseColumn: "mastery_level", description: "Mastery level (1-5)", type: "integer", isRequired: true },
              { frontendField: "lastPracticed", databaseColumn: "last_practiced_at", description: "Last practice timestamp", type: "datetime", isRequired: false },
              { frontendField: "totalPractices", databaseColumn: "practice_count", description: "Number of practice attempts", type: "integer", isRequired: true },
            ],
            relationships: [
              {
                table: "formulas",
                type: "one-to-one",
                description: "One mastery record per formula per user"
              }
            ]
          }
        ],
        apiEndpoints: [
          {
            path: "/api/formulas",
            method: "GET",
            description: "Fetches available formulas"
          },
          {
            path: "/api/formulas/{formulaId}/practice",
            method: "POST",
            description: "Records a formula practice attempt"
          },
          {
            path: "/api/formulas/recommendations",
            method: "GET",
            description: "Gets formula practice recommendations"
          }
        ]
      }
    ]
  },
  {
    name: "Profile",
    route: "/dashboard/student/profile",
    description: "User profile and settings",
    components: [
      {
        name: "StudentProfile",
        description: "Student profile information and preferences",
        location: "src/components/dashboard/student/profile/StudentProfile.tsx",
        databaseTables: [
          {
            name: "users",
            description: "Core user information",
            primaryKey: "user_id",
            fields: [
              { frontendField: "name", databaseColumn: "full_name", description: "User's full name", type: "string", isRequired: true },
              { frontendField: "email", databaseColumn: "email", description: "Email address", type: "string", isRequired: true },
              { frontendField: "phone", databaseColumn: "phone_number", description: "Phone number", type: "string", isRequired: false },
              { frontendField: "photoURL", databaseColumn: "profile_image_url", description: "Profile picture", type: "string", isRequired: false },
              { frontendField: "role", databaseColumn: "user_role", description: "User role", type: "enum", isRequired: true },
              { frontendField: "dateOfBirth", databaseColumn: "date_of_birth", description: "Date of birth", type: "date", isRequired: false },
            ]
          },
          {
            name: "user_preferences",
            description: "User preference settings",
            primaryKey: "preference_id",
            fields: [
              { frontendField: "theme", databaseColumn: "theme_preference", description: "UI theme preference", type: "enum", isRequired: true },
              { frontendField: "notificationsEnabled", databaseColumn: "notifications_enabled", description: "Notifications toggle", type: "boolean", isRequired: true },
              { frontendField: "studyReminderTime", databaseColumn: "study_reminder_time", description: "Daily reminder time", type: "time", isRequired: false },
              { frontendField: "language", databaseColumn: "language_preference", description: "Interface language", type: "string", isRequired: true },
            ],
            relationships: [
              {
                table: "users",
                type: "one-to-one",
                description: "One preferences record per user"
              }
            ]
          },
          {
            name: "user_study_preferences",
            description: "Study-related preferences",
            primaryKey: "study_pref_id",
            fields: [
              { frontendField: "studyPace", databaseColumn: "preferred_pace", description: "Preferred study pace", type: "enum", isRequired: true },
              { frontendField: "learningStyle", databaseColumn: "learning_style", description: "Learning style preference", type: "enum", isRequired: true },
              { frontendField: "dailyStudyGoal", databaseColumn: "daily_goal_minutes", description: "Daily study goal", type: "integer", isRequired: false },
              { frontendField: "preferredSubjects", databaseColumn: "preferred_subjects", description: "Favorite subjects (JSON)", type: "json", isRequired: false },
            ],
            relationships: [
              {
                table: "users",
                type: "one-to-one",
                description: "One study preferences record per user"
              }
            ]
          }
        ],
        apiEndpoints: [
          {
            path: "/api/user/profile",
            method: "GET",
            description: "Fetches user profile information"
          },
          {
            path: "/api/user/profile",
            method: "PUT",
            description: "Updates user profile information"
          },
          {
            path: "/api/user/preferences",
            method: "GET",
            description: "Fetches user preferences"
          },
          {
            path: "/api/user/preferences",
            method: "PUT",
            description: "Updates user preferences"
          }
        ]
      }
    ]
  },
  {
    name: "Notifications",
    route: "/dashboard/student/notifications",
    description: "User notifications center",
    components: [
      {
        name: "NotificationsView",
        description: "View and manage notifications",
        location: "src/components/dashboard/student/notifications/NotificationsView.tsx",
        databaseTables: [
          {
            name: "notifications",
            description: "User notifications",
            primaryKey: "notification_id",
            fields: [
              { frontendField: "title", databaseColumn: "title", description: "Notification title", type: "string", isRequired: true },
              { frontendField: "message", databaseColumn: "message", description: "Notification message", type: "text", isRequired: true },
              { frontendField: "type", databaseColumn: "notification_type", description: "Notification type", type: "enum", isRequired: true },
              { frontendField: "createdAt", databaseColumn: "created_at", description: "Creation timestamp", type: "datetime", isRequired: true },
              { frontendField: "isRead", databaseColumn: "is_read", description: "Read status", type: "boolean", isRequired: true },
              { frontendField: "actionUrl", databaseColumn: "action_url", description: "Related action URL", type: "string", isRequired: false },
            ],
            relationships: [
              {
                table: "users",
                type: "many-to-one",
                description: "Many notifications belong to one user"
              }
            ]
          },
          {
            name: "notification_preferences",
            description: "User notification preferences",
            primaryKey: "preference_id",
            fields: [
              { frontendField: "emailEnabled", databaseColumn: "email_enabled", description: "Email notifications toggle", type: "boolean", isRequired: true },
              { frontendField: "pushEnabled", databaseColumn: "push_enabled", description: "Push notifications toggle", type: "boolean", isRequired: true },
              { frontendField: "studyReminders", databaseColumn: "study_reminders_enabled", description: "Study reminders toggle", type: "boolean", isRequired: true },
              { frontendField: "examAlerts", databaseColumn: "exam_alerts_enabled", description: "Exam alerts toggle", type: "boolean", isRequired: true },
            ],
            relationships: [
              {
                table: "users",
                type: "one-to-one",
                description: "One notification preferences record per user"
              }
            ]
          }
        ],
        apiEndpoints: [
          {
            path: "/api/notifications",
            method: "GET",
            description: "Fetches user notifications"
          },
          {
            path: "/api/notifications/{notificationId}/read",
            method: "PATCH",
            description: "Marks a notification as read"
          },
          {
            path: "/api/notifications/preferences",
            method: "GET",
            description: "Fetches notification preferences"
          },
          {
            path: "/api/notifications/preferences",
            method: "PUT",
            description: "Updates notification preferences"
          }
        ]
      }
    ]
  }
];

// Function to get the database mapping data
export function getDatabaseMappingData(): PageMapping[] {
  return databaseMapping;
}

// Function to convert the mapping data to Markdown
export function getDatabaseMappingAsMarkdown(): string {
  let markdown = "# PREPZR Database Mapping Documentation\n\n";
  markdown += "This document provides a comprehensive mapping between frontend components and database structures.\n\n";
  
  const mappings = getDatabaseMappingData();
  
  mappings.forEach(page => {
    markdown += `## ${page.name}\n\n`;
    markdown += `**Route:** \`${page.route}\`\n\n`;
    markdown += `**Description:** ${page.description}\n\n`;
    
    page.components.forEach(component => {
      markdown += `### ${component.name}\n\n`;
      markdown += `**Location:** \`${component.location}\`\n\n`;
      markdown += `**Description:** ${component.description}\n\n`;
      
      markdown += "#### Database Tables\n\n";
      component.databaseTables.forEach(table => {
        markdown += `##### ${table.name}\n\n`;
        markdown += `**Description:** ${table.description}\n\n`;
        markdown += `**Primary Key:** \`${table.primaryKey}\`\n\n`;
        
        markdown += "**Fields:**\n\n";
        markdown += "| Frontend Field | Database Column | Type | Required | Description |\n";
        markdown += "|---------------|----------------|------|----------|-------------|\n";
        table.fields.forEach(field => {
          markdown += `| ${field.frontendField} | ${field.databaseColumn} | ${field.type} | ${field.isRequired ? 'Yes' : 'No'} | ${field.description} |\n`;
        });
        markdown += "\n";
        
        if (table.relationships && table.relationships.length > 0) {
          markdown += "**Relationships:**\n\n";
          table.relationships.forEach(rel => {
            markdown += `- **${rel.table}**: ${rel.description} (${rel.type})\n`;
            if (rel.throughTable) {
              markdown += `  - Through table: \`${rel.throughTable}\`\n`;
            }
          });
          markdown += "\n";
        }
      });
      
      markdown += "#### API Endpoints\n\n";
      component.apiEndpoints.forEach(endpoint => {
        markdown += `- \`${endpoint.method} ${endpoint.path}\`: ${endpoint.description}\n`;
        if (endpoint.parameters && endpoint.parameters.length > 0) {
          markdown += "  - Parameters:\n";
          endpoint.parameters.forEach(param => {
            markdown += `    - \`${param.name}\` (${param.type}, ${param.isRequired ? 'required' : 'optional'}): ${param.description}\n`;
          });
        }
      });
      markdown += "\n";
    });
    
    markdown += "---\n\n";
  });
  
  return markdown;
}

// Simple utility to get database tables per page
export function getTablesPerPage(): { pageName: string; tables: string[] }[] {
  return databaseMapping.map(page => ({
    pageName: page.name,
    tables: page.components.flatMap(comp => comp.databaseTables.map(table => table.name))
  }));
}

// Helper function to find a specific page's mapping
export function getPageMapping(pageName: string): PageMapping | undefined {
  return databaseMapping.find(page => page.name.toLowerCase() === pageName.toLowerCase());
}
