
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Brain, FileText, Calendar } from 'lucide-react';

const QuickActionsSection: React.FC = () => {
  const quickActions = [
    { 
      title: 'Study Concepts', 
      icon: <BookOpen className="h-5 w-5" />, 
      color: 'bg-blue-500', 
      href: '/dashboard/student/concepts' 
    },
    { 
      title: 'Practice Flashcards', 
      icon: <Brain className="h-5 w-5" />, 
      color: 'bg-purple-500', 
      href: '/dashboard/student/flashcards' 
    },
    { 
      title: 'Take Practice Exam', 
      icon: <FileText className="h-5 w-5" />, 
      color: 'bg-green-500', 
      href: '/dashboard/student/practice-exams' 
    },
    { 
      title: 'View Schedule', 
      icon: <Calendar className="h-5 w-5" />, 
      color: 'bg-orange-500', 
      href: '/dashboard/student/schedule' 
    }
  ];

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-20 flex flex-col items-center justify-center gap-2 hover:shadow-md transition-shadow"
              onClick={() => window.location.href = action.href}
            >
              <div className={`p-2 rounded-full ${action.color} text-white`}>
                {action.icon}
              </div>
              <span className="text-xs font-medium">{action.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsSection;
