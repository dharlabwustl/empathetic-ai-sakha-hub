
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Clock, 
  Rocket, 
  BookOpen, 
  Filter,
  Search,
  CheckCircle2, 
  TimerOff, 
  ArrowRight 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const mockExams = [
  {
    id: '1',
    title: 'Physics Mechanics Full Test',
    subject: 'Physics',
    topic: 'Mechanics',
    questions: 30,
    difficulty: 'medium',
    duration: 60,
    completed: false,
    inProgress: false,
    score: null,
    chapter: 'Unit 3: Mechanics'
  },
  {
    id: '2',
    title: 'Chemical Bonding Quiz',
    subject: 'Chemistry',
    topic: 'Chemical Bonding',
    questions: 20,
    difficulty: 'easy',
    duration: 40,
    completed: true,
    inProgress: false,
    score: 85,
    chapter: 'Unit 2: Chemical Bonding'
  },
  {
    id: '3',
    title: 'Calculus Integration Test',
    subject: 'Mathematics',
    topic: 'Calculus',
    questions: 25,
    difficulty: 'hard',
    duration: 50,
    completed: false,
    inProgress: true,
    score: null,
    chapter: 'Unit 4: Integration'
  }
];

interface ExamCardProps {
  exam: typeof mockExams[0];
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  const navigate = useNavigate();

  const handleStartExam = () => {
    navigate(`/dashboard/student/exams/${exam.id}`);
  };

  const handleResumeExam = () => {
    navigate(`/dashboard/student/exams/${exam.id}`);
  };

  const handleReviewExam = () => {
    navigate(`/dashboard/student/exams/${exam.id}/results`);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{exam.title}</CardTitle>
            <p className="text-sm text-gray-500">{exam.chapter}</p>
          </div>
          <Badge className={
            exam.difficulty === 'easy' ? 'bg-green-100 text-green-800' : 
            exam.difficulty === 'medium' ? 'bg-amber-100 text-amber-800' : 
            'bg-red-100 text-red-800'
          }>
            {exam.difficulty.charAt(0).toUpperCase() + exam.difficulty.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div className="flex items-center gap-1.5">
            <FileText className="h-4 w-4 text-gray-500" />
            <span>{exam.questions} questions</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-gray-500" />
            <span>{exam.duration} minutes</span>
          </div>
          <div className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-gray-500" />
            <span>{exam.subject}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Rocket className="h-4 w-4 text-gray-500" />
            <span>{exam.topic}</span>
          </div>
        </div>
        
        {exam.completed && (
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Score</span>
              <span className="text-sm font-bold">{exam.score}%</span>
            </div>
            <Progress value={exam.score || 0} className="h-2" />
          </div>
        )}
        
        {exam.inProgress && (
          <div className="p-2 bg-amber-50 border border-amber-100 rounded flex items-center gap-2 mb-2">
            <TimerOff className="h-4 w-4 text-amber-600" />
            <p className="text-sm text-amber-800">Exam in progress</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!exam.completed && !exam.inProgress && (
          <Button className="w-full" onClick={handleStartExam}>Start Exam</Button>
        )}
        
        {exam.inProgress && (
          <Button className="w-full" variant="outline" onClick={handleResumeExam}>Resume Exam</Button>
        )}
        
        {exam.completed && (
          <Button className="w-full" variant="outline" onClick={handleReviewExam}>Review Exam</Button>
        )}
      </CardFooter>
    </Card>
  );
};

const PracticeExamsSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  
  // Filter exams based on search and filters
  const filteredExams = mockExams.filter(exam => {
    // Search filter
    if (searchQuery && !exam.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Subject filter
    if (selectedSubject && exam.subject !== selectedSubject) {
      return false;
    }
    
    // Difficulty filter
    if (selectedDifficulty && exam.difficulty !== selectedDifficulty) {
      return false;
    }
    
    // Status filter
    if (selectedStatus === 'completed' && !exam.completed) {
      return false;
    }
    if (selectedStatus === 'not_completed' && (exam.completed || exam.inProgress)) {
      return false;
    }
    if (selectedStatus === 'in_progress' && !exam.inProgress) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Practice Exams</h2>
          <p className="text-gray-500">Test your knowledge with these practice exams</p>
        </div>
        <Link to="/dashboard/student/exams">
          <Button variant="outline" className="flex items-center gap-2">
            View All <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
      
      {/* Filters and search */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center relative">
              <Search className="absolute left-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search exams..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Subjects</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Difficulties</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="not_completed">Not Started</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {/* Exams grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExams.length > 0 ? (
          filteredExams.map(exam => (
            <ExamCard key={exam.id} exam={exam} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg">
            <FileText className="h-12 w-12 text-gray-400 mb-2" />
            <h3 className="font-medium text-gray-900">No exams found</h3>
            <p className="text-gray-500">Try adjusting your filters or search term.</p>
          </div>
        )}
      </div>
      
      {/* Create new exam button for instructors */}
      <div className="flex justify-center">
        <Button variant="outline" className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          Browse All Exams
        </Button>
      </div>
    </div>
  );
};

export default PracticeExamsSection;
