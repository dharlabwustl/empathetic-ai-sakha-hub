
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Filter, Search, Clock, Calendar, BarChart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const PracticeExams: React.FC = () => {
  const examTypes = [
    { name: 'Chapter Tests', count: 24, icon: 'BookOpen' },
    { name: 'Mock Exams', count: 8, icon: 'FileText' },
    { name: 'Previous Year Papers', count: 15, icon: 'Archive' },
    { name: 'Weekly Challenges', count: 6, icon: 'Award' }
  ];

  return (
    <SharedPageLayout
      title="Practice Exams"
      subtitle="Test your knowledge and track your progress"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
      backButtonLabel="Back to Dashboard"
      actions={
        <TooltipProvider>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter exams by subject or type</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Exam
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Schedule a new practice exam</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      }
    >
      {/* Search bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search practice exams..." className="pl-10" />
      </div>
      
      {/* Exam type categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {examTypes.map(type => (
          <Card key={type.name} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{type.name}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-2xl font-bold">{type.count}</p>
              <p className="text-muted-foreground text-sm">available tests</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Tests
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {/* Upcoming scheduled exams */}
      <div className="space-y-6 mb-8">
        <h2 className="text-xl font-semibold">Upcoming Exams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">NEET Full Mock Test</CardTitle>
                <Badge>Scheduled</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Tomorrow, 10:00 AM</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>3 hours duration</span>
              </div>
              <div className="text-sm mt-2">
                <span className="text-muted-foreground">Subjects:</span> Physics, Chemistry, Biology
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">Reschedule</Button>
              <Button size="sm">Start Exam</Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">Physics Chapter Test</CardTitle>
                <Badge variant="outline">Pending</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Sunday, 4:00 PM</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>45 minutes duration</span>
              </div>
              <div className="text-sm mt-2">
                <span className="text-muted-foreground">Topics:</span> Electromagnetism, Current Electricity
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button variant="outline" size="sm">Start Preparation</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Past exam performance */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Recent Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Biology Mock Test', score: 78, date: '3 days ago' },
            { name: 'Chemistry Weekly Challenge', score: 65, date: '1 week ago' },
            { name: 'Physics Chapter Test', score: 92, date: '2 weeks ago' }
          ].map((exam, i) => (
            <Card key={i}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{exam.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{exam.date}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Score</span>
                  <span className={`font-bold ${
                    exam.score >= 80 ? 'text-green-600' : 
                    exam.score >= 60 ? 'text-amber-600' : 
                    'text-red-600'
                  }`}>{exam.score}%</span>
                </div>
                <Progress value={exam.score} className="h-2" />
                <div className="text-xs text-right text-muted-foreground mt-1">
                  Class Average: {exam.score - 5 + Math.floor(Math.random() * 10)}%
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full">
                  <BarChart className="h-4 w-4 mr-2" />
                  View Analysis
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default PracticeExams;
