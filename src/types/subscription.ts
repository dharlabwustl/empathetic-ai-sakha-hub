
export enum SubscriptionType {
  FREE = 'FREE',
  PRO = 'PRO',
  PREMIUM = 'PREMIUM'
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
}
