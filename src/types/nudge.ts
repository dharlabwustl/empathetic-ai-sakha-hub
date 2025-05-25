
export interface NudgeData {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  read?: boolean;
  actionUrl?: string;
  actionText?: string;
}
