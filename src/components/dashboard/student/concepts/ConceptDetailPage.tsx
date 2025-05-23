
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Video, 
  FileText, 
  BarChart4, 
  MessageCircle, 
  AlertCircle,
  FilePlus2,
  Brain,
  Layers,
  Microscope,
  FastForward,
  Eye,
  FlaskConical,
  Zap,
  Clock,
  Target,
  LineChart,
  BarChart3,
  MessageSquare,
  PencilLine
} from 'lucide-react';

import ConceptMasterySection from './ConceptMasterySection';
import FormulaTabContent from './FormulaTabContent';
import Visual3DContent from './Visual3DContent';
import VideoTabContent from './VideoTabContent';
import CommonMistakesContent from './CommonMistakesContent';
import RecallSection from './RecallSection';
import AnalyticsSection from './AnalyticsSection';
import RevisionSection from './RevisionSection';
import NotesSection from './NotesSection';
import DiscussSection from './DiscussSection';
import AIInsights from './AIInsights';

const ConceptDetailPage: React.FC = () => {
  // Tabs state
  const [primaryActiveTab, setPrimaryActiveTab] = useState("learn");
  const [secondaryActiveTab, setSecondaryActiveTab] = useState("mastery");
  
  // Mastery data
  const [masteryPercentage, setMasteryPercentage] = useState(68);
  const [recallPercentage, setRecallPercentage] = useState(75);
  const [timeSpent, setTimeSpent] = useState(135); // minutes
  const [lastReviewed, setLastReviewed] = useState("2 days ago");
  const [strengthLevel, setStrengthLevel] = useState("Medium");
  const [nextReview, setNextReview] = useState("Tomorrow");
  
  // Sample concept data
  const conceptData = {
    title: "Ohm's Law",
    subject: "Physics",
    chapter: "Electricity",
    difficulty: "Medium",
    importance: "High",
    description: "Ohm's law states that the current through a conductor between two points is directly proportional to the voltage across the two points.",
    formula: "V = IR",
    variables: [
      { symbol: "V", name: "Voltage", unit: "Volts (V)" },
      { symbol: "I", name: "Current", unit: "Amperes (A)" },
      { symbol: "R", name: "Resistance", unit: "Ohms (Ω)" }
    ],
    examples: [
      {
        question: "If the voltage across a resistor is 12V and the resistance is 4Ω, what is the current?",
        solution: "Using Ohm's law: I = V/R = 12V/4Ω = 3A"
      }
    ]
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header with title and basic info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{conceptData.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            <span>{conceptData.subject}</span>
            <span>•</span>
            <span>{conceptData.chapter}</span>
            <span>•</span>
            <span>Difficulty: {conceptData.difficulty}</span>
            <span>•</span>
            <span>Importance: {conceptData.importance}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <BookOpen className="h-4 w-4 mr-2" />
            Study Guide
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Practice Questions
          </Button>
        </div>
      </div>

      {/* Mastery & Recall Tracker */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-indigo-500" />
            Mastery & Recall Tracker
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Mastery Progress */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-sm">Mastery Level</h3>
                <span className="text-lg font-bold text-indigo-600">{masteryPercentage}%</span>
              </div>
              <Progress value={masteryPercentage} className="h-3" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Beginner</span>
                <span>Proficient</span>
                <span>Expert</span>
              </div>
            </div>

            {/* Recall Strength */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-sm">Recall Strength</h3>
                <span className="text-lg font-bold text-emerald-600">{recallPercentage}%</span>
              </div>
              <Progress value={recallPercentage} className="h-3 bg-emerald-100" indicatorClassName="bg-emerald-600" />
              <div className="grid grid-cols-3 text-xs text-muted-foreground">
                <span>Weak</span>
                <span className="text-center">Medium</span>
                <span className="text-right">Strong</span>
              </div>
            </div>

            {/* Time & Review Stats */}
            <div className="space-y-2 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-blue-500" />
                  <h3 className="font-medium text-sm">Time Spent</h3>
                </div>
                <span className="text-md font-semibold">{Math.floor(timeSpent / 60)}h {timeSpent % 60}m</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <FastForward className="h-4 w-4 text-purple-500" />
                  <h3 className="font-medium text-sm">Last Reviewed</h3>
                </div>
                <span className="text-md font-semibold">{lastReviewed}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5">
                  <Target className="h-4 w-4 text-red-500" />
                  <h3 className="font-medium text-sm">Next Review</h3>
                </div>
                <span className="text-md font-semibold">{nextReview}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                <Zap className="h-4 w-4 mr-2" />
                Boost Mastery Now
              </Button>
              <Button variant="outline" className="w-full">
                <Brain className="h-4 w-4 mr-2" />
                Recall Assessment
              </Button>
              <Button variant="ghost" className="w-full">
                <Layers className="h-4 w-4 mr-2" />
                View Learning Path
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights Section */}
      <AIInsights conceptName={conceptData.title} />

      {/* Main tabs navigation */}
      <Tabs 
        defaultValue="learn" 
        value={primaryActiveTab} 
        onValueChange={setPrimaryActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
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
            <span className="hidden sm:inline">Formula Lab</span>
          </TabsTrigger>
          <TabsTrigger value="video" className="flex items-center gap-1">
            <Video className="h-4 w-4" />
            <span className="hidden sm:inline">Video</span>
          </TabsTrigger>
          <TabsTrigger value="mistakes" className="flex items-center gap-1">
            <AlertCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Common Mistakes</span>
          </TabsTrigger>
        </TabsList>

        {/* Learn content */}
        <TabsContent value="learn" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="prose max-w-none">
                <h2>Understanding {conceptData.title}</h2>
                <p className="text-lg">{conceptData.description}</p>
                
                <h3>Key Formula</h3>
                <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md text-center">
                  <span className="text-2xl font-bold text-indigo-600">{conceptData.formula}</span>
                </div>
                
                <h3>Variables</h3>
                <ul>
                  {conceptData.variables.map((variable, index) => (
                    <li key={index}>
                      <strong>{variable.symbol}</strong> - {variable.name} ({variable.unit})
                    </li>
                  ))}
                </ul>
                
                <h3>Example</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                  <p className="font-medium">Question: {conceptData.examples[0].question}</p>
                  <p className="mt-2">Solution: {conceptData.examples[0].solution}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Visual content */}
        <TabsContent value="visual" className="mt-6">
          <Visual3DContent conceptName={conceptData.title} />
        </TabsContent>

        {/* 3D Simulation content */}
        <TabsContent value="simulation" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="aspect-video bg-black/5 rounded-lg flex items-center justify-center">
                <div className="text-center p-6">
                  <Microscope className="h-12 w-12 mx-auto text-indigo-500 mb-4" />
                  <h3 className="text-xl font-medium">3D Interactive Simulation</h3>
                  <p className="text-muted-foreground mt-2">Explore Ohm's Law in a 3D interactive environment. Adjust voltage and resistance to see how current changes in real-time.</p>
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
          <FormulaTabContent formula={conceptData.formula} variables={conceptData.variables} />
        </TabsContent>

        {/* Video content */}
        <TabsContent value="video" className="mt-6">
          <VideoTabContent conceptName={conceptData.title} />
        </TabsContent>

        {/* Common Mistakes content */}
        <TabsContent value="mistakes" className="mt-6">
          <CommonMistakesContent conceptName={conceptData.title} />
        </TabsContent>
      </Tabs>

      {/* Secondary tabs for supplementary features */}
      <Tabs 
        defaultValue="mastery" 
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
          <RecallSection conceptName={conceptData.title} />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <AnalyticsSection conceptName={conceptData.title} />
        </TabsContent>

        <TabsContent value="revision" className="mt-6">
          <RevisionSection conceptName={conceptData.title} />
        </TabsContent>

        <TabsContent value="notes" className="mt-6">
          <NotesSection conceptName={conceptData.title} />
        </TabsContent>

        <TabsContent value="discuss" className="mt-6">
          <DiscussSection conceptName={conceptData.title} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ConceptDetailPage;
