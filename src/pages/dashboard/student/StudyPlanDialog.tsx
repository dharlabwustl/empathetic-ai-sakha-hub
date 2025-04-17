
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Clock, BookOpen, CheckCircle, X, ChevronRight, Clock1 } from "lucide-react";
import { UserProfileType } from "@/types/user";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface StudyPlanDialogProps {
  userProfile: UserProfileType;
  onClose: () => void;
}

const StudyPlanDialog = ({ userProfile, onClose }: StudyPlanDialogProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [subject, setSubject] = useState("Physics");
  const [view, setView] = useState<'calendar' | 'today'>('today');
  
  const examGoal = userProfile.goals?.[0]?.title || "IIT-JEE";
  
  // Sample subjects for the selected exam
  const examSubjects = getSubjectsForGoal(examGoal);
  
  // Sample topics for each subject
  const subjectTopics = {
    "Physics": [
      { name: "Kinematics", progress: 75, status: "completed" },
      { name: "Laws of Motion", progress: 60, status: "in-progress" },
      { name: "Work, Energy, Power", progress: 30, status: "in-progress" },
      { name: "Rotational Motion", progress: 0, status: "upcoming" },
      { name: "Gravitation", progress: 0, status: "upcoming" }
    ],
    "Chemistry": [
      { name: "Atomic Structure", progress: 85, status: "completed" },
      { name: "Chemical Bonding", progress: 40, status: "in-progress" },
      { name: "States of Matter", progress: 0, status: "upcoming" }
    ],
    "Mathematics": [
      { name: "Trigonometry", progress: 90, status: "completed" },
      { name: "Coordinate Geometry", progress: 65, status: "in-progress" },
      { name: "Calculus", progress: 20, status: "in-progress" },
      { name: "Vectors", progress: 0, status: "upcoming" }
    ],
    "Biology": [
      { name: "Cell Structure", progress: 80, status: "completed" },
      { name: "Human Physiology", progress: 50, status: "in-progress" },
      { name: "Genetics", progress: 10, status: "in-progress" }
    ]
  };
  
  // Get today's topics based on selected subject
  const getTodayTopics = (subj: string) => {
    switch(subj) {
      case "Physics":
        return [
          { name: "Laws of Motion", time: "10:00 AM - 11:30 AM", duration: "90 min" },
          { name: "Work, Energy, Power", time: "2:00 PM - 3:30 PM", duration: "90 min" }
        ];
      case "Chemistry":
        return [
          { name: "Chemical Bonding", time: "11:30 AM - 1:00 PM", duration: "90 min" }
        ];
      case "Mathematics":
        return [
          { name: "Coordinate Geometry", time: "4:00 PM - 5:00 PM", duration: "60 min" },
          { name: "Calculus", time: "7:00 PM - 8:30 PM", duration: "90 min" }
        ];
      case "Biology":
        return [
          { name: "Human Physiology", time: "10:00 AM - 11:30 AM", duration: "90 min" },
          { name: "Genetics", time: "3:00 PM - 4:30 PM", duration: "90 min" }
        ];
      default:
        return [];
    }
  };
  
  const topics = subjectTopics[subject as keyof typeof subjectTopics] || [];
  const todayTopics = getTodayTopics(subject);
  
  // Calculate overall progress
  const overallProgress = topics.reduce((acc, topic) => acc + topic.progress, 0) / topics.length;

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-2xl h-[70vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              Study Plan for {examGoal}
            </span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-between mb-6">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg">Overall Progress</h3>
            <Progress value={Math.round(overallProgress)} className="h-2 w-64" />
            <span className="text-sm text-gray-600">{Math.round(overallProgress)}% Complete</span>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={view === 'today' ? "default" : "outline"}
              onClick={() => setView('today')}
              className="flex items-center gap-1"
            >
              <Clock1 className="h-4 w-4" />
              Today's Plan
            </Button>
            <Button
              variant={view === 'calendar' ? "default" : "outline"}
              onClick={() => setView('calendar')}
              className="flex items-center gap-1"
            >
              <CalendarIcon className="h-4 w-4" />
              Calendar View
            </Button>
          </div>
        </div>
        
        <div className="flex gap-4">
          {/* Subject selector */}
          <div className="flex-shrink-0 w-48 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 p-2">
            <h4 className="font-medium text-sm text-gray-500 mb-2 px-2">Subjects</h4>
            <div className="space-y-1">
              {examSubjects.map((subj) => (
                <Button
                  key={subj}
                  variant={subject === subj ? "subtle" : "ghost"}
                  className={`w-full justify-start ${subject === subj ? 'bg-indigo-100 text-indigo-800' : ''}`}
                  onClick={() => setSubject(subj)}
                >
                  {subj}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Content area */}
          <div className="flex-1 border rounded-lg overflow-hidden">
            {view === 'calendar' && (
              <div className="p-4">
                <div className="flex justify-center mb-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </div>
                
                <div className="mt-4 bg-gray-50 p-3 rounded-lg">
                  <h4 className="font-medium">
                    {date ? format(date, "PPP") : "Select a date"}
                  </h4>
                  
                  {date && (
                    <div className="mt-2 space-y-2">
                      {todayTopics.map((topic, i) => (
                        <div 
                          key={i}
                          className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200"
                        >
                          <div>
                            <h5 className="font-medium">{topic.name}</h5>
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="h-3 w-3 mr-1" />
                              {topic.time}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {view === 'today' && (
              <ScrollArea className="h-[450px] p-4">
                <h3 className="font-semibold text-lg mb-4">Today's Study Plan - {subject}</h3>
                
                <div className="space-y-4">
                  {todayTopics.map((topic, i) => (
                    <div 
                      key={i} 
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-medium text-lg">{topic.name}</h4>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {topic.duration}
                        </span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 text-sm mb-4">
                        <Clock className="h-4 w-4 mr-1" />
                        {topic.time}
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">Mark Complete</Button>
                        <Button size="sm" className="flex items-center gap-1">
                          Start Learning
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <h3 className="font-semibold text-lg mt-6 mb-4">All Topics Progress - {subject}</h3>
                
                <div className="space-y-3">
                  {topics.map((topic, idx) => (
                    <div 
                      key={idx} 
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h5 className="font-medium">{topic.name}</h5>
                        <span className={`text-xs px-2 py-1 rounded ${getStatusColor(topic.status)}`}>
                          {getStatusLabel(topic.status)}
                        </span>
                      </div>
                      
                      <Progress value={topic.progress} className="h-2" />
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-600">{topic.progress}% Complete</span>
                        <Button size="sm" variant="link" className="text-xs p-0 h-auto">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button>Adjust Plan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Helper functions
function getStatusColor(status: string): string {
  switch(status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    case 'upcoming':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function getStatusLabel(status: string): string {
  switch(status) {
    case 'completed':
      return 'Completed';
    case 'in-progress':
      return 'In Progress';
    case 'upcoming':
      return 'Upcoming';
    default:
      return status;
  }
}

function getSubjectsForGoal(goalTitle: string): string[] {
  const subjectsMap: Record<string, string[]> = {
    "IIT-JEE": ["Physics", "Chemistry", "Mathematics"],
    "NEET": ["Physics", "Chemistry", "Biology"],
    "UPSC": ["General Studies", "Current Affairs", "History", "Geography", "Polity", "Economy"],
    "CAT": ["Quantitative Ability", "Verbal Ability", "Data Interpretation", "Logical Reasoning"],
    "GATE": ["Engineering Mathematics", "General Aptitude", "Subject Specific Paper"]
  };
  
  const normalizedGoalTitle = Object.keys(subjectsMap).find(
    goal => goalTitle.toLowerCase().includes(goal.toLowerCase())
  );
  
  return normalizedGoalTitle ? subjectsMap[normalizedGoalTitle] : ["Physics", "Chemistry", "Mathematics"];
}

export default StudyPlanDialog;
