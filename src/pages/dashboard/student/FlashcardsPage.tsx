
import React, { useState, useMemo, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, Clock, BookOpen, Play, ArrowRight } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import OverviewSection from '@/components/dashboard/student/OverviewSection';

const FlashcardsPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [statusView, setStatusView] = useState<'today' | 'pending' | 'completed'>('today');
  const [activeSubject, setActiveSubject] = useState('all');
  const [showAllCards, setShowAllCards] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock flashcard data
  const flashcardSets = [
    {
      id: '1',
      title: 'Integration Techniques',
      subject: 'Mathematics',
      topic: 'Calculus',
      totalCards: 25,
      completedCards: 18,
      difficulty: 'Medium',
      estimatedTime: 15,
      lastStudied: '2024-01-15',
      completed: false,
      scheduledFor: 'today'
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions',
      subject: 'Chemistry',
      topic: 'Organic Chemistry',
      totalCards: 40,
      completedCards: 40,
      difficulty: 'Hard',
      estimatedTime: 25,
      lastStudied: '2024-01-14',
      completed: true,
      scheduledFor: 'today'
    },
    {
      id: '3',
      title: 'Cell Biology',
      subject: 'Biology',
      topic: 'Cell Structure',
      totalCards: 30,
      completedCards: 5,
      difficulty: 'Easy',
      estimatedTime: 20,
      lastStudied: null,
      completed: false,
      scheduledFor: 'week'
    }
  ];

  // Listen for URL parameter changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    const subject = searchParams.get('subject');
    
    if (tab && (tab === 'overview' || tab === 'all-flashcards')) {
      setActiveTab(tab);
    }
    
    if (subject && tab === 'all-flashcards') {
      setActiveSubject(decodeURIComponent(subject));
    }
  }, [searchParams]);

  const overviewData = {
    type: "Flashcards" as const,
    title: "NEET Flashcards Overview",
    subjects: [
      { name: "Physics", completed: 85, total: 120, progress: 71, efficiency: 88, studyTime: 32 },
      { name: "Chemistry", completed: 95, total: 140, progress: 68, efficiency: 85, studyTime: 45 },
      { name: "Biology", completed: 110, total: 150, progress: 73, efficiency: 92, studyTime: 38 }
    ],
    totalStudyTime: 115,
    overallProgress: 71,
    suggestions: [
      "Review Physics electromagnetic waves flashcards for better retention",
      "Chemistry coordination compounds need more frequent practice",
      "Biology genetics flashcards are showing excellent progress",
      "Consider using spaced repetition for better memory consolidation"
    ]
  };

  // Get unique subjects
  const subjects = useMemo(() => {
    const subjectsSet = new Set(flashcardSets.map(set => set.subject));
    return Array.from(subjectsSet);
  }, []);

  // Count flashcard sets per subject and status
  const flashcardCounts = useMemo(() => {
    const counts: Record<string, Record<string, number>> = {};
    
    flashcardSets.forEach(set => {
      if (!counts[set.subject]) {
        counts[set.subject] = { today: 0, pending: 0, completed: 0 };
      }
      
      if (set.completed) {
        counts[set.subject].completed++;
      } else if (set.scheduledFor === 'today') {
        counts[set.subject].today++;
      } else {
        counts[set.subject].pending++;
      }
    });
    
    return counts;
  }, []);

  // Filter flashcard sets
  const filteredSets = useMemo(() => {
    let filtered = flashcardSets.filter(set => {
      if (statusView === 'completed') {
        return set.completed;
      } else if (statusView === 'today') {
        return !set.completed && set.scheduledFor === 'today';
      } else { // pending
        return !set.completed && set.scheduledFor !== 'today';
      }
    });
    
    if (activeSubject !== 'all') {
      filtered = filtered.filter(set => set.subject === activeSubject);
    }
    
    if (!showAllCards) {
      filtered = filtered.slice(0, 6);
    }
    
    return filtered;
  }, [statusView, activeSubject, showAllCards]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const url = new URL(window.location);
    url.searchParams.set('tab', value);
    if (value === 'overview') {
      url.searchParams.delete('subject');
    }
    window.history.pushState({}, '', url);
  };

  const handleSubjectChange = (subject: string) => {
    setActiveSubject(subject);
    const url = new URL(window.location);
    if (subject === 'all') {
      url.searchParams.delete('subject');
    } else {
      url.searchParams.set('subject', encodeURIComponent(subject));
    }
    window.history.pushState({}, '', url);
  };

  const handleStudyFlashcard = (setId: string) => {
    navigate(`/dashboard/student/flashcards/${setId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Flashcards</h1>
          <p className="text-gray-600 dark:text-gray-400">Master concepts through spaced repetition</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="all-flashcards">All Flashcards</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <OverviewSection {...overviewData} />
        </TabsContent>

        <TabsContent value="all-flashcards" className="space-y-6 mt-6">
          {/* Status-based Tabs */}
          <Tabs value={statusView} onValueChange={(v) => setStatusView(v as typeof statusView)}>
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Subject Tabs */}
          <div className="border-b">
            <div className="flex space-x-8 overflow-x-auto">
              <button
                onClick={() => handleSubjectChange('all')}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeSubject === 'all'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                All Subjects
                <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                  {flashcardSets.filter(s => statusView === 'completed' ? s.completed : 
                    statusView === 'today' ? (!s.completed && s.scheduledFor === 'today') :
                    (!s.completed && s.scheduledFor !== 'today')).length}
                </span>
              </button>
              {subjects.map(subject => (
                <button
                  key={subject}
                  onClick={() => handleSubjectChange(subject)}
                  className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                    activeSubject === subject
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {subject}
                  <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {flashcardCounts[subject]?.[statusView] || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Flashcard Sets Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredSets.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-500">
                  No {statusView} flashcard sets found {activeSubject !== 'all' ? `for ${activeSubject}` : ''}
                </p>
              </div>
            ) : (
              filteredSets.map((set) => (
                <motion.div key={set.id} variants={itemVariants}>
                  <Card className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-purple-300 bg-gradient-to-br from-white to-purple-50/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Brain className="h-5 w-5 text-purple-600" />
                          <CardTitle className="text-lg font-semibold">{set.title}</CardTitle>
                        </div>
                        <Badge variant="outline" className={getDifficultyColor(set.difficulty)}>
                          {set.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
                          {set.subject}
                        </Badge>
                        <span className="text-gray-500">{set.topic}</span>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{set.completedCards}/{set.totalCards} cards</span>
                        </div>
                        <Progress value={(set.completedCards / set.totalCards) * 100} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg text-center border border-blue-200">
                          <p className="text-lg font-bold text-blue-700">{set.totalCards}</p>
                          <p className="text-xs text-blue-600 font-medium">Total Cards</p>
                        </div>
                        <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg text-center border border-green-200">
                          <p className="text-lg font-bold text-green-700">{set.estimatedTime}m</p>
                          <p className="text-xs text-green-600 font-medium">Est. Time</p>
                        </div>
                      </div>

                      <Button 
                        className="w-full group-hover:bg-purple-600 transition-colors duration-300" 
                        onClick={() => handleStudyFlashcard(set.id)}
                      >
                        <Play className="mr-2 h-4 w-4" />
                        Study Flashcards
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </motion.div>

          {/* View All Button */}
          {!showAllCards && filteredSets.length === 6 && (
            <div className="flex justify-center mt-6">
              <Button
                variant="outline"
                onClick={() => setShowAllCards(true)}
                className="group"
              >
                View All Flashcard Sets
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FlashcardsPage;
