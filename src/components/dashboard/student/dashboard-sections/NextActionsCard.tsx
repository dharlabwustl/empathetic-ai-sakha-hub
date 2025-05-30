
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, AlertTriangle, Star, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NextActionsCardProps {
  className?: string;
}

const NextActionsCard: React.FC<NextActionsCardProps> = ({ className }) => {
  const actions = [
    {
      id: 1,
      title: 'Complete Physics Mock Test',
      priority: 'high',
      type: 'urgent',
      link: '/dashboard/student/practice-exam',
      icon: <AlertTriangle className="h-4 w-4" />
    },
    {
      id: 2,
      title: 'Review Chemistry Flashcards',
      priority: 'medium',
      type: 'recommended',
      link: '/dashboard/student/flashcards',
      icon: <Star className="h-4 w-4" />
    },
    {
      id: 3,
      title: 'Study Biology Concepts',
      priority: 'low',
      type: 'optional',
      link: '/dashboard/student/concepts',
      icon: <CheckCircle className="h-4 w-4" />
    },
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
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <ArrowRight className="h-5 w-5 text-green-600" />
          Next Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {actions.map((action) => (
          <div key={action.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-3">
              {action.icon}
              <div>
                <h4 className="font-medium text-sm">{action.title}</h4>
                <Badge variant="outline" className={`text-xs ${getPriorityColor(action.priority)}`}>
                  {action.priority} priority
                </Badge>
              </div>
            </div>
            <Link to={action.link}>
              <Button size="sm" variant="ghost">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default NextActionsCard;
