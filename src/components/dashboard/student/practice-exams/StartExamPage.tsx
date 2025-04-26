
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Timer, FileText, Brain, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StartExamPageProps {
  exam: {
    id: string;
    title: string;
    duration: number;
    questionCount: number;
    instructions: string[];
    topics: string[];
  };
}

const StartExamPage = ({ exam }: StartExamPageProps) => {
  const navigate = useNavigate();

  const startExam = () => {
    navigate(`/dashboard/student/practice-exams/${exam.id}/active`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{exam.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Exam Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Timer className="h-5 w-5 text-blue-500" />
                <span>Duration: {exam.duration} minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                <span>{exam.questionCount} Questions</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Instructions:</h3>
              <ul className="list-disc list-inside space-y-2">
                {exam.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>

            {/* Topics Covered */}
            <div>
              <h3 className="font-semibold mb-2">Topics Covered:</h3>
              <div className="flex flex-wrap gap-2">
                {exam.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <div className="flex justify-center pt-4">
              <Button onClick={startExam} size="lg">
                Start Exam
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StartExamPage;
