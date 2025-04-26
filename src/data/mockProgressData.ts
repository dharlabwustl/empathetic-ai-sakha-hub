
import { ProgressItem } from "@/types/progress";

export const mockProgressData: ProgressItem[] = [
  {
    id: "c1",
    name: "Electric Charges and Fields",
    progress: 100,
    status: "completed",
    lastPracticed: "2023-10-15",
    score: 95,
    completed: true,
    masteryLevel: 4
  },
  {
    id: "c2",
    name: "Electrostatic Potential and Capacitance",
    progress: 100,
    status: "completed",
    lastPracticed: "2023-10-12",
    score: 82,
    completed: true,
    masteryLevel: 3
  },
  {
    id: "c3",
    name: "Current Electricity",
    progress: 65,
    status: "in-progress",
    lastPracticed: "2023-10-05",
    score: 0,
    completed: false,
    masteryLevel: 2
  },
  {
    id: "c4",
    name: "Moving Charges and Magnetism",
    progress: 25,
    status: "in-progress",
    lastPracticed: "2023-09-28",
    score: 0,
    completed: false,
    masteryLevel: 1
  },
  {
    id: "c5",
    name: "Magnetism and Matter",
    progress: 0,
    status: "not-started",
    lastPracticed: "",
    score: 0,
    completed: false,
    masteryLevel: 0
  },
  {
    id: "q1",
    name: "Weekly Physics Quiz",
    progress: 100,
    status: "completed",
    lastPracticed: "2023-10-17",
    score: 88,
    questionCount: 15,
    correctAnswers: 13,
    timeSpent: "00:25:30"
  },
  {
    id: "q2",
    name: "Magnetism Practice Test",
    progress: 100,
    status: "completed",
    lastPracticed: "2023-10-10",
    score: 75,
    questionCount: 20,
    correctAnswers: 15,
    timeSpent: "00:35:45"
  }
];

export const mockFlashcardProgressData = [
  {
    id: "f1",
    name: "Physics Fundamentals",
    progress: 70,
    status: "in-progress",
    lastPracticed: "2023-10-16",
    cardsCount: 50,
    masteredCards: 35
  },
  {
    id: "f2",
    name: "Chemistry Formulas",
    progress: 90,
    status: "completed",
    lastPracticed: "2023-10-14",
    cardsCount: 30,
    masteredCards: 27
  },
  {
    id: "f3",
    name: "Mathematics Formulas",
    progress: 40,
    status: "in-progress",
    lastPracticed: "2023-10-08",
    cardsCount: 45,
    masteredCards: 18
  }
];
