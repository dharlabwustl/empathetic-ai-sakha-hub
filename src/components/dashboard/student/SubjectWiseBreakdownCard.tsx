
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, TrendingUp, AlertTriangle, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface SubjectData {
  name: string;
  progress: number;
  accuracy: number;
  status: 'strong' | 'weak' | 'moderate';
  color: string;
  weeklyHours: number;
  conceptsCompleted: number;
  totalConcepts: number;
}

const SubjectWiseBreakdownCard: React.FC = () => {
  const subjects: SubjectData[] = [
    {
      name: 'Physics',
      progress: 75,
      accuracy: 82,
      status: 'strong',
      color: 'blue',
      weeklyHours: 12,
      conceptsCompleted: 45,
      totalConcepts: 60
    },
    {
      name: 'Chemistry',
      progress: 45,
      accuracy: 65,
      status: 'weak',
      color: 'orange',
      weeklyHours: 15,
      conceptsCompleted: 28,
      totalConcepts: 55
    },
    {
      name: 'Biology',
      progress: 68,
      accuracy: 78,
      status: 'moderate',
      color: 'green',
      weeklyHours: 10,
      conceptsCompleted: 38,
      totalConcepts: 50
    },
    {
      name: 'Mathematics',
      progress: 55,
      accuracy: 70,
      status: 'moderate',
      color: 'purple',
      weeklyHours: 14,
      conceptsCompleted: 32,
      totalConcepts: 45
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'strong':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Strong</Badge>;
      case 'weak':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Needs Focus</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Moderate</Badge>;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Subject-wise Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full bg-${subject.color}-500`}></div>
                  <h4 className="font-medium">{subject.name}</h4>
                  {getStatusBadge(subject.status)}
                </div>
                <span className="text-sm text-gray-600">{subject.accuracy}% accuracy</span>
              </div>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} className="h-2" />
              </div>
              
              <div className="text-xs text-gray-500 mb-3">
                {subject.conceptsCompleted}/{subject.totalConcepts} concepts • {subject.weeklyHours}h/week
              </div>
              
              <div className="flex gap-2">
                <Link to={`/dashboard/student/concepts/${subject.name.toLowerCase()}`} className="flex-1">
                  <Button size="sm" variant="outline" className="w-full">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Study
                  </Button>
                </Link>
                <Link to="/dashboard/student/flashcards/1/interactive" className="flex-1">
                  <Button size="sm" variant="outline" className="w-full">
                    <Target className="h-3 w-3 mr-1" />
                    Practice
                  </Button>
                </Link>
                <Link to="/dashboard/student/practice-exam/2/start" className="flex-1">
                  <Button size="sm" variant="outline" className="w-full">
                    <Zap className="h-3 w-3 mr-1" />
                    Exam
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectWiseBreakdownCard;
