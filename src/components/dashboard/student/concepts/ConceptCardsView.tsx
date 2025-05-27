
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import OverviewSection from '@/components/dashboard/student/OverviewSection';
import ConceptCardView from '../concept-cards/ConceptCardView';
import DailySmartSuggestions from './DailySmartSuggestions';
import { Button } from '@/components/ui/button';
import { Plus, Search, Filter } from 'lucide-react';

const ConceptCardsView = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const overviewData = {
    type: "Concepts" as const,
    title: "NEET Concept Cards Overview",
    subjects: [
      { name: "Physics", completed: 45, total: 60, progress: 75, efficiency: 82, studyTime: 120 },
      { name: "Chemistry", completed: 38, total: 55, progress: 69, efficiency: 76, studyTime: 95 },
      { name: "Biology", completed: 52, total: 65, progress: 80, efficiency: 88, studyTime: 110 }
    ],
    totalStudyTime: 325,
    overallProgress: 75,
    suggestions: [
      "Focus more on Physics electromagnetism concepts",
      "Chemistry organic reactions need daily practice",
      "Biology classification concepts are well mastered"
    ]
  };

  return (
    <SharedPageLayout
      title="Concept Cards"
      subtitle="Master NEET concepts with interactive learning cards"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Card
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="today">Today's Cards</TabsTrigger>
            <TabsTrigger value="all">All Cards</TabsTrigger>
            <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              <OverviewSection {...overviewData} />
              <DailySmartSuggestions />
            </div>
          </TabsContent>

          <TabsContent value="today">
            <ConceptCardView 
              title="Today's Concept Cards"
              limit={12}
              showViewAll={false}
            />
          </TabsContent>

          <TabsContent value="all">
            <ConceptCardView 
              title="All Concept Cards"
              limit={20}
              showViewAll={true}
            />
          </TabsContent>

          <TabsContent value="bookmarked">
            <Card>
              <CardHeader>
                <CardTitle>Bookmarked Concepts</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Your bookmarked concept cards will appear here...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardsView;
