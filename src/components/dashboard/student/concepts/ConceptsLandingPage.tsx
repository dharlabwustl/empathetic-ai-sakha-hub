
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, Search, Clock, Calendar, ChevronRight, Tag, Star, 
  TrendingUp, Brain, Sparkles, Activity, BookMarked, GraduationCap,
  PenTool, ScrollText, FileText, CheckCircle, Lightbulb
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  masteryScore?: number;
  relatedFlashcards?: string[];
  relatedExams?: string[];
  relatedConcepts?: string[];
}

const ConceptsLandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedConcept, setHighlightedConcept] = useState<ConceptCard | null>(null);
  const { toast } = useToast();

  // Enhanced mock data for concepts
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
      isRecommended: true,
      masteryScore: 65,
      relatedFlashcards: ['flash-1', 'flash-2'],
      relatedExams: ['exam-1'],
      relatedConcepts: ['concept-3', 'concept-6']
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
      scheduledFor: "today",
      masteryScore: 45,
      relatedFlashcards: ['flash-3'],
      relatedExams: ['exam-2'],
      relatedConcepts: ['concept-5']
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
      isRecommended: true,
      masteryScore: 35,
      relatedFlashcards: ['flash-4', 'flash-5'],
      relatedExams: ['exam-3'],
      relatedConcepts: ['concept-1']
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
      lastViewed: "2 days ago",
      masteryScore: 92,
      relatedFlashcards: ['flash-6'],
      relatedExams: ['exam-4'],
      relatedConcepts: []
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
      lastViewed: "yesterday",
      masteryScore: 58,
      relatedFlashcards: ['flash-7', 'flash-8'],
      relatedExams: [],
      relatedConcepts: ['concept-2']
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
      lastViewed: "3 days ago",
      masteryScore: 42,
      relatedFlashcards: ['flash-9'],
      relatedExams: ['exam-5'],
      relatedConcepts: ['concept-1']
    }
  ];

  // Show a random highlighted concept when page loads
  useEffect(() => {
    const recommendedConcepts = concepts.filter(concept => concept.isRecommended);
    if (recommendedConcepts.length > 0) {
      const randomIndex = Math.floor(Math.random() * recommendedConcepts.length);
      setHighlightedConcept(recommendedConcepts[randomIndex]);
    } else if (concepts.length > 0) {
      const randomIndex = Math.floor(Math.random() * concepts.length);
      setHighlightedConcept(concepts[randomIndex]);
    }
  }, []);

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
    
    toast({
      title: "Loading concept study materials",
      description: "Preparing your personalized learning experience",
    });
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

  // Mastery level color
  const getMasteryColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <SharedPageLayout
      title="Concept Cards"
      subtitle="Master key concepts through interactive learning cards"
    >
      <div className="space-y-6">
        {/* Featured concept section */}
        {highlightedConcept && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-amber-500" />
              Featured Concept
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg overflow-hidden shadow-md">
              <div className="grid md:grid-cols-3 gap-6 p-6">
                <div className="md:col-span-2">
                  <div className="flex items-center mb-2">
                    <Badge variant="outline" className="mr-2">
                      {highlightedConcept.subject}
                    </Badge>
                    <Badge variant="outline" className={getDifficultyColor(highlightedConcept.difficulty)}>
                      {highlightedConcept.difficulty}
                    </Badge>
                    {highlightedConcept.isRecommended && (
                      <Badge className="ml-2 bg-purple-100 text-purple-800 border-purple-200">
                        <Star className="h-3 w-3 mr-1 fill-purple-500" />
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{highlightedConcept.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{highlightedConcept.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {highlightedConcept.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button 
                    size="lg"
                    className="w-full md:w-auto mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    onClick={(e) => handleStartLearningClick(e, highlightedConcept.id)}
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Start Learning Now
                  </Button>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <Brain className="h-4 w-4 mr-1 text-indigo-500" />
                    Concept Mastery
                  </h4>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Current Mastery</span>
                      <span className="text-sm font-medium">{highlightedConcept.masteryScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getMasteryColor(highlightedConcept.masteryScore || 0)}`} 
                        style={{width: `${highlightedConcept.masteryScore}%`}}
                      ></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-blue-500" />
                      <span>{highlightedConcept.timeEstimate} min</span>
                    </div>
                    <div className="flex items-center">
                      <Activity className="h-4 w-4 mr-1 text-green-500" />
                      <span>High value</span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1 text-amber-500" />
                      <span>Foundational</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1 text-indigo-500" />
                      <span>Exam critical</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

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
          <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <TabsTrigger value="all" className="rounded-lg">All Concepts</TabsTrigger>
            <TabsTrigger value="today" className="rounded-lg">Today's Concepts</TabsTrigger>
            <TabsTrigger value="recommended" className="rounded-lg">Recommended</TabsTrigger>
            <TabsTrigger value="in-progress" className="rounded-lg">In Progress</TabsTrigger>
            <TabsTrigger value="completed" className="rounded-lg">Completed</TabsTrigger>
            {subjects.map(subject => (
              <TabsTrigger key={subject} value={subject} className="capitalize rounded-lg">
                {subject}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
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
                  } hover:translate-y-[-2px] transition-transform duration-200`}
                  onClick={() => handleConceptClick(concept.id)}
                >
                  <CardHeader className="pb-2 bg-gradient-to-r from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
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

                    {concept.masteryScore !== undefined && (
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium">Mastery</span>
                          <span>{concept.masteryScore}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                          <div 
                            className={`h-1.5 rounded-full ${getMasteryColor(concept.masteryScore)}`} 
                            style={{ width: `${concept.masteryScore}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
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
                    
                    {concept.progress > 0 && concept.progress < 100 && (
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
                  
                  <CardFooter className="bg-gray-50 dark:bg-gray-800">
                    <Button 
                      variant={concept.isRecommended ? "default" : "outline"}
                      className={`w-full ${concept.isRecommended ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600' : ''}`}
                      onClick={(e) => handleStartLearningClick(e, concept.id)}
                    >
                      {concept.completed ? 
                        <><BookMarked className="h-4 w-4 mr-1" /> Review Again</> : 
                        concept.progress > 0 ? 
                        <><BookOpen className="h-4 w-4 mr-1" /> Continue Learning</> : 
                        <><PenTool className="h-4 w-4 mr-1" /> Start Learning</>
                      }
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

        {/* Learning Insights Section */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
            Learning Insights
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center">
                  <Activity className="mr-2 h-4 w-4 text-blue-600" />
                  Study Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                      <TrendingUp className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm">Focus on high-value concepts first</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                      <Clock className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm">Study in 25-min focused sessions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-2 mt-0.5">
                      <Brain className="h-3 w-3 text-blue-600" />
                    </div>
                    <span className="text-sm">Review concepts after 48 hours</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center">
                  <GraduationCap className="mr-2 h-4 w-4 text-purple-600" />
                  Subject Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">Physics</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                      <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">Chemistry</span>
                      <span>45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                      <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">Mathematics</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                      <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center">
                  <ScrollText className="mr-2 h-4 w-4 text-amber-600" />
                  Related Resources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate('/dashboard/student/flashcards')}>
                    <FileText className="h-3.5 w-3.5 mr-2 text-amber-600" />
                    Flashcards Library
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate('/dashboard/student/practice-exam')}>
                    <FileText className="h-3.5 w-3.5 mr-2 text-red-600" />
                    Practice Exams
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => navigate('/dashboard/student/tutor')}>
                    <FileText className="h-3.5 w-3.5 mr-2 text-blue-600" />
                    Ask AI Tutor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptsLandingPage;
