
import { useState, useEffect } from 'react';
import { UserProfileType } from '@/types/user';
import { UserRole } from '@/types/user/base';

// Mock data for demonstration
const mockProfiles: Record<string, UserProfileType> = {
  student: {
    id: 'student-123',
    name: 'John Student',
    email: 'john@student.com',
    role: UserRole.Student,
    examPreparation: 'JEE Advanced',
    bio: 'Passionate student preparing for engineering entrance exams.',
    phoneNumber: '+91 98765 43210',
    goals: [
      { id: 'g1', title: 'Complete Physics syllabus', targetDate: '2023-12-31', progress: 65 },
      { id: 'g2', title: 'Score 95+ in Mock Tests', targetDate: '2023-11-30', progress: 40 }
    ],
    subjects: ['Physics', 'Chemistry', 'Mathematics'],
    preferences: {
      studyReminders: true,
      emailNotifications: true,
      darkMode: false
    },
    recentActivity: {
      lastLogin: new Date(),
      lastStudySession: new Date(Date.now() - 86400000),
      completedTasks: 42
    }
  },
  admin: {
    id: 'admin-123',
    name: 'Admin User',
    email: 'admin@prepzr.com',
    role: UserRole.Admin,
    bio: 'System administrator',
    phoneNumber: '+1 555-123-4567',
    recentActivity: {
      lastLogin: new Date(),
      completedTasks: 15
    }
  }
};

export const useUserProfile = (role: UserRole = UserRole.Student) => {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate API call delay
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get profile based on role
        const profileKey = role === UserRole.Admin ? 'admin' : 'student';
        const profile = mockProfiles[profileKey];
        
        if (!profile) {
          throw new Error(`Profile for ${role} not found`);
        }
        
        setUserProfile(profile);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        console.error('Error fetching user profile:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [role]);

  return { userProfile, loading, error };
};
