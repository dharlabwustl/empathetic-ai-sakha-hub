
export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'canceled' | 'expired' | 'pending' | 'trial';
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  planName: string;
  price: number;
  interval: 'monthly' | 'quarterly' | 'yearly';
  features: string[];
  maxMembers?: number;
  currentMembers?: number;
}

export interface BatchInvitation {
  id: string;
  batchId: string;
  code: string;
  email?: string;
  status: 'pending' | 'accepted' | 'expired';
  createdAt: string;
  expiresAt: string;
}

export interface BatchMember {
  id: string;
  userId: string;
  batchId: string;
  role: 'leader' | 'member';
  joinedAt: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'active' | 'suspended';
}
