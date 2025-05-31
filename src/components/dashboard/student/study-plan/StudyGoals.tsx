
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Trophy, Calendar, TrendingUp, CheckCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const StudyGoals: React.FC = () => {
  const examDate = new Date('2026-05-03');
  const currentDate = new Date();
  const daysLeft = Math.ceil((examDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

  const goals = [
    {
      id: 'syllabus-completion',
      title: 'Complete NEET 2026 Syllabus',
      description: 'Cover all topics in Physics, Chemistry, and Biology',
      progress: 65,
      target: 100,
      deadline: '2026-03-01',
      priority: 'high',
      status: 'in-progress'
    },
    {
      id: 'mock-tests',
      title: 'Complete 50 Mock Tests',
      description: 'Full-length NEET practice tests',
      progress: 18,
      target: 50,
      deadline: '2026-04-15',
      priority: 'high',
      status: 'in-progress'
    },
    {
      id: 'weak-subjects',
      title: 'Strengthen Chemistry',
      description: 'Improve Chemistry score from 35% to 75%',
      progress: 45,
      target: 75,
      deadline: '2026-02-01',
      priority: 'critical',
      status: 'in-progress'
    },
    {
      id: 'revision-cycles',
      title: 'Complete 3 Revision Cycles',
      description: 'Systematic revision of all subjects',
      progress: 33,
      target: 100,
      deadline: '2026-04-30',
      priority: 'medium',
      status: 'in-progress'
    },
    {
      id: 'target-score',
      title: 'Achieve 650+ Score',
      description: 'Target score for top medical colleges',
      progress: 78,
      target: 90,
      deadline: '2026-05-03',
      priority: 'critical',
      status: 'on-track'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'medium': return 'bg-blue-100 text-blue-700 border-blue-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'on-track': return <TrendingUp className="h-4 w-4 text-blue-600" />;
      default: return <Target className="h-4 w-4 text-orange-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Days to NEET 2026</p>
                <p className="text-2xl font-bold text-blue-600">{daysLeft}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Goals Completed</p>
                <p className="text-2xl font-bold text-green-600">0/5</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Average Progress</p>
                <p className="text-2xl font-bold text-purple-600">48%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            NEET 2026 Study Goals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {goals.map((goal) => (
              <div key={goal.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(goal.status)}
                      <h3 className="font-semibold">{goal.title}</h3>
                      <Badge className={`text-xs ${getPriorityColor(goal.priority)}`}>
                        {goal.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{goal.progress}% of {goal.target}{goal.id === 'mock-tests' ? ' tests' : goal.id === 'target-score' ? '% target' : '%'}</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                  <span className="capitalize">{goal.status.replace('-', ' ')}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyGoals;
