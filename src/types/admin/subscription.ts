
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
  features: string[];
  popular?: boolean;
}
