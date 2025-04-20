
import { Feature } from "@/components/admin/features/types";

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

export interface SubscriptionPlan {
  id: string;
  name: string;
  type: PlanType;
  price: number;
  interval: SubscriptionInterval;
  features: string[];
  description: string;
  maxUsers?: number;
  trialDays?: number;
  isPopular?: boolean;
}

// Mock feature service for the admin panel
class FeatureService {
  async getFeatures(): Promise<Feature[]> {
    // Mock implementation
    return [
      {
        id: "1",
        title: "AI Personalized Study Plan",
        description: "Customized study plans based on user performance and goals",
        path: "/dashboard/study-plan",
        icon: "📊",
        isPremium: true,
        allowedPlans: [PlanType.Premium, PlanType.Corporate]
      },
      {
        id: "2",
        title: "Mock Tests",
        description: "Practice tests with real exam-like questions",
        path: "/dashboard/mock-tests",
        icon: "📝",
        isPremium: false
      }
    ];
  }
  
  // Alias for getFeatures to maintain compatibility
  async getAllFeatures(): Promise<Feature[]> {
    return this.getFeatures();
  }

  async updateFeature(feature: Feature): Promise<Feature> {
    console.log("Feature updated:", feature);
    return feature;
  }

  async createFeature(feature: Partial<Feature>): Promise<Feature> {
    const newFeature = {
      ...feature,
      id: Math.random().toString(36).substring(7)
    } as Feature;
    
    console.log("Feature created:", newFeature);
    return newFeature;
  }

  async deleteFeature(id: string): Promise<void> {
    console.log("Feature deleted:", id);
    return;
  }

  async toggleFeature(id: string, enabled: boolean): Promise<void> {
    console.log("Feature toggled:", id, enabled);
    return;
  }
  
  async toggleFeaturePremium(title: string, isPremium: boolean): Promise<void> {
    console.log("Feature premium status toggled:", title, isPremium);
    return;
  }
  
  // Subscription plan methods
  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return [
      {
        id: "free",
        name: "Free",
        type: PlanType.Free,
        price: 0,
        interval: SubscriptionInterval.Monthly,
        features: ["Limited access to content", "Basic features", "Community support"],
        description: "Start exploring with basic features"
      },
      {
        id: "basic",
        name: "Basic",
        type: PlanType.Basic,
        price: 499,
        interval: SubscriptionInterval.Monthly,
        features: ["Full access to content", "All basic features", "Email support", "Ad-free experience"],
        description: "Perfect for casual learners",
        trialDays: 7
      },
      {
        id: "premium",
        name: "Premium",
        type: PlanType.Premium,
        price: 999,
        interval: SubscriptionInterval.Monthly,
        features: ["Everything in Basic", "AI study assistant", "Personalized study plan", "24/7 priority support"],
        description: "Ideal for serious students",
        isPopular: true,
        trialDays: 14
      },
      {
        id: "group",
        name: "Group Plan",
        type: PlanType.Group,
        price: 1999,
        interval: SubscriptionInterval.Monthly,
        features: ["Everything in Premium", "Up to 5 members", "Group analytics", "Shared resources"],
        description: "Perfect for study groups",
        maxUsers: 5
      }
    ];
  }
  
  async updateSubscriptionPlan(plan: SubscriptionPlan): Promise<SubscriptionPlan> {
    console.log("Plan updated:", plan);
    return plan;
  }
}

// Create and export singleton instance
export const featureService = new FeatureService();

export default featureService;
