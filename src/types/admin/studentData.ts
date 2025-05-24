
export interface StudentData {
  id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  joinedDate?: string;
  role: string;
  status: "active" | "inactive" | "pending";
  subjects?: string[];
  examPrep?: string;
  lastActive?: string;
  progress?: {
    completedTopics: number;
    totalTopics: number;
  };
}
