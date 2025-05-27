
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Play, 
  Clock, 
  Target, 
  Star, 
  Users, 
  ChevronRight, 
  TrendingUp, 
  Award,
  Brain,
  Flame,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Calendar,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';

const ConceptsLandingPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [activeSubject, setActiveSubject] = useState('all');
  const [activeStatus, setActiveStatus] = useState('all');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'physics', 'chemistry', 'biology'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Mock analytics data
  const analytics = {
    totalConcepts: 185,
    completedConcepts: 127,
    inProgressConcepts: 38,
    pendingConcepts: 20,
    overallProgress: 69,
    studyStreak: 12,
    averageAccuracy: 85,
    totalStudyTime: 147, // hours
    weeklyGoal: 25, // hours
    currentWeekTime: 18,
    subjects: {
      physics: {
        name: 'Physics',
        total: 62,
        completed: 41,
        inProgress: 14,
        pending: 7,
        progress: 66,
        accuracy: 82,
        studyTime: 52,
        color: 'blue',
        icon: '⚡'
      },
      chemistry: {
        name: 'Chemistry',
        total: 58,
        completed: 39,
        inProgress: 12,
        pending: 7,
        progress: 67,
        accuracy: 88,
        studyTime: 48,
        color: 'purple',
        icon: '🧪'
      },
      biology: {
        name: 'Biology',
        total: 65,
        completed: 47,
        inProgress: 12,
        pending: 6,
        progress: 72,
        accuracy: 86,
        studyTime: 47,
        color: 'green',
        icon: '🧬'
      }
    }
  };

  // Mock concepts data with better structure
  const conceptsData = {
    physics: [
      {
        id: '1',
        title: 'Laws of Motion',
        chapter: 'Mechanics',
        difficulty: 'Medium',
        studyTime: '45 mins',
        progress: 85,
        status: 'completed',
        accuracy: 92,
        rating: 4.8,
        studentsStudied: 1250,
        priority: 'high',
        description: 'Newton\'s three laws of motion and their applications',
        topics: ['First Law', 'Second Law', 'Third Law'],
        lastStudied: '2 days ago'
      },
      {
        id: '4',
        title: 'Thermodynamics',
        chapter: 'Heat & Thermodynamics',
        difficulty: 'Hard',
        studyTime: '70 mins',
        progress: 40,
        status: 'in-progress',
        accuracy: 78,
        rating: 4.6,
        studentsStudied: 850,
        priority: 'high',
        description: 'Laws of thermodynamics and their applications',
        topics: ['First Law', 'Second Law', 'Entropy'],
        lastStudied: 'Yesterday'
      },
      {
        id: '7',
        title: 'Wave Optics',
        chapter: 'Optics',
        difficulty: 'Hard',
        studyTime: '60 mins',
        progress: 0,
        status: 'pending',
        accuracy: 0,
        rating: 4.7,
        studentsStudied: 920,
        priority: 'medium',
        description: 'Interference, diffraction, and polarization of light',
        topics: ['Interference', 'Diffraction', 'Polarization'],
        lastStudied: 'Never'
      }
    ],
    chemistry: [
      {
        id: '2',
        title: 'Chemical Bonding',
        chapter: 'Chemical Bonds',
        difficulty: 'Hard',
        studyTime: '60 mins',
        progress: 60,
        status: 'in-progress',
        accuracy: 85,
        rating: 4.7,
        studentsStudied: 980,
        priority: 'high',
        description: 'Ionic, covalent, and metallic bonds formation',
        topics: ['Ionic Bonds', 'Covalent Bonds', 'Hybridization'],
        lastStudied: 'Today'
      },
      {
        id: '8',
        title: 'Organic Chemistry',
        chapter: 'Organic Compounds',
        difficulty: 'Medium',
        studyTime: '55 mins',
        progress: 95,
        status: 'completed',
        accuracy: 94,
        rating: 4.9,
        studentsStudied: 1150,
        priority: 'medium',
        description: 'Structure and reactions of organic compounds',
        topics: ['Hydrocarbons', 'Functional Groups', 'Reactions'],
        lastStudied: 'Last week'
      }
    ],
    biology: [
      {
        id: '3',
        title: 'Cell Division',
        chapter: 'Cell Biology',
        difficulty: 'Medium',
        studyTime: '50 mins',
        progress: 90,
        status: 'completed',
        accuracy: 91,
        rating: 4.9,
        studentsStudied: 1100,
        priority: 'medium',
        description: 'Mitosis and meiosis processes in detail',
        topics: ['Mitosis', 'Meiosis', 'Cell Cycle'],
        lastStudied: '3 days ago'
      },
      {
        id: '9',
        title: 'Genetics',
        chapter: 'Heredity',
        difficulty: 'Hard',
        studyTime: '65 mins',
        progress: 25,
        status: 'in-progress',
        accuracy: 76,
        rating: 4.8,
        studentsStudied: 890,
        priority: 'high',
        description: 'Principles of inheritance and genetic disorders',
        topics: ['Mendel\'s Laws', 'Linkage', 'Mutations'],
        lastStudied: 'Today'
      }
    ]
  };

  const allConcepts = [
    ...conceptsData.physics,
    ...conceptsData.chemistry,
    ...conceptsData.biology
  ];

  const getFilteredConcepts = () => {
    let concepts = activeTab === 'overview' ? allConcepts : 
                  activeTab === 'physics' ? conceptsData.physics :
                  activeTab === 'chemistry' ? conceptsData.chemistry :
                  activeTab === 'biology' ? conceptsData.biology : allConcepts;

    if (activeStatus !== 'all') {
      concepts = concepts.filter(concept => concept.status === activeStatus);
    }

    return concepts;
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  const handleStudyConcept = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject?.toLowerCase()) {
      case 'physics': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'chemistry': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'biology': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'pending': return AlertCircle;
      default: return Clock;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto p-6 space-y-8">
        {/* Premium Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white p-8 rounded-3xl shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Brain className="h-10 w-10" />
                Concept Mastery Hub
              </h1>
              <p className="text-blue-100 text-lg">Master NEET 2026 concepts with AI-powered learning</p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-2">
                <Flame className="h-6 w-6 text-orange-300" />
                <span className="text-2xl font-bold">{analytics.studyStreak} Day Streak</span>
              </div>
              <div className="flex gap-4">
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <Award className="h-4 w-4 mr-1" />
                  {analytics.overallProgress}% Complete
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  {analytics.averageAccuracy}% Accuracy
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Premium Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100/50 rounded-xl p-1">
              <TabsTrigger 
                value="overview" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="physics" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
              >
                ⚡ Physics
              </TabsTrigger>
              <TabsTrigger 
                value="chemistry" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
              >
                🧪 Chemistry
              </TabsTrigger>
              <TabsTrigger 
                value="biology" 
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
              >
                🧬 Biology
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6 mt-6">
              {/* Analytics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100 text-sm">Total Concepts</p>
                          <p className="text-3xl font-bold">{analytics.totalConcepts}</p>
                        </div>
                        <BookOpen className="h-8 w-8 text-blue-200" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100 text-sm">Completed</p>
                          <p className="text-3xl font-bold">{analytics.completedConcepts}</p>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-200" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100 text-sm">Accuracy</p>
                          <p className="text-3xl font-bold">{analytics.averageAccuracy}%</p>
                        </div>
                        <Target className="h-8 w-8 text-purple-200" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0 shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100 text-sm">Study Time</p>
                          <p className="text-3xl font-bold">{analytics.totalStudyTime}h</p>
                        </div>
                        <Clock className="h-8 w-8 text-orange-200" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Subject Progress Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.values(analytics.subjects).map((subject, index) => (
                  <motion.div
                    key={subject.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * (index + 1) }}
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm border border-white/50" 
                          onClick={() => handleTabChange(subject.name.toLowerCase())}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{subject.icon}</span>
                            <h3 className="text-xl font-semibold">{subject.name}</h3>
                          </div>
                          <Badge variant="outline" className={getSubjectColor(subject.name)}>
                            {subject.progress}% Complete
                          </Badge>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between text-sm text-gray-600">
                            <span>{subject.completed}/{subject.total} Concepts</span>
                            <span>{subject.studyTime}h studied</span>
                          </div>
                          <Progress value={subject.progress} className="h-3" />
                          
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-center p-2 bg-gray-50 rounded-lg">
                              <p className="text-sm font-bold text-gray-700">{subject.accuracy}%</p>
                              <p className="text-xs text-gray-500">Accuracy</p>
                            </div>
                            <div className="text-center p-2 bg-blue-50 rounded-lg">
                              <p className="text-sm font-bold text-blue-700">{subject.inProgress}</p>
                              <p className="text-xs text-blue-600">In Progress</p>
                            </div>
                            <div className="text-center p-2 bg-orange-50 rounded-lg">
                              <p className="text-sm font-bold text-orange-700">{subject.pending}</p>
                              <p className="text-xs text-orange-600">Pending</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Subject-specific tabs */}
            {['physics', 'chemistry', 'biology'].map((subject) => (
              <TabsContent key={subject} value={subject} className="space-y-6 mt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold capitalize flex items-center gap-2">
                      <span className="text-2xl">
                        {analytics.subjects[subject as keyof typeof analytics.subjects]?.icon}
                      </span>
                      {subject} Concepts
                    </h2>
                    <p className="text-gray-600">
                      {analytics.subjects[subject as keyof typeof analytics.subjects]?.completed} of {analytics.subjects[subject as keyof typeof analytics.subjects]?.total} concepts completed
                    </p>
                  </div>
                  
                  {/* Status Filter */}
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <div className="flex gap-1">
                      {['all', 'pending', 'in-progress', 'completed'].map((status) => (
                        <Button
                          key={status}
                          variant={activeStatus === status ? "default" : "outline"}
                          size="sm"
                          onClick={() => setActiveStatus(status)}
                          className="capitalize"
                        >
                          {status === 'all' ? 'All' : status.replace('-', ' ')}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Concept Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {getFilteredConcepts().map((concept, index) => {
                    const StatusIcon = getStatusIcon(concept.status);
                    return (
                      <motion.div
                        key={concept.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <Card className={`hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/90 backdrop-blur-sm border-l-4 ${getPriorityColor(concept.priority)} overflow-hidden group`}
                              onClick={() => handleStudyConcept(concept.id)}>
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <h4 className="font-semibold text-lg mb-1 group-hover:text-blue-600 transition-colors">
                                  {concept.title}
                                </h4>
                                <p className="text-sm text-gray-600 mb-2">{concept.chapter}</p>
                                <p className="text-xs text-gray-500 line-clamp-2">{concept.description}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <StatusIcon className="h-5 w-5 text-gray-500" />
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                                {concept.difficulty}
                              </Badge>
                              <Badge variant="outline" className={getStatusColor(concept.status)}>
                                {concept.status.replace('-', ' ')}
                              </Badge>
                              {concept.priority === 'high' && (
                                <Badge variant="destructive" className="text-xs">
                                  High Priority
                                </Badge>
                              )}
                            </div>

                            <div className="space-y-3">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">Progress</span>
                                <span className="font-bold text-blue-600">{concept.progress}%</span>
                              </div>
                              <Progress value={concept.progress} className="h-2" />
                              
                              <div className="grid grid-cols-2 gap-3 text-xs">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{concept.studyTime}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-yellow-500" />
                                  <span>{concept.rating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Target className="h-3 w-3" />
                                  <span>{concept.accuracy}% accuracy</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  <span>{concept.studentsStudied}</span>
                                </div>
                              </div>

                              <div className="pt-2 border-t border-gray-100">
                                <Button 
                                  className="w-full" 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleStudyConcept(concept.id);
                                  }}
                                >
                                  <Play className="h-4 w-4 mr-2" />
                                  {concept.status === 'completed' ? 'Review' : 
                                   concept.status === 'in-progress' ? 'Continue' : 'Start Learning'}
                                  <ChevronRight className="h-4 w-4 ml-2" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default ConceptsLandingPage;
