
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, X } from 'lucide-react';

interface ReturnUserRecapProps {
  userName: string;
  lastLoginDate: string;
  suggestedNextTasks?: string[];
  onClose?: () => void;
  loginCount?: number;
}

const ReturnUserRecap: React.FC<ReturnUserRecapProps> = ({
  userName,
  lastLoginDate,
  suggestedNextTasks = [],
  onClose,
  loginCount = 0
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-blue-100 dark:border-blue-900/30 mb-6 overflow-hidden">
      <CardContent className="p-4 sm:p-6 relative">
        <Button 
          variant="ghost" 
          size="sm"
          className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full"
          onClick={handleClose}
        >
          <X className="h-4 w-4" />
        </Button>

        <div>
          <h2 className="text-xl font-bold text-blue-900 dark:text-blue-400">
            Welcome back, {userName}!
          </h2>
          
          <div className="flex items-center mt-1 mb-3 text-sm text-blue-600 dark:text-blue-300">
            <Clock className="h-4 w-4 mr-1" />
            <span>Last seen: {lastLoginDate}</span>
          </div>
          
          {loginCount > 0 && loginCount % 5 === 0 && (
            <div className="mb-3 py-2 px-3 bg-blue-100 dark:bg-blue-800/40 rounded-md text-sm">
              <p className="text-blue-700 dark:text-blue-300 font-medium">
                🎉 You've logged in {loginCount} times! Keep up the amazing work.
              </p>
            </div>
          )}

          {suggestedNextTasks?.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-400">
                Suggested next steps:
              </p>
              <ul className="mt-1 space-y-1">
                {suggestedNextTasks.map((task, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <ArrowRight className="h-3 w-3 mr-1 text-blue-500" />
                    <span className="text-blue-700 dark:text-blue-300">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReturnUserRecap;
