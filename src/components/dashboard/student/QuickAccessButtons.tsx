
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Book, BookOpen, FileText, MessageSquare, Calendar } from 'lucide-react';

export const QuickAccessButtons: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Link to="/dashboard/student/concepts">
        <Button variant="outline" size="sm" className="flex items-center hover:bg-blue-50 transition-colors">
          <Book className="h-4 w-4 mr-1" />
          Concepts
        </Button>
      </Link>
      <Link to="/dashboard/student/flashcards/1/interactive">
        <Button variant="outline" size="sm" className="flex items-center hover:bg-green-50 transition-colors">
          <BookOpen className="h-4 w-4 mr-1" />
          Flashcards
        </Button>
      </Link>
      <Link to="/dashboard/student/practice-exam/2/start">
        <Button variant="outline" size="sm" className="flex items-center hover:bg-purple-50 transition-colors">
          <FileText className="h-4 w-4 mr-1" />
          Practice Tests
        </Button>
      </Link>
      <Link to="/dashboard/student/tutor">
        <Button variant="outline" size="sm" className="flex items-center hover:bg-yellow-50 transition-colors">
          <MessageSquare className="h-4 w-4 mr-1" />
          AI Tutor
        </Button>
      </Link>
      <Link to="/dashboard/student/academic">
        <Button variant="outline" size="sm" className="flex items-center hover:bg-orange-50 transition-colors">
          <Calendar className="h-4 w-4 mr-1" />
          Study Plan
        </Button>
      </Link>
    </div>
  );
};

export default QuickAccessButtons;
