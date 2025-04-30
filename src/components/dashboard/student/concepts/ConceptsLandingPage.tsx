
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Tag, Clock, ArrowRight, Star } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

// Mock data for concept cards
const MOCK_CONCEPTS = [
  {
    id: 'concept1',
    title: "Newton's Laws of Motion",
    subject: "Physics",
    topic: "Mechanics",
    difficulty: "intermediate",
    estimatedTime: 25,
    tags: ["force", "motion", "mechanics"],
    progress: 20,
    status: "in-progress"
  },
  {
    id: 'concept2',
    title: "Periodic Table",
    subject: "Chemistry",
    topic: "Elements",
    difficulty: "beginner",
    estimatedTime: 30,
    tags: ["elements", "chemistry", "properties"],
    progress: 0,
    status: "not-started"
  },
  {
    id: 'concept3',
    title: "Integration Techniques",
    subject: "Mathematics",
    topic: "Calculus",
    difficulty: "advanced",
    estimatedTime: 45,
    tags: ["calculus", "integration", "math"],
    progress: 100,
    status: "completed"
  },
  {
    id: 'concept4',
    title: "Cell Structure",
    subject: "Biology",
    topic: "Cytology",
    difficulty: "intermediate",
    estimatedTime: 35,
    tags: ["cells", "biology", "microscope"],
    progress: 65,
    status: "in-progress"
  },
  {
    id: 'concept5',
    title: "Quadratic Equations",
    subject: "Mathematics",
    topic: "Algebra",
    difficulty: "beginner",
    estimatedTime: 20,
    tags: ["algebra", "equations", "polynomial"],
    progress: 0,
    status: "not-started"
  },
  {
    id: 'concept6',
    title: "Chemical Bonding",
    subject: "Chemistry",
    topic: "Molecular Structure",
    difficulty: "intermediate",
    estimatedTime: 25,
    tags: ["bonds", "molecules", "structure"],
    progress: 45,
    status: "in-progress"
  }
];

const ConceptsLandingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter concepts based on search and active tab
  const filteredConcepts = MOCK_CONCEPTS.filter(concept => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concept.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concept.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concept.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Filter by tab
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'in-progress' && concept.status === 'in-progress') ||
      (activeTab === 'completed' && concept.status === 'completed') ||
      (activeTab === 'not-started' && concept.status === 'not-started');
    
    return matchesSearch && matchesTab;
  });
  
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
      case 'intermediate': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400';
      case 'advanced': return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };
  
  const getProgressColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-500';
      case 'in-progress': return 'bg-blue-500';
      case 'not-started': return 'bg-gray-300 dark:bg-gray-700';
      default: return 'bg-gray-300 dark:bg-gray-700';
    }
  };

  return (
    <SharedPageLayout
      title="Concept Cards"
      subtitle="Master key concepts and fundamentals"
    >
      <div className="space-y-6">
        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search concepts, subjects or tags..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Sort by:</span>
            <select className="border rounded bg-background px-2 py-1 text-sm">
              <option>Latest</option>
              <option>Difficulty</option>
              <option>Progress</option>
            </select>
          </div>
        </div>
        
        {/* Tabs for filtering */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Concepts</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="not-started">Not Started</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            {filteredConcepts.length === 0 ? (
              <div className="text-center py-8">
                <BookOpen className="h-10 w-10 text-gray-400 mb-2 mx-auto" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">No concepts found</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  {searchQuery ? 'Try a different search term' : 'No concepts in this category yet'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConcepts.map((concept) => (
                  <Link to={`/dashboard/student/concepts/card/${concept.id}`} key={concept.id}>
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer flex flex-col">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                            {concept.subject}
                          </Badge>
                          <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                            {concept.difficulty.charAt(0).toUpperCase() + concept.difficulty.slice(1)}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg font-semibold">{concept.title}</CardTitle>
                        <CardDescription>{concept.topic}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <div className="space-y-4">
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{concept.estimatedTime} min</span>
                            
                            {concept.status === 'completed' && (
                              <div className="ml-auto flex items-center">
                                <Star className="h-4 w-4 text-amber-500 mr-1" />
                                <span className="text-amber-600 dark:text-amber-400">Mastered</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center text-sm text-gray-500 gap-1 flex-wrap">
                            <Tag className="h-3.5 w-3.5 mb-0.5" />
                            {concept.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs py-0">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{concept.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${getProgressColor(concept.status)}`} 
                                style={{ width: `${concept.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <div className="p-4 pt-0">
                        <Button className="w-full" variant={concept.status === 'completed' ? "outline" : "default"}>
                          {concept.status === 'not-started' ? 'Start Learning' : 
                           concept.status === 'in-progress' ? 'Continue Learning' : 
                           'Review Concept'}
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptsLandingPage;
