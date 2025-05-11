
/**
 * PAGE-BY-PAGE DATABASE MAPPING
 * 
 * This document provides a comprehensive mapping between frontend pages,
 * their components, and the corresponding database tables/API endpoints.
 */

const pagewiseDatabaseMapping = `
# PREPZR Application - Page-by-Page Database & API Integration Guide

## Overview

This document provides a comprehensive mapping between frontend pages, their components, required data fields, and corresponding backend API endpoints. It serves as a reference guide for both frontend and backend developers to ensure proper integration.

## Table of Contents

1. [Authentication Pages](#authentication-pages)
2. [Student Dashboard](#student-dashboard)
3. [Today's Plan Page](#todays-plan-page)
4. [Concept Cards Page](#concept-cards-page)
5. [Flashcards Page](#flashcards-page)
6. [Practice Exams Page](#practice-exams-page)
7. [Academic Advisor Page](#academic-advisor-page)
8. [Feel Good Corner Page](#feel-good-corner-page)
9. [Admin Dashboard Pages](#admin-dashboard-pages)

---

## Authentication Pages

### Login Page

| Component | Data Fields | Database Table | API Endpoint | Notes |
|-----------|------------|----------------|-------------|-------|
| LoginForm | email/phone, password | users | POST /api/auth/login | Returns JWT token |
| MobileVerification | mobile, OTP | auth_verifications | POST /api/auth/verify | For OTP verification |
| RememberMe | - | user_sessions | - | Stores in localStorage |
| ForgotPassword | email | - | POST /api/auth/reset-password | Sends reset email |

**API Response Structure:**
\`\`\`json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "User Name",
      "email": "user@email.com",
      "role": "student",
      "completedOnboarding": true
    }
  }
}
\`\`\`

**Implementation Notes:**
- Store JWT token in localStorage
- Redirect based on user role (student/admin)
- Check completedOnboarding flag to show onboarding if needed

### Signup Multi-Step Flow

#### Step 1: User Role Selection

| Component | Data Fields | Database Table | Database Column | Data Type |
|-----------|------------|----------------|-----------------|-----------|
| RoleSelector | role | users | role | enum |

#### Step 2-9: Onboarding Steps (as detailed in SignupDatabaseMapping)

**API Implementation:**
- Collect all data through the onboarding steps using OnboardingContext
- Submit complete data only on final step to POST /api/auth/register
- Backend will distribute data to appropriate tables

---

## Student Dashboard

### Overview Page

| Component | Data Fields | Database Table | API Endpoint | Notes |
|-----------|------------|----------------|-------------|-------|
| DashboardHeader | name, avatar, role | users | GET /api/students/{id}/profile | Basic user info |
| KPI Cards | streakDays, conceptsMastered, etc. | user_statistics | GET /api/students/{id}/statistics | Key performance indicators |
| QuickAccess | - | user_preferences | GET /api/students/{id}/preferences | Recent/favorite pages |
| MoodTracker | currentMood | user_moods | GET/POST /api/students/{id}/mood-logs | Record current mood |
| ReturnUserRecap | lastActivity, loginCount | user_activity_logs | GET /api/students/{id}/activity | Shows recent activity |
| InfluencesMeter | environment, surroundings | study_environments | GET /api/students/{id}/study-habits | Study environment details |

**API Implementation:**
\`\`\`typescript
// Inside hooks/useStudentDashboard.ts
const fetchDashboardData = async () => {
  if (!user) return;
  
  try {
    // Parallel API requests
    const [profileRes, statsRes, preferencesRes, moodRes] = await Promise.all([
      fetch(`${API_BASE_URL}/students/${user.id}/profile`, {
        headers: { Authorization: `Bearer ${user.token}` }
      }),
      fetch(`${API_BASE_URL}/students/${user.id}/statistics`, {
        headers: { Authorization: `Bearer ${user.token}` }
      }),
      fetch(`${API_BASE_URL}/students/${user.id}/preferences`, {
        headers: { Authorization: `Bearer ${user.token}` }
      }),
      fetch(`${API_BASE_URL}/students/${user.id}/mood-logs?latest=true`, {
        headers: { Authorization: `Bearer ${user.token}` }
      })
    ]);
    
    const [profile, stats, preferences, mood] = await Promise.all([
      profileRes.json(),
      statsRes.json(),
      preferencesRes.json(),
      moodRes.json()
    ]);
    
    // Update state with received data
    setUserProfile(profile);
    setKpis(mapApiDataToKpis(stats));
    setQuickAccessItems(preferences.quickAccess || []);
    setCurrentMood(mood.latestMood || null);
    
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    toast({
      title: "Error loading dashboard",
      description: "Please try refreshing the page",
      variant: "destructive"
    });
  }
};
\`\`\`

### Dashboard Components Breakdown:

#### KPI Cards
| KPI | Data Source | Calculation | API Endpoint |
|-----|------------|-------------|-------------|
| Study Streak | user_study_sessions | Count consecutive days | GET /api/students/{id}/study-habits/streak |
| Concepts Mastered | user_concept_progress | Count concepts with mastery >= 80% | GET /api/students/{id}/concepts?mastery=true |
| Time Saved | user_study_metrics | AI calculated time savings | GET /api/students/{id}/metrics/time-saved |
| Mood Improvement | user_moods | Compare mood trends | GET /api/students/{id}/mood-logs/trends |

#### Mood Tracker
| Feature | Data Fields | API Endpoint | Implementation |
|---------|------------|-------------|----------------|
| Current Mood | mood, timestamp | POST /api/students/{id}/mood-logs | Updates current mood |
| Mood History | mood[], timestamps[] | GET /api/students/{id}/mood-logs/history | For mood timeline |
| AI Suggestions | moodTrend, suggestions | GET /api/ai/mood-suggestions | Based on mood patterns |

---

## Today's Plan Page

| Component | Data Fields | Database Table | API Endpoint | Notes |
|-----------|------------|----------------|-------------|-------|
| DailyOverview | totalTasks, completedTasks | daily_plans | GET /api/students/{id}/daily-plan | Summary stats |
| ConceptsList | concepts[] | daily_plan_items | GET /api/students/{id}/daily-plan/concepts | Concepts for today |
| FlashcardsList | flashcards[] | daily_plan_items | GET /api/students/{id}/daily-plan/flashcards | Flashcards for today |
| PracticeExamsList | exams[] | daily_plan_items | GET /api/students/{id}/daily-plan/exams | Practice exams for today |
| TimelineView | timelineItems[] | daily_plan_items | GET /api/students/{id}/daily-plan/timeline | Time-based view |
| SubjectBreakdown | subjects{} | daily_plan_items | GET /api/students/{id}/daily-plan/subjects | Subject-wise breakdown |

**Data Model:**
\`\`\`typescript
interface TodaysPlanData {
  id: string;
  date: string; // ISO date
  streak: number;
  completedTasks: number;
  totalTasks: number;
  timeAllocation: {
    concepts: number; // minutes
    flashcards: number;
    practiceExams: number;
    revision: number;
    total: number;
  };
  concepts: Array<{
    id: string;
    title: string;
    subject: string;
    topic: string;
    duration: number; // minutes
    status: 'pending' | 'completed' | 'skipped';
    difficulty: 'Easy' | 'Medium' | 'Hard';
  }>;
  flashcards: Array<{
    id: string;
    title: string;
    subject: string;
    duration: number;
    status: 'pending' | 'completed' | 'skipped';
    cardCount: number;
  }>;
  practiceExams: Array<{
    id: string;
    title: string;
    subject: string;
    duration: number;
    status: 'pending' | 'completed' | 'skipped';
    questionCount: number;
  }>;
  // More fields...
}
\`\`\`

**API Implementation:**
\`\`\`typescript
// Inside hooks/useTodaysPlan.ts
const fetchTodaysPlan = async () => {
  if (!user) return;
  
  setLoading(true);
  try {
    const response = await fetch(
      `${API_BASE_URL}/students/${user.id}/daily-plan`,
      {
        headers: { Authorization: `Bearer ${user.token}` }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch today\'s plan');
    }
    
    const data = await response.json();
    setPlanData(data);
  } catch (error) {
    setError(error.message);
    toast({
      title: "Error loading today's plan",
      description: error.message,
      variant: "destructive"
    });
  } finally {
    setLoading(false);
  }
};

// Mark task as completed
const markTaskCompleted = async (id: string, type: 'concept' | 'flashcard' | 'practice-exam') => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/students/${user.id}/daily-plan/items/${id}/complete`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ type })
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to update task status');
    }
    
    // Update local state to reflect the change
    // ...
    
    toast({
      title: "Task completed",
      description: "Your progress has been updated"
    });
  } catch (error) {
    toast({
      title: "Error updating task",
      description: error.message,
      variant: "destructive"
    });
  }
};
\`\`\`

---

## Concept Cards Page

| Component | Data Fields | Database Table | API Endpoint | Notes |
|-----------|------------|----------------|-------------|-------|
| ConceptsOverview | conceptStats | user_concept_stats | GET /api/students/{id}/concepts/stats | Summary statistics |
| ConceptsList | concepts[] | concepts, user_concept_progress | GET /api/students/{id}/concepts | List of all concepts |
| ConceptFilters | subjects[], topics[] | subjects, topics | GET /api/content/subjects, GET /api/content/topics | Filter options |
| ConceptCard | concept{} | concepts | GET /api/concepts/{id} | Single concept details |
| ConceptProgress | masteryLevel, lastPracticed | user_concept_progress | GET/POST /api/students/{id}/concepts/{conceptId}/progress | Track learning progress |

**Data Model:**
\`\`\`typescript
interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  topic: string;
  completed: boolean;
  masteryLevel: number; // 0-100
  lastPracticed?: string; // ISO date
  timeSuggestion: number; // minutes
  flashcardsTotal: number;
  flashcardsCompleted: number;
  examReady: boolean;
  bookmarked?: boolean;
  content?: {
    explanation: string;
    examples: string[];
    keyPoints: string[];
    relatedConcepts: string[];
  };
}
\`\`\`

**API Implementation:**
\`\`\`typescript
// Inside hooks/useConceptCards.ts
const fetchConcepts = async (filters?: ConceptFilters) => {
  if (!user) return;
  
  setLoading(true);
  try {
    let url = `${API_BASE_URL}/students/${user.id}/concepts`;
    
    // Add query params for filters
    if (filters) {
      const params = new URLSearchParams();
      if (filters.subject) params.append('subject', filters.subject);
      if (filters.topic) params.append('topic', filters.topic);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      if (filters.status) params.append('status', filters.status);
      
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch concepts');
    }
    
    const data = await response.json();
    setConcepts(data);
  } catch (error) {
    setError(error.message);
    toast({
      title: "Error loading concepts",
      description: error.message,
      variant: "destructive"
    });
  } finally {
    setLoading(false);
  }
};

// Update concept progress
const updateConceptProgress = async (conceptId: string, progress: { masteryLevel?: number; completed?: boolean }) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/students/${user.id}/concepts/${conceptId}/progress`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(progress)
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to update concept progress');
    }
    
    // Update local state
    // ...
    
    toast({
      title: "Progress saved",
      description: "Your concept mastery has been updated"
    });
  } catch (error) {
    toast({
      title: "Error updating progress",
      description: error.message,
      variant: "destructive"
    });
  }
};
\`\`\`

---

## Flashcards Page

| Component | Data Fields | Database Table | API Endpoint | Notes |
|-----------|------------|----------------|-------------|-------|
| FlashcardsOverview | flashcardStats | user_flashcard_stats | GET /api/students/{id}/flashcards/stats | Summary statistics |
| FlashcardDecks | decks[] | flashcard_decks, user_flashcard_progress | GET /api/students/{id}/flashcards/decks | List of flashcard decks |
| FlashcardPractice | cards[] | flashcards | GET /api/flashcards/decks/{id}/cards | Cards in a deck |
| FlashcardProgress | retention, lastPracticed | user_flashcard_progress | POST /api/students/{id}/flashcards/{cardId}/progress | Track card progress |

**Data Model:**
\`\`\`typescript
interface FlashcardDeck {
  id: string;
  title: string;
  subject: string;
  topic: string;
  cardCount: number;
  completedCount: number;
  retention: number; // 0-100
  lastPracticed?: string; // ISO date
  dueCards: number;
}

interface Flashcard {
  id: string;
  deckId: string;
  front: string;
  back: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  retention: number; // 0-100
  lastPracticed?: string;
  nextReviewDate?: string;
}
\`\`\`

**API Implementation:**
\`\`\`typescript
// Inside hooks/useFlashcards.ts
const fetchFlashcardDecks = async () => {
  if (!user) return;
  
  setLoading(true);
  try {
    const response = await fetch(
      `${API_BASE_URL}/students/${user.id}/flashcards/decks`,
      {
        headers: { Authorization: `Bearer ${user.token}` }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch flashcard decks');
    }
    
    const data = await response.json();
    setDecks(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

// Fetch cards for a specific deck
const fetchDeckCards = async (deckId: string) => {
  if (!user) return;
  
  setLoading(true);
  try {
    const response = await fetch(
      `${API_BASE_URL}/flashcards/decks/${deckId}/cards`,
      {
        headers: { Authorization: `Bearer ${user.token}` }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch flashcards');
    }
    
    const data = await response.json();
    setCards(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

// Update flashcard progress after review
const updateCardProgress = async (cardId: string, result: 'correct' | 'incorrect' | 'skipped') => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/students/${user.id}/flashcards/${cardId}/progress`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ result })
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to update flashcard progress');
    }
  } catch (error) {
    toast({
      title: "Error updating progress",
      description: error.message,
      variant: "destructive"
    });
  }
};
\`\`\`

---

## Practice Exams Page

| Component | Data Fields | Database Table | API Endpoint | Notes |
|-----------|------------|----------------|-------------|-------|
| ExamsOverview | examStats | user_exam_stats | GET /api/students/{id}/exams/stats | Summary statistics |
| ExamsList | exams[] | practice_exams, user_exam_progress | GET /api/students/{id}/exams | List of available exams |
| ExamDetails | exam{} | practice_exams | GET /api/exams/{id} | Single exam details |
| ExamQuestions | questions[] | exam_questions | GET /api/exams/{id}/questions | Questions for an exam |
| ExamResults | results{} | user_exam_results | POST /api/students/{id}/exams/{examId}/results | Submit exam results |

**Data Model:**
\`\`\`typescript
interface PracticeExam {
  id: string;
  title: string;
  subject: string;
  topic?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  questionCount: number;
  timeLimit: number; // minutes
  description: string;
  status: 'not-started' | 'in-progress' | 'completed';
  score?: number;
  completedDate?: string;
}

interface ExamQuestion {
  id: string;
  examId: string;
  text: string;
  options: Array<{
    id: string;
    text: string;
  }>;
  correctOptionId: string;
  explanation?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  marks: number;
}
\`\`\`

**API Implementation:**
\`\`\`typescript
// Inside hooks/usePracticeExams.ts
const fetchExams = async (filters?: ExamFilters) => {
  if (!user) return;
  
  setLoading(true);
  try {
    let url = `${API_BASE_URL}/students/${user.id}/exams`;
    
    // Add query params for filters
    if (filters) {
      const params = new URLSearchParams();
      if (filters.subject) params.append('subject', filters.subject);
      if (filters.difficulty) params.append('difficulty', filters.difficulty);
      if (filters.status) params.append('status', filters.status);
      
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch exams');
    }
    
    const data = await response.json();
    setExams(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

// Start an exam
const startExam = async (examId: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/students/${user.id}/exams/${examId}/start`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to start exam');
    }
    
    // Fetch questions now that exam is started
    fetchExamQuestions(examId);
  } catch (error) {
    toast({
      title: "Error starting exam",
      description: error.message,
      variant: "destructive"
    });
  }
};

// Submit exam results
const submitExam = async (examId: string, answers: Record<string, string>) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/students/${user.id}/exams/${examId}/submit`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({ answers })
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to submit exam');
    }
    
    const results = await response.json();
    setExamResults(results);
    
    toast({
      title: "Exam submitted",
      description: \`Your score: \${results.score}%\`
    });
    
    return results;
  } catch (error) {
    toast({
      title: "Error submitting exam",
      description: error.message,
      variant: "destructive"
    });
    return null;
  }
};
\`\`\`

---

## Academic Advisor Page

| Component | Data Fields | Database Table | API Endpoint | Notes |
|-----------|------------|----------------|-------------|-------|
| StudyPlanOverview | studyPlanStats | study_plans, user_study_stats | GET /api/students/{id}/study-plan/stats | Summary statistics |
| StudyPlanList | plans[] | study_plans | GET /api/students/{id}/study-plans | List of study plans |
| StudyPlanDetails | plan{} | study_plans, study_plan_items | GET /api/study-plans/{id} | Single plan details |
| StudyPlanCreator | - | - | POST /api/students/{id}/study-plans | Create a new plan |
| AIPlanGeneration | preferences{} | user_preferences | POST /api/ai/generate-plan | Generate AI plan |

**Data Model:**
\`\`\`typescript
interface StudyPlan {
  id: string;
  title: string;
  examGoal: string;
  examDate: string; // ISO date
  status: 'active' | 'completed' | 'pending';
  progress: number; // 0-100
  subjects: Array<{
    id: string;
    name: string;
    difficulty: 'easy' | 'medium' | 'hard';
    completed: boolean;
    status: 'not-started' | 'in-progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    proficiency: 'weak' | 'medium' | 'strong';
    hoursPerWeek: number;
  }>;
  studyHoursPerDay: number;
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  learningPace: 'slow' | 'moderate' | 'fast';
  createdAt: string; // ISO date
}
\`\`\`

**API Implementation:**
\`\`\`typescript
// Inside hooks/useAcademicPlans.ts
const fetchStudyPlans = async () => {
  if (!user) return;
  
  setLoading(true);
  try {
    const response = await fetch(
      `${API_BASE_URL}/students/${user.id}/study-plans`,
      {
        headers: { Authorization: `Bearer ${user.token}` }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch study plans');
    }
    
    const data = await response.json();
    setStudyPlans(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

// Generate AI study plan
const generateAIPlan = async (preferences: StudyPlanPreferences) => {
  setGenerating(true);
  try {
    const response = await fetch(
      `${API_BASE_URL}/ai/generate-plan`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          userId: user.id,
          examGoal: preferences.examGoal,
          examDate: preferences.examDate,
          studyHoursPerDay: preferences.studyHoursPerDay,
          preferredStudyTime: preferences.preferredStudyTime,
          subjects: preferences.subjects
        })
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to generate study plan');
    }
    
    const plan = await response.json();
    
    // Create the plan in the database
    const createResponse = await fetch(
      `${API_BASE_URL}/students/${user.id}/study-plans`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify(plan)
      }
    );
    
    if (!createResponse.ok) {
      throw new Error('Failed to save generated plan');
    }
    
    const savedPlan = await createResponse.json();
    
    toast({
      title: "Study plan created",
      description: "Your personalized study plan is ready"
    });
    
    return savedPlan;
  } catch (error) {
    toast({
      title: "Error generating plan",
      description: error.message,
      variant: "destructive"
    });
    return null;
  } finally {
    setGenerating(false);
  }
};
\`\`\`

---

## Feel Good Corner Page

| Component | Data Fields | Database Table | API Endpoint | Notes |
|-----------|------------|----------------|-------------|-------|
| MoodCheck | mood | user_moods | GET/POST /api/students/{id}/mood-logs | Record mood |
| MotivationalContent | content[] | feel_good_content | GET /api/content/feel-good | Inspirational content |
| MeditationExercises | exercises[] | feel_good_exercises | GET /api/content/feel-good/exercises | Meditation guides |
| StudyTips | tips[] | study_tips | GET /api/content/study-tips | Productivity tips |
| BreakTimer | - | user_break_logs | POST /api/students/{id}/breaks | Log break time |

**Data Model:**
\`\`\`typescript
interface FeelGoodContent {
  id: string;
  title: string;
  type: 'quote' | 'story' | 'tip' | 'exercise';
  content: string;
  author?: string;
  imageUrl?: string;
  tags: string[];
}

interface MeditationExercise {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  audioUrl?: string;
  steps: string[];
  benefits: string[];
}
\`\`\`

**API Implementation:**
\`\`\`typescript
// Inside hooks/useFeelGoodCorner.ts
const fetchContent = async (contentType?: string, mood?: string) => {
  if (!user) return;
  
  setLoading(true);
  try {
    let url = `${API_BASE_URL}/content/feel-good`;
    
    const params = new URLSearchParams();
    if (contentType) params.append('type', contentType);
    if (mood) params.append('mood', mood);
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch content');
    }
    
    const data = await response.json();
    setContent(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

// Record a study break
const recordBreak = async (duration: number, activity: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/students/${user.id}/breaks`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          duration,
          activity,
          timestamp: new Date().toISOString()
        })
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to record break');
    }
    
    toast({
      title: "Break recorded",
      description: "Great job taking time to recharge!"
    });
  } catch (error) {
    toast({
      title: "Error recording break",
      description: error.message,
      variant: "destructive"
    });
  }
};
\`\`\`

---

## Admin Dashboard Pages

| Page | Components | Database Tables | API Endpoints | Notes |
|------|-----------|----------------|--------------|------|
| Overview | AdminDashboardStats | students, study_sessions, etc. | GET /api/admin/dashboard | Summary statistics |
| Students | StudentTable | students, user_profiles | GET /api/admin/students | Student management |
| Content | ContentManager | concepts, flashcards, exams | GET /api/admin/content | Content management |
| System Logs | LogViewer | system_logs | GET /api/admin/logs | System logging |
| Settings | AppSettings | system_settings | GET/POST /api/admin/settings | App configuration |

**Data Model for Admin:**
\`\`\`typescript
interface AdminDashboardStats {
  totalStudents: number;
  activeStudents: number;
  totalStudySessions: number;
  averageStudyTime: number;
  topPerformingSubjects: Array<{
    subject: string;
    averageScore: number;
  }>;
  moodDistribution: Record<string, number>;
  systemHealth: {
    status: 'healthy' | 'warning' | 'critical';
    uptime: number; // seconds
    activeConnections: number;
    errorRate: number;
  };
}

interface StudentData {
  id: string;
  name: string;
  email: string;
  role: string;
  examType?: string;
  registrationDate: string;
  phoneNumber?: string;
  completedOnboarding: boolean;
  goals?: string[];
  moodScore?: number;
  studyHours?: number;
  engagementScore?: number;
  // More fields...
}
\`\`\`

**API Implementation:**
\`\`\`typescript
// Inside hooks/useAdminDashboard.ts
const fetchDashboardStats = async () => {
  if (!user || user.role !== 'admin') return;
  
  setLoading(true);
  try {
    const response = await fetch(
      `${API_BASE_URL}/admin/dashboard`,
      {
        headers: { Authorization: `Bearer ${user.token}` }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats');
    }
    
    const data = await response.json();
    setStats(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

// Fetch student data
const fetchStudents = async (filters?: StudentFilters) => {
  if (!user || user.role !== 'admin') return;
  
  setLoading(true);
  try {
    let url = `${API_BASE_URL}/admin/students`;
    
    // Add query params for filters
    if (filters) {
      const params = new URLSearchParams();
      if (filters.examType) params.append('examType', filters.examType);
      if (filters.status) params.append('status', filters.status);
      if (filters.searchQuery) params.append('search', filters.searchQuery);
      
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }
    
    const data = await response.json();
    setStudents(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
\`\`\`

---

## General Implementation Guidelines

### Authentication Flow

1. **Login Process:**
   - User submits credentials (email/mobile + password) to POST /api/auth/login
   - Backend validates credentials against users table
   - On success, generates JWT token with user_id and role claims
   - Frontend stores token in localStorage and initializes AuthContext

2. **Authentication Context:**
   - Wrap your application in AuthProvider
   - Use useAuth() hook to access authentication state
   - Include token in all API requests

\`\`\`typescript
// Example usage of AuthContext
import { useAuth } from '@/contexts/auth/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Use authentication data in your component
}
\`\`\`

### API Request Structure

1. **Headers for Authenticated Requests:**
\`\`\`typescript
const headers = {
  'Content-Type': 'application/json',
  'Authorization': \`Bearer \${user.token}\`
};
\`\`\`

2. **Standard Error Handling:**
\`\`\`typescript
try {
  const response = await fetch(url, { headers });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Something went wrong');
  }
  
  const data = await response.json();
  // Process successful response
} catch (error) {
  // Handle error with toast notification
}
\`\`\`

3. **Request Caching with React Query:**
\`\`\`typescript
import { useQuery } from '@tanstack/react-query';

const fetchData = async () => {
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const { data, isLoading, error } = useQuery({
  queryKey: ['myData'],
  queryFn: fetchData,
  staleTime: 5 * 60 * 1000 // 5 minutes
});
\`\`\`

### Database Schema Overview

The primary tables in the database and their relationships:

1. **users** - Core user information
   - Relates to user_profiles, user_preferences, etc.

2. **user_profiles** - Extended user information
   - Contains demographic and personal details

3. **concepts** - Educational concepts
   - Relates to subjects, topics

4. **user_concept_progress** - User progress on concepts
   - Links users to concepts with progress tracking

5. **flashcards** and **flashcard_decks** - Flashcard content
   - Relates to subjects, concepts

6. **user_flashcard_progress** - User progress on flashcards
   - Links users to flashcards with retention tracking

7. **practice_exams** and **exam_questions** - Exam content
   - Relates to subjects, concepts

8. **user_exam_results** - User exam performance
   - Links users to exams with results

9. **study_plans** and **study_plan_items** - Study plans
   - Creates structured learning paths for users

10. **user_moods** - Mood tracking
    - Timestamps for mood changes and trends

11. **daily_plans** and **daily_plan_items** - Daily study schedule
    - Generated from study plans and user preferences

This page-by-page mapping should serve as a comprehensive guide for your development team, ensuring proper integration between frontend and backend components.

`;

export default pagewiseDatabaseMapping;
