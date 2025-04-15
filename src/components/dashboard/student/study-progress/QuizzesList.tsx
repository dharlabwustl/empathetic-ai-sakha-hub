import React from "react";
import { SubjectProgress } from "@/types/user";

interface QuizzesListProps {
  subject: SubjectProgress;
}

const QuizzesList: React.FC<QuizzesListProps> = ({ subject }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Quizzes Performance</h3>
      {subject.quizScores.length === 0 ? (
        <p className="text-gray-500">No quizzes taken yet for this subject.</p>
      ) : (
        <ul className="list-disc pl-5">
          {subject.quizScores.map((quiz) => (
            <li key={quiz.id} className="mb-1">
              {quiz.title} - Score: {quiz.score}/{quiz.maxScore} ({((quiz.score / quiz.maxScore) * 100).toFixed(0)}%)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuizzesList;
