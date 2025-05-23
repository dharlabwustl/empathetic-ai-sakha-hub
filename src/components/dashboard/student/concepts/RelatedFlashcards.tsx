
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, CheckCircle, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RelatedFlashcardsProps {
  conceptId: string;
}

const RelatedFlashcards: React.FC<RelatedFlashcardsProps> = ({ conceptId }) => {
  // Sample flashcards data
  const flashcards = [
    {
      id: "flash1",
      front: "What is Ohm's Law?",
      back: "Ohm's Law states that the current through a conductor between two points is directly proportional to the voltage across the two points.",
      mastered: true,
      lastReviewed: "2 days ago"
    },
    {
      id: "flash2",
      front: "Write the mathematical formula for Ohm's Law.",
      back: "V = IR, where V is voltage, I is current, and R is resistance.",
      mastered: true,
      lastReviewed: "3 days ago"
    },
    {
      id: "flash3",
      front: "In a circuit with a 12V battery and a 4Ω resistor, what is the current?",
      back: "I = V/R = 12V/4Ω = 3A",
      mastered: false,
      lastReviewed: "1 week ago"
    },
    {
      id: "flash4",
      front: "What happens to current if resistance increases while voltage remains constant?",
      back: "According to Ohm's law (I = V/R), if resistance increases while voltage remains constant, the current decreases.",
      mastered: false,
      lastReviewed: "5 days ago"
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-600" />
          Related Flashcards
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {flashcards.slice(0, 4).map((card) => (
            <div 
              key={card.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-sm">
                  {card.front}
                </h3>
                {card.mastered && (
                  <span className="flex items-center text-green-600 dark:text-green-400 text-xs bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Mastered
                  </span>
                )}
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded p-2 mb-2 text-sm text-gray-600 dark:text-gray-300">
                <p>{card.back}</p>
              </div>
              
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>Last reviewed: {card.lastReviewed}</span>
                <Button variant="ghost" size="sm" className="p-0 h-6 w-6">
                  <RotateCcw className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-4">
          <Link to={`/dashboard/student/flashcards?concept=${conceptId}`}>
            <Button variant="outline" className="flex items-center gap-1">
              View All Flashcards
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedFlashcards;
