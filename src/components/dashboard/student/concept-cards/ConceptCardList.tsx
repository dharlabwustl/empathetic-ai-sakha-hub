
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

// Sample concept cards data
const sampleConcepts = [
  {
    id: 'concept-1',
    title: 'Thermodynamics Basics',
    subject: 'Physics',
    complexity: 'Medium',
    flashcards: 15
  },
  {
    id: 'concept-2',
    title: 'Cell Structure & Function',
    subject: 'Biology',
    complexity: 'Easy',
    flashcards: 20
  },
  {
    id: 'concept-3',
    title: 'Periodic Table & Elements',
    subject: 'Chemistry',
    complexity: 'Medium',
    flashcards: 18
  }
];

const ConceptCardList: React.FC = () => {
  return (
    <TooltipProvider>
      <div className="space-y-6">
        {sampleConcepts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sampleConcepts.map((concept) => (
              <Card key={concept.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex flex-col h-full">
                    <div className="mb-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{concept.title}</h3>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Info className="h-3 w-3" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View and study concept cards for {concept.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <p className="text-sm text-muted-foreground">{concept.subject}</p>
                    </div>
                    
                    <div className="flex justify-between text-sm mt-auto pt-3 border-t">
                      <span>{concept.flashcards} cards</span>
                      <span className="text-muted-foreground">{concept.complexity}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No concept cards available yet</p>
            <Button className="mt-4">Create Your First Concept Card</Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default ConceptCardList;
