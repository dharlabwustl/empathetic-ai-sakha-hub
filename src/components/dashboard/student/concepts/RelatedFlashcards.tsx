
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, ExternalLink } from 'lucide-react';

interface RelatedFlashcardsProps {
  conceptName: string;
}

const RelatedFlashcards: React.FC<RelatedFlashcardsProps> = ({ conceptName }) => {
  // Sample flashcard data
  const flashcards = [
    {
      id: "fc1",
      front: "What is Ohm's Law?",
      back: "Ohm's law states that the current through a conductor is directly proportional to the voltage across it, for a given temperature. Mathematically, V = IR."
    },
    {
      id: "fc2",
      front: "What does the symbol 'R' represent in Ohm's Law?",
      back: "In Ohm's Law (V = IR), the symbol 'R' represents electrical resistance, measured in ohms (Ω)."
    },
    {
      id: "fc3",
      front: "How does temperature affect resistance in most conductors?",
      back: "For most conductors, resistance increases with increasing temperature due to increased thermal vibration of atoms."
    }
  ];

  return (
    <Card className="border-l-4 border-l-purple-500 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-purple-500" />
          Related Flashcards
        </CardTitle>
        <CardDescription>
          Quick review cards for {conceptName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {flashcards.map((flashcard, index) => (
            <Card key={flashcard.id} className="border border-gray-200 shadow-sm">
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200">
                <h4 className="font-medium">{flashcard.front}</h4>
              </div>
              <div className="p-3">
                <p className="text-sm text-gray-600 dark:text-gray-300">{flashcard.back}</p>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="flex gap-2 mt-4">
          <Button variant="outline" className="flex-1">
            <Plus className="h-4 w-4 mr-2" />
            Create Flashcard
          </Button>
          <Button variant="outline" className="flex-1">
            <ExternalLink className="h-4 w-4 mr-2" />
            View All Flashcards
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedFlashcards;
