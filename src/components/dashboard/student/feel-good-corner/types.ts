
export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Joke {
  id: number;
  text: string;
  type: string;
  likes?: number;
  author?: string;
  content?: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
}

export interface MoodContent {
  activities: string[];
  music: string[];
  quotes: string[];
}
