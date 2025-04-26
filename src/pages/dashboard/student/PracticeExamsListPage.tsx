
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Filter, Search, SortAsc, SortDesc, BookOpen, BarChart, Calendar } from 'lucide-react';
import { PracticeExam } from '@/components/dashboard/student/practice-exams/PracticeExamCard';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PracticeExamsListPage: React.FC = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState<PracticeExam[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<string>('all-exams');

  useEffect(() => {
    // This would be an API call in a real app
    const fetchExams = () => {
      setLoading(true);
      
      setTimeout(() => {
        // Mock data
        const mockExams: PracticeExam[] = [
          {
            id: "physics-101",
            title: "Physics Fundamentals",
            subject: "Physics",
            topic: "Mechanics",
            questionCount: 25,
            duration: 60,
            difficulty: "medium",
            status: "not-started"
          },
          {
            id: "chemistry-101",
            title: "Chemistry Basics",
            subject: "Chemistry",
            topic: "Periodic Table",
            questionCount: 30,
            duration: 45,
            difficulty: "easy",
            status: "in-progress"
          },
          {
            id: "biology-101",
            title: "Biology Essentials",
            subject: "Biology",
            topic: "Cell Biology",
            questionCount: 40,
            duration: 90,
            difficulty: "hard",
            status: "completed",
            score: 85,
            completedAt: "2023-05-15T14:30:00"
          },
          {
            id: "math-101",
            title: "Mathematics Review",
            subject: "Mathematics",
            topic: "Calculus",
            questionCount: 20,
            duration: 45,
            difficulty: "medium",
            status: "completed",
            score: 72,
            completedAt: "2023-05-10T10:15:00"
          },
          {
            id: "physics-102",
            title: "Advanced Physics Concepts",
            subject: "Physics",
            topic: "Thermodynamics",
            questionCount: 30,
            duration: 75,
            difficulty: "hard",
            status: "not-started"
          },
          {
            id: "chemistry-102",
            title: "Organic Chemistry",
            subject: "Chemistry",
            topic: "Carbon Compounds",
            questionCount: 35,
            duration: 60,
            difficulty: "hard",
            status: "not-started"
          },
          {
            id: "physics-103",
            title: "Electromagnetism",
            subject: "Physics",
            topic: "Electricity & Magnetism",
            questionCount: 28,
            duration: 60,
            difficulty: "medium",
            status: "not-started"
          },
          {
            id: "math-102",
            title: "Algebra Mastery",
            subject: "Mathematics",
            topic: "Advanced Algebra",
            questionCount: 25,
            duration: 50,
            difficulty: "medium",
            status: "not-started"
          }
        ];
        
        setExams(mockExams);
        setLoading(false);
      }, 800);
    };
    
    fetchExams();
  }, []);

  // Apply filters
  const filteredExams = exams.filter(exam => {
    // Search term
    if (searchTerm && !exam.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !exam.topic.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Subject filter
    if (subjectFilter !== 'all' && exam.subject !== subjectFilter) {
      return false;
    }
    
    // Difficulty filter
    if (difficultyFilter !== 'all' && exam.difficulty !== difficultyFilter) {
      return false;
    }
    
    // Status filter
    if (statusFilter !== 'all' && exam.status !== statusFilter) {
      return false;
    }
    
    // Tab filter
    if (activeTab === 'completed' && exam.status !== 'completed') {
      return false;
    } else if (activeTab === 'in-progress' && exam.status !== 'in-progress') {
      return false;
    } else if (activeTab === 'not-started' && exam.status !== 'not-started') {
      return false;
    }
    
    return true;
  });
  
  // Get unique subjects
  const subjects = ['all', ...new Set(exams.map(exam => exam.subject))];

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/dashboard/student/overview")}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Button>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Practice Exams</h1>
          <p className="text-gray-600">Prepare for your exams with our comprehensive practice tests</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Exam
          </Button>
          <Button>
            <BarChart className="h-4 w-4 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs 
        defaultValue="all-exams" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="mb-6"
      >
        <TabsList className="grid grid-cols-4 max-w-md">
          <TabsTrigger value="all-exams">All Exams</TabsTrigger>
          <TabsTrigger value="not-started">Not Started</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Search and filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter size={18} />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Search exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
                icon={<Search className="h-4 w-4 text-gray-400" />}
              />
            </div>
            <div>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Subjects</SelectLabel>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject === 'all' ? 'All Subjects' : subject}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Difficulty</SelectLabel>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Exams grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading exams...</p>
          </div>
        </div>
      ) : filteredExams.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExams.map((exam) => (
            <Link 
              key={exam.id} 
              to={`/dashboard/student/exams/${exam.id}`}
              className="block h-full"
            >
              <Card className="h-full transition-shadow hover:shadow-lg">
                <CardHeader className={`pb-2 border-b ${
                  exam.status === 'completed' ? 'border-green-200 bg-green-50' :
                  exam.status === 'in-progress' ? 'border-yellow-200 bg-yellow-50' :
                  'border-blue-200 bg-blue-50'
                }`}>
                  <CardTitle className="text-lg line-clamp-1" title={exam.title}>
                    {exam.title}
                  </CardTitle>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">{exam.subject}</span>
                    <span className={`px-2 py-0.5 rounded-full ${
                      exam.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                      exam.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {exam.difficulty}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Topic:</span>
                      <span>{exam.topic}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Questions:</span>
                      <span>{exam.questionCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Duration:</span>
                      <span>{exam.duration} min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Status:</span>
                      <span className={`${
                        exam.status === 'completed' ? 'text-green-600' :
                        exam.status === 'in-progress' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`}>
                        {exam.status === 'not-started' ? 'Not Started' :
                         exam.status === 'in-progress' ? 'In Progress' : 'Completed'}
                      </span>
                    </div>
                    {exam.score !== undefined && (
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-gray-500">Score:</span>
                        <span className={`${
                          exam.score >= 80 ? 'text-green-600' :
                          exam.score >= 60 ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {exam.score}%
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <h3 className="text-xl font-medium mb-1">No Exams Found</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            We couldn't find any exams matching your search criteria. Try adjusting your filters or search term.
          </p>
        </div>
      )}
      
      {/* Performance Summary */}
      {activeTab === 'completed' && filteredExams.some(e => e.status === 'completed') && (
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-600" />
              Your Performance Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-gray-500 text-sm mb-1">Exams Completed</h4>
                <div className="text-2xl font-bold">
                  {exams.filter(e => e.status === 'completed').length}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-gray-500 text-sm mb-1">Average Score</h4>
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(
                    exams
                      .filter(e => e.status === 'completed' && e.score !== undefined)
                      .reduce((sum, e) => sum + (e.score || 0), 0) / 
                    exams.filter(e => e.status === 'completed' && e.score !== undefined).length
                  )}%
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-gray-500 text-sm mb-1">Best Subject</h4>
                <div className="text-2xl font-bold text-blue-600">
                  Physics
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="text-gray-500 text-sm mb-1">Area to Improve</h4>
                <div className="text-2xl font-bold text-amber-600">
                  Chemistry
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PracticeExamsListPage;
