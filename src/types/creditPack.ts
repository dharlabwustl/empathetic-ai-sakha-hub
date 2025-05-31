
export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  description: string;
  bestValue?: boolean;
  isExamCredits?: boolean;
  features?: string[];
}

export interface TutorFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  credits: number;
  isFree: boolean;
  isPremium: boolean;
}
