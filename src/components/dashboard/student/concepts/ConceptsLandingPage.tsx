
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Play, Clock, Target, Star, Users, ChevronRight, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import OverviewSection from '../OverviewSection';

const ConceptsLandingPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState<'today' | 'upcoming' | 'completed'>('today');
  const [subjectFilter, setSubjectFilter] = useState('all');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && (tab === 'overview' || tab === 'all-concepts')) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const overviewData = {
    type: "Concepts" as const,
    title: "NEET Concepts Overview",
    subjects: [
      { name: "Physics", completed: 45, total: 60, progress: 75, efficiency: 88, studyTime: 32 },
      { name: "Chemistry", completed: 38, total: 55, progress: 69, efficiency: 85, studyTime: 28 },
      { name: "Biology", completed: 52, total: 70, progress: 74, efficiency: 82, studyTime: 35 }
    ],
    totalStudyTime: 95,
    overallProgress: 73,
    suggestions: [
      "Focus on Physics electromagnetic induction concepts",
      "Review Chemistry coordination compounds", 
      "Strengthen Biology genetics and evolution",
      "Practice more numerical problems in concepts"
    ]
  };

  const allConcepts = [
    {
      id: '1',
      title: 'Laws of Motion',
      subject: 'Physics',
      difficulty: 'Medium',
      studyTime: '45 mins',
      progress: 85,
      rating: 4.8,
      studentsStudied: 1250,
      description: 'Newton\'s three laws of motion and their applications',
      topics: ['Inertia', 'Force and Acceleration', 'Action-Reaction'],
      status: 'today',
      completed: false
    },
    {
      id: '2',
      title: 'Chemical Bonding',
      subject: 'Chemistry',
      difficulty: 'Hard',
      studyTime: '60 mins',
      progress: 60,
      rating: 4.7,
      studentsStudied: 980,
      description: 'Ionic, covalent, and metallic bonds formation',
      topics: ['Ionic Bonds', 'Covalent Bonds', 'Hybridization'],
      status: 'upcoming',
      completed: false
    },
    {
      id: '3',
      title: 'Cell Division',
      subject: 'Biology',
      difficulty: 'Medium',
      studyTime: '50 mins',
      progress: 90,
      rating: 4.9,
      studentsStudied: 1100,
      description: 'Mitosis and meiosis processes in detail',
      topics: ['Mitosis', 'Meiosis', 'Cell Cycle'],
      status: 'completed',
      completed: true
    },
    {
      id: '4',
      title: 'Thermodynamics',
      subject: 'Physics',
      difficulty: 'Hard',
      studyTime: '70 mins',
      progress: 40,
      rating: 4.6,
      studentsStudied: 850,
      description: 'Laws of thermodynamics and their applications',
      topics: ['First Law', 'Second Law', 'Entropy'],
      status: 'today',
      completed: false
    }
  ];

  const subjects = ['all', 'Physics', 'Chemistry', 'Biology'];
  
  // Filter concepts based on status and subject
  const filteredConcepts = allConcepts.filter(concept => {
    const statusMatch = concept.status === statusFilter || (statusFilter === 'completed' && concept.completed);
    const subjectMatch = subjectFilter === 'all' || concept.subject === subjectFilter;
    return statusMatch && subjectMatch;
  });

  // Count concepts by status
  const statusCounts = {
    today: allConcepts.filter(c => c.status === 'today').length,
    upcoming: allConcepts.filter(c => c.status === 'upcoming').length,
    completed: allConcepts.filter(c => c.completed).length
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  const handleContinueLearning = () => {
    setActiveTab('all-concepts');
    setSearchParams({ tab: 'all-concepts' });
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
    switch (subject) {
      case 'Physics': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Chemistry': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Biology': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 dark:from-blue-900/10 dark:via-gray-900 dark:to-purple-900/10">
      <div className="space-y-6 p-6">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="all-concepts">All Concepts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <OverviewSection 
              {...overviewData} 
              onContinueLearning={handleContinueLearning}
            />
          </TabsContent>

          <TabsContent value="all-concepts" className="space-y-6 mt-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">All Concepts</h1>
                <p className="text-gray-600 dark:text-gray-400">Master key concepts across all subjects</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>

            {/* Status Filter Tabs with Count Indicators */}
            <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as typeof statusFilter)}>
              <TabsList>
                <TabsTrigger value="today" className="flex items-center gap-2">
                  Today
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {statusCounts.today}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="upcoming" className="flex items-center gap-2">
                  Upcoming
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {statusCounts.upcoming}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="completed" className="flex items-center gap-2">
                  Completed
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {statusCounts.completed}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Subject Filter */}
            <div className="flex gap-2">
              {subjects.map((subject) => (
                <Button
                  key={subject}
                  variant={subjectFilter === subject ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSubjectFilter(subject)}
                  className="capitalize"
                >
                  {subject}
                </Button>
              ))}
            </div>

            {/* Subject Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {overviewData.subjects.map((subject) => (
                <motion.div
                  key={subject.name}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-blue-300 bg-gradient-to-r from-white to-blue-50/50 dark:from-gray-800 dark:to-blue-900/20" onClick={() => handleContinueLearning()}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">{subject.name}</h3>
                        <Badge variant="outline" className={getSubjectColor(subject.name)}>
                          {subject.progress}% Complete
                        </Badge>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>{subject.completed}/{subject.total} Concepts</span>
                          <span>{subject.studyTime}h studied</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="p-2 bg-blue-50 rounded text-center">
                          <p className="text-sm font-bold text-blue-700">{subject.efficiency}%</p>
                          <p className="text-xs text-blue-600">Mastery</p>
                        </div>
                        <div className="p-2 bg-green-50 rounded text-center">
                          <p className="text-sm font-bold text-green-700">{subject.studyTime}h</p>
                          <p className="text-xs text-green-600">Study Time</p>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full" 
                        variant="outline" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleContinueLearning();
                        }}
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Study {subject.name}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Filtered Concepts List */}
            <Card className="bg-gradient-to-r from-white via-blue-50/30 to-purple-50/30 dark:from-gray-800 dark:via-blue-900/10 dark:to-purple-900/10">
              <CardHeader>
                <CardTitle>
                  {statusFilter === 'today' ? 'Today\'s Concepts' : 
                   statusFilter === 'upcoming' ? 'Upcoming Concepts' : 
                   'Completed Concepts'} ({filteredConcepts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredConcepts.map((concept, index) => (
                    <motion.div
                      key={concept.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer bg-white dark:bg-gray-800/50" onClick={() => handleStudyConcept(concept.id)}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-lg">{concept.title}</h4>
                                <Badge variant="outline" className={getSubjectColor(concept.subject)}>
                                  {concept.subject}
                                </Badge>
                                <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                                  {concept.difficulty}
                                </Badge>
                                {concept.completed && (
                                  <Badge className="bg-green-100 text-green-800 border-green-200">
                                    Completed
                                  </Badge>
                                )}
                              </div>
                              
                              <p className="text-gray-600 mb-3">{concept.description}</p>
                              
                              <div className="flex flex-wrap gap-2 mb-3">
                                {concept.topics.map((topic, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {topic}
                                  </Badge>
                                ))}
                              </div>
                              
                              <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {concept.studyTime}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                  {concept.rating}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {concept.studentsStudied.toLocaleString()} students
                                </span>
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Your Progress</span>
                                  <span>{concept.progress}%</span>
                                </div>
                                <Progress value={concept.progress} className="h-2" />
                              </div>
                            </div>
                            
                            <div className="ml-4">
                              <Button 
                                size="sm" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStudyConcept(concept.id);
                                }}
                                className="min-w-[120px]"
                                disabled={concept.completed}
                              >
                                <Play className="h-4 w-4 mr-1" />
                                {concept.completed ? 'Review' : 'Study Concept'}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
                
                {filteredConcepts.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No concepts found for the selected filter.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ConceptsLandingPage;
