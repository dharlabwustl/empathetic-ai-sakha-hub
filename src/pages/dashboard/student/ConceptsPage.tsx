
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import ConceptsList from '@/components/dashboard/student/concept-cards/ConceptsList';
import ConceptFilters from '@/components/dashboard/student/concept-cards/ConceptFilters';
import ConceptProgress from '@/components/dashboard/student/concept-cards/ConceptProgress';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useSubjectFilters } from '@/hooks/useSubjectFilters';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain } from 'lucide-react';

const ConceptsPage = () => {
  const { conceptCards, loading } = useUserStudyPlan();
  const { userProfile } = useUserProfile();
  const {
    selectedSubject,
    setSelectedSubject,
    selectedDifficulty,
    setSelectedDifficulty,
    searchQuery,
    setSearchQuery,
    clearFilters
  } = useSubjectFilters();

  const examGoal = userProfile?.goals?.[0]?.title || 'IIT-JEE';

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
                <h1 className="text-3xl font-bold">Concept Cards</h1>
                <p className="text-gray-600 mt-1">
                  Master concepts for your {examGoal} exam preparation
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-50 p-2 rounded-lg">
                <Brain className="text-blue-500" size={20} />
                <div>
                  <p className="text-sm font-medium">Exam Goal</p>
                  <p className="text-blue-700 font-semibold">{examGoal}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Summary */}
          <ConceptProgress conceptCards={conceptCards} />

          {/* Filters */}
          <ConceptFilters
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            clearFilters={clearFilters}
            conceptCards={conceptCards}
          />

          {/* Concept Cards List */}
          <ConceptsList
            conceptCards={conceptCards}
            loading={loading}
            selectedSubject={selectedSubject}
            selectedDifficulty={selectedDifficulty}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default ConceptsPage;
