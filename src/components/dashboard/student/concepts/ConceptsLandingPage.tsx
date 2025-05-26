import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Brain, Clock, TrendingUp, Target, ChevronRight, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StudyOverviewSection from '../overview/StudyOverviewSection';

const ConceptsLandingPage = () => {
  const navigate = useNavigate();

  // Mock data for overview section
  const overviewData = {
    subjects: [
      { name: 'Physics', completed: 15, total: 25, progress: 60, efficiency: 85, studyTime: 240 },
      { name: 'Chemistry', completed: 12, total: 20, progress: 60, efficiency: 78, studyTime: 180 },
      { name: 'Mathematics', completed: 18, total: 22, progress: 82, efficiency: 92, studyTime: 300 },
      { name: 'Biology', completed: 10, total: 18, progress: 56, efficiency: 88, studyTime: 150 }
    ],
    totalStudyTime: 870,
    overallProgress: 65,
    suggestions: [
      'Focus on Physics - Mechanics concepts need more attention 🔧',
      'Great progress in Mathematics! Keep up the momentum 📈',
      'Biology concepts are well understood, move to practice questions 🧬',
      'Chemistry organic reactions need more visual learning 🧪',
      'Consider taking a concept mastery quiz to identify gaps 🎯'
    ]
  };

  const conceptCategories = [
    {
      subject: 'Physics',
      icon: '⚡',
      concepts: [
        { id: '1', title: 'Newton\'s Laws of Motion', difficulty: 'Medium', mastery: 85, timeToComplete: '45 min', completed: true },
        { id: '2', title: 'Electromagnetic Induction', difficulty: 'Hard', mastery: 65, timeToComplete: '60 min', completed: false },
        { id: '3', title: 'Wave Optics', difficulty: 'Hard', mastery: 45, timeToComplete: '50 min', completed: false },
        { id: '4', title: 'Thermodynamics', difficulty: 'Medium', mastery: 78, timeToComplete: '40 min', completed: true }
      ]
    },
    {
      subject: 'Chemistry',
      icon: '🧪',
      concepts: [
        { id: '5', title: 'Chemical Bonding', difficulty: 'Medium', mastery: 92, timeToComplete: '35 min', completed: true },
        { id: '6', title: 'Organic Reactions', difficulty: 'Hard', mastery: 58, timeToComplete: '55 min', completed: false },
        { id: '7', title: 'Electrochemistry', difficulty: 'Medium', mastery: 70, timeToComplete: '45 min', completed: false }
      ]
    },
    {
      subject: 'Mathematics',
      icon: '📐',
      concepts: [
        { id: '8', title: 'Calculus Integration', difficulty: 'Hard', mastery: 88, timeToComplete: '50 min', completed: true },
        { id: '9', title: 'Coordinate Geometry', difficulty: 'Medium', mastery: 75, timeToComplete: '40 min', completed: true },
        { id: '10', title: 'Probability', difficulty: 'Easy', mastery: 95, timeToComplete: '30 min', completed: true }
      ]
    },
    {
      subject: 'Biology',
      icon: '🧬',
      concepts: [
        { id: '11', title: 'Cell Biology', difficulty: 'Medium', mastery: 82, timeToComplete: '40 min', completed: true },
        { id: '12', title: 'Genetics', difficulty: 'Hard', mastery: 68, timeToComplete: '60 min', completed: false },
        { id: '13', title: 'Plant Physiology', difficulty: 'Medium', mastery: 73, timeToComplete: '45 min', completed: false }
      ]
    }
  ];

  const handleConceptClick = (conceptId: string) => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getMasteryColor = (mastery: number) => {
    if (mastery >= 80) return 'text-green-600';
    if (mastery >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Study Overview Section */}
      <StudyOverviewSection
        title="Concept Learning"
        subjects={overviewData.subjects}
        totalStudyTime={overviewData.totalStudyTime}
        overallProgress={overviewData.overallProgress}
        suggestions={overviewData.suggestions}
        pageType="concepts"
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Concept Cards</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Master fundamental concepts with AI-powered explanations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </motion.div>

      {/* Concept Categories */}
      <div className="space-y-6">
        {conceptCategories.map((category, categoryIndex) => (
          <motion.div
            key={category.subject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <span>{category.subject}</span>
                  <Badge variant="secondary">{category.concepts.length} concepts</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {category.concepts.map((concept) => (
                    <motion.div
                      key={concept.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card 
                        className="cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-blue-500"
                        onClick={() => handleConceptClick(concept.id)}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex justify-between items-start">
                              <h3 className="font-semibold text-sm line-clamp-2">{concept.title}</h3>
                              {concept.completed && (
                                <div className="text-green-500 text-xs">✓</div>
                              )}
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <Badge size="sm" className={getDifficultyColor(concept.difficulty)}>
                                {concept.difficulty}
                              </Badge>
                              <span className="text-xs text-gray-500">{concept.timeToComplete}</span>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-600">Mastery</span>
                                <span className={`text-xs font-medium ${getMasteryColor(concept.mastery)}`}>
                                  {concept.mastery}%
                                </span>
                              </div>
                              <Progress value={concept.mastery} className="h-2" />
                            </div>
                            
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="w-full justify-between text-xs"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleConceptClick(concept.id);
                              }}
                            >
                              {concept.completed ? 'Review Concept' : 'Learn Concept'}
                              <ChevronRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ConceptsLandingPage;
