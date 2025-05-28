
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

const RedesignedConceptsLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const overviewData = {
    type: "Concepts" as const,
    title: "NEET Concepts Overview",
    subjects: [
      { name: "Physics", completed: 45, total: 60, progress: 75, efficiency: 88, studyTime: 120 },
      { name: "Chemistry", completed: 32, total: 55, progress: 58, efficiency: 72, studyTime: 95 },
      { name: "Biology", completed: 55, total: 70, progress: 79, efficiency: 85, studyTime: 140 }
    ],
    totalStudyTime: 355,
    overallProgress: 71,
    suggestions: [
      "Focus on Chemistry organic reactions for better retention",
      "Physics mechanics concepts show excellent understanding",
      "Biology cell biology needs more practice time"
    ]
  };

  const concepts = [
    {
      id: '1',
      title: 'Newton\'s Laws of Motion',
      description: 'Understanding the fundamental principles of motion and forces in physics',
      subject: 'Physics',
      difficulty: 'medium' as const,
      completed: false,
      progress: 65,
      mastery: 78,
      timeEstimate: '25 min',
      tags: ['Mechanics', 'Forces'],
      examType: 'NEET',
      status: 'in-progress' as const
    },
    {
      id: '2',
      title: 'Organic Chemistry Reactions',
      description: 'Key organic reactions and their mechanisms for NEET preparation',
      subject: 'Chemistry',
      difficulty: 'hard' as const,
      completed: false,
      progress: 30,
      mastery: 45,
      timeEstimate: '35 min',
      tags: ['Organic', 'Reactions'],
      examType: 'NEET',
      status: 'pending' as const
    },
    {
      id: '3',
      title: 'Cell Biology Fundamentals',
      description: 'Complete understanding of cell structure and functions',
      subject: 'Biology',
      difficulty: 'easy' as const,
      completed: true,
      progress: 100,
      mastery: 92,
      timeEstimate: '20 min',
      tags: ['Cell Biology', 'Structure'],
      examType: 'NEET',
      status: 'completed' as const
    },
    {
      id: '4',
      title: 'Thermodynamics Principles',
      description: 'Laws of thermodynamics and their applications',
      subject: 'Physics',
      difficulty: 'medium' as const,
      completed: false,
      progress: 80,
      mastery: 85,
      timeEstimate: '30 min',
      tags: ['Thermodynamics', 'Energy'],
      examType: 'NEET',
      status: 'in-progress' as const
    }
  ];

  const subjects = ['all', 'Physics', 'Chemistry', 'Biology'];

  const getFilteredConcepts = () => {
    return concepts.filter(concept => {
      const matchesSearch = concept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           concept.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = selectedSubject === 'all' || concept.subject === selectedSubject;
      const matchesTab = activeTab === 'all' || concept.status === activeTab;
      return matchesSearch && matchesSubject && matchesTab;
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200'; 
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
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

  const navigateToConcept = (conceptId: string) => {
    const targetRoute = `/dashboard/student/concepts/${conceptId}`;
    console.log(`🔥 NAVIGATION TO CONCEPT DETAIL: ${targetRoute}`);
    navigate(targetRoute);
  };

  const getTabCounts = () => {
    const filtered = concepts.filter(concept => {
      const matchesSubject = selectedSubject === 'all' || concept.subject === selectedSubject;
      return matchesSubject;
    });
    
    return {
      all: filtered.length,
      pending: filtered.filter(c => c.status === 'pending').length,
      'in-progress': filtered.filter(c => c.status === 'in-progress').length,
      completed: filtered.filter(c => c.status === 'completed').length
    };
  };

  const tabCounts = getTabCounts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/50 dark:from-indigo-900/10 dark:via-gray-900 dark:to-purple-900/10">
      <Helmet>
        <title>Concepts - PREPZR</title>
        <meta name="description" content="NEET concepts for comprehensive understanding" />
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
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Concept Mastery
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Deep dive into NEET concepts with interactive learning and comprehensive understanding
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
              placeholder="Search concepts..."
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
            Create Concept
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
              <TabsTrigger value="all" className="data-[state=active]:bg-indigo-500 data-[state=active]:text-white">
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
              {/* Concepts Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {getFilteredConcepts().map((concept, index) => (
                  <motion.div
                    key={concept.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="w-full"
                  >
                    <Card 
                      className="h-80 w-full flex flex-col hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-indigo-500"
                      onClick={() => navigateToConcept(concept.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-base font-semibold line-clamp-2">
                            {concept.title}
                          </CardTitle>
                          <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                            {concept.difficulty}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary" className="text-xs">
                            {concept.subject}
                          </Badge>
                          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200 text-xs flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {concept.examType}
                          </Badge>
                          <Badge variant="outline" className="text-xs flex items-center gap-1">
                            {getStatusIcon(concept.status)}
                            {concept.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{concept.description}</p>
                      </CardHeader>
                      
                      <CardContent className="space-y-3 flex-grow">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-600 flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {concept.timeEstimate}
                          </span>
                          <span className="text-gray-600">Mastery: {concept.mastery}%</span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-medium">Progress</span>
                            <span className="text-xs font-bold text-indigo-600">{concept.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full bg-indigo-500 transition-all duration-300"
                              style={{ width: `${concept.progress}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {concept.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mt-auto">
                          <Button 
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateToConcept(concept.id);
                            }}
                            className="text-xs"
                          >
                            <BookOpen className="h-3 w-3 mr-1" />
                            Study
                          </Button>
                          <Button 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigateToConcept(concept.id);
                            }}
                            className="text-xs bg-indigo-600 hover:bg-indigo-700"
                          >
                            <Zap className="h-3 w-3 mr-1" />
                            Quick
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* No concepts found */}
              {getFilteredConcepts().length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No concepts found</h3>
                  <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Concept
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

export default RedesignedConceptsLandingPage;
