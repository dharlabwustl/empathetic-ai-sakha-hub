
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
  createdAt: string;
  expiryDate?: string;
  planType: 'group' | 'school' | 'corporate';
  maxMembers: number;
  members: BatchMember[];
}

export interface GroupSetupFormData {
  batchName: string;
  roleType: string;
  inviteMethod: 'email' | 'code';
  emails: string[];
}
