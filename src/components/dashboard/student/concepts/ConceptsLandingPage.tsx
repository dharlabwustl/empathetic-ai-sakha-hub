
import React, { useState } from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Bookmark, ChevronRight, Clock, Book, Search, 
  BookOpen, Star, BarChart2, Brain, GraduationCap 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

// Mock data for concept cards
const mockConceptCards = [
  {
    id: '1',
    title: "Newton's First Law",
    subject: "Physics",
    chapter: "Laws of Motion",
    difficulty: "Medium",
    completed: true,
    description: "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external force.",
    mastery: 85,
    lastStudied: '2 days ago',
    tags: ['mechanics', 'force', 'motion'],
    nextReviewDate: '4 days',
    reviewPriority: 'low',
    recommendedForYou: true
  },
  {
    id: '2',
    title: "Newton's Second Law",
    subject: "Physics",
    chapter: "Laws of Motion",
    difficulty: "Hard",
    completed: false,
    description: "The rate of change of momentum of a body is directly proportional to the force applied, and occurs in the direction of the applied force.",
    mastery: 42,
    lastStudied: '5 days ago',
    tags: ['mechanics', 'force', 'motion', 'acceleration'],
    nextReviewDate: 'Today',
    reviewPriority: 'high',
    recommendedForYou: true
  },
  {
    id: '3',
    title: "Newton's Third Law",
    subject: "Physics",
    chapter: "Laws of Motion",
    difficulty: "Easy",
    completed: false,
    description: "For every action, there is an equal and opposite reaction.",
    mastery: 65,
    lastStudied: '1 week ago',
    tags: ['mechanics', 'force', 'motion', 'reaction'],
    nextReviewDate: '2 days',
    reviewPriority: 'medium',
    recommendedForYou: false
  },
  {
    id: '4',
    title: "Kepler's Laws",
    subject: "Physics",
    chapter: "Gravitation",
    difficulty: "Hard",
    completed: false,
    description: "Three laws describing the motion of planets around the sun.",
    mastery: 25,
    lastStudied: '2 weeks ago',
    tags: ['planets', 'orbits', 'astronomy'],
    nextReviewDate: 'Tomorrow',
    reviewPriority: 'high',
    recommendedForYou: true
  },
  {
    id: '5',
    title: "Ohm's Law",
    subject: "Physics",
    chapter: "Electricity",
    difficulty: "Medium",
    completed: true,
    description: "The current through a conductor between two points is directly proportional to the voltage across the two points.",
    mastery: 95,
    lastStudied: '3 days ago',
    tags: ['electricity', 'current', 'voltage', 'resistance'],
    nextReviewDate: '1 week',
    reviewPriority: 'low',
    recommendedForYou: false
  },
  {
    id: '6',
    title: "Acid-Base Reactions",
    subject: "Chemistry",
    chapter: "Chemical Reactions",
    difficulty: "Medium",
    completed: false,
    description: "Reactions between acids and bases to form salt and water.",
    mastery: 68,
    lastStudied: '4 days ago',
    tags: ['acid', 'base', 'neutralization', 'salt'],
    nextReviewDate: '3 days',
    reviewPriority: 'medium',
    recommendedForYou: true
  }
];

// Mock subjects
const subjects = [
  "All Subjects",
  "Physics",
  "Chemistry",
  "Biology",
  "Mathematics"
];

// Mock difficulty levels
const difficultyLevels = [
  "All Difficulties",
  "Easy",
  "Medium",
  "Hard"
];

// Function to render the status badge for concept cards
const ConceptStatusBadge = ({ completed, mastery }: { completed: boolean; mastery: number }) => {
  if (completed) {
    return (
      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        Completed
      </Badge>
    );
  }
  
  if (mastery > 70) {
    return (
      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        In Progress (Good)
      </Badge>
    );
  } else if (mastery > 30) {
    return (
      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
        In Progress (Moderate)
      </Badge>
    );
  } else {
    return (
      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
        Needs Attention
      </Badge>
    );
  }
};

// Function to render difficulty badge
const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  let badgeClass = '';
  switch (difficulty.toLowerCase()) {
    case 'easy':
      badgeClass = 'bg-green-50 text-green-700 border-green-200';
      break;
    case 'medium':
      badgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
      break;
    case 'hard':
      badgeClass = 'bg-red-50 text-red-700 border-red-200';
      break;
  }
  
  return (
    <Badge variant="outline" className={badgeClass}>
      {difficulty}
    </Badge>
  );
};

// Function to render recommended badge
const RecommendedBadge = ({ recommended }: { recommended: boolean }) => {
  if (!recommended) return null;
  
  return (
    <Badge className="bg-purple-100 text-purple-700 border-purple-200 flex items-center gap-1">
      <Star className="h-3 w-3 fill-purple-500" />
      Recommended
    </Badge>
  );
};

// Concept card component
const ConceptCard = ({ 
  concept, 
  onCardClick 
}: { 
  concept: typeof mockConceptCards[0];
  onCardClick: (id: string) => void;
}) => {
  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onCardClick(concept.id)}
    >
      <CardHeader className="pb-2 flex flex-row items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Book className="h-4 w-4 text-blue-600" />
            <CardTitle className="text-lg">{concept.title}</CardTitle>
          </div>
          <CardDescription>{concept.subject} - {concept.chapter}</CardDescription>
        </div>
        <DifficultyBadge difficulty={concept.difficulty} />
      </CardHeader>
      <CardContent className="pb-3">
        <p className="text-sm text-gray-700 line-clamp-2 mb-3">{concept.description}</p>
        
        <div className="flex items-center justify-between mb-1 mt-4">
          <span className="text-xs text-gray-500">Mastery</span>
          <span className="text-xs font-medium">{concept.mastery}%</span>
        </div>
        <Progress value={concept.mastery} className="h-1.5" />
        
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {concept.lastStudied}
          </div>
          <ConceptStatusBadge completed={concept.completed} mastery={concept.mastery} />
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex items-center justify-between">
        <div className="flex gap-1 flex-wrap">
          {concept.reviewPriority === 'high' ? (
            <Badge variant="destructive" className="text-xs">Review Soon</Badge>
          ) : null}
          <RecommendedBadge recommended={concept.recommendedForYou} />
        </div>
      </CardFooter>
    </Card>
  );
};

// Enhanced Concept Card with more features
const EnhancedConceptCard = ({ 
  concept, 
  onCardClick 
}: { 
  concept: typeof mockConceptCards[0];
  onCardClick: (id: string) => void;
}) => {
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    
    toast({
      title: isBookmarked ? "Removed from bookmarks" : "Added to bookmarks",
      description: isBookmarked 
        ? `${concept.title} has been removed from your bookmarks` 
        : `${concept.title} has been added to your bookmarks`,
    });
  };
  
  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer border-l-4"
      style={{ borderLeftColor: concept.reviewPriority === 'high' ? '#ef4444' : concept.reviewPriority === 'medium' ? '#f59e0b' : '#3b82f6' }}
      onClick={() => onCardClick(concept.id)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2 mb-1">
            <Book className="h-4 w-4 text-blue-600" />
            <CardTitle className="text-lg">{concept.title}</CardTitle>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={handleBookmarkClick}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-yellow-400 text-yellow-400' : ''}`} />
          </Button>
        </div>
        <CardDescription>{concept.subject} - {concept.chapter}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3 space-y-4">
        <p className="text-sm text-gray-700 line-clamp-2">{concept.description}</p>
        
        <div className="flex flex-wrap gap-1">
          <DifficultyBadge difficulty={concept.difficulty} />
          <RecommendedBadge recommended={concept.recommendedForYou} />
          {concept.reviewPriority === 'high' ? (
            <Badge variant="destructive" className="text-xs">Review Soon</Badge>
          ) : null}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500 flex items-center gap-1">
              <Brain className="h-3 w-3" /> Concept Mastery
            </span>
            <span className="text-xs font-medium">{concept.mastery}%</span>
          </div>
          <Progress value={concept.mastery} className="h-1.5" />
        </div>
        
        <div className="flex justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Last studied {concept.lastStudied}
          </div>
          <div>
            Next review: {concept.nextReviewDate}
          </div>
        </div>
        
        <div className="pt-2 flex justify-between items-center">
          <ConceptStatusBadge completed={concept.completed} mastery={concept.mastery} />
          <Button variant="ghost" size="sm" className="gap-1 h-7 text-xs">
            Learn More <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
        
        {/* New: Real-world Integration */}
        <div className="border-t pt-3 mt-2">
          <div className="text-xs text-blue-600 font-medium flex items-center gap-1 mb-1">
            <GraduationCap className="h-3 w-3" /> Real-world Application
          </div>
          <p className="text-xs text-gray-600">
            Used in modern applications like {concept.subject === 'Physics' ? 'smartphone accelerometers, vehicle safety systems, and space exploration' : 'pharmaceuticals, materials science, and environmental monitoring'}.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export const ConceptsLandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All Difficulties");
  const [cardView, setCardView] = useState<"simple" | "enhanced">("enhanced");
  
  const handleConceptCardClick = (id: string) => {
    navigate(`/dashboard/student/concepts/card/${id}`);
  };
  
  // Filter concepts based on search, subject and difficulty
  const filteredConcepts = mockConceptCards.filter(concept => {
    // Search filter
    const matchesSearch = searchQuery === "" || 
      concept.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      concept.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Subject filter
    const matchesSubject = selectedSubject === "All Subjects" || 
      concept.subject === selectedSubject;
    
    // Difficulty filter
    const matchesDifficulty = selectedDifficulty === "All Difficulties" || 
      concept.difficulty === selectedDifficulty;
    
    // Tab filter
    let matchesTab = true;
    switch (activeTab) {
      case "bookmarked":
        // For demo, just show some random ones
        matchesTab = concept.id === '1' || concept.id === '3';
        break;
      case "incomplete":
        matchesTab = !concept.completed;
        break;
      case "completed":
        matchesTab = concept.completed;
        break;
      case "recommended":
        matchesTab = concept.recommendedForYou;
        break;
      case "all":
      default:
        matchesTab = true;
        break;
    }
    
    return matchesSearch && matchesSubject && matchesDifficulty && matchesTab;
  });
  
  return (
    <SharedPageLayout
      title="Concept Cards"
      subtitle="Master key concepts through comprehensive study cards"
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search concepts..."
              className="pl-9 md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <div className="flex">
              <Button
                variant={cardView === "simple" ? "default" : "outline"}
                size="sm"
                onClick={() => setCardView("simple")}
                className="rounded-r-none"
              >
                Simple View
              </Button>
              <Button
                variant={cardView === "enhanced" ? "default" : "outline"}
                size="sm"
                onClick={() => setCardView("enhanced")}
                className="rounded-l-none"
              >
                Enhanced View
              </Button>
            </div>
            
            <select
              className="px-3 py-1 rounded-md text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
            
            <select
              className="px-3 py-1 rounded-md text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              {difficultyLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="all">All Concepts</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="incomplete">Need Review</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="all" className="space-y-6 m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConcepts.length > 0 ? (
                  filteredConcepts.map(concept => (
                    cardView === "simple" ? (
                      <ConceptCard
                        key={concept.id}
                        concept={concept}
                        onCardClick={handleConceptCardClick}
                      />
                    ) : (
                      <EnhancedConceptCard
                        key={concept.id}
                        concept={concept}
                        onCardClick={handleConceptCardClick}
                      />
                    )
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <BookOpen className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No concepts found</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                  </div>
                )}
              </div>
              
              {/* Learning Stats Section */}
              <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-blue-600" />
                    Your Learning Progress
                  </CardTitle>
                  <CardDescription>
                    Track your concept mastery and study patterns
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-700">Concepts Mastered</h4>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">73%</Badge>
                      </div>
                      <Progress value={73} className="h-2" />
                      <p className="mt-2 text-xs text-gray-500">2 new concepts mastered this week</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-700">Study Streak</h4>
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">14 days</Badge>
                      </div>
                      <div className="flex gap-1 mt-2">
                        {Array.from({ length: 7 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-6 w-6 rounded-sm ${i < 5 ? 'bg-green-500' : 'bg-gray-200'}`}
                          />
                        ))}
                      </div>
                      <p className="mt-2 text-xs text-gray-500">Keep going! You're on a roll!</p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">Top Subjects</h4>
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Physics</span>
                            <span>89%</span>
                          </div>
                          <Progress value={89} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Chemistry</span>
                            <span>67%</span>
                          </div>
                          <Progress value={67} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Biology</span>
                            <span>45%</span>
                          </div>
                          <Progress value={45} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Study Plan Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-purple-600" />
                    Recommended Study Plan
                  </CardTitle>
                  <CardDescription>
                    Personalized learning path based on your progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-purple-200">
                        <AvatarImage src="/lovable-uploads/2782b977-ddc8-4b86-bf7a-0426dd6792a0.png" />
                        <AvatarFallback>AS</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">Your AI Study Coach</h4>
                        <p className="text-sm text-muted-foreground">
                          Here's your personalized study plan for today
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {filteredConcepts.slice(0, 3).map((concept, index) => (
                        <Button 
                          key={concept.id}
                          variant={index === 0 ? "default" : "outline"}
                          className="justify-start h-auto py-3 px-4"
                          onClick={() => handleConceptCardClick(concept.id)}
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <div className="bg-blue-100 text-blue-800 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium">
                                {index + 1}
                              </div>
                              <span className="font-medium">{concept.title}</span>
                            </div>
                            <p className="text-xs text-left mt-1 text-muted-foreground">
                              {concept.subject} • {concept.mastery}% mastered
                            </p>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recommended" className="space-y-4 m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConcepts.length > 0 ? (
                  filteredConcepts.map(concept => (
                    cardView === "simple" ? (
                      <ConceptCard
                        key={concept.id}
                        concept={concept}
                        onCardClick={handleConceptCardClick}
                      />
                    ) : (
                      <EnhancedConceptCard
                        key={concept.id}
                        concept={concept}
                        onCardClick={handleConceptCardClick}
                      />
                    )
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <Star className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No recommended concepts</h3>
                    <p className="text-gray-500">
                      We'll recommend concepts as you continue your learning journey.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="incomplete" className="space-y-4 m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConcepts.length > 0 ? (
                  filteredConcepts.map(concept => (
                    cardView === "simple" ? (
                      <ConceptCard
                        key={concept.id}
                        concept={concept}
                        onCardClick={handleConceptCardClick}
                      />
                    ) : (
                      <EnhancedConceptCard
                        key={concept.id}
                        concept={concept}
                        onCardClick={handleConceptCardClick}
                      />
                    )
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <BookOpen className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">All concepts completed!</h3>
                    <p className="text-gray-500">
                      Great job! You've completed all your concept cards.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4 m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConcepts.length > 0 ? (
                  filteredConcepts.map(concept => (
                    cardView === "simple" ? (
                      <ConceptCard
                        key={concept.id}
                        concept={concept}
                        onCardClick={handleConceptCardClick}
                      />
                    ) : (
                      <EnhancedConceptCard
                        key={concept.id}
                        concept={concept}
                        onCardClick={handleConceptCardClick}
                      />
                    )
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <BookOpen className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No completed concepts yet</h3>
                    <p className="text-gray-500">
                      Start learning and complete concepts to see them here.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="bookmarked" className="space-y-4 m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredConcepts.length > 0 ? (
                  filteredConcepts.map(concept => (
                    cardView === "simple" ? (
                      <ConceptCard
                        key={concept.id}
                        concept={concept}
                        onCardClick={handleConceptCardClick}
                      />
                    ) : (
                      <EnhancedConceptCard
                        key={concept.id}
                        concept={concept}
                        onCardClick={handleConceptCardClick}
                      />
                    )
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <Bookmark className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No bookmarked concepts</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Bookmark important concepts for quick access.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};
