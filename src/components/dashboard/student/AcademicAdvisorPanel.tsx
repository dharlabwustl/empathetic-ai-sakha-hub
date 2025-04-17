
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight, CheckCircle, AlertCircle, Calendar, Clock, GraduationCap, BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

interface AcademicAdvisorPanelProps {
  userName: string;
}

const AcademicAdvisorPanel: React.FC<AcademicAdvisorPanelProps> = ({ userName }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [adjustPlanOpen, setAdjustPlanOpen] = useState(false);
  const { toast } = useToast();

  const handleSavePlanAdjustments = () => {
    setAdjustPlanOpen(false);
    toast({
      title: "Study Plan Updated",
      description: "Your adjustments have been saved successfully.",
    });
  };

  const data = [
    {
      subject: 'Physics',
      progress: 68,
      streakDays: 7,
      lastStudied: '2 hours ago',
      recommendation: 'Focus on thermodynamics concepts',
      status: 'on-track'
    },
    {
      subject: 'Mathematics',
      progress: 73,
      streakDays: 12,
      lastStudied: 'Yesterday',
      recommendation: 'Review calculus problems',
      status: 'ahead'
    },
    {
      subject: 'Chemistry',
      progress: 45,
      streakDays: 3,
      lastStudied: '3 days ago',
      recommendation: 'Spend more time on organic chemistry',
      status: 'behind'
    }
  ];

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'on-track':
        return (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-medium">
            <CheckCircle size={12} />
            On Track
          </div>
        );
      case 'ahead':
        return (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-medium">
            <ChevronRight size={12} />
            Ahead
          </div>
        );
      case 'behind':
        return (
          <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded text-xs font-medium">
            <AlertCircle size={12} />
            Attention Needed
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Card className="border border-slate-200 dark:border-slate-800">
        <CardHeader className="bg-slate-50 dark:bg-slate-900/50 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg text-slate-900 dark:text-slate-100">Academic Advisor</CardTitle>
              <CardDescription>Your personalized study recommendations</CardDescription>
            </div>
            <GraduationCap className="text-slate-500 dark:text-slate-400" size={20} />
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="space-y-4">
                {data.map((item, i) => (
                  <div key={i} className="border border-slate-200 dark:border-slate-800 rounded-md p-4">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">{item.subject}</h3>
                      {renderStatusBadge(item.status)}
                    </div>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                          <span>Progress</span>
                          <span>{item.progress}%</span>
                        </div>
                        <Progress value={item.progress} />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-slate-500" />
                          <span className="text-slate-700 dark:text-slate-300">{item.streakDays} day streak</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} className="text-slate-500" />
                          <span className="text-slate-700 dark:text-slate-300">Last: {item.lastStudied}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recommendations">
              <div className="space-y-4">
                {data.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-200 dark:border-slate-800 last:border-0">
                    <div className="mt-0.5">
                      <BookOpen size={16} className="text-indigo-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{item.subject}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{item.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between bg-slate-50 dark:bg-slate-900/50 pt-3">
          <Button variant="outline" onClick={() => setViewDetailsOpen(true)}>
            View Details
          </Button>
          <Button onClick={() => setAdjustPlanOpen(true)}>
            Adjust Plan
          </Button>
        </CardFooter>
      </Card>

      {/* View Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detailed Academic Progress</DialogTitle>
            <DialogDescription>
              Complete breakdown of your academic performance and recommendations
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <GraduationCap size={18} className="text-indigo-500" /> Overall Performance
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <div className="text-sm text-slate-500 dark:text-slate-400">Average Progress</div>
                    <div className="text-2xl font-bold">62%</div>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                    <div className="text-sm text-slate-500 dark:text-slate-400">Study Goal Completion</div>
                    <div className="text-2xl font-bold">14/20</div>
                  </div>
                </div>
              </div>
              
              {data.map((subject, index) => (
                <div key={index} className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-lg font-medium mb-3">{subject.subject}</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <div className="text-sm">Progress</div>
                        <div className="text-sm font-medium">{subject.progress}%</div>
                      </div>
                      <Progress value={subject.progress} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded">
                        <div className="text-slate-500 dark:text-slate-400">Strengths</div>
                        <ul className="mt-1 list-disc list-inside">
                          <li>Problem solving</li>
                          <li>Theory comprehension</li>
                        </ul>
                      </div>
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded">
                        <div className="text-slate-500 dark:text-slate-400">Areas to improve</div>
                        <ul className="mt-1 list-disc list-inside">
                          <li>Formula memorization</li>
                          <li>Practice frequency</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg">
                      <div className="font-medium text-indigo-700 dark:text-indigo-300">Personalized Recommendation</div>
                      <p className="mt-1 text-indigo-600 dark:text-indigo-400 text-sm">{subject.recommendation}</p>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-2 text-center border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-slate-900">
                        <div className="text-xs text-slate-500 dark:text-slate-400">Quiz Score</div>
                        <div className="font-medium">78%</div>
                      </div>
                      <div className="p-2 text-center border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-slate-900">
                        <div className="text-xs text-slate-500 dark:text-slate-400">Time Spent</div>
                        <div className="font-medium">14h 30m</div>
                      </div>
                      <div className="p-2 text-center border border-slate-200 dark:border-slate-800 rounded bg-white dark:bg-slate-900">
                        <div className="text-xs text-slate-500 dark:text-slate-400">Topics Mastered</div>
                        <div className="font-medium">8/12</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button onClick={() => setViewDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Adjust Plan Dialog */}
      <Dialog open={adjustPlanOpen} onOpenChange={setAdjustPlanOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Adjust Your Study Plan</DialogTitle>
            <DialogDescription>
              Customize your learning goals and priorities
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
              <p className="text-amber-700 dark:text-amber-400 text-sm">
                Adjusting your study plan will recalibrate your goals and recommendations. 
                Your progress will not be lost.
              </p>
            </div>
            
            <div className="space-y-4">
              {data.map((subject, index) => (
                <div key={index} className="border border-slate-200 dark:border-slate-800 p-3 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{subject.subject}</h3>
                    {renderStatusBadge(subject.status)}
                  </div>
                  
                  <div className="space-y-3 mt-3">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-sm font-medium">Priority Level</label>
                        <select className="w-full mt-1 rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800">
                          <option>High</option>
                          <option>Medium</option>
                          <option>Low</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Weekly Hours</label>
                        <select className="w-full mt-1 rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800">
                          <option>1-2 hours</option>
                          <option>3-5 hours</option>
                          <option>6+ hours</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Focus Areas</label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div className="flex items-center">
                          <input type="checkbox" id={`theory-${index}`} className="rounded text-indigo-500" defaultChecked />
                          <label htmlFor={`theory-${index}`} className="ml-2 text-sm">Theory</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id={`practice-${index}`} className="rounded text-indigo-500" defaultChecked />
                          <label htmlFor={`practice-${index}`} className="ml-2 text-sm">Practice</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id={`problems-${index}`} className="rounded text-indigo-500" />
                          <label htmlFor={`problems-${index}`} className="ml-2 text-sm">Problem Solving</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id={`exam-${index}`} className="rounded text-indigo-500" />
                          <label htmlFor={`exam-${index}`} className="ml-2 text-sm">Exam Preparation</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div>
              <label className="text-sm font-medium">Additional Comments</label>
              <textarea 
                className="w-full mt-1 rounded-md border-slate-300 dark:border-slate-700 dark:bg-slate-800 h-20"
                placeholder="Any specific areas you want to focus on?"
              ></textarea>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAdjustPlanOpen(false)}>Cancel</Button>
            <Button onClick={handleSavePlanAdjustments}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AcademicAdvisorPanel;
