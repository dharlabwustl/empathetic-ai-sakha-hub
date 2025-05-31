
import { ExamType } from "../exams/exam";

export interface Subscription {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string[];
  examType: ExamType;
  bestValue?: boolean;
}

export interface CreditPack {
  id: string;
  name: string;
  description: string;
  credits: number;
  price: number;
  bestValue?: boolean;
  isExamCredits?: boolean;
}
