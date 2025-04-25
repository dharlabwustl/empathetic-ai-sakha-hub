
import React from 'react';
import ConceptCardView from '@/components/dashboard/student/concept-cards/ConceptCardView';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Book } from 'lucide-react';
import TodayStudyPlan from '@/components/dashboard/student/TodayStudyPlan';
import { Card, CardContent } from '@/components/ui/card';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';

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
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="h-40 animate-pulse">
              <CardContent className="p-0 h-full">
                <div className="bg-gray-200 h-full rounded-md"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : todayCards.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {todayCards.slice(0, 3).map((card) => (
            <Link key={card.id} to={`/dashboard/student/concepts/${card.id}`}>
              <Card className="h-full hover:shadow-md transition-shadow duration-200 overflow-hidden group border-l-4" style={{ borderLeftColor: getDifficultyColor(card.difficulty) }}>
                <CardContent className="p-4 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${card.completed ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700"}`}>
                      {card.completed ? "Completed" : "Pending"}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700`}>
                      {card.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors duration-200">
                    {card.title}
                  </h3>
                  
                  <div className="mt-auto pt-2 space-y-1 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Book size={14} />
                      <span>{card.subject} • {card.chapter}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <Card className="bg-gray-50">
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">No concept cards scheduled for today</p>
            <Link to="/dashboard/student/concepts/all" className="mt-2 inline-block">
              <Button variant="outline" size="sm" className="mt-2">
                Browse All Concepts
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
      
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

// Helper functions
const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return '#22c55e';
    case 'medium': return '#f59e0b';
    case 'hard': return '#ef4444';
    default: return '#6366f1';
  }
};
