
# Flask Backend Integration Guide for PREPZR Frontend Team

This document provides implementation guidelines for connecting the PREPZR React frontend with the Flask backend. Follow these steps for each feature to ensure seamless integration.

## Table of Contents
1. [Authentication Flow](#authentication-flow)
2. [Student Dashboard Integration](#student-dashboard-integration)
3. [Mood Tracking System](#mood-tracking-system)
4. [Study Plans and Recommendations](#study-plans-and-recommendations)
5. [Content Pages Integration](#content-pages-integration)
6. [Error Handling Guidelines](#error-handling-guidelines)

## Authentication Flow

### Signup Page

**Endpoint**: `/auth/register`  
**Method**: POST  
**Request Body**:
```json
{
  "name": "string",
  "email": "string",
  "phoneNumber": "string",
  "password": "string",
  "role": "student" | "admin"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "token": "string"
  },
  "error": null
}
```

**Implementation Steps**:
1. Import the auth service: `import authService from '@/services/auth/authService'`
2. Call the register method on form submission:
```typescript
const response = await authService.register({
  name, email, phoneNumber, password, role
});
```
3. On successful response, store the token in localStorage and redirect to onboarding or dashboard
4. On error, display appropriate feedback to the user

### Login Page

**Endpoint**: `/auth/login`  
**Method**: POST  
**Request Body**:
```json
{
  "email": "string",
  "password": "string"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "string",
    "token": "string"
  },
  "error": null
}
```

**Implementation Steps**:
1. Import the auth service: `import authService from '@/services/auth/authService'`
2. Use the login method:
```typescript
const response = await authService.login({ email, password });
```
3. Store the token in localStorage and set auth headers:
```typescript
localStorage.setItem('authToken', response.data.token);
apiClient.setAuthToken(response.data.token);
```
4. Redirect based on user role (student/admin)

### Logout Function

**Endpoint**: `/auth/logout`  
**Method**: POST  
**Headers**: Authorization: Bearer {token}

**Implementation Steps**:
1. Import the auth service: `import authService from '@/services/auth/authService'`
2. Create a logout function:
```typescript
const handleLogout = async () => {
  try {
    // Call the backend to invalidate the token
    await authService.logout();
    
    // Clear all authentication data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('currentMood');
    sessionStorage.clear();
    
    // Reset API client
    apiClient.setAuthToken(null);
    
    // Force redirect to login page
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout error:', error);
    // Force logout even if API call fails
    localStorage.removeItem('authToken');
    window.location.href = '/login';
  }
}
```

## Student Dashboard Integration

### User Profile Data

**Endpoint**: `/students/{studentId}/profile`  
**Method**: GET  
**Headers**: Authorization: Bearer {token}

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "student",
    "photoURL": "string",
    "loginCount": 5,
    "subscription": {
      "planType": "free" | "basic" | "premium",
      "expiryDate": "2023-12-31T00:00:00Z"
    },
    "goals": [
      {
        "id": "string",
        "title": "string",
        "targetDate": "2023-12-31T00:00:00Z",
        "progress": 75
      }
    ]
  },
  "error": null
}
```

**Implementation Steps**:
1. Use the `useUserProfile` hook which internally calls `studentService.getProfile`
2. Ensure all profile type definitions match the backend response structure
3. Handle loading states and errors appropriately

### KPI Data

**Endpoint**: `/students/{studentId}/analytics/kpi`  
**Method**: GET  
**Headers**: Authorization: Bearer {token}

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "Study Hours",
      "value": 12,
      "icon": "🔥",
      "change": 2.5,
      "changeType": "positive"
    },
    {
      "id": "string",
      "title": "Concepts Mastered",
      "value": 48,
      "unit": "%",
      "icon": "📚",
      "change": 5,
      "changeType": "positive"
    }
  ],
  "error": null
}
```

**Implementation Steps**:
1. Use the `useKpiTracking` hook which calls the analytics endpoint
2. Update the dashboard components to display the KPI data

## Mood Tracking System

### Record Mood

**Endpoint**: `/students/{studentId}/mood-logs`  
**Method**: POST  
**Headers**: Authorization: Bearer {token}  
**Request Body**:
```json
{
  "mood": "HAPPY" | "MOTIVATED" | "FOCUSED" | "NEUTRAL" | "TIRED" | "ANXIOUS" | "STRESSED" | "SAD",
  "timestamp": "2023-11-11T15:30:00Z",
  "note": "string (optional)"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "mood": "HAPPY",
    "timestamp": "2023-11-11T15:30:00Z",
    "recommendation": "Great mood! This is a perfect time to tackle challenging concepts."
  },
  "error": null
}
```

**Implementation Steps**:
1. Import the student service: `import studentService from '@/services/student/studentService'`
2. Call the recordMood method:
```typescript
const response = await studentService.recordMood(studentId, {
  mood: selectedMood,
  timestamp: new Date().toISOString(),
  note: noteText
});
```
3. Update the UI to show the recommendation
4. Trigger any personalization adjustments based on mood

### Get Mood History

**Endpoint**: `/students/{studentId}/mood-logs`  
**Method**: GET  
**Headers**: Authorization: Bearer {token}  
**Query Parameters**: `?start=2023-11-01T00:00:00Z&end=2023-11-11T23:59:59Z` (optional)

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "mood": "HAPPY",
      "timestamp": "2023-11-11T15:30:00Z"
    },
    {
      "id": "string",
      "mood": "FOCUSED",
      "timestamp": "2023-11-10T10:15:00Z"
    }
  ],
  "error": null
}
```

**Implementation Steps**:
1. Fetch the mood history when rendering the mood tracking component:
```typescript
useEffect(() => {
  const fetchMoodHistory = async () => {
    const timeRange = {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
      end: new Date()
    };
    
    const response = await studentService.getMoodLogs(studentId, timeRange);
    if (response.success) {
      setMoodHistory(response.data);
    }
  };
  
  fetchMoodHistory();
}, [studentId]);
```

## Study Plans and Recommendations

### Get Study Plan

**Endpoint**: `/students/{studentId}/study-plan`  
**Method**: GET  
**Headers**: Authorization: Bearer {token}

**Response**:
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "Daily Study Plan",
    "createdAt": "2023-11-10T08:00:00Z",
    "days": [
      {
        "date": "2023-11-11",
        "sessions": [
          {
            "id": "string",
            "title": "Physics - Forces",
            "startTime": "09:00",
            "endTime": "10:30",
            "completed": false,
            "topics": ["Newton's Laws", "Free Body Diagrams"]
          },
          {
            "id": "string",
            "title": "Chemistry Revision",
            "startTime": "11:00",
            "endTime": "12:30",
            "completed": true,
            "topics": ["Periodic Table", "Chemical Bonding"]
          }
        ]
      }
    ],
    "moodBasedAdjustments": [
      {
        "mood": "TIRED",
        "recommendation": "Focus on revision rather than new topics"
      },
      {
        "mood": "MOTIVATED",
        "recommendation": "Tackle challenging topics first"
      }
    ]
  },
  "error": null
}
```

**Implementation Steps**:
1. Import the student service: `import studentService from '@/services/student/studentService'`
2. Fetch the study plan in a useEffect hook:
```typescript
useEffect(() => {
  const fetchStudyPlan = async () => {
    const response = await studentService.getStudyPlan(studentId);
    if (response.success) {
      setStudyPlan(response.data);
    }
  };
  
  fetchStudyPlan();
}, [studentId]);
```
3. Apply any mood-based adjustments when the user's mood changes

## Content Pages Integration

### Concept Cards

**Endpoint**: `/content/concepts`  
**Method**: GET  
**Headers**: Authorization: Bearer {token}  
**Query Parameters**: `?subject=physics&topic=mechanics` (optional)

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "title": "Newton's First Law",
      "subject": "Physics",
      "topic": "Mechanics",
      "content": "An object at rest stays at rest...",
      "difficulty": "medium",
      "examples": ["example text"],
      "mastery": 65
    }
  ],
  "error": null
}
```

**Implementation Steps**:
1. Use a custom hook to fetch concepts:
```typescript
const useConceptCards = (subject?: string, topic?: string) => {
  const [concepts, setConcepts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchConcepts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (subject) params.append('subject', subject);
        if (topic) params.append('topic', topic);
        
        const response = await apiClient.get(`/content/concepts?${params}`);
        setConcepts(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchConcepts();
  }, [subject, topic]);
  
  return { concepts, loading, error };
};
```

### Flashcards

**Endpoint**: `/content/flashcards`  
**Method**: GET  
**Headers**: Authorization: Bearer {token}  
**Query Parameters**: `?subject=physics&dueDate=2023-11-11` (optional)

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "string",
      "question": "What is Newton's First Law?",
      "answer": "An object at rest stays at rest...",
      "subject": "Physics",
      "topic": "Mechanics",
      "difficulty": 3,
      "lastReviewed": "2023-11-05T10:30:00Z",
      "nextReview": "2023-11-11T10:30:00Z"
    }
  ],
  "error": null
}
```

**Implementation Steps**:
1. Create a service to fetch flashcards:
```typescript
const contentService = {
  async getFlashcards(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await apiClient.get(`/content/flashcards?${queryString}`);
    return response.data;
  },
  
  async updateFlashcardProgress(id, difficulty) {
    const response = await apiClient.post(`/content/flashcards/${id}/progress`, {
      difficulty
    });
    return response.data;
  }
};
```

## Error Handling Guidelines

1. **API Error Handling**:
```typescript
try {
  const response = await apiClient.get('/endpoint');
  // Process successful response
} catch (error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const statusCode = error.response.status;
    const errorMessage = error.response.data?.error || 'Unknown error occurred';
    
    if (statusCode === 401) {
      // Handle unauthorized errors (token expired)
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    } else if (statusCode === 403) {
      // Handle forbidden errors (insufficient permissions)
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this resource",
        variant: "destructive"
      });
    } else {
      // Handle other errors
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    }
  } else if (error.request) {
    // The request was made but no response was received
    toast({
      title: "Connection Error",
      description: "Unable to connect to the server. Please check your internet connection.",
      variant: "destructive"
    });
  } else {
    // Something happened in setting up the request
    toast({
      title: "Request Error",
      description: error.message,
      variant: "destructive"
    });
  }
}
```

2. **Form Validation**:
- Use zod or form libraries to validate data before submission
- Match validation with backend requirements
- Provide clear error messages to users

## Mood Integration with Study Features

To properly integrate the mood tracking system across the application:

1. **After logging a mood**:
   - Update user's mood in local storage AND call the API
   - Update study recommendations based on mood
   - Adjust UI elements based on mood (e.g., different color schemes)

2. **Use current mood to personalize**:
   - Concept difficulty recommendations
   - Study session duration
   - Break frequency
   - Content presentation style

3. **Sample integration code**:
```typescript
// After user selects a mood
const handleMoodSelection = async (mood: MoodType) => {
  // Update UI immediately
  setCurrentMood(mood);
  localStorage.setItem('currentMood', mood);
  
  // Record in backend
  try {
    const response = await studentService.recordMood(studentId, {
      mood,
      timestamp: new Date().toISOString()
    });
    
    // Apply study recommendations
    if (response.success && response.data.recommendation) {
      toast({
        title: `Mood Updated: ${getMoodLabel(mood)}`,
        description: response.data.recommendation
      });
      
      // Update study plan if needed
      if (currentStudyPlan) {
        applyMoodBasedAdjustments(currentStudyPlan, mood);
      }
    }
  } catch (error) {
    console.error('Failed to record mood:', error);
  }
};
```

## Testing the Integration

1. **Manual Testing Checklist**:
   - Authentication flow (signup, login, logout)
   - Profile data fetching and display
   - Mood logging and recommendations
   - Study plan personalization based on mood
   - Content fetching (concepts, flashcards)

2. **API Mocking**:
   - Use MSW (Mock Service Worker) for development testing
   - Create mock handlers for each endpoint

---

## Common Data Types

```typescript
// User Types
enum UserRole {
  Student = 'student',
  Admin = 'admin'
}

interface UserProfileBase {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  loginCount?: number;
  photoURL?: string;
}

// Mood Types
enum MoodType {
  HAPPY = 'HAPPY',
  MOTIVATED = 'MOTIVATED',
  FOCUSED = 'FOCUSED',
  NEUTRAL = 'NEUTRAL',
  TIRED = 'TIRED',
  ANXIOUS = 'ANXIOUS',
  STRESSED = 'STRESSED',
  SAD = 'SAD'
}

// Content Types
interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  topic: string;
  content: string;
  difficulty: 'easy' | 'medium' | 'hard';
  examples: string[];
  mastery: number;
}

interface Flashcard {
  id: string;
  question: string;
  answer: string;
  subject: string;
  topic: string;
  difficulty: number;
  lastReviewed: string;
  nextReview: string;
}
```

This guide covers the essential integration points between the PREPZR frontend and Flask backend. For specific implementation details or edge cases, consult with the backend team or refer to the API documentation.
