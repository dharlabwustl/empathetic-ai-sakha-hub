
export interface BatchMember {
  id: string;
  name: string;
  email: string;
  role: "member" | "leader" | "school_admin" | "corporate_admin";
  status: "active" | "pending" | "inactive";
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
  owner: BatchMember;
  members: BatchMember[];
  maxMembers: number;
  planType: "group" | "school" | "corporate";
  institutionName?: string;
  expiryDate?: string;
}

export interface BatchProgress {
  id: string;
  batchId: string;
  averageCompletion: number;
  activeMembers: number;
  totalMembers: number;
  lastUpdateDate: string;
}

export interface GroupSetupFormData {
  batchName: string;
  roleType: string;
  inviteMethod: 'email' | 'code';
  emails: string[];
}

export interface BatchInvitationInputProps {
  onActivate?: (code: string) => Promise<boolean>;
  activationSuccess?: boolean;
  onJoinBatch: (code: string) => Promise<boolean>;
}

export interface BatchManagementProps {
  batchMembers: BatchMember[];
  batchName: string;
  planType: "group" | "school" | "corporate";
  maxMembers: number;
  currentUserRole: "leader" | "member" | "school_admin" | "corporate_admin";
  onAddMember: (email: string) => Promise<boolean>;
  onRemoveMember: (id: string) => Promise<boolean>;
  onChangeBatchName: (name: string) => Promise<boolean>;
  onTransferOwnership: (memberId: string) => Promise<boolean>;
}

export interface SubscriptionPlansProps {
  currentPlanId?: string;
  onSelectPlan?: (plan: any, isGroup?: boolean) => void;
  showGroupOption?: boolean;
}
