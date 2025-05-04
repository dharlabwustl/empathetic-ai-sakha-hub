
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import BackButton from '@/components/dashboard/student/BackButton';
import ConceptCardList from './concept-cards/ConceptCardList';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ConceptsViewProps {
  userProfile?: any;
}

const ConceptsView: React.FC<ConceptsViewProps> = ({ userProfile }) => {
  return (
    <div className="space-y-8">
      {/* Back button */}
      <BackButton to="/dashboard/student" label="Back to Dashboard" />
      
      <div>
        <h1 className="text-3xl font-bold">Concept Cards</h1>
        <p className="text-gray-500 mt-1">
          Interactive cards to help you master key concepts
        </p>
      </div>
      
      <TooltipProvider>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">
              <div className="flex justify-between items-center">
                <span>Your Concept Cards</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-80">
                      Concept cards help you understand key topics through visual learning. Practice with these cards regularly to strengthen your knowledge.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ConceptCardList />
          </CardContent>
        </Card>
      </TooltipProvider>
    </div>
  );
};

export default ConceptsView;
