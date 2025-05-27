import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ArrowRight, Book, Clock, Filter, Search, Brain, Target, TrendingUp, Lightbulb } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { SharedPageLayout } from '../SharedPageLayout';

// Mock data for flashcard decks
const mockFlashcards = [
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
    progress: 65,
    accuracy: 78
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
    progress: 100,
    accuracy: 85
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
    progress: 45,
    accuracy: 72
  },
  {
    id: '4',
    subject: 'Biology',
    topic: 'Cell Biology',
    concept: 'Cell Organelles',
    timeToReview: '25 min',
    difficulty: 'Medium',
    tags: ['#CellBiology'],
    status: 'Completed',
    cardCount: 20,
    progress: 90,
    accuracy: 88
  }
];

// Subject colors matching concept card design
const subjectColors = {
  'Physics': 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20',
  'Chemistry': 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20',
  'Biology': 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20',
  'Mathematics': 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-900/20'
};

// Difficulty badge colors
const difficultyColors = {
  Easy: 'bg-green-100 text-green-800 border-green-200',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Hard: 'bg-red-100 text-red-800 border-red-200'
};

// Status badge colors
const statusColors = {
  Pending: 'bg-blue-100 text-blue-800 border-blue-200',
  Completed: 'bg-green-100 text-green-800 border-green-200'
};

const FlashcardsView = () => {
  const [activeTab, setActiveTab] = useState('overview');
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

  // Filter flashcards based on selected filters
  const filteredFlashcards = mockFlashcards.filter(flashcard => {
    if (statusFilter === 'all') return true;
    if (statusFilter === 'pending' && flashcard.status === 'Pending') return true;
    if (statusFilter === 'completed' && flashcard.status === 'Completed') return true;
    return false;
  });

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Smart Suggestions Section */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
              <Lightbulb className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            Daily Smart Suggestions
            <Badge variant="outline" className="ml-auto bg-white dark:bg-gray-800">AI Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
            <Card className="bg-blue-50 border-blue-200 hover:shadow-md transition-all duration-200 cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/80 rounded-full shadow-sm">
                    <Brain className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-blue-800 text-sm">Review Physics Cards</h4>
                      <Badge variant="destructive" className="text-xs">High Priority</Badge>
                    </div>
                    <p className="text-xs text-gray-700 mb-3">Focus on Newton's Laws - 15 cards need review today</p>
                    <Button size="sm" variant="outline" className="w-full bg-white/80 hover:bg-white border-white/50 text-xs">
                      Start Review
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200 hover:shadow-md transition-all duration-200 cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/80 rounded-full shadow-sm">
                    <Target className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-green-800 text-sm">Chemistry Spaced Review</h4>
                      <Badge variant="secondary" className="text-xs">Recommended</Badge>
                    </div>
                    <p className="text-xs text-gray-700 mb-3">Organic Chemistry cards are due for spaced repetition</p>
                    <Button size="sm" variant="outline" className="w-full bg-white/80 hover:bg-white border-white/50 text-xs">
                      Practice Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-amber-50 border-amber-200 hover:shadow-md transition-all duration-200 cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white/80 rounded-full shadow-sm">
                    <TrendingUp className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-amber-800 text-sm">Weak Areas Focus</h4>
                      <Badge variant="outline" className="text-xs">Optional</Badge>
                    </div>
                    <p className="text-xs text-gray-700 mb-3">Work on calculus integration - 72% accuracy</p>
                    <Button size="sm" variant="outline" className="w-full bg-white/80 hover:bg-white border-white/50 text-xs">
                      Improve
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <Brain className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-2xl font-bold text-blue-700">{mockFlashcards.length}</p>
            <p className="text-sm text-blue-600">Total Decks</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-2xl font-bold text-green-700">
              {mockFlashcards.filter(c => c.status === 'Completed').length}
            </p>
            <p className="text-sm text-green-600">Completed</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold text-purple-700">85%</p>
            <p className="text-sm text-purple-600">Avg Accuracy</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-600" />
            <p className="text-2xl font-bold text-orange-700">12</p>
            <p className="text-sm text-orange-600">This Week</p>
          </CardContent>
        </Card>
      </div>

      {/* Flashcard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFlashcards.map((deck) => (
          <Card key={deck.id} className="h-full flex flex-col hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/60 rounded-xl bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-950/80">
            <CardHeader className="pb-3 space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className={`${subjectColors[deck.subject as keyof typeof subjectColors]} px-3 py-1 rounded-full text-xs font-semibold`}>
                    {deck.subject}
                  </Badge>
                  <Badge variant="outline" className={`${difficultyColors[deck.difficulty as keyof typeof difficultyColors]} px-3 py-1 rounded-full text-xs font-semibold`}>
                    {deck.difficulty}
                  </Badge>
                </div>
                <Badge variant="outline" className={`${statusColors[deck.status as keyof typeof statusColors]} px-2 py-1 rounded-full text-xs font-medium`}>
                  {deck.status}
                </Badge>
              </div>
              
              <CardTitle className="text-lg font-semibold leading-tight text-gray-900 dark:text-white">
                {deck.concept}
              </CardTitle>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {deck.topic} • {deck.cardCount} cards
              </p>
            </CardHeader>
            
            <CardContent className="flex-grow space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700 dark:text-gray-300">Progress</span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{deck.progress}%</span>
                </div>
                <Progress value={deck.progress} className="h-2 bg-gray-200 dark:bg-gray-700" />
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2">
                  <div className="text-sm font-bold text-blue-700 dark:text-blue-300">{deck.accuracy}%</div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">Accuracy</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2">
                  <div className="text-sm font-bold text-purple-700 dark:text-purple-300">{deck.timeToReview}</div>
                  <div className="text-xs text-purple-600 dark:text-purple-400">Est. Time</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {deck.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-gray-50 dark:bg-gray-800">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="pt-3 border-t border-gray-100 dark:border-gray-800 p-4">
              <Button asChild className="w-full flex justify-between items-center bg-indigo-600 hover:bg-indigo-700 text-white">
                <Link to={`/dashboard/student/flashcards/1/interactive`}>
                  <Brain className="h-4 w-4" />
                  <span>Practice Now</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );

  const AllFlashcardsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <Button 
            variant={timeFilter === 'today' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setTimeFilter('today')}
            className="rounded-full"
          >
            Today's
          </Button>
          <Button 
            variant={timeFilter === 'weekly' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setTimeFilter('weekly')}
            className="rounded-full"
          >
            Weekly
          </Button>
          <Button 
            variant={timeFilter === 'monthly' ? "default" : "outline"} 
            size="sm" 
            onClick={() => setTimeFilter('monthly')}
            className="rounded-full"
          >
            Monthly
          </Button>
        </div>
        
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
        <Button 
          variant={statusFilter === 'relevant' ? "default" : "outline"} 
          size="sm" 
          onClick={() => setStatusFilter('relevant')}
        >
          Exam-Relevant
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
    </div>
  );

  return (
    <SharedPageLayout
      title="Flashcards"
      subtitle="Review and memorize with smart flashcards"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="all-flashcards">All Flashcards</TabsTrigger>
            <TabsTrigger value="interactive">Interactive</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="all-flashcards">
            <AllFlashcardsTab />
          </TabsContent>

          <TabsContent value="interactive">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Interactive Practice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Interactive flashcard practice coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardsView;
