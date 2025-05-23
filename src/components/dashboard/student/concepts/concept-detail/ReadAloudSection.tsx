
import React from 'react';
import { Button } from '@/components/ui/button';
import { StopCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ReadAloudSectionProps {
  text: string;
  isActive: boolean;
  onStop: () => void;
}

const ReadAloudSection: React.FC<ReadAloudSectionProps> = ({ text, isActive, onStop }) => {
  return (
    <Card className="bg-blue-50 dark:bg-blue-900/20 p-4 mb-4 relative overflow-hidden">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative h-6 w-6 mr-2">
            <span className="absolute inset-0 rounded-full bg-blue-400 opacity-75 animate-ping"></span>
            <span className="relative rounded-full h-6 w-6 bg-blue-500 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414-1.414m0 0l-2.828-2.828m2.828 2.828l-4.243 4.243m6.364-6.364l-4.243-4.243" />
              </svg>
            </span>
          </div>
          <div>
            <h3 className="font-medium text-blue-800 dark:text-blue-300">Reading Aloud</h3>
            <p className="text-sm text-blue-600 dark:text-blue-400">Text is being spoken</p>
          </div>
        </div>
        
        <Button 
          variant="outline"
          size="sm"
          className="bg-white dark:bg-gray-800 text-red-500 hover:text-red-600"
          onClick={onStop}
        >
          <StopCircle className="h-4 w-4 mr-2" />
          Stop Reading
        </Button>
      </div>
      
      <div className="mt-3 p-3 bg-white dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
        {text}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-200 dark:bg-blue-700">
        <div className="h-full bg-blue-500 animate-pulse"></div>
      </div>
    </Card>
  );
};

export default ReadAloudSection;
