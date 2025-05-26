import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  BookOpen, 
  TrendingUp, 
  Target, 
  Clock, 
  Brain,
  FlaskConical,
  Lightbulb,
  Star,
  ChevronRight,
  Eye,
  Video,
  Calculator,
  AlertTriangle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BackButton from '../BackButton';
import ConceptCard from '../ConceptCard';
import FormulaTabContent from './FormulaTabContent';
import OverviewSection from '../OverviewSection';
import FloatingVoiceButton from '@/components/voice/FloatingVoiceButton';

// Mock data for concepts
const mockConcepts = [
  {
    id: 'ohms-law',
    title: "Ohm's Law",
    description: 'Understanding the relationship between voltage, current, and resistance in electrical circuits.',
    subject: 'Physics',
    difficulty: 'medium' as const,
    progress: 75,
    completed: false,
    relatedConcepts: ['Electrical Circuits', 'Power Calculations']
  },
  {
    id: 'newtons-laws',
    title: "Newton's Laws of Motion",
    description: 'The three fundamental laws that form the foundation of classical mechanics.',
    subject: 'Physics',
    difficulty: 'hard' as const,
    progress: 45,
    completed: false,
    relatedConcepts: ['Force', 'Acceleration', 'Momentum']
  },
  {
    id: 'photosynthesis',
    title: 'Photosynthesis',
    description: 'The process by which plants convert light energy into chemical energy.',
    subject: 'Biology',
    difficulty: 'easy' as const,
    progress: 90,
    completed: true,
    relatedConcepts: ['Cellular Respiration', 'Plant Biology']
  }
];

interface EnhancedConceptLandingPageProps {
  onNavigateToDetail?: (conceptId: string) => void;
}

const EnhancedConceptLandingPage: React.FC<EnhancedConceptLandingPageProps> = ({ 
  onNavigateToDetail 
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [filteredConcepts, setFilteredConcepts] = useState(mockConcepts);
  const [activeTab, setActiveTab] = useState('overview');

  const subjects = ['All', 'Physics', 'Chemistry', 'Biology', 'Mathematics'];
  const difficulties = ['All', 'easy', 'medium', 'hard'];

  // Mock overview data
  const overviewData = {
    subjects: [
      { name: 'Physics', completed: 8, total: 15, progress: 53, efficiency: 78, studyTime: 240 },
      { name: 'Chemistry', completed: 5, total: 12, progress: 42, efficiency: 65, studyTime: 180 },
      { name: 'Biology', completed: 12, total: 18, progress: 67, efficiency: 85, studyTime: 320 },
      { name: 'Mathematics', completed: 10, total: 14, progress: 71, efficiency: 82, studyTime: 280 }
    ],
    totalStudyTime: 1020,
    overallProgress: 58,
    suggestions: [
      'Focus on Chemical Bonding - your weakest area in Chemistry',
      'Practice more Physics numerical problems to improve speed',
      'Review Thermodynamics concepts before tomorrow\'s test',
      'Excellent progress in Biology! Keep up the momentum'
    ]
  };

  useEffect(() => {
    let filtered = mockConcepts;

    if (searchTerm) {
      filtered = filtered.filter(concept =>
        concept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        concept.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSubject !== 'All') {
      filtered = filtered.filter(concept => concept.subject === selectedSubject);
    }

    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(concept => concept.difficulty === selectedDifficulty);
    }

    setFilteredConcepts(filtered);
  }, [searchTerm, selectedSubject, selectedDifficulty]);

  const handleConceptClick = (conceptId: string) => {
    if (onNavigateToDetail) {
      onNavigateToDetail(conceptId);
    } else {
      navigate(`/dashboard/student/concepts/${conceptId}`);
    }
  };

  const totalConcepts = mockConcepts.length;
  const completedConcepts = mockConcepts.filter(c => c.completed).length;
  const averageProgress = mockConcepts.reduce((acc, c) => acc + c.progress, 0) / totalConcepts;

  return (
    <div className="container mx-auto p-4 space-y-6">
      <BackButton to="/dashboard/student" />
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Concept Cards Library
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Master key concepts with AI-powered learning cards. Each card adapts to your learning style and tracks your progress.
        </p>
      </motion.div>

      {/* Overview Section */}
      <OverviewSection 
        title="Concepts Overview"
        subjects={overviewData.subjects}
        totalStudyTime={overviewData.totalStudyTime}
        overallProgress={overviewData.overallProgress}
        suggestions={overviewData.suggestions}
      />

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="learn">Learn</TabsTrigger>
          <TabsTrigger value="visual">Visual</TabsTrigger>
          <TabsTrigger value="formula">Formula</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {/* Search and Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Find Concepts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search concepts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="px-3 py-2 border rounded-md"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty} value={difficulty}>
                        {difficulty === 'All' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Concept Grid */}
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredConcepts.map((concept, index) => (
                <motion.div
                  key={concept.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ConceptCard
                    {...concept}
                    onView={() => handleConceptClick(concept.id)}
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {filteredConcepts.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400">No concepts found matching your criteria.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="learn" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-600" />
                Text-Based Learning
              </CardTitle>
              <CardDescription>
                Comprehensive explanations and theory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Dive deep into theoretical foundations with our adaptive text content.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Beginner Level</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Start with basic concepts and fundamental principles</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Advanced Level</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Explore complex applications and edge cases</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visual" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-600" />
                Visual Learning
              </CardTitle>
              <CardDescription>
                Diagrams, charts, and visual representations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Learn through interactive diagrams and visual representations.</p>
                <div className="bg-slate-100 dark:bg-slate-900 rounded-lg aspect-video flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-slate-500 dark:text-slate-400">Interactive visual content would be displayed here</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="formula" className="mt-6">
          <FormulaTabContent 
            formula="V = I × R"
            variables={[
              { symbol: 'V', name: 'Voltage', unit: 'Volts (V)' },
              { symbol: 'I', name: 'Current', unit: 'Amperes (A)' },
              { symbol: 'R', name: 'Resistance', unit: 'Ohms (Ω)' }
            ]}
          />
        </TabsContent>

        <TabsContent value="practice" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Practice & Assessment
              </CardTitle>
              <CardDescription>
                Test your knowledge with interactive exercises
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Reinforce learning with practice questions and quizzes.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">25</div>
                    <p className="text-sm">Practice Questions</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">12</div>
                    <p className="text-sm">Completed Quizzes</p>
                  </div>
                  <div className="p-4 border rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-600">87%</div>
                    <p className="text-sm">Average Score</p>
                  </div>
                </div>
                <Button className="w-full">Start Practice Session</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Voice Assistant */}
      <FloatingVoiceButton 
        userName="Student"
        language="en-US"
      />
    </div>
  );
};

export default EnhancedConceptLandingPage;
