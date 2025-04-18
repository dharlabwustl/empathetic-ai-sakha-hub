
import { useState, useEffect } from "react";
import { UserProfileType, UserRole } from "@/types/user";
import { getMockProfileByRole } from "@/data/mockProfiles";

export function useUserProfile(role: UserRole = UserRole.Student): {
  userProfile: UserProfileType | null;
  loading: boolean;
  error: string | null;
  updateUserProfile: (updates: Partial<UserProfileType>) => void;
  uploadAvatar: (file: File) => void;
} {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call to fetch user profile
    const fetchUserProfile = () => {
      setLoading(true);
      setError(null);
      
      setTimeout(() => {
        try {
          const profile = getMockProfileByRole(role);
          setUserProfile(profile);
        } catch (err) {
          setError("Failed to load profile data");
        } finally {
          setLoading(false);
        }
      }, 800);
    };

    fetchUserProfile();
  }, [role]);

  const updateUserProfile = (updates: Partial<UserProfileType>) => {
    setUserProfile(prev => {
      if (!prev) return prev;
      return { ...prev, ...updates };
    });
  };
  
  const uploadAvatar = (file: File) => {
    // Simulate avatar upload
    const reader = new FileReader();
    reader.onload = (e) => {
      const avatarUrl = e.target?.result as string;
      updateUserProfile({ avatar: avatarUrl });
    };
    reader.readAsDataURL(file);
  };

  return { userProfile, loading, error, updateUserProfile, uploadAvatar };
}
