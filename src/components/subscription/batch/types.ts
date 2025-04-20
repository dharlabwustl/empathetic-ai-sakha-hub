
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

export interface BatchInfo {
  name: string;
  planType: "group" | "school" | "corporate";
  maxMembers: number;
  currentUserRole: "member" | "leader" | "school_admin" | "corporate_admin";
}
