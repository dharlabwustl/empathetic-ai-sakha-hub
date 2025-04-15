
import { UserProfileType, UserRole } from '@/types/user/base';
import { mockStudentProfile } from './studentProfile';
import { mockEmployeeProfile } from './employeeProfile';
import { mockDoctorProfile } from './doctorProfile';
import { mockFounderProfile } from './founderProfile';

// Export the mock profiles
export const getStudentProfile = () => mockStudentProfile;
export const getEmployeeProfile = () => mockEmployeeProfile;
export const getDoctorProfile = () => mockDoctorProfile;
export const getFounderProfile = () => mockFounderProfile;

// Get a mock profile by role
export const getMockProfileByRole = (role: UserRole | string): UserProfileType => {
  switch (role.toLowerCase()) {
    case 'student':
      return mockStudentProfile;
    case 'employee':
      return mockEmployeeProfile;
    case 'doctor':
      return mockDoctorProfile;
    case 'founder':
      return mockFounderProfile;
    default:
      return mockStudentProfile; // Default to student profile
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
      averageScore: 82,
      studyStreak: 8,
      totalStudyHours: 120,
      quizzesCompleted: 24
    },
    ...overrides
  };
};
