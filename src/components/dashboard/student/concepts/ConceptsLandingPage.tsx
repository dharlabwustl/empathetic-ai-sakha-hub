import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  BookOpen, Search, Clock, Calendar, ChevronRight, Tag, Star, 
  TrendingUp, Brain, Sparkles, Activity, BookMarked, GraduationCap,
  FileText, CheckCircle, Lightbulb, BarChart2, RotateCw, Timer,
  Bookmark, BookmarkPlus, PenLine, Globe, Zap, Layers, AlertCircle
} from 'lucide-react';

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
  // New fields for enhanced features
  accuracyRate?: number;
  timeSpent?: number;
  firstStudied?: string;
  recallAttempts?: number;
  recallSuccess?: number;
  nextReviewDate?: string;
  retentionScore?: number;
  hasBookmark?: boolean;
  hasNotes?: boolean;
  realWorldApplications?: string[];
  suggestedFocusAreas?: string[];
}

const ConceptsLandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightedConcept, setHighlightedConcept] = useState<ConceptCard | null>(null);
  const { toast } = useToast();

  // Enhanced mock data for concepts with new tracking features
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
      relatedConcepts: ['concept-3', 'concept-6'],
      // New enhanced data
      accuracyRate: 68,
      timeSpent: 45,
      firstStudied: '2023-04-15',
      recallAttempts: 4,
      recallSuccess: 3,
      nextReviewDate: 'tomorrow',
      retentionScore: 72,
      hasBookmark: true,
      hasNotes: true,
      realWorldApplications: ['Rocket Propulsion', 'Car Safety', 'Sports Dynamics'],
      suggestedFocusAreas: ['Third Law Applications']
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
      relatedConcepts: ['concept-5'],
      // New enhanced data
      accuracyRate: 52,
      timeSpent: 20,
      firstStudied: '2023-04-02',
      recallAttempts: 2,
      recallSuccess: 1,
      nextReviewDate: 'today',
      retentionScore: 48,
      hasBookmark: false,
      hasNotes: false,
      realWorldApplications: ['Battery Technology', 'Medical Imaging', 'Materials Science'],
      suggestedFocusAreas: ['Noble Gases', 'Transition Metals']
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
      relatedConcepts: ['concept-1'],
      // New enhanced data
      accuracyRate: 40,
      timeSpent: 60,
      firstStudied: '2023-03-28',
      recallAttempts: 6,
      recallSuccess: 2,
      nextReviewDate: 'in 2 days',
      retentionScore: 35,
      hasBookmark: true,
      hasNotes: true,
      realWorldApplications: ['Engineering Design', 'Economic Models', 'Computer Graphics'],
      suggestedFocusAreas: ['Integration by Parts', 'Substitution Method']
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
      relatedConcepts: [],
      // New enhanced data
      accuracyRate: 95,
      timeSpent: 30,
      firstStudied: '2023-03-15',
      recallAttempts: 1,
      recallSuccess: 1,
      nextReviewDate: 'none',
      retentionScore: 90,
      hasBookmark: false,
      hasNotes: false,
      realWorldApplications: ['Drug Development', 'Genetic Engineering', 'Disease Diagnosis'],
      suggestedFocusAreas: []
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
      relatedConcepts: ['concept-2'],
      // New enhanced data
      accuracyRate: 60,
      timeSpent: 50,
      firstStudied: '2023-02-28',
      recallAttempts: 3,
      recallSuccess: 2,
      nextReviewDate: 'in 5 days',
      retentionScore: 62,
      hasBookmark: true,
      hasNotes: false,
      realWorldApplications: ['Plastics Industry', 'Pharmaceuticals', 'Fuel Production'],
      suggestedFocusAreas: ['Addition Reactions', 'Polymerization']
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
      relatedConcepts: ['concept-1'],
      // New enhanced data
      accuracyRate: 45,
      timeSpent: 55,
      firstStudied: '2023-02-15',
      recallAttempts: 5,
      recallSuccess: 1,
      nextReviewDate: 'in 1 week',
      retentionScore: 40,
      hasBookmark: false,
      hasNotes: true,
      realWorldApplications: ['Electric Generators', 'Transformers', 'Wireless Charging'],
      suggestedFocusAreas: ['Lenzs Law', 'Applications of Induction']
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
    } else if (activeTab === 'bookmarked') {
      filtered = filtered.filter(concept => concept.hasBookmark);
    } else if (activeTab === 'with-notes') {
      filtered = filtered.filter(concept => concept.hasNotes);
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

  // Handle bookmark click
  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>, conceptId: string) => {
    e.stopPropagation(); // Prevent triggering the card click
    
    // Find the concept and toggle bookmark state
    const updatedConcepts = concepts.map(concept => {
      if (concept.id === conceptId) {
        return {
          ...concept,
          hasBookmark: !concept.hasBookmark
        };
      }
      return concept;
    });
    
    // In a real app, we'd update the state and send to backend
    // For this demo, just show toast
    const concept = concepts.find(c => c.id === conceptId);
    const isBookmarked = concept?.hasBookmark;
    
    toast({
      title: isBookmarked ? "Bookmark removed" : "Concept bookmarked",
      description: isBookmarked 
        ? "Concept removed from your bookmarks" 
        : "You can access this concept from your bookmarks section",
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

  // Retention score color
  const getRetentionScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <SharedPageLayout
      title="Concept Cards"
      subtitle="Master key concepts through interactive learning cards"
    >
      <div className="space-y-6">
        {/* Featured concept section with enhanced tracking */}
        {highlightedConcept && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-amber-500" />
              Featured Concept
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg overflow-hidden shadow-md">
              <div className="grid md:grid-cols-3 gap-6 p-6">
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {highlightedConcept.subject}
                      </Badge>
                      <Badge variant="outline" className={getDifficultyColor(highlightedConcept.difficulty)}>
                        {highlightedConcept.difficulty}
                      </Badge>
                      {highlightedConcept.isRecommended && (
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                          <Star className="h-3 w-3 mr-1 fill-purple-500" />
                          Recommended
                        </Badge>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className={highlightedConcept.hasBookmark ? "text-yellow-500" : ""}
                      onClick={(e) => handleBookmarkClick(e, highlightedConcept.id)}
                    >
                      {highlightedConcept.hasBookmark ? (
                        <Bookmark className="h-5 w-5 fill-yellow-500" />
                      ) : (
                        <BookmarkPlus className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{highlightedConcept.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{highlightedConcept.description}</p>
                  
                  {/* Real-World Application Section */}
                  {highlightedConcept.realWorldApplications && (
                    <div className="mb-4 bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-md flex gap-2">
                      <Globe className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">Real-world Applications:</p>
                        <div className="flex flex-wrap gap-1">
                          {highlightedConcept.realWorldApplications.map((app, i) => (
                            <Badge key={i} variant="outline" className="bg-blue-100/50 text-blue-700 border-blue-200">
                              {app}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {highlightedConcept.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
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
                  {/* Enhanced Learning Analytics */}
                  <h4 className="font-semibold mb-3 flex items-center">
                    <Brain className="h-4 w-4 mr-1 text-indigo-500" />
                    Learning Analytics
                  </h4>
                  
                  {/* Concept Mastery */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Mastery Score</span>
                      <span className="text-sm font-medium">{highlightedConcept.masteryScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getMasteryColor(highlightedConcept.masteryScore || 0)}`} 
                        style={{width: `${highlightedConcept.masteryScore}%`}}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Accuracy Rate */}
                  {highlightedConcept.accuracyRate !== undefined && (
                    <div className="mb-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm">Accuracy Rate</span>
                        <span className="text-sm font-medium">{highlightedConcept.accuracyRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${highlightedConcept.accuracyRate >= 70 ? 'bg-green-500' : 'bg-amber-500'}`} 
                          style={{width: `${highlightedConcept.accuracyRate}%`}}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Recall & Retention */}
                  {highlightedConcept.retentionScore !== undefined && (
                    <div className="mb-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Long-term Retention</span>
                        <span className={`text-sm font-medium ${getRetentionScoreColor(highlightedConcept.retentionScore)}`}>
                          {highlightedConcept.retentionScore}%
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-xs">
                        <RotateCw className="h-3.5 w-3.5 text-blue-500" />
                        <span>
                          Next review: <span className="font-medium">{highlightedConcept.nextReviewDate}</span>
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Time & Activity Stats */}
                  <div className="grid grid-cols-2 gap-2 text-sm mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-blue-500" />
                      <span>{highlightedConcept.timeSpent || highlightedConcept.timeEstimate} min</span>
                    </div>
                    {highlightedConcept.recallAttempts !== undefined && (
                      <div className="flex items-center">
                        <Activity className="h-4 w-4 mr-1 text-green-500" />
                        <span>{highlightedConcept.recallSuccess}/{highlightedConcept.recallAttempts} recalls</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-amber-500" />
                      <span>Due: {highlightedConcept.scheduledFor || 'anytime'}</span>
                    </div>
                    {highlightedConcept.suggestedFocusAreas && highlightedConcept.suggestedFocusAreas.length > 0 && (
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1 text-indigo-500" />
                        <span>Focus needed</span>
                      </div>
                    )}
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

        {/* Enhanced Tabs for filtering */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full overflow-x-auto flex flex-nowrap justify-start p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <TabsTrigger value="all" className="rounded-lg">All Concepts</TabsTrigger>
            <TabsTrigger value="today" className="rounded-lg">Due Today</TabsTrigger>
            <TabsTrigger value="recommended" className="rounded-lg">Recommended</TabsTrigger>
            <TabsTrigger value="in-progress" className="rounded-lg">In Progress</TabsTrigger>
            <TabsTrigger value="completed" className="rounded-lg">Completed</TabsTrigger>
            <TabsTrigger value="bookmarked" className="rounded-lg">Bookmarked</TabsTrigger>
            <TabsTrigger value="with-notes" className="rounded-lg">With Notes</TabsTrigger>
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
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                          {concept.difficulty}
                        </Badge>
                        {concept.isRecommended && (
                          <Badge variant="outline" className="bg-violet-50 text-violet-800 border-violet-200">
                            <Star className="h-3 w-3 mr-1 fill-violet-500 text-violet-500" />
                            Recommended
                          </Badge>
                        )}
                        {concept.scheduledFor === 'today' && (
                          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                            <Clock className="h-3 w-3 mr-1" />
                            Due Today
                          </Badge>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className={`h-8 w-8 ${concept.hasBookmark ? "text-yellow-500" : ""}`}
                        onClick={(e) => handleBookmarkClick(e, concept.id)}
                      >
                        {concept.hasBookmark ? (
                          <Bookmark className="h-4 w-4 fill-yellow-500" />
                        ) : (
                          <BookmarkPlus className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600">{concept.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <div className="text-sm text-muted-foreground line-clamp-2 mb-3">
                      {concept.description}
                    </div>
                    
                    {/* Enhanced metrics section */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-3">
                      {concept.masteryScore !== undefined && (
                        <div className="col-span-2">
                          <div className="flex justify-between text-xs mb-0.5">
                            <span>Mastery Score</span>
                            <span>{concept.masteryScore}%</span>
                          </div>
                          <Progress value={concept.masteryScore} className="h-1" />
                        </div>
                      )}
                      
                      {concept.accuracyRate !== undefined && (
                        <div className="flex items-center">
                          <BarChart2 className="h-3.5 w-3.5 mr-1 text-blue-500" />
                          <span>{concept.accuracyRate}% accuracy</span>
                        </div>
                      )}
                      
                      {concept.recallAttempts !== undefined && (
                        <div className="flex items-center">
                          <Brain className="h-3.5 w-3.5 mr-1 text-violet-500" />
                          <span>{concept.recallSuccess}/{concept.recallAttempts} recalls</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Real-world applications - condensed */}
                    {concept.realWorldApplications && concept.realWorldApplications.length > 0 && (
                      <div className="mb-3">
                        <div className="flex gap-1 items-center mb-1">
                          <Globe className="h-3.5 w-3.5 text-blue-500" />
                          <p className="text-xs font-medium text-blue-700 dark:text-blue-300">Used in real world:</p>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {concept.realWorldApplications.slice(0, 2).map((app, i) => (
                            <Badge key={i} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                              {app}
                            </Badge>
                          ))}
                          {concept.realWorldApplications.length > 2 && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                              +{concept.realWorldApplications.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {concept.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground border-t pt-2 mt-2">
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>~{concept.timeEstimate} min</span>
                      </div>
                      {concept.lastViewed && (
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>Viewed: {concept.lastViewed}</span>
                        </div>
                      )}
                      {concept.nextReviewDate && (
                        <div className="flex items-center text-blue-600">
                          <RotateCw className="h-3.5 w-3.5 mr-1" />
                          <span>Review: {concept.nextReviewDate}</span>
                        </div>
                      )}
                      {concept.hasNotes && (
                        <div className="flex items-center">
                          <PenLine className="h-3.5 w-3.5 mr-1 text-amber-500" />
                          <span>Has notes</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-0 pb-3">
                    <Button 
                      variant={concept.completed ? "outline" : "default"}
                      className="w-full"
                      onClick={(e) => handleStartLearningClick(e, concept.id)}
                    >
                      {concept.completed 
                        ? 'Review Again' 
                        : concept.progress > 0 
                          ? 'Continue Learning' 
                          : 'Start Learning'
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
                <h3 className="text-lg font-medium mb-1">No concept cards found</h3>
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
            </
