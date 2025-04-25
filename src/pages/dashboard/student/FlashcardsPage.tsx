
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import FlashcardsOverview from '@/components/dashboard/student/flashcards/FlashcardsOverview';

const FlashcardsPage = () => {
  const { conceptCards } = useUserStudyPlan();
  const { userProfile } = useUserProfile();
  const examGoal = userProfile?.goals?.[0]?.title || 'IIT-JEE';
  
  // Get completed concepts to determine available flashcards
  const completedConcepts = conceptCards.filter(card => card.completed);
  
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="space-y-6">
          {/* Header Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <Link to="/dashboard/student/overview" className="inline-flex items-center text-blue-600 hover:text-blue-700">
                <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold">Flashcards</h1>
                <p className="text-gray-600 mt-1">
                  Reinforce your {examGoal} knowledge with adaptive flashcards
                </p>
              </div>
            </div>
          </div>
          
          {/* Enhanced Flashcards Overview Component */}
          <FlashcardsOverview />
        </div>
      </div>
    </MainLayout>
  );
};

export default FlashcardsPage;
