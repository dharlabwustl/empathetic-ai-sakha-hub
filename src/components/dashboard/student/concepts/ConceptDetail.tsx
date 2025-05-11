
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Card, 
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  Video, 
  Activity, 
  Calculator,
  Clock,
} from 'lucide-react';

import FormulaTabContent from './FormulaTabContent';
import OverviewTabContent from './OverviewTabContent';
import NotesTabContent from './NotesTabContent';
import VideoTabContent from './VideoTabContent';
import QuizTabContent from './QuizTabContent';

// Example concept data structure
interface ConceptData {
  id: string;
  title: string;
  description: string;
  timeEstimate: number;
  subject: string;
  chapter: string;
  difficulty: 'easy' | 'medium' | 'hard';
  progress: number;
  hasFormulas: boolean;
  hasVideos: boolean;
  hasQuiz: boolean;
}

const ConceptDetail: React.FC = () => {
  const { conceptId, activeTab = 'overview' } = useParams<{conceptId: string, activeTab?: string}>();
  const navigate = useNavigate();
  const [concept, setConcept] = useState<ConceptData | null>(null);
  const [currentTab, setCurrentTab] = useState(activeTab);
  
  // Fetch concept data
  useEffect(() => {
    // This would typically be an API call
    // For demo purposes, we'll simulate data
    const mockConcept: ConceptData = {
      id: conceptId || '1',
      title: 'Newton\'s Laws of Motion',
      description: 'Understand the fundamental principles that govern the motion of all objects.',
      timeEstimate: 45,
      subject: 'Physics',
      chapter: 'Classical Mechanics',
      difficulty: 'medium',
      progress: 65,
      hasFormulas: true,
      hasVideos: true,
      hasQuiz: true
    };
    
    setTimeout(() => {
      setConcept(mockConcept);
    }, 500);
  }, [conceptId]);
  
  // Update tab when URL changes
  useEffect(() => {
    if (activeTab) {
      setCurrentTab(activeTab);
    }
  }, [activeTab]);
  
  // Tab change handler
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    navigate(`/dashboard/student/concepts/${conceptId}/${tab}`);
  };
  
  // Go back handler
  const handleGoBack = () => {
    navigate(-1);
  };

  // Formula lab handler
  const handleGoToFormulaLab = () => {
    navigate(`/dashboard/student/concepts/${conceptId}/formula-lab`);
  };
  
  if (!concept) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2"></div>
          <div className="h-36 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  // Dynamically determine available tabs
  const availableTabs = [
    { id: 'overview', label: 'Overview', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'notes', label: 'Notes', icon: <FileText className="h-4 w-4" /> },
  ];
  
  if (concept.hasVideos) {
    availableTabs.push({ id: 'videos', label: 'Videos', icon: <Video className="h-4 w-4" /> });
  }
  
  if (concept.hasFormulas) {
    availableTabs.push({ id: 'formulas', label: 'Formulas', icon: <Calculator className="h-4 w-4" /> });
  }
  
  if (concept.hasQuiz) {
    availableTabs.push({ id: 'quiz', label: 'Quiz', icon: <Activity className="h-4 w-4" /> });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handleGoBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Concepts</span>
        </Button>
      </div>

      <Card className="bg-white dark:bg-gray-950">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <CardTitle className="text-2xl">{concept.title}</CardTitle>
              <CardDescription className="mt-1">
                {concept.subject} • {concept.chapter}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{concept.timeEstimate} min</span>
              </Badge>
              
              <Badge variant={
                concept.difficulty === 'easy' ? 'default' :
                concept.difficulty === 'hard' ? 'destructive' :
                'secondary'
              }>
                {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Progress indicator */}
          <div className="mb-6">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{concept.progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded dark:bg-gray-700">
              <div 
                className="h-full rounded bg-blue-600" 
                style={{ width: `${concept.progress}%` }}
              ></div>
            </div>
          </div>
          
          {/* Tab navigation */}
          <Tabs value={currentTab} onValueChange={handleTabChange} className="mt-6">
            <TabsList className="mb-4">
              {availableTabs.map(tab => (
                <TabsTrigger key={tab.id} value={tab.id} className="flex gap-1 items-center">
                  {tab.icon}
                  <span>{tab.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="overview">
              <OverviewTabContent concept={concept} />
            </TabsContent>
            
            <TabsContent value="notes">
              <NotesTabContent conceptId={concept.id} />
            </TabsContent>
            
            <TabsContent value="videos">
              <VideoTabContent conceptId={concept.id} />
            </TabsContent>
            
            <TabsContent value="formulas">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <Button 
                    onClick={handleGoToFormulaLab}
                    className="flex items-center gap-2"
                  >
                    <Calculator className="h-4 w-4" />
                    Open Formula Lab
                  </Button>
                </div>
                <FormulaTabContent />
              </div>
            </TabsContent>
            
            <TabsContent value="quiz">
              <QuizTabContent conceptId={concept.id} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptDetail;
