import React from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Clock, BookOpen, BarChart2, MessageSquare, Download } from "lucide-react";
import { StudentData } from "@/types/admin";

export interface StudentProfileModalProps {
  student: StudentData;
  onClose: () => void;
}

const StudentProfileModal = ({ student, onClose }: StudentProfileModalProps) => {
  const { toast } = useToast();

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleDownloadReport = () => {
    toast({
      title: "Downloading Report",
      description: `Preparing report for ${student.name}...`,
      variant: "default"
    });
    
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: `${student.name}'s report has been downloaded successfully`,
        variant: "default"
      });
    }, 1500);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Student Profile: {student.name}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-2">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-purple-100 dark:bg-purple-800/30 rounded-full flex items-center justify-center text-3xl font-semibold text-purple-600 dark:text-purple-300">
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            
            <div className="flex-grow">
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-gray-600 dark:text-gray-400">{student.email}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  <BookOpen size={12} className="mr-1" />
                  {student.examType} Aspirant
                </div>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                  <Clock size={12} className="mr-1" />
                  Registered: {formatDate(student.registrationDate)}
                </div>
              </div>
            </div>
            
            <div className="md:text-right space-y-1">
              <Button variant="outline" size="sm" className="w-full md:w-auto" onClick={handleDownloadReport}>
                <Download size={14} className="mr-1" />
                Export Profile
              </Button>
            </div>
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="learning">Learning Style</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3 flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-purple-500" />
                    Study Progress
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Course Completion</span>
                        <span>68%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Practice Tests</span>
                        <span>42%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Revision Completed</span>
                        <span>35%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3 flex items-center">
                    <BarChart2 className="mr-2 h-4 w-4 text-blue-500" />
                    Recent Performance
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm">Physics Mock Test</span>
                      <span className="text-sm font-medium">82%</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm">Chemistry Quiz</span>
                      <span className="text-sm font-medium">76%</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-sm">Biology Practice</span>
                      <span className="text-sm font-medium">93%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Full Mock Test</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3 flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4 text-green-500" />
                    Recent Activity
                  </h3>
                  <div className="space-y-3 text-sm">
                    <p className="pb-2 border-b">Completed Physics Module 5 - 2 days ago</p>
                    <p className="pb-2 border-b">Asked 3 questions in Chemistry - 3 days ago</p>
                    <p className="pb-2 border-b">Submitted Biology assignment - 5 days ago</p>
                    <p>Attended live session - 1 week ago</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">Learning Recommendations</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      Increase practice tests in Chemistry
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      Review Physics concepts from Module 3
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      Join peer discussion groups for Biology
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                      Schedule 1-on-1 doubt clearing session
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="learning">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Learning Style Analysis</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Based on interaction patterns and content preferences
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Visual</p>
                    <p className="text-xl font-bold text-purple-600 dark:text-purple-400">65%</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Auditory</p>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">15%</p>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Reading</p>
                    <p className="text-xl font-bold text-amber-600 dark:text-amber-400">12%</p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-center">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Kinesthetic</p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">8%</p>
                  </div>
                </div>
                
                <h4 className="font-medium mb-2">Recommendations</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-1.5"></div>
                    <div>
                      <span className="font-medium">Primarily Visual Learner</span>
                      <p className="text-gray-600 dark:text-gray-400">Provide more diagrams, charts, and visual content</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-1.5"></div>
                    <div>
                      <span className="font-medium">Moderate Auditory Component</span>
                      <p className="text-gray-600 dark:text-gray-400">Supplement with audio explanations and discussions</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 mt-1.5"></div>
                    <div>
                      <span className="font-medium">Limited Kinesthetic Learning</span>
                      <p className="text-gray-600 dark:text-gray-400">Increase interactive elements and hands-on exercises</p>
                    </div>
                  </li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="performance">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Performance Metrics</h3>
                
                <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                  <span className="text-gray-500">Performance Chart Placeholder</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Average Score</p>
                    <p className="text-xl font-bold">84%</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Completion Rate</p>
                    <p className="text-xl font-bold">78%</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Practice Tests</p>
                    <p className="text-xl font-bold">24</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Mock Exams</p>
                    <p className="text-xl font-bold">7</p>
                  </div>
                </div>
                
                <h4 className="font-medium mb-2">Subject Performance</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Physics</span>
                      <span>82%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Chemistry</span>
                      <span>76%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '76%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Biology</span>
                      <span>91%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '91%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="engagement">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Engagement Metrics</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Time Spent</p>
                    <p className="text-xl font-bold">64 hrs</p>
                    <p className="text-xs text-green-600">+12% this month</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Sessions</p>
                    <p className="text-xl font-bold">42</p>
                    <p className="text-xs text-green-600">+8% this month</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Questions Asked</p>
                    <p className="text-xl font-bold">28</p>
                    <p className="text-xs text-amber-600">-3% this month</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">Quiz Attempts</p>
                    <p className="text-xl font-bold">18</p>
                    <p className="text-xs text-green-600">+15% this month</p>
                  </div>
                </div>
                
                <h4 className="font-medium mb-2">Weekly Engagement</h4>
                <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center mb-4">
                  <span className="text-gray-500">Engagement Chart Placeholder</span>
                </div>
                
                <h4 className="font-medium mb-2">Mood Analysis</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Confidence Level</span>
                    <span className="text-sm font-medium">High</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Stress Level</span>
                    <span className="text-sm font-medium text-amber-600">Moderate</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Motivation</span>
                    <span className="text-sm font-medium text-green-600">High</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter>
          <Button onClick={onClose} variant="outline">Close</Button>
          <Button 
            className="bg-gradient-to-r from-purple-500 to-blue-600 text-white hover:from-purple-600 hover:to-blue-700"
            onClick={() => {
              toast({
                title: "Send Message",
                description: `Opening message composer for ${student.name}`,
                variant: "default"
              });
            }}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Student
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudentProfileModal;
