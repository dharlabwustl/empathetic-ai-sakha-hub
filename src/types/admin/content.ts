
export interface ContentItem {
  id: string;
  title: string;
  type: 'video' | 'article' | 'quiz' | 'flashcard';
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  status: 'published' | 'draft' | 'archived';
  tags: string[];
  subjects?: string[];
  thumbnail?: string;
  viewCount?: number;
  likes?: number;
  dislikes?: number;
}

export interface NotificationTemplate {
  id: string;
  title: string;
  type: 'email' | 'push' | 'sms' | 'in-app';
  content: string;
  variables: string[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface FeelGoodContent {
  id: string;
  content: string;
  type: 'quote' | 'joke' | 'fact' | 'affirmation';
  mood: 'happy' | 'motivated' | 'calm' | 'focused';
  source?: string;
  createdAt: string;
}
