
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Search, 
  Plus, 
  BookOpen, 
  Zap, 
  Target,
  Clock,
  TrendingUp,
  Star,
  Filter,
  Play,
  BarChart3
} from 'lucide-react';
import OverviewSection from '@/components/dashboard/student/OverviewSection';

const FlashcardLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'today' | 'pending' | 'completed'>('today');

  console.log('🚨 FLASHCARD LANDING PAGE - Component loaded');
  console.log('🚨 Current window location:', window.location.href);

  const overviewData = {
    type: "Flashcards" as const,
    title: "NEET Flashcards Overview",
    subjects: [
      { name: "Physics", completed: 120, total: 150, progress: 80, efficiency: 85, studyTime: 95 },
      { name: "Chemistry", completed: 85, total: 130, progress: 65, efficiency: 78, studyTime: 75 },
      { name: "Biology", completed: 140, total: 160, progress: 88, efficiency: 90, studyTime: 110 }
    ],
    totalStudyTime: 280,
    overallProgress: 78,
    suggestions: [
      "Review Chemistry organic reactions flashcards more frequently",
      "Physics formula cards show excellent retention - keep practicing",
      "Biology classification cards need daily review for better recall"
    ]
  };

  const flashcardSets = [
    {
      id: 1,
      title: "Physics Formulas & Constants",
      subject: "Physics",
      cardCount: 45,
      difficulty: "Medium",
      lastReviewed: "2 days ago",
      masteryLevel: 85,
      topic: "Mechanics, Thermodynamics",
      estimatedTime: 25,
      status: 'today' as const
    },
    {
      id: 2,
      title: "Organic Chemistry Reactions",
      subject: "Chemistry", 
      cardCount: 32,
      difficulty: "Hard",
      lastReviewed: "1 day ago",
      masteryLevel: 65,
      topic: "Reaction Mechanisms",
      estimatedTime: 30,
      status: 'pending' as const
    },
    {
      id: 3,
      title: "Human Anatomy Systems",
      subject: "Biology",
      cardCount: 38,
      difficulty: "Medium",
      lastReviewed: "Today",
      masteryLevel: 92,
      topic: "Circulatory, Respiratory",
      estimatedTime: 20,
      status: 'completed' as const
    },
    {
      id: 4,
      title: "Chemical Bonding Concepts",
      subject: "Chemistry",
      cardCount: 28,
      difficulty: "Easy",
      lastReviewed: "3 days ago", 
      masteryLevel: 78,
      topic: "Ionic, Covalent Bonds",
      estimatedTime: 18,
      status: 'today' as const
    }
  ];

  const subjects = ['all', 'Physics', 'Chemistry', 'Biology'];

  const filteredSets = flashcardSets.filter(set => {
    const matchesSearch = set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         set.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || set.subject === selectedSubject;
    const matchesStatus = set.status === statusFilter;
    return matchesSearch && matchesSubject && matchesStatus;
  });

  const getStatusCounts = () => {
    return {
      today: flashcardSets.filter(set => set.status === 'today').length,
      pending: flashcardSets.filter(set => set.status === 'pending').length,
      completed: flashcardSets.filter(set => set.status === 'completed').length
    };
  };

  const statusCounts = getStatusCounts();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'; 
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getMasteryColor = (level: number) => {
    if (level >= 80) return 'text-green-600';
    if (level >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  // FIXED: ALL FLASHCARD NAVIGATION GOES TO /interactive
  const navigateToFlashcard = (setId: number) => {
    const targetRoute = `/dashboard/student/flashcards/${setId}/interactive`;
    console.log(`🔥🔥🔥 NAVIGATION TO INTERACTIVE FLASHCARDS: ${targetRoute}`);
    console.log(`🔥🔥🔥 SET ID: ${setId}`);
    navigate(targetRoute);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 dark:from-purple-900/10 dark:via-gray-900 dark:to-blue-900/10">
      <Helmet>
        <title>Flashcards - PREPZR</title>
        <meta name="description" content="NEET flashcards for quick review and memorization" />
      </Helmet>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Enhanced Header */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl shadow-lg">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                Smart Flashcard Hub
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                Quick review sessions with spaced repetition algorithm for optimal retention
              </p>
            </div>
            <Badge variant="outline" className="bg-white text-purple-700 border-purple-200 px-3 py-1">
              <BarChart3 className="h-3 w-3 mr-1" />
              78% Overall Progress
            </Badge>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-purple-600 bg-white/70 px-3 py-2 rounded-lg">
              <Zap className="h-5 w-5" />
              <span className="font-medium">Smart Algorithm</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600 bg-white/70 px-3 py-2 rounded-lg">
              <Target className="h-5 w-5" />
              <span className="font-medium">Adaptive Learning</span>
            </div>
            <div className="flex items-center gap-2 text-green-600 bg-white/70 px-3 py-2 rounded-lg">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium">Progress Tracking</span>
            </div>
          </div>
        </div>

        {/* Overview Section */}
        <OverviewSection {...overviewData} />

        {/* Enhanced Search and Filters */}
        <Card className="shadow-sm border-2">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  placeholder="Search flashcard sets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 focus:border-purple-300"
                />
              </div>
              
              <div className="flex gap-2">
                {subjects.map((subject) => (
                  <Button
                    key={subject}
                    variant={selectedSubject === subject ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSubject(subject)}
                    className="capitalize"
                  >
                    {subject}
                  </Button>
                ))}
              </div>
              
              <Button className="gap-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                <Plus className="h-4 w-4" />
                Create Set
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Status Tabs */}
        <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
          <TabsList className="bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 p-1 rounded-lg shadow-sm">
            <TabsTrigger value="today" className="relative">
              <Clock className="h-4 w-4 mr-2" />
              Today
              <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700">
                {statusCounts.today}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="relative">
              <Target className="h-4 w-4 mr-2" />
              Pending
              <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-700">
                {statusCounts.pending}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="relative">
              <BookOpen className="h-4 w-4 mr-2" />
              Completed
              <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">
                {statusCounts.completed}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Enhanced Flashcard Sets Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSets.map((set, index) => (
            <motion.div
              key={set.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card 
                className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-l-purple-500 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
                onClick={() => {
                  console.log(`🔥🔥🔥 CARD CLICKED - SET ID: ${set.id}`);
                  navigateToFlashcard(set.id);
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold line-clamp-2 text-gray-900 dark:text-white">
                        {set.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{set.topic}</p>
                    </div>
                    <Badge variant="outline" className={getDifficultyColor(set.difficulty)}>
                      {set.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {set.cardCount} cards
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      ~{set.estimatedTime} min
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Mastery Level</span>
                      <span className={`text-sm font-bold ${getMasteryColor(set.masteryLevel)}`}>
                        {set.masteryLevel}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          set.masteryLevel >= 80 ? 'bg-gradient-to-r from-green-400 to-green-500' :
                          set.masteryLevel >= 60 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-gradient-to-r from-red-400 to-red-500'
                        }`}
                        style={{ width: `${set.masteryLevel}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>Last: {set.lastReviewed}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                      {set.subject}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`🔥🔥🔥 QUICK REVIEW BUTTON CLICKED - SET ID: ${set.id}`);
                        navigateToFlashcard(set.id);
                      }}
                      className="hover:bg-purple-50 hover:border-purple-300"
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Quick Review
                    </Button>
                    <Button 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(`🔥🔥🔥 STUDY CARDS BUTTON CLICKED - SET ID: ${set.id}`);
                        navigateToFlashcard(set.id);
                      }}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    >
                      Study Cards
                    </Button>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`🔥🔥🔥 START REVIEW BUTTON CLICKED - SET ID: ${set.id}`);
                      navigateToFlashcard(set.id);
                    }}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Start Review Session
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced No Results State */}
        {filteredSets.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8 border-2 border-dashed border-gray-200 dark:border-gray-700">
              <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No flashcard sets found</h3>
              <p className="text-gray-500 dark:text-gray-500 mb-4">
                {searchTerm ? 'Try adjusting your search terms' : `No ${statusFilter} flashcard sets available`}
              </p>
              <Button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Set
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FlashcardLandingPage;
