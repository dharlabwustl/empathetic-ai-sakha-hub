
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Clock, Star, Filter, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FlashcardsLandingPage = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState<string>('all');

  // Mock data for flashcards with status
  const flashcardsData = {
    today: [
      { id: 'physics-formulas', title: 'Physics Formulas', subject: 'Physics', cardCount: 25, difficulty: 'Medium', duration: 15, status: 'pending', dueToday: true },
      { id: 'chemistry-reactions', title: 'Chemical Reactions', subject: 'Chemistry', cardCount: 20, difficulty: 'Easy', duration: 12, status: 'pending', dueToday: true },
      { id: 'math-theorems', title: 'Mathematical Theorems', subject: 'Mathematics', cardCount: 18, difficulty: 'Hard', duration: 20, status: 'pending', dueToday: true }
    ],
    pending: [
      { id: 'biology-terms', title: 'Biology Terminology', subject: 'Biology', cardCount: 30, difficulty: 'Easy', duration: 18, status: 'pending', dueToday: false },
      { id: 'physics-concepts', title: 'Physics Concepts', subject: 'Physics', cardCount: 22, difficulty: 'Medium', duration: 16, status: 'pending', dueToday: false },
      { id: 'chemistry-elements', title: 'Chemical Elements', subject: 'Chemistry', cardCount: 35, difficulty: 'Easy', duration: 25, status: 'pending', dueToday: false }
    ],
    completed: [
      { id: 'algebra-basics', title: 'Algebra Basics', subject: 'Mathematics', cardCount: 15, difficulty: 'Easy', duration: 10, status: 'completed', dueToday: false },
      { id: 'organic-chemistry', title: 'Organic Chemistry', subject: 'Chemistry', cardCount: 28, difficulty: 'Hard', duration: 22, status: 'completed', dueToday: false }
    ]
  };

  const subjects = ['all', 'Physics', 'Chemistry', 'Mathematics', 'Biology'];

  const getFilteredFlashcards = (flashcards: any[]) => {
    if (selectedSubject === 'all') return flashcards;
    return flashcards.filter(flashcard => flashcard.subject === selectedSubject);
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Easy</Badge>;
      case 'Medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Medium</Badge>;
      case 'Hard':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Hard</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string, dueToday: boolean) => {
    if (status === 'completed') {
      return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Completed</Badge>;
    }
    if (dueToday) {
      return <Badge variant="destructive" className="bg-red-100 text-red-700 border-red-200">Due Today</Badge>;
    }
    return <Badge variant="default" className="bg-blue-100 text-blue-700 border-blue-200">Review</Badge>;
  };

  const renderFlashcardCard = (flashcard: any) => (
    <Card 
      key={flashcard.id} 
      className="border-l-4 border-l-purple-500 hover:shadow-lg transition-all duration-200 cursor-pointer bg-gradient-to-r from-white to-purple-50/30"
      onClick={() => navigate(`/dashboard/student/flashcards/${flashcard.id}/interactive`)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            {getStatusBadge(flashcard.status, flashcard.dueToday)}
          </div>
          {getDifficultyBadge(flashcard.difficulty)}
        </div>
        
        <h3 className="font-semibold text-lg mb-2">{flashcard.title}</h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <span className="font-medium">{flashcard.subject}</span>
            <span>•</span>
            <span>{flashcard.cardCount} cards</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{flashcard.duration} min</span>
            </div>
            <Button size="sm" variant="outline" className="h-7 text-xs flex items-center gap-1">
              <Play className="h-3 w-3" />
              Start Review
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const getTabCount = (tabData: any[]) => {
    return getFilteredFlashcards(tabData).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Flashcards
          </h1>
          <p className="text-gray-600 mt-1">Review and memorize with smart spaced repetition</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-gray-500" />
          <select 
            value={selectedSubject} 
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm"
          >
            {subjects.map(subject => (
              <option key={subject} value={subject}>
                {subject === 'all' ? 'All Subjects' : subject}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="today" className="flex items-center gap-2">
            Today 
            <Badge variant="secondary" className="text-xs">{getTabCount(flashcardsData.today)}</Badge>
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            Pending
            <Badge variant="secondary" className="text-xs">{getTabCount(flashcardsData.pending)}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            Completed
            <Badge variant="secondary" className="text-xs">{getTabCount(flashcardsData.completed)}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredFlashcards(flashcardsData.today).map(renderFlashcardCard)}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredFlashcards(flashcardsData.pending).map(renderFlashcardCard)}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredFlashcards(flashcardsData.completed).map(renderFlashcardCard)}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlashcardsLandingPage;
