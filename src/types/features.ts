
export type FeatureAccessLevel = 'free' | 'basic' | 'premium' | 'enterprise';

export interface Feature {
  id: string;
  title: string;
  description: string;
  path: string;
  icon?: React.ReactNode;
  isPremium: boolean;
  allowedPlans?: PlanType[];
  accessLevel: FeatureAccessLevel;
  freeAccessLimit?: {
    type: 'time' | 'usage' | 'content';
    limit: number;
  };
}

export interface FeatureGroup {
  id: string;
  name: string;
  features: Feature[];
}

export interface FeatureAccess {
  featureId: string;
  userId: string;
  accessLevel: FeatureAccessLevel;
  usageCount: number;
  lastAccessed?: string;
  trialEndsAt?: string;
}
