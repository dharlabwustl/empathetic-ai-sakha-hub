
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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
  BarChart3,
  Trophy,
  CheckCircle,
  Play,
  RotateCcw
} from 'lucide-react';

const FlashcardsLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  // Mock analytics data
  const analyticsData = {
    totalFlashcards: 425,
    completedSets: 32,
    averageAccuracy: 78,
    studyStreak: 12,
    timeSpent: 180,
    masteryLevel: 85
  };

  // Mock flashcard data by subject
  const flashcardData = {
    physics: {
      total: 150,
      completed: 120,
      inProgress: 20,
      pending: 10,
      sets: [
        {
          id: 1,
          title: "Newton's Laws of Motion",
          cardCount: 25,
          difficulty: "Medium",
          progress: 100,
          mastery: 85,
          lastReviewed: "Today",
          status: "completed"
        },
        {
          id: 2,
          title: "Thermodynamics Basics",
          cardCount: 30,
          difficulty: "Hard",
          progress: 65,
          mastery: 72,
          lastReviewed: "2 days ago",
          status: "in-progress"
        },
        {
          id: 3,
          title: "Wave Motion",
          cardCount: 20,
          difficulty: "Easy",
          progress: 0,
          mastery: 0,
          lastReviewed: "Never",
          status: "pending"
        }
      ]
    },
    chemistry: {
      total: 145,
      completed: 85,
      inProgress: 35,
      pending: 25,
      sets: [
        {
          id: 4,
          title: "Organic Reactions",
          cardCount: 40,
          difficulty: "Hard",
          progress: 100,
          mastery: 92,
          lastReviewed: "Yesterday",
          status: "completed"
        },
        {
          id: 5,
          title: "Periodic Table",
          cardCount: 35,
          difficulty: "Medium",
          progress: 45,
          mastery: 68,
          lastReviewed: "3 days ago",
          status: "in-progress"
        },
        {
          id: 6,
          title: "Chemical Bonding",
          cardCount: 28,
          difficulty: "Medium",
          progress: 0,
          mastery: 0,
          lastReviewed: "Never",
          status: "pending"
        }
      ]
    },
    biology: {
      total: 130,
      completed: 110,
      inProgress: 15,
      pending: 5,
      sets: [
        {
          id: 7,
          title: "Cell Biology",
          cardCount: 45,
          difficulty: "Medium",
          progress: 100,
          mastery: 88,
          lastReviewed: "Today",
          status: "completed"
        },
        {
          id: 8,
          title: "Genetics",
          cardCount: 38,
          difficulty: "Hard",
          progress: 70,
          mastery: 75,
          lastReviewed: "1 day ago",
          status: "in-progress"
        }
      ]
    }
  };

  const subjects = ['all', 'physics', 'chemistry', 'biology'];

  const getFilteredSets = () => {
    let allSets = [];
    
    if (selectedSubject === 'all') {
      allSets = [...flashcardData.physics.sets, ...flashcardData.chemistry.sets, ...flashcardData.biology.sets];
    } else {
      allSets = flashcardData[selectedSubject as keyof typeof flashcardData]?.sets || [];
    }

    if (activeTab !== 'all') {
      allSets = allSets.filter(set => {
        if (activeTab === 'completed') return set.status === 'completed';
        if (activeTab === 'in-progress') return set.status === 'in-progress';
        if (activeTab === 'pending') return set.status === 'pending';
        return true;
      });
    }

    return allSets.filter(set => 
      set.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'; 
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const navigateToFlashcard = (setId: number) => {
    navigate(`/dashboard/student/flashcards/${setId}/interactive`);
  };

  const filteredSets = getFilteredSets();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 dark:from-purple-900/10 dark:via-gray-900 dark:to-blue-900/10">
      <Helmet>
        <title>Flashcards - PREPZR</title>
        <meta name="description" content="NEET flashcards for quick review and memorization" />
      </Helmet>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Enhanced Header */}
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
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Smart Flashcards
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">NEET 2026 Preparation</p>
            </div>
          </div>
        </motion.div>

        {/* Analytics Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8"
        >
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all">
            <CardContent className="p-4 text-center">
              <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-800">{analyticsData.totalFlashcards}</p>
              <p className="text-sm text-blue-600 font-medium">Total Cards</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all">
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-800">{analyticsData.completedSets}</p>
              <p className="text-sm text-green-600 font-medium">Completed</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-800">{analyticsData.averageAccuracy}%</p>
              <p className="text-sm text-purple-600 font-medium">Accuracy</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all">
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-orange-800">{analyticsData.studyStreak}</p>
              <p className="text-sm text-orange-600 font-medium">Day Streak</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:shadow-lg transition-all">
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-indigo-800">{analyticsData.timeSpent}m</p>
              <p className="text-sm text-indigo-600 font-medium">Time Spent</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200 hover:shadow-lg transition-all">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-pink-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-pink-800">{analyticsData.masteryLevel}%</p>
              <p className="text-sm text-pink-600 font-medium">Mastery</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search flashcard sets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/70 backdrop-blur-sm border-gray-200"
            />
          </div>
          
          <div className="flex gap-2">
            {subjects.map((subject) => (
              <Button
                key={subject}
                variant={selectedSubject === subject ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSubject(subject)}
                className="capitalize bg-white/70 backdrop-blur-sm"
              >
                {subject}
              </Button>
            ))}
          </div>
          
          <Button className="gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Plus className="h-4 w-4" />
            Create Set
          </Button>
        </motion.div>

        {/* Subject Progress Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {Object.entries(flashcardData).map(([subject, data]) => (
            <Card key={subject} className="bg-white/70 backdrop-blur-sm border-gray-200 hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="capitalize text-lg font-bold">{subject}</span>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {data.total} cards
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-semibold">{Math.round((data.completed / data.total) * 100)}%</span>
                  </div>
                  <Progress value={(data.completed / data.total) * 100} className="h-2" />
                  
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-green-50 p-2 rounded">
                      <div className="font-bold text-green-700">{data.completed}</div>
                      <div className="text-green-600">Completed</div>
                    </div>
                    <div className="bg-blue-50 p-2 rounded">
                      <div className="font-bold text-blue-700">{data.inProgress}</div>
                      <div className="text-blue-600">In Progress</div>
                    </div>
                    <div className="bg-orange-50 p-2 rounded">
                      <div className="font-bold text-orange-700">{data.pending}</div>
                      <div className="text-orange-600">Pending</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm p-1 rounded-lg border">
            <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              All ({Object.values(flashcardData).reduce((acc, subject) => acc + subject.sets.length, 0)})
            </TabsTrigger>
            <TabsTrigger value="pending" className="rounded-md data-[state=active]:bg-orange-600 data-[state=active]:text-white">
              Pending ({Object.values(flashcardData).reduce((acc, subject) => acc + subject.sets.filter(s => s.status === 'pending').length, 0)})
            </TabsTrigger>
            <TabsTrigger value="in-progress" className="rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              In Progress ({Object.values(flashcardData).reduce((acc, subject) => acc + subject.sets.filter(s => s.status === 'in-progress').length, 0)})
            </TabsTrigger>
            <TabsTrigger value="completed" className="rounded-md data-[state=active]:bg-green-600 data-[state=active]:text-white">
              Completed ({Object.values(flashcardData).reduce((acc, subject) => acc + subject.sets.filter(s => s.status === 'completed').length, 0)})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
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
                    className="h-full hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-l-purple-500 bg-white/70 backdrop-blur-sm"
                    onClick={() => navigateToFlashcard(set.id)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg font-semibold line-clamp-2">
                          {set.title}
                        </CardTitle>
                        <div className="flex gap-1">
                          <Badge variant="outline" className={getDifficultyColor(set.difficulty)}>
                            {set.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <Badge variant="outline" className={getStatusColor(set.status)}>
                        {set.status.replace('-', ' ')}
                      </Badge>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{set.cardCount} cards</span>
                        <span className="text-gray-600">Last: {set.lastReviewed}</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Progress</span>
                          <span className="text-sm font-bold text-blue-600">{set.progress}%</span>
                        </div>
                        <Progress value={set.progress} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Mastery</span>
                          <span className="text-sm font-bold text-purple-600">{set.mastery}%</span>
                        </div>
                        <Progress value={set.mastery} className="h-2 bg-purple-100" />
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        {set.status === 'completed' ? (
                          <Button 
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateToFlashcard(set.id);
                            }}
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Review Again
                          </Button>
                        ) : (
                          <Button 
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateToFlashcard(set.id);
                            }}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            {set.status === 'pending' ? 'Start Review' : 'Continue'}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredSets.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No flashcard sets found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Set
                </Button>
              </motion.div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FlashcardsLandingPage;
