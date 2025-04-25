
import React from 'react';
import ConceptCardView from '@/components/dashboard/student/concept-cards/ConceptCardView';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, FileCheck, BookOpen } from 'lucide-react';
import TodayStudyPlan from '@/components/dashboard/student/TodayStudyPlan';
import { Card, CardContent } from '@/components/ui/card';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import SmartSuggestionSection from '@/components/dashboard/student/SmartSuggestionSection';

export const MicroConceptView = () => {
  const { userProfile } = useUserProfile();
  const { conceptCards, loading } = useUserStudyPlan();
  
  const todayCards = conceptCards.filter(card => card.scheduledFor === 'today');
  const examGoal = userProfile?.goals?.[0]?.title || 'IIT-JEE';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Concept Cards</h2>
          <p className="text-gray-500">
            Master key concepts for your {examGoal} preparation with detailed explanations.
          </p>
        </div>
        <Link to="/dashboard/student/concepts/all">
          <Button variant="outline" className="flex items-center gap-2">
            View All <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ConceptCardView 
          title=""
          limit={3}
          showViewAll={false}
        />
      </div>
      
      {todayCards.length > 3 && (
        <div className="text-center">
          <Link to="/dashboard/student/concepts/all">
            <Button variant="ghost">
              View {todayCards.length - 3} more concept cards
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export const TodayPlanView = () => {
  return (
    <div className="space-y-6">
      <TodayStudyPlan />
      <ConceptCardView 
        title="Today's Concept Cards" 
        limit={3}
        showViewAll={true}
      />
      <SmartSuggestionSection />
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Practice Exams</h2>
          <p className="text-gray-600">
            Test your knowledge with practice exams and quizzes.
          </p>
        </div>
        <Link to="/dashboard/student/exams">
          <Button variant="outline" className="flex items-center gap-2">
            View All <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <PracticeExamCard
          title="Physics Mock Test"
          subject="Physics"
          questionsCount={30}
          duration={60}
          difficulty="medium"
        />
        
        <PracticeExamCard
          title="Chemistry: Organic"
          subject="Chemistry"
          questionsCount={20}
          duration={45}
          difficulty="easy"
        />
        
        <PracticeExamCard
          title="Full JEE Mock Test"
          subject="Combined"
          questionsCount={90}
          duration={180}
          difficulty="hard"
        />
      </div>
    </div>
  );
};

const PracticeExamCard = ({ 
  title, 
  subject, 
  questionsCount, 
  duration,
  difficulty
}: { 
  title: string; 
  subject: string; 
  questionsCount: number; 
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
}) => {
  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'easy': return 'bg-green-50 text-green-700 border-green-200';
      case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'hard': return 'bg-red-50 text-red-700 border-red-200';
      default: return '';
    }
  };
  
  return (
    <Link to="/dashboard/student/exams">
      <Card className="hover:shadow-md transition-all duration-200 h-full">
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <FileCheck className="text-blue-500" size={18} />
            <span className="text-sm text-gray-500">{subject}</span>
          </div>
          
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          
          <div className="flex flex-wrap gap-2 mt-1 mb-3">
            <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyColor()}`}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
            
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {questionsCount} questions
            </span>
            
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              {duration} min
            </span>
          </div>
          
          <div className="mt-auto">
            <Button className="w-full">Start Exam</Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
