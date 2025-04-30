
import { useState, useEffect } from "react";
import { UserProfileBase, UserRole } from "@/types/user/base";
import { getMockProfileByRole } from "@/data/mockProfiles";

export function useUserProfile(role: UserRole = UserRole.Student): {
  userProfile: UserProfileBase | null;
  loading: boolean;
  updateUserProfile: (updates: Partial<UserProfileBase>) => void;
} {
  const [userProfile, setUserProfile] = useState<UserProfileBase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch user profile
    const fetchUserProfile = () => {
      setLoading(true);
      
      setTimeout(() => {
        const profile = getMockProfileByRole(role);
        setUserProfile(profile);
        setLoading(false);
      }, 800);
    };

    fetchUserProfile();
  }, [role]);

  const updateUserProfile = (updates: Partial<UserProfileBase>) => {
    setUserProfile(prev => {
      if (!prev) return prev;
      return { ...prev, ...updates };
    });
  };

  return { userProfile, loading, updateUserProfile };
}
