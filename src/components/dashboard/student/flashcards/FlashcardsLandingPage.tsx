
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FlashcardsOverviewTab } from './FlashcardsOverviewTab';
import { FlashcardsSubjectTab } from './FlashcardsSubjectTab';
import { Brain, ArrowLeft } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const FlashcardsLandingPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const subjects = ['Physics', 'Chemistry', 'Biology'];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 dark:from-purple-900/10 dark:via-gray-900 dark:to-blue-900/10 ${isMobile ? 'pb-20' : ''}`}>
      <Helmet>
        <title>Flashcards - PREPZR</title>
        <meta name="description" content="NEET flashcards for quick review and memorization" />
      </Helmet>

      <div className={`container mx-auto space-y-6 ${isMobile ? 'px-4 py-4' : 'px-4 py-6'}`}>
        {/* Mobile-optimized Header */}
        <div className={`${isMobile ? 'space-y-4' : 'space-y-6'}`}>
          {/* Back button for mobile */}
          {isMobile && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/dashboard/student')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-3 w-3" />
              Dashboard
            </Button>
          )}

          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className={`p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full ${isMobile ? 'p-2' : ''}`}>
                <Brain className={`text-white ${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`} />
              </div>
              <h1 className={`font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent ${isMobile ? 'text-2xl' : 'text-4xl'}`}>
                Smart Flashcards
              </h1>
            </div>
            <p className={`text-gray-600 dark:text-gray-300 max-w-2xl mx-auto ${isMobile ? 'text-sm px-2' : 'text-xl'}`}>
              Improve concept recall and retention through active learning and spaced repetition
            </p>
          </div>
        </div>

        {/* Mobile-optimized Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} ${isMobile ? 'h-auto' : ''}`}>
            <TabsTrigger 
              value="overview"
              className={`${isMobile ? 'text-xs px-2 py-2' : ''}`}
            >
              Overview
            </TabsTrigger>
            {!isMobile && subjects.map((subject) => (
              <TabsTrigger key={subject} value={subject.toLowerCase()}>
                {subject}
              </TabsTrigger>
            ))}
            {isMobile && (
              <TabsTrigger 
                value="subjects"
                className="text-xs px-2 py-2"
              >
                Subjects
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <FlashcardsOverviewTab />
          </TabsContent>

          {/* Mobile: Combined subjects tab */}
          {isMobile && (
            <TabsContent value="subjects" className="mt-6 space-y-4">
              {subjects.map((subject) => (
                <div key={subject} className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b pb-2">
                    {subject}
                  </h3>
                  <FlashcardsSubjectTab subject={subject} />
                </div>
              ))}
            </TabsContent>
          )}

          {/* Desktop: Individual subject tabs */}
          {!isMobile && subjects.map((subject) => (
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
