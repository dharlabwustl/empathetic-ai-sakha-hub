
export interface BatchMember {
  id: string;
  name: string;
  email: string;
  role: "member" | "leader" | "school_admin" | "corporate_admin";
  status: "active" | "inactive" | "pending";
  joinedDate?: string;
  invitationCode?: string;
  avatar?: string;
  progress?: {
    completedTopics: number;
    totalTopics: number;
    lastActiveDate?: string;
  };
}

export interface BatchDetails {
  id: string;
  name: string;
  description?: string;
  leaderName: string;
  leaderEmail: string;
  createdAt: string;
  memberCount: number;
  maxMembers: number;
  invitationCode: string;
  expiryDate?: string;
  plan: string;
  institution?: string;
}
