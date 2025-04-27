
import { useState, useEffect } from 'react';
import { UserProfileType } from '@/types/user';

export const useStudentProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      // Simulating API fetch with mock data
      try {
        // Check if user data exists in local storage
        const savedUserData = localStorage.getItem("userData");
        
        if (savedUserData) {
          setUserProfile(JSON.parse(savedUserData));
        } else {
          // Create mock profile if none exists
          const mockProfile: UserProfileType = {
            id: '1',
            name: 'Demo Student',
            email: 'student@example.com',
            role: 'student',
            avatar: '',
            personalityType: 'Visual Learner',
            examPreparation: 'JEE Advanced',
            goals: [
              {
                id: '1',
                title: 'IIT-JEE',
                progress: 35,
              }
            ],
            subscription: 'basic',
            completedTasks: 24,
            performanceScore: 78,
            streakDays: 7,
            timeSpent: 42
          };
          
          // Save to local storage for persistence
          localStorage.setItem("userData", JSON.stringify(mockProfile));
          setUserProfile(mockProfile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const updateUserProfile = (updates: Partial<UserProfileType>) => {
    if (userProfile) {
      const updatedProfile = { ...userProfile, ...updates };
      setUserProfile(updatedProfile);
      localStorage.setItem("userData", JSON.stringify(updatedProfile));
    }
  };

  return { userProfile, loading, updateUserProfile };
};
