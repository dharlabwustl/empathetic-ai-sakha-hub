
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConceptCard from '@/components/dashboard/student/ConceptCard';
import ConceptCardFilter from '@/components/dashboard/student/concept-cards/ConceptCardFilter';
import { getSubjectsForGoal } from '@/components/dashboard/student/onboarding/SubjectData';
import { DateFilterType, ConceptCardType } from '@/types/user/base';

// Mock data for demonstration - replace with actual data from your backend
const mockConceptCards: ConceptCardType[] = [
  {
    id: "cc1",
    title: "Newton's Laws of Motion",
    description: "Understanding the fundamental laws of motion and their applications",
    subject: "Physics",
    difficulty: "medium",
    completed: false,
    progress: 0,
  },
  {
    id: "cc2",
    title: "Chemical Bonding",
    description: "Learn about different types of chemical bonds and their formation",
    subject: "Chemistry",
    difficulty: "hard",
    completed: false,
    progress: 30,
  }
];

const ConceptCardsListPage = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<DateFilterType>("all");
  const [filteredCards, setFilteredCards] = useState(mockConceptCards);
  const subjects = getSubjectsForGoal("IIT-JEE"); // Replace with actual user's goal

  const handleViewCard = (id: string) => {
    navigate(`/study/concept-card/${id}`);
  };

  const handleFilterChange = (filters: {
    dateFilter: DateFilterType;
    subject: string;
    difficulty: string;
    completed: boolean | null;
  }) => {
    let filtered = [...mockConceptCards];
    
    if (filters.subject !== "all") {
      filtered = filtered.filter(card => card.subject === filters.subject);
    }
    
    if (filters.difficulty !== "all") {
      filtered = filtered.filter(card => card.difficulty === filters.difficulty);
    }
    
    if (filters.completed !== null) {
      filtered = filtered.filter(card => card.completed === filters.completed);
    }
    
    // Apply date filter
    switch (filters.dateFilter) {
      case "today":
        // Filter for today's content
        filtered = filtered.slice(0, 2); // Simplified for demo
        break;
      case "week":
        // Filter for this week's content
        filtered = filtered.slice(0, 4); // Simplified for demo
        break;
      case "month":
        // Filter for this month's content
        filtered = filtered.slice(0, 6); // Simplified for demo
        break;
    }
    
    setFilteredCards(filtered);
    setActiveFilter(filters.dateFilter);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Concept Cards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <ConceptCardFilter
                subjects={subjects}
                onFilterChange={handleFilterChange}
                className="sticky top-4"
              />
            </div>
            
            <div className="lg:col-span-3">
              <Tabs defaultValue={activeFilter} className="w-full">
                <TabsList className="grid grid-cols-4 mb-6">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="week">This Week</TabsTrigger>
                  <TabsTrigger value="month">This Month</TabsTrigger>
                </TabsList>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredCards.map((card) => (
                    <ConceptCard
                      key={card.id}
                      {...card}
                      onView={() => handleViewCard(card.id)}
                      onToggleComplete={(id, completed) => {
                        console.log('Toggle complete:', id, completed);
                        // Implement completion logic
                      }}
                    />
                  ))}
                  
                  {filteredCards.length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-500">No concept cards found for the selected filters.</p>
                    </div>
                  )}
                </div>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConceptCardsListPage;
