import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Play, Clock, Target, Star, Users, ChevronRight, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import OverviewSection from '../OverviewSection';

const ConceptsLandingPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [subjectFilter, setSubjectFilter] = useState('all');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && ['overview', 'today', 'upcoming', 'completed'].includes(tab)) {
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
      dueDate: new Date()
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
      dueDate: new Date(Date.now() + 86400000)
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
      dueDate: new Date(Date.now() - 86400000)
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
      status: 'upcoming',
      dueDate: new Date(Date.now() + 172800000)
    }
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSearchParams({ tab: value });
  };

  const handleContinueLearning = () => {
    setActiveTab('today');
    setSearchParams({ tab: 'today' });
  };

  const handleStudyConcept = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  const getFilteredConcepts = (status: string) => {
    let filtered = allConcepts;
    
    if (status !== 'all') {
      filtered = filtered.filter(concept => concept.status === status);
    }
    
    if (subjectFilter !== 'all') {
      filtered = filtered.filter(concept => concept.subject === subjectFilter);
    }
    
    return filtered;
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

  const getStatusCount = (status: string) => {
    return getFilteredConcepts(status).length;
  };

  const ConceptCard = ({ concept }: { concept: typeof allConcepts[0] }) => (
    <Card className="border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-gray-50" onClick={() => handleStudyConcept(concept.id)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h4 className="font-semibold text-lg text-gray-900">{concept.title}</h4>
              <Badge variant="outline" className={getSubjectColor(concept.subject)}>
                {concept.subject}
              </Badge>
              <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                {concept.difficulty}
              </Badge>
            </div>
            
            <p className="text-gray-600 mb-3">{concept.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              {concept.topics.map((topic, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-blue-50 text-blue-700">
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
              className="min-w-[120px] bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Play className="h-4 w-4 mr-1" />
              Study Concept
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-blue-50 to-purple-50">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="today" className="flex items-center gap-2">
            Today <Badge variant="secondary" className="bg-red-100 text-red-700">{getStatusCount('today')}</Badge>
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            Upcoming <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">{getStatusCount('upcoming')}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="flex items-center gap-2">
            Completed <Badge variant="secondary" className="bg-green-100 text-green-700">{getStatusCount('completed')}</Badge>
          </TabsTrigger>
          <TabsTrigger value="all-concepts">All Concepts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <OverviewSection 
            {...overviewData} 
            onContinueLearning={handleContinueLearning}
          />
        </TabsContent>

        {['today', 'upcoming', 'completed', 'all-concepts'].map(tabValue => (
          <TabsContent key={tabValue} value={tabValue} className="space-y-6 mt-6">
            {/* Header with Filters */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {tabValue === 'all-concepts' ? 'All Concepts' : 
                   tabValue.charAt(0).toUpperCase() + tabValue.slice(1)} Concepts
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {getStatusCount(tabValue === 'all-concepts' ? 'all' : tabValue)} concepts available
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger className="w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Subject Progress Cards */}
            {tabValue === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {overviewData.subjects.map((subject) => (
                  <Card key={subject.name} className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-blue-300 bg-gradient-to-br from-white to-blue-50" onClick={() => handleContinueLearning()}>
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
                ))}
              </div>
            )}

            {/* Concepts List */}
            <div className="space-y-4">
              {getFilteredConcepts(tabValue === 'all-concepts' ? 'all' : tabValue).map((concept) => (
                <ConceptCard key={concept.id} concept={concept} />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ConceptsLandingPage;
