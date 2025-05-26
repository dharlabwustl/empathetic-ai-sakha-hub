
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  BookOpen, 
  Brain, 
  Target, 
  Clock, 
  Star,
  TrendingUp,
  Filter,
  Play,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import EnhancedVoiceAssistant from '@/components/voice/EnhancedVoiceAssistant';
import OverviewSection from '../shared/OverviewSection';

// Mock data for concepts
const mockConcepts = [
  {
    id: "1",
    title: "Newton's Laws of Motion",
    subject: "Physics",
    difficulty: "Medium",
    duration: "25 min",
    progress: 80,
    status: "in-progress",
    chapter: "Mechanics",
    description: "Fundamental laws governing motion and forces",
    tags: ["Force", "Motion", "Acceleration"]
  },
  {
    id: "2", 
    title: "Thermodynamics First Law",
    subject: "Physics",
    difficulty: "Hard",
    duration: "35 min",
    progress: 45,
    status: "not-started",
    chapter: "Thermodynamics",
    description: "Energy conservation in thermodynamic systems",
    tags: ["Energy", "Heat", "Work"]
  },
  {
    id: "3",
    title: "Chemical Bonding",
    subject: "Chemistry", 
    difficulty: "Medium",
    duration: "30 min",
    progress: 100,
    status: "completed",
    chapter: "Atomic Structure",
    description: "How atoms form chemical bonds",
    tags: ["Ionic", "Covalent", "Metallic"]
  },
  {
    id: "4",
    title: "Quadratic Equations",
    subject: "Mathematics",
    difficulty: "Easy",
    duration: "20 min", 
    progress: 60,
    status: "in-progress",
    chapter: "Algebra",
    description: "Solving second-degree polynomial equations",
    tags: ["Algebra", "Equations", "Roots"]
  }
];

const EnhancedConceptLandingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const navigate = useNavigate();

  const filteredConcepts = mockConcepts.filter(concept => {
    const matchesSearch = concept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         concept.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         concept.chapter.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || concept.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || concept.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in-progress': return 'text-blue-600';
      case 'not-started': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'in-progress': return <Clock className="h-4 w-4 text-blue-600" />;
      case 'not-started': return <AlertTriangle className="h-4 w-4 text-gray-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleConceptClick = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  const handleSuggestionClick = (action: string) => {
    console.log('Suggestion action:', action);
    // Handle different suggestion actions
  };

  // Mock data for overview section
  const subjectProgress = [
    { subject: 'Physics', completed: 12, total: 18, percentage: 67, difficulty: 'medium' as const },
    { subject: 'Chemistry', completed: 8, total: 15, percentage: 53, difficulty: 'hard' as const },
    { subject: 'Mathematics', completed: 20, total: 25, percentage: 80, difficulty: 'easy' as const },
    { subject: 'Biology', completed: 5, total: 12, percentage: 42, difficulty: 'medium' as const }
  ];

  const smartSuggestions = [
    {
      title: "Review Newton's Laws",
      description: "Complete the in-progress physics concept before moving ahead.",
      action: "review-newton",
      priority: 'high' as const
    },
    {
      title: "Start Thermodynamics",
      description: "You're ready for the next challenging physics topic.",
      action: "start-thermo",
      priority: 'medium' as const
    },
    {
      title: "Practice Math Problems",
      description: "Strengthen your quadratic equations understanding.",
      action: "practice-math",
      priority: 'low' as const
    }
  ];

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Overview Section */}
      <OverviewSection
        pageType="concepts"
        subjectProgress={subjectProgress}
        smartSuggestions={smartSuggestions}
        overallProgress={63}
        onSuggestionClick={handleSuggestionClick}
      />

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-blue-600" />
            Concept Cards
            <Badge variant="outline" className="ml-auto">
              {filteredConcepts.length} concepts
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search concepts, subjects, or chapters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Tabs value={selectedSubject} onValueChange={setSelectedSubject} className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All Subjects</TabsTrigger>
                <TabsTrigger value="Physics">Physics</TabsTrigger>
                <TabsTrigger value="Chemistry">Chemistry</TabsTrigger>
                <TabsTrigger value="Mathematics">Mathematics</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Tabs value={selectedDifficulty} onValueChange={setSelectedDifficulty} className="w-auto">
              <TabsList>
                <TabsTrigger value="all">All Levels</TabsTrigger>
                <TabsTrigger value="Easy">Easy</TabsTrigger>
                <TabsTrigger value="Medium">Medium</TabsTrigger>
                <TabsTrigger value="Hard">Hard</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Concepts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConcepts.map((concept, index) => (
              <motion.div
                key={concept.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card 
                  className="h-full hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 border-l-blue-500"
                  onClick={() => handleConceptClick(concept.id)}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(concept.status)}
                          <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                            {concept.difficulty}
                          </Badge>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {concept.subject}
                        </Badge>
                      </div>

                      {/* Title and Description */}
                      <div>
                        <h3 className="font-bold text-lg mb-2">{concept.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{concept.description}</p>
                        <p className="text-xs text-gray-500">{concept.chapter}</p>
                      </div>

                      {/* Progress */}
                      {concept.progress > 0 && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">{concept.progress}%</span>
                          </div>
                          <Progress value={concept.progress} className="h-2" />
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {concept.tags.map((tag, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="h-4 w-4" />
                          <span>{concept.duration}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-2" />
                          {concept.status === 'completed' ? 'Review' : 'Start'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredConcepts.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No concepts found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Voice Assistant */}
      <EnhancedVoiceAssistant 
        userName="Student"
        context="concepts"
        onNavigationCommand={(route) => navigate(route)}
      />
    </div>
  );
};

export default EnhancedConceptLandingPage;
