
import { useEffect, useState } from "react";
import SidebarNav from "@/components/dashboard/SidebarNav";
import ChatAssistant from "@/components/dashboard/ChatAssistant";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Brain, Calendar, Clock, LineChart, MessageSquare, PencilRuler, Smile } from "lucide-react";

const StudentDashboard = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
      toast({
        title: "Welcome back, Student!",
        description: "Your dashboard is ready.",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sakha-light-blue/5 via-white to-sakha-lavender/5">
        <div className="text-center">
          <img 
            src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
            alt="Sakha AI" 
            className="w-16 h-16 mx-auto animate-pulse mb-4" 
          />
          <h2 className="text-xl font-medium mb-2">Loading your dashboard...</h2>
          <p className="text-gray-500">Personalizing your experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakha-light-blue/5 via-white to-sakha-lavender/5">
      <SidebarNav userType="student" userName="Rahul Singh" />
      
      <main className="md:ml-64 p-6">
        <div className="mb-8 mt-10 md:mt-0">
          <h1 className="text-3xl font-display font-bold mb-2">Welcome back, Rahul</h1>
          <p className="text-gray-600">Here's an overview of your learning journey</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Study Time Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">2.5 hours</span>
                <Clock className="text-sakha-blue" size={24} />
              </div>
              <p className="text-xs text-green-600 mt-2">+25% from yesterday</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Subjects Covered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">3/5</span>
                <BookOpen className="text-sakha-blue" size={24} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Physics, Math, Chemistry</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Quiz Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">82%</span>
                <Brain className="text-sakha-blue" size={24} />
              </div>
              <p className="text-xs text-orange-600 mt-2">-3% from last quiz</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Mood Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">Focused 😊</span>
                <Smile className="text-sakha-blue" size={24} />
              </div>
              <p className="text-xs text-muted-foreground mt-2">Better than yesterday</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="planner" className="space-y-6">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <TabsTrigger value="planner" className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Study Planner</span>
            </TabsTrigger>
            <TabsTrigger value="tutor" className="flex items-center gap-2">
              <MessageSquare size={16} />
              <span>24/7 Tutor</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <LineChart size={16} />
              <span>Progress</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <PencilRuler size={16} />
              <span>Projects</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="planner">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Today's Study Plan (May 12, 2025)</span>
                  <Button size="sm">+ Add Task</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Check className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Physics - Electromagnetism</h3>
                        <span className="text-sm text-gray-500">9:00 AM - 10:30 AM</span>
                      </div>
                      <p className="text-sm text-gray-600">Chapter 7 - Complete</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <Check className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Mathematics - Integration</h3>
                        <span className="text-sm text-gray-500">11:00 AM - 12:30 PM</span>
                      </div>
                      <p className="text-sm text-gray-600">Practice problems - Complete</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Circle className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Chemistry - Organic Chemistry</h3>
                        <span className="text-sm text-gray-500">2:00 PM - 3:30 PM</span>
                      </div>
                      <p className="text-sm text-gray-600">Alkanes and Alkynes - In progress</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                      <Circle className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Biology - Human Physiology</h3>
                        <span className="text-sm text-gray-500">4:00 PM - 5:30 PM</span>
                      </div>
                      <p className="text-sm text-gray-600">Nervous System - Not started</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tutor">
            <Card>
              <CardHeader>
                <CardTitle>24/7 Tutor</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6 space-y-4">
                  <MessageSquare size={48} className="mx-auto text-sakha-blue" />
                  <h3 className="text-xl font-medium">Ask Sakha Any Question</h3>
                  <p className="text-gray-600">
                    Need help with a tough problem? Have a concept you don't understand?
                    Just click the button below to start a tutoring session.
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white"
                    size="lg"
                  >
                    Start Tutoring Session
                  </Button>
                  
                  <div className="pt-6 border-t border-gray-200 mt-6">
                    <h4 className="font-medium mb-3">Recent Questions</h4>
                    <div className="space-y-2 text-left">
                      <div className="p-3 rounded-lg bg-gray-50 text-sm">
                        How do I solve quadratic equations using the formula?
                      </div>
                      <div className="p-3 rounded-lg bg-gray-50 text-sm">
                        Explain Newton's First Law of Motion with examples.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Your Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Physics</h3>
                      <span className="text-sm text-gray-500">75% Complete</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-sakha-blue rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Mathematics</h3>
                      <span className="text-sm text-gray-500">60% Complete</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-sakha-blue rounded-full" style={{ width: "60%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Chemistry</h3>
                      <span className="text-sm text-gray-500">40% Complete</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-sakha-blue rounded-full" style={{ width: "40%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Biology</h3>
                      <span className="text-sm text-gray-500">25% Complete</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-sakha-blue rounded-full" style={{ width: "25%" }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button>View Detailed Analytics</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Projects</span>
                  <Button size="sm">+ New Project</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Science Fair: Renewable Energy</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Exploring solar and wind energy applications
                        </p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                        In Progress
                      </span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-gray-500">Due: May 30, 2025</div>
                      <Button variant="outline" size="sm">Continue</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">Math Visualization Tool</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Interactive graphing calculator for complex functions
                        </p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        Planning
                      </span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm text-gray-500">Due: June 15, 2025</div>
                      <Button variant="outline" size="sm">Continue</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <ChatAssistant userType="student" />
    </div>
  );
};

const Check = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const Circle = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

export default StudentDashboard;
