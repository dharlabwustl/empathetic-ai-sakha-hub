
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
  tasks?: StudyGroupTask[];
  discussions?: StudyGroupDiscussion[];
  notes?: StudyGroupNote[];
  challenges?: StudyGroupChallenge[];
  reviews?: StudyGroupReview[];
}

export interface StudyGroupTask {
  id: string;
  title: string;
  description: string;
  dueDate?: Date;
  status: 'pending' | 'in-progress' | 'completed';
  assignedTo?: string[];
}

export interface StudyGroupNote {
  id: string;
  title: string;
  content: string;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: Date;
  lastModified?: Date;
  attachments?: string[];
  tags?: string[];
}

export interface StudyGroupDiscussion {
  id: string;
  topic: string;
  messages: StudyGroupMessage[];
  createdAt: Date;
  isActive: boolean;
}

export interface StudyGroupMessage {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  timestamp: Date;
  reactions?: {
    type: string;
    count: number;
  }[];
  attachments?: string[];
}

export interface StudyGroupReview {
  id: string;
  title: string;
  description: string;
  submittedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  submittedAt: Date;
  type: 'answer' | 'essay' | 'notes' | 'other';
  status: 'pending' | 'reviewed';
  reviews?: {
    reviewerId: string;
    reviewerName: string;
    reviewerAvatar?: string;
    rating: number;
    comment: string;
    submittedAt: Date;
  }[];
}

export interface StudyGroupChallenge {
  id: string;
  title: string;
  description: string;
  type: 'quiz' | 'problem' | 'activity' | 'reading';
  difficulty: 'easy' | 'medium' | 'hard';
  points: number;
  dueDate: Date;
  status: 'active' | 'completed';
  completedBy?: {
    userId: string;
    name: string;
    avatar?: string;
    completedAt: Date;
    points: number;
  }[];
  totalParticipants: number;
  successRate: number;
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
