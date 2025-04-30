
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { DatePicker } from '@/components/ui/date-picker';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar, Book, Brain, Target, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { SharedPageLayout } from '../SharedPageLayout';
import { format } from 'date-fns';

const AcademicAdvisorView = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isCreatePlanDialogOpen, setIsCreatePlanDialogOpen] = useState(false);
  const [examDate, setExamDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    examType: '',
    subjects: '',
    studyHoursPerDay: '4',
    preferredTime: 'morning',
    studyStyle: 'balanced',
    additionalGoals: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Study plan created with:', { ...formData, examDate });
    setIsCreatePlanDialogOpen(false);
  };

  return (
    <SharedPageLayout
      title="Academic Advisor"
      subtitle="Get personalized guidance for your academic journey"
    >
      <div className="space-y-6">
        {/* Tabs for different advisor sections */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="study-plan">Study Plans</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            <TabsTrigger value="progress">Progress Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Welcome Card */}
              <Card>
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <CardTitle>Welcome to Your Academic Advisor</CardTitle>
                  <CardDescription>Your personalized guide to academic success</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    The Academic Advisor offers personalized guidance based on your goals, performance, and learning style. Get tailored study plans, subject recommendations, and progress tracking.
                  </p>
                </CardContent>
                <CardFooter>
                  <Dialog open={isCreatePlanDialogOpen} onOpenChange={setIsCreatePlanDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>Create Study Plan</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[550px]">
                      <DialogHeader>
                        <DialogTitle>Create Personalized Study Plan</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="examType">Exam Type</Label>
                          <Select 
                            value={formData.examType} 
                            onValueChange={(value) => handleSelectChange('examType', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select exam type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="neet">NEET</SelectItem>
                              <SelectItem value="iitjee">IIT-JEE</SelectItem>
                              <SelectItem value="upsc">UPSC</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Exam Date</Label>
                          <DatePicker date={examDate} setDate={setExamDate} />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="subjects">Key Subjects (comma separated)</Label>
                          <Input 
                            id="subjects"
                            name="subjects"
                            value={formData.subjects}
                            onChange={handleInputChange}
                            placeholder="E.g., Physics, Chemistry, Biology"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="studyHoursPerDay">Study Hours Per Day</Label>
                            <Select 
                              value={formData.studyHoursPerDay} 
                              onValueChange={(value) => handleSelectChange('studyHoursPerDay', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="2">2 hours</SelectItem>
                                <SelectItem value="4">4 hours</SelectItem>
                                <SelectItem value="6">6 hours</SelectItem>
                                <SelectItem value="8">8+ hours</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="preferredTime">Preferred Study Time</Label>
                            <Select 
                              value={formData.preferredTime} 
                              onValueChange={(value) => handleSelectChange('preferredTime', value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="morning">Morning</SelectItem>
                                <SelectItem value="afternoon">Afternoon</SelectItem>
                                <SelectItem value="evening">Evening</SelectItem>
                                <SelectItem value="night">Night</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="studyStyle">Study Style</Label>
                          <Select 
                            value={formData.studyStyle} 
                            onValueChange={(value) => handleSelectChange('studyStyle', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="intensive">Intensive (deep focus)</SelectItem>
                              <SelectItem value="balanced">Balanced (mixed approach)</SelectItem>
                              <SelectItem value="spaced">Spaced (frequent breaks)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="additionalGoals">Additional Goals (optional)</Label>
                          <Textarea 
                            id="additionalGoals"
                            name="additionalGoals"
                            value={formData.additionalGoals}
                            onChange={handleInputChange}
                            placeholder="Any specific areas you want to focus on..."
                            rows={3}
                          />
                        </div>
                        
                        <div className="flex justify-between pt-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setIsCreatePlanDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit">Generate Study Plan</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
              
              {/* Quick Actions Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="flex flex-col h-auto py-4 justify-start items-start text-left">
                      <Book className="h-5 w-5 mb-2" />
                      <div>
                        <div className="font-medium">Study Resources</div>
                        <div className="text-xs text-gray-500">Find recommended material</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="flex flex-col h-auto py-4 justify-start items-start text-left">
                      <Calendar className="h-5 w-5 mb-2" />
                      <div>
                        <div className="font-medium">Schedule Review</div>
                        <div className="text-xs text-gray-500">Optimize your timetable</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="flex flex-col h-auto py-4 justify-start items-start text-left">
                      <Brain className="h-5 w-5 mb-2" />
                      <div>
                        <div className="font-medium">Learning Style</div>
                        <div className="text-xs text-gray-500">Analyze your approach</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="flex flex-col h-auto py-4 justify-start items-start text-left">
                      <Target className="h-5 w-5 mb-2" />
                      <div>
                        <div className="font-medium">Goal Setting</div>
                        <div className="text-xs text-gray-500">Define your targets</div>
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Current Study Plan Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Current Study Plan</CardTitle>
                <CardDescription>NEET Preparation Plan • 120 days remaining</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">Today's Focus</div>
                    <div className="mt-1 font-medium">Physics: Thermodynamics</div>
                    <div className="text-sm text-gray-600">2 concepts • 3 practice sets</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">Weekly Target</div>
                    <div className="mt-1 font-medium">15 concepts • 5 practice tests</div>
                    <div className="text-sm text-gray-600">60% completed</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500">Upcoming Milestone</div>
                    <div className="mt-1 font-medium">Physics Full Revision</div>
                    <div className="text-sm text-gray-600">Due in 7 days</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Complete Study Plan</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="study-plan" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Study Plans</CardTitle>
                <CardDescription>Manage and view your personalized study plans</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">This section will display all your created study plans.</p>
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-lg">NEET Preparation Plan</h3>
                      <p className="text-sm text-gray-500">Created on Sep 15, 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Active
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Exam Date</p>
                      <p>May 5, 2024</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Days Remaining</p>
                      <p>120 days</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Key Subjects</p>
                      <p>Physics, Chemistry, Biology</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Daily Target</p>
                      <p>4 hours</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm">View Details</Button>
                    <Button size="sm" variant="outline">Edit Plan</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setIsCreatePlanDialogOpen(true)}>
                  Create New Study Plan
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="recommendations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>Resources tailored to your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Based on your performance and goals, here are some recommended resources:</p>
                
                <div className="mt-4 space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Advanced Physics Problem Solving</h3>
                      <Badge>Concept Card</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Strengthen your physics problem solving with advanced techniques.</p>
                    <Button size="sm" variant="link" className="p-0 h-auto mt-2">View Resource</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Organic Chemistry Flashcards</h3>
                      <Badge>Flashcard Deck</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Master key organic chemistry concepts with this comprehensive flashcard set.</p>
                    <Button size="sm" variant="link" className="p-0 h-auto mt-2">View Resource</Button>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Biology Mock Test Series</h3>
                      <Badge>Practice Exam</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Test your biology knowledge with these challenging practice exams.</p>
                    <Button size="sm" variant="link" className="p-0 h-auto mt-2">View Resource</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="progress" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Progress Analysis</CardTitle>
                <CardDescription>Track your learning journey and identify areas for growth</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">A comprehensive overview of your academic progress:</p>
                
                {/* Subject Progress */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-medium">Subject Progress</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Physics</span>
                        <span>68%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Chemistry</span>
                        <span>75%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Biology</span>
                        <span>52%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '52%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Strengths and Weaknesses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                      Strengths
                    </h3>
                    <ul className="space-y-1 text-sm">
                      <li>Physics: Mechanics, Electricity</li>
                      <li>Chemistry: Periodic Table, Chemical Bonding</li>
                      <li>Biology: Human Physiology</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2 flex items-center">
                      <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                      Areas for Improvement
                    </h3>
                    <ul className="space-y-1 text-sm">
                      <li>Physics: Thermodynamics</li>
                      <li>Chemistry: Organic Chemistry</li>
                      <li>Biology: Genetics</li>
                    </ul>
                  </div>
                </div>
                
                {/* Time Spent */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">Study Time Distribution</h3>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-2xl font-bold">28</p>
                      <p className="text-xs text-gray-500">Hours This Week</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">98</p>
                      <p className="text-xs text-gray-500">Hours This Month</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">310</p>
                      <p className="text-xs text-gray-500">Total Hours</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View Detailed Analytics</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SharedPageLayout>
  );
};

export default AcademicAdvisorView;
