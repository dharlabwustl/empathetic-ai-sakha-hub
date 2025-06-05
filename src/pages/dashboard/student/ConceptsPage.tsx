
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Search, 
  Filter, 
  Play, 
  Clock,
  Target,
  Star,
  TrendingUp,
  Brain,
  Lightbulb,
  Zap
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ConceptsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const concepts = [
    {
      id: '1',
      title: 'Newton\'s Laws of Motion',
      subject: 'Physics',
      difficulty: 'medium',
      progress: 85,
      timeToComplete: 45,
      lastStudied: '2 hours ago',
      mastery: 92,
      priority: 'high',
      type: 'fundamental'
    },
    {
      id: '2',
      title: 'Chemical Equilibrium',
      subject: 'Chemistry',
      difficulty: 'hard',
      progress: 60,
      timeToComplete: 60,
      lastStudied: '1 day ago',
      mastery: 74,
      priority: 'high',
      type: 'advanced'
    },
    {
      id: '3',
      title: 'Photosynthesis Process',
      subject: 'Biology',
      difficulty: 'easy',
      progress: 95,
      timeToComplete: 30,
      lastStudied: '3 hours ago',
      mastery: 96,
      priority: 'low',
      type: 'fundamental'
    },
    {
      id: '4',
      title: 'Differential Calculus',
      subject: 'Mathematics',
      difficulty: 'hard',
      progress: 40,
      timeToComplete: 75,
      lastStudied: '5 days ago',
      mastery: 58,
      priority: 'high',
      type: 'advanced'
    },
    {
      id: '5',
      title: 'Electromagnetic Induction',
      subject: 'Physics',
      difficulty: 'medium',
      progress: 70,
      timeToComplete: 50,
      lastStudied: '1 hour ago',
      mastery: 81,
      priority: 'medium',
      type: 'advanced'
    },
    {
      id: '6',
      title: 'Organic Chemistry Basics',
      subject: 'Chemistry',
      difficulty: 'medium',
      progress: 78,
      timeToComplete: 40,
      lastStudied: '6 hours ago',
      mastery: 85,
      priority: 'medium',
      type: 'fundamental'
    }
  ];

  const stats = {
    totalConcepts: concepts.length,
    completedConcepts: concepts.filter(c => c.progress >= 90).length,
    averageProgress: Math.round(concepts.reduce((sum, c) => sum + c.progress, 0) / concepts.length),
    averageMastery: Math.round(concepts.reduce((sum, c) => sum + c.mastery, 0) / concepts.length),
    highPriority: concepts.filter(c => c.priority === 'high').length,
    studyStreak: 12
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'fundamental': return <Lightbulb className="h-4 w-4" />;
      case 'advanced': return <Zap className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const handleStudyConcept = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/study/${conceptId}`);
  };

  const filteredConcepts = concepts.filter(concept => {
    const matchesSearch = concept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         concept.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'high-priority' && concept.priority === 'high') ||
                         (selectedFilter === 'needs-review' && concept.progress < 80) ||
                         (selectedFilter === 'mastered' && concept.progress >= 90) ||
                         (selectedFilter === concept.subject.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Concept Mastery Hub
            </h1>
            <p className="text-gray-600 mt-2">Deep dive into fundamental and advanced concepts with adaptive learning</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/dashboard/student/concepts/create')} className="bg-gradient-to-r from-emerald-600 to-teal-600">
              <BookOpen className="h-4 w-4 mr-2" />
              Add Concept
            </Button>
            <Button variant="outline" onClick={() => navigate('/dashboard/student/concepts/study/recommended')}>
              <Target className="h-4 w-4 mr-2" />
              Smart Study
            </Button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-emerald-600">{stats.totalConcepts}</div>
              <div className="text-sm text-gray-600">Total Concepts</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-teal-600">{stats.completedConcepts}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.averageProgress}%</div>
              <div className="text-sm text-gray-600">Avg Progress</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.averageMastery}%</div>
              <div className="text-sm text-gray-600">Mastery Level</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{stats.highPriority}</div>
              <div className="text-sm text-gray-600">High Priority</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{stats.studyStreak}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search concepts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'physics', 'chemistry', 'biology', 'mathematics', 'high-priority', 'needs-review', 'mastered'].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className={selectedFilter === filter ? "bg-gradient-to-r from-emerald-600 to-teal-600" : "bg-white/80 backdrop-blur-sm border-0 shadow-lg"}
              >
                <Filter className="h-3 w-3 mr-1" />
                {filter.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Concepts Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredConcepts.map((concept, index) => (
            <motion.div
              key={concept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => handleStudyConcept(concept.id)}
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className={`h-2 ${concept.priority === 'high' ? 'bg-gradient-to-r from-red-500 to-orange-500' : 
                  concept.priority === 'medium' ? 'bg-gradient-to-r from-yellow-500 to-amber-500' : 
                  'bg-gradient-to-r from-green-500 to-emerald-500'}`}></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold line-clamp-2 group-hover:text-emerald-600 transition-colors">
                        {concept.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <Badge variant="outline" className={getSubjectColor(concept.subject)}>
                          {concept.subject}
                        </Badge>
                        <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                          {concept.difficulty}
                        </Badge>
                        <Badge variant="outline" className={getPriorityColor(concept.priority)}>
                          {concept.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-500">
                      {getTypeIcon(concept.type)}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{concept.progress}%</span>
                    </div>
                    <Progress value={concept.progress} className="h-2" />
                  </div>

                  {/* Mastery Level */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Mastery Level</span>
                      <span className="font-medium">{concept.mastery}%</span>
                    </div>
                    <Progress value={concept.mastery} className="h-2" />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-blue-50 rounded-lg p-2">
                      <div className="text-sm font-bold text-blue-700">{concept.timeToComplete}m</div>
                      <div className="text-xs text-blue-600">Est. Time</div>
                    </div>
                    <div className="bg-emerald-50 rounded-lg p-2">
                      <div className="text-sm font-bold text-emerald-700">{concept.mastery}%</div>
                      <div className="text-xs text-emerald-600">Mastery</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStudyConcept(concept.id);
                    }}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Study Concept
                  </Button>

                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Last studied: {concept.lastStudied}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredConcepts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No concepts found</h3>
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

export default ConceptsPage;
