
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, Plus, Atom, Pill, Sigma } from "lucide-react";

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

export default FlashcardsView;
