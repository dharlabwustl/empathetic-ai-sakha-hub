
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, X } from "lucide-react";
import { UserProfileType } from "@/types/user/base";

interface StudyPlanDialogProps {
  userProfile: UserProfileType;
  onClose: () => void;
}

const StudyPlanDialog: React.FC<StudyPlanDialogProps> = ({ userProfile, onClose }) => {
  // Get current day and format date
  const today = new Date();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = daysOfWeek[today.getDay()];
  const formattedDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  
  // Sample study plan data
  const studyPlanItems = [
    { 
      id: 1, 
      subject: "Physics", 
      topic: "Kinematics", 
      duration: 45, 
      priority: "high",
      completed: false,
      time: "09:00 AM - 09:45 AM" 
    },
    { 
      id: 2, 
      subject: "Mathematics", 
      topic: "Integration", 
      duration: 60, 
      priority: "medium",
      completed: true,
      time: "10:00 AM - 11:00 AM" 
    },
    { 
      id: 3, 
      subject: "Chemistry", 
      topic: "Organic Chemistry: Alcohols", 
      duration: 45, 
      priority: "high",
      completed: false,
      time: "11:15 AM - 12:00 PM" 
    },
    { 
      id: 4, 
      subject: "Physics", 
      topic: "Practice Problems: Forces", 
      duration: 30, 
      priority: "medium",
      completed: false,
      time: "02:00 PM - 02:30 PM" 
    },
    { 
      id: 5, 
      subject: "Mathematics", 
      topic: "Quiz: Differentiation", 
      duration: 15, 
      priority: "low",
      completed: false,
      time: "03:00 PM - 03:15 PM" 
    }
  ];

  const totalDuration = studyPlanItems.reduce((acc, item) => acc + item.duration, 0);
  const completedItems = studyPlanItems.filter(item => item.completed).length;
  const examGoal = userProfile?.examPreparation || "General Studies";

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl font-semibold">Today's Study Plan</span>
              <span className="ml-2 py-1 px-2 bg-blue-100 text-blue-800 text-xs rounded-md">
                For {examGoal}
              </span>
            </div>
            <DialogClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X size={16} />
              </Button>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mb-4">
          <h3 className="text-lg font-medium">{dayOfWeek}, {formattedDate}</h3>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center text-sm text-gray-600">
              <Clock size={16} className="mr-1" />
              <span>{totalDuration} minutes of study</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <CheckCircle size={16} className="mr-1" />
              <span>{completedItems}/{studyPlanItems.length} tasks completed</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          {studyPlanItems.map(item => (
            <Card key={item.id} className={`p-3 ${item.completed ? 'bg-gray-50 dark:bg-gray-800/50' : ''}`}>
              <div className="flex items-center gap-3">
                <div className={`w-1 self-stretch rounded-full ${
                  item.priority === 'high' ? 'bg-red-500' : 
                  item.priority === 'medium' ? 'bg-amber-500' : 'bg-green-500'
                }`}></div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h4 className={`font-medium ${item.completed ? 'text-gray-400 line-through' : ''}`}>
                      {item.subject}: {item.topic}
                    </h4>
                    {item.completed && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                        Completed
                      </span>
                    )}
                  </div>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Clock size={14} className="mr-1" />
                    <span>{item.duration} mins • {item.time}</span>
                  </div>
                </div>
                <Button variant={item.completed ? "outline" : "default"} size="sm">
                  {item.completed ? 'Mark Incomplete' : 'Start Now'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-4 flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>Customize Study Plan</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanDialog;
