import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  BookOpen, 
  Plus, 
  Search, 
  Filter, 
  Play, 
  BarChart3,
  Clock,
  Target,
  Star,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Brain,
  Zap
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const FlashcardsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  // Enhanced subject data with topic breakdown and weightage
  const subjectData = [
    {
      subject: 'Physics',
      totalSets: 12,
      masteredSets: 8,
      inProgressSets: 3,
      newSets: 1,
      accuracy: 87,
      studyTime: '32h 45m',
      color: 'bg-blue-500',
      weightage: 25,
      topics: [
        { 
          name: 'Mechanics', 
          sets: 4, 
          mastered: 3, 
          accuracy: 92,
          weightage: 8,
          priority: 'high',
          subtopics: [
            { name: 'Newton\'s Laws', accuracy: 95, weightage: 3, difficulty: 'medium' },
            { name: 'Work & Energy', accuracy: 88, weightage: 3, difficulty: 'hard' },
            { name: 'Momentum', accuracy: 92, weightage: 2, difficulty: 'medium' }
          ]
        },
        { 
          name: 'Thermodynamics', 
          sets: 3, 
          mastered: 2, 
          accuracy: 82,
          weightage: 6,
          priority: 'medium',
          subtopics: [
            { name: 'Laws of Thermodynamics', accuracy: 80, weightage: 4, difficulty: 'hard' },
            { name: 'Heat Engines', accuracy: 84, weightage: 2, difficulty: 'medium' }
          ]
        },
        { 
          name: 'Electromagnetism', 
          sets: 5, 
          mastered: 3, 
          accuracy: 79,
          weightage: 7,
          priority: 'high',
          subtopics: [
            { name: 'Electric Field', accuracy: 85, weightage: 3, difficulty: 'medium' },
            { name: 'Magnetic Field', accuracy: 72, weightage: 2, difficulty: 'hard' },
            { name: 'EM Induction', accuracy: 80, weightage: 2, difficulty: 'hard' }
          ]
        }
      ]
    },
    {
      subject: 'Chemistry',
      totalSets: 15,
      masteredSets: 11,
      inProgressSets: 3,
      newSets: 1,
      accuracy: 91,
      studyTime: '41h 20m',
      color: 'bg-green-500',
      weightage: 25,
      topics: [
        { 
          name: 'Organic Chemistry', 
          sets: 6, 
          mastered: 5, 
          accuracy: 89,
          weightage: 10,
          priority: 'high',
          subtopics: [
            { name: 'Hydrocarbons', accuracy: 92, weightage: 4, difficulty: 'medium' },
            { name: 'Functional Groups', accuracy: 87, weightage: 3, difficulty: 'hard' },
            { name: 'Biomolecules', accuracy: 88, weightage: 3, difficulty: 'medium' }
          ]
        },
        { 
          name: 'Inorganic Chemistry', 
          sets: 5, 
          mastered: 3, 
          accuracy: 85,
          weightage: 8,
          priority: 'medium',
          subtopics: [
            { name: 'Periodic Table', accuracy: 95, weightage: 3, difficulty: 'easy' },
            { name: 'Chemical Bonding', accuracy: 82, weightage: 3, difficulty: 'hard' },
            { name: 'Coordination Compounds', accuracy: 78, weightage: 2, difficulty: 'hard' }
          ]
        },
        { 
          name: 'Physical Chemistry', 
          sets: 4, 
          mastered: 3, 
          accuracy: 93,
          weightage: 7,
          priority: 'high',
          subtopics: [
            { name: 'Chemical Kinetics', accuracy: 94, weightage: 3, difficulty: 'hard' },
            { name: 'Equilibrium', accuracy: 91, weightage: 2, difficulty: 'medium' },
            { name: 'Electrochemistry', accuracy: 95, weightage: 2, difficulty: 'hard' }
          ]
        }
      ]
    },
    {
      subject: 'Biology',
      totalSets: 18,
      masteredSets: 14,
      inProgressSets: 3,
      newSets: 1,
      accuracy: 94,
      studyTime: '48h 15m',
      color: 'bg-purple-500',
      weightage: 50,
      topics: [
        { 
          name: 'Cell Biology', 
          sets: 6, 
          mastered: 6, 
          accuracy: 96,
          weightage: 15,
          priority: 'high',
          subtopics: [
            { name: 'Cell Structure', accuracy: 98, weightage: 6, difficulty: 'easy' },
            { name: 'Cell Division', accuracy: 94, weightage: 5, difficulty: 'medium' },
            { name: 'Cell Cycle', accuracy: 96, weightage: 4, difficulty: 'medium' }
          ]
        },
        { 
          name: 'Genetics', 
          sets: 7, 
          mastered: 5, 
          accuracy: 88,
          weightage: 18,
          priority: 'high',
          subtopics: [
            { name: 'Mendel\'s Laws', accuracy: 92, weightage: 6, difficulty: 'medium' },
            { name: 'Molecular Genetics', accuracy: 85, weightage: 7, difficulty: 'hard' },
            { name: 'Biotechnology', accuracy: 87, weightage: 5, difficulty: 'hard' }
          ]
        },
        { 
          name: 'Ecology', 
          sets: 5, 
          mastered: 3, 
          accuracy: 90,
          weightage: 17,
          priority: 'medium',
          subtopics: [
            { name: 'Ecosystem', accuracy: 93, weightage: 8, difficulty: 'medium' },
            { name: 'Biodiversity', accuracy: 89, weightage: 5, difficulty: 'easy' },
            { name: 'Environmental Issues', accuracy: 88, weightage: 4, difficulty: 'medium' }
          ]
        }
      ]
    }
  ];

  const flashcardSets = [
    {
      id: '1',
      title: 'Physics Fundamentals',
      subject: 'Physics',
      totalCards: 45,
      masteredCards: 32,
      difficulty: 'medium',
      accuracy: 87,
      lastStudied: '2 hours ago',
      estimatedTime: 25,
      streak: 5
    },
    {
      id: '2',
      title: 'Chemical Bonding',
      subject: 'Chemistry',
      totalCards: 38,
      masteredCards: 15,
      difficulty: 'hard',
      accuracy: 74,
      lastStudied: '1 day ago',
      estimatedTime: 35,
      streak: 3
    },
    {
      id: '3',
      title: 'Cell Biology',
      subject: 'Biology',
      totalCards: 52,
      masteredCards: 48,
      difficulty: 'easy',
      accuracy: 94,
      lastStudied: '3 hours ago',
      estimatedTime: 20,
      streak: 8
    },
    {
      id: '4',
      title: 'Calculus Basics',
      subject: 'Mathematics',
      totalCards: 29,
      masteredCards: 12,
      difficulty: 'hard',
      accuracy: 68,
      lastStudied: '5 days ago',
      estimatedTime: 40,
      streak: 1
    }
  ];

  const stats = {
    totalSets: flashcardSets.length,
    totalCards: flashcardSets.reduce((sum, set) => sum + set.totalCards, 0),
    masteredCards: flashcardSets.reduce((sum, set) => sum + set.masteredCards, 0),
    averageAccuracy: Math.round(flashcardSets.reduce((sum, set) => sum + set.accuracy, 0) / flashcardSets.length),
    studyStreak: 7,
    weeklyGoal: 200,
    weeklyProgress: 156
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      'Physics': 'bg-blue-50 text-blue-700 border-blue-200',
      'Chemistry': 'bg-purple-50 text-purple-700 border-purple-200',
      'Biology': 'bg-green-50 text-green-700 border-green-200',
      'Mathematics': 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return colors[subject as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStudySet = (setId: string) => {
    navigate(`/dashboard/student/flashcards/${setId}/interactive`);
  };

  const toggleSubjectExpansion = (subject: string) => {
    setExpandedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const filteredSets = flashcardSets.filter(set => {
    const matchesSearch = set.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         set.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'needs-review' && set.accuracy < 80) ||
                         (selectedFilter === 'mastered' && set.accuracy >= 90) ||
                         (selectedFilter === set.subject.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Flashcards Studio
            </h1>
            <p className="text-gray-600 mt-2">Master concepts through spaced repetition and active recall</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/dashboard/student/flashcards/create')} className="bg-gradient-to-r from-violet-600 to-blue-600">
              <Plus className="h-4 w-4 mr-2" />
              Create New Set
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard/student/flashcards/1/interactive')}>
              <Play className="h-4 w-4 mr-2" />
              Quick Study
            </Button>
          </div>
        </motion.div>

        {/* Subject Overview with Topic Breakdown */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {subjectData.map((subject) => (
            <Card key={subject.subject} className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold">{subject.subject}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                      {subject.weightage}% weightage
                    </Badge>
                    <div className={`w-4 h-4 rounded-full ${subject.color}`}></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Stats */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 bg-green-50 rounded-lg text-center border border-green-200">
                    <p className="text-lg font-bold text-green-700">{subject.masteredSets}</p>
                    <p className="text-xs text-green-600 font-medium">Mastered</p>
                  </div>
                  <div className="p-2 bg-yellow-50 rounded-lg text-center border border-yellow-200">
                    <p className="text-lg font-bold text-yellow-700">{subject.inProgressSets}</p>
                    <p className="text-xs text-yellow-600 font-medium">In Progress</p>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg text-center border border-blue-200">
                    <p className="text-lg font-bold text-blue-700">{subject.newSets}</p>
                    <p className="text-xs text-blue-600 font-medium">New</p>
                  </div>
                </div>

                {/* Weightage Analysis */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <BarChart3 className="h-4 w-4" />
                      Weightage Distribution
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {subject.topics.slice(0, 2).map((topic) => (
                      <div key={topic.name} className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">{topic.name}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-16 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${subject.color}`}
                              style={{ width: `${(topic.weightage / subject.weightage) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium">{topic.weightage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Topic Breakdown */}
                <Collapsible 
                  open={expandedSubjects.includes(subject.subject)} 
                  onOpenChange={() => toggleSubjectExpansion(subject.subject)}
                >
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full justify-between p-2">
                      <span className="text-sm font-medium flex items-center gap-1">
                        <Target className="h-4 w-4" />
                        Topic Breakdown
                      </span>
                      {expandedSubjects.includes(subject.subject) ? 
                        <ChevronUp className="h-4 w-4" /> : 
                        <ChevronDown className="h-4 w-4" />
                      }
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-3 mt-2">
                    {subject.topics.map((topic) => (
                      <div key={topic.name} className="border rounded-lg p-3 bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-medium text-sm">{topic.name}</h5>
                          <div className="flex items-center gap-1">
                            <Badge variant="outline" className={getPriorityColor(topic.priority)} size="sm">
                              {topic.priority}
                            </Badge>
                            <Badge variant="outline" size="sm">
                              {topic.weightage}%
                            </Badge>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs mb-2">
                          <span>Sets: {topic.sets} | Mastered: {topic.mastered}</span>
                          <span>Accuracy: {topic.accuracy}%</span>
                        </div>
                        <Progress value={topic.accuracy} className="h-2 mb-2" />
                        <div className="space-y-1">
                          {topic.subtopics.map((subtopic, index) => (
                            <div key={index} className="flex justify-between items-center text-xs">
                              <span className="text-gray-600">{subtopic.name}</span>
                              <div className="flex items-center gap-2">
                                <span className={`px-1.5 py-0.5 rounded text-xs ${getDifficultyColor(subtopic.difficulty)}`}>
                                  {subtopic.difficulty}
                                </span>
                                <span className="font-medium">{subtopic.accuracy}%</span>
                                <span className="text-gray-500">({subtopic.weightage}%)</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </CollapsibleContent>
                </Collapsible>

                <Button className="w-full bg-gradient-to-r from-violet-600 to-blue-600" size="sm">
                  <Play className="mr-2 h-4 w-4" />
                  Study {subject.subject}
                </Button>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-violet-600">{stats.totalSets}</div>
              <div className="text-sm text-gray-600">Sets</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalCards}</div>
              <div className="text-sm text-gray-600">Total Cards</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.masteredCards}</div>
              <div className="text-sm text-gray-600">Mastered</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{stats.averageAccuracy}%</div>
              <div className="text-sm text-gray-600">Accuracy</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.studyStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.weeklyProgress}</div>
              <div className="text-sm text-gray-600">Weekly Goal</div>
              <Progress value={(stats.weeklyProgress / stats.weeklyGoal) * 100} className="h-1 mt-1" />
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search flashcard sets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'physics', 'chemistry', 'biology', 'mathematics', 'needs-review', 'mastered'].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className={selectedFilter === filter ? "bg-gradient-to-r from-violet-600 to-blue-600" : "bg-white/80 backdrop-blur-sm border-0 shadow-lg"}
              >
                <Filter className="h-3 w-3 mr-1" />
                {filter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Flashcard Sets Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredSets.map((set, index) => (
            <motion.div
              key={set.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => handleStudySet(set.id)}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="bg-gradient-to-r from-violet-500 to-blue-500 h-2"></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-violet-600 transition-colors">
                        {set.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className={getSubjectColor(set.subject)}>
                          {set.subject}
                        </Badge>
                        <Badge variant="outline" className={getDifficultyColor(set.difficulty)}>
                          {set.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">{set.streak}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{set.masteredCards}/{set.totalCards} cards</span>
                    </div>
                    <Progress value={(set.masteredCards / set.totalCards) * 100} className="h-2" />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-blue-50 rounded-lg p-2">
                      <div className="text-sm font-bold text-blue-700">{set.accuracy}%</div>
                      <div className="text-xs text-blue-600">Accuracy</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-2">
                      <div className="text-sm font-bold text-orange-700">{set.estimatedTime}m</div>
                      <div className="text-xs text-orange-600">Est. Time</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2">
                      <div className="text-sm font-bold text-green-700">{set.streak}</div>
                      <div className="text-xs text-green-600">Streak</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStudySet(set.id);
                      }}
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Study Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dashboard/student/flashcards/${set.id}/analytics`);
                      }}
                    >
                      <BarChart3 className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Last studied: {set.lastStudied}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredSets.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No flashcard sets found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <Button onClick={() => {setSearchTerm(''); setSelectedFilter('all');}}>
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FlashcardsPage;
