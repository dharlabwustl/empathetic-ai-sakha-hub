import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, BookOpen, Brain, Lightbulb, Flame } from 'lucide-react';
import { useConceptDetail } from "@/hooks/useConceptDetail";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import LoadingState from '@/components/common/LoadingState';
import ErrorState from '@/components/common/ErrorState';
import TabProgressMeter from '../TabProgressMeter';
import TabAIAssistant from '../TabAIAssistant';
import ConceptSidebar from './ConceptSidebar';
import QuickRecallSection from './QuickRecallSection';
import NoteSection from './NoteSection';

interface ConceptDetailPageProps {
  conceptId?: string;
}

import ConceptVoiceAssistant from '@/components/voice/ConceptVoiceAssistant';

const ConceptDetailPage: React.FC<ConceptDetailPageProps> = ({ conceptId }) => {
  const { conceptId: routeConceptId } = useParams<{ conceptId: string }>();
  const finalConceptId = conceptId || routeConceptId;
  
  const { 
    concept, 
    loading, 
    error, 
    updateProgress,
    progressData,
    refreshData
  } = useConceptDetail(finalConceptId || '');

  const handleUpdateProgress = (newProgress: number) => {
    if (concept) {
      updateProgress(concept.id, newProgress);
    }
  };
  
  if (loading) {
    return <LoadingState message="Loading concept details..." />;
  }
  
  if (error) {
    return (
      <ErrorState 
        title="Could not load concept" 
        message={error} 
        action={
          <Button onClick={refreshData}>
            Try Again
          </Button>
        }
      />
    );
  }

  return (
    <SharedPageLayout
      title={concept?.title || "Loading..."}
      subtitle={concept?.subject}
      showBackButton={true}
      backButtonUrl="/dashboard/student/concepts"
    >
      <Helmet>
        <title>{concept?.title || "Concept"} - PREPZR</title>
      </Helmet>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          {/* Main concept content */}
          <ConceptCardDetail 
            concept={concept} 
            onUpdateProgress={handleUpdateProgress}
          />
          
          {/* Interactive sections */}
          <QuickRecallSection />
          <NoteSection />
          
          {/* Add voice assistant */}
          <ConceptVoiceAssistant 
            conceptData={concept}
            userName="Student"
            isEnabled={true}
          />
        </div>
        
        <div className="space-y-4">
          <TabProgressMeter progressData={progressData} tabName="Concepts" />
          <ConceptSidebar 
            concept={concept}
            onUpdateProgress={handleUpdateProgress}
          />
          <TabAIAssistant 
            tabName="Concepts"
            context={`User is currently studying the concept: ${concept?.title}`}
          />
        </div>
      </div>
    </SharedPageLayout>
  );
};

interface ConceptCardDetailProps {
  concept: any;
  onUpdateProgress: (progress: number) => void;
}

const ConceptCardDetail: React.FC<ConceptCardDetailProps> = ({ concept, onUpdateProgress }) => {
  const [progress, setProgress] = useState(concept?.progress || 0);

  useEffect(() => {
    setProgress(concept?.progress || 0);
  }, [concept]);

  const handleProgressChange = (value: number) => {
    setProgress(value);
    onUpdateProgress(value);
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-xl border-0">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-500" />
          {concept?.title}
        </CardTitle>
        <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
          {concept?.subject}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold flex items-center gap-1">
            <Lightbulb className="h-5 w-5 text-yellow-500" />
            Key Concepts
          </h3>
          <p className="text-gray-600 dark:text-gray-400">{concept?.description}</p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold flex items-center gap-1">
            <Flame className="h-5 w-5 text-red-500" />
            Real-World Applications
          </h3>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400">
            {concept?.applications?.map((app: string, index: number) => (
              <li key={index}>{app}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-600 dark:text-gray-400">
              Understanding Progress
            </h4>
            <span className="text-sm text-gray-500">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleProgressChange(Math.max(0, progress - 10))}
              className="text-blue-600 hover:bg-blue-50"
            >
              Decrease
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleProgressChange(Math.min(100, progress + 10))}
              className="text-blue-600 hover:bg-blue-50"
            >
              Increase
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConceptDetailPage;
