
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarClock, Clock, BookOpen, FastForward, Sunrise, Sun, Sunset, Moon } from "lucide-react";
import { format } from "date-fns";

interface ReviewStepProps {
  studyPlanData: {
    examGoal: string;
    examDate?: string;
    daysLeft?: number;
    studyHoursPerDay: number;
    strongSubjects: string[];
    weakSubjects: string[];
    studyPace: 'slow' | 'moderate' | 'fast';
    preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  };
}

const ReviewStep: React.FC<ReviewStepProps> = ({ studyPlanData }) => {
  const getTimeIcon = () => {
    switch (studyPlanData.preferredStudyTime) {
      case 'morning': return <Sunrise className="w-5 h-5 text-amber-500" />;
      case 'afternoon': return <Sun className="w-5 h-5 text-orange-500" />;
      case 'evening': return <Sunset className="w-5 h-5 text-indigo-500" />;
      case 'night': return <Moon className="w-5 h-5 text-blue-500" />;
      default: return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPaceLabel = () => {
    switch (studyPlanData.studyPace) {
      case 'fast': return 'Fast';
      case 'moderate': return 'Moderate';
      case 'slow': return 'Relaxed';
      default: return 'Moderate';
    }
  };

  const getTimeLabel = () => {
    switch (studyPlanData.preferredStudyTime) {
      case 'morning': return 'Morning (6 AM - 11 AM)';
      case 'afternoon': return 'Afternoon (12 PM - 4 PM)';
      case 'evening': return 'Evening (5 PM - 8 PM)';
      case 'night': return 'Night (9 PM - 12 AM)';
      default: return 'Evening';
    }
  };

  return (
    <motion.div
      key="step6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Review Your Study Plan</h3>
        <p className="text-muted-foreground">
          We'll create a personalized study plan based on these preferences
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CalendarClock className="w-4 h-4" />
                <span>Exam Details</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Goal</p>
                  <p className="font-medium">{studyPlanData.examGoal}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Exam Date</p>
                  <p className="font-medium">
                    {studyPlanData.examDate 
                      ? format(new Date(studyPlanData.examDate), "PPP") 
                      : "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Days Remaining</p>
                  <p className="font-medium">{studyPlanData.daysLeft || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Study Schedule</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Daily Hours</p>
                  <p className="font-medium">{studyPlanData.studyHoursPerDay} hours</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Study Pace</p>
                  <div className="flex items-center gap-1.5">
                    <FastForward className="w-4 h-4 text-amber-500" />
                    <p className="font-medium">{getPaceLabel()}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Preferred Time</p>
                  <div className="flex items-center gap-1.5">
                    {getTimeIcon()}
                    <p className="font-medium">{getTimeLabel()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                <span>Subjects</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1.5">Strong Subjects</p>
                  {studyPlanData.strongSubjects.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {studyPlanData.strongSubjects.map(subject => (
                        <span key={subject} className="bg-green-100 text-green-800 text-xs px-2.5 py-1 rounded-full">
                          {subject}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm italic text-muted-foreground">None selected</p>
                  )}
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1.5">Subjects Needing Work</p>
                  {studyPlanData.weakSubjects.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {studyPlanData.weakSubjects.map(subject => (
                        <span key={subject} className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full">
                          {subject}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm italic text-muted-foreground">None selected</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewStep;
