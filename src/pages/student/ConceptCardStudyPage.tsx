
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import ConceptCardFilter from '@/components/dashboard/student/concept-cards/ConceptCardFilter';
import { DateFilterType, ConceptCardType } from '@/types/user/base';
import { getSubjectsForGoal } from '@/components/dashboard/student/onboarding/SubjectData';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/utils/dateUtils';
import { useToast } from '@/hooks/use-toast';

// Mock data for concept cards
const mockConceptCards: ConceptCardType[] = [
  {
    id: "cc1",
    title: "Newton's First Law of Motion",
    subject: "Physics",
    chapter: "Laws of Motion",
    difficulty: "medium",
    tags: ["mechanics", "newton", "forces"],
    content: "Newton's first law states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force. This is also known as the law of inertia.",
    examples: [
      {
        question: "A book is placed on a table. Why does it remain stationary?",
        solution: "According to Newton's First Law, the book remains stationary because it's in equilibrium. The gravitational force pulling down is balanced by the normal force from the table pushing up."
      }
    ],
    completedAt: null
  },
  {
    id: "cc2",
    title: "Periodic Table Elements",
    subject: "Chemistry",
    chapter: "Periodic Table",
    difficulty: "easy",
    tags: ["elements", "periodic table", "chemistry basics"],
    content: "The periodic table organizes chemical elements by their atomic numbers, electron configurations, and chemical properties.",
    examples: [
      {
        question: "Why are noble gases unreactive?",
        solution: "Noble gases have a full outer shell of electrons, making them stable and less likely to form bonds with other elements."
      }
    ],
    completedAt: new Date()
  },
  {
    id: "cc3",
    title: "Differentiation Basics",
    subject: "Mathematics",
    chapter: "Calculus",
    difficulty: "hard",
    tags: ["calculus", "differentiation", "rate of change"],
    content: "Differentiation is a method of finding the derivative of a function. It measures the rate at which a function's output changes with respect to its input.",
    examples: [
      {
        question: "Find the derivative of f(x) = x²",
        solution: "f'(x) = 2x"
      }
    ],
    completedAt: null
  }
];

const ConceptCardStudyPage: React.FC = () => {
  const { cardId } = useParams<{ cardId?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [conceptCards, setConceptCards] = useState<ConceptCardType[]>(mockConceptCards);
  const [filteredCards, setFilteredCards] = useState<ConceptCardType[]>(mockConceptCards);
  const [isCardCompleted, setIsCardCompleted] = useState(false);
  
  const allSubjects = getSubjectsForGoal("IIT-JEE");
  
  // Find the initial card index if a specific card ID is provided
  useEffect(() => {
    if (cardId) {
      const index = conceptCards.findIndex(card => card.id === cardId);
      if (index !== -1) {
        setActiveCardIndex(index);
        setIsCardCompleted(Boolean(conceptCards[index].completedAt));
      }
    }
  }, [cardId, conceptCards]);
  
  const currentCard = filteredCards[activeCardIndex] || null;
  
  const handleFilterChange = (filters: {
    dateFilter: DateFilterType;
    subject: string;
    difficulty: string;
    completed: boolean | null;
  }) => {
    let filtered = [...conceptCards];
    
    // Apply subject filter
    if (filters.subject !== "all") {
      filtered = filtered.filter(card => card.subject === filters.subject);
    }
    
    // Apply difficulty filter
    if (filters.difficulty !== "all") {
      filtered = filtered.filter(card => card.difficulty === filters.difficulty);
    }
    
    // Apply completed filter
    if (filters.completed !== null) {
      filtered = filtered.filter(card => Boolean(card.completedAt) === filters.completed);
    }
    
    // Apply date filter (this is a simplified version)
    if (filters.dateFilter !== "all") {
      // For demo purposes only
      filtered = filtered.slice(0, filters.dateFilter === "today" ? 1 : filters.dateFilter === "week" ? 2 : 3);
    }
    
    setFilteredCards(filtered);
    setActiveCardIndex(0);
  };
  
  const handlePrevCard = () => {
    if (activeCardIndex > 0) {
      setActiveCardIndex(activeCardIndex - 1);
      const prevCard = filteredCards[activeCardIndex - 1];
      setIsCardCompleted(Boolean(prevCard?.completedAt));
    }
  };
  
  const handleNextCard = () => {
    if (activeCardIndex < filteredCards.length - 1) {
      setActiveCardIndex(activeCardIndex + 1);
      const nextCard = filteredCards[activeCardIndex + 1];
      setIsCardCompleted(Boolean(nextCard?.completedAt));
    }
  };
  
  const handleBackToDashboard = () => {
    navigate('/dashboard/student/concepts');
  };
  
  const handleMarkComplete = () => {
    if (!currentCard) return;
    
    const updatedCards = [...conceptCards];
    const cardIndex = updatedCards.findIndex(card => card.id === currentCard.id);
    
    if (cardIndex !== -1) {
      updatedCards[cardIndex] = {
        ...updatedCards[cardIndex],
        completedAt: isCardCompleted ? null : new Date()
      };
      
      setConceptCards(updatedCards);
      setFilteredCards(prevFiltered => {
        const newFiltered = [...prevFiltered];
        const filteredIndex = newFiltered.findIndex(card => card.id === currentCard.id);
        if (filteredIndex !== -1) {
          newFiltered[filteredIndex] = {
            ...newFiltered[filteredIndex],
            completedAt: isCardCompleted ? null : new Date()
          };
        }
        return newFiltered;
      });
      
      setIsCardCompleted(!isCardCompleted);
      
      toast({
        title: isCardCompleted ? "Marked as incomplete" : "Concept completed!",
        description: isCardCompleted 
          ? "You can revisit this concept card anytime" 
          : "Great job! This will be reflected in your progress.",
        variant: isCardCompleted ? "default" : "success",
      });
      
      // Save to local storage for demo
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        parsedData.lastActivity = {
          type: "concept_card",
          description: `Studying ${currentCard.title}`,
          id: currentCard.id
        };
        localStorage.setItem("userData", JSON.stringify(parsedData));
      }
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          onClick={handleBackToDashboard}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <ConceptCardFilter
            subjects={allSubjects}
            onFilterChange={handleFilterChange}
            className="sticky top-4"
          />
        </div>
        
        <div className="lg:col-span-3">
          {currentCard ? (
            <Card className="shadow-md">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{currentCard.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        {currentCard.subject}
                      </Badge>
                      {currentCard.chapter && (
                        <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300">
                          {currentCard.chapter}
                        </Badge>
                      )}
                      <Badge variant={
                        currentCard.difficulty === "easy" ? "outline" : 
                        currentCard.difficulty === "medium" ? "secondary" : "destructive"
                      } className={
                        currentCard.difficulty === "easy" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" :
                        currentCard.difficulty === "medium" ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300" :
                        "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      }>
                        {currentCard.difficulty.charAt(0).toUpperCase() + currentCard.difficulty.slice(1)}
                      </Badge>
                      {currentCard.completedAt && (
                        <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          Completed on {formatDate(currentCard.completedAt)}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button 
                    variant={isCardCompleted ? "outline" : "default"}
                    size="sm"
                    onClick={handleMarkComplete}
                    className={isCardCompleted 
                      ? "border-green-200 text-green-700 hover:bg-green-50" 
                      : "bg-green-600 hover:bg-green-700"
                    }
                  >
                    <Check className="h-4 w-4 mr-1" />
                    {isCardCompleted ? "Completed" : "Mark Complete"}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                      Concept
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      {currentCard.content}
                    </p>
                  </div>
                  
                  {currentCard.examples && currentCard.examples.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Examples</h3>
                      {currentCard.examples.map((example, index) => (
                        <div 
                          key={index} 
                          className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50"
                        >
                          <h4 className="font-medium text-indigo-700 dark:text-indigo-300 mb-2">
                            Question:
                          </h4>
                          <p className="mb-4">{example.question}</p>
                          <h4 className="font-medium text-green-700 dark:text-green-300 mb-2">
                            Solution:
                          </h4>
                          <p>{example.solution}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {currentCard.tags && currentCard.tags.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-2">Related Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentCard.tags.map((tag, index) => (
                          <Badge key={index} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="border-t pt-4 flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevCard}
                  disabled={activeCardIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <div className="text-sm text-gray-500">
                  Card {activeCardIndex + 1} of {filteredCards.length}
                </div>
                <Button
                  variant="outline"
                  onClick={handleNextCard}
                  disabled={activeCardIndex === filteredCards.length - 1}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 border rounded-lg bg-gray-50 dark:bg-gray-800">
              <p className="text-gray-500 mb-4">No concept cards match the current filters.</p>
              <Button onClick={() => handleFilterChange({ dateFilter: "all", subject: "all", difficulty: "all", completed: null })}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConceptCardStudyPage;
