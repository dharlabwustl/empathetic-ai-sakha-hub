
export enum SubscriptionType {
  FREE = 'free',
  BASIC = 'basic',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise',
  GROUP = 'group'
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billing: 'monthly' | 'annual';
  features: string[];
  userCount?: number;
  isPopular?: boolean;
  type: string;
}
