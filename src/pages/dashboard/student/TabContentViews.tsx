
import React from 'react';
import { TodaysPlanSection } from "@/components/dashboard/student/todays-plan";
import FlashcardsFeature from "@/components/dashboard/student/FlashcardsFeature";
import PracticeExamsSection from "@/components/dashboard/student/practice-exams/PracticeExamsSection";
import ExamAnalysisSection from "@/components/dashboard/student/practice-exams/ExamAnalysisSection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, BarChart3 } from 'lucide-react';
import ConceptCardView from '@/components/dashboard/student/concept-cards/ConceptCardView';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

// Today's Plan Tab View
export const TodayPlanView = () => {
  return <TodaysPlanSection />;
};

// Flashcards Tab View
export const FlashcardsView = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Flashcards</h2>
          <p className="text-gray-600">
            Review and memorize key concepts with interactive flashcards.
          </p>
        </div>
        <Link to="/dashboard/student/flashcards/all">
          <Button variant="outline" className="flex items-center gap-2">
            View All <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
      <FlashcardsFeature />
    </div>
  );
};

// Practice Exams Tab View with Analysis Tab
export const PracticeExamsView = () => {
  const [activeTab, setActiveTab] = React.useState('exams');
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="exams" className="flex-1 flex items-center justify-center">
            <FileText className="h-4 w-4 mr-2" />
            Practice Exams
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex-1 flex items-center justify-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="exams">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Practice Exams</h2>
                <p className="text-gray-600">
                  Test your knowledge with comprehensive practice exams
                </p>
              </div>
              <Link to="/dashboard/student/exams">
                <Button variant="outline" className="flex items-center gap-2">
                  View All <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
            <PracticeExamsSection />
          </div>
        </TabsContent>
        
        <TabsContent value="analysis">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Exam Analysis</h2>
                <p className="text-gray-600">
                  Review your performance analytics
                </p>
              </div>
            </div>
            <ExamAnalysisSection />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Micro-Concept Tab View
export const MicroConceptView = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Concept Cards</h2>
          <p className="text-gray-600">
            Browse through your learning concepts and master the fundamentals.
          </p>
        </div>
        <Link to="/dashboard/student/concepts/all">
          <Button variant="outline" className="flex items-center gap-2">
            View All <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
      <ConceptCardView 
        title="Study Concepts" 
        limit={6}
        showViewAll={true}
      />
    </div>
  );
};
