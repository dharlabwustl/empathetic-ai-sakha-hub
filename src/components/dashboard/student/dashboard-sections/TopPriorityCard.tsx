
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Clock, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const TopPriorityCard: React.FC = () => {
  return (
    <Card className="border-red-200 bg-red-50/50 dark:bg-red-950/10" id="top-priority-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
          <AlertTriangle className="h-5 w-5" />
          Top Priority
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium">Organic Chemistry Revision</span>
          <Badge variant="destructive" className="text-xs">
            Due Today
          </Badge>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Clock className="h-4 w-4" />
          <span>45 minutes remaining</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <Target className="h-4 w-4" />
          <span>Complete Chapter 12 exercises</span>
        </div>
        
        <Link to="/dashboard/student/concepts">
          <Button className="w-full bg-red-600 hover:bg-red-700">
            Start Now
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default TopPriorityCard;
