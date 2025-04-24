
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ConceptCardFilter from '@/components/dashboard/student/concept-cards/ConceptCardFilter';
import ConceptCard from '@/components/dashboard/student/ConceptCard';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateFilterType, ConceptCardType } from '@/types/user/base';
import { getSubjectsForGoal } from '@/components/dashboard/student/onboarding/SubjectData';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Filter, Calendar } from 'lucide-react';

// Mock data for concept cards with learning style tags
const mockConceptCards: ConceptCardType[] = [
  {
    id: "cc1",
    title: "Newton's Laws of Motion",
    description: "Understanding the fundamental laws of motion and their applications in mechanics",
    subject: "Physics",
    difficulty: "medium",
    completed: false,
    progress: 0,
    tags: ["visual", "kinesthetic"],
    chapter: "Classical Mechanics"
  },
  {
    id: "cc2",
    title: "Chemical Bonding",
    description: "Learn about different types of chemical bonds and their formation mechanisms",
    subject: "Chemistry",
    difficulty: "hard",
    completed: false,
    progress: 30,
    tags: ["visual", "reading"],
    chapter: "Chemical Structures"
  },
  {
    id: "cc3",
    title: "Differential Calculus",
    description: "Master the concepts of limits, continuity and differentiation",
    subject: "Mathematics",
    difficulty: "hard",
    completed: true,
    progress: 100,
    tags: ["logical", "reading"],
    chapter: "Calculus"
  },
  {
    id: "cc4",
    title: "Cell Structure and Function",
    description: "Explore the structure of cells and their specialized functions",
    subject: "Biology",
    difficulty: "medium",
    completed: false,
    progress: 45,
    tags: ["visual", "social"],
    chapter: "Cell Biology"
  },
  {
    id: "cc5",
    title: "Quantum Mechanics Basics",
    description: "Introduction to the principles of quantum mechanics and wave functions",
    subject: "Physics",
    difficulty: "hard",
    completed: false,
    progress: 15,
    tags: ["logical", "solitary"],
    chapter: "Modern Physics"
  },
  {
    id: "cc6",
    title: "Organic Chemistry Fundamentals",
    description: "Basic principles and reactions in organic chemistry",
    subject: "Chemistry",
    difficulty: "medium",
    completed: false,
    progress: 20,
    tags: ["visual", "kinesthetic"],
    chapter: "Organic Chemistry"
  }
];

// Define the concept cards today, this week, and this month
const todayCards = mockConceptCards.slice(0, 2);
const thisWeekCards = mockConceptCards.slice(0, 4);
const thisMonthCards = mockConceptCards;

interface ConceptCardsPageProps {
  userLearningStyle?: string[];
}

const ConceptCardPage: React.FC<ConceptCardsPageProps> = ({ userLearningStyle = ["visual", "reading"] }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { filterType } = useParams();
  
  // State for filters
  const [activeFilter, setActiveFilter] = useState<DateFilterType>(filterType as DateFilterType || "all");
  const [filteredCards, setFilteredCards] = useState<ConceptCardType[]>(mockConceptCards);
  const [isLoading, setIsLoading] = useState(false);
  const subjects = getSubjectsForGoal("IIT-JEE"); // Replace with actual user's goal

  // Handle navigation to study page
  const handleViewCard = (id: string) => {
    navigate(`/study/concept-card/${id}`);
  };

  // Handle completion toggle
  const handleToggleComplete = (id: string, completed: boolean) => {
    // In a real app, this would update the backend
    toast({
      title: completed ? "Marked as completed" : "Marked as incomplete",
      description: `Card has been ${completed ? "completed" : "marked as incomplete"}.`,
    });

    // Update local state
    const updatedCards = filteredCards.map(card => 
      card.id === id ? { ...card, completed, progress: completed ? 100 : card.progress } : card
    );
    setFilteredCards(updatedCards);
  };

  // Update filters based on date selection
  useEffect(() => {
    setIsLoading(true);
    
    // Simulating API delay
    setTimeout(() => {
      let cardsToShow;
      switch (activeFilter) {
        case "today":
          cardsToShow = todayCards;
          break;
        case "week":
          cardsToShow = thisWeekCards;
          break;
        case "month":
          cardsToShow = thisMonthCards;
          break;
        default:
          cardsToShow = mockConceptCards;
      }
      setFilteredCards(cardsToShow);
      setIsLoading(false);
    }, 500);
  }, [activeFilter]);

  // Complex filter handling
  const handleFilterChange = (filters: {
    dateFilter: DateFilterType;
    subject: string;
    difficulty: string;
    completed: boolean | null;
    learningStyle?: string;
  }) => {
    setIsLoading(true);
    setActiveFilter(filters.dateFilter);
    
    // Get base set of cards by time period
    let baseCards;
    switch (filters.dateFilter) {
      case "today":
        baseCards = todayCards;
        break;
      case "week":
        baseCards = thisWeekCards;
        break;
      case "month":
        baseCards = thisMonthCards;
        break;
      default:
        baseCards = mockConceptCards;
    }
    
    // Apply additional filters
    let filtered = [...baseCards];
    
    if (filters.subject !== "all") {
      filtered = filtered.filter(card => card.subject === filters.subject);
    }
    
    if (filters.difficulty !== "all") {
      filtered = filtered.filter(card => card.difficulty === filters.difficulty);
    }
    
    if (filters.completed !== null) {
      filtered = filtered.filter(card => card.completed === filters.completed);
    }
    
    if (filters.learningStyle && filters.learningStyle !== "all") {
      filtered = filtered.filter(card => 
        card.tags?.includes(filters.learningStyle as string)
      );
    }
    
    // Simulate API delay
    setTimeout(() => {
      setFilteredCards(filtered);
      setIsLoading(false);
    }, 300);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-indigo-500" />
            <CardTitle>Concept Cards</CardTitle>
          </div>
          
          <Tabs 
            value={activeFilter} 
            onValueChange={(value) => handleFilterChange({
              dateFilter: value as DateFilterType,
              subject: "all",
              difficulty: "all",
              completed: null
            })}
            className="w-full sm:w-auto mt-4 sm:mt-0"
          >
            <TabsList className="grid grid-cols-4 w-full sm:w-auto">
              <TabsTrigger value="today" className="text-xs sm:text-sm">Today</TabsTrigger>
              <TabsTrigger value="week" className="text-xs sm:text-sm">This Week</TabsTrigger>
              <TabsTrigger value="month" className="text-xs sm:text-sm">This Month</TabsTrigger>
              <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <ConceptCardFilter
                subjects={subjects}
                learningStyles={["visual", "reading", "kinesthetic", "logical", "social", "solitary"]}
                userLearningStyle={userLearningStyle}
                onFilterChange={handleFilterChange}
                className="sticky top-4"
              />
            </div>
            
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <Card key={`skeleton-${i}`} className="h-56 animate-pulse bg-gray-100 dark:bg-gray-800" />
                  ))}
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={activeFilter}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {filteredCards.map((card) => (
                      <ConceptCard
                        key={card.id}
                        {...card}
                        onView={() => handleViewCard(card.id)}
                        onToggleComplete={handleToggleComplete}
                      />
                    ))}
                    
                    {filteredCards.length === 0 && (
                      <div className="col-span-full text-center py-12">
                        <Filter className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-xl text-gray-500 font-medium">No concept cards found</p>
                        <p className="text-gray-400 mt-1">Try adjusting your filters to see more results</p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptCardPage;
