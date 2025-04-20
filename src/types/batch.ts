
export type BatchMemberRole = "member" | "leader" | "school_admin" | "corporate_admin";

export interface BatchMember {
  id: string;
  name: string;
  email: string;
  role: BatchMemberRole;
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
  ownerId: string;
  planType: "group" | "school" | "corporate";
  maxMembers: number;
  createdAt: string;
  members: BatchMember[];
}
