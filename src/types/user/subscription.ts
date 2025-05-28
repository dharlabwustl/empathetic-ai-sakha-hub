
export enum SubscriptionType {
  FREE = 'free',
  BASIC = 'basic',
  PRO = 'pro',
  PREMIUM = 'premium',
  PRO_MONTHLY = 'pro_monthly',
  PRO_ANNUAL = 'pro_annual',
  GROUP_SMALL = 'group_small',
  GROUP_LARGE = 'group_large',
  GROUP_ANNUAL = 'group_annual',
  ENTERPRISE = 'enterprise'
}

export interface SubscriptionInfo {
  planType: string;
  startDate?: string | Date;
  expiryDate?: string | Date;
  status?: 'active' | 'expired' | 'cancelled';
  autoRenew?: boolean;
  features?: string[];
  isActive?: boolean;
  endDate?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  type: SubscriptionType | string;
  price: number;
  priceAnnual?: number;
  description: string;
  features: string[];
  highlighted?: boolean;
  popular?: boolean;
  buttonText?: string;
  maxMembers?: number;
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  bestValue?: boolean;
  isExamCredits?: boolean;
}

export const creditPacks: CreditPack[] = [
  {
    id: 'pack_10',
    name: '10 Credits',
    credits: 10,
    price: 99,
    description: 'Perfect for occasional use',
    bestValue: false,
    isExamCredits: true
  },
  {
    id: 'pack_50',
    name: '50 Credits',
    credits: 50,
    price: 399,
    description: 'Best value for regular users',
    bestValue: true,
    isExamCredits: true
  },
  {
    id: 'pack_100',
    name: '100 Credits',
    credits: 100,
    price: 699,
    description: 'For power users',
    bestValue: false,
    isExamCredits: true
  }
];

export const standardSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    type: SubscriptionType.FREE,
    price: 0,
    description: 'Basic features for getting started',
    features: ['Basic study plans', 'Limited practice tests', 'Community support'],
    buttonText: 'Current Plan'
  },
  {
    id: 'premium',
    name: 'Premium',
    type: SubscriptionType.PREMIUM,
    price: 499,
    priceAnnual: 4990,
    description: 'Full access to all features',
    features: ['Unlimited study plans', 'All practice tests', 'AI tutor', 'Priority support'],
    highlighted: true,
    popular: true,
    buttonText: 'Upgrade Now'
  }
];
