
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Brain, FileText, Calculator, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickAccessPanel: React.FC = () => {
  const navigate = useNavigate();
  
  const actions = [
    { 
      title: 'Concepts',
      icon: <Book className="h-4 w-4 mr-2" />,
      path: '/dashboard/student/concepts',
      description: 'Browse concept cards'
    },
    { 
      title: 'Flashcards',
      icon: <Brain className="h-4 w-4 mr-2" />,
      path: '/dashboard/student/flashcards',
      description: 'Review flashcards'
    },
    { 
      title: 'Practice Exams',
      icon: <FileText className="h-4 w-4 mr-2" />,
      path: '/dashboard/student/practice-exam',
      description: 'Take practice tests'
    },
    { 
      title: 'Formula Sheet',
      icon: <Calculator className="h-4 w-4 mr-2" />,
      path: '/dashboard/student/resources/formulas',
      description: 'Quick reference formulas'
    },
    { 
      title: 'AI Tutor',
      icon: <MessageSquare className="h-4 w-4 mr-2" />,
      path: '/dashboard/student/tutor',
      description: 'Get personalized help'
    }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Quick Access</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-2">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="flex items-center h-auto py-2 px-3 bg-white dark:bg-gray-800"
              onClick={() => navigate(action.path)}
            >
              {action.icon}
              <span>{action.title}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickAccessPanel;
