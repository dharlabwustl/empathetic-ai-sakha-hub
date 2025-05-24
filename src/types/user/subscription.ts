
export enum SubscriptionType {
  FREE = 'free',
  PRO = 'pro',
  GROUP = 'group',
  BASIC = 'basic',
  PREMIUM = 'premium',
  ENTERPRISE = 'enterprise',
  PRO_MONTHLY = 'pro_monthly'
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  isExamCredits?: boolean;
  bestValue?: boolean;
}

export const creditPacks: CreditPack[] = [
  {
    id: 'credits_50',
    name: '50 Credits',
    credits: 50,
    price: 99,
    isExamCredits: false
  },
  {
    id: 'credits_100',
    name: '100 Credits',
    credits: 100,
    price: 179,
    isExamCredits: false,
    bestValue: true
  },
  {
    id: 'credits_250',
    name: '250 Credits',
    credits: 250,
    price: 399,
    isExamCredits: false
  },
  {
    id: 'exam_credits_25',
    name: '25 Exam Credits',
    credits: 25,
    price: 149,
    isExamCredits: true
  },
  {
    id: 'exam_credits_50',
    name: '50 Exam Credits',
    credits: 50,
    price: 279,
    isExamCredits: true
  }
];

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  billingCycle: 'monthly' | 'yearly';
  features: string[];
  maxUsers?: number;
  isPopular?: boolean;
  description?: string;
}

export const standardSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    billingCycle: 'monthly',
    features: [
      'Basic concept cards',
      'Limited flashcards',
      'Basic study plan',
      'Community support'
    ],
    description: 'Perfect for getting started'
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 999,
    billingCycle: 'monthly',
    features: [
      'Unlimited concept cards',
      'AI-powered study plans',
      'Advanced analytics',
      'Priority support',
      'Exam practice tests'
    ],
    isPopular: true,
    description: 'Most popular for serious learners'
  },
  {
    id: 'group',
    name: 'Group',
    price: 2999,
    billingCycle: 'monthly',
    features: [
      'Everything in Pro',
      'Batch management',
      'Group analytics',
      'Collaborative tools',
      'Admin dashboard'
    ],
    maxUsers: 50,
    description: 'Perfect for institutions'
  }
];
