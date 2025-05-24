
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StudyPlan } from '@/types/user/studyPlan';
import { ArrowLeft, Calendar, Clock, Target, BookOpen, Edit, Play, Pause } from 'lucide-react';

interface StudyPlanDetailProps {
  plan: StudyPlan;
  onBack: () => void;
  onEdit?: (plan: StudyPlan) => void;
  onToggleStatus?: (planId: string) => void;
}

const StudyPlanDetail: React.FC<StudyPlanDetailProps> = ({
  plan,
  onBack,
  onEdit,
  onToggleStatus
}) => {
  // Calculate derived values
  const progressPercent = plan.progress || 0;
  const today = new Date();
  const targetDate = new Date(plan.targetDate);
  const daysLeft = Math.max(0, Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  const remainingHours = plan.totalHours - plan.completedHours;
  const studyHoursPerDay = daysLeft > 0 ? Math.ceil(remainingHours / daysLeft) : 0;
  const weeklyHours = studyHoursPerDay * 7;

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{plan.title}</h1>
            <p className="text-muted-foreground">
              {plan.examGoal || plan.examType} preparation plan
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge className={getStatusColor(plan.isActive ? 'in-progress' : 'paused')}>
            {plan.isActive ? 'Active' : 'Paused'}
          </Badge>
          <Button variant="outline" onClick={() => onEdit?.(plan)}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button 
            variant="outline"
            onClick={() => onToggleStatus?.(plan.id)}
          >
            {plan.isActive ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Resume
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{Math.round(progressPercent)}%</div>
              <div className="text-sm text-muted-foreground">Complete</div>
              <Progress value={progressPercent} className="mt-2 h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{studyHoursPerDay}h</div>
              <div className="text-sm text-muted-foreground">Daily Target</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{weeklyHours}h</div>
              <div className="text-sm text-muted-foreground">Weekly Target</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{daysLeft}</div>
              <div className="text-sm text-muted-foreground">Days Left</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subjects Details */}
      <Card>
        <CardHeader>
          <CardTitle>Subject Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {plan.subjects.map((subject) => (
              <div key={subject.id} className="p-4 border rounded-lg" style={{ borderColor: subject.color || '#e2e8f0' }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: subject.color || '#3B82F6' }}
                    />
                    <div>
                      <h3 className="font-medium">{subject.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {subject.chaptersCompleted}/{subject.chaptersTotal} chapters
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{subject.difficulty}</Badge>
                    <Badge variant="outline">{subject.priority} priority</Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{Math.round((subject.chaptersCompleted / subject.chaptersTotal) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(subject.chaptersCompleted / subject.chaptersTotal) * 100} 
                    className="h-2"
                  />
                </div>
                
                <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Weekly Hours:</span>
                    <div className="font-medium">{subject.hoursPerWeek}h</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Completed:</span>
                    <div className="font-medium">{subject.actualHours}h</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Proficiency:</span>
                    <div className="font-medium capitalize">{subject.proficiency}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Plan Information */}
      <Card>
        <CardHeader>
          <CardTitle>Plan Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Target Date:</span>
                <span className="text-sm">{plan.targetDate.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Created:</span>
                <span className="text-sm">{plan.createdAt.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Total Hours:</span>
                <span className="text-sm">{plan.totalHours}h</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Subjects:</span>
                <span className="text-sm">{plan.subjects.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Completed Hours:</span>
                <span className="text-sm">{plan.completedHours}h</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Remaining Hours:</span>
                <span className="text-sm">{remainingHours}h</span>
              </div>
            </div>
          </div>
          
          {plan.description && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Description</h4>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyPlanDetail;
