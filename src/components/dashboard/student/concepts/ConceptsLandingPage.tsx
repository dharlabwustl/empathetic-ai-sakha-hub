
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConceptsOverviewTab } from './ConceptsOverviewTab';
import { ConceptsSubjectTab } from './ConceptsSubjectTab';
import { BookOpen } from 'lucide-react';

const ConceptsLandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const subjects = ['Physics', 'Chemistry', 'Biology'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 dark:from-blue-900/10 dark:via-gray-900 dark:to-indigo-900/10">
      <Helmet>
        <title>Concepts - PREPZR</title>
        <meta name="description" content="Master NEET concepts with our comprehensive concept cards" />
      </Helmet>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Concept Cards
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Master key concepts and fundamentals for NEET 2026 preparation
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {subjects.map((subject) => (
              <TabsTrigger key={subject} value={subject.toLowerCase()}>
                {subject}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <ConceptsOverviewTab />
          </TabsContent>

          {subjects.map((subject) => (
            <TabsContent key={subject} value={subject.toLowerCase()} className="mt-6">
              <ConceptsSubjectTab subject={subject} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ConceptsLandingPage;
