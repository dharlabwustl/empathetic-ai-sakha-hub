
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { BookOpen, Brain, Calendar, Target } from "lucide-react";

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  route: string;
  color: string;
}

interface QuickActionsGridProps {
  actions?: QuickAction[];
}

const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({ 
  actions = [
    {
      id: '1',
      title: "Today's Plan",
      description: "View today's schedule",
      icon: Calendar,
      route: '/dashboard/student/enhanced-todays-plan',
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    {
      id: '2',
      title: "Concept Cards",
      description: "Study key concepts",
      icon: Brain,
      route: '/dashboard/student/concepts',
      color: 'bg-purple-50 hover:bg-purple-100 border-purple-200'
    },
    {
      id: '3',
      title: "Practice Exam",
      description: "Test your knowledge",
      icon: Target,
      route: '/dashboard/student/practice-exam',
      color: 'bg-green-50 hover:bg-green-100 border-green-200'
    },
    {
      id: '4',
      title: "Study Materials",
      description: "Access resources",
      icon: BookOpen,
      route: '/dashboard/student/flashcards',
      color: 'bg-orange-50 hover:bg-orange-100 border-orange-200'
    }
  ]
}) => {
  const navigate = useNavigate();

  const handleActionClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => {
        const IconComponent = action.icon;
        return (
          <Card key={action.id} className={`cursor-pointer transition-colors ${action.color}`}>
            <CardContent className="p-4">
              <Button
                variant="ghost"
                className="w-full h-auto p-0 flex flex-col items-center space-y-2"
                onClick={() => handleActionClick(action.route)}
              >
                <IconComponent className="h-6 w-6" />
                <div className="text-center">
                  <div className="font-medium text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QuickActionsGrid;
