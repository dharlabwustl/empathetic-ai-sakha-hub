
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, X, CalendarClock, BookOpen, LineChart } from "lucide-react";
import { UserProfileType } from "@/types/user";
import { Progress } from "@/components/ui/progress";

interface StudyPlanDialogProps {
  userProfile: UserProfileType;
  onClose: () => void;
}

const StudyPlanDialog: React.FC<StudyPlanDialogProps> = ({ userProfile, onClose }) => {
  // Mock study plan data - in a real app this would come from the backend
  const studyPlan = {
    examGoal: userProfile?.goals?.[0]?.title || "IIT-JEE",
    totalTime: "28 hours/week",
    progress: 65,
    subjects: [
      { name: "Physics", allocatedTime: "10 hours/week", progress: 70 },
      { name: "Chemistry", allocatedTime: "8 hours/week", progress: 60 },
      { name: "Mathematics", allocatedTime: "10 hours/week", progress: 65 }
    ],
    upcomingEvents: [
      { title: "Physics Mock Test", date: "Tomorrow, 4:00 PM" },
      { title: "Chemistry Revision", date: "Wednesday, 5:30 PM" },
      { title: "Mathematics Practice", date: "Friday, 3:00 PM" }
    ],
    performance: {
      strengths: ["Mechanics", "Organic Chemistry", "Calculus"],
      weaknesses: ["Electromagnetism", "Physical Chemistry", "Statistics"],
      recentScore: 78,
      improvement: 12
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white dark:bg-gray-900 p-0 overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-violet-600 to-indigo-600 p-6 text-white flex justify-between items-center">
          <div>
            <DialogTitle className="text-2xl font-bold text-white">Your Personalized Study Plan</DialogTitle>
            <p className="text-violet-100 mt-1">Goal: {studyPlan.examGoal}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10 rounded-full h-8 w-8 p-0">
            <X className="h-5 w-5" />
          </Button>
        </DialogHeader>
        <div className="p-6">
          {/* Student info and progress section */}
          <div className="flex flex-col md:flex-row justify-between pb-4 border-b mb-6">
            <div>
              <h2 className="text-lg font-semibold">
                {userProfile.name || "Student"}
              </h2>
              <div className="flex items-center mt-1">
                <Clock className="h-4 w-4 text-violet-500 mr-1" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {studyPlan.totalTime} allocated
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm font-medium">{studyPlan.progress}%</span>
              </div>
              <Progress value={studyPlan.progress} className="h-2 w-48" />
            </div>
          </div>

          {/* Subject allocation and progress */}
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <BookOpen className="h-5 w-5 text-violet-500 mr-2" />
            Subject Allocation & Progress
          </h3>

          <div className="grid gap-4 mb-8">
            {studyPlan.subjects.map((subject, index) => (
              <div key={index} className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-violet-100 dark:border-violet-800/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                  <h4 className="font-medium text-violet-800 dark:text-violet-300">{subject.name}</h4>
                  <span className="text-sm text-violet-600 dark:text-violet-400">{subject.allocatedTime}</span>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="text-xs font-medium">{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} className="h-1.5" />
              </div>
            ))}
          </div>

          {/* Calendar reminders */}
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <CalendarClock className="h-5 w-5 text-violet-500 mr-2" />
            Calendar Reminders
          </h3>

          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 mb-8">
            <div className="space-y-4">
              {studyPlan.upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-violet-100 dark:bg-violet-900/30 p-2 rounded-lg mr-3">
                    <Calendar className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance analysis */}
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <LineChart className="h-5 w-5 text-violet-500 mr-2" />
            Performance Analysis
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-violet-700 dark:text-violet-400 mb-2">Strengths</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {studyPlan.performance.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2">Areas for Improvement</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {studyPlan.performance.weaknesses.map((weakness, index) => (
                  <li key={index}>{weakness}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recent performance summary */}
          <div className="bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-lg p-4 border border-violet-100 dark:border-violet-800/30 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-violet-800 dark:text-violet-300">Recent Test Score</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Based on last 5 tests</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-violet-700 dark:text-violet-400">{studyPlan.performance.recentScore}%</p>
                <p className="text-sm text-green-600 dark:text-green-400">+{studyPlan.performance.improvement}% improvement</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-end">
            <Button variant="outline">Download PDF</Button>
            <Button variant="outline">Share Plan</Button>
            <Button>Adjust Plan</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanDialog;
