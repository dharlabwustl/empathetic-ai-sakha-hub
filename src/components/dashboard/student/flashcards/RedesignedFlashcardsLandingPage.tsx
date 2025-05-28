
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  CheckCircle,
  AlertCircle,
  PlayCircle
} from 'lucide-react';
import OverviewSection from '@/components/dashboard/student/OverviewSection';

const RedesignedFlashcardsLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

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
      id: '1',
      title: "Physics Formulas & Constants",
      subject: "Physics",
      cardCount: 45,
      difficulty: "Medium",
      lastReviewed: "2 days ago",
      masteryLevel: 85,
      topic: "Mechanics, Thermodynamics",
      estimatedTime: 25,
      examType: "NEET",
      status: "in-progress"
    },
    {
      id: '2',
      title: "Organic Chemistry Reactions",
      subject: "Chemistry", 
      cardCount: 32,
      difficulty: "Hard",
      lastReviewed: "1 day ago",
      masteryLevel: 65,
      topic: "Reaction Mechanisms",
      estimatedTime: 30,
      examType: "NEET",
      status: "pending"
    },
    {
      id: '3',
      title: "Human Anatomy Systems",
      subject: "Biology",
      cardCount: 38,
      difficulty: "Medium",
      lastReviewed: "Today",
      masteryLevel: 92,
      topic: "Circulatory, Respiratory",
      estimatedTime: 20,
      examType: "NEET",
      status: "completed"
    },
    {
      id: '4',
      title: "Chemical Bonding Concepts",
      subject: "Chemistry",
      cardCount: 28,
      difficulty: "Easy",
      lastReviewed: "3 days ago", 
      masteryLevel: 78,
      topic: "Ionic, Covalent Bonds",
      estimatedTime: 18,
      examType: "NEET",
      status: "in-progress"
    }
  ];

  const subjects = ['all', 'Physics', 'Chemistry', 'Biology'];

  const getFilteredSets = () => {
    return flashcardSets.filter(set => {
      const matchesSearch = set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           set.topic.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject === 'all' || set.subject === selectedSubject;
      const matchesTab = activeTab === 'all' || set.status === activeTab;
      return matchesSearch && matchesSubject && matchesTab;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'; 
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <PlayCircle className="h-4 w-4 text-blue-600" />;
      case 'pending': return <AlertCircle className="h-4 w-4 text-gray-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getMasteryColor = (level: number) => {
    if (level >= 80) return 'text-green-600';
    if (level >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const navigateToFlashcard = (setId: string) => {
    const targetRoute = `/dashboard/student/flashcards/${setId}/interactive`;
    console.log(`🔥 NAVIGATION TO INTERACTIVE FLASHCARDS: ${targetRoute}`);
    navigate(targetRoute);
  };

  const getTabCounts = () => {
    const filtered = flashcardSets.filter(set => {
      const matchesSubject = selectedSubject === 'all' || set.subject === selectedSubject;
      return matchesSubject;
    });
    
    return {
      all: filtered.length,
      pending: filtered.filter(s => s.status === 'pending').length,
      'in-progress': filtered.filter(s => s.status === 'in-progress').length,
      completed: filtered.filter(s => s.status === 'completed').length
    };
  };

  const tabCounts = getTabCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 dark:from-purple-900/10 dark:via-gray-900 dark:to-blue-900/10">
      <Helmet>
        <title>Flashcards - PREPZR</title>
        <meta name="description" content="NEET flashcards for quick review and memorization" />
      </Helmet>

      {/* Overview Section */}
      <div className="p-6">
        <OverviewSection {...overviewData} />
      </div>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Smart Flashcards
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Quick review sessions with spaced repetition algorithm for optimal retention
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search flashcard sets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
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
          
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Set
          </Button>
        </motion.div>

        {/* Status Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white dark:bg-gray-800 p-1 rounded-lg shadow-sm">
              <TabsTrigger value="all" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white">
                All ({tabCounts.all})
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                Pending ({tabCounts.pending})
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                In Progress ({tabCounts['in-progress']})
              </TabsTrigger>
              <TabsTrigger value="completed" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                Completed ({tabCounts.completed})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {/* Flashcard Sets Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {getFilteredSets().map((set, index) => (
                  <motion.div
                    key={set.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="w-full"
                  >
                    <Card 
                      className="h-80 w-full flex flex-col hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-purple-500"
                      onClick={() => navigateToFlashcard(set.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-base font-semibold line-clamp-2">
                            {set.title}
                          </CardTitle>
                          <Badge variant="outline" className={getDifficultyColor(set.difficulty)}>
                            {set.difficulty}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">
                            {set.subject}
                          </Badge>
                          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 text-xs flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {set.examType}
                          </Badge>
                          <Badge variant="outline" className="text-xs flex items-center gap-1">
                            {getStatusIcon(set.status)}
                            {set.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{set.topic}</p>
                      </CardHeader>
                      
                      <CardContent className="space-y-3 flex-grow">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600">{set.cardCount} cards</span>
                          <span className="text-gray-600 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {set.estimatedTime}m
                          </span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium">Mastery Level</span>
                            <span className={`text-xs font-bold ${getMasteryColor(set.masteryLevel)}`}>
                              {set.masteryLevel}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${
                                set.masteryLevel >= 80 ? 'bg-green-500' :
                                set.masteryLevel >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${set.masteryLevel}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs text-gray-500 pt-2 border-t">
                          <Clock className="h-3 w-3" />
                          <span>Last: {set.lastReviewed}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateToFlashcard(set.id);
                            }}
                            className="text-xs"
                          >
                            <Zap className="h-3 w-3 mr-1" />
                            Quick
                          </Button>
                          <Button 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateToFlashcard(set.id);
                            }}
                            className="text-xs bg-purple-600 hover:bg-purple-700"
                          >
                            <BookOpen className="h-3 w-3 mr-1" />
                            Study
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* No flashcard sets found */}
              {getFilteredSets().length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No flashcard sets found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Set
                  </Button>
                </motion.div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default RedesignedFlashcardsLandingPage;
