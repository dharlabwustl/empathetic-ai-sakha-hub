
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Video, 
  FileText, 
  Brain,
  Microscope,
  Eye,
  FlaskConical,
  AlertCircle,
  MessageSquare,
  PencilLine,
  BarChart3,
  FastForward,
  FileQuestion,
  LinkIcon
} from 'lucide-react';

// Import components
import ConceptHeader from './concept-detail/ConceptHeader';
import ConceptMasterySection from './ConceptMasterySection';
import AIInsights from './AIInsights';
import Visual3DContent from './Visual3DContent';
import FormulaTabContent from './FormulaTabContent';
import VideoTabContent from './VideoTabContent';
import CommonMistakesContent from './CommonMistakesContent';
import RecallSection from './RecallSection';
import AnalyticsSection from './AnalyticsSection';
import RevisionSection from './RevisionSection';
import NotesSection from './NotesSection';
import DiscussSection from './DiscussSection';
import ConceptSidebar from './concept-detail/ConceptSidebar';
import PreviousYearsContent from './PreviousYearsContent';
import LinkedConceptsSection from './LinkedConceptsSection';
import RelatedFlashcards from './RelatedFlashcards';
import VoiceGreeting from '../voice/VoiceGreeting';
import { ConceptCard } from '@/types/user/conceptCard';

const ConceptDetailPage: React.FC = () => {
  // Tabs state
  const [primaryActiveTab, setPrimaryActiveTab] = useState("learn");
  const [secondaryActiveTab, setSecondaryActiveTab] = useState("recall");
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // Sample concept data - in a real app, this would come from an API
  const conceptData: Partial<ConceptCard> = {
    id: "ohms-law",
    title: "Ohm's Law",
    subject: "Physics",
    chapter: "Electricity",
    topic: "Circuit Analysis",
    difficulty: "medium",
    description: "Ohm's law states that the current through a conductor between two points is directly proportional to the voltage across the two points.",
    content: "Ohm's law states that the current through a conductor between two points is directly proportional to the voltage across the two points.",
    examRelevance: "High importance in both theory and numerical problems",
    estimatedTime: 45,
    mastery: {
      level: "Intermediate",
      percentage: 68
    },
    recallAccuracy: 75,
    keyPoints: [
      "The constant of proportionality is called resistance",
      "Ohm's law is valid only for ohmic conductors",
      "It's commonly expressed as V = IR"
    ],
    formulas: ["V = IR", "I = V/R", "R = V/I"],
    relatedConcepts: ["kirchoffs-law", "series-parallel-circuits"]
  };

  // Read Aloud functionality
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  
  const handleReadAloud = (content: string) => {
    if (isReadingAloud) {
      window.speechSynthesis.cancel();
      setIsReadingAloud(false);
      return;
    }
    
    const speech = new SpeechSynthesisUtterance(content);
    speech.onend = () => setIsReadingAloud(false);
    window.speechSynthesis.speak(speech);
    setIsReadingAloud(true);
  };
  
  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    // In a real app, you would also update this on the server
  };

  // Mock data for sidebar
  const relatedConcepts = [
    { id: "kirchoffs-law", title: "Kirchoff's Laws", masteryLevel: 82 },
    { id: "series-parallel-circuits", title: "Series & Parallel Circuits", masteryLevel: 45 },
    { id: "resistivity", title: "Resistivity", masteryLevel: 65 }
  ];

  return (
    <div className="container mx-auto p-4 space-y-6 mb-20">
      {/* Concept header with title and metadata */}
      <ConceptHeader 
        title={conceptData.title || ""}
        subject={conceptData.subject || ""}
        topic={conceptData.topic || ""}
        difficulty={conceptData.difficulty || "medium"} 
        isBookmarked={isBookmarked}
        onBookmarkToggle={handleBookmarkToggle}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Mastery & Recall Tracker */}
          <ConceptMasterySection 
            conceptName={conceptData.title || ""}
            masteryPercentage={conceptData.mastery?.percentage}
            recallPercentage={conceptData.recallAccuracy}
            timeSpent={135} // Sample data
            lastReviewed="2 days ago" // Sample data
            nextReview="Tomorrow" // Sample data
          />

          {/* AI Insights Section */}
          <AIInsights conceptName={conceptData.title || ""} />

          {/* Main tabs navigation */}
          <Tabs 
            defaultValue="learn" 
            value={primaryActiveTab} 
            onValueChange={setPrimaryActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full">
              <TabsTrigger value="learn" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span className="hidden sm:inline">Learn</span>
              </TabsTrigger>
              <TabsTrigger value="visual" className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">Visual</span>
              </TabsTrigger>
              <TabsTrigger value="simulation" className="flex items-center gap-1">
                <Microscope className="h-4 w-4" />
                <span className="hidden sm:inline">3D Simulation</span>
              </TabsTrigger>
              <TabsTrigger value="formula" className="flex items-center gap-1">
                <FlaskConical className="h-4 w-4" />
                <span className="hidden sm:inline">Formula</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center gap-1">
                <Video className="h-4 w-4" />
                <span className="hidden sm:inline">Video</span>
              </TabsTrigger>
              <TabsTrigger value="mistakes" className="flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Mistakes</span>
              </TabsTrigger>
              <TabsTrigger value="previous" className="flex items-center gap-1">
                <FileQuestion className="h-4 w-4" />
                <span className="hidden sm:inline">Previous Years</span>
              </TabsTrigger>
            </TabsList>

            {/* Learn content */}
            <TabsContent value="learn" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Understanding {conceptData.title}</h2>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleReadAloud(conceptData.content || "")}
                      className="flex items-center gap-1"
                    >
                      {isReadingAloud ? "Stop Reading" : "Read Aloud"}
                    </Button>
                  </div>
                  
                  <div className="prose max-w-none dark:prose-invert">
                    <p className="text-lg">{conceptData.description}</p>
                    
                    <h3>Key Formula</h3>
                    <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md text-center">
                      <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{conceptData.formulas?.[0]}</span>
                    </div>
                    
                    <h3>Key Points</h3>
                    <ul>
                      {conceptData.keyPoints?.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                    
                    <h3>Exam Relevance</h3>
                    <p>{conceptData.examRelevance}</p>
                    
                    <h3>Example</h3>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                      <p className="font-medium">Question: If the voltage across a resistor is 12V and the resistance is 4Ω, what is the current?</p>
                      <p className="mt-2">Solution: Using Ohm's law: I = V/R = 12V/4Ω = 3A</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Visual content */}
            <TabsContent value="visual" className="mt-6">
              <Visual3DContent conceptName={conceptData.title || ""} />
            </TabsContent>

            {/* 3D Simulation content */}
            <TabsContent value="simulation" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="aspect-video bg-black/5 rounded-lg flex items-center justify-center">
                    <div className="text-center p-6">
                      <Microscope className="h-12 w-12 mx-auto text-indigo-500 mb-4" />
                      <h3 className="text-xl font-medium">3D Interactive Simulation</h3>
                      <p className="text-muted-foreground mt-2">Explore {conceptData.title} in a 3D interactive environment. Adjust voltage and resistance to see how current changes in real-time.</p>
                      <Button className="mt-4">
                        Launch 3D Simulation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Formula Lab content */}
            <TabsContent value="formula" className="mt-6">
              <FormulaTabContent 
                formula={conceptData.formulas?.[0] || "V = IR"} 
                variables={[
                  { symbol: "V", name: "Voltage", unit: "Volts (V)" },
                  { symbol: "I", name: "Current", unit: "Amperes (A)" },
                  { symbol: "R", name: "Resistance", unit: "Ohms (Ω)" }
                ]} 
              />
            </TabsContent>

            {/* Video content */}
            <TabsContent value="video" className="mt-6">
              <VideoTabContent conceptName={conceptData.title || ""} />
            </TabsContent>

            {/* Common Mistakes content */}
            <TabsContent value="mistakes" className="mt-6">
              <CommonMistakesContent conceptName={conceptData.title || ""} />
            </TabsContent>
            
            {/* Previous Years Questions */}
            <TabsContent value="previous" className="mt-6">
              <PreviousYearsContent conceptName={conceptData.title || ""} />
            </TabsContent>
          </Tabs>

          {/* Secondary tabs for learning management */}
          <Tabs 
            defaultValue="recall" 
            value={secondaryActiveTab} 
            onValueChange={setSecondaryActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
              <TabsTrigger value="recall" className="flex items-center gap-1">
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Recall</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="revision" className="flex items-center gap-1">
                <FastForward className="h-4 w-4" />
                <span className="hidden sm:inline">Revision</span>
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-1">
                <PencilLine className="h-4 w-4" />
                <span className="hidden sm:inline">Notes</span>
              </TabsTrigger>
              <TabsTrigger value="discuss" className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Discuss</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recall" className="mt-6">
              <RecallSection conceptName={conceptData.title || ""} />
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <AnalyticsSection conceptName={conceptData.title || ""} />
            </TabsContent>

            <TabsContent value="revision" className="mt-6">
              <RevisionSection conceptName={conceptData.title || ""} />
            </TabsContent>

            <TabsContent value="notes" className="mt-6">
              <NotesSection conceptName={conceptData.title || ""} />
            </TabsContent>

            <TabsContent value="discuss" className="mt-6">
              <DiscussSection conceptName={conceptData.title || ""} />
            </TabsContent>
          </Tabs>
          
          {/* Related content sections */}
          <div className="space-y-6">
            <LinkedConceptsSection conceptId={conceptData.id || ""} />
            <RelatedFlashcards conceptId={conceptData.id || ""} />
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          <ConceptSidebar 
            masteryLevel={conceptData.mastery?.percentage || 68}
            relatedConcepts={relatedConcepts}
            examReady={conceptData.mastery?.percentage ? conceptData.mastery.percentage > 80 : false}
          />
        </div>
      </div>
      
      {/* Voice greeting for first-time users */}
      <VoiceGreeting 
        isFirstTimeUser={false} 
        userName="Student" 
        language="en" 
      />
    </div>
  );
};

export default ConceptDetailPage;
