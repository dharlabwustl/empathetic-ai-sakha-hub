
import { UserProfileType } from './base';

export interface FounderProfile extends UserProfileType {
  companyName?: string;
  companyRole?: string;
  foundingYear?: number;
  industry?: string;
  companySize?: string;
  funding?: {
    stage: "bootstrap" | "seed" | "series-a" | "series-b" | "series-c" | "public";
    amount?: number;
    investors?: string[];
    lastRound?: string;
  };
  metrics?: {
    revenue?: number;
    growth?: number;
    users?: number;
    monthlyActiveUsers?: number;
  };
  startups?: {
    name: string;
    role: string;
    status: "active" | "exited" | "failed";
    yearFounded: number;
    exitYear?: number;
  }[];
}
