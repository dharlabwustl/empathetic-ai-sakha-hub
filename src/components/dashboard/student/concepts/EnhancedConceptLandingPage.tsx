import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Book, 
  BookOpen, 
  Search, 
  Plus, 
  Filter, 
  Lightbulb,
  Clock,
  Target,
  TrendingUp
} from 'lucide-react';
import OverviewSection from '@/components/dashboard/student/OverviewSection';

interface Concept {
  id: string;
  title: string;
  subject: string;
  topic: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: number;
  lastStudied: string;
}

const EnhancedConceptLandingPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const navigate = useNavigate();

  const overviewData = {
    type: "Concepts" as const,
    title: "NEET Concepts Overview",
    subjects: [
      { name: "Physics", completed: 45, total: 60, progress: 75, efficiency: 88, studyTime: 180 },
      { name: "Chemistry", completed: 32, total: 55, progress: 58, efficiency: 72, studyTime: 150 },
      { name: "Biology", completed: 55, total: 65, progress: 85, efficiency: 92, studyTime: 200 }
    ],
    totalStudyTime: 530,
    overallProgress: 73,
    suggestions: [
      "Focus on Organic Chemistry - showing improvement trend",
      "Physics mechanics concepts need review",
      "Biology cell structure mastery is excellent - maintain pace"
    ]
  };

  const conceptCategories = [
    {
      id: 1,
      title: "Mechanics",
      subject: "Physics",
      description: "Fundamental laws of motion, gravitation, and energy",
      conceptCount: 28,
      icon: <BookOpen className="h-5 w-5 text-blue-500" />
    },
    {
      id: 2,
      title: "Organic Chemistry",
      subject: "Chemistry",
      description: "Reactions, mechanisms, and properties of organic compounds",
      conceptCount: 35,
      icon: <BookOpen className="h-5 w-5 text-red-500" />
    },
    {
      id: 3,
      title: "Cell Biology",
      subject: "Biology",
      description: "Structure, function, and life cycle of cells",
      conceptCount: 42,
      icon: <BookOpen className="h-5 w-5 text-green-500" />
    }
  ];

  const concepts: Concept[] = [
    {
      id: "concept-1",
      title: "Newton's Laws of Motion",
      subject: "Physics",
      topic: "Mechanics",
      description: "Understand the three laws governing motion and their applications",
      difficulty: "Medium",
      estimatedTime: 45,
      lastStudied: "2 days ago"
    },
    {
      id: "concept-2",
      title: "Chemical Bonding",
      subject: "Chemistry",
      topic: "Inorganic Chemistry",
      description: "Explore ionic, covalent, and metallic bonds",
      difficulty: "Easy",
      estimatedTime: 30,
      lastStudied: "1 week ago"
    },
    {
      id: "concept-3",
      title: "Cell Structure and Function",
      subject: "Biology",
      topic: "Cell Biology",
      description: "Learn about organelles and their roles",
      difficulty: "Medium",
      estimatedTime: 60,
      lastStudied: "Today"
    }
  ];

  const subjects = ['all', 'Physics', 'Chemistry', 'Biology'];

  const filteredConcepts = concepts.filter(concept => {
    const matchesSearch = concept.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          concept.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || concept.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-blue-900/10 dark:via-gray-900 dark:to-purple-900/10">
      <Helmet>
        <title>Enhanced Concepts - PREPZR</title>
        <meta name="description" content="Interactive concept learning with AI-powered explanations" />
      </Helmet>

      {/* Overview Section */}
      <div className="p-6">
        <OverviewSection {...overviewData} />
      </div>

      {/* Rest of existing content */}
      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
              <Book className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Explore Key Concepts
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Dive deep into essential topics with interactive explanations and examples
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
            Add Concept
          </Button>
        </motion.div>

        {/* Concept Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {conceptCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold line-clamp-2">
                        {category.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                    </div>
                    {category.icon}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">{category.conceptCount} concepts</p>
                  <Button className="w-full mt-4" size="sm">
                    Explore
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Concepts List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredConcepts.map((concept, index) => (
            <motion.div
              key={concept.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg font-semibold line-clamp-2">
                        {concept.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">{concept.topic}</p>
                    </div>
                    <Badge variant="outline" className={getDifficultyColor(concept.difficulty)}>
                      {concept.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-3">{concept.description}</p>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{concept.estimatedTime} min</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Lightbulb className="h-3 w-3" />
                      <span>Last: {concept.lastStudied}</span>
                    </div>
                  </div>
                  <Button className="w-full" size="sm">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredConcepts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No concepts found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search terms or filters</p>
            <Button>
              Add Your First Concept
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EnhancedConceptLandingPage;
