
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Target, Calculator, Calendar, Heart } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const QuickActionsSection: React.FC = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'concepts',
      title: 'Study Concepts',
      description: 'Learn new topics',
      icon: <BookOpen className="h-5 w-5" />,
      action: () => navigate('/dashboard/student/concepts'),
      color: 'bg-blue-500'
    },
    {
      id: 'flashcards',
      title: 'Practice Flashcards',
      description: 'Review and memorize',
      icon: <Brain className="h-5 w-5" />,
      action: () => navigate('/dashboard/student/flashcards'),
      color: 'bg-green-500'
    },
    {
      id: 'practice',
      title: 'Take Practice Test',
      description: 'Test your knowledge',
      icon: <Target className="h-5 w-5" />,
      action: () => navigate('/dashboard/student/practice-exam'),
      color: 'bg-purple-500'
    },
    {
      id: 'formula',
      title: 'Formula Lab',
      description: 'Interactive formulas',
      icon: <Calculator className="h-5 w-5" />,
      action: () => navigate('/dashboard/student/concepts'),
      color: 'bg-orange-500'
    },
    {
      id: 'plan',
      title: "Today's Plan",
      description: 'View daily schedule',
      icon: <Calendar className="h-5 w-5" />,
      action: () => navigate('/dashboard/student/today'),
      color: 'bg-indigo-500'
    },
    {
      id: 'wellbeing',
      title: 'Feel Good Corner',
      description: 'Take a break',
      icon: <Heart className="h-5 w-5" />,
      action: () => navigate('/dashboard/student/feel-good-corner'),
      color: 'bg-pink-500'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-accent"
              onClick={action.action}
            >
              <div className={`p-2 rounded-full ${action.color} text-white`}>
                {action.icon}
              </div>
              <div className="text-center">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsSection;
