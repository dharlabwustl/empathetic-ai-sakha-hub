
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, X } from 'lucide-react';

interface ReturnUserRecapProps {
  userName: string;
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
  loginCount = 0
}) => {
  return (
    <Card className="mb-6 border-l-4 border-l-blue-500 shadow-md animate-fadeIn">
      <CardContent className="p-4 pt-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">
              Welcome back, {userName}! 
              {loginCount > 5 && <span className="text-blue-500"> 👋</span>}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              Your last session was {lastLoginDate}
            </p>
            
            {suggestedNextTasks.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium">Suggested next steps:</p>
                <ul className="mt-1 space-y-1">
                  {suggestedNextTasks.map((task, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <ArrowRight className="h-3.5 w-3.5 text-blue-500 mr-1 flex-shrink-0" /> 
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="rounded-full h-8 w-8"
          >
            <X size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReturnUserRecap;
