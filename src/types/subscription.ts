
export const SubscriptionType = {
  FREE: 'free',
  BASIC: 'basic',
  PRO: 'pro',
  PREMIUM: 'premium',
  PRO_MONTHLY: 'pro_monthly',
  PRO_YEARLY: 'pro_yearly',
  GROUP: 'group'
} as const;

export type SubscriptionType = typeof SubscriptionType[keyof typeof SubscriptionType];

export interface SubscriptionPlan {
  id: string;
  name: string;
  type: SubscriptionType;
  price: number;
  features: string[];
}

export interface Subscription {
  type: SubscriptionType;
  startDate: string;
  endDate: string;
  isActive: boolean;
  planType: string;
  features: string[];
  memberLimit: number;
  expiryDate?: string | Date;
  status?: 'active' | 'expired' | 'cancelled';
  autoRenew?: boolean;
}
