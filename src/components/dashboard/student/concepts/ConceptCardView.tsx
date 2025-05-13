
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { badgeVariants } from "@/components/ui/badge";
import { CheckCircle2, BookOpen, Library, Calculator, HelpCircle, Beaker, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormulaTabContent } from './FormulaTabContent';
import FloatingVoiceAssistant from '@/components/voice/FloatingVoiceAssistant';

interface ConceptCardViewProps {
  conceptId: string;
  conceptTitle?: string;
  conceptSubject?: string;
  conceptDescription?: string;
}

type TabType = "overview" | "formulas" | "practice" | "flashcards";

const ConceptCardView: React.FC<ConceptCardViewProps> = ({
  conceptId,
  conceptTitle = "Quadratic Equations",
  conceptSubject = "Mathematics",
  conceptDescription = "Master the foundations of quadratic equations, including the quadratic formula, factoring, and graphing. Learn to solve real-world problems using these essential mathematical tools."
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showCalculator, setShowCalculator] = useState(false);
  const [showHint, setShowHint] = useState(false);
  
  const handleOpenFormulaLab = () => {
    console.log("Opening formula lab for:", conceptId);
    // Implementation would navigate to formula lab with the concept ID
  };
  
  const handleShowHint = () => {
    console.log("Showing hint for concept:", conceptId);
    setShowHint(!showHint);
    // Show hint implementation
  };
  
  const handleToggleCalculator = () => {
    console.log("Toggling calculator for concept:", conceptId);
    setShowCalculator(!showCalculator);
    // Toggle calculator implementation
  };

  return (
    <div className="space-y-6">
      {/* Concept Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 shadow-sm">
        <h1 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">{conceptTitle}</h1>
        <div className="flex items-center mb-3">
          <span className={cn(
            badgeVariants({ variant: "secondary" }),
            "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 mr-2"
          )}>
            {conceptSubject}
          </span>
          <span className={cn(
            badgeVariants({ variant: "outline" }),
            "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
          )}>
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Interactive
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{conceptDescription}</p>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={(value) => setActiveTab(value as TabType)} className="w-full">
          <div className="flex justify-between items-center mb-2">
            <TabsList className="bg-transparent p-0 h-auto">
              <TabsTrigger 
                value="overview" 
                className={`px-4 py-2 rounded-t-md border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:shadow-none transition-all ${
                  activeTab === "overview" ? "border-blue-500 text-blue-600" : "border-transparent"
                }`}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="formulas" 
                className={`px-4 py-2 rounded-t-md border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:shadow-none transition-all ${
                  activeTab === "formulas" ? "border-blue-500 text-blue-600" : "border-transparent"
                }`}
              >
                <Beaker className="h-4 w-4 mr-2" />
                Formulas
              </TabsTrigger>
              <TabsTrigger 
                value="practice" 
                className={`px-4 py-2 rounded-t-md border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:shadow-none transition-all ${
                  activeTab === "practice" ? "border-blue-500 text-blue-600" : "border-transparent"
                }`}
              >
                <Brain className="h-4 w-4 mr-2" />
                Practice
              </TabsTrigger>
              <TabsTrigger 
                value="flashcards" 
                className={`px-4 py-2 rounded-t-md border-b-2 data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 data-[state=active]:shadow-none transition-all ${
                  activeTab === "flashcards" ? "border-blue-500 text-blue-600" : "border-transparent"
                }`}
              >
                <Library className="h-4 w-4 mr-2" />
                Flashcards
              </TabsTrigger>
            </TabsList>
            
            <div className="flex space-x-2">
              {activeTab === "formulas" && (
                <>
                  <Button variant="outline" size="sm" onClick={handleToggleCalculator}>
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculator
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleShowHint}>
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Hint
                  </Button>
                </>
              )}
            </div>
          </div>

          <TabsContent value="overview" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="prose dark:prose-invert max-w-none">
                  <h3>What are Quadratic Equations?</h3>
                  <p>
                    A quadratic equation is a second-degree polynomial equation in a single variable x, where a ≠ 0:
                  </p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded">ax² + bx + c = 0</pre>
                  
                  <h4>Key Concepts:</h4>
                  <ul>
                    <li>Standard Form: ax² + bx + c = 0</li>
                    <li>Quadratic Formula: x = (-b ± √(b² - 4ac)) / (2a)</li>
                    <li>Discriminant: b² - 4ac</li>
                    <li>Completing the Square</li>
                    <li>Factoring</li>
                  </ul>
                  
                  <h4>Real-world Applications:</h4>
                  <p>
                    Quadratic equations are used in various fields including:
                  </p>
                  <ul>
                    <li>Physics (projectile motion)</li>
                    <li>Engineering</li>
                    <li>Economics (profit maximization)</li>
                    <li>Architecture (parabolic structures)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="formulas" className="mt-4">
            <FormulaTabContent 
              conceptId={conceptId}
              conceptTitle={conceptTitle}
              handleOpenFormulaLab={handleOpenFormulaLab} 
            />
            {showCalculator && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowCalculator(false)}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-80" onClick={e => e.stopPropagation()}>
                  <h3 className="text-lg font-bold mb-4">Scientific Calculator</h3>
                  <p className="text-gray-600 dark:text-gray-400">Calculator functionality would be implemented here.</p>
                  <Button className="mt-4 w-full" onClick={() => setShowCalculator(false)}>Close</Button>
                </div>
              </div>
            )}
            {showHint && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowHint(false)}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md" onClick={e => e.stopPropagation()}>
                  <h3 className="text-lg font-bold mb-4">Formula Hint</h3>
                  <div className="prose dark:prose-invert">
                    <p>Remember that the quadratic formula is:</p>
                    <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded">x = (-b ± √(b² - 4ac)) / (2a)</pre>
                    <p>When using this formula:</p>
                    <ul>
                      <li>If b² - 4ac > 0: Two distinct real solutions</li>
                      <li>If b² - 4ac = 0: One real solution (repeated)</li>
                      <li>If b² - 4ac < 0: Two complex solutions</li>
                    </ul>
                  </div>
                  <Button className="mt-4 w-full" onClick={() => setShowHint(false)}>Got it</Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="practice" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Practice Problems</h3>
                <div className="space-y-6">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Problem 1</h4>
                    <p className="mb-3">Solve for x: 2x² - 5x + 3 = 0</p>
                    <Button variant="default" size="sm">Start</Button>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Problem 2</h4>
                    <p className="mb-3">A ball is thrown upward with an initial velocity of 20 m/s from a height of 2 meters. When will it hit the ground?</p>
                    <Button variant="default" size="sm">Start</Button>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Problem 3</h4>
                    <p className="mb-3">Find the values of k for which the equation x² + kx + 4 = 0 has equal roots.</p>
                    <Button variant="default" size="sm">Start</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="flashcards" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Interactive Flashcards</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Review key concepts with these interactive flashcards. Click on a card to flip it.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-40 flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <p className="text-center font-medium">What is the quadratic formula?</p>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-40 flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <p className="text-center font-medium">What is the discriminant and what does it tell us?</p>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-40 flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <p className="text-center font-medium">Explain the method of completing the square.</p>
                  </div>
                  
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 h-40 flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <p className="text-center font-medium">When can a quadratic equation be factored easily?</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="default">Create Your Own Flashcards</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Voice Assistant Integration for this concept page */}
      <div className="fixed bottom-24 right-6 md:bottom-16 md:right-6 z-40">
        <FloatingVoiceAssistant 
          userName="Student"
          pronouncePrepzr={true}
        />
      </div>
    </div>
  );
};

export default ConceptCardView;
