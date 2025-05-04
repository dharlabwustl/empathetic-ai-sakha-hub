
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, BarChart2 } from 'lucide-react';
import BackButton from '@/components/ui/back-button';
import { EnhancedTooltip } from '@/components/ui/enhanced-tooltip';

interface PracticeExamViewProps {
  userProfile?: any;
}

const PracticeExamView: React.FC<PracticeExamViewProps> = ({ userProfile }) => {
  const mockExams = [
    {
      id: 'exam-1',
      title: 'NEET Full Mock Test 1',
      subjects: ['Physics', 'Chemistry', 'Biology'],
      duration: 180,
      questions: 180,
      difficulty: 'Hard',
    },
    {
      id: 'exam-2',
      title: 'Physics Section Test',
      subjects: ['Physics'],
      duration: 60,
      questions: 45,
      difficulty: 'Medium',
    },
    {
      id: 'exam-3',
      title: 'Biology Special Topics',
      subjects: ['Biology'],
      duration: 45,
      questions: 30,
      difficulty: 'Easy',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back button */}
      <EnhancedTooltip content="Return to dashboard">
        <div>
          <BackButton to="/dashboard/student" label="Back to Dashboard" />
        </div>
      </EnhancedTooltip>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Tests Taken</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
            <p className="text-sm text-gray-500">4 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Avg. Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">72%</div>
            <p className="text-sm text-gray-500">+5% improvement</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">85%</div>
            <p className="text-sm text-gray-500">15/18 tests</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Available Exams</h2>
          <EnhancedTooltip content="See all practice exams">
            <Button variant="outline" size="sm">View All</Button>
          </EnhancedTooltip>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockExams.map(exam => (
            <Card key={exam.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-2">{exam.title}</h3>
                <div className="flex flex-wrap gap-1 mb-4">
                  {exam.subjects.map(subject => (
                    <span 
                      key={`${exam.id}-${subject}`} 
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{exam.duration} mins</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>{exam.questions} questions</span>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded text-xs ${
                      exam.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 
                      exam.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {exam.difficulty}
                    </span>
                  </div>
                </div>
                <EnhancedTooltip content="Start this practice exam">
                  <Button className="w-full">Start Exam</Button>
                </EnhancedTooltip>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeExamView;
