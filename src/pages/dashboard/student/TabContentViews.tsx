
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { BookOpen } from 'lucide-react';
import TodaysPlanView from "@/components/dashboard/student/TodaysPlanView";

export const MicroConceptView = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Micro Concepts</h2>
          <p className="text-gray-600 mb-4">
            Study key concepts broken down into small, digestible pieces.
          </p>
        </div>
        
        <Button 
          onClick={() => navigate('/study/concept-cards')}
          className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700"
        >
          <BookOpen className="mr-2 h-4 w-4" />
          View All Concept Cards
        </Button>
      </div>
      
      {/* Basic intro and cards preview here */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 text-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
          <h3 className="text-lg font-medium text-indigo-600 dark:text-indigo-400">Today's Concepts</h3>
          <p className="mt-2 text-4xl font-bold">2</p>
          <p className="mt-1 text-sm text-gray-500">Focus on these today</p>
          <Button 
            variant="link" 
            onClick={() => navigate('/study/concept-cards/today')}
            className="mt-3"
          >
            View Today's Concepts
          </Button>
        </div>
        
        <div className="p-6 text-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
          <h3 className="text-lg font-medium text-blue-600 dark:text-blue-400">This Week</h3>
          <p className="mt-2 text-4xl font-bold">4</p>
          <p className="mt-1 text-sm text-gray-500">Plan your week ahead</p>
          <Button 
            variant="link" 
            onClick={() => navigate('/study/concept-cards/week')}
            className="mt-3"
          >
            View Weekly Concepts
          </Button>
        </div>
        
        <div className="p-6 text-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
          <h3 className="text-lg font-medium text-violet-600 dark:text-violet-400">This Month</h3>
          <p className="mt-2 text-4xl font-bold">6</p>
          <p className="mt-1 text-sm text-gray-500">Your monthly curriculum</p>
          <Button 
            variant="link" 
            onClick={() => navigate('/study/concept-cards/month')}
            className="mt-3"
          >
            View Monthly Concepts
          </Button>
        </div>
      </div>
      
      <div className="p-8 mt-4 text-center bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg border border-indigo-100 dark:border-indigo-800/30">
        <h3 className="text-xl font-semibold text-indigo-800 dark:text-indigo-300 mb-3">Focus on Your Learning Style</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Your concept cards are tailored to your visual and reading learning style.
        </p>
        <Button className="mt-4" variant="outline" onClick={() => navigate('/study/concept-cards')}>
          Explore All Concept Cards
        </Button>
      </div>
    </div>
  );
};

export const FlashcardsView = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Flashcards</h2>
      <p className="text-gray-600 mb-4">
        Study and memorize key concepts with interactive flashcards.
      </p>
      
      {/* Flashcards content would go here */}
      <div className="p-8 text-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Select a flashcard deck to begin studying.</p>
      </div>
    </div>
  );
};

export const PracticeExamsView = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Practice Exams</h2>
      <p className="text-gray-600 mb-4">
        Test your knowledge with practice exams and quizzes.
      </p>
      
      {/* Practice exams content would go here */}
      <div className="p-8 text-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">Select a practice exam to begin testing.</p>
      </div>
    </div>
  );
};

export const TodaysPlanTabView = () => {
  return <TodaysPlanView />;
};
