
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PracticeExamOverviewSection from './PracticeExamOverviewSection';
import { FileText, Plus, Filter, Search, Clock, Target, Star, ArrowRight, BookOpen, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Mock exam data similar to concept cards
const mockExams = [
  {
    id: '1',
    title: 'NEET Physics Mock Test 1',
    subject: 'Physics',
    chapter: 'Comprehensive',
    status: 'not-started',
    difficulty: 'medium',
    timeEstimate: '180 min',
    mastery: 0,
    priority: 1,
    questions: 45,
    isRecommended: true,
    description: 'Complete physics mock test covering mechanics, thermodynamics, and optics'
  },
  {
    id: '2',
    title: 'NEET Chemistry Practice Set',
    subject: 'Chemistry',
    chapter: 'Organic Chemistry',
    status: 'completed',
    difficulty: 'hard',
    timeEstimate: '180 min',
    mastery: 78,
    priority: 0,
    questions: 45,
    isRecommended: false,
    description: 'Advanced chemistry practice focusing on organic reactions and mechanisms'
  },
  {
    id: '3',
    title: 'NEET Biology Comprehensive',
    subject: 'Biology',
    chapter: 'Human Physiology',
    status: 'in-progress',
    difficulty: 'medium',
    timeEstimate: '180 min',
    mastery: 45,
    priority: 2,
    questions: 90,
    isRecommended: true,
    description: 'Comprehensive biology test covering human physiology and plant biology'
  },
  {
    id: '4',
    title: 'JEE Mathematics Advanced',
    subject: 'Mathematics',
    chapter: 'Calculus & Algebra',
    status: 'not-started',
    difficulty: 'hard',
    timeEstimate: '240 min',
    mastery: 0,
    priority: 3,
    questions: 75,
    isRecommended: false,
    description: 'Advanced mathematics covering calculus, algebra, and coordinate geometry'
  }
];

// Get status badge color and text
const getStatusInfo = (status: string) => {
  switch (status) {
    case "completed":
      return { color: "bg-emerald-100 text-emerald-800 border-emerald-200", icon: Target, text: "Completed" };
    case "in-progress":
      return { color: "bg-blue-100 text-blue-800 border-blue-200", icon: Clock, text: "In Progress" };
    case "not-started":
      return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: BookOpen, text: "Not Started" };
    default:
      return { color: "bg-gray-100 text-gray-800 border-gray-200", icon: BookOpen, text: "Unknown" };
  }
};

// Get difficulty badge color and text
const getDifficultyInfo = (difficulty: string) => {
  switch (difficulty) {
    case "easy":
      return { color: "bg-green-100 text-green-800 border-green-200", text: "Easy" };
    case "medium":
      return { color: "bg-yellow-100 text-yellow-800 border-yellow-200", text: "Medium" };
    case "hard":
      return { color: "bg-red-100 text-red-800 border-red-200", text: "Hard" };
    default:
      return { color: "bg-gray-100 text-gray-800 border-gray-200", text: "Unknown" };
  }
};

const getSubjectColor = (subject: string) => {
  const colors = {
    'Physics': 'bg-blue-50 text-blue-700 border-blue-200',
    'Chemistry': 'bg-purple-50 text-purple-700 border-purple-200', 
    'Biology': 'bg-green-50 text-green-700 border-green-200',
    'Mathematics': 'bg-orange-50 text-orange-700 border-orange-200'
  };
  return colors[subject as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
};

interface ExamCardProps {
  exam: typeof mockExams[0];
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  const statusInfo = getStatusInfo(exam.status);
  const difficultyInfo = getDifficultyInfo(exam.difficulty);
  const StatusIcon = statusInfo.icon;
  const navigate = useNavigate();

  const handleOpenExam = () => {
    navigate(`/dashboard/student/practice-exam/${exam.id}/start`);
  };

  return (
    <Card className="h-full flex flex-col transform hover:scale-[1.01] transition-all duration-200 hover:shadow-md overflow-hidden border border-gray-200/60 dark:border-gray-800/60 rounded-xl bg-gradient-to-br from-white to-gray-50/80 dark:from-gray-900 dark:to-gray-950/80">
      <CardHeader className="pb-2 space-y-2 border-b border-gray-100 dark:border-gray-800">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={`${difficultyInfo.color} capitalize px-3 py-1 rounded-full text-xs font-semibold`}>
            {difficultyInfo.text}
          </Badge>
          {exam.isRecommended && (
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          )}
        </div>
        <CardTitle className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 hover:from-indigo-600 hover:to-purple-600 dark:hover:from-indigo-400 dark:hover:to-purple-400 transition-all duration-300">
          {exam.title}
        </CardTitle>
        <div className="flex flex-wrap gap-1.5 mt-1">
          <Badge variant="outline" className={`${getSubjectColor(exam.subject)} font-normal rounded-md`}>
            {exam.subject}
          </Badge>
          <Badge variant="outline" className="bg-violet-100 text-violet-800 border-violet-200 font-normal rounded-md">
            {exam.chapter}
          </Badge>
          <Badge variant="outline" className={`${statusInfo.color} font-normal rounded-md flex items-center gap-1`}>
            <StatusIcon className="h-3 w-3" />
            {statusInfo.text}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow pt-4 pb-3">
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
          {exam.description}
        </p>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <Clock className="h-3.5 w-3.5" /> Progress
              </span>
              <span className="text-indigo-600 dark:text-indigo-400">{exam.mastery}%</span>
            </div>
            <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  exam.mastery >= 80 
                    ? "bg-gradient-to-r from-emerald-500 to-green-600" 
                    : exam.mastery >= 60 
                      ? "bg-gradient-to-r from-yellow-400 to-amber-500" 
                      : exam.mastery >= 40
                        ? "bg-gradient-to-r from-blue-400 to-blue-600"
                        : "bg-gradient-to-r from-gray-400 to-gray-500"
                }`} 
                style={{ width: `${exam.mastery}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <Clock className="h-5 w-5 mx-auto mb-1 text-blue-600" />
            <p className="text-sm font-bold text-blue-700 dark:text-blue-400">{exam.timeEstimate}</p>
            <p className="text-xs text-blue-600 dark:text-blue-500 font-medium">Duration</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg border border-green-200 dark:border-green-800">
            <Target className="h-5 w-5 mx-auto mb-1 text-green-600" />
            <p className="text-sm font-bold text-green-700 dark:text-green-400">{exam.questions}</p>
            <p className="text-xs text-green-600 dark:text-green-500 font-medium">Questions</p>
          </div>
          <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <TrendingUp className="h-5 w-5 mx-auto mb-1 text-purple-600" />
            <p className="text-sm font-bold text-purple-700 dark:text-purple-400">{exam.difficulty}</p>
            <p className="text-xs text-purple-600 dark:text-purple-500 font-medium">Level</p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 border-t border-gray-100 dark:border-gray-800 p-4">
        <Button 
          variant="default" 
          className="w-full flex justify-between items-center bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/20 transition-all duration-300 rounded-lg"
          onClick={handleOpenExam}
        >
          <BookOpen className="h-4 w-4" />
          <span className="font-medium">
            {exam.status === "completed" 
              ? "Review Results" 
              : exam.status === "in-progress" 
                ? "Continue Exam" 
                : "Start Exam"
            }
          </span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const PracticeExamsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');

  const filteredExams = mockExams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         exam.chapter.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || exam.subject.toLowerCase() === subjectFilter.toLowerCase();
    return matchesSearch && matchesSubject;
  });

  const subjects = Array.from(new Set(mockExams.map(exam => exam.subject)));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Practice Exams</h1>
          <p className="text-gray-600 dark:text-gray-400">Test your knowledge with comprehensive mock exams</p>
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
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Exam
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="all-exams">All Exams</TabsTrigger>
          <TabsTrigger value="results">My Results</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <PracticeExamOverviewSection />
        </TabsContent>

        <TabsContent value="all-exams">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search practice exams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject.toLowerCase()}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.05 }}
            >
              {filteredExams.map(exam => (
                <motion.div
                  key={exam.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ExamCard exam={exam} />
                </motion.div>
              ))}
            </motion.div>

            {filteredExams.length === 0 && (
              <div className="text-center py-8">
                <p className="text-lg font-medium">No practice exams found</p>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="results">
          <Card>
            <CardHeader>
              <CardTitle>My Exam Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Your exam results and performance analytics will appear here...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PracticeExamsSection;
