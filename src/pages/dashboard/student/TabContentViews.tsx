
import React from 'react';
import ConceptCardView from '@/components/dashboard/student/concept-cards/ConceptCardView';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Book, FileCheck, BookOpen, Clock, Tag, Brain, Star } from 'lucide-react';
import TodayStudyPlan from '@/components/dashboard/student/TodayStudyPlan';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import SmartSuggestionSection from '@/components/dashboard/student/SmartSuggestionSection';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

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
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Today's Study Plan</h2>
        <Button variant="outline" size="sm">
          Customize Plan
        </Button>
      </div>
      
      <TodayStudyPlan />
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Today's Concept Cards</h3>
        <ConceptCardView 
          title=""
          limit={3}
          showViewAll={true}
        />
      </div>
      
      <SmartSuggestionSection />
    </div>
  );
};

export const FlashcardsView = () => {
  const { conceptCards } = useUserStudyPlan();
  const flashcardSets = [
    { id: 'f1', title: 'Physics: Mechanics', cardsCount: 45, mastery: 72, subject: 'Physics' },
    { id: 'f2', title: 'Organic Chemistry Basics', cardsCount: 30, mastery: 58, subject: 'Chemistry' },
    { id: 'f3', title: 'Calculus Derivatives', cardsCount: 25, mastery: 86, subject: 'Mathematics' },
    { id: 'f4', title: 'Modern Physics', cardsCount: 32, mastery: 45, subject: 'Physics' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Flashcards</h2>
          <p className="text-gray-600 mb-4">
            Study and memorize key concepts with interactive flashcards.
          </p>
        </div>
        <Link to="/dashboard/student/flashcards/all">
          <Button variant="outline" className="flex items-center gap-2">
            View All <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {flashcardSets.map(set => (
          <Link key={set.id} to={`/dashboard/student/flashcards/${set.id}`}>
            <Card className="h-full hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-2">
                <Badge variant="outline" className="mb-2 w-fit">{set.subject}</Badge>
                <CardTitle className="text-lg">{set.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-sm text-gray-500">
                  <div className="flex items-center justify-between mb-1">
                    <span>{set.cardsCount} cards</span>
                    <span>{set.mastery}% mastery</span>
                  </div>
                  <Progress value={set.mastery} className="h-1.5" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Study Now</Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-full">
            <Brain className="text-blue-600" size={18} />
          </div>
          <div>
            <h3 className="font-medium text-blue-800">Pro Tip</h3>
            <p className="text-sm text-blue-700">
              Studies show that regular flashcard practice can improve retention by up to 70%. 
              Try to review your flashcards at least 3 times a week!
            </p>
          </div>
        </div>
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
          recommended={true}
        />
        
        <PracticeExamCard
          title="Chemistry: Organic"
          subject="Chemistry"
          questionsCount={20}
          duration={45}
          difficulty="easy"
          recommended={false}
        />
        
        <PracticeExamCard
          title="Full JEE Mock Test"
          subject="Combined"
          questionsCount={90}
          duration={180}
          difficulty="hard"
          recommended={false}
        />
        
        <PracticeExamCard
          title="Weekly Mathematics Challenge"
          subject="Mathematics"
          questionsCount={25}
          duration={50}
          difficulty="medium"
          recommended={true}
        />
        
        <PracticeExamCard
          title="Thermodynamics Quiz"
          subject="Physics"
          questionsCount={15}
          duration={30}
          difficulty="medium"
          recommended={false}
        />
        
        <PracticeExamCard
          title="Periodic Table Master Quiz"
          subject="Chemistry"
          questionsCount={20}
          duration={40}
          difficulty="easy"
          recommended={false}
        />
      </div>
      
      <div className="flex justify-center mt-4">
        <Link to="/dashboard/student/exams">
          <Button variant="outline" className="flex items-center gap-2">
            View All Practice Tests <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    </div>
  );
};

const PracticeExamCard = ({ 
  title, 
  subject, 
  questionsCount, 
  duration,
  difficulty,
  recommended
}: { 
  title: string; 
  subject: string; 
  questionsCount: number; 
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  recommended: boolean;
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
      <Card className={`hover:shadow-md transition-all duration-200 h-full ${recommended ? 'border-blue-300' : ''}`}>
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-sm text-gray-500 flex items-center">
              <Book className="text-blue-500 mr-1" size={16} />
              {subject}
            </span>
            
            {recommended && (
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center">
                <Star className="mr-1" size={12} />
                Recommended
              </Badge>
            )}
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
