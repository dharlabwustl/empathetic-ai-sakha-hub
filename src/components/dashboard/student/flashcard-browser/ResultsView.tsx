
import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RotateCcw } from 'lucide-react';

interface ResultsViewProps {
  accuracy: number;
  correctAnswer: string;
  onTryAgain: () => void;
}

const ResultsView = ({ accuracy, correctAnswer, onTryAgain }: ResultsViewProps) => {
  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <div className="text-center">
        <h3 className="font-medium mb-2">Answer Accuracy</h3>
        <Progress value={accuracy} className="h-2 mb-2" />
        <p className="text-lg font-bold mb-4">{accuracy}% Match</p>
      </div>
      
      <div className="space-y-3">
        <h4 className="font-medium">Correct Answer:</h4>
        <p className="p-3 bg-white rounded border">{correctAnswer}</p>
      </div>

      <div className="flex justify-center gap-2">
        <Button variant="outline" onClick={onTryAgain}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ResultsView;
