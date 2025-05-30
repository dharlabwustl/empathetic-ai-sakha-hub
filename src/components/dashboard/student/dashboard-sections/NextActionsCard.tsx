
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const NextActionsCard: React.FC = () => {
  const actions = [
    {
      title: "Complete Physics Practice Test",
      priority: "high",
      timeEstimate: "45 mins",
      link: "/dashboard/student/practice-exam/1/start",
      type: "exam"
    },
    {
      title: "Review Chemistry Flashcards",
      priority: "medium", 
      timeEstimate: "20 mins",
      link: "/dashboard/student/flashcards/1/interactive",
      type: "review"
    },
    {
      title: "Study Biology Concepts",
      priority: "low",
      timeEstimate: "30 mins", 
      link: "/dashboard/student/concepts",
      type: "study"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-purple-600" />
          Next Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action, index) => (
          <div key={index} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{action.title}</span>
                  <Badge variant="outline" className={getPriorityColor(action.priority)}>
                    {action.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <AlertCircle className="h-3 w-3" />
                  {action.timeEstimate}
                </div>
              </div>
              <Link to={action.link}>
                <Button size="sm" variant="ghost">
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NextActionsCard;
