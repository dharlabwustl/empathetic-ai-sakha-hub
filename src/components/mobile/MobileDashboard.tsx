
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Brain, 
  Calendar, 
  Clock, 
  Home, 
  LineChart, 
  Menu, 
  MessageSquare, 
  MoreHorizontal, 
  Search, 
  Settings, 
  User
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface MobileDashboardProps {
  userName: string;
  examType?: string;
}

const MobileDashboard: React.FC<MobileDashboardProps> = ({ 
  userName, 
  examType = "JEE" 
}) => {
  const [activeTab, setActiveTab] = useState("home");
  const [showSearch, setShowSearch] = useState(false);
  
  // Mock data
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long' 
  });
  
  const mockStudySchedule = [
    { 
      id: 1, 
      subject: "Physics", 
      topic: "Kinematics - Equations of Motion", 
      duration: 45, 
      time: "09:00 - 09:45", 
      isCompleted: true 
    },
    { 
      id: 2, 
      subject: "Chemistry", 
      topic: "Atomic Structure - Quantum Numbers", 
      duration: 60, 
      time: "10:00 - 11:00", 
      isCompleted: true 
    },
    { 
      id: 3, 
      subject: "Mathematics", 
      topic: "Calculus - Integration by Parts", 
      duration: 45, 
      time: "11:15 - 12:00", 
      isCompleted: false,
      isActive: true
    },
    { 
      id: 4, 
      subject: "Physics", 
      topic: "Circular Motion - Centripetal Force", 
      duration: 60, 
      time: "14:00 - 15:00", 
      isCompleted: false 
    },
    { 
      id: 5, 
      subject: "Mathematics", 
      topic: "Differential Equations - First Order", 
      duration: 45, 
      time: "15:15 - 16:00", 
      isCompleted: false 
    }
  ];
  
  const subjectColors: Record<string, string> = {
    "Physics": "bg-blue-100 text-blue-600 border-blue-200",
    "Chemistry": "bg-purple-100 text-purple-600 border-purple-200",
    "Mathematics": "bg-green-100 text-green-600 border-green-200",
    "Biology": "bg-red-100 text-red-600 border-red-200"
  };
  
  const progressData = [
    { subject: "Physics", progress: 68, color: "bg-blue-500" },
    { subject: "Chemistry", progress: 52, color: "bg-purple-500" },
    { subject: "Mathematics", progress: 75, color: "bg-green-500" }
  ];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {/* Welcome card */}
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="font-semibold text-lg">Hello, {userName}</h2>
                    <p className="text-gray-500 text-sm">{formattedDate}</p>
                  </div>
                  <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                    <Bell />
                  </Button>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Daily progress</span>
                    <span className="font-semibold">40% Complete</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
              </CardContent>
            </Card>
            
            {/* Today's schedule */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">Today's Schedule</h2>
                <Button variant="ghost" size="sm" className="text-violet-600">View all</Button>
              </div>
              
              <div className="space-y-3">
                {mockStudySchedule.map(item => (
                  <div 
                    key={item.id} 
                    className={`p-3 border rounded-lg ${
                      item.isActive 
                        ? "border-violet-400 bg-violet-50" 
                        : item.isCompleted 
                        ? "border-gray-200 bg-gray-50" 
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className={subjectColors[item.subject] || "bg-gray-100 text-gray-600"}>
                          {item.subject}
                        </Badge>
                        <h3 className={`font-medium mt-1 ${item.isCompleted ? "line-through text-gray-400" : ""}`}>
                          {item.topic}
                        </h3>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-500 block">{item.time}</span>
                        <span className="text-xs text-gray-500 block">{item.duration} min</span>
                      </div>
                    </div>
                    {item.isActive && (
                      <div className="mt-2">
                        <Button size="sm" className="bg-violet-600 hover:bg-violet-700 w-full">
                          Continue Studying
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Progress summary */}
            <div>
              <h2 className="font-semibold text-lg mb-4">Subject Progress</h2>
              
              <Card>
                <CardContent className="p-4 space-y-4">
                  {progressData.map((subject, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{subject.subject}</span>
                        <span className="font-medium">{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className={`h-2 ${subject.color}`} />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
            
            {/* Recent activity */}
            <div>
              <h2 className="font-semibold text-lg mb-4">Recent Activity</h2>
              
              <div className="space-y-3">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                        <Brain size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Quiz Completed</h3>
                        <p className="text-sm text-gray-600">Physics: Kinematics</p>
                        <p className="text-xs text-gray-500 mt-1">Score: 85%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                        <MessageSquare size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">AI Tutor Session</h3>
                        <p className="text-sm text-gray-600">Chemistry: Chemical Bonding</p>
                        <p className="text-xs text-gray-500 mt-1">25 minutes ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        );
        
      case "planner":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <Tabs defaultValue="day">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
              
              <TabsContent value="day" className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold">Today</h3>
                      <Button variant="outline" size="sm">
                        <Calendar size={14} className="mr-1" /> Select Date
                      </Button>
                    </div>
                    
                    {mockStudySchedule.map((item, index) => (
                      <div 
                        key={index}
                        className="flex items-center py-2 border-b last:border-b-0"
                      >
                        <div className="w-20 text-sm text-gray-500">
                          {item.time.split(' - ')[0]}
                        </div>
                        <div className={`flex-grow p-2 rounded-md ${
                          subjectColors[item.subject]?.split(' ')[0] || "bg-gray-100"
                        }`}>
                          <div className="text-sm font-medium">{item.subject}</div>
                          <div className="text-xs">{item.topic}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="week">
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4">This Week's Focus</h3>
                    <div className="space-y-3">
                      {["Physics: Rotation", "Chemistry: Chemical Bonding", "Mathematics: Integration"].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-violet-400 mr-2"></div>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="month">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Calendar className="h-12 w-12 mx-auto text-violet-600 mb-2" />
                    <h3 className="font-semibold">Monthly View</h3>
                    <p className="text-sm text-gray-600">
                      Your exam is in 120 days. Stay on track with your study plan!
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        );
        
      case "learn":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">Study Materials</h2>
              <Button variant="outline" size="sm">
                <Search size={14} className="mr-1" /> Find Topic
              </Button>
            </div>
            
            <Tabs defaultValue="subjects">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="subjects">Subjects</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
              </TabsList>
              
              <TabsContent value="subjects" className="mt-4">
                <div className="grid grid-cols-2 gap-3">
                  {["Physics", "Chemistry", "Mathematics", "Biology"].map((subject, index) => (
                    <Card key={index}>
                      <CardContent className={`p-4 text-center ${subjectColors[subject]?.split(' ')[0] || "bg-gray-100"}`}>
                        <div className="h-12 w-12 rounded-full bg-white mx-auto flex items-center justify-center mb-2">
                          <BookOpen className="h-6 w-6 text-gray-700" />
                        </div>
                        <h3 className="font-medium">{subject}</h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="recent">
                <div className="mt-4 space-y-3">
                  {["Momentum & Impulse", "Periodic Table", "Integration by Parts"].map((topic, index) => (
                    <Card key={index}>
                      <CardContent className="p-3 flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{topic}</h3>
                          <p className="text-xs text-gray-500">Accessed 2 days ago</p>
                        </div>
                        <Button size="sm" variant="ghost" className="rounded-full h-8 w-8 p-0">
                          <MoreHorizontal size={16} />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="bookmarked">
                <div className="mt-4 text-center p-8">
                  <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <h3 className="font-medium text-gray-600">No bookmarks yet</h3>
                  <p className="text-sm text-gray-500">
                    Bookmark important topics for quick access
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        );
        
      case "ai":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">AI Tutor Chat</h2>
              <Button variant="outline" size="sm">New Chat</Button>
            </div>
            
            <div className="flex-1 bg-gray-50 rounded-lg p-4 mb-4 overflow-y-auto">
              <div className="flex flex-col space-y-4">
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
                    <p className="text-sm">
                      Hello! I'm your AI tutor. How can I help you with your studies today?
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <div className="bg-violet-100 p-3 rounded-lg shadow-sm max-w-[80%]">
                    <p className="text-sm">
                      Can you help me understand integration by parts?
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-lg shadow-sm max-w-[80%]">
                    <p className="text-sm">
                      Of course! Integration by parts is a technique used when integrating the product of two functions.
                    </p>
                    <p className="text-sm mt-2">
                      The formula is: ∫u·v′ dx = u·v - ∫v·u′ dx
                    </p>
                    <p className="text-sm mt-2">
                      Would you like me to show you an example?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Ask any question..."
                className="flex-1 p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:border-transparent"
              />
              <Button className="rounded-r-lg">Send</Button>
            </div>
          </motion.div>
        );
        
      case "progress":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">Your Progress</h2>
              <Button variant="outline" size="sm">
                <Calendar size={14} className="mr-1" /> This Week
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Overall Exam Readiness</h3>
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full border-4 border-violet-500 flex items-center justify-center text-lg font-bold text-violet-700 mr-4">
                    65%
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-1">Your preparation is on track</p>
                    <Progress value={65} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div>
              <h3 className="font-medium mb-3">Subject Breakdown</h3>
              <div className="space-y-4">
                {progressData.map((subject, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{subject.subject}</h4>
                        <span className="font-bold">{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className={`h-2 ${subject.color}`} />
                      
                      <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="p-1 rounded bg-gray-50">
                          <div className="font-medium">Topics</div>
                          <div>12/20</div>
                        </div>
                        <div className="p-1 rounded bg-gray-50">
                          <div className="font-medium">Tests</div>
                          <div>8/15</div>
                        </div>
                        <div className="p-1 rounded bg-gray-50">
                          <div className="font-medium">Avg Score</div>
                          <div>72%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-3">Weekly Study Time</h3>
                <div className="h-40 flex items-end justify-between">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div 
                        className="w-8 bg-violet-400 rounded-t"
                        style={{ 
                          height: `${[30, 45, 60, 40, 70, 50, 20][index]}%`
                        }}
                      ></div>
                      <div className="mt-2 text-xs">{day}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
        
      default:
        return <div>Tab content not found</div>;
    }
  };
  
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* App header */}
      <header className="bg-violet-600 text-white p-4 flex justify-between items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-violet-500">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Sakha AI</SheetTitle>
            </SheetHeader>
            <div className="py-6">
              <div className="flex flex-col space-y-3">
                <Button variant="ghost" className="justify-start">
                  <User className="mr-2 h-4 w-4" /> Profile
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Clock className="mr-2 h-4 w-4" /> Study History
                </Button>
                <Button variant="ghost" className="justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                  Sign Out
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <h1 className="font-bold text-lg">Sakha AI</h1>
        
        <Button variant="ghost" size="icon" className="text-white hover:bg-violet-500" onClick={() => setShowSearch(!showSearch)}>
          <Search size={24} />
        </Button>
      </header>
      
      {/* Search bar (collapsible) */}
      {showSearch && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }} 
          animate={{ height: "auto", opacity: 1 }}
          className="p-3 bg-violet-500"
        >
          <input 
            type="text"
            placeholder="Search topics, materials..."
            className="w-full p-2 rounded focus:outline-none"
            autoFocus
          />
        </motion.div>
      )}
      
      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-4">
        {renderTabContent()}
      </main>
      
      {/* Bottom navigation */}
      <nav className="bg-white border-t border-gray-200 p-1">
        <div className="grid grid-cols-5">
          {[
            { id: "home", icon: <Home size={20} />, label: "Home" },
            { id: "planner", icon: <Calendar size={20} />, label: "Planner" },
            { id: "learn", icon: <BookOpen size={20} />, label: "Learn" },
            { id: "ai", icon: <Brain size={20} />, label: "AI Tutor" },
            { id: "progress", icon: <LineChart size={20} />, label: "Progress" }
          ].map(item => (
            <Button
              key={item.id}
              variant="ghost"
              className={`flex flex-col items-center py-2 h-auto ${
                activeTab === item.id ? "text-violet-600" : "text-gray-500"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
};

const Bell = () => {
  return (
    <div className="relative">
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
      <Bell size={18} />
    </div>
  );
};

export default MobileDashboard;
