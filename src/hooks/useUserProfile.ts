import { useState, useEffect } from "react";
import { UserProfileType, UserRole } from "@/types/user";
import { getMockProfileByRole } from "@/data/mockProfiles";
import { useToast } from "@/hooks/use-toast";

export function useUserProfile(role: UserRole = UserRole.Student): {
  userProfile: UserProfileType | null;
  loading: boolean;
  error: string | null;
  updateProfile: (updates: Partial<UserProfileType>) => void;
  uploadAvatar: (file: File) => void;
  updateUserProfile: (updates: Partial<UserProfileType>) => void;
} {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate API call to fetch user profile
    const fetchUserProfile = () => {
      setLoading(true);
      setError(null);
      
      try {
        setTimeout(() => {
          const profile = getMockProfileByRole(role);
          setUserProfile(profile);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to load profile data");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [role]);

  const updateProfile = (updates: Partial<UserProfileType>) => {
    setUserProfile(prev => {
      if (!prev) return prev;
      return { ...prev, ...updates };
    });
    
    toast({
      title: "Profile updated",
      description: "Your changes have been saved successfully."
    });
  };
  
  const uploadAvatar = (file: File) => {
    // In a real app, we would upload the file to a server
    // For now, just create a local URL and update the profile
    const url = URL.createObjectURL(file);
    
    setUserProfile(prev => {
      if (!prev) return prev;
      return { ...prev, avatar: url };
    });
    
    toast({
      title: "Avatar updated",
      description: "Your profile picture has been updated."
    });
  };

  // Keep the original function for backward compatibility
  const updateUserProfile = updateProfile;

  return { 
    userProfile, 
    loading, 
    error,
    updateProfile,
    uploadAvatar,
    updateUserProfile
  };
}
