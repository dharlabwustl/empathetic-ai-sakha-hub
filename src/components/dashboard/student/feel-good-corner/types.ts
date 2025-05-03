
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

export interface VoiceAnnouncement {
  id: string;
  text: string;
  type: 'greeting' | 'task' | 'reminder' | 'achievement';
  priority: 'low' | 'medium' | 'high';
  timeToAnnounce?: Date;
}
