
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Check, Clock, ChevronRight } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/dateUtils";

interface Subject {
  name: string;
  progress: number;
  proficiency: 'weak' | 'moderate' | 'strong';
  topics: Array<{
    name: string;
    status: 'pending' | 'in-progress' | 'completed';
  }>;
}

interface StudyPlan {
  id: string;
  examGoal: string;
  examDate: string;
  daysLeft: number;
  createdAt: string;
  status: 'active' | 'completed' | 'expired';
  progressPercentage: number;
  subjects: Subject[];
}

interface StudyPlanCardProps {
  plan: StudyPlan;
  onViewDetails: (planId: string) => void;
}

const StudyPlanCard: React.FC<StudyPlanCardProps> = ({ plan, onViewDetails }) => {
  return (
    <Card>
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">{plan.examGoal}</CardTitle>
            <CardDescription>Created on {formatDate(plan.createdAt)}</CardDescription>
          </div>
          <Badge variant={plan.status === 'active' ? 'default' : 'secondary'} 
                className={plan.status === 'active' ? 'bg-green-500' : 'bg-gray-500'}>
            {plan.status === 'active' ? `${plan.daysLeft} days left` : plan.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-medium mb-2">Overall Progress</h3>
          <Progress value={plan.progressPercentage} className="h-2 mb-1" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{plan.progressPercentage}% Complete</span>
            <span>Target: 100%</span>
          </div>
        </div>

        <div className="space-y-3">
          {plan.subjects.map(subject => (
            <div key={subject.name} className="space-y-1">
              <div className="flex justify-between">
                <span className="font-medium">{subject.name}</span>
                <span>{subject.progress}%</span>
              </div>
              <Progress value={subject.progress} 
                className={subject.proficiency === 'strong' ? 'bg-green-500 h-1' : 
                          subject.proficiency === 'moderate' ? 'bg-amber-500 h-1' : 
                          'bg-red-500 h-1'} />
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="border-t pt-4">
        <Button variant="outline" className="w-full" onClick={() => onViewDetails(plan.id)}>
          <ChevronRight className="h-4 w-4 mr-2" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudyPlanCard;
