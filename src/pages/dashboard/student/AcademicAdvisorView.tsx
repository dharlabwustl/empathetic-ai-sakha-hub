
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Calendar, Target, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AcademicAdvisorView = () => {
  const navigate = useNavigate();

  const handleViewPlan = () => {
    navigate('/dashboard/student/study-plan');
  };

  return (
    <SharedPageLayout
      title="Academic Advisor"
      subtitle="Get personalized guidance for your academic journey"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        {/* Academic Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Goal</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">NEET 2025</div>
              <p className="text-xs text-muted-foreground">145 days remaining</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <Progress value={68} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12 days</div>
              <p className="text-xs text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>
        </div>

        {/* Study Plan Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Your Study Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">NEET Preparation Plan</h3>
                <p className="text-sm text-muted-foreground">Comprehensive 6-month study schedule</p>
              </div>
              <Button onClick={handleViewPlan} className="flex items-center gap-2">
                View Plan
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <Progress value={68} className="w-full" />
            <div className="text-sm text-muted-foreground">68% completed</div>
          </CardContent>
        </Card>

        {/* Subject Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { subject: 'Physics', progress: 75, status: 'strong' },
                { subject: 'Chemistry', progress: 60, status: 'moderate' },
                { subject: 'Biology', progress: 45, status: 'needs-focus' }
              ].map((item) => (
                <div key={item.subject} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-4 w-4" />
                    <span className="font-medium">{item.subject}</span>
                    <Badge variant={
                      item.status === 'strong' ? 'default' : 
                      item.status === 'moderate' ? 'secondary' : 'destructive'
                    }>
                      {item.status === 'strong' ? 'Strong' : 
                       item.status === 'moderate' ? 'Moderate' : 'Needs Focus'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 w-32">
                    <Progress value={item.progress} className="flex-1" />
                    <span className="text-sm font-medium">{item.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">Focus on Biology this week</p>
              <p className="text-xs text-blue-700">Your biology scores need improvement. Dedicate 2 extra hours this week.</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-900">Great progress in Physics!</p>
              <p className="text-xs text-green-700">You're ahead of schedule. Consider helping peers or tackle advanced topics.</p>
            </div>
            <div className="p-3 bg-amber-50 rounded-lg">
              <p className="text-sm font-medium text-amber-900">Review Chemistry formulas</p>
              <p className="text-xs text-amber-700">Practice organic reaction mechanisms for better retention.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default AcademicAdvisorView;
