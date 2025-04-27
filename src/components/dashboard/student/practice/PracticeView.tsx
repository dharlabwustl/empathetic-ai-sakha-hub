
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { ClipboardCheck, BookOpen, BarChart4 } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { StandardGridLayout, GridItem } from '@/components/dashboard/student/common/StandardGridLayout';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

// Mock data interface
interface Exam {
  id: string;
  title: string;
  subject: string;
  topic: string;
  description: string;
  questionCount: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  duration: number; // in minutes
  attempted?: boolean;
  score?: number;
  lastAttempted?: string;
}

const PracticeView = () => {
  const { subject } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>(subject || 'all');
  const [filteredExams, setFilteredExams] = useState<Exam[]>([]);

  // Fetch exams
  useEffect(() => {
    const fetchExams = async () => {
      setLoading(true);
      
      // Simulate API fetch with timeout
      setTimeout(() => {
        const mockExams: Exam[] = [
          {
            id: 'e1',
            title: 'Mechanics Full Test',
            subject: 'Physics',
            topic: 'Classical Mechanics',
            description: 'Comprehensive practice exam covering Newtonian mechanics, rotational motion, and waves.',
            questionCount: 30,
            difficulty: 'medium',
            duration: 60,
            attempted: true,
            score: 78,
            lastAttempted: 'Last week'
          },
          {
            id: 'e2',
            title: 'Periodic Table & Chemical Bonding',
            subject: 'Chemistry',
            topic: 'Inorganic Chemistry',
            description: 'Test your knowledge of the periodic table, bonding, and molecular structures.',
            questionCount: 25,
            difficulty: 'medium',
            duration: 45,
            attempted: false
          },
          {
            id: 'e3',
            title: 'Calculus Master Challenge',
            subject: 'Mathematics',
            topic: 'Calculus',
            description: 'Advanced problems in differential and integral calculus for competitive exams.',
            questionCount: 20,
            difficulty: 'expert',
            duration: 90,
            attempted: true,
            score: 62,
            lastAttempted: '3 days ago'
          },
          {
            id: 'e4',
            title: 'Electromagnetism & Optics',
            subject: 'Physics',
            topic: 'Electromagnetism',
            description: 'Comprehensive practice on electromagnetic waves, fields, and optical phenomena.',
            questionCount: 35,
            difficulty: 'hard',
            duration: 75,
            attempted: false
          },
          {
            id: 'e5',
            title: 'Organic Chemistry Mechanisms',
            subject: 'Chemistry',
            topic: 'Organic Chemistry',
            description: 'Practice exam focusing on reaction mechanisms, functional groups, and organic synthesis.',
            questionCount: 28,
            difficulty: 'hard',
            duration: 60,
            attempted: true,
            score: 85,
            lastAttempted: 'Yesterday'
          },
          {
            id: 'e6',
            title: 'Algebra & Trigonometry Basics',
            subject: 'Mathematics',
            topic: 'Algebra',
            description: 'Foundational practice test for algebraic identities and trigonometric functions.',
            questionCount: 25,
            difficulty: 'easy',
            duration: 45,
            attempted: true,
            score: 92,
            lastAttempted: '1 week ago'
          },
        ];
        
        setExams(mockExams);
        setLoading(false);
      }, 800);
    };
    
    fetchExams();
  }, []);

  // Filter exams when subject changes
  useEffect(() => {
    if (selectedSubject === 'all') {
      setFilteredExams(exams);
    } else {
      setFilteredExams(exams.filter(exam => exam.subject.toLowerCase() === selectedSubject.toLowerCase()));
    }
  }, [selectedSubject, exams]);

  // Handle subject change
  const handleSubjectChange = (subject: string) => {
    setSelectedSubject(subject);
  };

  // Map exams to grid items
  const examGridItems: GridItem[] = filteredExams.map(exam => ({
    id: exam.id,
    title: exam.title,
    description: exam.description,
    icon: <ClipboardCheck className="h-4 w-4 text-emerald-600" />,
    badge: exam.attempted ? `Score: ${exam.score}%` : `${exam.questionCount} questions`,
    badgeColor: 
      exam.attempted 
        ? (exam.score && exam.score >= 80 ? 'success' : exam.score && exam.score >= 60 ? 'warning' : 'danger')
        : (exam.difficulty === 'easy' ? 'success' :
          exam.difficulty === 'medium' ? 'warning' : 
          exam.difficulty === 'hard' ? 'danger' : 'primary'),
    footerText: `${exam.duration} min • ${exam.difficulty} difficulty`,
    linkTo: exam.attempted ? `/dashboard/student/exams/review/${exam.id}` : `/dashboard/student/exams/attempt/${exam.id}`,
    linkText: exam.attempted ? "Review Exam" : "Start Exam",
    onAction: () => {
      toast({
        title: exam.attempted ? "Opening exam review" : "Starting exam",
        description: `Loading ${exam.title}...`,
      });
    }
  }));

  return (
    <SharedPageLayout
      title="Practice Exams"
      subtitle="Test your knowledge with subject-specific practice exams"
      icon={<BookOpen className="h-5 w-5 text-emerald-500" />}
    >
      <div className="space-y-6">
        <Tabs defaultValue={selectedSubject} onValueChange={handleSubjectChange}>
          <TabsList className="w-full border-b rounded-none flex justify-start overflow-auto">
            <TabsTrigger value="all">All Subjects</TabsTrigger>
            <TabsTrigger value="physics">Physics</TabsTrigger>
            <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
            <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
            <TabsTrigger value="biology">Biology</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">
              {selectedSubject === 'all' ? 'All Practice Exams' : `${selectedSubject} Practice Exams`}
            </h2>
            <p className="text-muted-foreground text-sm">
              {filteredExams.length} practice exams available
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <BarChart4 className="h-3 w-3" /> 
              Avg. Score: 79%
            </Badge>
          </div>
        </div>
        
        <StandardGridLayout 
          items={examGridItems}
          emptyMessage={loading ? "Loading practice exams..." : "No practice exams found for this subject"}
          className="mt-4"
        />
      </div>
    </SharedPageLayout>
  );
};

export default PracticeView;
