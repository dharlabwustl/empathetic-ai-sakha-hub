
export enum SubscriptionType {
  FREE = 'free',
  BASIC = 'basic',
  PRO = 'pro',
  PREMIUM = 'premium',
  PRO_MONTHLY = 'pro_monthly',
  PRO_ANNUAL = 'pro_annual',
  GROUP_SMALL = 'group_small',
  GROUP_LARGE = 'group_large',
  GROUP_ANNUAL = 'group_annual'
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

export const standardSubscriptionPlans = {
  individual: [
    {
      id: 'free',
      name: 'Free',
      type: 'free',
      price: 0,
      description: 'Perfect for getting started with your exam preparation',
      features: [
        'Access to basic study materials',
        'Limited practice questions',
        'Basic progress tracking',
        'Community support'
      ],
      buttonText: 'Get Started'
    },
    {
      id: 'basic',
      name: 'Basic',
      type: 'basic',
      price: 199,
      priceAnnual: 1990,
      description: 'Essential tools for focused exam preparation',
      features: [
        'All Free features',
        'Unlimited practice questions',
        'Detailed performance analytics',
        'Study schedule planning',
        'Email support'
      ],
      buttonText: 'Choose Basic'
    },
    {
      id: 'premium',
      name: 'Premium',
      type: 'premium',
      price: 499,
      priceAnnual: 4990,
      description: 'Advanced features for serious exam preparation',
      features: [
        'All Basic features',
        'AI-powered personalized study plans',
        'Mock tests with detailed analysis',
        'Video explanations',
        'Priority support',
        '1-on-1 doubt clearing sessions'
      ],
      highlighted: true,
      popular: true,
      buttonText: 'Choose Premium'
    },
    {
      id: 'pro',
      name: 'Pro',
      type: 'pro',
      price: 999,
      priceAnnual: 9990,
      description: 'Complete exam preparation solution with expert guidance',
      features: [
        'All Premium features',
        'Live classes with expert teachers',
        'Unlimited doubt clearing',
        'Personalized mentoring',
        'Exam strategy sessions',
        'Guaranteed score improvement'
      ],
      buttonText: 'Choose Pro'
    }
  ],
  group: [
    {
      id: 'group_small',
      name: 'Team',
      type: 'group_small',
      price: 1999,
      priceAnnual: 19990,
      description: 'Perfect for small study groups',
      features: [
        'All Premium features for each member',
        'Group study dashboard',
        'Shared resources and notes',
        'Group performance analytics',
        'Collaborative study tools'
      ],
      maxMembers: 5,
      buttonText: 'Choose Team'
    },
    {
      id: 'group_medium',
      name: 'Class',
      type: 'group_medium',
      price: 3999,
      priceAnnual: 39990,
      description: 'Ideal for medium-sized groups',
      features: [
        'All Team features',
        'Advanced group analytics',
        'Custom group challenges',
        'Teacher dashboard access',
        'Bulk content management'
      ],
      maxMembers: 15,
      buttonText: 'Choose Class'
    },
    {
      id: 'group_large',
      name: 'Enterprise',
      type: 'group_large',
      price: 7999,
      priceAnnual: 79990,
      description: 'Complete solution for large organizations',
      features: [
        'All Class features',
        'Unlimited members',
        'Custom branding options',
        'Dedicated account manager',
        'Advanced reporting and analytics',
        'API access for integrations'
      ],
      maxMembers: 50,
      buttonText: 'Choose Enterprise'
    }
  ]
};
