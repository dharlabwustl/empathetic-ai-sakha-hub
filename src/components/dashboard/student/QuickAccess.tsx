
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Brain, FileText, Clock, Calendar, BarChart } from 'lucide-react';

const QuickAccess: React.FC = () => {
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Quick Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Link to="/dashboard/student/today" className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span>Today's Plan</span>
          </Link>
          <Link to="/dashboard/student/concepts" className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span>Concept Cards</span>
          </Link>
          <Link to="/dashboard/student/flashcards" className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md">
            <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
              <Brain className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
            <span>Flashcards</span>
          </Link>
          <Link to="/dashboard/student/practice" className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md">
            <div className="w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
              <FileText className="h-4 w-4 text-violet-600 dark:text-violet-400" />
            </div>
            <span>Practice Exams</span>
          </Link>
          <Link to="/dashboard/student/progress" className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md">
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
              <BarChart className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span>Progress Tracker</span>
          </Link>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 rounded-lg border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-red-800 dark:text-red-300">TODAY</span>
              <span className="text-xs text-red-700 dark:text-red-300">4:00 PM</span>
            </div>
            <p className="font-medium mt-1 text-red-900 dark:text-red-200">Physics Assignment Due</p>
          </div>
          
          <div className="p-3 rounded-lg border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-800 dark:text-amber-300">TOMORROW</span>
              <span className="text-xs text-amber-700 dark:text-amber-300">10:00 AM</span>
            </div>
            <p className="font-medium mt-1 text-amber-900 dark:text-amber-200">Chemistry Quiz</p>
          </div>
          
          <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">MAY 3</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">All Day</span>
            </div>
            <p className="font-medium mt-1">Math Mid-Term Exam</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default QuickAccess;
