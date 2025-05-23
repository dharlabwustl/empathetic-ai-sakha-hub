
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Brain, Clock, FastForward, Target } from 'lucide-react';

interface ConceptMasterySectionProps {
  conceptName: string;
  masteryPercentage?: number;
  recallPercentage?: number;
  timeSpent?: number; // minutes
  lastReviewed?: string;
  nextReview?: string;
}

export const ConceptMasterySection: React.FC<ConceptMasterySectionProps> = ({
  conceptName,
  masteryPercentage = 68,
  recallPercentage = 75,
  timeSpent = 135,
  lastReviewed = "2 days ago",
  nextReview = "Tomorrow"
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-indigo-500" />
          Mastery & Recall Tracker
        </CardTitle>
        <CardDescription>
          Track your progress mastering {conceptName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Mastery Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-sm">Mastery Level</h3>
              <span className="text-lg font-bold text-indigo-600">{masteryPercentage}%</span>
            </div>
            <Progress value={masteryPercentage} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Beginner</span>
              <span>Proficient</span>
              <span>Expert</span>
            </div>
          </div>

          {/* Recall Strength */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-sm">Recall Strength</h3>
              <span className="text-lg font-bold text-emerald-600">{recallPercentage}%</span>
            </div>
            <Progress value={recallPercentage} className="h-3 bg-emerald-100" />
            <div className="grid grid-cols-3 text-xs text-muted-foreground">
              <span>Weak</span>
              <span className="text-center">Medium</span>
              <span className="text-right">Strong</span>
            </div>
          </div>

          {/* Time & Review Stats */}
          <div className="space-y-2 flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-blue-500" />
                <h3 className="font-medium text-sm">Time Spent</h3>
              </div>
              <span className="text-md font-semibold">{Math.floor(timeSpent / 60)}h {timeSpent % 60}m</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <FastForward className="h-4 w-4 text-purple-500" />
                <h3 className="font-medium text-sm">Last Reviewed</h3>
              </div>
              <span className="text-md font-semibold">{lastReviewed}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <Target className="h-4 w-4 text-red-500" />
                <h3 className="font-medium text-sm">Next Review</h3>
              </div>
              <span className="text-md font-semibold">{nextReview}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            <Button className="w-full">
              Boost Mastery Now
            </Button>
            <Button variant="outline" className="w-full">
              Recall Assessment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConceptMasterySection;
