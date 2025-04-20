
export type PlanType = 'free' | 'basic' | 'premium' | 'enterprise';

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
  }
};
