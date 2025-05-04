
export interface StudyGroupMember {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
}

export interface StudyGroupPlan {
  id: string;
  title: string;
  progress: number;
}

export interface StudyGroup {
  id: string;
  name: string;
  description: string;
  subject: string;
  isActive: boolean;
  adminId: string;
  meetingFrequency: string;
  nextMeeting?: Date;
  coverImage?: string;
  members?: StudyGroupMember[];
  tags?: string[];
  studyPlan?: StudyGroupPlan;
}
