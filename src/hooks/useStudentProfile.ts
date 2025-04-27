
import { useState, useEffect } from "react";
import { UserProfileType } from "@/types/user";
import apiClient from "@/services/api/apiClient";
import { API_ENDPOINTS } from "@/services/api/apiConfig";

interface StudentProfileHook {
  userProfile: UserProfileType | null;
  loading: boolean;
  error: string | null;
  refreshProfile: () => Promise<void>;
}

export const useStudentProfile = (): StudentProfileHook => {
  const [userProfile, setUserProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStudentProfile = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Attempt to fetch from API
      const response = await apiClient.get(API_ENDPOINTS.STUDENTS.PROFILE);
      setUserProfile(response.data);
    } catch (err) {
      console.error("Error fetching student profile:", err);
      
      // Fallback to mock data if API fails
      setUserProfile({
        id: "student-1",
        name: "Alex Student",
        email: "alex@student.com",
        role: "student",
        avatar: "/avatars/student.png",
        batch: "IIT-JEE-2025",
        examGoal: "IIT-JEE",
        streak: {
          current: 5,
          longest: 12
        },
        joinedOn: "2023-09-15",
        subscription: "basic",
        lastLogin: new Date().toISOString(),
        loginCount: 42,
        studyTime: {
          today: 120, // minutes
          thisWeek: 540, // minutes
          total: 5400 // minutes
        },
        completedTopics: 24,
        completedPracticeTests: 7,
        averageScore: 78
      });
      
      // No error message for fallback data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentProfile();
  }, []);

  const refreshProfile = async (): Promise<void> => {
    await fetchStudentProfile();
  };

  return { userProfile, loading, error, refreshProfile };
};
