
export enum SubscriptionType {
  FREE = "FREE",
  TRIAL = "TRIAL",
  BASIC = "BASIC",
  PREMIUM = "PREMIUM",
  PRO = "PRO",
  PRO_MONTHLY = "PRO_MONTHLY",
  PRO_ANNUAL = "PRO_ANNUAL"
}

export interface SubscriptionInfo {
  planType: string;
  startDate?: string | Date;
  expiryDate?: string | Date;
  status?: "active" | "expired" | "cancelled";
  autoRenew?: boolean;
  isActive?: boolean;
  features?: string[];
}
