
import { getFeatures } from "@/pages/dashboard/student/utils/FeatureManager";
import { ReactNode } from "react";

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
}

export const featureService = {
  getAllFeatures: async (): Promise<Feature[]> => {
    // In a real application, this would be fetched from an API
    // For now, we'll use our local utility function
    return getFeatures();
  },
  
  updateFeature: async (updatedFeature: Feature): Promise<Feature> => {
    // In a real application, this would update the feature in a database
    // For now, we'll just return the updated feature
    return updatedFeature;
  },
  
  toggleFeaturePremium: async (featureTitle: string, isPremium: boolean): Promise<boolean> => {
    // In a real application, this would update the feature's premium status in a database
    // For now, we'll just return success
    return true;
  },

  getSubscriptionPlans: async (): Promise<SubscriptionPlan[]> => {
    // In a real application, this would be fetched from an API
    return [
      {
        id: "free-plan",
        name: "Free Plan",
        type: PlanType.Free,
        price: 0,
        interval: SubscriptionInterval.Monthly,
        features: ["24/7 Tutor", "Academic Advisor", "Flashcards & Revision"],
        description: "Limited access to essential features"
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
  },

  updateSubscriptionPlan: async (updatedPlan: SubscriptionPlan): Promise<SubscriptionPlan> => {
    // In a real application, this would update the plan in a database
    return updatedPlan;
  }
};
