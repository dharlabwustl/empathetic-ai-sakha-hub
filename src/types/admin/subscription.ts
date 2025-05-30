
export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  description?: string;
  bestValue?: boolean;
  isExamCredits?: boolean;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: 'monthly' | 'yearly';
  features: string[];
  popular?: boolean;
  savings?: string;
}

export interface SubscriptionStats {
  totalRevenue: number;
  activeSubscriptions: number;
  churnRate: number;
  averageRevenuePerUser: number;
  monthlyGrowth: number;
}
