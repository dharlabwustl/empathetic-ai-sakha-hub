
export type PlanType = 'free' | 'basic' | 'premium' | 'enterprise' | 'group' | 'institute' | 'corporate';

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
}

export interface Feature {
  id?: string;
  title: string;
  description: string;
  path: string;
  icon: string;
  isPremium: boolean;
  allowedPlans?: PlanType[];
  freeAccessLimit?: {
    type: 'usage' | 'content';
    limit: number;
  };
}

export interface FeatureSettings {
  enableBetaFeatures: boolean;
  defaultPremiumAccess: boolean;
  freePlanAccess: string[];
}

export interface FeatureStats {
  totalFeatures: number;
  premiumFeatures: number;
  freeFeatures: number;
  mostUsedFeature: {
    id: string;
    title: string;
    usageCount: number;
  };
}

// Mock subscription plans
const MOCK_SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "free-plan",
    name: "Free Plan",
    type: "free",
    price: 0,
    interval: SubscriptionInterval.Monthly,
    features: ["Basic chat support", "Limited study materials", "Progress tracking"],
    description: "Basic features to get you started"
  },
  {
    id: "basic-plan",
    name: "Basic Plan",
    type: "basic",
    price: 499,
    interval: SubscriptionInterval.Monthly,
    features: ["Unlimited chat support", "Full study materials", "Progress tracking", "Personalized study plans"],
    description: "Essential features for serious students",
    trialDays: 7
  },
  {
    id: "premium-plan",
    name: "Premium Plan",
    type: "premium",
    price: 999,
    interval: SubscriptionInterval.Monthly,
    features: [
      "All Basic Plan features",
      "Mock tests with analysis",
      "Personalized feedback",
      "Live doubt clearing sessions",
      "Premium study materials"
    ],
    description: "Comprehensive package for dedicated students",
    trialDays: 7
  },
  {
    id: "group-plan",
    name: "Group Plan",
    type: "group",
    price: 1999,
    interval: SubscriptionInterval.Monthly,
    features: [
      "All Premium Plan features",
      "Group study sessions",
      "Collaborative learning tools",
      "Shared resources",
      "Group analytics"
    ],
    description: "Perfect for study groups",
    maxUsers: 5
  },
  {
    id: "institute-plan",
    name: "Institute Plan",
    type: "institute",
    price: 9999,
    interval: SubscriptionInterval.Monthly,
    features: [
      "All Premium Plan features",
      "Customized institute branding",
      "Centralized administration",
      "Batch management",
      "Performance analytics",
      "Content customization"
    ],
    description: "Complete solution for educational institutes",
    maxUsers: 100
  }
];

// Mock feature service
export const featureService = {
  getFeatures: async (): Promise<Feature[]> => {
    return [
      {
        id: "feature1",
        title: "AI Tutor",
        description: "Get instant help with any subject",
        path: "/dashboard/student/tutor",
        icon: "message-square",
        isPremium: false
      },
      {
        id: "feature2",
        title: "Study Plan Generator",
        description: "Create personalized study plans",
        path: "/dashboard/student/study-plan",
        icon: "calendar",
        isPremium: false
      },
      {
        id: "feature3",
        title: "Mock Tests",
        description: "Practice with realistic exam simulations",
        path: "/dashboard/student/mock-tests",
        icon: "file-text",
        isPremium: true
      }
    ];
  },
  
  getAllFeatures: async (): Promise<Feature[]> => {
    // This is the same as getFeatures but added for compatibility
    return await featureService.getFeatures();
  },
  
  getFeatureSettings: async (): Promise<FeatureSettings> => {
    return {
      enableBetaFeatures: false,
      defaultPremiumAccess: false,
      freePlanAccess: ["AI Tutor", "Basic Analytics"]
    };
  },
  
  getFeatureStats: async (): Promise<FeatureStats> => {
    return {
      totalFeatures: 15,
      premiumFeatures: 8,
      freeFeatures: 7,
      mostUsedFeature: {
        id: "feature1",
        title: "AI Tutor",
        usageCount: 1245
      }
    };
  },
  
  updateFeature: async (feature: Feature): Promise<Feature> => {
    console.log('Feature updated', feature);
    return feature;
  },
  
  createFeature: async (feature: Feature): Promise<Feature> => {
    const newFeature = { ...feature, id: `feature-${Date.now()}` };
    console.log('Feature created', newFeature);
    return newFeature;
  },
  
  toggleFeature: async (featureId: string, enabled: boolean): Promise<void> => {
    console.log(`Feature ${featureId} toggled to ${enabled}`);
  },
  
  toggleFeaturePremium: async (featureId: string, isPremium: boolean): Promise<void> => {
    console.log(`Feature ${featureId} premium status set to ${isPremium}`);
  },
  
  getSubscriptionPlans: async (): Promise<SubscriptionPlan[]> => {
    return MOCK_SUBSCRIPTION_PLANS;
  },
  
  updateSubscriptionPlan: async (plan: SubscriptionPlan): Promise<SubscriptionPlan> => {
    console.log('Plan updated:', plan);
    return plan;
  }
};
