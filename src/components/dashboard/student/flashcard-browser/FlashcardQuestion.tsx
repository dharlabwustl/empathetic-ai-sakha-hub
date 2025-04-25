
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface FlashcardQuestionProps {
  topic: string;
  question: string;
}

const FlashcardQuestion = ({ topic, question }: FlashcardQuestionProps) => {
  return (
    <div className="text-center space-y-4">
      <Badge variant="secondary">{topic}</Badge>
      <h2 className="text-2xl font-semibold">{question}</h2>
    </div>
  );
};

export default FlashcardQuestion;
