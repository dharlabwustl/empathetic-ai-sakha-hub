
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface ProgressCardProps {
  progress: number;
  children: React.ReactNode;
  className?: string;
}

/**
 * A reusable card component that shows a progress bar
 */
export const ProgressCard: React.FC<ProgressCardProps> = ({ 
  progress,
  children,
  className = ""
}) => {
  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardContent className="p-4">
        {children}
        
        <div className="flex items-center justify-between mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-500 ml-2">{progress}%</span>
        </div>
      </CardContent>
    </Card>
  );
};
