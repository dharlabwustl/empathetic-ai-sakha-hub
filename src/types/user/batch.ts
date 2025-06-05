
export interface BatchCreationData {
  batchName: string;
  description?: string;
  maxMembers: number;
}

export interface Batch {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  memberCount: number;
  maxMembers: number;
  leaderId: string;
}
