
export enum SubscriptionType {
  FREE = 'free',
  PRO = 'pro',
  GROUP = 'group'
}

export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  isExamCredits?: boolean;
  bestValue?: boolean;
}

export const creditPacks: CreditPack[] = [
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
    id: 'exam_credits_25',
    name: '25 Exam Credits',
    credits: 25,
    price: 149,
    isExamCredits: true
  },
  {
    id: 'exam_credits_50',
    name: '50 Exam Credits',
    credits: 50,
    price: 279,
    isExamCredits: true
  }
];
