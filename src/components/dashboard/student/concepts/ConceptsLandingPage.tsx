import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Clock, Star, Sparkles } from "lucide-react";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const ConceptsLandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  
  // Sample concepts data - in a real app, this would come from an API
  const conceptCards = [
    {
      id: "concept-1",
      title: "Newton's Laws of Motion",
      subject: "Physics",
      description: "The three fundamental laws that define the relationship between an object's motion and the forces acting on it.",
      difficulty: "medium",
      timeEstimate: "25 mins",
      isBookmarked: true,
      progress: 0.8,
    },
    {
      id: "concept-2",
      title: "Periodic Table & Elements",
      subject: "Chemistry",
      description: "Organization and patterns of elements, their properties, and chemical behaviors.",
      difficulty: "easy",
      timeEstimate: "20 mins",
      isBookmarked: false,
      progress: 0.5,
    },
    {
      id: "concept-3",
      title: "Cell Division & Mitosis",
      subject: "Biology",
      description: "The process by which a single cell divides into two identical daughter cells.",
      difficulty: "hard",
      timeEstimate: "30 mins",
      isBookmarked: true,
      progress: 0.3,
    },
    {
      id: "concept-4",
      title: "Integration Techniques",
      subject: "Mathematics",
      description: "Methods for calculating integrals, including substitution, parts, and partial fractions.",
      difficulty: "hard",
      timeEstimate: "40 mins",
      isBookmarked: false,
      progress: 0.2,
    },
    {
      id: "concept-5",
      title: "Electromagnetic Waves",
      subject: "Physics",
      description: "Waves of coupled electric and magnetic fields that propagate through space.",
      difficulty: "hard",
      timeEstimate: "35 mins",
      isBookmarked: false,
      progress: 0.1,
    },
    {
      id: "concept-6",
      title: "Organic Compounds",
      subject: "Chemistry",
      description: "Carbon-containing compounds, their structures, properties, and reactions.",
      difficulty: "medium",
      timeEstimate: "25 mins",
      isBookmarked: false,
      progress: 0,
    },
  ];
  
  // Filtered concepts based on search and active tab
  const filteredConcepts = conceptCards.filter((concept) => {
    const matchesSearch = concept.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         concept.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'bookmarked') return matchesSearch && concept.isBookmarked;
    if (activeTab === 'inProgress') return matchesSearch && concept.progress > 0 && concept.progress < 1;
    if (activeTab === 'completed') return matchesSearch && concept.progress === 1;
    if (activeTab === 'notStarted') return matchesSearch && concept.progress === 0;
    
    return matchesSearch && concept.subject.toLowerCase() === activeTab.toLowerCase();
  });

  // Get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'medium': return 'bg-amber-100 text-amber-800 hover:bg-amber-200';
      case 'hard': return 'bg-red-100 text-red-800 hover:bg-red-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };
  
  // Navigate to the concept card detail page
  const handleViewConcept = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/card/${conceptId}`);
  };

  return (
    <SharedPageLayout
      title="Concept Cards"
      subtitle="Master key concepts and fundamentals"
    >
      <div className="space-y-6">
        {/* Search bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search concepts..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Tabs for filtering */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="physics">Physics</TabsTrigger>
            <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
            <TabsTrigger value="biology">Biology</TabsTrigger>
            <TabsTrigger value="mathematics">Math</TabsTrigger>
            <TabsTrigger value="bookmarked">
              <Star className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Saved</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Concept cards grid */}
          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConcepts.map((concept) => (
                <Card 
                  key={concept.id} 
                  className="hover:shadow-lg transition-shadow overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800"
                >
                  <div className="relative px-5 pt-5 pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <Badge 
                        className={`${getDifficultyColor(concept.difficulty)} px-3 py-1 rounded-full text-xs font-medium`}
                      >
                        {concept.difficulty}
                      </Badge>
                      {concept.isBookmarked && (
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      )}
                    </div>
                    
                    <CardHeader className="p-0">
                      <CardTitle className="text-xl font-bold">{concept.title}</CardTitle>
                      <Badge className="mt-2 bg-blue-100/80 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
                        {concept.subject}
                      </Badge>
                    </CardHeader>
                    
                    <CardContent className="px-0 py-3">
                      <p className="text-gray-600 dark:text-gray-300 line-clamp-2 text-sm">
                        {concept.description}
                      </p>
                      <div className="flex items-center mt-3 text-sm text-gray-500 dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{concept.timeEstimate}</span>
                      </div>
                    </CardContent>
                    
                    {concept.progress > 0 && (
                      <div className="w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full mt-2 mb-3">
                        <div 
                          className="bg-blue-600 dark:bg-blue-500 h-1 rounded-full" 
                          style={{ width: `${concept.progress * 100}%` }} 
                        />
                      </div>
                    )}
                  </div>
                  
                  <CardFooter className="bg-gray-50 dark:bg-gray-800/50 p-3">
                    <Button 
                      onClick={() => handleViewConcept(concept.id)} 
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                      variant="default"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Study Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {filteredConcepts.length === 0 && (
                <div className="col-span-full py-10 text-center">
                  <Sparkles className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <h3 className="text-lg font-medium">No matching concepts found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptsLandingPage;
