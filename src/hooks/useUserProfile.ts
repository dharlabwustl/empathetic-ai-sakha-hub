
import { useState, useEffect } from 'react';
import { UserProfileType, UserRole } from '@/types/user';
import { getMockProfileByRole } from '@/data/mockProfiles';

export const useUserProfile = (role: UserRole = UserRole.Student) => {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUserProfile();
  }, [role]);

  const loadUserProfile = () => {
    setLoading(true);
    try {
      // For demo, we'll use the mock profile data
      const profile = getMockProfileByRole(role);
      setUserProfile(profile);
      setError(null);
    } catch (err) {
      console.error('Error loading user profile:', err);
      setError('Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = (updates: Partial<UserProfileType>) => {
    if (userProfile) {
      // Ensure we have id and role which are required
      const updatedProfile: UserProfileType = {
        ...userProfile,
        ...updates
      };
      setUserProfile(updatedProfile);
    }
  };

  return {
    userProfile,
    loading,
    error,
    updateUserProfile,
    reloadProfile: loadUserProfile
  };
};
