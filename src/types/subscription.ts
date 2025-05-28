
export enum SubscriptionType {
  FREE = 'free',
  BASIC = 'basic',
  PRO = 'pro',
  PREMIUM = 'premium'
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

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  type: SubscriptionType;
  popular?: boolean;
}
