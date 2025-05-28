import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, ArrowRight, Book, Clock, ChevronDown, ChevronRight, Target, Brain, Star, TrendingUp } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Link } from 'react-router-dom';
import { SharedPageLayout } from '../SharedPageLayout';

// Enhanced flashcard data structure matching study plan design
const flashcardSubjects = [
  {
    id: '1',
    name: 'Physics',
    color: '#3B82F6',
    totalCards: 45,
    completedCards: 32,
    totalWeightage: 35,
    completedWeightage: 28,
    priority: 'high',
    topics: [
      {
        id: 'p1',
        name: 'Mechanics',
        cards: 15,
        completed: 12,
        weightage: 12,
        priority: 'high',
        difficulty: 'medium',
        subtopics: [
          { id: 'p1s1', name: 'Newton\'s Laws', cards: 5, completed: 5, weightage: 4 },
          { id: 'p1s2', name: 'Kinematics', cards: 6, completed: 4, weightage: 4 },
          { id: 'p1s3', name: 'Work & Energy', cards: 4, completed: 3, weightage: 4 }
        ]
      },
      {
        id: 'p2',
        name: 'Thermodynamics',
        cards: 18,
        completed: 10,
        weightage: 15,
        priority: 'medium',
        difficulty: 'hard',
        subtopics: [
          { id: 'p2s1', name: 'Laws of Thermodynamics', cards: 8, completed: 5, weightage: 7 },
          { id: 'p2s2', name: 'Heat Engines', cards: 6, completed: 3, weightage: 5 },
          { id: 'p2s3', name: 'Entropy', cards: 4, completed: 2, weightage: 3 }
        ]
      },
      {
        id: 'p3',
        name: 'Optics',
        cards: 12,
        completed: 10,
        weightage: 8,
        priority: 'low',
        difficulty: 'easy',
        subtopics: [
          { id: 'p3s1', name: 'Reflection', cards: 4, completed: 4, weightage: 3 },
          { id: 'p3s2', name: 'Refraction', cards: 5, completed: 4, weightage: 3 },
          { id: 'p3s3', name: 'Wave Optics', cards: 3, completed: 2, weightage: 2 }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Chemistry',
    color: '#10B981',
    totalCards: 38,
    completedCards: 25,
    totalWeightage: 30,
    completedWeightage: 20,
    priority: 'medium',
    topics: [
      {
        id: 'c1',
        name: 'Organic Chemistry',
        cards: 20,
        completed: 12,
        weightage: 18,
        priority: 'high',
        difficulty: 'hard',
        subtopics: [
          { id: 'c1s1', name: 'Hydrocarbons', cards: 8, completed: 5, weightage: 6 },
          { id: 'c1s2', name: 'Functional Groups', cards: 7, completed: 4, weightage: 7 },
          { id: 'c1s3', name: 'Reactions', cards: 5, completed: 3, weightage: 5 }
        ]
      },
      {
        id: 'c2',
        name: 'Inorganic Chemistry',
        cards: 18,
        completed: 13,
        weightage: 12,
        priority: 'medium',
        difficulty: 'medium',
        subtopics: [
          { id: 'c2s1', name: 'Periodic Table', cards: 6, completed: 5, weightage: 4 },
          { id: 'c2s2', name: 'Chemical Bonding', cards: 8, completed: 6, weightage: 5 },
          { id: 'c2s3', name: 'Coordination Compounds', cards: 4, completed: 2, weightage: 3 }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Mathematics',
    color: '#8B5CF6',
    totalCards: 42,
    completedCards: 30,
    totalWeightage: 35,
    completedWeightage: 25,
    priority: 'high',
    topics: [
      {
        id: 'm1',
        name: 'Calculus',
        cards: 22,
        completed: 18,
        weightage: 20,
        priority: 'high',
        difficulty: 'hard',
        subtopics: [
          { id: 'm1s1', name: 'Differentiation', cards: 8, completed: 7, weightage: 7 },
          { id: 'm1s2', name: 'Integration', cards: 10, completed: 8, weightage: 9 },
          { id: 'm1s3', name: 'Applications', cards: 4, completed: 3, weightage: 4 }
        ]
      },
      {
        id: 'm2',
        name: 'Algebra',
        cards: 20,
        completed: 12,
        weightage: 15,
        priority: 'medium',
        difficulty: 'medium',
        subtopics: [
          { id: 'm2s1', name: 'Quadratic Equations', cards: 7, completed: 5, weightage: 5 },
          { id: 'm2s2', name: 'Complex Numbers', cards: 8, completed: 4, weightage: 6 },
          { id: 'm2s3', name: 'Sequences & Series', cards: 5, completed: 3, weightage: 4 }
        ]
      }
    ]
  }
];

const FlashcardTopicCard = ({ subject, topic, onTopicClick }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const completionPercentage = topic.cards > 0 ? (topic.completed / topic.cards) * 100 : 0;
  const weightagePercentage = topic.weightage > 0 ? (topic.completed / topic.cards) * (topic.weightage / topic.cards) * 100 : 0;
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'hard': return 'bg-red-500';
      case 'medium': return 'bg-amber-500';
      case 'easy': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="h-full border-l-4" style={{ borderLeftColor: subject.color }}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }}></div>
            {topic.name}
          </CardTitle>
          <Badge variant="outline" className={getPriorityColor(topic.priority)}>
            {topic.priority} priority
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Cards Progress</span>
              <span className="font-medium">{topic.completed}/{topic.cards}</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Weightage</span>
              <span className="font-medium">{topic.weightage}%</span>
            </div>
            <Progress value={weightagePercentage} className="h-2" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="text-sm font-medium">
                {topic.cards} cards • {topic.weightage}% weightage
              </span>
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-3 mt-4">
            {topic.subtopics?.map((subtopic) => (
              <div key={subtopic.id} className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{subtopic.name}</span>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">
                      {subtopic.completed}/{subtopic.cards} cards
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {subtopic.weightage}% weightage
                    </div>
                  </div>
                </div>
                <Progress 
                  value={subtopic.cards > 0 ? (subtopic.completed / subtopic.cards) * 100 : 0} 
                  className="h-1 mt-2" 
                />
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/dashboard/student/flashcards/1/interactive`}>
            Practice Cards
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const FlashcardWeightageAnalysis = () => {
  const totalCards = flashcardSubjects.reduce((sum, subject) => sum + subject.totalCards, 0);
  const completedCards = flashcardSubjects.reduce((sum, subject) => sum + subject.completedCards, 0);
  const overallProgress = totalCards > 0 ? (completedCards / totalCards) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Flashcard Progress Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-lg font-bold">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{completedCards}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-amber-600">{totalCards - completedCards}</div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{flashcardSubjects.length}</div>
              <div className="text-xs text-muted-foreground">Subjects</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FlashcardSmartSuggestions = () => {
  const suggestions = [
    {
      id: '1',
      type: 'priority',
      title: 'Focus on Chemistry Organic Cards',
      description: 'High weightage topic with only 60% completion. Review functional groups today.',
      priority: 'high',
      estimatedTime: 30,
      subject: 'Chemistry'
    },
    {
      id: '2',
      type: 'revision',
      title: 'Quick Physics Review',
      description: 'Mechanics cards completed 2 weeks ago. Time for spaced repetition.',
      priority: 'medium',
      estimatedTime: 15,
      subject: 'Physics'
    },
    {
      id: '3',
      type: 'optimization',
      title: 'Math Integration Practice',
      description: 'High exam weightage area needs more attention before exam.',
      priority: 'high',
      estimatedTime: 25,
      subject: 'Mathematics'
    }
  ];

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'priority': return Target;
      case 'revision': return Clock;
      case 'optimization': return Star;
      default: return Brain;
    }
  };

  const getSuggestionColor = (type) => {
    switch (type) {
      case 'priority': return 'bg-blue-500';
      case 'revision': return 'bg-green-500';
      case 'optimization': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Smart Flashcard Suggestions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion) => {
            const Icon = getSuggestionIcon(suggestion.type);
            const colorClass = getSuggestionColor(suggestion.type);
            
            return (
              <div key={suggestion.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${colorClass}`}>
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{suggestion.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{suggestion.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className={`text-xs ${
                        suggestion.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {suggestion.priority}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {suggestion.estimatedTime}m
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

const FlashcardsView = () => {
  const [timeFilter, setTimeFilter] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newFlashcard, setNewFlashcard] = useState({
    subject: '',
    topic: '',
    concept: '',
    difficulty: 'Medium',
    question: '',
    answer: '',
    tags: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewFlashcard(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setNewFlashcard(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock save functionality
    console.log('New flashcard created:', newFlashcard);
    setIsDialogOpen(false);
    // Reset form
    setNewFlashcard({
      subject: '',
      topic: '',
      concept: '',
      difficulty: 'Medium',
      question: '',
      answer: '',
      tags: ''
    });
  };

  // Filter flashcards based on selected filters
  const filteredFlashcards = mockFlashcards.filter(flashcard => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'pending' && flashcard.status === 'Pending') return true;
    if (statusFilter === 'completed' && flashcard.status === 'Completed') return true;
    return false;
  });

  return (
    <SharedPageLayout
      title="Flashcards"
      subtitle="Master concepts with intelligent flashcard practice"
    >
      <div className="space-y-6">
        <Tabs defaultValue="topic-breakdown" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="topic-breakdown">Topic Breakdown</TabsTrigger>
              <TabsTrigger value="weightage-analysis">Progress Analysis</TabsTrigger>
              <TabsTrigger value="smart-suggestions">Smart Suggestions</TabsTrigger>
              <TabsTrigger value="all-cards">All Cards</TabsTrigger>
            </TabsList>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-1 h-4 w-4" /> Create Flashcard
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Flashcard</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select 
                      value={newFlashcard.subject} 
                      onValueChange={(value) => handleSelectChange('subject', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Input 
                      id="topic"
                      name="topic"
                      value={newFlashcard.topic}
                      onChange={handleInputChange}
                      placeholder="E.g., Mechanics, Calculus"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="concept">Concept Area</Label>
                    <Input 
                      id="concept"
                      name="concept"
                      value={newFlashcard.concept}
                      onChange={handleInputChange}
                      placeholder="E.g., Newton's Laws, Integration"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty Level</Label>
                    <Select 
                      value={newFlashcard.difficulty} 
                      onValueChange={(value) => handleSelectChange('difficulty', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="question">Question</Label>
                    <Textarea 
                      id="question"
                      name="question"
                      value={newFlashcard.question}
                      onChange={handleInputChange}
                      placeholder="Enter the flashcard question here..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="answer">Answer</Label>
                    <Textarea 
                      id="answer"
                      name="answer"
                      value={newFlashcard.answer}
                      onChange={handleInputChange}
                      placeholder="Enter the flashcard answer here..."
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input 
                      id="tags"
                      name="tags"
                      value={newFlashcard.tags}
                      onChange={handleInputChange}
                      placeholder="E.g., #Mechanics, #Force"
                    />
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Create Flashcard</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          
          <TabsContent value="topic-breakdown" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {flashcardSubjects.map((subject) => (
                <div key={subject.id} className="space-y-4">
                  {subject.topics.map((topic) => (
                    <FlashcardTopicCard 
                      key={topic.id}
                      subject={subject}
                      topic={topic}
                      onTopicClick={(topicId) => console.log('Topic clicked:', topicId)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="weightage-analysis" className="mt-4">
            <FlashcardWeightageAnalysis />
          </TabsContent>
          
          <TabsContent value="smart-suggestions" className="mt-4">
            <FlashcardSmartSuggestions />
          </TabsContent>
          
          <TabsContent value="all-cards" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFlashcards.map((deck) => (
                <Card key={deck.id} className="dashboard-card overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {deck.subject} • {deck.topic}
                        </span>
                        <CardTitle className="text-lg mt-1">{deck.concept}</CardTitle>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>{deck.timeToReview}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge className={difficultyColors[deck.difficulty as keyof typeof difficultyColors]}>
                        {deck.difficulty}
                      </Badge>
                      <Badge className={statusColors[deck.status as keyof typeof statusColors]}>
                        {deck.status}
                      </Badge>
                      <Badge variant="outline">{deck.cardCount} cards</Badge>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mb-2">
                      {deck.tags.map((tag, index) => (
                        <span key={index} className="text-xs text-blue-600 dark:text-blue-400">
                          {tag}{index < deck.tags.length - 1 ? ' ' : ''}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button asChild variant="ghost" className="w-full justify-between">
                      <Link to={`/dashboard/student/flashcards/1/interactive`}>
                        Practice Now
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardsView;
