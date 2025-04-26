
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brain, BookOpen, Book } from 'lucide-react';

export const QuickAccess = () => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Link to="/dashboard/student/academic-advisor">
        <Button variant="default" size="sm" className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white shadow-md">
          <Brain className="h-4 w-4 mr-1" />
          Academic Advisor
        </Button>
      </Link>
      
      <Link to="/dashboard/student/feel-good">
        <Button variant="default" size="sm" className="bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white shadow-md">
          <BookOpen className="h-4 w-4 mr-1" />
          Feel Good Corner
        </Button>
      </Link>
      
      <Link to="/dashboard/student/study-plan">
        <Button 
          variant="outline" 
          size="sm" 
          className="border-violet-200 hover:bg-violet-50 hover:text-violet-700"
        >
          <Book className="h-4 w-4 mr-1" />
          View Study Plan
        </Button>
      </Link>
    </div>
  );
};
