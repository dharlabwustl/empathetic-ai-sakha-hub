
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ArrowRight, Book, Clock, ChevronDown, ChevronUp, Target, TrendingUp, Brain } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { SharedPageLayout } from '../SharedPageLayout';
import * as Collapsible from '@radix-ui/react-collapsible';

// Enhanced mock data with topic breakdowns and weightage
const enhancedFlashcards = [
  {
    id: '1',
    subject: 'Physics',
    topic: 'Mechanics',
    concept: 'Newton\'s Laws of Motion',
    timeToReview: '20 min',
    difficulty: 'Medium',
    tags: ['#Mechanics', '#Force'],
    status: 'Pending',
    cardCount: 15,
    weightage: 25,
    examImportance: 'High',
    completionRate: 65,
    lastStudied: '2 days ago',
    topics: [
      { name: 'First Law', weightage: 8, completed: true, priority: 'Medium' },
      { name: 'Second Law', weightage: 10, completed: false, priority: 'High' },
      { name: 'Third Law', weightage: 7, completed: false, priority: 'Medium' }
    ]
  },
  {
    id: '2',
    subject: 'Mathematics',
    topic: 'Calculus',
    concept: 'Integration Techniques',
    timeToReview: '15 min',
    difficulty: 'Hard',
    tags: ['#Calculus', '#Integration'],
    status: 'Completed',
    cardCount: 12,
    weightage: 30,
    examImportance: 'Very High',
    completionRate: 90,
    lastStudied: '1 day ago',
    topics: [
      { name: 'By Parts', weightage: 12, completed: true, priority: 'High' },
      { name: 'Substitution', weightage: 10, completed: true, priority: 'High' },
      { name: 'Partial Fractions', weightage: 8, completed: false, priority: 'Medium' }
    ]
  },
  {
    id: '3',
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    concept: 'Functional Groups',
    timeToReview: '10 min',
    difficulty: 'Easy',
    tags: ['#OrganicChemistry'],
    status: 'Pending',
    cardCount: 8,
    weightage: 20,
    examImportance: 'Medium',
    completionRate: 30,
    lastStudied: '5 days ago',
    topics: [
      { name: 'Alcohols', weightage: 7, completed: true, priority: 'Medium' },
      { name: 'Aldehydes', weightage: 6, completed: false, priority: 'High' },
      { name: 'Ketones', weightage: 7, completed: false, priority: 'Medium' }
    ]
  }
];

// Daily smart suggestions
const dailySuggestions = [
  {
    id: 1,
    title: "Focus on Integration Techniques",
    description: "Complete partial fractions - high weightage topic",
    priority: "High",
    estimatedTime: "25 min",
    subject: "Mathematics"
  },
  {
    id: 2,
    title: "Review Newton's Second Law",
    description: "Strengthen understanding before moving to applications",
    priority: "Medium", 
    estimatedTime: "15 min",
    subject: "Physics"
  }
];

// Difficulty badge colors
const difficultyColors = {
  Easy: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  Hard: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
};

// Status badge colors
const statusColors = {
  Pending: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  Completed: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
};

const FlashcardsView = () => {
  const [timeFilter, setTimeFilter] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [expandedCards, setExpandedCards] = useState<string[]>([]);
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
    console.log('New flashcard created:', newFlashcard);
    setIsDialogOpen(false);
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

  const toggleCardExpansion = (cardId: string) => {
    setExpandedCards(prev => 
      prev.includes(cardId) 
        ? prev.filter(id => id !== cardId)
        : [...prev, cardId]
    );
  };

  // Filter flashcards based on selected filters
  const filteredFlashcards = enhancedFlashcards.filter(flashcard => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'pending' && flashcard.status === 'Pending') return true;
    if (statusFilter === 'completed' && flashcard.status === 'Completed') return true;
    return false;
  });

  // Calculate overall progress
  const overallProgress = Math.round(
    enhancedFlashcards.reduce((sum, card) => sum + card.completionRate, 0) / enhancedFlashcards.length
  );

  return (
    <SharedPageLayout
      title="Flashcards"
      subtitle="Review and memorize with smart flashcards"
    >
      <div className="space-y-6">
        {/* Header with Progress Overview */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Your Flashcard Progress</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {enhancedFlashcards.filter(c => c.status === 'Completed').length} of {enhancedFlashcards.length} sets completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{overallProgress}%</div>
              <div className="text-sm text-gray-500">Overall Progress</div>
            </div>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Daily Smart Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              Daily Smart Suggestions
            </CardTitle>
            <CardDescription>AI-powered recommendations for optimal learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {dailySuggestions.map((suggestion) => (
                <div key={suggestion.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={suggestion.priority === 'High' ? 'destructive' : 'secondary'} className="text-xs">
                        {suggestion.priority}
                      </Badge>
                      <span className="text-sm font-medium">{suggestion.title}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{suggestion.description}</p>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {suggestion.estimatedTime}
                      </span>
                      <span>{suggestion.subject}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Start</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Filters and Create Button */}
        <div className="flex justify-between items-center">
          <Tabs defaultValue="today" className="w-full" onValueChange={setTimeFilter}>
            <TabsList>
              <TabsTrigger value="today">Today's</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="ml-2 whitespace-nowrap">
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
        
        <div className="flex space-x-2 pb-2">
          <Button 
            variant={statusFilter === 'all' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setStatusFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={statusFilter === 'pending' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setStatusFilter('pending')}
          >
            Pending
          </Button>
          <Button 
            variant={statusFilter === 'completed' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setStatusFilter('completed')}
          >
            Completed
          </Button>
        </div>
        
        {/* Enhanced Flashcard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredFlashcards.map((deck) => {
            const isExpanded = expandedCards.includes(deck.id);
            
            return (
              <Card key={deck.id} className="dashboard-card overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4" style={{ borderLeftColor: deck.examImportance === 'Very High' ? '#ef4444' : deck.examImportance === 'High' ? '#f59e0b' : '#22c55e' }}>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {deck.subject} • {deck.topic}
                      </span>
                      <CardTitle className="text-lg mt-1">{deck.concept}</CardTitle>
                    </div>
                    <Badge variant="outline" className={deck.examImportance === 'Very High' ? 'bg-red-100 text-red-800' : deck.examImportance === 'High' ? 'bg-orange-100 text-orange-800' : 'bg-blue-100 text-blue-800'}>
                      {deck.examImportance}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-4 pt-0">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{deck.timeToReview}</span>
                    <span className="mx-2">•</span>
                    <span>Last: {deck.lastStudied}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge className={difficultyColors[deck.difficulty as keyof typeof difficultyColors]}>
                      {deck.difficulty}
                    </Badge>
                    <Badge className={statusColors[deck.status as keyof typeof statusColors]}>
                      {deck.status}
                    </Badge>
                    <Badge variant="outline">{deck.cardCount} cards</Badge>
                    <Badge variant="outline" className="bg-purple-100 text-purple-800">
                      {deck.weightage}% weightage
                    </Badge>
                  </div>

                  {/* Progress Section */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Completion Progress</span>
                        <span>{deck.completionRate}%</span>
                      </div>
                      <Progress value={deck.completionRate} className="h-2" />
                    </div>
                  </div>

                  {/* Collapsible Topic Breakdown */}
                  <Collapsible.Root open={isExpanded} onOpenChange={() => toggleCardExpansion(deck.id)}>
                    <Collapsible.Trigger asChild>
                      <Button variant="ghost" size="sm" className="w-full justify-between p-2 h-8">
                        <span className="text-sm font-medium">Topic Breakdown</span>
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </Collapsible.Trigger>
                    
                    <Collapsible.Content className="space-y-2 mt-2">
                      {deck.topics.map((topic, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${topic.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
                            <span className="text-sm">{topic.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" size="sm" className={topic.priority === 'High' ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-700'}>
                              {topic.priority}
                            </Badge>
                            <span className="text-xs text-gray-500">{topic.weightage}%</span>
                          </div>
                        </div>
                      ))}
                    </Collapsible.Content>
                  </Collapsible.Root>
                  
                  <div className="flex flex-wrap gap-1 mt-3">
                    {deck.tags.map((tag, index) => (
                      <span key={index} className="text-xs text-blue-600 dark:text-blue-400">
                        {tag}{index < deck.tags.length - 1 ? ' ' : ''}
                      </span>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="p-4 pt-0">
                  <Button asChild variant="default" className="w-full justify-between bg-blue-600 hover:bg-blue-700">
                    <Link to={`/dashboard/student/flashcards/1/interactive`}>
                      Practice Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardsView;
