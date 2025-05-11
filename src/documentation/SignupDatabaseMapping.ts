
/**
 * SIGNUP FLOW DATABASE MAPPING
 * 
 * This document maps each field in the multi-step signup process to its 
 * corresponding database table and column. Use this as a reference for 
 * frontend-backend integration.
 */

const signupDatabaseMapping = `
# PREPZR Signup Flow - Database Field Mapping

## Overview

This document provides a comprehensive mapping between the multi-step signup flow in the frontend 
and the corresponding database tables/fields in the backend. It serves as a guide for frontend 
developers to understand which data points to send to which backend endpoints.

## Step-by-Step Mapping

### Step 1: User Role Selection
| Frontend Field | Database Table | Database Column | Data Type | Notes |
|----------------|---------------|-----------------|-----------|-------|
| role | users | role | enum | Values: 'student', 'employee', 'doctor', 'founder' |

### Step 2: Exam/Goal Selection 
| Frontend Field | Database Table | Database Column | Data Type | Notes |
|----------------|---------------|-----------------|-----------|-------|
| examGoal | user_preferences | exam_goal | string | e.g., 'NEET', 'IIT-JEE', 'UPSC', etc. |

### Step 3: Demographics
| Frontend Field | Database Table | Database Column | Data Type | Notes |
|----------------|---------------|-----------------|-----------|-------|
| age | user_demographics | age | integer | |
| grade/class | user_demographics | education_level | string | |
| location | user_demographics | location | string | |
| city | user_demographics | city | string | |
| examDate | user_preferences | target_exam_date | date | When they plan to take the exam |
| institution | user_demographics | institution | string | School/college name |

### Step 4: Personality Type
| Frontend Field | Database Table | Database Column | Data Type | Notes |
|----------------|---------------|-----------------|-----------|-------|
| personalityType | user_learning_profile | personality_type | enum | Values: 'ANALYTICAL', 'CREATIVE', 'PRACTICAL', 'REFLECTIVE', etc. |

### Step 5: Current Mood/Sentiment
| Frontend Field | Database Table | Database Column | Data Type | Notes |
|----------------|---------------|-----------------|-----------|-------|
| mood | user_moods | current_mood | enum | Values: 'HAPPY', 'MOTIVATED', 'FOCUSED', 'ANXIOUS', etc. |
| mood timestamp | user_moods | timestamp | datetime | Auto-generated |

### Step 6: Study Time Preference
| Frontend Field | Database Table | Database Column | Data Type | Notes |
|----------------|---------------|-----------------|-----------|-------|
| studyTime | user_preferences | preferred_study_time | enum | Values: 'Morning', 'Afternoon', 'Evening', 'Night' |

### Step 7: Study Pace Selection
| Frontend Field | Database Table | Database Column | Data Type | Notes |
|----------------|---------------|-----------------|-----------|-------|
| studyPace | user_preferences | study_pace | enum | Values: 'Aggressive', 'Balanced', 'Relaxed' |

### Step 8: Daily Study Hours
| Frontend Field | Database Table | Database Column | Data Type | Notes |
|----------------|---------------|-----------------|-----------|-------|
| dailyStudyHours | user_preferences | daily_study_hours | integer | Hours per day |

### Step 9: Study Habits
| Frontend Field | Database Table | Database Column | Data Type | Notes |
|----------------|---------------|-----------------|-----------|-------|
| sleepSchedule | user_habits | sleep_schedule | string | |
| stressManagement | user_habits | stress_management | string | |
| breakRoutine | user_habits | break_routine | string | |
| studyEnvironment | user_habits | study_environment | string | |
| focusHours | user_habits | focus_hours | integer | Best hours for concentration |

### Step 10: Subject Interests
| Frontend Field | Database Table | Database Column | Data Type | Notes |
|----------------|---------------|-----------------|-----------|-------|
| interests | user_subjects | subject_id | integer | Foreign key to subjects table |
| | user_subjects | interest_level | integer | Scale 1-10 |
| weakSubjects | user_subjects | is_weak_area | boolean | True for challenging subjects |

### Step 11: Final Signup
| Frontend Field | Database Table | Database Column | Data Type | Notes |
|----------------|---------------|-----------------|-----------|-------|
| name | users | name | string | Full name |
| mobile | users | phone_number | string | Mobile number |
| otp | auth_verifications | verification_code | string | Not stored permanently |
| password | users | password_hash | string | Stored as hashed value |
| agreeTerms | users | accepted_terms | boolean | Terms acceptance flag |
| email | users | email | string | Generated from mobile or provided |

## Authentication Flow

### Login Process
1. Frontend collects email/mobile and password
2. Backend validates credentials against users table
3. On success, generates JWT token with user_id and role claims
4. Returns token to frontend for storage and subsequent requests

### Session Management
- Token validity: 24 hours
- Refresh token stored in user_sessions table
- Each API request must include Authorization header with token

## Data Relationships

### Primary Tables
- users: Core user information
- user_preferences: User study settings
- user_demographics: Personal background details
- user_subjects: Subject interests and weak areas
- user_learning_profile: Personality and learning style
- user_habits: Study and lifestyle habits
- user_moods: Mood tracking history

### Key Relationships
- users.id → All other tables have user_id foreign key
- user_subjects.subject_id → subjects.id (reference to subjects master table)
- user_moods tracks historical mood data with timestamps

## Implementation Notes for Frontend Team

1. Store form data across steps using the OnboardingContext
2. Submit complete data only on final step
3. Use the signup endpoint: POST /api/auth/register
4. Expect the backend to distribute data to appropriate tables
5. After signup, redirect to welcome flow with JWT token in Authorization header

`;

export default signupDatabaseMapping;
