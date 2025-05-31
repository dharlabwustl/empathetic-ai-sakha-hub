
export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  popular?: boolean;
  bestValue?: boolean;
  isExamCredits?: boolean;
  features: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
  description?: string;
}
