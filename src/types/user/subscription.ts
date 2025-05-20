
export enum SubscriptionType {
  FREE = "free",
  TRIAL = "trial",
  BASIC = "basic",
  PREMIUM = "premium",
  PRO = "pro",
  PRO_MONTHLY = "pro_monthly",
  PRO_ANNUAL = "pro_annual",
  GROUP_SMALL = "group_small",
  GROUP_MEDIUM = "group_medium",
  GROUP_LARGE = "group_large",
  GROUP_ANNUAL = "group_annual",
  ENTERPRISE = "enterprise"
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  type: string;
  maxMembers?: number;
}

export interface SubscriptionInfo {
  planType: string | SubscriptionType;
  expiryDate?: string;
  startDate?: string;
  isActive?: boolean;
  features?: string[];
}

export interface PricingTier {
  name: string;
  description: string;
  price: {
    monthly?: number;
    annual?: number;
  };
  features: Array<{
    name: string;
    included: boolean;
    tooltip?: string;
  }>;
  highlights?: string[];
  recommended?: boolean;
  trial?: boolean;
  maxUsers?: number;
}

// Credit system types
export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  isExamCredits?: boolean;
  bestValue?: boolean;
}

export interface UserCredits {
  standard: number;
  exam: number;
}

// Standardized subscription plans that will be used across the application
export const standardSubscriptionPlans = {
  individual: [
    {
      id: 'free',
      name: 'Free Plan',
      price: 0,
      description: 'Basic access with limited features',
      features: [
        'Access to basic study materials',
        'Limited practice questions',
        'Community forum access',
        'One mock test per month'
      ],
      type: SubscriptionType.FREE
    },
    {
      id: 'basic',
      name: 'Basic',
      price: 299,
      priceAnnual: 2990,
      description: 'Essential features for serious students',
      features: [
        'Everything in Free',
        'Unlimited practice questions',
        'Personalized study plan',
        'Weekly performance reports',
        '10 mock tests per month'
      ],
      popular: true,
      type: SubscriptionType.BASIC,
      buttonText: 'Upgrade Now'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 499,
      priceAnnual: 4990,
      description: 'Advanced features for top performance',
      features: [
        'Everything in Basic',
        'AI-powered study assistant',
        'All premium study materials',
        'Video explanations',
        'Detailed performance analytics',
        'Unlimited mock tests'
      ],
      type: SubscriptionType.PREMIUM,
      buttonText: 'Go Premium'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 999,
      priceAnnual: 9990,
      description: 'The complete package for serious students',
      features: [
        'Everything in Premium',
        'Live doubt clearing sessions',
        'Personalized feedback',
        'Subject expert consultations',
        'Guaranteed score improvement'
      ],
      type: SubscriptionType.PRO,
      buttonText: 'Go Pro'
    }
  ],
  group: [
    {
      id: 'group_small',
      name: 'Group Small',
      price: 1999,
      priceAnnual: 19990,
      description: 'Perfect for small study groups',
      features: [
        'Access for up to 5 members',
        'Everything in Premium plan',
        'Team progress dashboard',
        'Collaborative study tools',
        'Group mock tests'
      ],
      type: SubscriptionType.GROUP_SMALL,
      maxMembers: 5
    },
    {
      id: 'group_medium',
      name: 'Group Medium',
      price: 3499,
      priceAnnual: 34990,
      description: 'Ideal for medium-sized groups',
      features: [
        'Access for up to 10 members',
        'Everything in Group Small',
        'Extended member management',
        'Advanced analytics',
        'Priority support'
      ],
      type: SubscriptionType.GROUP_MEDIUM,
      maxMembers: 10
    },
    {
      id: 'group_large',
      name: 'Group Large',
      price: 5999,
      priceAnnual: 59990,
      description: 'Complete solution for coaching institutes',
      features: [
        'Access for up to 20 members',
        'Everything in Group Medium',
        'Admin dashboard',
        'Custom branding',
        'API access',
        'Dedicated support'
      ],
      type: SubscriptionType.GROUP_LARGE,
      maxMembers: 20
    }
  ],
  creditPacks: [
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
      id: 'exam_credits_100',
      name: '100 Exam Credits',
      credits: 100,
      price: 499,
      isExamCredits: true
    }
  ]
};

export const creditPacks: CreditPack[] = standardSubscriptionPlans.creditPacks;
