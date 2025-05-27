import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  Filter
} from 'lucide-react';
import OverviewSection from '@/components/dashboard/student/OverviewSection';

const FlashcardLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

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
      estimatedTime: 25
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
      estimatedTime: 30
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
      estimatedTime: 20
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
      estimatedTime: 18
    }
  ];

  const subjects = ['all', 'Physics', 'Chemistry', 'Biology'];

  const filteredSets = flashcardSets.filter(set => {
    const matchesSearch = set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         set.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || set.subject === selectedSubject;
    return matchesSearch && matchesSubject;
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

  // Fixed routing function to navigate to interactive flashcard page
  const handleStartReview = (setId: number) => {
    navigate(`/dashboard/student/flashcards/${setId}/interactive`);
  };

  const handleCardClick = (setId: number) => {
    navigate(`/dashboard/student/flashcards/${setId}/interactive`);
  };

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
          
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-purple-600">
              <Zap className="h-5 w-5" />
              <span className="font-medium">Smart Algorithm</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <Target className="h-5 w-5" />
              <span className="font-medium">Adaptive Learning</span>
            </div>
            <div className="flex items-center gap-2 text-green-600">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium">Progress Tracking</span>
            </div>
          </div>
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

        {/* Flashcard Sets Grid */}
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
              <Card className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-purple-500"
                    onClick={() => handleCardClick(set.id)}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold line-clamp-2">
                        {set.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{set.topic}</p>
                    </div>
                    <Badge variant="outline" className={getDifficultyColor(set.difficulty)}>
                      {set.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{set.cardCount} cards</span>
                    <span className="text-gray-600">~{set.estimatedTime} min</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Mastery Level</span>
                      <span className={`text-sm font-bold ${getMasteryColor(set.masteryLevel)}`}>
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
                  
                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>Last: {set.lastReviewed}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {set.subject}
                    </Badge>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartReview(set.id);
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

        {filteredSets.length === 0 && (
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
      </div>
    </div>
  );
};

export default FlashcardLandingPage;
