import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, Clock, Calendar, ChevronRight, Tag, Star } from 'lucide-react';

interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeEstimate: number;
  tags: string[];
  completed: boolean;
  progress: number;
  lastViewed?: string;
  scheduledFor?: string;
  isRecommended?: boolean;
}

const ConceptsLandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for concepts
  const concepts: ConceptCard[] = [
    {
      id: 'concept-1',
      title: "Newton's Laws of Motion",
      subject: "Physics",
      chapter: "Mechanics",
      description: "Learn about Newton's three laws of motion and their applications in various scenarios.",
      difficulty: "Medium",
      timeEstimate: 30,
      tags: ["Mechanics", "Forces", "Motion"],
      completed: false,
      progress: 0,
      scheduledFor: "today",
      isRecommended: true
    },
    {
      id: 'concept-2',
      title: "Periodic Table of Elements",
      subject: "Chemistry",
      chapter: "Atomic Structure",
      description: "Explore the periodic table and understand element properties and trends.",
      difficulty: "Easy",
      timeEstimate: 25,
      tags: ["Elements", "Periodic Table", "Properties"],
      completed: false,
      progress: 0,
      scheduledFor: "today"
    },
    {
      id: 'concept-3',
      title: "Calculus: Integration Techniques",
      subject: "Mathematics",
      chapter: "Calculus",
      description: "Master various integration techniques including substitution and parts.",
      difficulty: "Hard",
      timeEstimate: 45,
      tags: ["Integration", "Calculus", "Advanced Math"],
      completed: false,
      progress: 0,
      scheduledFor: "tomorrow",
      isRecommended: true
    },
    {
      id: 'concept-4',
      title: "Cell Structure and Function",
      subject: "Biology",
      chapter: "Cell Biology",
      description: "Understand the structure of cells and their various functions in organisms.",
      difficulty: "Medium",
      timeEstimate: 35,
      tags: ["Cell", "Biology", "Organelles"],
      completed: true,
      progress: 100,
      lastViewed: "2 days ago"
    },
    {
      id: 'concept-5',
      title: "Organic Chemistry: Alkenes",
      subject: "Chemistry",
      chapter: "Organic Chemistry",
      description: "Learn about structure, properties and reactions of alkenes.",
      difficulty: "Hard",
      timeEstimate: 40,
      tags: ["Organic", "Alkenes", "Reactions"],
      completed: false,
      progress: 65,
      lastViewed: "yesterday"
    },
    {
      id: 'concept-6',
      title: "Electromagnetic Induction",
      subject: "Physics",
      chapter: "Electromagnetism",
      description: "Understand electromagnetic induction and Faraday's laws.",
      difficulty: "Hard",
      timeEstimate: 40,
      tags: ["Electromagnetism", "Induction", "Faraday"],
      completed: false,
      progress: 25,
      lastViewed: "3 days ago"
    }
  ];

  // Filter concepts based on tab and search
  const getFilteredConcepts = () => {
    let filtered = concepts;
    
    // Filter by tab
    if (activeTab === 'today') {
      filtered = filtered.filter(concept => concept.scheduledFor === 'today');
    } else if (activeTab === 'completed') {
      filtered = filtered.filter(concept => concept.completed);
    } else if (activeTab === 'in-progress') {
      filtered = filtered.filter(concept => !concept.completed && concept.progress > 0);
    } else if (activeTab === 'recommended') {
      filtered = filtered.filter(concept => concept.isRecommended);
    } else if (activeTab !== 'all') {
      // Filter by subject
      filtered = filtered.filter(concept => concept.subject.toLowerCase() === activeTab);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(concept => 
        concept.title.toLowerCase().includes(query) || 
        concept.subject.toLowerCase().includes(query) ||
        concept.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return filtered;
  };

  const filteredConcepts = getFilteredConcepts();
  
  // Get list of unique subjects
  const subjects = Array.from(new Set(concepts.map(concept => concept.subject.toLowerCase())));
  
  // Handle card click to navigate to concept detail
  const handleConceptClick = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/card/${conceptId}`);
  };

  // Handle start learning button click
  const handleStartLearningClick = (e: React.MouseEvent<HTMLButtonElement>, conceptId: string) => {
    e.stopPropagation(); // Prevent triggering the card click
    navigate(`/dashboard/student/concepts/${conceptId}/study`);
  };

  // Difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <SharedPageLayout
      title="Concept Cards"
      subtitle="Master key concepts through interactive learning cards"
    >
      <div className="space-y-6">
        {/* Search and filter bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search concepts by title, subject, or tag..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-full"
          />
        </div>

        {/* Tabs for filtering */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start">
            <TabsTrigger value="all">All Concepts</TabsTrigger>
            <TabsTrigger value="today">Today's Concepts</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            {subjects.map(subject => (
              <TabsTrigger key={subject} value={subject} className="capitalize">
                {subject}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConcepts.map(concept => (
                <Card 
                  key={concept.id}
                  className={`cursor-pointer transition-all hover:shadow-md overflow-hidden border-l-4 ${
                    concept.completed 
                      ? 'border-l-green-500' 
                      : concept.progress > 0 
                        ? 'border-l-blue-500' 
                        : concept.isRecommended 
                          ? 'border-l-violet-500' 
                          : 'border-l-gray-300'
                  }`}
                  onClick={() => handleConceptClick(concept.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-1">
                      <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                        {concept.difficulty}
                      </Badge>
                      {concept.isRecommended && (
                        <Badge variant="outline" className="bg-violet-50 text-violet-800 border-violet-200">
                          <Star className="h-3 w-3 mr-1 fill-violet-500 text-violet-500" />
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600">{concept.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <div className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {concept.description}
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {concept.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        <span>{concept.subject}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{concept.timeEstimate} min</span>
                      </div>
                    </div>
                    
                    {concept.progress > 0 && (
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{concept.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${concept.progress}%` }}></div>
                        </div>
                      </div>
                    )}
                    
                    {concept.lastViewed && (
                      <div className="mt-2 text-xs text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>Last viewed: {concept.lastViewed}</span>
                      </div>
                    )}
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={(e) => handleStartLearningClick(e, concept.id)}
                    >
                      {concept.completed ? 'Review Again' : concept.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredConcepts.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-20" />
                <h3 className="text-lg font-medium mb-1">No concepts found</h3>
                <p>Try adjusting your filter or search criteria</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptsLandingPage;
