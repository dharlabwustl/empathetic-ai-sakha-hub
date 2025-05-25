
export enum SubscriptionType {
  FREE = 'free',
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
