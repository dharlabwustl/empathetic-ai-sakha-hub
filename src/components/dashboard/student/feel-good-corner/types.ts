
import { MoodType } from '@/types/user/base';

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  duration: string;
  category: string;
  mood?: MoodType;
  tags: string[];
}

export interface Music {
  id: string;
  title: string;
  artist: string;
  cover: string;
  url: string;
  duration: string;
  mood?: MoodType;
  category: string;
}

export interface SuccessStory {
  id: string;
  name: string;
  avatar: string;
  exam: string;
  year: string;
  achievement: string;
  quote: string;
  story: string;
  tips: string[];
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  tags: string[];
  mood?: MoodType;
}
