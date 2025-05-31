
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, Plus, CheckCircle, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudyGoal {
  id: string;
  title: string;
  description: string;
  subject: string;
  deadline: string;
  progress: number;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

const StudyGoals: React.FC = () => {
  const { toast } = useToast();
  const [goals, setGoals] = useState<StudyGoal[]>([
    {
      id: '1',
      title: 'Complete Organic Chemistry',
      description: 'Master all concepts in Organic Chemistry for NEET 2026',
      subject: 'Chemistry',
      deadline: '2025-12-31',
      progress: 65,
      completed: false,
      priority: 'high'
    },
    {
      id: '2',
      title: 'Physics Mechanics Mastery',
      description: 'Complete all topics in Classical Mechanics',
      subject: 'Physics',
      deadline: '2025-11-30',
      progress: 80,
      completed: false,
      priority: 'high'
    },
    {
      id: '3',
      title: 'Biology Human Physiology',
      description: 'Complete Human Physiology chapters',
      subject: 'Biology',
      deadline: '2025-10-31',
      progress: 90,
      completed: false,
      priority: 'medium'
    }
  ]);

  const [newGoal, setNewGoal] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-700 border-green-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject) {
      case 'Physics': return 'bg-blue-100 text-blue-700';
      case 'Chemistry': return 'bg-green-100 text-green-700';
      case 'Biology': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const markGoalComplete = (goalId: string) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, completed: true, progress: 100 } : goal
    ));
    
    toast({
      title: "Goal completed!",
      description: "Congratulations on achieving your study goal!",
    });
  };

  const updateProgress = (goalId: string, newProgress: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, progress: newProgress } : goal
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              NEET 2026 Study Goals
            </div>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              size="sm"
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Add Goal
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {showAddForm && (
            <Card className="mb-4 border-dashed">
              <CardContent className="pt-4">
                <div className="space-y-3">
                  <Input 
                    placeholder="Enter your study goal..." 
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => {
                      if (newGoal.trim()) {
                        const goal: StudyGoal = {
                          id: Date.now().toString(),
                          title: newGoal,
                          description: '',
                          subject: 'General',
                          deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                          progress: 0,
                          completed: false,
                          priority: 'medium'
                        };
                        setGoals(prev => [...prev, goal]);
                        setNewGoal('');
                        setShowAddForm(false);
                        toast({
                          title: "Goal added!",
                          description: "Your new study goal has been added.",
                        });
                      }
                    }}>
                      Add Goal
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {goals.map((goal) => (
              <Card key={goal.id} className={`${goal.completed ? 'opacity-75' : ''}`}>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`font-medium ${goal.completed ? 'line-through' : ''}`}>
                          {goal.title}
                        </h4>
                        {goal.description && (
                          <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                        )}
                      </div>
                      {!goal.completed && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => markGoalComplete(goal.id)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className={getPriorityColor(goal.priority)}>
                        {goal.priority.toUpperCase()} Priority
                      </Badge>
                      <Badge variant="outline" className={getSubjectColor(goal.subject)}>
                        {goal.subject}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        Due: {new Date(goal.deadline).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress: {goal.progress}%</span>
                        {goal.completed && (
                          <Badge variant="default" className="bg-green-100 text-green-700">
                            Completed
                          </Badge>
                        )}
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Target className="h-5 w-5 mx-auto mb-1 text-blue-600" />
              <div className="text-sm font-medium">Total Goals</div>
              <div className="text-lg font-bold text-blue-600">{goals.length}</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 mx-auto mb-1 text-green-600" />
              <div className="text-sm font-medium">Completed</div>
              <div className="text-lg font-bold text-green-600">
                {goals.filter(g => g.completed).length}
              </div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <TrendingUp className="h-5 w-5 mx-auto mb-1 text-orange-600" />
              <div className="text-sm font-medium">Average Progress</div>
              <div className="text-lg font-bold text-orange-600">
                {Math.round(goals.reduce((acc, g) => acc + g.progress, 0) / goals.length)}%
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyGoals;
