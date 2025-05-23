
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
import { Book, VideoIcon, Lightbulb, Flask, AlertTriangle, BarChart3, RefreshCw, FileText, MessageSquare } from "lucide-react";

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
  
  const handleBookmarkToggle = () => {
    setBookmarked(prev => !prev);
  };
  
  return (
    <ConceptsPageLayout
      title="Concept Study"
      subtitle="Master one concept at a time"
      showBackButton={true}
    >
      <div className="space-y-6">
        {/* Concept header with title and metadata */}
        <ConceptHeader
          title={conceptData.title}
          subject={conceptData.subject}
          topic={conceptData.topic}
          difficulty={conceptData.difficulty}
          isBookmarked={bookmarked}
          onBookmarkToggle={handleBookmarkToggle}
        />
        
        {/* Mastery and recall tracker */}
        <ConceptMasterySection
          conceptName={conceptData.title}
          masteryPercentage={conceptData.masteryLevel}
          recallPercentage={conceptData.recallAccuracy}
          timeSpent={conceptData.timeSpent}
          lastReviewed={conceptData.lastReviewed}
          nextReview={conceptData.nextReview}
        />
        
        {/* Main content area with tabs and sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Tabs defaultValue="learn" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              {/* Primary tabs for different learning modalities */}
              <TabsList className="mb-6 w-full flex overflow-auto">
                <TabsTrigger value="learn" className="flex items-center gap-2">
                  <Book className="h-4 w-4" />
                  <span>Learn</span>
                </TabsTrigger>
                <TabsTrigger value="visual" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Visual</span>
                </TabsTrigger>
                <TabsTrigger value="video" className="flex items-center gap-2">
                  <VideoIcon className="h-4 w-4" />
                  <span>Video</span>
                </TabsTrigger>
                <TabsTrigger value="formula" className="flex items-center gap-2">
                  <Flask className="h-4 w-4" />
                  <span>Formula Lab</span>
                </TabsTrigger>
                <TabsTrigger value="mistakes" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Common Mistakes</span>
                </TabsTrigger>
                <TabsTrigger value="previous-year" className="flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  <span>Previous Year</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Secondary tabs for learning management */}
              <TabsList className="mb-6 w-full flex overflow-auto">
                <TabsTrigger value="recall" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Recall</span>
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Analytics</span>
                </TabsTrigger>
                <TabsTrigger value="revision" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Revision</span>
                </TabsTrigger>
                <TabsTrigger value="notes" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Notes</span>
                </TabsTrigger>
                <TabsTrigger value="discuss" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>Discuss</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Tab content areas */}
              <TabsContent value="learn">
                <ConceptContent content={conceptData.content} />
              </TabsContent>
              
              <TabsContent value="visual">
                <div className="p-6 text-center">
                  <p>Visual representations of {conceptData.title} will appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="video">
                <ConceptResources conceptId={conceptId || ""} />
              </TabsContent>
              
              <TabsContent value="formula">
                <div className="p-6 text-center">
                  <p>Formula practice for {conceptData.title} will appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="mistakes">
                <div className="p-6 text-center">
                  <p>Common mistakes for {conceptData.title} will appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="previous-year">
                <div className="p-6 text-center">
                  <p>Previous year questions for {conceptData.title} will appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="recall">
                <div className="p-6 text-center">
                  <p>Recall exercises for {conceptData.title} will appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="analytics">
                <div className="p-6 text-center">
                  <p>Analytics for {conceptData.title} will appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="revision">
                <div className="p-6 text-center">
                  <p>Revision schedule for {conceptData.title} will appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="notes">
                <div className="p-6 text-center">
                  <p>Your notes for {conceptData.title} will appear here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="discuss">
                <div className="p-6 text-center">
                  <p>Discussion forum for {conceptData.title} will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar with related concepts and exam readiness */}
          <div className="space-y-6">
            <ConceptSidebar 
              masteryLevel={conceptData.masteryLevel}
              relatedConcepts={conceptData.relatedConcepts}
              examReady={conceptData.examReady}
            />
          </div>
        </div>
        
        {/* AI Insights section */}
        <AIInsightsSection 
          conceptId={conceptId || ""}
          conceptTitle={conceptData.title}
        />
      </div>
    </ConceptsPageLayout>
  );
};

export default ConceptDetailPage;
