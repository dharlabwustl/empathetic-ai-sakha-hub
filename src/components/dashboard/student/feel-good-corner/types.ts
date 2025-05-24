
export interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  duration: string;
  category: string;
}

export interface Affirmation {
  id: string;
  text: string;
  category: string;
}

export interface Joke {
  id: string;
  text: string;
  type: string;
}

export interface DoodleSettings {
  brushSize: number;
  color: string;
  tool: 'brush' | 'eraser';
}
