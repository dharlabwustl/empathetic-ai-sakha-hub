
export interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  bonus?: number;
  popular?: boolean;
  bestValue?: boolean;
  isExamCredits?: boolean;
  description?: string;
  features?: string[];
}

export interface CreditTransaction {
  id: string;
  userId: string;
  packId: string;
  credits: number;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
}

export interface UserCredits {
  userId: string;
  totalCredits: number;
  usedCredits: number;
  availableCredits: number;
  lastUpdated: string;
  transactions: CreditTransaction[];
}
