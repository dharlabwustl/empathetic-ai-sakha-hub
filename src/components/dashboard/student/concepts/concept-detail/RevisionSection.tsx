
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, RotateCw, CheckCircle2 } from 'lucide-react';
import '@/styles/flashcard-animations.css';

interface RevisionSectionProps {
  conceptId: string;
  isFlagged: boolean;
  onToggleFlag: () => void;
}

const RevisionSection: React.FC<RevisionSectionProps> = ({
  conceptId,
  isFlagged,
  onToggleFlag
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // In a real app, this would come from your spaced repetition algorithm
  const nextRevisionData = {
    date: "Tomorrow",
    time: "10:00 AM",
  };

  // Mock practice questions for the flashcard
  const practiceQuestion = {
    question: "What happens to an object in motion when no external force acts on it?",
    answer: "It continues to move at constant velocity in a straight line (Newton's First Law)."
  };

  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Revision Schedule</h3>
        
        <div className="space-y-3">
          {isFlagged ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Calendar className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                  <span>Next revision:</span>
                </div>
                <span className="text-sm font-medium">{nextRevisionData.date}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                  <Clock className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                  <span>Suggested time:</span>
                </div>
                <span className="text-sm font-medium">{nextRevisionData.time}</span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-2 justify-center text-amber-600 border-amber-200 hover:bg-amber-50 dark:border-amber-800 dark:text-amber-400 dark:hover:bg-amber-900/20"
                onClick={onToggleFlag}
              >
                Remove from Revision
              </Button>
            </>
          ) : (
            <div className="text-center py-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Add this concept to your revision schedule to improve retention.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full justify-center"
                onClick={onToggleFlag}
              >
                Add to Revision Schedule
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Quick Revision Flashcard */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
        <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Quick Revision</h3>
        
        <div className="perspective-1000 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
          <div className={`relative w-full h-40 transform-style-preserve-3d transition-all duration-500 ${isFlipped ? 'rotate-y-180' : ''}`}>
            {/* Front of card (Question) */}
            <div className="absolute w-full h-full backface-hidden bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800/50 flex flex-col justify-between">
              <div>
                <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-2">QUESTION</div>
                <p className="text-gray-800 dark:text-gray-200">{practiceQuestion.question}</p>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                Click to reveal answer
              </div>
            </div>
            
            {/* Back of card (Answer) */}
            <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-4 rounded-lg border border-emerald-100 dark:border-emerald-800/50 flex flex-col justify-between">
              <div>
                <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mb-2">ANSWER</div>
                <p className="text-gray-800 dark:text-gray-200">{practiceQuestion.answer}</p>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                Click to see question
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-indigo-600 dark:text-indigo-400"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <RotateCw className="h-3 w-3 mr-1" />
            Flip
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-emerald-600 dark:text-emerald-400"
          >
            <CheckCircle2 className="h-3 w-3 mr-1" />
            I know this
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RevisionSection;
