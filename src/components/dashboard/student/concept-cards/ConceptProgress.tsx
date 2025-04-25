
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ConceptCard } from '@/hooks/useUserStudyPlan';
import { Book, BookOpen, Brain, CheckCircle, Clock, LightbulbIcon } from 'lucide-react';

interface ConceptProgressProps {
  conceptCards: ConceptCard[];
}

const ConceptProgress: React.FC<ConceptProgressProps> = ({ conceptCards }) => {
  // Calculate overall progress
  const totalCards = conceptCards.length;
  const completedCards = conceptCards.filter(card => card.completed).length;
  const overallProgress = totalCards > 0 ? (completedCards / totalCards) * 100 : 0;
  
  // Get all unique subjects
  const subjects = [...new Set(conceptCards.map(card => card.subject))];
  
  // Calculate difficulty distribution
  const easyCards = conceptCards.filter(card => card.difficulty === 'Easy').length;
  const mediumCards = conceptCards.filter(card => card.difficulty === 'Medium').length;
  const hardCards = conceptCards.filter(card => card.difficulty === 'Hard').length;
  
  // Calculate time estimate
  const totalTimeEstimate = conceptCards.reduce((sum, card) => sum + (card.estimatedTime || 30), 0);
  const remainingTimeEstimate = conceptCards
    .filter(card => !card.completed)
    .reduce((sum, card) => sum + (card.estimatedTime || 30), 0);

  return (
    <div className="space-y-4">
      {/* Overall Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
                <Brain className="text-blue-500" size={20} />
                Overall Progress
              </h3>
              <p className="text-sm text-gray-500">
                {completedCards} of {totalCards} concept cards completed
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex justify-between text-sm mb-1">
                <span>{Math.round(overallProgress)}% Complete</span>
                <span>{completedCards}/{totalCards}</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Subject Distribution */}
        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
              <BookOpen size={16} />
              Subject Distribution
            </h4>
            <p className="text-xl font-bold">{subjects.length} Subjects</p>
            <div className="mt-2">
              {subjects.slice(0, 3).map((subject, index) => {
                const subjectCards = conceptCards.filter(card => card.subject === subject);
                const completed = subjectCards.filter(card => card.completed).length;
                const total = subjectCards.length;
                const progress = total > 0 ? (completed / total) * 100 : 0;
                
                return (
                  <div key={subject} className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="truncate">{subject}</span>
                      <span>{completed}/{total}</span>
                    </div>
                    <Progress value={progress} className="h-1.5" />
                  </div>
                );
              })}
              {subjects.length > 3 && (
                <div className="text-sm text-blue-600 mt-2">
                  +{subjects.length - 3} more subjects
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Difficulty Breakdown */}
        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
              <LightbulbIcon size={16} />
              Difficulty Breakdown
            </h4>
            <div className="space-y-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                  Easy
                </span>
                <span className="text-sm font-medium">{easyCards} cards</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm flex items-center">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                  Medium
                </span>
                <span className="text-sm font-medium">{mediumCards} cards</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                  Hard
                </span>
                <span className="text-sm font-medium">{hardCards} cards</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Time Estimate */}
        <Card>
          <CardContent className="p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
              <Clock size={16} />
              Time Estimate
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Total study time:</span>
                <span className="text-sm font-medium">
                  {Math.round(totalTimeEstimate / 60)} hours {totalTimeEstimate % 60} mins
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Remaining:</span>
                <span className="text-sm font-medium">
                  {Math.round(remainingTimeEstimate / 60)} hours {remainingTimeEstimate % 60} mins
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Progress:</span>
                <span className="text-sm font-medium">
                  {totalTimeEstimate > 0 ? Math.round(((totalTimeEstimate - remainingTimeEstimate) / totalTimeEstimate) * 100) : 0}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConceptProgress;
