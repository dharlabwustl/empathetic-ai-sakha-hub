
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlashcardsOverviewTab } from './FlashcardsOverviewTab';
import { FlashcardsSubjectTab } from './FlashcardsSubjectTab';
import { Brain } from 'lucide-react';

const FlashcardsLandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const subjects = ['Physics', 'Chemistry', 'Biology'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 dark:from-purple-900/10 dark:via-gray-900 dark:to-blue-900/10">
      <Helmet>
        <title>Flashcards - PREPZR</title>
        <meta name="description" content="NEET flashcards for quick review and memorization" />
      </Helmet>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Smart Flashcards
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Improve concept recall and retention through active learning and spaced repetition
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
            <FlashcardsOverviewTab />
          </TabsContent>

          {subjects.map((subject) => (
            <TabsContent key={subject} value={subject.toLowerCase()} className="mt-6">
              <FlashcardsSubjectTab subject={subject} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default FlashcardsLandingPage;
