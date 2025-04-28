
import { getFeatures } from "@/pages/dashboard/student/utils/FeatureManager";
import { ReactNode } from "react";
import { API_ENDPOINTS } from "./api/apiConfig";
import apiClient from "./api/apiClient";

export enum PlanType {
  Free = "free",
  Basic = "basic",
  Premium = "premium",
  Group = "group", 
  Institute = "institute",
  Corporate = "corporate"
}

export enum SubscriptionInterval {
  Monthly = "monthly",
  Yearly = "yearly"
}

export interface Feature {
  title: string;
  description: string;
  path: string;
  isPremium: boolean;
  icon: ReactNode;
  freeAccessLimit?: {
    type: "time" | "usage" | "content",
    limit: number // days, count, or percentage
  };
  allowedPlans?: PlanType[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  type: PlanType;
  price: number;
  interval: SubscriptionInterval;
  features: string[]; // Feature titles
  maxUsers?: number; // For group, institute, corporate plans
  description: string;
  trialDays?: number; // Adding trial period
}

export const featureService = {
  getAllFeatures: async (): Promise<Feature[]> => {
    try {
      // First try to fetch from API
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.FEATURES);
      return response.data;
    } catch (error) {
      console.log("Fetching features from local data", error);
      // Fallback to local data if API fails
      return getFeatures();
    }
  },
  
  updateFeature: async (updatedFeature: Feature): Promise<Feature> => {
    try {
      // Try to update via API
      const response = await apiClient.put(`${API_ENDPOINTS.ADMIN.FEATURES}/${updatedFeature.title}`, updatedFeature);
      return response.data;
    } catch (error) {
      console.log("API not available, returning updated feature without saving", error);
      // Return the feature without actually saving it
      return updatedFeature;
    }
  },
  
  toggleFeaturePremium: async (featureTitle: string, isPremium: boolean): Promise<boolean> => {
    try {
      // Try to toggle via API
      const response = await apiClient.patch(`${API_ENDPOINTS.ADMIN.FEATURES}/${featureTitle}/toggle-premium`, { isPremium });
      return response.data.success;
    } catch (error) {
      console.log("API not available, returning success without saving", error);
      // Return success without actually saving
      return true;
    }
  },

  getSubscriptionPlans: async (): Promise<SubscriptionPlan[]> => {
    try {
      // Try to fetch from API
      const response = await apiClient.get(API_ENDPOINTS.SUBSCRIPTION.PLANS);
      return response.data;
    } catch (error) {
      console.log("Fetching subscription plans from local data", error);
      // Fallback to local data if API fails
      return [
        {
          id: "free-plan",
          name: "Free Trial",
          type: PlanType.Free,
          price: 0,
          interval: SubscriptionInterval.Monthly,
          features: ["24/7 Tutor", "Academic Advisor", "Flashcards & Revision"],
          description: "7-day trial access to essential features",
          trialDays: 7
        },
        {
          id: "basic-plan",
          name: "Basic Plan",
          type: PlanType.Basic,
          price: 499,
          interval: SubscriptionInterval.Monthly,
          features: ["24/7 Tutor", "Academic Advisor", "Flashcards & Revision", "Practice Exams", "Goal Tracking", "Video Library", "Smart Notifications"],
          description: "Full access to standard features"
        },
        {
          id: "premium-plan",
          name: "Premium Plan",
          type: PlanType.Premium,
          price: 999,
          interval: SubscriptionInterval.Monthly,
          features: ["24/7 Tutor", "Academic Advisor", "Flashcards & Revision", "Practice Exams", "Goal Tracking", "Video Library", "Smart Notifications", "Motivation Coach", "Mental Health Zone", "My Materials Vault", "Live Tutors", "Collaborative Forum"],
          description: "Complete access to all features including premium content"
        },
        {
          id: "group-plan",
          name: "Group Plan",
          type: PlanType.Group,
          price: 3999,
          interval: SubscriptionInterval.Monthly,
          maxUsers: 5,
          features: ["24/7 Tutor", "Academic Advisor", "Flashcards & Revision", "Practice Exams", "Goal Tracking", "Video Library", "Smart Notifications", "Motivation Coach"],
          description: "Shared access for 5 users with premium features"
        },
        {
          id: "institute-plan",
          name: "Institute Plan",
          type: PlanType.Institute,
          price: 19999,
          interval: SubscriptionInterval.Monthly,
          maxUsers: 50,
          features: ["24/7 Tutor", "Academic Advisor", "Flashcards & Revision", "Practice Exams", "Goal Tracking", "Video Library", "Smart Notifications", "Motivation Coach", "Mental Health Zone", "My Materials Vault", "Live Tutors"],
          description: "Institutional access for up to 50 students with admin dashboard"
        },
        {
          id: "corporate-plan",
          name: "Corporate Plan",
          type: PlanType.Corporate,
          price: 49999,
          interval: SubscriptionInterval.Monthly,
          maxUsers: 100,
          features: ["24/7 Tutor", "Academic Advisor", "Flashcards & Revision", "Practice Exams", "Goal Tracking", "Video Library", "Smart Notifications", "Motivation Coach", "Mental Health Zone", "My Materials Vault", "Live Tutors", "Collaborative Forum"],
          description: "Enterprise access for employees and their families with complete features"
        }
      ];
    }
  },

  updateSubscriptionPlan: async (updatedPlan: SubscriptionPlan): Promise<SubscriptionPlan> => {
    try {
      // Try to update via API
      const response = await apiClient.put(`${API_ENDPOINTS.ADMIN.SUBSCRIPTIONS}/${updatedPlan.id}`, updatedPlan);
      return response.data;
    } catch (error) {
      console.log("API not available, returning updated plan without saving", error);
      // Return the plan without actually saving it
      return updatedPlan;
    }
  },

  // New methods for student feature access
  getUserFeatureAccess: async (userId: string): Promise<{feature: string, hasAccess: boolean, usageLeft: number}[]> => {
    try {
      // Try to fetch from API
      const response = await apiClient.get(API_ENDPOINTS.STUDENTS.FEATURE_ACCESS(userId));
      return response.data;
    } catch (error) {
      console.log("API not available for feature access", error);
      // Return mock data
      const features = await featureService.getAllFeatures();
      return features.map(feature => ({
        feature: feature.title,
        hasAccess: !feature.isPremium,
        usageLeft: feature.freeAccessLimit?.limit || -1 // -1 means unlimited
      }));
    }
  },

  // Check if a user has access to a specific feature
  checkFeatureAccess: async (userId: string, featureTitle: string): Promise<{hasAccess: boolean, reason?: string, usageLeft?: number}> => {
    try {
      // Try to check via API
      const response = await apiClient.get(`${API_ENDPOINTS.STUDENTS.FEATURE_ACCESS(userId)}/${featureTitle}`);
      return response.data;
    } catch (error) {
      console.log("API not available for feature access check", error);
      // Return mock data - assume basic users have access to non-premium features
      const features = await featureService.getAllFeatures();
      const feature = features.find(f => f.title === featureTitle);
      if (!feature) {
        return { hasAccess: false, reason: "Feature not found" };
      }
      
      return { 
        hasAccess: !feature.isPremium,
        reason: feature.isPremium ? "Premium feature" : undefined,
        usageLeft: feature.freeAccessLimit?.limit || -1
      };
    }
  },

  // Export database schema for download
  exportDatabaseSchema: async () => {
    try {
      // Try to fetch from API
      const response = await apiClient.get(API_ENDPOINTS.ADMIN.DATABASE.SCHEMA);
      return response.data;
    } catch (error) {
      console.log("API not available for schema export", error);
      // Import from schemaExport
      const { generateDatabaseSchema } = await import('../utils/schemaExport');
      return generateDatabaseSchema();
    }
  }
};
