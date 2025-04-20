
import { UserRole } from "@/types/user";
import { getMockProfileByRole } from "@/data/mockProfiles";
import { StudentProfile, StudentGoal, OnboardingData, StudentSettings } from "@/types/student";

export const studentService = {
  getStudentProfile: async (userId: string): Promise<StudentProfile> => {
    // For demo purposes, use the mock profile data
    const mockProfile = getMockProfileByRole(UserRole.Student) as StudentProfile;
    return {
      ...mockProfile,
      id: userId
    };
  },

  updateStudentProfile: async (userId: string, data: Partial<StudentProfile>): Promise<StudentProfile> => {
    console.log(`Updating profile for user ${userId}:`, data);
    // In a real app, this would make an API call
    // For demo purposes, just return the combined data
    return {
      ...(await studentService.getStudentProfile(userId)),
      ...data
    };
  },

  getStudentGoals: async (userId: string): Promise<StudentGoal[]> => {
    // Mock goals
    return [
      {
        id: "goal1",
        title: "Complete IIT-JEE Preparation",
        description: "Cover all syllabus and take practice tests",
        targetDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        status: "in-progress",
        progress: 45,
        steps: [
          { id: "step1", title: "Complete Physics syllabus", completed: true },
          { id: "step2", title: "Complete Chemistry syllabus", completed: false },
          { id: "step3", title: "Complete Mathematics syllabus", completed: false }
        ]
      },
      {
        id: "goal2",
        title: "Score 90+ percentile in next mock test",
        description: "Focus on weak areas and practice more",
        targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: "in-progress",
        progress: 30
      }
    ];
  },

  saveOnboardingData: async (userId: string, data: OnboardingData): Promise<void> => {
    console.log(`Saving onboarding data for user ${userId}:`, data);
    // In a real app, this would make an API call
  },

  getStudentSettings: async (userId: string): Promise<StudentSettings> => {
    // Mock settings
    return {
      notifications: {
        email: true,
        push: true,
        sms: false
      },
      displayPreferences: {
        darkMode: false,
        fontSize: "medium",
        colorScheme: "blue"
      },
      studySettings: {
        breakReminders: true,
        autoPlayVideo: false,
        showProgressBar: true
      }
    };
  },

  updateStudentSettings: async (userId: string, settings: Partial<StudentSettings>): Promise<StudentSettings> => {
    console.log(`Updating settings for user ${userId}:`, settings);
    // In a real app, this would make an API call
    return {
      ...(await studentService.getStudentSettings(userId)),
      ...settings
    };
  }
};
