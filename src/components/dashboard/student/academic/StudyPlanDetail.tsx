
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { StudyPlan } from '@/types/user/studyPlan';
import { Calendar, Clock, GraduationCap } from 'lucide-react';
import { format } from 'date-fns';

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
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'PPP');
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-indigo-600" />
            {plan.goal} Study Plan
          </DialogTitle>
          <DialogDescription>
            {plan.status === 'active' 
              ? 'Your current active study plan details' 
              : 'Completed study plan details'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
              <div className="flex items-center text-blue-700 dark:text-blue-400 mb-1">
                <Calendar className="h-4 w-4 mr-2" />
                <h3 className="font-medium">Exam Date</h3>
              </div>
              <p className="pl-6 text-blue-600 dark:text-blue-300">
                {plan.examDate ? formatDate(plan.examDate) : 'Not specified'}
              </p>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
              <div className="flex items-center text-green-700 dark:text-green-400 mb-1">
                <Clock className="h-4 w-4 mr-2" />
                <h3 className="font-medium">Study Time</h3>
              </div>
              <p className="pl-6 text-green-600 dark:text-green-300">
                {plan.studyHoursPerDay} hours/day, {plan.preferredStudyTime} time
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-3">Subjects</h3>
            <div className="space-y-4">
              {plan.subjects.map((subject) => (
                <div 
                  key={subject.id}
                  className="border rounded-md overflow-hidden"
                  style={{ borderLeft: `4px solid ${subject.color}` }}
                >
                  <div className="p-3 flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{subject.name}</h4>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                        <span>{subject.hoursPerWeek} hrs/week</span>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800">
                          {subject.proficiency === 'strong' 
                            ? 'Strong' 
                            : subject.proficiency === 'weak'
                            ? 'Needs Focus'
                            : 'Moderate'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span 
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          subject.priority === 'high'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                            : subject.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                            : 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                        }`}
                      >
                        {subject.priority.charAt(0).toUpperCase() + subject.priority.slice(1)} Priority
                      </span>
                    </div>
                  </div>
                  
                  {subject.topics && subject.topics.length > 0 && (
                    <div className="bg-gray-50 dark:bg-gray-900/40 p-3 border-t">
                      <h5 className="text-sm font-medium mb-2">Topics</h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {subject.topics.map((topic) => (
                          <div 
                            key={topic.id}
                            className="flex items-center justify-between text-sm p-2 bg-white dark:bg-gray-800/60 rounded border"
                          >
                            <span>{topic.name}</span>
                            <span 
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                topic.status === 'completed'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                                  : topic.status === 'in-progress'
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300'
                                  : topic.status === 'skipped'
                                  ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                                  : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                              }`}
                            >
                              {topic.status ? topic.status.replace('-', ' ') : 'pending'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Overall Progress</span>
              <span>{plan.progressPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500"
                style={{ width: `${plan.progressPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {plan.status === 'active' && (
            <Button>
              Update Plan
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StudyPlanDetail;
