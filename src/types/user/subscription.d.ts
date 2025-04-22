
import { SubscriptionType } from './base';

export interface UserSubscription {
  id: string;
  plan: SubscriptionType;
  status: 'active' | 'inactive' | 'pending' | 'expired';
  expiresAt: string;
  startedAt?: string;
  nextBillingDate?: string;
  amount?: number;
  currency?: string;
  paymentMethod?: string;
  autoRenew?: boolean;
  isGroupLeader?: boolean;
  groupMembers?: string[];
}
