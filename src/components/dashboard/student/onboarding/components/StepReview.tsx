
import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Calendar, Clock, GraduationCap, Gauge, Sunrise, Sun, Sunset, Moon } from "lucide-react";
import { format } from "date-fns";
import { Subject } from "@/types/user/studyPlan";

interface StepReviewProps {
  examDate: Date;
  studyHours: number;
  strongSubjects: Subject[];
  weakSubjects: Subject[];
  studyPace: "slow" | "moderate" | "fast";
  studyTime: "morning" | "afternoon" | "evening" | "night";
  examGoal: string;
}

const getStudyPaceLabel = (pace: string): string => {
  if (pace === "fast") return "Aggressive";
  if (pace === "moderate") return "Balanced";
  return "Relaxed";
};

const getStudyTimeIcon = (time: string) => {
  switch (time) {
    case "morning":
      return <Sunrise className="h-4 w-4 text-amber-500" />;
    case "afternoon":
      return <Sun className="h-4 w-4 text-orange-500" />;
    case "evening":
      return <Sunset className="h-4 w-4 text-indigo-500" />;
    case "night":
      return <Moon className="h-4 w-4 text-blue-500" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const StepReview: React.FC<StepReviewProps> = ({
  examDate,
  studyHours,
  strongSubjects,
  weakSubjects,
  studyPace,
  studyTime,
  examGoal
}) => {
  const capitalizedStudyTime = studyTime.charAt(0).toUpperCase() + studyTime.slice(1);
  
  return (
    <motion.div
      key="step-review"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <CheckCircle className="text-green-500" size={20} />
            Review Your Study Plan
          </h3>
          <p className="text-muted-foreground mb-4">
            Please review your personalized study plan for {examGoal}
          </p>
          
          <Card className="bg-primary/5 border-primary/20 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Exam Goal</h4>
                  <p className="text-lg font-medium">{examGoal}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Exam Date
                  </h4>
                  <p className="text-lg font-medium">
                    {examDate ? format(examDate, "MMMM d, yyyy") : "Not set"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {examDate
                      ? `${Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24))} days remaining`
                      : "Please set an exam date"}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Clock className="h-4 w-4" /> Daily Study Hours
                  </h4>
                  <p className="text-lg font-medium">{studyHours} hours</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <Gauge className="h-4 w-4" /> Study Pace
                  </h4>
                  <p className="text-lg font-medium">{getStudyPaceLabel(studyPace)}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    {getStudyTimeIcon(studyTime)} Preferred Study Time
                  </h4>
                  <p className="text-lg font-medium">{capitalizedStudyTime}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground flex items-center gap-1">
                    <GraduationCap className="h-4 w-4" /> Subject Count
                  </h4>
                  <p className="text-lg font-medium">
                    {strongSubjects.length + weakSubjects.length} subjects
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Subjects by Proficiency</h4>
              
              {strongSubjects.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm font-medium mb-1">Strong Subjects:</p>
                  <div className="flex flex-wrap gap-2">
                    {strongSubjects.map(subject => (
                      <Badge key={subject.key} variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        {subject.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {weakSubjects.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-1">Weak Subjects:</p>
                  <div className="flex flex-wrap gap-2">
                    {weakSubjects.map(subject => (
                      <Badge key={subject.key} variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                        {subject.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default StepReview;
