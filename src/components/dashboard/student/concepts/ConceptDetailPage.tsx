
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, 
  Eye, 
  FlaskConical, 
  Video, 
  AlertTriangle,
  Brain,
  BarChart3,
  Clock,
  MessageSquare,
  Pen,
  Box,
  PlayCircle
} from 'lucide-react';
import BackButton from '../BackButton';
import ConceptHeader from './concept-detail/ConceptHeader';
import FormulaTabContent from './concept-detail/FormulaTabContent';
import AIInsights from './AIInsights';
import ConceptExplanationContent from '../concept-cards/ConceptExplanationContent';
import CommonMistakesContent from './CommonMistakesContent';

// Mock data for concept
const mockConcept = {
  id: 'newtons-laws',
  title: "Newton's Laws of Motion",
  subject: 'Physics',
  topic: 'Mechanics',
  description: 'The three fundamental laws that form the foundation of classical mechanics.',
  difficulty: 'medium' as const,
  progress: 45,
  completed: false,
  isBookmarked: false,
  relatedConcepts: ['Force', 'Acceleration', 'Momentum']
};

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams();
  const [activeTab, setActiveTab] = useState('learn');
  const [activeSecondaryTab, setActiveSecondaryTab] = useState('notes');
  const [isBookmarked, setIsBookmarked] = useState(mockConcept.isBookmarked);
  const [isReadingAloud, setIsReadingAloud] = useState(false);

  const handleBookmarkToggle = () => {
    setIsBookmarked(prev => !prev);
  };

  const handleReadAloud = () => {
    setIsReadingAloud(prev => !prev);
    
    if (!isReadingAloud) {
      // In a real app, we would use the Web Speech API here
      const speech = new SpeechSynthesisUtterance();
      speech.text = "Newton's Laws of Motion are three fundamental principles that explain how objects move and interact with forces. The first law states that an object at rest stays at rest, and an object in motion stays in motion unless acted upon by a force. The second law relates force, mass and acceleration. The third law states that for every action, there is an equal and opposite reaction.";
      speech.rate = 1;
      speech.pitch = 1;
      window.speechSynthesis.speak(speech);
    } else {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <BackButton to="/dashboard/student/concepts" />
      
      {/* Concept Header */}
      <ConceptHeader 
        title={mockConcept.title}
        subject={mockConcept.subject}
        topic={mockConcept.topic}
        difficulty={mockConcept.difficulty}
        isBookmarked={isBookmarked}
        onBookmarkToggle={handleBookmarkToggle}
      />
      
      {/* Mastery & Recall Tracker */}
      <Card className="p-4 border border-indigo-200 dark:border-indigo-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Concept Mastery</h3>
            <div className="flex items-center gap-2">
              <Progress value={45} className="h-2 flex-1" />
              <span className="text-sm font-medium">45%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Recall Accuracy</h3>
            <div className="flex items-center gap-2">
              <Progress value={72} className="h-2 flex-1 bg-amber-100 dark:bg-amber-900/30" />
              <span className="text-sm font-medium">72%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleReadAloud}
              className={isReadingAloud ? "bg-purple-100 border-purple-300 dark:bg-purple-900/30 dark:border-purple-800" : ""}
            >
              <PlayCircle className={`h-4 w-4 mr-2 ${isReadingAloud ? "text-purple-600" : ""}`} />
              {isReadingAloud ? "Stop Reading" : "Read Aloud"}
            </Button>
            
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              Track Study Time
            </Button>
          </div>
        </div>
      </Card>
      
      {/* AI Insights */}
      <AIInsights conceptName={mockConcept.title} />
      
      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-4">
          <TabsTrigger value="learn" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Learn</span>
          </TabsTrigger>
          
          <TabsTrigger value="visual" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">Visual</span>
          </TabsTrigger>
          
          <TabsTrigger value="3d" className="flex items-center gap-2">
            <Box className="h-4 w-4" />
            <span className="hidden sm:inline">3D</span>
          </TabsTrigger>
          
          <TabsTrigger value="formula" className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4" />
            <span className="hidden sm:inline">Formula</span>
          </TabsTrigger>
          
          <TabsTrigger value="video" className="flex items-center gap-2">
            <Video className="h-4 w-4" />
            <span className="hidden sm:inline">Video</span>
          </TabsTrigger>
          
          <TabsTrigger value="mistakes" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span className="hidden sm:inline">Mistakes</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Learn Tab Content */}
        <TabsContent value="learn">
          <ConceptExplanationContent conceptTitle={mockConcept.title} />
        </TabsContent>
        
        {/* Visual Tab Content */}
        <TabsContent value="visual">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Visual Representation</h3>
            <div className="bg-slate-100 dark:bg-slate-900 rounded-lg aspect-video flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400">Interactive diagrams and visualizations would be displayed here</p>
            </div>
          </Card>
        </TabsContent>
        
        {/* 3D Tab Content */}
        <TabsContent value="3d">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">3D Models & Simulations</h3>
            <div className="bg-slate-100 dark:bg-slate-900 rounded-lg aspect-video flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400">Interactive 3D simulations would be displayed here</p>
            </div>
          </Card>
        </TabsContent>
        
        {/* Formula Tab Content */}
        <TabsContent value="formula">
          <FormulaTabContent 
            conceptId={conceptId || 'newtons-laws'}
            conceptTitle={mockConcept.title}
            handleOpenFormulaLab={() => console.log("Opening formula lab")}
          />
        </TabsContent>
        
        {/* Video Tab Content */}
        <TabsContent value="video">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Video Tutorials</h3>
            <div className="bg-slate-100 dark:bg-slate-900 rounded-lg aspect-video flex items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400">Video tutorials would be embedded here</p>
            </div>
          </Card>
        </TabsContent>
        
        {/* Common Mistakes Tab Content */}
        <TabsContent value="mistakes">
          <CommonMistakesContent conceptName={mockConcept.title} />
        </TabsContent>
      </Tabs>
      
      {/* Secondary Tabs */}
      <Tabs value={activeSecondaryTab} onValueChange={setActiveSecondaryTab} className="w-full mt-6">
        <TabsList className="grid w-full grid-cols-5 mb-4">
          <TabsTrigger value="recall" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Recall</span>
          </TabsTrigger>
          
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Analytics</span>
          </TabsTrigger>
          
          <TabsTrigger value="revision" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Revision</span>
          </TabsTrigger>
          
          <TabsTrigger value="notes" className="flex items-center gap-2">
            <Pen className="h-4 w-4" />
            <span className="hidden sm:inline">Notes</span>
          </TabsTrigger>
          
          <TabsTrigger value="discuss" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            <span className="hidden sm:inline">Discuss</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Recall Tab Content */}
        <TabsContent value="recall">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Quick Recall Exercises</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">What are Newton's Three Laws?</h4>
                <Button className="mt-2">Show Answer</Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">If F = ma, what happens to acceleration when mass increases?</h4>
                <Button className="mt-2">Show Answer</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        {/* Analytics Tab Content */}
        <TabsContent value="analytics">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Performance Analytics</h3>
            <div className="space-y-4">
              <p>Your analytics and performance metrics for this concept would be displayed here.</p>
            </div>
          </Card>
        </TabsContent>
        
        {/* Revision Tab Content */}
        <TabsContent value="revision">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Revision Schedule</h3>
            <div className="space-y-4">
              <div className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Next revision due</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">May 25, 2025</p>
                  </div>
                  <Button size="sm" variant="outline">Mark as Revised</Button>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-1">Revision History</h4>
                <div className="text-sm">
                  <p>First studied: May 10, 2025</p>
                  <p>Last revised: May 18, 2025</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        {/* Notes Tab Content */}
        <TabsContent value="notes">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Your Notes</h3>
            <div className="space-y-4">
              <textarea 
                className="w-full h-40 p-3 border rounded-lg"
                placeholder="Add your notes about this concept here..."
              ></textarea>
              <Button>Save Notes</Button>
            </div>
          </Card>
        </TabsContent>
        
        {/* Discuss Tab Content */}
        <TabsContent value="discuss">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Discussion Forum</h3>
            <div className="space-y-4">
              <p>Discussion forum about this concept would be displayed here.</p>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptDetailPage;
