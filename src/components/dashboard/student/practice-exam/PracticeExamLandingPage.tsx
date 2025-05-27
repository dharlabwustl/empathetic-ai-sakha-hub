
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Search, 
  Plus, 
  Clock, 
  Target,
  TrendingUp,
  Award,
  Filter,
  BookOpen
} from 'lucide-react';
import OverviewSection from '@/components/dashboard/student/OverviewSection';
import PracticeExamCard from './PracticeExamCard';

const PracticeExamLandingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const overviewData = {
    type: "Practice Exams" as const,
    title: "NEET Practice Exams Overview",
    subjects: [
      { name: "Physics", completed: 8, total: 12, progress: 67, efficiency: 82, studyTime: 240 },
      { name: "Chemistry", completed: 6, total: 10, progress: 60, efficiency: 75, studyTime: 180 },
      { name: "Biology", completed: 10, total: 14, progress: 71, efficiency: 88, studyTime: 280 }
    ],
    totalStudyTime: 700,
    overallProgress: 66,
    suggestions: [
      "Focus on Chemistry practice exams to improve weak areas",
      "Your Biology exam performance is excellent - maintain consistency",
      "Physics problem-solving speed needs improvement"
    ]
  };

  const practiceExams = [
    {
      id: 'physics-mechanics-1',
      title: 'Mechanics and Motion - Full Test',
      subject: 'Physics',
      totalQuestions: 45,
      duration: 60,
      difficulty: 'medium' as const,
      lastScore: 78,
      averageScore: 75,
      attemptsCount: 3,
      topic: 'Laws of Motion, Kinematics',
      status: 'completed' as const,
      isPremium: false
    },
    {
      id: 'chemistry-organic-1',
      title: 'Organic Chemistry Comprehensive',
      subject: 'Chemistry',
      totalQuestions: 50,
      duration: 75,
      difficulty: 'hard' as const,
      lastScore: 65,
      averageScore: 62,
      attemptsCount: 2,
      topic: 'Reaction Mechanisms, Nomenclature',
      status: 'completed' as const,
      isPremium: true
    },
    {
      id: 'biology-genetics-1',
      title: 'Genetics and Evolution',
      subject: 'Biology',
      totalQuestions: 40,
      duration: 50,
      difficulty: 'medium' as const,
      lastScore: 85,
      averageScore: 82,
      attemptsCount: 4,
      topic: 'Heredity, Natural Selection',
      status: 'completed' as const,
      isPremium: false
    },
    {
      id: 'physics-optics-1',
      title: 'Optics and Wave Theory',
      subject: 'Physics',
      totalQuestions: 35,
      duration: 45,
      difficulty: 'easy' as const,
      attemptsCount: 0,
      topic: 'Ray Optics, Wave Optics',
      status: 'not-started' as const,
      isPremium: false
    },
    {
      id: 'chemistry-physical-1',
      title: 'Physical Chemistry Mock Test',
      subject: 'Chemistry',
      totalQuestions: 55,
      duration: 80,
      difficulty: 'hard' as const,
      attemptsCount: 1,
      topic: 'Thermodynamics, Kinetics',
      status: 'in-progress' as const,
      isPremium: true
    },
    {
      id: 'biology-ecology-1',
      title: 'Ecology and Environment',
      subject: 'Biology',
      totalQuestions: 30,
      duration: 40,
      difficulty: 'easy' as const,
      attemptsCount: 0,
      topic: 'Ecosystem, Biodiversity',
      status: 'not-started' as const,
      isPremium: false
    }
  ];

  const subjects = ['all', 'Physics', 'Chemistry', 'Biology'];

  const filteredExams = practiceExams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.topic.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || exam.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/50 dark:from-emerald-900/10 dark:via-gray-900 dark:to-blue-900/10">
      <Helmet>
        <title>Practice Exams - PREPZR</title>
        <meta name="description" content="NEET practice exams for comprehensive assessment" />
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
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Practice Exams
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Comprehensive mock tests designed to simulate real NEET exam conditions
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            <div className="flex items-center gap-2 text-emerald-600">
              <Target className="h-5 w-5" />
              <span className="font-medium">Real Exam Simulation</span>
            </div>
            <div className="flex items-center gap-2 text-blue-600">
              <Clock className="h-5 w-5" />
              <span className="font-medium">Timed Practice</span>
            </div>
            <div className="flex items-center gap-2 text-purple-600">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium">Performance Analytics</span>
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
              placeholder="Search practice exams..."
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
            Create Custom
          </Button>
        </motion.div>

        {/* Practice Exams Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredExams.map((exam, index) => (
            <motion.div
              key={exam.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <PracticeExamCard {...exam} />
            </motion.div>
          ))}
        </motion.div>

        {/* No exams found */}
        {filteredExams.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No practice exams found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Custom Exam
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PracticeExamLandingPage;
