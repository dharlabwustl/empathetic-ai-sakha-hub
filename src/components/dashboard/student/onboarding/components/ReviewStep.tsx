
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { CheckCircle2, Calendar, Clock, BookOpen, Gauge, AlarmClock } from "lucide-react";

interface StudyPlanData {
  examGoal: string;
  examDate: string;
  daysLeft: number;
  studyHoursPerDay: number;
  strongSubjects: string[];
  weakSubjects: string[];
  studyPace: 'slow' | 'moderate' | 'fast';
  preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
}

interface ReviewStepProps {
  studyPlanData: StudyPlanData;
}

const ReviewStep = ({ studyPlanData }: ReviewStepProps) => {
  const {
    examGoal,
    examDate,
    daysLeft,
    studyHoursPerDay,
    strongSubjects,
    weakSubjects,
    studyPace,
    preferredStudyTime
  } = studyPlanData;

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "PPP");
    } catch (error) {
      return "Invalid date";
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
        <div>
          <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
            <CheckCircle2 className="text-green-500" size={20} />
            Review Your Study Plan
          </h3>
          <p className="text-muted-foreground mb-4">Here's a summary of your personalized study plan</p>
          
          <Card className="bg-gray-50 border-gray-200">
            <CardContent className="pt-6">
              <dl className="space-y-4">
                <div className="flex items-start">
                  <dt className="w-1/3 font-medium flex items-center">
                    <Calendar size={16} className="mr-2 text-purple-600" />
                    Exam Goal:
                  </dt>
                  <dd className="w-2/3">{examGoal}</dd>
                </div>
                
                <div className="flex items-start">
                  <dt className="w-1/3 font-medium flex items-center">
                    <Calendar size={16} className="mr-2 text-purple-600" />
                    Exam Date:
                  </dt>
                  <dd className="w-2/3">
                    {formatDate(examDate)}
                    <p className="text-sm text-muted-foreground">({daysLeft} days remaining)</p>
                  </dd>
                </div>
                
                <div className="flex items-start">
                  <dt className="w-1/3 font-medium flex items-center">
                    <Clock size={16} className="mr-2 text-purple-600" />
                    Study Hours:
                  </dt>
                  <dd className="w-2/3">{studyHoursPerDay} hours per day</dd>
                </div>
                
                <div className="flex items-start">
                  <dt className="w-1/3 font-medium flex items-center">
                    <BookOpen size={16} className="mr-2 text-purple-600" />
                    Strong Subjects:
                  </dt>
                  <dd className="w-2/3">
                    {strongSubjects.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {strongSubjects.map(subject => (
                          <li key={subject}>{subject}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-muted-foreground">None selected</span>
                    )}
                  </dd>
                </div>
                
                <div className="flex items-start">
                  <dt className="w-1/3 font-medium flex items-center">
                    <BookOpen size={16} className="mr-2 text-purple-600" />
                    Weak Subjects:
                  </dt>
                  <dd className="w-2/3">
                    {weakSubjects.length > 0 ? (
                      <ul className="list-disc list-inside">
                        {weakSubjects.map(subject => (
                          <li key={subject}>{subject}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-muted-foreground">None selected</span>
                    )}
                  </dd>
                </div>
                
                <div className="flex items-start">
                  <dt className="w-1/3 font-medium flex items-center">
                    <Gauge size={16} className="mr-2 text-purple-600" />
                    Study Pace:
                  </dt>
                  <dd className="w-2/3 capitalize">{studyPace}</dd>
                </div>
                
                <div className="flex items-start">
                  <dt className="w-1/3 font-medium flex items-center">
                    <AlarmClock size={16} className="mr-2 text-purple-600" />
                    Preferred Time:
                  </dt>
                  <dd className="w-2/3 capitalize">{preferredStudyTime}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
          
          <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-md">
            <p className="text-sm text-green-700 flex items-start">
              <CheckCircle2 size={16} className="mr-2 mt-0.5 flex-shrink-0 text-green-600" />
              <span>Your personalized study plan is ready to be generated. Click the button below to create your plan and start your learning journey!</span>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewStep;
