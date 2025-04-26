
import React from 'react';
import { TodaysPlanSection } from "@/components/dashboard/student/todays-plan";
import FlashcardsFeature from "@/components/dashboard/student/FlashcardsFeature";
import PracticeExamsSection from "@/components/dashboard/student/practice-exams/PracticeExamsSection";
import ExamAnalysisSection from "@/components/dashboard/student/practice-exams/ExamAnalysisSection";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, BarChart3 } from 'lucide-react';

// Today's Plan Tab View
export const TodayPlanView = () => {
  return <TodaysPlanSection />;
};

// Flashcards Tab View
export const FlashcardsView = () => {
  return <FlashcardsFeature />;
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
          <PracticeExamsSection />
        </TabsContent>
        
        <TabsContent value="analysis">
          <ExamAnalysisSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Micro-Concept Tab View
export const MicroConceptView = () => {
  return <div className="text-center p-10">Micro-Concepts Content Coming Soon</div>;
};
