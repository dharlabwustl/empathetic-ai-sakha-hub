
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Target, Clock } from 'lucide-react';
import { formatDate } from '@/utils/dateUtils';
import type { StudyPlan } from '@/types/user/studyPlan';

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
  const getTopicStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[85vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-indigo-600" />
            Study Plan for {plan.examGoal}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Exam Goal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-indigo-700">{plan.examGoal}</div>
                    <p className="text-sm text-gray-500 mt-1">Target exam</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Exam Date</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-indigo-700">{formatDate(plan.examDate)}</div>
                    <p className="text-sm text-gray-500 mt-1">{plan.daysLeft} days remaining</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Overall Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-indigo-700">{plan.progressPercentage}%</div>
                    <Progress value={plan.progressPercentage} className="h-2 mt-2" />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Study Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Daily Study Hours</h4>
                      <p className="font-medium">{plan.studyHoursPerDay} hours</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Preferred Study Time</h4>
                      <p className="font-medium capitalize">{plan.preferredStudyTime}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Learning Pace</h4>
                      <p className="font-medium capitalize">{plan.learningPace}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subjects" className="space-y-6">
              <Accordion type="single" collapsible className="w-full">
                {plan.subjects.map((subject) => (
                  <AccordionItem key={subject.name} value={subject.name}>
                    <AccordionTrigger>
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{subject.name}</span>
                          {subject.proficiency === 'weak' && 
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-100">
                              Focus Needed
                            </Badge>
                          }
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={subject.progress} className={`w-24 ${
                            subject.proficiency === 'strong' ? 'bg-green-500' : 
                            subject.proficiency === 'moderate' ? 'bg-amber-500' : 
                            'bg-red-500'
                          }`} />
                          <span>{subject.progress}%</span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2 pt-2">
                        {subject.topics.map((topic) => (
                          <div key={topic.name} className="flex items-center justify-between p-2 border rounded-md">
                            <div className="flex items-center gap-3">
                              <div className={`h-3 w-3 rounded-full ${getTopicStatusColor(topic.status)}`} />
                              <span>{topic.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              {getPriorityBadge(topic.priority)}
                              {topic.status === 'completed' && (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            <TabsContent value="schedule" className="space-y-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Weekly Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                      <div key={day} className="border rounded-lg p-3">
                        <h4 className="font-medium mb-2">{day}</h4>
                        <div className="space-y-2 pl-2">
                          {plan.subjects.map((subject, idx) => {
                            if (idx % 7 !== ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].indexOf(day) % 3) return null;
                            
                            return (
                              <div key={`${day}-${subject.name}`} className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <span className="text-indigo-600">{plan.preferredStudyTime}</span>
                                <span className="text-gray-500">-</span>
                                <span>{subject.name}</span>
                              </div>
                            );
                          }).filter(Boolean)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanDetail;
