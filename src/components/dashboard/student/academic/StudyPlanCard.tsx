
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StudyPlan, StudyPlanTopic } from '@/types/user/studyPlan';
import { Calendar, Clock, Target, BookOpen } from 'lucide-react';

interface StudyPlanCardProps {
  plan: StudyPlan;
  onViewDetails?: (plan: StudyPlan) => void;
  onEdit?: (plan: StudyPlan) => void;
  onDelete?: (planId: string) => void;
}

const StudyPlanCard: React.FC<StudyPlanCardProps> = ({
  plan,
  onViewDetails,
  onEdit,
  onDelete
}) => {
  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const completedTopics = plan.subjects.reduce((total, subject) => {
    return total + subject.topics.filter(topic => {
      if (typeof topic === 'string') return false;
      return (topic as StudyPlanTopic).completed;
    }).length;
  }, 0);

  const totalTopics = plan.subjects.reduce((total, subject) => {
    return total + subject.topics.length;
  }, 0);

  const progressPercent = plan.progress || (totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0);

  // Calculate days left
  const today = new Date();
  const targetDate = new Date(plan.targetDate);
  const daysLeft = Math.max(0, Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{plan.title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {plan.examGoal || plan.examType} • Target: {plan.targetDate.toLocaleDateString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {daysLeft > 0 ? `${daysLeft} days left` : 'Target date passed'}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={getStatusColor(plan.isActive ? 'in-progress' : 'paused')}>
              {plan.isActive ? 'Active' : 'Paused'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600">{plan.subjects.length}</div>
              <div className="text-xs text-muted-foreground">Subjects</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">{plan.completedHours}h</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="text-sm font-medium mb-2">Subjects</h4>
            <div className="flex flex-wrap gap-1">
              {plan.subjects.map((subject) => (
                <Badge key={subject.id} variant="outline" className="text-xs">
                  {subject.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={() => onViewDetails?.(plan)}
              className="flex-1"
            >
              <BookOpen className="h-4 w-4 mr-1" />
              View Details
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onEdit?.(plan)}
            >
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyPlanCard;
