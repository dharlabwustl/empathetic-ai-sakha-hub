
export interface RevisionItem {
  id: string;
  title: string;
  type: 'flashcard' | 'concept' | 'exam';
  subject: string;
  lastReviewed: string;
  dueDate: string;
  progress: number;
}

export interface DashboardFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
  isNew?: boolean;
  isComingSoon?: boolean;
}
