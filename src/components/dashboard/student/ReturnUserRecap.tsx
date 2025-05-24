
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Clock, Target } from 'lucide-react';

interface ReturnUserRecapProps {
  userName?: string;
  lastLoginDate: string;
  suggestedNextTasks?: string[];
  onClose: () => void;
  loginCount?: number;
}

const ReturnUserRecap: React.FC<ReturnUserRecapProps> = ({
  userName,
  lastLoginDate,
  suggestedNextTasks = [],
  onClose,
  loginCount
}) => {
  return (
    <Card className="mb-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border-purple-200 dark:border-purple-800">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <h3 className="font-medium">Welcome back, {userName}!</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              You last visited {lastLoginDate}. Ready to continue your learning journey?
            </p>
            
            {suggestedNextTasks.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Suggested next steps:</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {suggestedNextTasks.map((task, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReturnUserRecap;
