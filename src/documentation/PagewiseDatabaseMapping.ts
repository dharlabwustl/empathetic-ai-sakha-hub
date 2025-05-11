
/**
 * PAGEWISE DATABASE MAPPING
 * 
 * This document maps each page in the application to its corresponding
 * database tables and API endpoints. Use this as a reference for
 * frontend-backend integration.
 */

const pagewiseDatabaseMapping = `
# PREPZR Pagewise Database Mapping Guide

## Overview

This comprehensive guide maps each page in the PREPZR application to its corresponding database tables, 
API endpoints, and implementation details. It serves as the primary reference for frontend developers 
to understand how to connect UI components with backend services.

## Dashboard Page

### Components & Database Mappings

| Component | Database Table | API Endpoint | Data Fields |
|-----------|--------------|-------------|-------------|
| Profile Summary | users, user_demographics | \`/students/:studentId/profile\` | name, email, role, avatar, enrollmentDate |
| Study Progress | study_sessions, user_progress | \`/students/:studentId/statistics\` | completedSessions, totalStudyTime, streakDays |
| Mood Tracker | user_moods | \`/students/:studentId/mood-logs\` | currentMood, moodTimestamp, moodHistory |
| Today's Plan | daily_plans, study_sessions | \`/students/:studentId/daily-plan\` | todaysTasks, scheduledBreaks, priorities |
| Subject Breakdown | user_subjects, subject_progress | \`/students/:studentId/subjects\` | subjectList, proficiency, weakAreas |
| Upcoming Exams | exams, exam_registrations | \`/students/:studentId/exams\` | examDate, examName, preparednessScore |

### Implementation Example

\`\`\`typescript
// Dashboard.tsx
import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/services/api/apiConfig';

const DashboardOverview = ({ userProfile }) => {
  // Fetch user statistics
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['userStats', userProfile.id],
    queryFn: async () => {
      const response = await fetch(
        \`\${API_BASE_URL}\${API_ENDPOINTS.STUDENTS.STATISTICS(userProfile.id)}\`, 
        {
          headers: { Authorization: \`Bearer \${authToken}\` }
        }
      );
      return response.json();
    },
    enabled: !!userProfile?.id
  });

  // Fetch today's study plan
  const { data: todaysPlan, isLoading: planLoading } = useQuery({
    queryKey: ['todaysPlan', userProfile.id],
    queryFn: async () => {
      const response = await fetch(
        \`\${API_BASE_URL}\${API_ENDPOINTS.STUDENTS.DAILY_PLAN(userProfile.id)}\`,
        {
          headers: { Authorization: \`Bearer \${authToken}\` }
        }
      );
      return response.json();
    },
    enabled: !!userProfile?.id
  });

  // Render components with the fetched data
}
\`\`\`

## Today's Plan Page

### Components & Database Mappings

| Component | Database Table | API Endpoint | Data Fields |
|-----------|--------------|-------------|-------------|
| Daily Schedule | daily_plans, time_blocks | \`/students/:studentId/daily-plan\` | timeSlots, activities, duration |
| Subject Tasks | subject_tasks, task_priorities | \`/students/:studentId/tasks\` | taskId, subjectId, priority, isCompleted |
| Smart Extras | recommended_content | \`/students/:studentId/recommendations\` | contentType, contentId, reasonForRecommendation |
| Study History | study_sessions | \`/students/:studentId/study-sessions\` | date, duration, subject, completion |
| Task Backlog | backlog_tasks | \`/students/:studentId/backlog\` | taskId, addedDate, priority, isDue |

### Implementation Example

\`\`\`typescript
// TodaysPlanView.tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/services/api/apiConfig';

const TodaysPlanView = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Fetch today's plan data
  const { data: planData, isLoading } = useQuery({
    queryKey: ['dailyPlan', user.id],
    queryFn: async () => {
      const response = await fetch(
        \`\${API_BASE_URL}\${API_ENDPOINTS.STUDENTS.DAILY_PLAN(user.id)}\`,
        {
          headers: { Authorization: \`Bearer \${user.token}\` }
        }
      );
      return response.json();
    },
    enabled: !!user?.id
  });

  // Mark task as completed
  const completeMutation = useMutation({
    mutationFn: async (taskId) => {
      await fetch(
        \`\${API_BASE_URL}/students/\${user.id}/tasks/\${taskId}/complete\`,
        {
          method: 'PATCH',
          headers: { 
            'Content-Type': 'application/json',
            Authorization: \`Bearer \${user.token}\`
          }
        }
      );
    },
    onSuccess: () => {
      // Invalidate and refetch queries that may change due to this update
      queryClient.invalidateQueries({ queryKey: ['dailyPlan'] });
      queryClient.invalidateQueries({ queryKey: ['userStats'] });
    }
  });
  
  // Component implementation with the fetched data
}
\`\`\`

## Concepts Page

### Components & Database Mappings

| Component | Database Table | API Endpoint | Data Fields |
|-----------|--------------|-------------|-------------|
| Concept List | concepts, concept_categories | \`/content/concepts\` | id, title, description, category, difficulty |
| Subject Filter | subjects | \`/content/subjects\` | subjectId, subjectName |
| Concept Details | concept_details, concept_resources | \`/content/concepts/:conceptId\` | fullDescription, examples, diagrams, videos |
| Formula Lab | concept_formulas | \`/content/concepts/:conceptId/formulas\` | formulaId, latex, variables, applications |
| Concept Progress | user_concept_progress | \`/students/:studentId/concepts/:conceptId/progress\` | completionPercentage, lastAccessed, masteryLevel |

### Implementation Example

\`\`\`typescript
// ConceptsView.tsx
import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/services/api/apiConfig';

const ConceptsView = () => {
  const { user } = useAuth();
  const [selectedSubject, setSelectedSubject] = useState(null);

  // Fetch subjects for filtering
  const { data: subjects } = useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const response = await fetch(
        \`\${API_BASE_URL}\${API_ENDPOINTS.CONTENT.SUBJECTS}\`,
        {
          headers: { Authorization: \`Bearer \${user.token}\` }
        }
      );
      return response.json();
    }
  });

  // Fetch concepts filtered by subject
  const { data: concepts, isLoading } = useQuery({
    queryKey: ['concepts', selectedSubject],
    queryFn: async () => {
      const url = selectedSubject 
        ? \`\${API_BASE_URL}\${API_ENDPOINTS.CONTENT.CONCEPTS}?subject=\${selectedSubject}\` 
        : \`\${API_BASE_URL}\${API_ENDPOINTS.CONTENT.CONCEPTS}\`;
        
      const response = await fetch(url, {
        headers: { Authorization: \`Bearer \${user.token}\` }
      });
      return response.json();
    }
  });
  
  // Component implementation with the fetched data
}
\`\`\`

## Flashcards Page

### Components & Database Mappings

| Component | Database Table | API Endpoint | Data Fields |
|-----------|--------------|-------------|-------------|
| Flashcard Decks | flashcard_decks | \`/content/flashcards/decks\` | deckId, deckName, cardCount, subject |
| Deck Details | flashcard_decks, flashcard_stats | \`/content/flashcards/decks/:deckId\` | description, difficulty, totalCards |
| Flashcard Cards | flashcards | \`/content/flashcards/decks/:deckId/cards\` | cardId, front, back, hints |
| User Progress | user_flashcard_progress | \`/students/:studentId/flashcards/stats\` | masteredCards, needReview, lastPracticed |
| Learning Algorithm | spaced_repetition_data | \`/students/:studentId/flashcards/:cardId/progress\` | confidenceLevel, nextReviewDate, repetitionData |

### Implementation Example

\`\`\`typescript
// FlashcardsView.tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/services/api/apiConfig';

const FlashcardsView = () => {
  const { user } = useAuth();
  const [selectedDeck, setSelectedDeck] = useState(null);
  const queryClient = useQueryClient();

  // Fetch flashcard decks
  const { data: decks, isLoading: decksLoading } = useQuery({
    queryKey: ['flashcardDecks'],
    queryFn: async () => {
      const response = await fetch(
        \`\${API_BASE_URL}\${API_ENDPOINTS.CONTENT.FLASHCARD_DECKS.LIST}\`,
        {
          headers: { Authorization: \`Bearer \${user.token}\` }
        }
      );
      return response.json();
    }
  });

  // Fetch cards for selected deck
  const { data: cards, isLoading: cardsLoading } = useQuery({
    queryKey: ['flashcardCards', selectedDeck],
    queryFn: async () => {
      if (!selectedDeck) return [];
      
      const response = await fetch(
        \`\${API_BASE_URL}\${API_ENDPOINTS.CONTENT.FLASHCARD_DECKS.CARDS(selectedDeck)}\`,
        {
          headers: { Authorization: \`Bearer \${user.token}\` }
        }
      );
      return response.json();
    },
    enabled: !!selectedDeck
  });

  // Record flashcard review result
  const reviewMutation = useMutation({
    mutationFn: async ({ cardId, confidenceLevel }) => {
      await fetch(
        \`\${API_BASE_URL}/students/\${user.id}/flashcards/\${cardId}/review\`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: \`Bearer \${user.token}\`
          },
          body: JSON.stringify({ confidenceLevel })
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flashcardProgress'] });
    }
  });
  
  // Component implementation with the fetched data
}
\`\`\`

## Practice Exam Page

### Components & Database Mappings

| Component | Database Table | API Endpoint | Data Fields |
|-----------|--------------|-------------|-------------|
| Exam List | practice_exams | \`/content/exams\` | examId, title, duration, questionCount, difficulty |
| Exam Questions | exam_questions | \`/content/exams/:examId/questions\` | questionId, content, options, correctAnswer |
| User Exam Results | user_exam_results | \`/students/:studentId/exams/:examId/results\` | score, timeTaken, answeredCorrectly, weakAreas |
| Performance Analysis | exam_performance_analytics | \`/students/:studentId/exams/stats\` | averageScore, improvementRate, comparisonToAverage |
| Time Management | exam_time_tracking | \`/students/:studentId/exams/:examId/time-tracking\` | timePerQuestion, overallPace, optimalTimeUsage |

### Implementation Example

\`\`\`typescript
// PracticeExamsView.tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/services/api/apiConfig';

const PracticeExamsView = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Fetch available practice exams
  const { data: exams, isLoading } = useQuery({
    queryKey: ['practiceExams'],
    queryFn: async () => {
      const response = await fetch(
        \`\${API_BASE_URL}\${API_ENDPOINTS.CONTENT.EXAMS}\`,
        {
          headers: { Authorization: \`Bearer \${user.token}\` }
        }
      );
      return response.json();
    }
  });

  // Start exam session
  const startExamMutation = useMutation({
    mutationFn: async (examId) => {
      const response = await fetch(
        \`\${API_BASE_URL}\${API_ENDPOINTS.STUDENTS.EXAMS.START(user.id, examId)}\`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: \`Bearer \${user.token}\`
          }
        }
      );
      return response.json();
    },
    onSuccess: (data) => {
      // Navigate to exam taking page with session data
      navigate(\`/dashboard/student/practice-exam/\${data.examId}/start\`, { 
        state: { sessionId: data.sessionId } 
      });
    }
  });
  
  // Component implementation with the fetched data
}
\`\`\`

## Academic Advisor Page

### Components & Database Mappings

| Component | Database Table | API Endpoint | Data Fields |
|-----------|--------------|-------------|-------------|
| Study Plans | study_plans | \`/students/:studentId/study-plans\` | planId, name, duration, startDate, endDate |
| Plan Details | study_plan_details, study_plan_subjects | \`/students/:studentId/study-plans/:planId\` | dailyHours, focusAreas, milestones |
| Plan Progress | study_plan_progress | \`/students/:studentId/study-plans/:planId/progress\` | completedDays, adherenceRate, nextMilestone |
| AI Recommendations | ai_study_recommendations | \`/ai/study-recommendations/:studentId\` | recommendationType, content, confidenceScore |
| Weekly Schedule | weekly_schedule | \`/students/:studentId/study-plans/:planId/schedule\` | dayOfWeek, timeSlots, subjectAllocation |

### Implementation Example

\`\`\`typescript
// AcademicAdvisorView.tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/services/api/apiConfig';

const AcademicAdvisorView = ({ userProfile }) => {
  const queryClient = useQueryClient();
  
  // Fetch user's study plans
  const { data: studyPlans, isLoading } = useQuery({
    queryKey: ['studyPlans', userProfile.id],
    queryFn: async () => {
      const response = await fetch(
        \`\${API_BASE_URL}\${API_ENDPOINTS.STUDENTS.STUDY_PLANS(userProfile.id)}\`,
        {
          headers: { Authorization: \`Bearer \${authToken}\` }
        }
      );
      return response.json();
    },
    enabled: !!userProfile?.id
  });

  // Create new study plan
  const createPlanMutation = useMutation({
    mutationFn: async (planData) => {
      const response = await fetch(
        \`\${API_BASE_URL}\${API_ENDPOINTS.STUDENTS.STUDY_PLANS(userProfile.id)}\`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: \`Bearer \${authToken}\`
          },
          body: JSON.stringify(planData)
        }
      );
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studyPlans'] });
    }
  });
  
  // Fetch AI-generated study recommendations
  const { data: recommendations } = useQuery({
    queryKey: ['aiRecommendations', userProfile.id],
    queryFn: async () => {
      const response = await fetch(
        \`\${API_BASE_URL}\${API_ENDPOINTS.AI.GENERATE_PLAN}\`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: \`Bearer \${authToken}\`
          },
          body: JSON.stringify({ userId: userProfile.id })
        }
      );
      return response.json();
    },
    enabled: !!userProfile?.id
  });
  
  // Component implementation with the fetched data
}
\`\`\`

## Feel Good Corner Page

### Components & Database Mappings

| Component | Database Table | API Endpoint | Data Fields |
|-----------|--------------|-------------|-------------|
| Mood Analyzer | user_moods, mood_history | \`/students/:studentId/mood-logs\` | currentMood, moodTimestamp, moodTrends |
| Daily Affirmations | affirmations | \`/content/feel-good/affirmations\` | affirmationText, category, impactScore |
| Motivational Content | motivational_content | \`/content/feel-good/motivational\` | contentType, content, suitableFor |
| Stress Relief Activities | stress_relief_activities | \`/content/feel-good/activities\` | activityName, duration, benefits |
| Personalized Suggestions | ai_mood_suggestions | \`/ai/mood-suggestions\` | suggestion, reasonForSuggestion, expectedImpact |

### Implementation Example

\`\`\`typescript
// FeelGoodCornerView.tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/services/api/apiConfig';

const FeelGoodCornerView = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  // Fetch current mood and history
  const { data: moodData, isLoading: moodLoading } = useQuery({
    queryKey: ['moodData', user.id],
    queryFn: async () => {
      const response = await fetch(
        \`\${API_BASE_URL}\${API_ENDPOINTS.STUDENTS.MOOD_LOGS(user.id)}\`,
        {
          headers: { Authorization: \`Bearer \${user.token}\` }
        }
      );
      return response.json();
    }
  });

  // Log a new mood entry
  const logMoodMutation = useMutation({
    mutationFn: async (moodData) => {
      await fetch(
        \`\${API_BASE_URL}\${API_ENDPOINTS.STUDENTS.MOOD_LOGS(user.id)}\`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: \`Bearer \${user.token}\`
          },
          body: JSON.stringify(moodData)
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moodData'] });
    }
  });

  // Get personalized mood-based suggestions
  const { data: suggestions } = useQuery({
    queryKey: ['moodSuggestions', user.id, moodData?.currentMood],
    queryFn: async () => {
      if (!moodData?.currentMood) return [];
      
      const response = await fetch(
        \`\${API_BASE_URL}\${API_ENDPOINTS.AI.MOOD_SUGGESTIONS}\`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: \`Bearer \${user.token}\`
          },
          body: JSON.stringify({ 
            userId: user.id,
            currentMood: moodData.currentMood
          })
        }
      );
      return response.json();
    },
    enabled: !!moodData?.currentMood
  });
  
  // Component implementation with the fetched data
}
\`\`\`

## General Implementation Guidelines

### Authentication & Global User Context

All API requests should include authentication headers using the token from AuthContext:

\`\`\`typescript
const { user, isAuthenticated } = useAuth();

const fetchData = async () => {
  if (!isAuthenticated) {
    return;
  }
  
  const response = await fetch(endpoint, {
    headers: {
      Authorization: \`Bearer \${user.token}\`
    }
  });
  // Process response...
};
\`\`\`

### Error Handling Strategy

Implement consistent error handling across all API requests:

\`\`\`typescript
const fetchData = async () => {
  setLoading(true);
  try {
    const data = await apiService.getData(user.id, user.token);
    setData(data);
  } catch (error) {
    if (error.response?.status === 401) {
      // Handle authentication error
      logout();
      navigate('/login');
    } else {
      // Handle other errors
      toast({
        title: "Error fetching data",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    }
  } finally {
    setLoading(false);
  }
};
\`\`\`

### Data Models

Core data models that appear across multiple pages:

\`\`\`typescript
// User Profile Model
interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  enrollmentDate: string;
  examGoal: string;
  avatar?: string;
}

// Study Plan Model
interface StudyPlan {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  dailyHours: number;
  subjects: Array<{
    subjectId: string;
    name: string;
    hoursPerWeek: number;
    priority: number;
  }>;
  userId: string;
}

// Concept Model
interface Concept {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  prerequisites?: string[];
  resources?: Resource[];
}

// Flashcard Model
interface Flashcard {
  id: string;
  deckId: string;
  front: string;
  back: string;
  hints?: string[];
  tags?: string[];
  difficulty: number;
}
\`\`\`
`;

export default pagewiseDatabaseMapping;
