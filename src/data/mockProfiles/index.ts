
import { UserProfileType, UserRole, UserPreferences } from '@/types/user/base';
import { mockStudentProfile } from './studentProfile';
import { mockEmployeeProfile } from './employeeProfile';
import { mockDoctorProfile } from './doctorProfile';
import { mockFounderProfile } from './founderProfile';

// Default mock preferences for all user profiles
const defaultPreferences: UserPreferences = {
  theme: 'light',
  notifications: true,
  studyReminders: true,
  contentFormat: 'mixed',
  difficulty: 'intermediate',
  studySessionDuration: 25,
  emailNotifications: true,
  pushNotifications: true,
  // Add the missing properties
  notificationsEnabled: true,
  language: 'en'
};

// Helper function to add default preferences to user profiles
const addDefaultPreferences = (profile: any): UserProfileType => {
  return {
    ...profile,
    preferences: defaultPreferences
  };
};

// Export the mock profiles with default preferences
export const getStudentProfile = () => addDefaultPreferences(mockStudentProfile);
export const getEmployeeProfile = () => addDefaultPreferences(mockEmployeeProfile);
export const getDoctorProfile = () => addDefaultPreferences(mockDoctorProfile);
export const getFounderProfile = () => addDefaultPreferences(mockFounderProfile);

// Get a mock profile by role
export const getMockProfileByRole = (role: UserRole | string): UserProfileType => {
  switch (role.toLowerCase()) {
    case 'student':
      return addDefaultPreferences(mockStudentProfile) as unknown as UserProfileType;
    case 'employee':
      return addDefaultPreferences(mockEmployeeProfile) as unknown as UserProfileType;
    case 'doctor':
      return addDefaultPreferences(mockDoctorProfile) as unknown as UserProfileType;
    case 'founder':
      return addDefaultPreferences(mockFounderProfile) as unknown as UserProfileType;
    default:
      return addDefaultPreferences(mockStudentProfile) as unknown as UserProfileType; // Default to student profile
  }
};

// Generate a default mock profile for testing
export const generateMockProfile = (overrides: Partial<UserProfileType> = {}): UserProfileType => {
  return {
    id: 'mock-user-id',
    name: 'Test User',
    email: 'test@example.com',
    phoneNumber: '1234567890',
    role: 'student',
    subscription: 'Basic',
    joinDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    personalityType: 'Strategic Thinker',
    areasOfInterest: [
      { id: 'ai-1', name: 'Mathematics', level: 'Advanced' }
    ],
    lastActive: new Date().toISOString(),
    goals: [
      {
        id: 'g1',
        title: 'Complete Math Course',
        progress: 65,
        type: 'course',
        description: 'Finish the advanced calculus course',
        dueDate: '2025-06-30'
      },
      {
        id: 'g2',
        title: 'Prepare for SAT',
        progress: 40,
        type: 'exam',
        description: 'Complete SAT preparation',
        dueDate: '2025-07-15'
      }
    ],
    subjects: [
      { id: 's1', name: 'Mathematics', progress: 78, lastStudied: new Date().toISOString() },
      { id: 's2', name: 'Physics', progress: 45, lastStudied: new Date().toISOString() },
      { id: 's3', name: 'Chemistry', progress: 60, lastStudied: new Date().toISOString() }
    ],
    stats: {
      totalStudyTime: 120,
      questionsAnswered: 350,
      testsCompleted: 24,
      averageScore: 82,
      weeklyStudyTime: [2, 3, 1.5, 4, 2.5, 1, 3],
      studyStreak: 8,
      totalStudyHours: 120,
      quizzesCompleted: 24
    },
    preferences: defaultPreferences,
    ...overrides
  } as UserProfileType;
};
