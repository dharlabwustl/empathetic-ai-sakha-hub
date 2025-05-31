
export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  currency: string;
  description: string;
  popular?: boolean;
  bestValue?: boolean;
  isExamCredits?: boolean;
}
