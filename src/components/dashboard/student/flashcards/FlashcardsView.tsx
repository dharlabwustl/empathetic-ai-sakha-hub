import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ArrowRight, Book, Clock, Star, Trophy, Target, TrendingUp, Brain } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { SharedPageLayout } from '../SharedPageLayout';
import { motion } from 'framer-motion';

// Enhanced mock data matching concept card structure
const mockFlashcards = [
  {
    id: '1',
    subject: 'Physics',
    topic: 'Mechanics',
    concept: 'Newton\'s Laws of Motion',
    timeToReview: '20 min',
    difficulty: 'Medium',
    tags: ['#Mechanics', '#Force'],
    status: 'In Progress',
    cardCount: 15,
    masteryLevel: 75,
    weightage: 8.5,
    priority: 'high',
    lastStudied: '2 hours ago',
    streak: 5,
    aiSuggestion: 'Focus on third law applications'
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
    masteryLevel: 90,
    weightage: 9.2,
    priority: 'high',
    lastStudied: '1 day ago',
    streak: 8,
    aiSuggestion: 'Review advanced techniques'
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
    masteryLevel: 45,
    weightage: 7.8,
    priority: 'medium',
    lastStudied: '3 days ago',
    streak: 2,
    aiSuggestion: 'Start with alcohol groups'
  },
  {
    id: '4',
    subject: 'Biology',
    topic: 'Cell Biology',
    concept: 'Cell Organelles',
    timeToReview: '25 min',
    difficulty: 'Medium',
    tags: ['#CellBiology'],
    status: 'In Progress',
    cardCount: 20,
    masteryLevel: 65,
    weightage: 8.0,
    priority: 'high',
    lastStudied: '5 hours ago',
    streak: 4,
    aiSuggestion: 'Focus on mitochondria functions'
  }
];

// Daily AI suggestions
const dailyAISuggestions = [
  {
    id: 1,
    title: "Complete High-Priority Cards",
    description: "Focus on Newton's Laws and Integration Techniques today",
    priority: "high",
    estimatedTime: "45 min",
    subjects: ["Physics", "Mathematics"]
  },
  {
    id: 2,
    title: "Review Weak Areas",
    description: "Spend time on Functional Groups to improve mastery",
    priority: "medium",
    estimatedTime: "20 min",
    subjects: ["Chemistry"]
  }
];

// Subject weightage data
const subjectWeightage = [
  { subject: 'Mathematics', weightage: 9.2, cards: 25, mastery: 82 },
  { subject: 'Physics', weightage: 8.5, cards: 30, mastery: 75 },
  { subject: 'Chemistry', weightage: 7.8, cards: 18, mastery: 58 },
  { subject: 'Biology', weightage: 8.0, cards: 22, mastery: 70 }
];

// Difficulty badge colors
const difficultyColors = {
  Easy: 'bg-green-100 text-green-800 border-green-200',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Hard: 'bg-red-100 text-red-800 border-red-200'
};

// Status badge colors
const statusColors = {
  Pending: 'bg-blue-100 text-blue-800 border-blue-200',
  'In Progress': 'bg-orange-100 text-orange-800 border-orange-200',
  Completed: 'bg-green-100 text-green-800 border-green-200'
};

// Priority colors
const priorityColors = {
  high: 'bg-red-100 text-red-800 border-red-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  low: 'bg-green-100 text-green-800 border-green-200'
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
    if (statusFilter === 'in-progress' && flashcard.status === 'In Progress') return true;
    if (statusFilter === 'completed' && flashcard.status === 'Completed') return true;
    return false;
  });

  return (
    <SharedPageLayout
      title="Smart Flashcards"
      subtitle="AI-powered spaced repetition for optimal learning"
    >
      <div className="space-y-8">
        {/* Header with Create Button */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Tabs defaultValue="today" className="w-full" onValueChange={setTimeFilter}>
              <TabsList className="bg-white shadow-sm">
                <TabsTrigger value="today" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">Today's Review</TabsTrigger>
                <TabsTrigger value="weekly" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">This Week</TabsTrigger>
                <TabsTrigger value="monthly" className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700">This Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                <Plus className="mr-2 h-4 w-4" /> Create Flashcard
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">Create New Flashcard</DialogTitle>
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
                  <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">Create Flashcard</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Daily AI Suggestions Panel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Brain className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Daily AI Suggestions</h3>
              <p className="text-sm text-gray-600">Personalized recommendations for today</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dailyAISuggestions.map((suggestion) => (
              <div key={suggestion.id} className="bg-white rounded-lg p-4 border border-gray-100">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
                  <Badge variant="outline" className={priorityColors[suggestion.priority as keyof typeof priorityColors]}>
                    {suggestion.priority}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {suggestion.estimatedTime}
                  </div>
                  <Button variant="outline" className="text-xs px-2 py-1 h-6">
                    Start Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Subject Weightage Analysis */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Subject Weightage Analysis</h3>
              <p className="text-sm text-gray-600">Exam importance and your current mastery levels</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subjectWeightage.map((subject) => (
              <div key={subject.subject} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{subject.subject}</h4>
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                    {subject.weightage}/10
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Mastery</span>
                    <span className="font-medium">{subject.mastery}%</span>
                  </div>
                  <Progress value={subject.mastery} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{subject.cards} cards</span>
                    <span>{subject.weightage > 8.5 ? 'High Priority' : subject.weightage > 8.0 ? 'Medium Priority' : 'Low Priority'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex space-x-2 pb-2">
          <Button 
            variant={statusFilter === 'all' ? "default" : "outline"} 
            onClick={() => setStatusFilter('all')}
            className={statusFilter === 'all' ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            All Cards
          </Button>
          <Button 
            variant={statusFilter === 'pending' ? "default" : "outline"} 
            onClick={() => setStatusFilter('pending')}
            className={statusFilter === 'pending' ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            Pending
          </Button>
          <Button 
            variant={statusFilter === 'in-progress' ? "default" : "outline"} 
            onClick={() => setStatusFilter('in-progress')}
            className={statusFilter === 'in-progress' ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            In Progress
          </Button>
          <Button 
            variant={statusFilter === 'completed' ? "default" : "outline"} 
            onClick={() => setStatusFilter('completed')}
            className={statusFilter === 'completed' ? "bg-indigo-600 hover:bg-indigo-700" : ""}
          >
            Completed
          </Button>
        </div>

        {/* Flashcard Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredFlashcards.map((deck, index) => (
            <motion.div
              key={deck.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group"
            >
              <Card className="h-full bg-white hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-indigo-200">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 text-xs">
                          {deck.subject}
                        </Badge>
                        <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200 text-xs">
                          {deck.topic}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {deck.concept}
                      </CardTitle>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">{deck.streak}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className={difficultyColors[deck.difficulty as keyof typeof difficultyColors]}>
                      {deck.difficulty}
                    </Badge>
                    <Badge variant="outline" className={statusColors[deck.status as keyof typeof statusColors]}>
                      {deck.status}
                    </Badge>
                    <Badge variant="outline" className={priorityColors[deck.priority as keyof typeof priorityColors]}>
                      {deck.priority} priority
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Mastery Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Mastery Level</span>
                      <span className="font-medium">{deck.masteryLevel}%</span>
                    </div>
                    <Progress value={deck.masteryLevel} className="h-2" />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-blue-50 rounded-lg p-2">
                      <div className="text-sm font-bold text-blue-700">{deck.cardCount}</div>
                      <div className="text-xs text-blue-600">Cards</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-2">
                      <div className="text-sm font-bold text-orange-700">{deck.weightage}</div>
                      <div className="text-xs text-orange-600">Weightage</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2">
                      <div className="text-sm font-bold text-green-700">{deck.streak}</div>
                      <div className="text-xs text-green-600">Streak</div>
                    </div>
                  </div>

                  {/* AI Suggestion */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-3 border border-indigo-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Brain className="h-3 w-3 text-indigo-600" />
                      <span className="text-xs font-medium text-indigo-700">AI Suggestion</span>
                    </div>
                    <p className="text-xs text-gray-600">{deck.aiSuggestion}</p>
                  </div>

                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Last studied: {deck.lastStudied} • {deck.timeToReview} review time
                  </div>
                </CardContent>

                <CardFooter className="pt-2">
                  <Button asChild className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                    <Link to={`/dashboard/student/flashcards/${deck.id}/interactive`}>
                      <Book className="mr-2 h-4 w-4" />
                      {deck.status === 'Completed' ? 'Review Again' : deck.status === 'In Progress' ? 'Continue' : 'Start Learning'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardsView;
