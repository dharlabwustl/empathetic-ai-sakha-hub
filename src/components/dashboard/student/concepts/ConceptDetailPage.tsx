
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConceptsPageLayout } from "@/components/dashboard/student/concept-cards/ConceptsPageLayout";
import ConceptHeader from "./concept-detail/ConceptHeader";
import ConceptMasterySection from "./ConceptMasterySection";
import ConceptContent from "./concept-detail/ConceptContent";
import ConceptSidebar from "./concept-detail/ConceptSidebar";
import ConceptResources from "./concept-detail/ConceptResources";
import AIInsightsSection from "./AIInsightsSection";
import { useParams } from "react-router-dom";
import { Book, Video, Lightbulb, AlertTriangle, BarChart3, RefreshCw, FileText, MessageSquare, FlaskConical, Box, Volume2, Zap, Brain, Eye } from "lucide-react";
import QuickRecallSection from "./concept-detail/QuickRecallSection";
import AnalyticsSection from "./AnalyticsSection";
import { Button } from "@/components/ui/button";

// Mock data - this would normally come from an API
const conceptData = {
  id: "concept-1",
  title: "Newton's Second Law",
  subject: "Physics",
  topic: "Mechanics",
  difficulty: "medium" as const,
  description: "Understanding force, mass and acceleration",
  bookmarked: true,
  masteryLevel: 68,
  recallAccuracy: 75,
  timeSpent: 135, // in minutes
  lastReviewed: "2 days ago",
  nextReview: "Tomorrow",
  examReady: true,
  tags: ["Classical Mechanics", "Forces", "Acceleration", "NEET 2026"],
  relatedConcepts: [
    { id: "concept-2", title: "Newton's First Law", masteryLevel: 85 },
    { id: "concept-3", title: "Newton's Third Law", masteryLevel: 62 },
    { id: "concept-4", title: "Conservation of Momentum", masteryLevel: 45 }
  ],
  content: `
    <h2>Newton's Second Law of Motion</h2>
    <p>Newton's Second Law of Motion states that the force acting on an object is equal to the mass of the object multiplied by its acceleration.</p>
    <p>The mathematical representation is: F = ma</p>
    <p>Where:</p>
    <ul>
      <li>F is the net force acting on the object (measured in Newtons, N)</li>
      <li>m is the mass of the object (measured in kilograms, kg)</li>
      <li>a is the acceleration of the object (measured in meters per second squared, m/s²)</li>
    </ul>
    <p>This law explains how the velocity of an object changes when it is subjected to an external force. The law assumes that the mass of the object is constant.</p>
  `
};

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const [activeTab, setActiveTab] = useState("learn");
  const [bookmarked, setBookmarked] = useState(conceptData.bookmarked);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  
  const handleBookmarkToggle = () => {
    setBookmarked(prev => !prev);
  };
  
  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
  };

  const handleReadAloud = () => {
    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
    } else {
      const text = "Newton's Second Law of Motion. " + conceptData.content.replace(/<[^>]*>/g, '');
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.onend = () => setIsReadingAloud(false);
      window.speechSynthesis.speak(utterance);
      setIsReadingAloud(true);
    }
  };
  
  return (
    <ConceptsPageLayout
      title="Concept Study"
      subtitle="Master one concept at a time"
      showBackButton={true}
    >
      <div className="space-y-6">
        {/* Enhanced Masthead with concept title, basic info and tags */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 rounded-xl p-6 border border-blue-200/50 dark:border-blue-800/30">
          <ConceptHeader
            title={conceptData.title}
            subject={conceptData.subject}
            topic={conceptData.topic}
            difficulty={conceptData.difficulty}
            isBookmarked={bookmarked}
            onBookmarkToggle={handleBookmarkToggle}
          />
          
          {/* Tags Section */}
          <div className="flex flex-wrap gap-2 mt-4">
            {conceptData.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full border border-blue-200/50 dark:border-blue-700/30"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Read Aloud Button */}
          <div className="mt-4">
            <Button
              onClick={handleReadAloud}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Volume2 className={`w-4 h-4 ${isReadingAloud ? 'animate-pulse' : ''}`} />
              {isReadingAloud ? 'Stop Reading' : 'Read Aloud'}
            </Button>
          </div>
        </div>
        
        {/* Mastery and recall tracker */}
        <ConceptMasterySection
          conceptName={conceptData.title}
          masteryPercentage={conceptData.masteryLevel}
          recallPercentage={conceptData.recallAccuracy}
          timeSpent={conceptData.timeSpent}
          lastReviewed={conceptData.lastReviewed}
          nextReview={conceptData.nextReview}
        />

        {/* AI Insights section - moved up for better visibility */}
        <AIInsightsSection 
          conceptId={conceptId || ""}
          conceptTitle={conceptData.title}
        />
        
        {/* Main content area with tabs and sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="learn" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              {/* Primary tabs for different learning modalities */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    Learning Modalities
                  </h3>
                  <TabsList className="grid w-full grid-cols-4 md:grid-cols-7 gap-1 h-auto p-1">
                    <TabsTrigger value="learn" className="flex flex-col items-center gap-1 p-2 text-xs">
                      <Book className="h-3 w-3" />
                      <span>Learn</span>
                    </TabsTrigger>
                    <TabsTrigger value="visual" className="flex flex-col items-center gap-1 p-2 text-xs">
                      <Eye className="h-3 w-3" />
                      <span>Visual</span>
                    </TabsTrigger>
                    <TabsTrigger value="3d" className="flex flex-col items-center gap-1 p-2 text-xs">
                      <Box className="h-3 w-3" />
                      <span>3D Sim</span>
                    </TabsTrigger>
                    <TabsTrigger value="formula" className="flex flex-col items-center gap-1 p-2 text-xs">
                      <FlaskConical className="h-3 w-3" />
                      <span>Formula</span>
                    </TabsTrigger>
                    <TabsTrigger value="video" className="flex flex-col items-center gap-1 p-2 text-xs">
                      <Video className="h-3 w-3" />
                      <span>Video</span>
                    </TabsTrigger>
                    <TabsTrigger value="mistakes" className="flex flex-col items-center gap-1 p-2 text-xs">
                      <AlertTriangle className="h-3 w-3" />
                      <span>Mistakes</span>
                    </TabsTrigger>
                    <TabsTrigger value="previous-year" className="flex flex-col items-center gap-1 p-2 text-xs">
                      <Lightbulb className="h-3 w-3" />
                      <span>PYQs</span>
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Secondary tabs for learning management */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    Learning Management
                  </h3>
                  <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 gap-1 h-auto p-1">
                    <TabsTrigger value="recall" className="flex flex-col items-center gap-1 p-2 text-xs">
                      <RefreshCw className="h-3 w-3" />
                      <span>Recall</span>
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="flex flex-col items-center gap-1 p-2 text-xs">
                      <BarChart3 className="h-3 w-3" />
                      <span>Analytics</span>
                    </TabsTrigger>
                    <TabsTrigger value="revision" className="flex flex-col items-center gap-1 p-2 text-xs">
                      <RefreshCw className="h-3 w-3" />
                      <span>Revision</span>
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="flex flex-col items-center gap-1 p-2 text-xs">
                      <FileText className="h-3 w-3" />
                      <span>Notes</span>
                    </TabsTrigger>
                    <TabsTrigger value="discuss" className="flex flex-col items-center gap-1 p-2 text-xs">
                      <MessageSquare className="h-3 w-3" />
                      <span>Discuss</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
              
              {/* Tab content areas */}
              <TabsContent value="learn" className="mt-6">
                <ConceptContent content={conceptData.content} />
              </TabsContent>
              
              <TabsContent value="visual" className="mt-6">
                <div className="p-6 text-center bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 rounded-lg border border-purple-200/50 dark:border-purple-700/30">
                  <Eye className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="text-lg font-semibold mb-2">Visual Learning Mode</h3>
                  <p className="text-gray-600 dark:text-gray-400">Interactive visual representations and diagrams for {conceptData.title}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="3d" className="mt-6">
                <div className="p-6 text-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg border border-green-200/50 dark:border-green-700/30">
                  <Box className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h3 className="text-lg font-semibold mb-2">3D Simulation</h3>
                  <p className="text-gray-600 dark:text-gray-400">Interactive 3D models and simulations for {conceptData.title}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="video" className="mt-6">
                <ConceptResources conceptId={conceptId || ""} />
              </TabsContent>
              
              <TabsContent value="formula" className="mt-6">
                <div className="p-6 text-center bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 rounded-lg border border-orange-200/50 dark:border-orange-700/30">
                  <FlaskConical className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                  <h3 className="text-lg font-semibold mb-2">Formula Laboratory</h3>
                  <p className="text-gray-600 dark:text-gray-400">Interactive formula practice and manipulation for {conceptData.title}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="mistakes" className="mt-6">
                <div className="p-6 text-center bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20 rounded-lg border border-red-200/50 dark:border-red-700/30">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-red-600" />
                  <h3 className="text-lg font-semibold mb-2">Common Mistakes</h3>
                  <p className="text-gray-600 dark:text-gray-400">Learn from common errors and misconceptions in {conceptData.title}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="previous-year" className="mt-6">
                <div className="p-6 text-center bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 rounded-lg border border-yellow-200/50 dark:border-yellow-700/30">
                  <Lightbulb className="w-12 h-12 mx-auto mb-4 text-yellow-600" />
                  <h3 className="text-lg font-semibold mb-2">Previous Year Questions</h3>
                  <p className="text-gray-600 dark:text-gray-400">Practice with actual exam questions related to {conceptData.title}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="recall" className="mt-6">
                <QuickRecallSection 
                  conceptId={conceptId || ""}
                  title={conceptData.title}
                  content={conceptData.content}
                  onQuizComplete={handleQuizComplete}
                />
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-6">
                <AnalyticsSection conceptName={conceptData.title} />
              </TabsContent>
              
              <TabsContent value="revision" className="mt-6">
                <div className="p-6 text-center bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/20 dark:to-blue-950/20 rounded-lg border border-indigo-200/50 dark:border-indigo-700/30">
                  <RefreshCw className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
                  <h3 className="text-lg font-semibold mb-2">Revision Schedule</h3>
                  <p className="text-gray-600 dark:text-gray-400">Spaced repetition and revision scheduling for {conceptData.title}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="notes" className="mt-6">
                <div className="p-6 text-center bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/20 dark:to-cyan-950/20 rounded-lg border border-teal-200/50 dark:border-teal-700/30">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-teal-600" />
                  <h3 className="text-lg font-semibold mb-2">Personal Notes</h3>
                  <p className="text-gray-600 dark:text-gray-400">Your personal annotations and notes for {conceptData.title}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="discuss" className="mt-6">
                <div className="p-6 text-center bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 rounded-lg border border-violet-200/50 dark:border-violet-700/30">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-violet-600" />
                  <h3 className="text-lg font-semibold mb-2">Community Discussion</h3>
                  <p className="text-gray-600 dark:text-gray-400">Join the discussion and get AI insights about {conceptData.title}</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Enhanced Sidebar with linked concepts, flashcards, and exam info */}
          <div className="space-y-6">
            <ConceptSidebar 
              masteryLevel={conceptData.masteryLevel}
              relatedConcepts={conceptData.relatedConcepts}
              examReady={conceptData.examReady}
            />
          </div>
        </div>
      </div>
    </ConceptsPageLayout>
  );
};

export default ConceptDetailPage;
