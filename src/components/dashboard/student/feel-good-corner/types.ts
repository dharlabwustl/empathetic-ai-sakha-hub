
export interface ChatMessage {
  text: string;
  isUser: boolean;
}

export interface Joke {
  id: number;
  content: string;
  likes: number;
  author: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  duration: string;
  category: string;
  views: number;
  likes?: number;
  description?: string;
}
