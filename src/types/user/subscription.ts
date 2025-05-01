
export enum SubscriptionType {
  FREE = "free",
  TRIAL = "trial",
  BASIC = "basic",
  PREMIUM = "premium",
  PRO_MONTHLY = "pro_monthly",
  PRO_ANNUAL = "pro_annual",
  GROUP_SMALL = "group_small",
  GROUP_MEDIUM = "group_medium",
  GROUP_LARGE = "group_large",
  ENTERPRISE = "enterprise"
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  type: string;
  maxMembers?: number;
}

export interface SubscriptionInfo {
  planType: string | SubscriptionType;
  expiryDate?: string;
  startDate?: string;
  isActive?: boolean;
  features?: string[];
}

export interface PricingTier {
  name: string;
  description: string;
  price: {
    monthly?: number;
    annual?: number;
  };
  features: Array<{
    name: string;
    included: boolean;
    tooltip?: string;
  }>;
  highlights?: string[];
  recommended?: boolean;
  trial?: boolean;
  maxUsers?: number;
}
