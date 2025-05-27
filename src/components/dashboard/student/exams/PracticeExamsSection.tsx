import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, Plus, Clock, Target, Star, Play, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import OverviewSection from '@/components/dashboard/student/OverviewSection';
import PracticeExamCard from './PracticeExamCard';

const PracticeExamsSection = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  // Mock practice exam data
  const mockExams = [
    {
      id: '1',
      title: 'NEET Physics Mock Test 1',
      subject: 'Physics',
      totalQuestions: 45,
      duration: 180,
      difficulty: 'medium' as const,
      status: 'daily' as const,
      dueDate: 'Today',
      lastScore: 85,
      attempts: 2,
      averageScore: 82,
      examType: 'Full Length'
    },
    {
      id: '2',
      title: 'Organic Chemistry Practice',
      subject: 'Chemistry',
      totalQuestions: 30,
      duration: 90,
      difficulty: 'hard' as const,
      status: 'pending' as const,
      dueDate: 'Tomorrow',
      attempts: 0,
      examType: 'Topic Test'
    },
    {
      id: '3',
      title: 'Biology Chapter Test - Genetics',
      subject: 'Biology',
      totalQuestions: 25,
      duration: 60,
      difficulty: 'easy' as const,
      status: 'completed' as const,
      lastScore: 92,
      attempts: 3,
      averageScore: 88,
      examType: 'Chapter Test'
    }
  ];

  const overviewData = {
    type: "Practice Exams" as const,
    title: "NEET Practice Exams Overview",
    subjects: [
      { name: "Physics", completed: 12, total: 20, progress: 60, efficiency: 78, studyTime: 85 },
      { name: "Chemistry", completed: 8, total: 15, progress: 53, efficiency: 72, studyTime: 65 },
      { name: "Biology", completed: 15, total: 18, progress: 83, efficiency: 85, studyTime: 95 }
    ],
    totalStudyTime: 245,
    overallProgress: 65,
    suggestions: [
      "Focus on Chemistry practice exams to improve weak areas",
      "Physics problem-solving speed needs improvement",
      "Biology performance is excellent - maintain consistency"
    ]
  };

  const subjects = ['all', 'Physics', 'Chemistry', 'Biology'];
  const difficulties = ['all', 'easy', 'medium', 'hard'];

  const filteredExams = mockExams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || exam.subject === selectedSubject;
    const matchesDifficulty = selectedDifficulty === 'all' || exam.difficulty === selectedDifficulty;
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-blue-50/50 dark:from-green-900/10 dark:via-gray-900 dark:to-blue-900/10">
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
            <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Practice Exams
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Test your knowledge with comprehensive practice exams designed for NEET preparation
          </p>
        </motion.div>

        {/* Filters */}
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
          
          <div className="flex gap-2">
            {difficulties.map((difficulty) => (
              <Button
                key={difficulty}
                variant={selectedDifficulty === difficulty ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDifficulty(difficulty)}
                className="capitalize"
              >
                {difficulty}
              </Button>
            ))}
          </div>
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
            <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
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

export default PracticeExamsSection;
