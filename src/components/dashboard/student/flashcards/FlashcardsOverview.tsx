
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, RefreshCcw, Bookmark, TrendingUp, Share2, Mic } from "lucide-react";
import { useUserStudyPlan } from "@/hooks/useUserStudyPlan";

type ViewMode = 'today' | 'week' | 'month' | 'all' | 'pending' | 'completed';

interface FlashcardItem {
  id: string;
  question: string;
  answer: string;
  subject: string;
  concept: string;
  lastReviewed?: string;
  nextReviewDue?: string;
  recallAccuracy: number;
  reviewCount: number;
  status: 'pending' | 'reviewed' | 'bookmarked';
  scheduledFor: 'today' | 'this-week' | 'this-month' | 'later';
}

const sampleFlashcards: FlashcardItem[] = [
  {
    id: '1',
    question: 'What is Newton\'s First Law of Motion?',
    answer: 'An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force.',
    subject: 'Physics',
    concept: 'Newton\'s Laws',
    lastReviewed: '2023-04-20',
    nextReviewDue: '2023-04-25',
    recallAccuracy: 85,
    reviewCount: 5,
    status: 'pending',
    scheduledFor: 'today'
  },
  {
    id: '2',
    question: 'What is the Pythagorean theorem?',
    answer: 'In a right-angled triangle, the square of the length of the hypotenuse equals the sum of squares of the other two sides.',
    subject: 'Mathematics',
    concept: 'Trigonometry',
    lastReviewed: '2023-04-18',
    nextReviewDue: '2023-04-24',
    recallAccuracy: 90,
    reviewCount: 8,
    status: 'reviewed',
    scheduledFor: 'today'
  },
  {
    id: '3',
    question: 'Define Potential Energy',
    answer: 'Potential energy is the energy stored in an object due to its position relative to some reference point.',
    subject: 'Physics',
    concept: 'Energy',
    lastReviewed: '2023-04-15',
    nextReviewDue: '2023-04-27',
    recallAccuracy: 75,
    reviewCount: 4,
    status: 'bookmarked',
    scheduledFor: 'this-week'
  },
  {
    id: '4',
    question: 'Who was the first Prime Minister of India?',
    answer: 'Jawaharlal Nehru was the first Prime Minister of India.',
    subject: 'History',
    concept: 'Modern India',
    lastReviewed: '2023-04-12',
    nextReviewDue: '2023-04-26',
    recallAccuracy: 95,
    reviewCount: 6,
    status: 'reviewed',
    scheduledFor: 'this-week'
  },
  {
    id: '5',
    question: 'What are the main parts of a cell?',
    answer: 'The main parts of a cell are the cell membrane, nucleus, cytoplasm, mitochondria, endoplasmic reticulum, Golgi apparatus, lysosomes, and ribosomes.',
    subject: 'Biology',
    concept: 'Cell Structure',
    lastReviewed: '2023-04-10',
    nextReviewDue: '2023-04-30',
    recallAccuracy: 80,
    reviewCount: 3,
    status: 'pending',
    scheduledFor: 'this-month'
  },
];

const FlashcardsOverview = () => {
  const { conceptCards } = useUserStudyPlan();
  const [viewMode, setViewMode] = useState<ViewMode>('today');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedConcept, setSelectedConcept] = useState<string>('');
  const [recallFilter, setRecallFilter] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [sortBy, setSortBy] = useState('newest');
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isRecording, setIsRecording] = useState(false);

  // Filter flashcards based on the selected view
  const getFilteredFlashcards = () => {
    let filtered = [...sampleFlashcards];
    
    // Filter by view mode
    if (viewMode === 'today') {
      filtered = filtered.filter(card => card.scheduledFor === 'today');
    } else if (viewMode === 'week') {
      filtered = filtered.filter(card => ['today', 'this-week'].includes(card.scheduledFor));
    } else if (viewMode === 'month') {
      filtered = filtered.filter(card => ['today', 'this-week', 'this-month'].includes(card.scheduledFor));
    } else if (viewMode === 'pending') {
      filtered = filtered.filter(card => card.status === 'pending');
    } else if (viewMode === 'completed') {
      filtered = filtered.filter(card => card.status === 'reviewed');
    }
    
    // Apply additional filters
    if (selectedSubject) {
      filtered = filtered.filter(card => card.subject === selectedSubject);
    }
    
    if (selectedConcept) {
      filtered = filtered.filter(card => card.concept === selectedConcept);
    }
    
    if (recallFilter) {
      filtered = filtered.filter(card => card.recallAccuracy >= recallFilter);
    }
    
    if (statusFilter) {
      filtered = filtered.filter(card => card.status === statusFilter);
    }
    
    // Apply sorting
    if (sortBy === 'newest') {
      filtered.sort((a, b) => {
        const dateA = a.lastReviewed ? new Date(a.lastReviewed) : new Date(0);
        const dateB = b.lastReviewed ? new Date(b.lastReviewed) : new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
    } else if (sortBy === 'most-attempted') {
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortBy === 'accuracy') {
      filtered.sort((a, b) => b.recallAccuracy - a.recallAccuracy);
    } else if (sortBy === 'subject') {
      filtered.sort((a, b) => a.subject.localeCompare(b.subject));
    }
    
    return filtered;
  };

  const filteredFlashcards = getFilteredFlashcards();
  const subjectsList = [...new Set(sampleFlashcards.map(card => card.subject))];
  const conceptsList = [...new Set(sampleFlashcards.map(card => card.concept))];
  
  const todayCards = sampleFlashcards.filter(card => card.scheduledFor === 'today');
  const weekCards = sampleFlashcards.filter(card => ['today', 'this-week'].includes(card.scheduledFor));
  const monthCards = sampleFlashcards.filter(card => ['today', 'this-week', 'this-month'].includes(card.scheduledFor));
  const pendingCards = sampleFlashcards.filter(card => card.status === 'pending');
  const reviewedCards = sampleFlashcards.filter(card => card.status === 'reviewed');
  
  const handleMarkAsDone = (id: string) => {
    console.log('Marked as done:', id);
  };
  
  const handleReviewAgain = (id: string) => {
    console.log('Review again:', id);
  };
  
  const handleBookmark = (id: string) => {
    console.log('Bookmarked:', id);
  };
  
  const handleSeeStats = (id: string) => {
    console.log('See stats:', id);
  };
  
  const handleShare = (id: string) => {
    console.log('Share:', id);
  };
  
  const handleSpeechToText = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Start recording if browser supports it
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        console.log('Starting speech recognition...');
        // This would be implemented with actual Web Speech API
      } else {
        console.log('Speech recognition not supported');
      }
    } else {
      // Stop recording
      console.log('Stopping speech recognition...');
    }
  };
  
  return (
    <div className="space-y-6">
      <Card className="border-t-4 border-violet-500">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-violet-500">
              <path d="M18 4H6a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3z"></path>
              <path d="m8 16 2-6h4l-2 6"></path>
            </svg>
            Flashcards Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-violet-50 rounded-lg">
              <h3 className="font-medium text-sm text-violet-700 mb-1">Due Today</h3>
              <p className="text-3xl font-bold text-violet-900">{todayCards.length}</p>
              <div className="mt-1 text-xs text-violet-600">
                {todayCards.filter(c => c.status === 'reviewed').length}/{todayCards.length} reviewed
              </div>
              <Progress value={(todayCards.filter(c => c.status === 'reviewed').length / Math.max(1, todayCards.length)) * 100} className="h-1 mt-2" />
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-sm text-blue-700 mb-1">Due This Week</h3>
              <p className="text-3xl font-bold text-blue-900">{weekCards.length}</p>
              <div className="mt-1 text-xs text-blue-600">
                {weekCards.filter(c => c.status === 'reviewed').length}/{weekCards.length} reviewed
              </div>
              <Progress value={(weekCards.filter(c => c.status === 'reviewed').length / Math.max(1, weekCards.length)) * 100} className="h-1 mt-2" />
            </div>
            
            <div className="p-3 bg-emerald-50 rounded-lg">
              <h3 className="font-medium text-sm text-emerald-700 mb-1">Overall Recall Accuracy</h3>
              <p className="text-3xl font-bold text-emerald-900">
                {Math.round(sampleFlashcards.reduce((sum, card) => sum + card.recallAccuracy, 0) / sampleFlashcards.length)}%
              </p>
              <div className="mt-1 text-xs text-emerald-600">
                Based on {sampleFlashcards.reduce((sum, card) => sum + card.reviewCount, 0)} reviews
              </div>
              <Progress value={Math.round(sampleFlashcards.reduce((sum, card) => sum + card.recallAccuracy, 0) / sampleFlashcards.length)} className="h-1 mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)} className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="today" className="text-xs sm:text-sm">Today ({todayCards.length})</TabsTrigger>
            <TabsTrigger value="week" className="text-xs sm:text-sm">This Week ({weekCards.length})</TabsTrigger>
            <TabsTrigger value="month" className="text-xs sm:text-sm">This Month ({monthCards.length})</TabsTrigger>
            <TabsTrigger value="all" className="text-xs sm:text-sm">All ({sampleFlashcards.length})</TabsTrigger>
            <TabsTrigger value="pending" className="text-xs sm:text-sm">Pending ({pendingCards.length})</TabsTrigger>
            <TabsTrigger value="completed" className="text-xs sm:text-sm">Completed ({reviewedCards.length})</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <select 
            className="border rounded-md px-3 py-1 text-sm"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">All Subjects</option>
            {subjectsList.map(subject => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
          
          <select 
            className="border rounded-md px-3 py-1 text-sm"
            value={selectedConcept}
            onChange={(e) => setSelectedConcept(e.target.value)}
          >
            <option value="">All Concepts</option>
            {conceptsList.map(concept => (
              <option key={concept} value={concept}>{concept}</option>
            ))}
          </select>
          
          <select 
            className="border rounded-md px-3 py-1 text-sm"
            value={recallFilter?.toString() || ''}
            onChange={(e) => setRecallFilter(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">All Accuracy</option>
            <option value="90">90% and above</option>
            <option value="80">80% and above</option>
            <option value="70">70% and above</option>
            <option value="60">60% and above</option>
          </select>
          
          <select 
            className="border rounded-md px-3 py-1 text-sm"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="bookmarked">Bookmarked</option>
          </select>
          
          <select 
            className="border rounded-md px-3 py-1 text-sm ml-auto"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="most-attempted">Most Attempted</option>
            <option value="accuracy">Accuracy</option>
            <option value="subject">Subject</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredFlashcards.map((flashcard) => (
            <Card key={flashcard.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <Badge 
                    className={`mr-2 ${
                      flashcard.subject === 'Physics' ? 'bg-blue-100 text-blue-800' :
                      flashcard.subject === 'Mathematics' ? 'bg-emerald-100 text-emerald-800' :
                      flashcard.subject === 'Biology' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {flashcard.subject}
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-800">{flashcard.concept}</Badge>
                  <div className="text-xs text-gray-500 md:ml-auto">
                    Last reviewed: {flashcard.lastReviewed ? new Date(flashcard.lastReviewed).toLocaleDateString() : 'Never'}
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mb-3">{flashcard.question}</h3>
                
                <div className="mb-4 bg-gray-50 p-3 rounded-lg">
                  <h4 className="text-sm text-gray-700 font-medium mb-2">Your Answer:</h4>
                  <div className="flex">
                    <textarea 
                      className="w-full border rounded-l-md px-3 py-2 min-h-[60px]"
                      placeholder="Type your answer here..."
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                    />
                    <Button 
                      variant="outline" 
                      className="rounded-l-none border-l-0"
                      onClick={handleSpeechToText}
                    >
                      <Mic className={isRecording ? "text-red-500" : ""} />
                    </Button>
                  </div>
                </div>
                
                <details className="mb-3">
                  <summary className="cursor-pointer text-blue-600 hover:text-blue-800 text-sm font-medium">
                    Show Answer
                  </summary>
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                    {flashcard.answer}
                  </div>
                </details>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleMarkAsDone(flashcard.id)}>
                      <Check className="h-4 w-4 mr-1" /> Mark as Done
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleReviewAgain(flashcard.id)}>
                      <RefreshCcw className="h-4 w-4 mr-1" /> Review Again
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleBookmark(flashcard.id)}>
                      <Bookmark className="h-4 w-4 mr-1" /> Bookmark
                    </Button>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => handleSeeStats(flashcard.id)}>
                      <TrendingUp className="h-4 w-4 mr-1" /> Stats
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleShare(flashcard.id)}>
                      <Share2 className="h-4 w-4 mr-1" /> Share
                    </Button>
                  </div>
                </div>
                
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Recall Accuracy:</span>
                    <div className="flex items-center gap-1">
                      <Progress value={flashcard.recallAccuracy} className="w-20 h-2" />
                      <span className="text-xs font-medium">{flashcard.recallAccuracy}%</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Reviews: {flashcard.reviewCount}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {filteredFlashcards.length === 0 && (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No flashcards match your current filters</p>
              <Button variant="link" onClick={() => {
                setSelectedSubject('');
                setSelectedConcept('');
                setRecallFilter(null);
                setStatusFilter('');
              }}>
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default FlashcardsOverview;
