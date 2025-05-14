
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  url: string;
  views: number;
  likes: number;
  category: 'motivation' | 'relaxation' | 'tips' | 'success-stories';
  tags?: string[];
}
