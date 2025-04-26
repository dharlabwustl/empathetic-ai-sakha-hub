
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { PracticeExam } from './PracticeExamCard';

const PracticeExamPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const [exam, setExam] = useState<PracticeExam | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock questions for demo
  const mockQuestions = [
    {
      id: 1,
      question: "What is the formula for the area of a circle?",
      options: ["πr²", "2πr", "πr³", "2πr²"],
      correctAnswer: "πr²",
    },
    {
      id: 2,
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Fe", "Cu"],
      correctAnswer: "Au",
    }
  ];

  // Fetch exam data
  useEffect(() => {
    // This would typically be an API call
    setLoading(true);
    
    // Mock data - This would be replaced with a real API call
    setTimeout(() => {
      // Mocked exam data
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
        }
      ];
      
      const foundExam = mockExams.find(e => e.id === examId);
      
      if (foundExam) {
        setExam(foundExam);
        setError(null);
      } else {
        setError("Exam not found");
      }
      
      setLoading(false);
    }, 800);
  }, [examId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-medium">Loading exam...</h2>
        </div>
      </div>
    );
  }

  if (error || !exam) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-500 flex items-center gap-2">
              <AlertTriangle />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error || "An unknown error occurred"}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/dashboard/student/exams")}>
              Go Back to Exams
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate("/dashboard/student/exams")}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back to Exams
      </Button>
      
      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{exam.title}</CardTitle>
              <p className="text-gray-500 mt-1">
                {exam.subject} • {exam.topic}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock size={16} className="text-gray-400" />
              {exam.duration} minutes
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                {exam.questionCount} questions
              </span>
              <span className={`px-2 py-1 rounded-full ${
                exam.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                exam.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {exam.difficulty} difficulty
              </span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-gray-600">
              This exam will test your knowledge about {exam.topic} in {exam.subject}. 
              You will have {exam.duration} minutes to complete {exam.questionCount} questions.
            </p>
          </div>
          
          {exam.status === 'completed' ? (
            <div>
              <div className="flex justify-between items-center mb-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="text-lg font-medium">Your Results</h3>
                  <p className="text-gray-600">
                    Completed on {new Date(exam.completedAt || '').toLocaleString()}
                  </p>
                </div>
                <div className={`text-2xl font-bold ${
                  (exam.score || 0) >= 80 ? 'text-green-600' : 
                  (exam.score || 0) >= 60 ? 'text-yellow-600' : 
                  'text-red-600'
                }`}>
                  {exam.score}%
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Strengths</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Strong understanding of core principles</li>
                    <li>Excellent application of formulas</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Areas to Improve</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    <li>Review complex problems</li>
                    <li>Practice time management</li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 bg-gray-50 rounded-lg text-center">
              <h3 className="text-lg font-medium mb-2">
                {exam.status === 'in-progress' ? 'Continue Your Exam' : 'Ready to Begin?'}
              </h3>
              <p className="text-gray-600 mb-4">
                {exam.status === 'in-progress' 
                  ? "You've already started this exam. Pick up where you left off."
                  : "Once you start, you'll have a set time to complete all questions."}
              </p>
              <Button
                size="lg"
                className={`${
                  exam.status === 'in-progress' 
                    ? 'bg-yellow-600 hover:bg-yellow-700' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
                onClick={() => navigate(`/dashboard/student/exams/${exam.id}/take`)}
              >
                {exam.status === 'in-progress' ? 'Continue Exam' : 'Start Exam'}
              </Button>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard/student/exams")}
          >
            Back to All Exams
          </Button>
          
          {exam.status === 'completed' && (
            <Button
              onClick={() => navigate(`/dashboard/student/exams/${exam.id}/results`)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              View Detailed Results
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default PracticeExamPage;
