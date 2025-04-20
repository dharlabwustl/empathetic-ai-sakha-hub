
import { PlanType } from "@/services/featureService";
import { ReactNode } from "react";

export interface Feature {
  id?: string;
  title: string;
  description: string;
  path: string;
  icon: ReactNode;
  isPremium: boolean;
  allowedPlans?: PlanType[];
  freeAccessLimit?: {
    type: "time" | "usage" | "content";
    limit: number;
  };
}

export interface FeatureStats {
  total: number;
  premium: number;
  free: number;
  limited: number;
}
