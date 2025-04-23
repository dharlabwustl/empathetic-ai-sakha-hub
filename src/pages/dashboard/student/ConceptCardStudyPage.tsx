
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, Search, BookOpen, Filter, CheckCircle, Tag, Brain, Lock } from 'lucide-react';
import { ConceptCard } from '@/types/user/progress';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

// Extend the concept card interface for the study page
interface ConceptCardWithStudyInfo extends ConceptCard {
  timeToComplete?: number; // minutes
  requiredFor?: string[];
  prerequisiteFor?: string[];
  priority?: 'high' | 'medium' | 'low';
  fromTodaysPlan?: boolean;
  fromWeeklyPlan?: boolean;
}

// Mock data for concept cards
const mockConceptCards: ConceptCardWithStudyInfo[] = [
  {
    id: '1',
    title: 'Newton\'s Laws of Motion',
    description: 'Understanding the fundamental laws that govern classical mechanics',
    subject: 'Physics',
    topic: 'Classical Mechanics',
    difficulty: 'medium',
    completed: false,
    progress: 0,
    content: 'Newton\'s three laws of motion are physical laws that describe the relationship between a body and the forces acting upon it, and its motion in response to those forces.',
    examples: ['An object at rest stays at rest unless acted upon by a force.', 'F = ma'],
    commonMistakes: ['Confusing Newton\'s First and Third Laws', 'Forgetting that mass affects acceleration'],
    examRelevance: 'High - Appears in 85% of physics exams',
    timeToComplete: 30,
    requiredFor: ['Advanced Mechanics', 'Circular Motion'],
    prerequisiteFor: ['Work and Energy', 'Momentum'],
    priority: 'high',
    fromTodaysPlan: true,
    fromWeeklyPlan: true
  },
  {
    id: '2',
    title: 'Thermodynamics',
    description: 'The branch of physics that deals with heat, work, and temperature',
    subject: 'Physics',
    topic: 'Thermal Physics',
    difficulty: 'hard',
    completed: false,
    progress: 0,
    content: 'Thermodynamics is the study of heat, temperature, and energy, and the conversion of energy from one form to another.',
    examples: ['The First Law of Thermodynamics: Energy cannot be created or destroyed', 'Heat flows from hot to cold'],
    commonMistakes: ['Confusing heat and temperature', 'Ignoring system boundaries'],
    examRelevance: 'High - Key concept in both physics and chemistry sections',
    timeToComplete: 45,
    requiredFor: ['Statistical Mechanics', 'Engineering Thermodynamics'],
    priority: 'medium',
    fromTodaysPlan: true,
    fromWeeklyPlan: false
  },
  {
    id: '3',
    title: 'Periodic Table',
    description: 'Understanding the arrangement of chemical elements',
    subject: 'Chemistry',
    topic: 'Inorganic Chemistry',
    difficulty: 'medium',
    completed: false,
    progress: 0,
    content: 'The periodic table is a tabular arrangement of chemical elements, organized by their atomic number, electron configuration, and recurring chemical properties.',
    examples: ['Elements in the same group have similar properties', 'The noble gases are unreactive'],
    commonMistakes: ['Confusing groups and periods', 'Forgetting the transition metals'],
    examRelevance: 'Very high - Fundamental to all chemistry questions',
    timeToComplete: 35,
    requiredFor: ['Chemical Bonding', 'Periodic Trends'],
    priority: 'high',
    fromTodaysPlan: true,
    fromWeeklyPlan: true
  },
  {
    id: '4',
    title: 'Calculus: Differentiation',
    description: 'Finding the rate of change of a function',
    subject: 'Mathematics',
    topic: 'Calculus',
    difficulty: 'hard',
    completed: false,
    progress: 0,
    content: 'Differentiation is a process of finding the derivative of a function, which measures the sensitivity to change of the function value with respect to a change in its argument.',
    examples: ['d/dx(x²) = 2x', 'The derivative of sin(x) is cos(x)'],
    commonMistakes: ['Forgetting the chain rule', 'Incorrect application of the product rule'],
    examRelevance: 'Critical - Appears in most calculus problems',
    timeToComplete: 50,
    requiredFor: ['Integration', 'Differential Equations'],
    priority: 'medium',
    fromTodaysPlan: false,
    fromWeeklyPlan: true
  },
  {
    id: '5',
    title: 'Organic Chemistry: Alcohols',
    description: 'Properties and reactions of alcohols',
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    difficulty: 'medium',
    completed: false,
    progress: 0,
    content: 'Alcohols are organic compounds that contain a hydroxyl functional group. They undergo various reactions including oxidation, dehydration, and esterification.',
    examples: ['Ethanol is the alcohol in alcoholic beverages', 'Alcohols can be oxidized to aldehydes or ketones'],
    commonMistakes: ['Confusing primary, secondary, and tertiary alcohols', 'Forgetting reaction mechanisms'],
    examRelevance: 'High - A major topic in organic chemistry',
    timeToComplete: 40,
    requiredFor: ['Carbonyl Compounds', 'Reaction Mechanisms'],
    priority: 'medium',
    fromTodaysPlan: false,
    fromWeeklyPlan: true
  }
];

const ConceptCardStudyPage = () => {
  const { subject, topic } = useParams();
  const [cards, setCards] = useState<ConceptCardWithStudyInfo[]>([]);
  const [filteredCards, setFilteredCards] = useState<ConceptCardWithStudyInfo[]>([]);
  const [selectedCard, setSelectedCard] = useState<ConceptCardWithStudyInfo | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<'all' | 'today' | 'week'>('all');
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setCards(mockConceptCards);
      setFilteredCards(mockConceptCards);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = [...cards];
    
    // Filter by subject if provided
    if (subject) {
      filtered = filtered.filter(card => card.subject.toLowerCase() === subject.toLowerCase());
    }
    
    // Filter by topic if provided
    if (topic) {
      filtered = filtered.filter(card => card.topic.toLowerCase() === topic.toLowerCase());
    }
    
    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter(card => 
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        card.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply difficulty filter
    if (difficulty !== 'all') {
      filtered = filtered.filter(card => card.difficulty === difficulty);
    }
    
    // Apply plan filter
    if (planFilter === 'today') {
      filtered = filtered.filter(card => card.fromTodaysPlan);
    } else if (planFilter === 'week') {
      filtered = filtered.filter(card => card.fromWeeklyPlan);
    }
    
    setFilteredCards(filtered);
  }, [cards, subject, topic, searchQuery, difficulty, planFilter]);

  const handleCardClick = (card: ConceptCardWithStudyInfo) => {
    setSelectedCard(card);
  };

  const handleCompleteCard = (cardId: string) => {
    // Update completion status for the card
    const updatedCards = cards.map(card => 
      card.id === cardId ? { ...card, completed: true, progress: 100 } : card
    );
    setCards(updatedCards);
    setSelectedCard(null);
    
    toast({
      title: "Concept marked as completed",
      description: "Your progress has been updated",
    });
  };

  const handleBackToList = () => {
    setSelectedCard(null);
  };
  
  // Get difficulty color and label
  const getDifficultyInfo = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', label: 'Easy' };
      case 'medium':
        return { color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300', label: 'Medium' };
      case 'hard':
        return { color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', label: 'Hard' };
      default:
        return { color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300', label: 'Unknown' };
    }
  };
  
  // Get subject color
  const getSubjectColor = (subject: string) => {
    const colors: Record<string, string> = {
      'Physics': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      'Chemistry': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
      'Mathematics': 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300',
      'Biology': 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
      'English': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
      'History': 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
      'Geography': 'bg-lime-100 text-lime-800 dark:bg-lime-900/30 dark:text-lime-300'
    };
    
    return colors[subject] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  };
  
  // Get priority badge
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return { color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300', label: 'High Priority' };
      case 'medium':
        return { color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300', label: 'Medium Priority' };
      case 'low':
        return { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', label: 'Low Priority' };
      default:
        return { color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300', label: 'Normal Priority' };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Link to="/dashboard/student">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">
            Concept Cards
            {subject && ` - ${subject}`}
            {topic && ` > ${topic}`}
          </h1>
        </div>
        
        <p className="text-muted-foreground mb-6">
          Master key concepts through detailed explanations and examples. Progress at your own pace through your study plan.
        </p>
      </div>

      {selectedCard ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">{selectedCard.title}</CardTitle>
                <Button variant="outline" onClick={handleBackToList}>
                  Back to List
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className={getSubjectColor(selectedCard.subject)}>
                  {selectedCard.subject}
                </Badge>
                <Badge variant="outline" className={getDifficultyInfo(selectedCard.difficulty).color}>
                  <Tag className="h-3 w-3 mr-1" />
                  {getDifficultyInfo(selectedCard.difficulty).label}
                </Badge>
                {selectedCard.fromTodaysPlan && (
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                    Today's Plan
                  </Badge>
                )}
                {selectedCard.priority && (
                  <Badge variant="outline" className={getPriorityBadge(selectedCard.priority).color}>
                    {getPriorityBadge(selectedCard.priority).label}
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p>{selectedCard.description}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Content</h3>
                <p>{selectedCard.content}</p>
              </div>
              
              {selectedCard.examples && selectedCard.examples.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Examples</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedCard.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedCard.commonMistakes && selectedCard.commonMistakes.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Common Mistakes</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedCard.commonMistakes.map((mistake, index) => (
                      <li key={index}>{mistake}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {selectedCard.examRelevance && (
                <div>
                  <h3 className="font-semibold mb-2">Exam Relevance</h3>
                  <p>{selectedCard.examRelevance}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedCard.requiredFor && selectedCard.requiredFor.length > 0 && (
                  <div className="border rounded-md p-3">
                    <h3 className="font-semibold mb-2 text-sm">Required For</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {selectedCard.requiredFor.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {selectedCard.prerequisiteFor && selectedCard.prerequisiteFor.length > 0 && (
                  <div className="border rounded-md p-3">
                    <h3 className="font-semibold mb-2 text-sm">Prerequisite For</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {selectedCard.prerequisiteFor.map((topic, index) => (
                        <li key={index}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {selectedCard.timeToComplete && (
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Estimated time to complete: {selectedCard.timeToComplete} minutes</span>
                </div>
              )}
            </CardContent>
            
            <CardFooter className="flex justify-end">
              <Button onClick={() => handleCompleteCard(selectedCard.id)}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Completed
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      ) : (
        <>
          {/* Filters and search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search concept cards..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <Tabs defaultValue="all" value={difficulty} onValueChange={setDifficulty}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="easy">Easy</TabsTrigger>
                  <TabsTrigger value="medium">Medium</TabsTrigger>
                  <TabsTrigger value="hard">Hard</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Tabs defaultValue="all" value={planFilter} onValueChange={(v) => setPlanFilter(v as 'all' | 'today' | 'week')}>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="today">Today's Plan</TabsTrigger>
                  <TabsTrigger value="week">Weekly Plan</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Card grid */}
          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCards.map(card => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Card 
                    className={`cursor-pointer hover:shadow-md transition-shadow ${
                      card.completed ? 'border-l-4 border-green-500' : ''
                    } ${card.fromTodaysPlan ? 'border-t-4 border-t-blue-500' : ''}`}
                    onClick={() => handleCardClick(card)}
                  >
                    {card.completed && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <Badge className="bg-green-500 rounded-full w-6 h-6 flex items-center justify-center p-0">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-1 flex-wrap">
                          <Badge variant="outline" className={getSubjectColor(card.subject)}>
                            {card.subject}
                          </Badge>
                          <Badge variant="outline" className={getDifficultyInfo(card.difficulty).color}>
                            {getDifficultyInfo(card.difficulty).label}
                          </Badge>
                        </div>
                        
                        {card.timeToComplete && (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                            {card.timeToComplete}m
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg mt-2">{card.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {card.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mt-3">
                        {card.fromTodaysPlan && (
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs">
                            Today's Plan
                          </Badge>
                        )}
                        {card.fromWeeklyPlan && (
                          <Badge variant="outline" className="bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 text-xs">
                            Weekly Plan
                          </Badge>
                        )}
                        {card.priority && (
                          <Badge variant="outline" className={getPriorityBadge(card.priority).color + " text-xs"}>
                            {getPriorityBadge(card.priority).label}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-1 flex-col space-y-2">
                      <div className="w-full flex items-center justify-between">
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Brain className="h-3.5 w-3.5 mr-1" />
                          <div className="flex items-center">
                            Progress: 
                            <span className="font-medium ml-1">{card.progress}%</span>
                          </div>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs group"
                        >
                          <BookOpen className="h-3.5 w-3.5 mr-1 group-hover:text-primary" />
                          View
                        </Button>
                      </div>
                      
                      <div className="w-full">
                        <Progress value={card.progress} className="h-1" />
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No concept cards found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ConceptCardStudyPage;
