
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Search, BookOpen, Book, Clock, CheckCircle, XCircle, Brain, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserStudyPlan, ConceptCard } from '@/hooks/useUserStudyPlan';
import { useUserProfile } from '@/hooks/useUserProfile';

const ConceptsPage = () => {
  const { conceptCards, loading } = useUserStudyPlan();
  const { userProfile } = useUserProfile();
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'month'>('today');
  const [subTab, setSubTab] = useState<'pending' | 'completed'>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [isReading, setIsReading] = useState(false);
  const [speech, setSpeech] = useState<SpeechSynthesisUtterance | null>(null);

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      const newSpeech = new SpeechSynthesisUtterance();
      setSpeech(newSpeech);
      
      return () => {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, []);

  // Filter cards based on active filters
  const filteredCards = conceptCards
    .filter(card => card.scheduledFor === activeTab)
    .filter(card => subTab === 'pending' ? !card.completed : card.completed)
    .filter(card => !searchQuery || 
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      card.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
      card.chapter.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter(card => !selectedSubject || card.subject === selectedSubject)
    .filter(card => !selectedDifficulty || card.difficulty === selectedDifficulty);
  
  // Get unique subjects for filter dropdown
  const subjects = [...new Set(conceptCards.map(card => card.subject))];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  
  // Calculate progress statistics
  const totalCards = conceptCards.filter(card => card.scheduledFor === activeTab).length;
  const completedCards = conceptCards.filter(card => card.scheduledFor === activeTab && card.completed).length;
  const completionPercentage = totalCards > 0 ? (completedCards / totalCards) * 100 : 0;
  
  const examGoal = userProfile?.goals?.[0]?.title || 'IIT-JEE';
  
  // Handle speech synthesis for page overview
  const handleSpeechSummary = () => {
    if (!speech) return;
    
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    
    const periodText = activeTab === 'today' ? "today's" : activeTab === 'week' ? "this week's" : "this month's";
    const statusText = subTab === 'pending' ? "pending" : "completed";
    
    const summaryText = `You are viewing ${periodText} ${statusText} concept cards for your ${examGoal} preparation. 
                         You have completed ${completedCards} out of ${totalCards} concepts for ${activeTab}, 
                         which is ${Math.round(completionPercentage)}% completion.`;
    
    speech.text = summaryText;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
    setIsReading(true);
    
    speech.onend = () => {
      setIsReading(false);
    };
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="flex flex-col space-y-6">
          {/* Header Section with Voice Control */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <Link to="/dashboard/student/overview" className="inline-flex items-center text-blue-600 hover:text-blue-700">
                <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
              </Link>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleSpeechSummary}
                className="flex items-center gap-2"
              >
                {isReading ? <VolumeX size={16} /> : <Volume2 size={16} />}
                {isReading ? "Stop Reading" : "Read Page Overview"}
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold">Concept Cards</h1>
                <p className="text-gray-600 mt-1">
                  Master concepts for your {examGoal} exam preparation
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center gap-2 bg-blue-50 p-2 rounded-lg">
                <Brain className="text-blue-500" size={20} />
                <div>
                  <p className="text-sm font-medium">Exam Goal</p>
                  <p className="text-blue-700 font-semibold">{examGoal}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Card */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">Learning Progress</h3>
                  <span className="text-sm font-medium">{Math.round(completionPercentage)}%</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
                
                <div className="flex justify-between items-center text-sm font-medium">
                  <span>{completedCards} of {totalCards} concepts completed</span>
                  <span className="text-gray-500">{totalCards - completedCards} remaining</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-green-50 rounded-lg p-4 flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CheckCircle className="text-green-600" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Completed</div>
                      <div className="font-semibold">{completedCards} concepts</div>
                    </div>
                  </div>
                  
                  <div className="bg-amber-50 rounded-lg p-4 flex items-center space-x-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <XCircle className="text-amber-600" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Pending</div>
                      <div className="font-semibold">{totalCards - completedCards} concepts</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4 flex items-center space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Clock className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Total Study Time</div>
                      <div className="font-semibold">
                        {conceptCards
                          .filter(card => card.scheduledFor === activeTab)
                          .reduce((sum, card) => sum + card.estimatedTime, 0)} min
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Filters Section */}
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search concepts, subjects or chapters..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-3">
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Subjects</SelectItem>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Difficulties</SelectItem>
                  {difficulties.map((diff) => (
                    <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {(selectedSubject || selectedDifficulty || searchQuery) && (
                <Button 
                  variant="ghost"
                  onClick={() => {
                    setSelectedSubject('');
                    setSelectedDifficulty('');
                    setSearchQuery('');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          
          {/* Main Tabs Section */}
          <Tabs defaultValue="today" value={activeTab} onValueChange={(value) => setActiveTab(value as 'today' | 'week' | 'month')}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="today">Today's Plan</TabsTrigger>
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
            </TabsList>
            
            {/* Sub Tabs for Status */}
            <div className="mb-4">
              <div className="flex gap-4">
                <Button 
                  variant={subTab === 'pending' ? "default" : "outline"}
                  onClick={() => setSubTab('pending')}
                  size="sm"
                >
                  Pending
                </Button>
                <Button 
                  variant={subTab === 'completed' ? "default" : "outline"}
                  onClick={() => setSubTab('completed')}
                  size="sm"
                >
                  Completed
                </Button>
              </div>
            </div>
            
            {/* Cards Display */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="h-48 animate-pulse">
                    <CardContent className="p-0 h-full">
                      <div className="bg-gray-200 h-full rounded-md"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredCards.length === 0 ? (
              <Card className="bg-gray-50">
                <CardContent className="p-8 text-center">
                  <BookOpen className="mx-auto text-gray-400 mb-3" size={32} />
                  <h3 className="text-lg font-medium mb-1">No concepts found</h3>
                  <p className="text-gray-500">
                    {subTab === 'pending' 
                      ? `You don't have any pending concepts for ${activeTab === 'today' ? 'today' : activeTab === 'week' ? 'this week' : 'this month'}.` 
                      : `You haven't completed any concepts for ${activeTab === 'today' ? 'today' : activeTab === 'week' ? 'this week' : 'this month'} yet.`}
                  </p>
                  {subTab === 'completed' && (
                    <Button className="mt-4" onClick={() => setSubTab('pending')}>
                      View Pending Concepts
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCards.map((card) => (
                  <Link key={card.id} to={`/dashboard/student/concepts/${card.id}`}>
                    <Card className="h-full hover:shadow-md transition-shadow duration-200 overflow-hidden group border-l-4 cursor-pointer" style={{ borderLeftColor: getDifficultyColor(card.difficulty) }}>
                      <CardContent className="p-4 h-full flex flex-col">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant={card.completed ? "outline" : "default"} className="mb-2">
                            {card.completed ? "Completed" : "Pending"}
                          </Badge>
                          <Badge variant="outline" className={getDifficultyClass(card.difficulty)}>
                            {card.difficulty}
                          </Badge>
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors duration-200">
                          {card.title}
                        </h3>
                        
                        <div className="mt-auto pt-2 space-y-1 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Book size={14} />
                            <span>{card.subject}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <BookOpen size={14} />
                            <span>{card.chapter}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{card.estimatedTime} min</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
};

// Helper functions
const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return '#22c55e';
    case 'medium': return '#f59e0b';
    case 'hard': return '#ef4444';
    default: return '#6366f1';
  }
};

const getDifficultyClass = (difficulty: string): string => {
  switch (difficulty.toLowerCase()) {
    case 'easy': return 'bg-green-50 text-green-700 border-green-200';
    case 'medium': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'hard': return 'bg-red-50 text-red-700 border-red-200';
    default: return '';
  }
};

export default ConceptsPage;
