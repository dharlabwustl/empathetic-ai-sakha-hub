
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import { ConceptCard } from '@/hooks/useUserStudyPlan';

interface ConceptProgressProps {
  conceptCards: ConceptCard[];
}

const ConceptProgress: React.FC<ConceptProgressProps> = ({ conceptCards }) => {
  const totalCards = conceptCards.length;
  const completedCards = conceptCards.filter(card => card.completed).length;
  const completionPercentage = totalCards > 0 ? (completedCards / totalCards) * 100 : 0;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Learning Progress</h3>
            <span className="text-sm font-medium">{Math.round(completionPercentage)}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          
          <div className="flex justify-between items-center text-sm font-medium">
            <span>{completedCards} of {totalCards} concepts completed</span>
            <span className="text-gray-500">{totalCards - completedCards} remaining</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="bg-green-50 rounded-lg p-4 flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-600">Completed</div>
                <div className="font-semibold">{completedCards} concepts</div>
              </div>
            </div>
            
            <div className="bg-amber-50 rounded-lg p-4 flex items-center space-x-3">
              <div className="bg-amber-100 p-2 rounded-full">
                <XCircle className="text-amber-600" size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-600">Pending</div>
                <div className="font-semibold">{totalCards - completedCards} concepts</div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4 flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Clock className="text-blue-600" size={20} />
              </div>
              <div>
                <div className="text-sm text-gray-600">Total Study Time</div>
                <div className="font-semibold">
                  {conceptCards.reduce((sum, card) => sum + card.estimatedTime, 0)} min
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConceptProgress;
