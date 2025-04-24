
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MainLayout from "@/components/layouts/MainLayout";
import ConceptCardFilter, { ConceptCardFilters } from "@/components/dashboard/student/concept-cards/ConceptCardFilter";
import { ArrowLeft, BookOpen, CheckCircle, Clock } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole } from "@/types/user/base";
import { getSubjectsForGoal } from "@/components/dashboard/student/onboarding/SubjectData";

// Mock concept card data
const mockConceptCards = [
  {
    id: "cc1",
    title: "Newton's First Law of Motion",
    subject: "Physics",
    chapter: "Laws of Motion",
    difficulty: "medium",
    estimatedTime: 10,
    completed: true,
    completedAt: new Date(new Date().setHours(new Date().getHours() - 25)),
    content: "An object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 8))
  },
  {
    id: "cc2",
    title: "Newton's Second Law of Motion",
    subject: "Physics",
    chapter: "Laws of Motion",
    difficulty: "medium",
    estimatedTime: 15,
    completed: true,
    completedAt: new Date(new Date().setHours(new Date().getHours() - 2)),
    content: "Force equals mass times acceleration (F = ma).",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 7))
  },
  {
    id: "cc3",
    title: "Newton's Third Law of Motion",
    subject: "Physics",
    chapter: "Laws of Motion",
    difficulty: "hard",
    estimatedTime: 20,
    completed: false,
    content: "For every action, there is an equal and opposite reaction.",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 6))
  },
  {
    id: "cc4",
    title: "Chemical Bonding",
    subject: "Chemistry",
    chapter: "Chemical Bonds",
    difficulty: "medium",
    estimatedTime: 15,
    completed: true,
    completedAt: new Date(new Date().setHours(new Date().getHours() - 26)),
    content: "Chemical bonding is the attraction between atoms or ions that holds them together in a molecule or crystal.",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 5))
  },
  {
    id: "cc5",
    title: "Periodic Table",
    subject: "Chemistry",
    chapter: "Elements",
    difficulty: "easy",
    estimatedTime: 10,
    completed: false,
    content: "The periodic table is a tabular arrangement of the chemical elements, organized based on their atomic number.",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 4))
  },
  {
    id: "cc6",
    title: "Integration Techniques",
    subject: "Mathematics",
    chapter: "Calculus",
    difficulty: "hard",
    estimatedTime: 25,
    completed: false,
    content: "Different techniques for solving integrals: substitution, integration by parts, partial fractions.",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 3))
  },
  {
    id: "cc7",
    title: "Photosynthesis",
    subject: "Biology",
    chapter: "Plant Physiology",
    difficulty: "medium",
    estimatedTime: 15,
    completed: true,
    completedAt: new Date(new Date().setDate(new Date().getDate() - 1)),
    content: "Photosynthesis is the process used by plants to convert light energy into chemical energy.",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 2))
  },
  {
    id: "cc8",
    title: "Cell Structure",
    subject: "Biology",
    chapter: "Cell Biology",
    difficulty: "easy",
    estimatedTime: 15,
    completed: false,
    content: "Cells are the basic structural and functional units of all living organisms.",
    createdAt: new Date(new Date().setDate(new Date().getDate() - 1))
  }
];

const ConceptCardStudyPage = () => {
  const { cardId } = useParams<{ cardId?: string }>();
  const [activeCard, setActiveCard] = useState<typeof mockConceptCards[0] | null>(null);
  const [filteredCards, setFilteredCards] = useState(mockConceptCards);
  const [filters, setFilters] = useState<ConceptCardFilters>({
    timeFrame: 'today',
    difficulty: [],
    subjects: [],
    completed: null
  });
  const { userProfile } = useUserProfile(UserRole.Student);
  
  const availableSubjects = userProfile?.goals?.[0]?.title 
    ? getSubjectsForGoal(userProfile.goals[0].title)
    : ["Physics", "Chemistry", "Mathematics", "Biology"];

  useEffect(() => {
    // When cardId changes, find the card
    if (cardId) {
      const card = mockConceptCards.find(card => card.id === cardId);
      if (card) {
        setActiveCard(card);
        
        // Save last viewed card to local storage for returning users
        const userData = localStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          parsedData.lastActivity = {
            type: "concept_card",
            description: `Viewed ${card.title}`,
            id: card.id,
            timestamp: new Date().toISOString()
          };
          localStorage.setItem("userData", JSON.stringify(parsedData));
        }
      }
    } else {
      setActiveCard(null);
    }
  }, [cardId]);
  
  useEffect(() => {
    // Apply filters to concept cards
    let filtered = [...mockConceptCards];
    
    // Filter by time frame
    if (filters.timeFrame !== 'all') {
      const now = new Date();
      let cutoffDate = new Date();
      
      switch (filters.timeFrame) {
        case 'today':
          cutoffDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      filtered = filtered.filter(card => card.createdAt >= cutoffDate);
    }
    
    // Filter by difficulty
    if (filters.difficulty.length > 0) {
      filtered = filtered.filter(card => filters.difficulty.includes(card.difficulty));
    }
    
    // Filter by subject
    if (filters.subjects.length > 0) {
      filtered = filtered.filter(card => filters.subjects.includes(card.subject));
    }
    
    // Filter by completion status
    if (filters.completed !== null) {
      filtered = filtered.filter(card => card.completed === filters.completed);
    }
    
    setFilteredCards(filtered);
  }, [filters]);
  
  const handleFilterChange = (newFilters: ConceptCardFilters) => {
    setFilters(newFilters);
  };
  
  const handleMarkComplete = (id: string) => {
    // In a real app, this would update the server
    // For now, we'll just update our local state
    const updatedCards = mockConceptCards.map(card => 
      card.id === id ? { ...card, completed: true, completedAt: new Date() } : card
    );
    
    // Update filtered cards
    const updatedFilteredCards = filteredCards.map(card => 
      card.id === id ? { ...card, completed: true, completedAt: new Date() } : card
    );
    
    setFilteredCards(updatedFilteredCards);
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      case 'hard':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };
  
  // Show detailed view if a card is selected
  if (activeCard) {
    return (
      <MainLayout>
        <div className="container max-w-5xl py-8">
          <div className="flex items-center mb-6">
            <Link to="/study/concept-card">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" /> Back to Concept Cards
              </Button>
            </Link>
          </div>
          
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold">{activeCard.title}</h1>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {activeCard.subject}
                    </Badge>
                    <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      {activeCard.chapter}
                    </Badge>
                    <Badge variant="outline" className={getDifficultyColor(activeCard.difficulty)}>
                      {activeCard.difficulty.charAt(0).toUpperCase() + activeCard.difficulty.slice(1)} Difficulty
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {activeCard.estimatedTime} min
                    </Badge>
                  </div>
                </div>
                
                <div>
                  {activeCard.completed ? (
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Completed {activeCard.completedAt && `on ${activeCard.completedAt.toLocaleDateString()}`}
                    </Badge>
                  ) : (
                    <Button onClick={() => handleMarkComplete(activeCard.id)}>
                      Mark as Complete
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                <h2>Concept Overview</h2>
                <p className="text-lg">{activeCard.content}</p>
                
                {/* In a real app, this would be more detailed concept content */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md my-6">
                  <h3>Key Points</h3>
                  <ul>
                    <li>This is a key point about the concept</li>
                    <li>This is another important aspect to understand</li>
                    <li>Remember this crucial information for tests</li>
                  </ul>
                </div>
                
                <h3>Examples</h3>
                <p>
                  Here would be examples of the concept in action. In a real application,
                  this would include diagrams, formulas, and interactive elements.
                </p>
                
                <h3>Practice Questions</h3>
                <div className="space-y-4">
                  <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                    <p className="font-medium">Question 1:</p>
                    <p>A sample question about {activeCard.title} would appear here.</p>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-md">
                    <p className="font-medium">Question 2:</p>
                    <p>Another question to test understanding of the concept.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }
  
  // Show card list
  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <BookOpen className="text-indigo-500" /> Concept Cards
            </h1>
            <p className="text-muted-foreground">
              Master key concepts through detailed explanations
            </p>
          </div>
          
          <Link to="/dashboard/student">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Dashboard
            </Button>
          </Link>
        </div>
        
        <ConceptCardFilter 
          onFilterChange={handleFilterChange} 
          subjects={availableSubjects} 
          className="mb-6"
        />
        
        {filteredCards.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto" />
            <h2 className="mt-4 text-xl font-medium">No concept cards match your filters</h2>
            <p className="mt-2 text-muted-foreground">Try adjusting your filters to see more cards</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.map(card => (
              <Link key={card.id} to={`/study/concept-card/${card.id}`}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start">
                      <h2 className="font-semibold text-lg">{card.title}</h2>
                      {card.completed && <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />}
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-300">
                        {card.subject}
                      </Badge>
                      <Badge variant="outline" className={getDifficultyColor(card.difficulty)}>
                        {card.difficulty.charAt(0).toUpperCase() + card.difficulty.slice(1)}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mt-3 line-clamp-3">
                      {card.content}
                    </p>
                    
                    <div className="flex justify-between items-center mt-4">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {card.estimatedTime} min
                      </Badge>
                      
                      <Button size="sm" variant="ghost">
                        {card.completed ? "Review" : "Study"} Card
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ConceptCardStudyPage;
