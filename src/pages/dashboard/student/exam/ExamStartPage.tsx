
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Clock, FileCheck, CheckSquare, Timer, AlertTriangle, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ExamInfo {
  id: string;
  title: string;
  subject: string;
  description: string;
  totalQuestions: number;
  duration: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  topics: string[];
  instructions: string[];
}

const ExamStartPage = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [examInfo, setExamInfo] = useState<ExamInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  useEffect(() => {
    // Mock data fetch
    const fetchData = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setExamInfo({
          id: examId || '1',
          title: "Physics Mock Test: Mechanics",
          subject: "Physics",
          description: "This test covers Newton's Laws of Motion, Work, Energy, and Momentum Conservation",
          totalQuestions: 30,
          duration: 60,
          difficulty: 'medium',
          topics: ["Newton's Laws", "Work & Energy", "Momentum", "Circular Motion"],
          instructions: [
            "Read all questions carefully before answering.",
            "Each question has only one correct answer.",
            "All questions carry equal marks.",
            "No negative marking for wrong answers.",
            "You can review and change answers during the test duration.",
            "Submit your test before the timer ends.",
            "Once submitted, you cannot modify your answers."
          ]
        });
        setLoading(false);
      }, 500);
    };
    
    fetchData();
  }, [examId]);

  const handleStartExam = () => {
    if (!acceptedTerms) {
      toast({
        title: "Please accept the terms",
        description: "You must accept the exam terms before starting",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Starting Exam",
      description: "Good luck!"
    });
    
    // Navigate to the exam attempt page
    if (examId) {
      navigate(`/dashboard/student/exams/attempt/${examId}`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="h-40 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!examInfo) return (
    <div className="max-w-4xl mx-auto p-6">
      <p className="text-center text-muted-foreground">Exam not found</p>
    </div>
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'medium':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400';
      case 'hard':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-2xl">{examInfo.title}</CardTitle>
            <Badge className={getDifficultyColor(examInfo.difficulty)} variant="outline">
              {examInfo.difficulty.charAt(0).toUpperCase() + examInfo.difficulty.slice(1)} Difficulty
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <p className="text-gray-600 dark:text-gray-400 mb-6">{examInfo.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="rounded-full p-2 bg-purple-100 dark:bg-purple-900/30">
                  <CheckSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Questions</p>
                  <p className="font-medium">{examInfo.totalQuestions}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900/30">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                  <p className="font-medium">{examInfo.duration} minutes</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="rounded-full p-2 bg-green-100 dark:bg-green-900/30">
                  <FileCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Subject</p>
                  <p className="font-medium">{examInfo.subject}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="font-medium mb-2">Topics Covered</h3>
              <div className="flex flex-wrap gap-2">
                {examInfo.topics.map((topic, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100 dark:bg-gray-800">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <h3 className="font-medium">Exam Instructions</h3>
              </div>
              <ul className="space-y-2 list-disc pl-6">
                {examInfo.instructions.map((instruction, index) => (
                  <li key={index} className="text-gray-600 dark:text-gray-400">
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
            
            <Separator className="my-6" />
            
            <div className="flex items-start space-x-2 mb-8">
              <input 
                type="checkbox" 
                id="accept-terms" 
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="accept-terms" className="text-sm text-gray-600 dark:text-gray-400">
                I understand and agree to follow the exam instructions. I will not use unauthorized resources or assistance during the test.
              </label>
            </div>
            
            <div className="flex justify-center">
              <Button 
                onClick={handleStartExam} 
                size="lg"
                className="gap-2 px-8"
                disabled={!acceptedTerms}
              >
                <Timer className="h-4 w-4" />
                Start Exam Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-500" />
            <CardTitle>Need Help?</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            If you encounter any issues during the exam or have questions, our support team is available to assist you.
          </p>
          <Button variant="outline" className="w-full sm:w-auto">
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamStartPage;
