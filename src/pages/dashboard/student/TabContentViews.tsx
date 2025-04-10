
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Book,
  Monitor,
  ArrowRight,
  CheckCircle,
  Clock,
  FileText,
  BarChart,
  Sigma,
  Atom,
  Pill,
  ChevronRight,
  Plus,
  Search,
  Filter,
  MoveHorizontal,
  Layers,
  Sparkles
} from "lucide-react";

export const MicroConceptView = () => {
  return (
    <Card className="border border-gray-100 dark:border-gray-700 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-sky-900/20 dark:to-indigo-900/20 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Monitor className="h-5 w-5 text-sky-500" />
            <CardTitle className="text-lg">Micro Concepts</CardTitle>
          </div>
          <Badge variant="outline" className="bg-white dark:bg-gray-800">Today's Focus</Badge>
        </div>
        <CardDescription>
          Break down complex topics into easily digestible micro-concepts
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Physics: Electric Fields</h3>
          <Badge className="bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:hover:bg-sky-900/50">
            In Progress
          </Badge>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Coulomb's Law</h4>
              <CheckCircle className="h-5 w-5 text-emerald-500" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              The mathematical formula and principles governing electric force between charges
            </p>
            <div className="mt-2">
              <Progress value={100} className="h-1.5" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Electric Field Intensity</h4>
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Understanding electric field strength and its vector nature
            </p>
            <div className="mt-2">
              <Progress value={65} className="h-1.5" />
            </div>
            <Button 
              variant="link" 
              size="sm" 
              className="mt-2 p-0 h-auto text-sky-600 dark:text-sky-400 flex items-center"
            >
              Continue Learning <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Electric Field Lines</h4>
              <FileText className="h-5 w-5 text-gray-400" />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Visualizing electric fields through field lines and their properties
            </p>
            <div className="mt-2">
              <Progress value={0} className="h-1.5" />
            </div>
            <Button 
              variant="link" 
              size="sm" 
              className="mt-2 p-0 h-auto text-sky-600 dark:text-sky-400 flex items-center"
            >
              Start Learning <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center px-6 py-3 border-t border-gray-100 dark:border-gray-800">
        <div className="text-sm text-muted-foreground">
          3 of 8 micro-concepts completed
        </div>
        <Button variant="outline" size="sm">
          View All Micro Concepts
        </Button>
      </CardFooter>
    </Card>
  );
};

export const FlashcardsView = () => {
  const [activeTab, setActiveTab] = useState("physics");
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  
  const flashcardSets = {
    physics: [
      { question: "What is Newton's First Law of Motion?", answer: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external force." },
      { question: "What is the formula for calculating electric potential energy?", answer: "E = kq₁q₂/r, where k is Coulomb's constant, q₁ and q₂ are charges, and r is the distance between them." },
      { question: "What does the Heisenberg Uncertainty Principle state?", answer: "It states that we cannot simultaneously know the exact position and momentum of a particle." }
    ],
    chemistry: [
      { question: "What is the pH of a neutral solution?", answer: "7" },
      { question: "What's the difference between an ionic and covalent bond?", answer: "Ionic bonds involve electron transfer between atoms, while covalent bonds involve electron sharing." },
      { question: "What is the Aufbau Principle?", answer: "Electrons fill orbitals starting from the lowest energy levels before moving to higher levels." }
    ],
    math: [
      { question: "What is the quadratic formula?", answer: "x = (-b ± √(b² - 4ac))/2a, where ax² + bx + c = 0" },
      { question: "What is the derivative of sin(x)?", answer: "cos(x)" },
      { question: "What is a local maximum in calculus?", answer: "A point where the function value is greater than at all nearby points, but not necessarily greater than at all points." }
    ]
  };
  
  const currentSet = flashcardSets[activeTab as keyof typeof flashcardSets];
  const currentCard = currentSet[currentCardIndex];
  
  const handleNext = () => {
    if (currentCardIndex < currentSet.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    }
  };
  
  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <Card className="border border-gray-100 dark:border-gray-700 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Book className="h-5 w-5 text-violet-500" />
            <CardTitle className="text-lg">Flashcards</CardTitle>
          </div>
          <Button size="sm" variant="outline" className="bg-white dark:bg-gray-800 flex gap-1 items-center">
            <Plus size={14} /> Create Set
          </Button>
        </div>
        <CardDescription>
          Review key concepts through spaced repetition learning
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 bg-violet-50 dark:bg-violet-900/20">
            <TabsTrigger value="physics" className="flex gap-1 items-center">
              <Atom size={14} /> Physics
            </TabsTrigger>
            <TabsTrigger value="chemistry" className="flex gap-1 items-center">
              <Pill size={14} /> Chemistry
            </TabsTrigger>
            <TabsTrigger value="math" className="flex gap-1 items-center">
              <Sigma size={14} /> Math
            </TabsTrigger>
          </TabsList>
          
          {Object.keys(flashcardSets).map(subject => (
            <TabsContent key={subject} value={subject} className="flex flex-col items-center space-y-6">
              <div 
                className="w-full h-60 perspective-1000"
                onClick={handleFlip}
              >
                <div 
                  className={`relative w-full h-full rounded-xl shadow-md transition-transform duration-300 transform-style-preserve-3d cursor-pointer ${
                    isFlipped ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Front of card */}
                  <div 
                    className={`absolute inset-0 bg-white dark:bg-gray-800 rounded-xl p-6 flex flex-col justify-center items-center backface-hidden ${
                      isFlipped ? "invisible" : ""
                    }`}
                  >
                    <div className="text-xs font-medium text-muted-foreground mb-2">QUESTION</div>
                    <div className="text-lg font-medium text-center">
                      {currentCard.question}
                    </div>
                    <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
                      Click to flip
                    </div>
                  </div>
                  
                  {/* Back of card */}
                  <div 
                    className={`absolute inset-0 bg-violet-50 dark:bg-violet-900/20 rounded-xl p-6 flex flex-col justify-center items-center backface-hidden rotate-y-180 ${
                      isFlipped ? "" : "invisible"
                    }`}
                  >
                    <div className="text-xs font-medium text-muted-foreground mb-2">ANSWER</div>
                    <div className="text-md text-center">
                      {currentCard.answer}
                    </div>
                    <div className="absolute bottom-4 right-4 text-xs text-muted-foreground">
                      Click to flip back
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between w-full">
                <Button 
                  variant="outline" 
                  onClick={handlePrev} 
                  disabled={currentCardIndex === 0}
                  size="sm"
                >
                  Previous
                </Button>
                <div className="text-sm text-muted-foreground">
                  {currentCardIndex + 1} of {currentSet.length}
                </div>
                <Button 
                  variant="outline" 
                  onClick={handleNext}
                  disabled={currentCardIndex === currentSet.length - 1}
                  size="sm"
                >
                  Next
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      
      <CardFooter className="bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center px-6 py-3 border-t border-gray-100 dark:border-gray-800">
        <div className="text-sm text-muted-foreground">
          Study progress: 65%
        </div>
        <Button variant="default" size="sm" className="bg-gradient-to-r from-violet-600 to-purple-600">
          Start Practice Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};

export const PracticeExamsView = () => {
  return (
    <Card className="border border-gray-100 dark:border-gray-700 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-emerald-500" />
            <CardTitle className="text-lg">Practice Tests</CardTitle>
          </div>
          <Badge variant="secondary" className="gap-1 items-center bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 dark:from-emerald-900/40 dark:to-teal-900/40 dark:text-emerald-300">
            <Sparkles className="h-3.5 w-3.5 mr-1" /> AI-Generated
          </Badge>
        </div>
        <CardDescription>
          Test your knowledge with personalized exams based on your study plan
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-medium">Ready for a challenge?</h3>
            <p className="text-sm text-muted-foreground">
              Practice tests are generated based on your recent study topics
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1.5" /> 
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-1.5" /> 
              Search
            </Button>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <Sigma className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-medium">Math: Calculus Fundamentals</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    30 questions • 45 minutes • Covers limits, derivatives, and integrals
                  </p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                Start Test
              </Button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-violet-100 dark:bg-violet-900/30">
                  <Atom className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <h4 className="font-medium">Physics: Electromagnetics</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    25 questions • 40 minutes • Covers electric fields, magnetic fields, and induction
                  </p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-violet-500 to-purple-500 text-white">
                Start Test
              </Button>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
                  <Pill className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <h4 className="font-medium">Chemistry: Organic Reactions</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    35 questions • 50 minutes • Covers reaction mechanisms and functional groups
                  </p>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                Start Test
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 dark:bg-gray-800/50 flex justify-between items-center px-6 py-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MoveHorizontal className="h-4 w-4" />
          <span>Adjust difficulty based on your performance</span>
        </div>
        <Button variant="outline" size="sm" className="flex gap-1 items-center">
          <Layers className="h-4 w-4" /> 
          All Tests
        </Button>
      </CardFooter>
    </Card>
  );
};
