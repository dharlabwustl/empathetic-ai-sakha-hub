
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, AlertTriangle, CheckCircle, XCircle, Award, BookOpen, ArrowRight } from 'lucide-react';
import { PracticeExam } from './PracticeExamCard';

const ExamResultsPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();
  const [exam, setExam] = useState<PracticeExam | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock result data
  const mockResults = {
    totalQuestions: 25,
    correctAnswers: 21,
    incorrectAnswers: 4,
    score: 84,
    timeTaken: "45 minutes",
    completionDate: "2023-05-15T14:30:00",
    strengths: [
      "Mechanics principles",
      "Force and motion calculations",
      "Vector problems"
    ],
    weaknesses: [
      "Circular motion concepts",
      "Advanced friction problems"
    ],
    questionBreakdown: [
      { id: 1, question: "What is Newton's First Law?", correct: true },
      { id: 2, question: "Calculate the force required to move a 10kg object at 5m/s²", correct: true },
      { id: 3, question: "Explain the concept of centripetal force", correct: false }
    ]
  };

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
          status: "completed",
          score: 84,
          completedAt: "2023-05-15T14:30:00"
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
      
      if (foundExam && foundExam.status === 'completed') {
        setExam(foundExam);
        setError(null);
      } else if (foundExam) {
        setError("This exam has not been completed yet");
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
          <h2 className="text-xl font-medium">Loading results...</h2>
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
        onClick={() => navigate(`/dashboard/student/exams/${exam.id}`)}
        className="mb-6 flex items-center gap-2"
      >
        <ArrowLeft size={16} />
        Back to Exam Details
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main result panel */}
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{exam.title} Results</CardTitle>
                  <p className="text-gray-500 mt-1">
                    Completed on {new Date(exam.completedAt || '').toLocaleDateString()}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <div className={`text-3xl font-bold flex items-center ${
                    exam.score >= 80 ? 'text-green-600' : 
                    exam.score >= 60 ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {exam.score}%
                    {exam.score >= 80 && <Award className="ml-2 h-6 w-6" />}
                  </div>
                  <p className="text-sm text-gray-500">
                    {mockResults.correctAnswers}/{mockResults.totalQuestions} correct
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 border rounded-lg bg-green-50">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Strengths
                  </h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {mockResults.strengths.map((strength, idx) => (
                      <li key={idx}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-4 border rounded-lg bg-amber-50">
                  <h3 className="font-medium mb-2 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-amber-500" />
                    Areas to Improve
                  </h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {mockResults.weaknesses.map((weakness, idx) => (
                      <li key={idx}>{weakness}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-3">Question Breakdown</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Q#</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Question</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {mockResults.questionBreakdown.map((item) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.id}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {item.question}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {item.correct ? (
                              <span className="flex items-center text-green-600">
                                <CheckCircle className="h-4 w-4 mr-1" /> Correct
                              </span>
                            ) : (
                              <span className="flex items-center text-red-600">
                                <XCircle className="h-4 w-4 mr-1" /> Incorrect
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-xl">Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Score</span>
                  <span className="font-medium">{exam.score}%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Time Taken</span>
                  <span className="font-medium">{mockResults.timeTaken}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Subject</span>
                  <span className="font-medium">{exam.subject}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Topic</span>
                  <span className="font-medium">{exam.topic}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Correct</span>
                  <span className="font-medium text-green-600">{mockResults.correctAnswers}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Incorrect</span>
                  <span className="font-medium text-red-600">{mockResults.incorrectAnswers}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Completion</span>
                  <span className="font-medium">{new Date(exam.completedAt || '').toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  className="w-full flex justify-between items-center"
                  variant="outline"
                >
                  <span>Practice Weak Areas</span>
                  <ArrowRight size={16} />
                </Button>
                <Button 
                  className="w-full flex justify-between items-center"
                  variant="outline"
                >
                  <span>View Topic Resources</span>
                  <ArrowRight size={16} />
                </Button>
                <Button 
                  className="w-full flex justify-between items-center"
                  variant="outline"
                >
                  <span>Take Similar Exam</span>
                  <ArrowRight size={16} />
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={() => navigate("/dashboard/student/exams")}
                className="w-full"
              >
                Back to All Exams
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ExamResultsPage;
