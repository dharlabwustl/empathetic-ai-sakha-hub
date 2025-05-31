
export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  validity: number; // days
  isPopular?: boolean;
  bestValue?: boolean;
  isExamCredits?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  duration: string;
  features: string[];
  isPopular?: boolean;
  maxUsers?: number;
  supportLevel: 'basic' | 'premium' | 'enterprise';
  isActive: boolean;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  plan: SubscriptionPlan;
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  startDate: string;
  endDate: string;
  remainingCredits?: number;
  autoRenew: boolean;
}
