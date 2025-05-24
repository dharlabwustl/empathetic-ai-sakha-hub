
export enum SubscriptionType {
  FREE = 'free',
  BASIC = 'basic',
  PRO = 'pro',
  PREMIUM = 'premium'
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  type: SubscriptionType;
  price: number;
  features: string[];
}
