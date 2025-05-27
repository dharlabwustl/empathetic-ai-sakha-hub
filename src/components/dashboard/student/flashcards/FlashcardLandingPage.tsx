
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
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
  CheckCircle
} from 'lucide-react';
import OverviewSection from '@/components/dashboard/student/OverviewSection';

const FlashcardLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [activeTab, setActiveTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState<'today' | 'pending' | 'completed'>('today');

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
      status: 'today'
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
      status: 'pending'
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
      status: 'completed'
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
      status: 'today'
    }
  ];

  const subjects = ['all', 'Physics', 'Chemistry', 'Biology'];

  // Count sets by status for each subject
  const getStatusCounts = () => {
    const counts = { today: 0, pending: 0, completed: 0 };
    
    flashcardSets.forEach(set => {
      if (selectedSubject === 'all' || set.subject === selectedSubject) {
        if (set.status === 'completed') {
          counts.completed++;
        } else if (set.status === 'today') {
          counts.today++;
        } else {
          counts.pending++;
        }
      }
    });
    
    return counts;
  };

  const statusCounts = getStatusCounts();

  const filteredSets = flashcardSets.filter(set => {
    const matchesSearch = set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         set.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || set.subject === selectedSubject;
    const matchesStatus = set.status === statusFilter;
    return matchesSearch && matchesSubject && matchesStatus;
  });

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

  // FIXED: Direct navigation to interactive flashcards
  const navigateToFlashcard = (setId: number) => {
    const targetRoute = `/dashboard/student/flashcards/${setId}/interactive`;
    console.log(`🔥🔥🔥 NAVIGATION TO INTERACTIVE FLASHCARDS: ${targetRoute}`);
    navigate(targetRoute);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 dark:from-purple-900/10 dark:via-gray-900 dark:to-blue-900/10">
      <Helmet>
        <title>Flashcards - PREPZR</title>
        <meta name="description" content="NEET flashcards for quick review and memorization" />
      </Helmet>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Enhanced Hero Section */}
        <motion.div 
          className="text-center space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full shadow-lg">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Smart Flashcards
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master concepts with our AI-powered spaced repetition system designed for optimal retention
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="flex items-center gap-3 text-purple-600 bg-purple-50 px-4 py-2 rounded-full">
              <Zap className="h-5 w-5" />
              <span className="font-medium">Smart Algorithm</span>
            </div>
            <div className="flex items-center gap-3 text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
              <Target className="h-5 w-5" />
              <span className="font-medium">Adaptive Learning</span>
            </div>
            <div className="flex items-center gap-3 text-green-600 bg-green-50 px-4 py-2 rounded-full">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium">Progress Tracking</span>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/70 backdrop-blur-sm border border-gray-200/50 shadow-lg">
            <TabsTrigger value="overview" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              Overview
            </TabsTrigger>
            <TabsTrigger value="all-flashcards" className="data-[state=active]:bg-white data-[state=active]:shadow-md">
              All Flashcards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <OverviewSection {...overviewData} />
          </TabsContent>

          <TabsContent value="all-flashcards" className="mt-8 space-y-8">
            {/* Enhanced Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-xl"
            >
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input 
                    placeholder="Search flashcard sets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/90 border-gray-200/50"
                  />
                </div>
                
                {/* Status Filter Tabs */}
                <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
                  <TabsList className="bg-gray-100/80">
                    <TabsTrigger value="today" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Today
                      <Badge variant="secondary" className="ml-1 bg-blue-100 text-blue-700">
                        {statusCounts.today}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="pending" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Pending
                      <Badge variant="secondary" className="ml-1 bg-orange-100 text-orange-700">
                        {statusCounts.pending}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="completed" className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Completed
                      <Badge variant="secondary" className="ml-1 bg-green-100 text-green-700">
                        {statusCounts.completed}
                      </Badge>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Button className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Plus className="h-4 w-4" />
                  Create Set
                </Button>
              </div>

              {/* Subject Filter */}
              <div className="mt-6">
                <div className="flex gap-2 flex-wrap">
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
              </div>
            </motion.div>

            {/* Enhanced Flashcard Sets Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredSets.map((set, index) => (
                <motion.div
                  key={set.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card 
                    className="h-full hover:shadow-2xl transition-all duration-300 cursor-pointer border-l-4 border-l-purple-500 bg-white/80 backdrop-blur-sm"
                    onClick={() => navigateToFlashcard(set.id)}
                  >
                    <CardHeader className="pb-3 bg-gradient-to-r from-purple-50/50 to-blue-50/50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold line-clamp-2 mb-2">
                            {set.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mb-3">{set.topic}</p>
                        </div>
                        <Badge variant="outline" className={getDifficultyColor(set.difficulty)}>
                          {set.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {set.cardCount} cards
                        </span>
                        <span className="text-gray-600 flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          ~{set.estimatedTime} min
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Mastery Level</span>
                          <span className={`text-sm font-bold ${getMasteryColor(set.masteryLevel)}`}>
                            {set.masteryLevel}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-500 ${
                              set.masteryLevel >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                              set.masteryLevel >= 60 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                              'bg-gradient-to-r from-red-400 to-red-600'
                            }`}
                            style={{ width: `${set.masteryLevel}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>Last: {set.lastReviewed}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs bg-gray-100">
                          {set.subject}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToFlashcard(set.id);
                          }}
                          className="hover:bg-purple-50"
                        >
                          Quick Review
                        </Button>
                        <Button 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateToFlashcard(set.id);
                          }}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        >
                          Study Cards
                        </Button>
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToFlashcard(set.id);
                        }}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        Start Review
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* No flashcard sets found section */}
            {filteredSets.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-xl max-w-md mx-auto">
                  <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No flashcard sets found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search terms or filters</p>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Set
                  </Button>
                </div>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FlashcardLandingPage;
