
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Plus, Clock, BookCheck, ArrowRight, Tag, Star, Bookmark, Filter, ChevronDown } from 'lucide-react';

interface ConceptCard {
  id: string;
  title: string;
  subject: string;
  chapter: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  completed: boolean;
  lastReviewed?: string;
  timeToComplete: number;
  masteringProgress: number;
  tags: string[];
  isPro?: boolean;
}

// Mock data for concept cards
const mockConceptCards: ConceptCard[] = [
  {
    id: '1',
    title: 'Newton\'s Laws of Motion',
    subject: 'Physics',
    chapter: 'Mechanics',
    difficulty: 'Medium',
    completed: true,
    lastReviewed: '2023-11-15',
    timeToComplete: 15,
    masteringProgress: 85,
    tags: ['mechanics', 'forces', 'core-concept']
  },
  {
    id: '2',
    title: 'Organic Chemistry Reactions',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry',
    difficulty: 'Hard',
    completed: false,
    timeToComplete: 25,
    masteringProgress: 45,
    tags: ['organic', 'reactions', 'substitution']
  },
  {
    id: '3',
    title: 'Integration Techniques',
    subject: 'Mathematics',
    chapter: 'Calculus',
    difficulty: 'Hard',
    completed: false,
    timeToComplete: 30,
    masteringProgress: 30,
    tags: ['calculus', 'integration', 'advanced']
  },
  {
    id: '4',
    title: 'Cell Structure and Function',
    subject: 'Biology',
    chapter: 'Cell Biology',
    difficulty: 'Easy',
    completed: true,
    lastReviewed: '2023-11-10',
    timeToComplete: 20,
    masteringProgress: 90,
    tags: ['cells', 'organelles', 'basic']
  },
  {
    id: '5',
    title: 'Advanced Quantum Mechanics',
    subject: 'Physics',
    chapter: 'Quantum Physics',
    difficulty: 'Expert',
    completed: false,
    timeToComplete: 45,
    masteringProgress: 15,
    tags: ['quantum', 'advanced', 'theoretical'],
    isPro: true
  }
];

export default function ConceptCardsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showCreateCard, setShowCreateCard] = useState(false);
  
  // Filter cards based on search, tab, subject, and difficulty
  const filteredCards = mockConceptCards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         card.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.chapter.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         card.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
                         
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'completed' && card.completed) || 
                      (activeTab === 'incomplete' && !card.completed);
                      
    const matchesSubject = selectedSubject === 'all' || card.subject === selectedSubject;
    
    const matchesDifficulty = selectedDifficulty === 'all' || card.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesTab && matchesSubject && matchesDifficulty;
  });
  
  // Get unique subjects
  const subjects = Array.from(new Set(mockConceptCards.map(card => card.subject)));
  
  // Get difficulty levels
  const difficultyLevels = ['Easy', 'Medium', 'Hard', 'Expert'];

  return (
    <SharedPageLayout 
      title="Concept Cards" 
      subtitle="Master key concepts through interactive learning cards"
    >
      <div className="space-y-6">
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search concepts, subjects, or tags..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 flex-wrap sm:flex-nowrap">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {difficultyLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              More Filters
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-3">
            <TabsTrigger value="all">All Cards</TabsTrigger>
            <TabsTrigger value="completed">Mastered</TabsTrigger>
            <TabsTrigger value="incomplete">To Learn</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            {filteredCards.length === 0 ? (
              <div className="text-center py-10">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-20" />
                <h3 className="text-lg font-medium">No concept cards found</h3>
                <p className="text-muted-foreground mt-1 mb-4">Try adjusting your filters or search query</p>
                <Button onClick={() => setShowCreateCard(true)}>Create New Card</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {/* Create New Card (Pro Feature) */}
                <Card className="border-2 border-dashed border-muted hover:border-primary/50 transition-colors flex flex-col justify-center items-center h-[300px]">
                  <CardContent className="flex flex-col items-center justify-center text-center space-y-4 pt-6">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Plus className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Create New Concept Card</h3>
                      <p className="text-sm text-muted-foreground">
                        Add your own custom concept cards
                      </p>
                    </div>
                    <Badge variant="secondary">PRO Feature</Badge>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => setShowCreateCard(true)}>
                      Create Card
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Concept Cards */}
                {filteredCards.map(card => (
                  <Card 
                    key={card.id} 
                    className={`overflow-hidden transition-all hover:shadow-md group h-[300px] flex flex-col ${card.isPro ? 'border-violet-200 dark:border-violet-800' : 'border'}`}
                  >
                    <CardHeader className={`pb-2 border-b ${
                        card.difficulty === 'Easy' ? 'bg-green-50/50 dark:bg-green-950/10 border-green-200' :
                        card.difficulty === 'Medium' ? 'bg-blue-50/50 dark:bg-blue-950/10 border-blue-200' :
                        card.difficulty === 'Hard' ? 'bg-orange-50/50 dark:bg-orange-950/10 border-orange-200' :
                        'bg-purple-50/50 dark:bg-purple-950/10 border-purple-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge 
                            variant="secondary" 
                            className={`mb-2 ${
                              card.difficulty === 'Easy' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                              card.difficulty === 'Medium' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                              card.difficulty === 'Hard' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' :
                              'bg-purple-100 text-purple-700 hover:bg-purple-200'
                            }`}
                          >
                            {card.difficulty}
                          </Badge>
                          
                          {card.isPro && (
                            <Badge variant="outline" className="ml-2 bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-200">
                              PRO
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-7 w-7" title="Bookmark">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-amber-500" title="Mark as favorite">
                            <Star className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="py-4 flex-grow">
                      <div className="mb-3">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{card.title}</h3>
                        <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                          <span className="font-medium">{card.subject}</span>
                          <span>•</span>
                          <span>{card.chapter}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-muted-foreground">{card.timeToComplete} min</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <BookCheck className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className={`${card.completed ? 'text-green-600' : 'text-muted-foreground'}`}>
                              {card.masteringProgress}% mastered
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex gap-1 flex-wrap">
                          {card.tags.map((tag, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-muted">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0 pb-4">
                      <Button 
                        onClick={() => navigate(`/dashboard/student/concepts/card/${card.id}`)} 
                        className="w-full"
                      >
                        {card.completed ? 'Review Concept' : 'Learn Concept'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
}
