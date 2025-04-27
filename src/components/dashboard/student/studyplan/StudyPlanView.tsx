
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, BookOpen, Target, Clock } from 'lucide-react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const StudyPlanView: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [view, setView] = React.useState<"monthly" | "weekly" | "timeline">("monthly");
  
  // Mock data for study plan
  const examGoal = "IIT-JEE";
  const daysUntilExam = 120;
  
  // Mock data for calendar highlights
  const highlightedDays = [
    new Date(new Date().getFullYear(), new Date().getMonth(), 10),
    new Date(new Date().getFullYear(), new Date().getMonth(), 15),
    new Date(new Date().getFullYear(), new Date().getMonth(), 22),
  ];

  return (
    <SharedPageLayout
      title="Complete Study Plan"
      subtitle="Your comprehensive study calendar and exam preparation path"
    >
      <div className="space-y-6">
        {/* Exam Goal Information */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800/30">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 flex items-center gap-2">
                  <Target className="h-5 w-5" /> 
                  {examGoal} Preparation Plan
                </h3>
                <p className="text-blue-700/80 dark:text-blue-400/80 mt-1">
                  Your personalized roadmap to exam success
                </p>
              </div>
              
              <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-md shadow-sm">
                <Clock className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                <span className="font-medium">{daysUntilExam} days</span> until exam
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar View */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Study Calendar
            </CardTitle>
            <CardDescription>
              View your scheduled study activities and milestones
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={view} onValueChange={(v: any) => setView(v)}>
              <TabsList className="mb-4">
                <TabsTrigger value="monthly">Monthly View</TabsTrigger>
                <TabsTrigger value="weekly">Weekly View</TabsTrigger>
                <TabsTrigger value="timeline">Timeline View</TabsTrigger>
              </TabsList>
              
              <TabsContent value="monthly" className="flex justify-center">
                <div className="max-w-xs">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    modifiers={{
                      highlighted: highlightedDays
                    }}
                    modifiersStyles={{
                      highlighted: {
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        borderRadius: '0',
                      }
                    }}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="weekly">
                <div className="text-center p-6">
                  <p className="text-muted-foreground">Weekly view coming soon</p>
                </div>
              </TabsContent>
              
              <TabsContent value="timeline">
                <div className="text-center p-6">
                  <p className="text-muted-foreground">Timeline view coming soon</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Subject Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Subject Breakdown
            </CardTitle>
            <CardDescription>
              Your study plan organized by subjects and topics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Physics', 'Chemistry', 'Mathematics'].map((subject) => (
                <div key={subject} className="p-4 border rounded-md">
                  <h3 className="font-semibold text-lg mb-2">{subject}</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((week) => (
                      <Badge key={week} variant="outline" className="px-3 py-1">{week}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default StudyPlanView;
