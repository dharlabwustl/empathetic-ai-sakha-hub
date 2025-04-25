import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Brain, Check, Clock, Repeat, RotateCcw, Sparkles, ArrowRight, Filter, 
  Volume2, VolumeX, Bookmark, Bell, Tag, MessageSquare, Mic, Zap, BookmarkPlus, FileText, 
  BookMarked, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUserStudyPlan } from '@/hooks/useUserStudyPlan';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface FlashcardProps {
  id: string;
  front: string;
  back: string;
  subject: string;
  topic: string;
  timeToComplete?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  image?: string;
  type: 'definition' | 'image' | 'question' | 'mcq';
  conceptId?: string;
  isBookmarked?: boolean;
  cardsCount?: number;
  mastery?: number;
}

const FlashcardsFeature: React.FC = () => {
  const { conceptCards } = useUserStudyPlan();
  const { userProfile } = useUserProfile();
  const [activeTab, setActiveTab] = useState('today');
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [recallRatings, setRecallRatings] = useState<Record<string, 1 | 2 | 3 | 4 | 5>>({});
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswerFeedback, setShowAnswerFeedback] = useState(false);
  const [answerAccuracy, setAnswerAccuracy] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState<Record<string, boolean>>({});
  const [useSpeechInput, setUseSpeechInput] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  
  // Get exam goal
  const examGoal = userProfile?.goals?.[0]?.title || 'IIT-JEE';

  // Generate sample flashcards based on completed concept cards
  const completedConcepts = conceptCards.filter(card => card.completed);
  
  const sampleFlashcards: FlashcardProps[] = completedConcepts.flatMap((concept, i) => [
    {
      id: `flash-def-${concept.id}`,
      front: `Define: ${concept.title}`,
      back: `${concept.title} is a key concept in ${concept.subject} that deals with ${concept.chapter}.`,
      subject: concept.subject,
      topic: concept.chapter,
      timeToComplete: 1,
      difficulty: concept.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard',
      type: 'definition',
      conceptId: concept.id,
      isBookmarked: false,
      cardsCount: 10,
      mastery: 75
    },
    {
      id: `flash-q-${concept.id}`,
      front: `Question: How does ${concept.title} relate to ${concept.chapter}?`,
      back: `${concept.title} is fundamental to understanding ${concept.chapter} because it provides the theoretical foundation.`,
      subject: concept.subject,
      topic: concept.chapter,
      timeToComplete: 2,
      difficulty: concept.difficulty.toLowerCase() as 'easy' | 'medium' | 'hard',
      type: 'question',
      conceptId: concept.id,
      isBookmarked: true,
      cardsCount: 15,
      mastery: 60
    }
  ]);
  
  // Filter based on active tab
  const filterFlashcards = () => {
    switch (activeTab) {
      case 'today':
        // Today's flashcards - related to concept cards scheduled for today
        return sampleFlashcards.filter(card => {
          const relatedConcept = conceptCards.find(concept => concept.id === card.conceptId);
          return relatedConcept?.scheduledFor === 'today';
        });
      case 'week':
        // Demo week flashcards
        return sampleFlashcards.filter((_, i) => i % 3 !== 0);
      case 'month':
        // Demo month flashcards
        return sampleFlashcards;
      default:
        return sampleFlashcards;
    }
  };
  
  const flashcards = filterFlashcards();
  const currentFlashcard = flashcards[currentFlashcardIndex];
  
  // Calculate overall progress
  const totalFlashcards = sampleFlashcards.length;
  const ratedFlashcards = Object.keys(recallRatings).length;
  const masteredFlashcards = Object.values(recallRatings).filter(rating => rating >= 4).length;
  
  // Subjects breakdown
  const subjects = [...new Set(sampleFlashcards.map(card => card.subject))];
  const subjectStats = subjects.map(subject => {
    const cards = sampleFlashcards.filter(card => card.subject === subject);
    const rated = cards.filter(card => recallRatings[card.id]);
    const mastered = cards.filter(card => recallRatings[card.id] >= 4);
    
    return {
      subject,
      total: cards.length,
      rated: rated.length,
      mastered: mastered.length,
      avgScore: Math.round(rated.reduce((acc, card) => acc + (recallRatings[card.id] || 0), 0) / (rated.length || 1) * 20),
      avgRecall: Math.round(rated.reduce((acc, card) => acc + (recallRatings[card.id] || 0), 0) / (rated.length || 1) * 25)
    };
  });

  const handleNext = () => {
    setIsFlipped(false);
    setUserAnswer('');
    setShowAnswerFeedback(false);
    setCurrentFlashcardIndex(prev => 
      prev < flashcards.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    setUserAnswer('');
    setShowAnswerFeedback(false);
    setCurrentFlashcardIndex(prev => 
      prev > 0 ? prev - 1 : flashcards.length - 1
    );
  };

  const handleRecall = (rating: 1 | 2 | 3 | 4 | 5) => {
    if (currentFlashcard) {
      setRecallRatings(prev => ({
        ...prev,
        [currentFlashcard.id]: rating
      }));
    }
  };
  
  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
  };
  
  const toggleBookmark = () => {
    if (currentFlashcard) {
      setIsBookmarked(prev => ({
        ...prev,
        [currentFlashcard.id]: !prev[currentFlashcard.id]
      }));
    }
  };
  
  const handleSubmitAnswer = () => {
    if (currentFlashcard) {
      // Simple accuracy calculation (in a real app, this would use more sophisticated matching)
      const words = currentFlashcard.back.toLowerCase().split(' ');
      const userWords = userAnswer.toLowerCase().split(' ');
      
      let matches = 0;
      userWords.forEach(word => {
        if (word.length > 3 && words.includes(word)) {
          matches++;
        }
      });
      
      const totalKeywords = words.filter(word => word.length > 3).length;
      const accuracy = Math.min(100, Math.round((matches / Math.max(1, totalKeywords)) * 100));
      
      setAnswerAccuracy(accuracy);
      setShowAnswerFeedback(true);
      
      // Auto-rate based on accuracy
      const autoRating: 1 | 2 | 3 | 4 | 5 = 
        accuracy >= 90 ? 5 :
        accuracy >= 75 ? 4 :
        accuracy >= 60 ? 3 :
        accuracy >= 40 ? 2 : 1;
        
      handleRecall(autoRating);
    }
  };
  
  const toggleSpeechInput = () => {
    setUseSpeechInput(!useSpeechInput);
  };
  
  const startRecording = () => {
    // In a real implementation, this would use the Web Speech API
    setIsRecording(true);
    
    // Mock recording after 2 seconds
    setTimeout(() => {
      setIsRecording(false);
      setUserAnswer(prev => prev + " " + currentFlashcard.back.split(' ').slice(0, 3).join(' ') + "...");
    }, 2000);
  };
  
  const stopRecording = () => {
    setIsRecording(false);
  };

  // Animation variants
  const cardVariants = {
    front: {
      rotateY: 0
    },
    back: {
      rotateY: 180
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="text-blue-500" />
            Flashcards
          </h2>
          <p className="text-gray-500">
            Quick Recaps for Your {examGoal} Preparation, Available Anytime
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={toggleVoice}
          >
            {voiceEnabled ? <Volume2 size={16} className="mr-1" /> : <VolumeX size={16} className="mr-1" />}
            {voiceEnabled ? 'Voice Enabled' : 'Enable Voice'}
          </Button>
          
          <Link to="/dashboard/student/flashcards/all">
            <Button variant="outline" className="flex items-center gap-2">
              View All Flashcards <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Overall Progress</h3>
            <div className="flex justify-between mb-1">
              <span className="text-sm">{ratedFlashcards}/{totalFlashcards} Reviewed</span>
              <span className="text-sm font-medium">{Math.round((ratedFlashcards / totalFlashcards) * 100)}%</span>
            </div>
            <Progress value={(ratedFlashcards / totalFlashcards) * 100} />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Mastery Level</h3>
            <div className="flex justify-between mb-1">
              <span className="text-sm">{masteredFlashcards}/{totalFlashcards} Mastered</span>
              <span className="text-sm font-medium">{Math.round((masteredFlashcards / totalFlashcards) * 100)}%</span>
            </div>
            <Progress value={(masteredFlashcards / totalFlashcards) * 100} className="bg-gray-200" />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Time Spent</h3>
            <div className="flex items-center gap-2">
              <Clock className="text-blue-500" size={16} />
              <span className="text-lg font-medium">45 minutes</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Today's review session</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Flashcard Sets</CardTitle>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="week">This Week</TabsTrigger>
                  <TabsTrigger value="month">This Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {flashcards.map((set) => (
                  <Link key={set.id} to={`/dashboard/student/flashcards/${set.id}`}>
                    <Card className="h-full hover:shadow-md transition-shadow duration-200">
                      <CardContent className="p-4 space-y-4">
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className="bg-blue-50 text-blue-700">
                            {set.subject}
                          </Badge>
                        </div>
                        <h3 className="font-semibold">{set.front}</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">
                            {set.topic}
                          </Badge>
                        </div>
                        <Button className="w-full mt-2">Study Now</Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar with stats and filters */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Filter size={16} />
                Quick Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Physics Concepts
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Brain className="mr-2 h-4 w-4" />
                Hard Flashcards
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Sparkles className="mr-2 h-4 w-4" />
                Recently Added
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Check className="mr-2 h-4 w-4" />
                Mastered Cards
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <BookOpen size={16} />
                Subject Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjectStats.map(stat => (
                <div key={stat.subject} className="space-y-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">{stat.subject}</span>
                    <span className="text-sm">{stat.mastered}/{stat.total}</span>
                  </div>
                  <Progress 
                    value={(stat.mastered / stat.total) * 100} 
                    className="h-2" 
                  />
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Quiz: {stat.avgScore}%</span>
                    <span>Recall: {stat.avgRecall}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap size={16} />
                Learning Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="font-medium text-blue-800 mb-1">Spaced Repetition</h4>
                <p className="text-blue-700">
                  Review cards at increasing intervals: 1 day, 3 days, 7 days, etc.
                </p>
              </div>
              
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-100">
                <h4 className="font-medium text-amber-800 mb-1">Active Recall</h4>
                <p className="text-amber-700">
                  Try to answer before flipping the card to strengthen memory.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                <h4 className="font-medium text-green-800 mb-1">Interleaving</h4>
                <p className="text-green-700">
                  Mix different subjects rather than studying one topic at a time.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsFeature;
