
export interface StudentData {
  id: string;
  name: string;
  email: string;
  joinedDate: Date | string;
  examType?: string;
  registrationDate?: Date;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  subjects?: string[];
  examPrep?: string;
  lastActive?: Date | string;
  progress?: number;
}
