
export enum SubscriptionType {
  FREE = "FREE",
  TRIAL = "TRIAL",
  BASIC = "BASIC",
  PREMIUM = "PREMIUM",
  PRO = "PRO",
  PRO_MONTHLY = "PRO_MONTHLY",
  PRO_ANNUAL = "PRO_ANNUAL",
  ENTERPRISE = "ENTERPRISE"
}

export interface SubscriptionInfo {
  planType: string;
  startDate?: string | Date;
  expiryDate?: string | Date;
  status?: "active" | "expired" | "cancelled";
  autoRenew?: boolean;
  isActive?: boolean;
  features?: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  priceAnnual?: number;
  features: string[];
  type: 'individual' | 'group' | 'institution';
  maxMembers?: number;
  popularChoice?: boolean;
}

export const standardSubscriptionPlans = {
  individual: [
    {
      id: 'free',
      name: 'Free Plan',
      price: 0,
      features: [
        'Access to basic study materials',
        'Limited practice questions',
        'Community forum access',
        'One mock test per month'
      ],
      type: 'individual'
    },
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 499,
      priceAnnual: 4999,
      features: [
        'All Free features',
        'Unlimited practice questions',
        'Personalized study plan',
        'Weekly performance reports',
        '10+ mock tests per month'
      ],
      popularChoice: true,
      type: 'individual'
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 999,
      priceAnnual: 9999,
      features: [
        'All Basic features',
        'AI-powered study assistant',
        'All premium study materials',
        'Video explanations',
        'Detailed performance analytics'
      ],
      type: 'individual'
    },
    {
      id: 'pro',
      name: 'Pro Plan',
      price: 1499,
      priceAnnual: 14999,
      features: [
        'All Premium features',
        'Live doubt clearing sessions',
        'Personalized feedback',
        'Subject expert consultations',
        'Exam strategy sessions'
      ],
      type: 'individual'
    }
  ],
  group: [
    {
      id: 'group_small',
      name: 'Small Group',
      price: 3999,
      priceAnnual: 39999,
      features: [
        'All Pro features for all members',
        'Shared study resources',
        'Group analytics',
        'Teacher dashboard',
        'Group chat and collaboration'
      ],
      type: 'group',
      maxMembers: 5
    },
    {
      id: 'group_medium',
      name: 'Medium Group',
      price: 7999,
      priceAnnual: 79999,
      features: [
        'All Small Group features',
        'Customized learning paths',
        'Bulk user management',
        'Additional teacher accounts',
        'Priority support'
      ],
      type: 'group',
      maxMembers: 15
    },
    {
      id: 'group_large',
      name: 'Large Group',
      price: 14999,
      priceAnnual: 149999,
      features: [
        'All Medium Group features',
        'API access for integration',
        'Branded portal',
        'Dedicated account manager',
        'Custom reporting'
      ],
      type: 'group',
      maxMembers: 50
    }
  ]
};

export interface CreditPack {
  id: string;
  name: string;
  price: number;
  credits: number;
  isExamCredits?: boolean;
  bestValue?: boolean;
}

export const creditPacks: CreditPack[] = [
  {
    id: 'basic_cards',
    name: '100 Credits',
    price: 499,
    credits: 100
  },
  {
    id: 'standard_cards',
    name: '300 Credits',
    price: 999,
    credits: 300
  },
  {
    id: 'premium_cards',
    name: '1000 Credits',
    price: 2499,
    credits: 1000,
    bestValue: true
  },
  {
    id: 'exam_credits',
    name: '50 Exam Credits',
    price: 1499,
    credits: 50,
    isExamCredits: true
  }
];
