
export interface BatchMember {
  id: string;
  name: string;
  email: string;
  role: "member" | "leader" | "school_admin" | "corporate_admin";
  status: "active" | "pending" | "inactive";
  joinedDate?: string;
  invitationCode?: string;
  avatar?: string;
}

export interface BatchDetails {
  id: string;
  name: string;
  createdAt: string;
  owner: BatchMember;
  members: BatchMember[];
  maxMembers: number;
  planType: "group" | "school" | "corporate";
}
