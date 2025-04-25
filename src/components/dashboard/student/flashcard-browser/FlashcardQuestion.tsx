
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Volume2, Bookmark, Link, FileText } from 'lucide-react';

interface FlashcardQuestionProps {
  topic: string;
  question: string;
  answer: string;
  isFlipped: boolean;
  currentQuestionIndex: number;
  totalQuestions: number;
  onFlip: () => void;
  onBookmark: () => void;
  onReplayAudio: () => void;
  onMarkDone: () => void;
  onViewConcept: () => void;
  voiceEnabled: boolean;
}

const FlashcardQuestion = ({ 
  topic, 
  question, 
  answer,
  isFlipped,
  currentQuestionIndex,
  totalQuestions,
  onFlip,
  onBookmark,
  onReplayAudio,
  onMarkDone,
  onViewConcept,
  voiceEnabled
}: FlashcardQuestionProps) => {
  return (
    <div className="relative perspective-1000">
      <div 
        className={`relative w-full transition-transform duration-500 transform-style-preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front side */}
        <div className={`${isFlipped ? "hidden" : "block"} text-center space-y-4`}>
          <div className="flex justify-between items-center">
            <Badge variant="secondary">{topic}</Badge>
            <span className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} of {totalQuestions}
            </span>
          </div>
          <h2 className="text-2xl font-semibold">{question}</h2>
          <Button
            variant="ghost"
            onClick={onFlip}
            className="mt-4"
          >
            Click to Flip ↻
          </Button>
        </div>

        {/* Back side */}
        <div className={`${isFlipped ? "block" : "hidden"} text-center space-y-4 bg-gray-50 p-6 rounded-lg`}>
          <div className="flex justify-between items-center">
            <Badge variant="outline">{topic}</Badge>
            <span className="text-sm text-gray-500">Answer</span>
          </div>
          
          <div className="text-lg">{answer}</div>
          
          <div className="flex justify-center gap-2 mt-4">
            {voiceEnabled && (
              <Button variant="outline" size="sm" onClick={onReplayAudio}>
                <Volume2 className="h-4 w-4 mr-1" />
                Replay
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={onBookmark}>
              <Bookmark className="h-4 w-4 mr-1" />
              Bookmark
            </Button>
            <Button variant="outline" size="sm" onClick={onViewConcept}>
              <FileText className="h-4 w-4 mr-1" />
              View Concept
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={onFlip}
            className="mt-4"
          >
            Back to Question ↻
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardQuestion;
