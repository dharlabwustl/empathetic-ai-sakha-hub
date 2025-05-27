
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OverviewSection from '../OverviewSection';
import ConceptCardView from '../concept-cards/ConceptCardView';
import ConceptsView from './ConceptsView';
import DailySmartSuggestions from './DailySmartSuggestions';

const ConceptsLandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for overview section
  const conceptsOverviewData = {
    type: 'Concepts' as const,
    title: 'Concept Cards Overview',
    subjects: [
      {
        name: 'Physics',
        completed: 45,
        total: 120,
        progress: 38,
        efficiency: 85,
        studyTime: 28
      },
      {
        name: 'Chemistry',
        completed: 67,
        total: 95,
        progress: 71,
        efficiency: 92,
        studyTime: 22
      },
      {
        name: 'Biology',
        completed: 89,
        total: 110,
        progress: 81,
        efficiency: 88,
        studyTime: 31
      }
    ],
    totalStudyTime: 81,
    overallProgress: 63,
    suggestions: [
      "Focus on Physics mechanics - your weakest area that needs attention",
      "Review Chemistry bonding concepts to strengthen your foundation",
      "Biology cell structure mastery is excellent - maintain the momentum",
      "Practice more numerical problems in Physics for better exam preparation"
    ]
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="today-concepts">Today's Concepts</TabsTrigger>
          <TabsTrigger value="all-concepts">All Concepts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <OverviewSection {...conceptsOverviewData} />
          <DailySmartSuggestions />
        </TabsContent>

        <TabsContent value="today-concepts">
          <ConceptCardView 
            title="Today's Concept Cards" 
            limit={12}
            showViewAll={true}
          />
        </TabsContent>

        <TabsContent value="all-concepts">
          <ConceptsView />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptsLandingPage;
