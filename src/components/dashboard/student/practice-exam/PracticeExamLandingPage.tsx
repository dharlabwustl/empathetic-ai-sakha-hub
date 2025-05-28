
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PracticeExamsOverviewTab } from './PracticeExamsOverviewTab';
import { PracticeExamsSubjectTab } from './PracticeExamsSubjectTab';
import { FileText } from 'lucide-react';

const PracticeExamLandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const subjects = ['Physics', 'Chemistry', 'Biology', 'Mixed'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-emerald-50/50 dark:from-green-900/10 dark:via-gray-900 dark:to-emerald-900/10">
      <Helmet>
        <title>Practice Exams - PREPZR</title>
        <meta name="description" content="NEET practice exams for comprehensive assessment" />
      </Helmet>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Practice Exams
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Evaluate learning with timed practice exams, track performance, and analyze weaknesses
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            {subjects.map((subject) => (
              <TabsTrigger key={subject} value={subject.toLowerCase()}>
                {subject}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <PracticeExamsOverviewTab />
          </TabsContent>

          {subjects.map((subject) => (
            <TabsContent key={subject} value={subject.toLowerCase()} className="mt-6">
              <PracticeExamsSubjectTab subject={subject} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default PracticeExamLandingPage;
