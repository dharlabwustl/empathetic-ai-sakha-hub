
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Search, Plus, Clock, ArrowRight, Tag, Filter, ChevronDown, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PracticeExam {
  id: string;
  examName: string;
  subject: string;
  topic: string;
  questionCount: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  completed: boolean;
  score?: number;
  lastAttempted?: string;
  timeLimit: number;
  averageCompletion?: number;
  tags: string[];
  isPro?: boolean;
  locked?: boolean;
}

// Mock data for practice exams
const mockPracticeExams: PracticeExam[] = [
  {
    id: '1',
    examName: 'Physics Mechanics Quiz',
    subject: 'Physics',
    topic: 'Mechanics',
    questionCount: 15,
    difficulty: 'Medium',
    completed: true,
    score: 85,
    lastAttempted: '2023-11-15',
    timeLimit: 20,
    averageCompletion: 17,
    tags: ['mechanics', 'newton-laws', 'kinematics']
  },
  {
    id: '2',
    examName: 'Organic Chemistry Test',
    subject: 'Chemistry',
    topic: 'Organic Chemistry',
    questionCount: 25,
    difficulty: 'Hard',
    completed: false,
    timeLimit: 30,
    tags: ['organic', 'reactions', 'structures']
  },
  {
    id: '3',
    examName: 'Calculus Practice',
    subject: 'Mathematics',
    topic: 'Calculus',
    questionCount: 20,
    difficulty: 'Hard',
    completed: false,
    timeLimit: 25,
    tags: ['integration', 'differentiation', 'limits']
  },
  {
    id: '4',
    examName: 'Cell Biology Quiz',
    subject: 'Biology',
    topic: 'Cell Biology',
    questionCount: 15,
    difficulty: 'Easy',
    completed: true,
    score: 95,
    lastAttempted: '2023-11-16',
    timeLimit: 15,
    averageCompletion: 12,
    tags: ['cells', 'organelles', 'functions']
  },
  {
    id: '5',
    examName: 'Advanced Quantum Mechanics',
    subject: 'Physics',
    topic: 'Quantum Physics',
    questionCount: 30,
    difficulty: 'Expert',
    completed: false,
    timeLimit: 45,
    tags: ['quantum', 'advanced', 'theoretical'],
    isPro: true,
    locked: true
  }
];

export default function PracticeExamsPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showCreateExam, setShowCreateExam] = useState(false);
  
  // Filter exams based on search, tab, subject, and difficulty
  const filteredExams = mockPracticeExams.filter(exam => {
    const matchesSearch = exam.examName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exam.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
                         
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'completed' && exam.completed) || 
                      (activeTab === 'incomplete' && !exam.completed);
                      
    const matchesSubject = selectedSubject === 'all' || exam.subject === selectedSubject;
    
    const matchesDifficulty = selectedDifficulty === 'all' || exam.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesTab && matchesSubject && matchesDifficulty;
  });
  
  // Get unique subjects
  const subjects = Array.from(new Set(mockPracticeExams.map(exam => exam.subject)));
  
  // Get difficulty levels
  const difficultyLevels = ['Easy', 'Medium', 'Hard', 'Expert'];

  return (
    <SharedPageLayout 
      title="Practice Exams" 
      subtitle="Test your knowledge with targeted practice exams"
    >
      <div className="space-y-6">
        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search exams, subjects, or tags..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-3 flex-wrap sm:flex-nowrap">
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map(subject => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {difficultyLevels.map(level => (
                  <SelectItem key={level} value={level}>{level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex gap-2">
              <Filter className="h-4 w-4" />
              More Filters
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>
        </div>
        
        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-3">
            <TabsTrigger value="all">All Exams</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="incomplete">To Take</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="mt-6">
            {filteredExams.length === 0 ? (
              <div className="text-center py-10">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-20" />
                <h3 className="text-lg font-medium">No practice exams found</h3>
                <p className="text-muted-foreground mt-1 mb-4">Try adjusting your filters or search query</p>
                <Button onClick={() => setShowCreateExam(true)}>Create New Exam</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {/* Create New Exam (Pro Feature) */}
                <Card className="border-2 border-dashed border-muted hover:border-primary/50 transition-colors flex flex-col justify-center items-center h-[280px]">
                  <CardContent className="flex flex-col items-center justify-center text-center space-y-4 pt-6">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Plus className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Create New Practice Exam</h3>
                      <p className="text-sm text-muted-foreground">
                        Create your own custom practice exam
                      </p>
                    </div>
                    <Badge variant="secondary">PRO Feature</Badge>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => setShowCreateExam(true)}>
                      Create Exam
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Practice Exams */}
                {filteredExams.map(exam => (
                  <Card 
                    key={exam.id} 
                    className={`overflow-hidden transition-all hover:shadow-md group h-[280px] flex flex-col ${exam.isPro ? 'border-violet-200 dark:border-violet-800' : 'border'}`}
                  >
                    <CardHeader className={`pb-2 border-b ${
                        exam.difficulty === 'Easy' ? 'bg-green-50/50 dark:bg-green-950/10 border-green-200' :
                        exam.difficulty === 'Medium' ? 'bg-blue-50/50 dark:bg-blue-950/10 border-blue-200' :
                        exam.difficulty === 'Hard' ? 'bg-orange-50/50 dark:bg-orange-950/10 border-orange-200' :
                        'bg-purple-50/50 dark:bg-purple-950/10 border-purple-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge 
                            variant="secondary" 
                            className={`mb-2 ${
                              exam.difficulty === 'Easy' ? 'bg-green-100 text-green-700 hover:bg-green-200' :
                              exam.difficulty === 'Medium' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                              exam.difficulty === 'Hard' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' :
                              'bg-purple-100 text-purple-700 hover:bg-purple-200'
                            }`}
                          >
                            {exam.difficulty}
                          </Badge>
                          
                          {exam.isPro && (
                            <Badge variant="outline" className="ml-2 bg-violet-100 text-violet-700 border-violet-200 hover:bg-violet-200">
                              PRO
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{exam.questionCount} questions</span>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="py-4 flex-grow">
                      <div className="mb-3">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{exam.examName}</h3>
                        <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                          <span className="font-medium">{exam.subject}</span>
                          <span>•</span>
                          <span>{exam.topic}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {exam.completed && exam.score && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Your score</span>
                              <span className={`${exam.score >= 80 ? 'text-green-600' : exam.score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
                                {exam.score}%
                              </span>
                            </div>
                            <Progress 
                              value={exam.score} 
                              className={`h-2 ${
                                exam.score >= 80 ? 'bg-green-500' :
                                exam.score >= 60 ? 'bg-amber-500' :
                                'bg-red-500'
                              }`} 
                            />
                          </div>
                        )}
                        
                        <div className="flex justify-between text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            <span className="text-muted-foreground">{exam.timeLimit} min</span>
                          </div>
                          
                          {exam.lastAttempted && (
                            <div className="text-xs text-muted-foreground">
                              Last attempt: {new Date(exam.lastAttempted).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-1 flex-wrap">
                          {exam.tags.map((tag, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-muted">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-0 pb-4">
                      {exam.locked ? (
                        <Button 
                          variant="outline"
                          className="w-full flex items-center" 
                        >
                          <AlertCircle className="mr-2 h-4 w-4 text-amber-500" />
                          Unlock with PRO
                        </Button>
                      ) : (
                        <Button 
                          onClick={() => navigate(`/dashboard/student/practice-exam/${exam.id}/${exam.completed ? 'review' : 'start'}`)} 
                          className="w-full"
                        >
                          {exam.completed ? 'Review Exam' : 'Start Exam'}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
}
