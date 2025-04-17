
import { useState, useEffect } from "react";
import { UserProfileType } from "@/types/user";
import { UserRole } from "@/types/user";
import { getMockProfileByRole } from "@/data/mockProfiles";

export function useUserProfile(role: UserRole = UserRole.Student): {
  userProfile: UserProfileType | null;
  loading: boolean;
  updateUserProfile: (updates: Partial<UserProfileType>) => void;
} {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
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

  const updateUserProfile = (updates: Partial<UserProfileType>) => {
    setUserProfile(prev => {
      if (!prev) return prev;
      return { ...prev, ...updates } as UserProfileType;
    });
  };

  return { userProfile, loading, updateUserProfile };
}
