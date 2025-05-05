import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CheckCircle, Circle, Loader2, Lock, Search, Timer } from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { SubscriptionType } from '@/types/user/base';

interface PracticeExam {
  id: string;
  title: string;
  description: string;
  subject: string;
  topic: string;
  totalQuestions: number;
  duration: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  isCompleted: boolean;
  lastScore?: number;
  averageScore?: number;
  timeTaken?: number; // in minutes
  completionRate?: number;
  examType: 'full' | 'sectional' | 'topic';
  accessType: 'free' | 'premium';
  isLocked?: boolean;
}

const mockPracticeExams: PracticeExam[] = [
  {
    id: "exam-1",
    title: "Full NEET Mock Test 1",
    description: "Comprehensive mock test covering the entire NEET syllabus",
    subject: "NEET",
    topic: "Full Syllabus",
    totalQuestions: 180,
    duration: 180,
    difficulty: "medium",
    isCompleted: false,
    examType: "full",
    accessType: "free"
  },
  {
    id: "exam-2",
    title: "Physics Sectional Test",
    description: "Sectional test focusing on Physics concepts",
    subject: "Physics",
    topic: "Mechanics",
    totalQuestions: 45,
    duration: 60,
    difficulty: "medium",
    isCompleted: true,
    lastScore: 75,
    averageScore: 68,
    timeTaken: 55,
    completionRate: 82,
    examType: "sectional",
    accessType: "free"
  },
  {
    id: "exam-3",
    title: "Chemistry Topic Test",
    description: "Topic test focusing on Organic Chemistry",
    subject: "Chemistry",
    topic: "Organic Chemistry",
    totalQuestions: 30,
    duration: 45,
    difficulty: "hard",
    isCompleted: false,
    examType: "topic",
    accessType: "premium",
    isLocked: true
  },
  {
    id: "exam-4",
    title: "Biology Full Syllabus Test",
    description: "Full syllabus test for Biology",
    subject: "Biology",
    topic: "Full Syllabus",
    totalQuestions: 90,
    duration: 90,
    difficulty: "medium",
    isCompleted: true,
    lastScore: 88,
    averageScore: 82,
    timeTaken: 85,
    completionRate: 94,
    examType: "full",
    accessType: "premium",
    isLocked: true
  },
  {
    id: "exam-5",
    title: "Mathematics Sectional Test",
    description: "Sectional test focusing on Calculus",
    subject: "Mathematics",
    topic: "Calculus",
    totalQuestions: 40,
    duration: 50,
    difficulty: "hard",
    isCompleted: false,
    examType: "sectional",
    accessType: "free"
  },
  {
    id: "exam-6",
    title: "Full NEET Mock Test 2",
    description: "Another comprehensive mock test covering the entire NEET syllabus",
    subject: "NEET",
    topic: "Full Syllabus",
    totalQuestions: 180,
    duration: 180,
    difficulty: "medium",
    isCompleted: false,
    examType: "full",
    accessType: "free"
  },
];

const PracticeExamsSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [exams, setExams] = useState(mockPracticeExams);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const userSubscription = SubscriptionType.FREE;

  useEffect(() => {
    // Simulate loading data from an API
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleStartExam = (examId: string) => {
    // Check if the exam is locked and the user has a free subscription
    const exam = exams.find(exam => exam.id === examId);
    if (exam?.isLocked && userSubscription === SubscriptionType.FREE) {
      toast({
        title: "This exam is for Pro users only.",
        description: "Upgrade to Pro to unlock this and many more features.",
      });
      return;
    }

    // Navigate to the exam taking page
    navigate(`/dashboard/student/practice-exam/${examId}/take`);
  };

  const handleReviewExam = (examId: string) => {
    // Navigate to the exam review page
    navigate(`/dashboard/student/practice-exam/${examId}/review`);
  };

  const filteredExams = exams.filter(exam => {
    const searchMatch = exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.description.toLowerCase().includes(searchQuery.toLowerCase());
    const subjectMatch = selectedSubject === 'All' || exam.subject === selectedSubject;
    return searchMatch && subjectMatch;
  });

  const isProUser = userSubscription === SubscriptionType.PRO || userSubscription === SubscriptionType.PREMIUM;

  return (
    <div className="container py-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Practice Exams</h1>
          <p className="text-muted-foreground">Test your knowledge and prepare for exams</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Input
            type="search"
            placeholder="Search exams..."
            className="w-full sm:w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Subjects</SelectItem>
              <SelectItem value="Physics">Physics</SelectItem>
              <SelectItem value="Chemistry">Chemistry</SelectItem>
              <SelectItem value="Biology">Biology</SelectItem>
              <SelectItem value="Mathematics">Mathematics</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Exams</CardTitle>
          <CardDescription>Choose from a variety of practice exams to test your knowledge</CardDescription>
        </CardHeader>
        <CardContent className="overflow-auto">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading exams...
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Exam</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead>Questions</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExams.map((exam) => (
                  <TableRow key={exam.id}>
                    <TableCell className="font-medium">{exam.title}</TableCell>
                    <TableCell>{exam.subject}</TableCell>
                    <TableCell>{exam.topic}</TableCell>
                    <TableCell>{exam.totalQuestions}</TableCell>
                    <TableCell>{exam.duration} minutes</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`capitalize ${
                        exam.difficulty === 'easy' ? 'bg-green-50 text-green-700 border-green-200' :
                        exam.difficulty === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {exam.difficulty}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {exam.isCompleted ? (
                        <div className="flex items-center">
                          <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                          Completed
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Circle className="mr-1 h-4 w-4 text-gray-400" />
                          Pending
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {exam.isCompleted ? (
                        <Button variant="outline" size="sm" onClick={() => handleReviewExam(exam.id)}>
                          Review
                        </Button>
                      ) : (
                        <Button variant="default" size="sm" onClick={() => handleStartExam(exam.id)} disabled={exam.isLocked && !isProUser}>
                          Start Exam
                          {exam.isLocked && !isProUser && <Lock className="ml-2 h-4 w-4" />}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {filteredExams.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">
                      No exams found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticeExamsSection;
