
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
