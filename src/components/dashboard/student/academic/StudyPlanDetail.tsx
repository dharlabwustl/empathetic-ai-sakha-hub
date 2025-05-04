
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StudyPlan } from '@/types/user/studyPlan';
import { CalendarDays, Clock, BookOpen, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface StudyPlanDetailProps {
  plan: StudyPlan;
  isOpen: boolean;
  onClose: () => void;
}

const StudyPlanDetail: React.FC<StudyPlanDetailProps> = ({ 
  plan,
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate total topics and completed topics
  const getTotalTopics = (plan: StudyPlan) => {
    let total = 0;
    let completed = 0;

    plan.subjects.forEach(subject => {
      if (subject.topics) {
        total += subject.topics.length;
        completed += subject.topics.filter(topic => topic.completed).length;
      }
    });

    return { total, completed };
  };

  const { total: totalTopics, completed: completedTopics } = getTotalTopics(plan);

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Easy</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Medium</Badge>;
      case 'hard':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">Hard</Badge>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Low</Badge>;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">Pending</Badge>;
      case 'in-progress':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">Completed</Badge>;
      case 'skipped':
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">Skipped</Badge>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-2xl">{plan.examGoal}</DialogTitle>
              <DialogDescription className="mt-1">
                {plan.goal}
              </DialogDescription>
            </div>
            <Badge className={`${plan.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
              {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
            </Badge>
          </div>
        </DialogHeader>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="p-6 h-[calc(90vh-200px)]">
            <TabsContent value="overview" className="mt-0 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Plan Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Exam Goal</p>
                        <p className="font-medium">{plan.examGoal}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Exam Date</p>
                        <p className="font-medium">{new Date(plan.examDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Learning Pace</p>
                        <p className="font-medium capitalize">{plan.learningPace}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Preferred Study Time</p>
                        <p className="font-medium capitalize">{plan.preferredStudyTime}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Study Hours/Day</p>
                        <p className="font-medium">{plan.studyHoursPerDay} hours</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Weekly Hours</p>
                        <p className="font-medium">{plan.weeklyHours} hours</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Progress Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Progress</span>
                        <span>{plan.progressPercentage || plan.progressPercent || 0}%</span>
                      </div>
                      <Progress value={plan.progressPercentage || plan.progressPercent || 0} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Days Left</p>
                          <p className="font-medium">{plan.daysLeft || 0} days</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Topics Completed</p>
                          <p className="font-medium">{completedTopics} / {totalTopics}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Daily Study</p>
                          <p className="font-medium">{plan.studyHoursPerDay} hours</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Subjects</p>
                          <p className="font-medium">{plan.subjects.length}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Subject Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {plan.subjects.map((subject) => (
                      <div key={subject.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }}></div>
                            <span className="font-medium">{subject.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              {subject.hoursPerWeek} hrs/week
                            </Badge>
                            <Badge variant={subject.proficiency === 'weak' ? 'destructive' : 'outline'}>
                              {subject.proficiency.charAt(0).toUpperCase() + subject.proficiency.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <Progress
                          value={
                            subject.topics
                              ? (subject.topics.filter((t) => t.completed).length / subject.topics.length) * 100
                              : 0
                          }
                          className="h-2"
                          style={{ backgroundColor: `${subject.color}20` }}
                          color={subject.color}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500" />
                  <span className="text-sm text-muted-foreground">
                    {plan.status === 'active' 
                      ? 'This study plan is active and being tracked.'
                      : 'This study plan has been completed.'}
                  </span>
                </div>
                {plan.status === 'active' && (
                  <Button variant="outline" size="sm">
                    Edit Plan
                  </Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="subjects" className="mt-0 space-y-6">
              {plan.subjects.map((subject) => (
                <Card key={subject.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: subject.color }}></div>
                        {subject.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant={subject.proficiency === 'weak' ? 'destructive' : 'outline'}>
                          {subject.proficiency.charAt(0).toUpperCase() + subject.proficiency.slice(1)}
                        </Badge>
                        {getPriorityBadge(subject.priority)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {subject.topics
                            ? `${subject.topics.filter(t => t.completed).length} / ${subject.topics.length} topics completed`
                            : '0 / 0 topics'}
                        </span>
                      </div>
                      <Progress
                        value={
                          subject.topics
                            ? (subject.topics.filter((t) => t.completed).length / subject.topics.length) * 100
                            : 0
                        }
                        className="h-2"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Weekly Hours</p>
                        <p className="font-medium">{subject.hoursPerWeek} hours</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Priority</p>
                        <p className="font-medium capitalize">{subject.priority}</p>
                      </div>
                    </div>

                    {subject.topics && subject.topics.length > 0 && (
                      <div>
                        <p className="text-sm font-medium mb-2">Topics ({subject.topics.length})</p>
                        <div className="space-y-2">
                          {subject.topics.map((topic) => (
                            <div key={topic.id} className="flex justify-between items-center p-2 rounded-md bg-gray-50 dark:bg-gray-800">
                              <div className="flex items-center gap-2">
                                {topic.completed ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <AlertTriangle className="h-4 w-4 text-amber-500" />
                                )}
                                <span>{topic.name}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {getDifficultyBadge(topic.difficulty)}
                                {getStatusBadge(topic.status)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="topics" className="mt-0">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">All Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Topic</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Difficulty</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {plan.subjects.flatMap((subject) =>
                        subject.topics?.map((topic) => (
                          <TableRow key={topic.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {topic.completed ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <div className="w-4 h-4" />
                                )}
                                {topic.name}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: subject.color }}></div>
                                {subject.name}
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(topic.status)}</TableCell>
                            <TableCell>{getPriorityBadge(topic.priority)}</TableCell>
                            <TableCell>{getDifficultyBadge(topic.difficulty)}</TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanDetail;
