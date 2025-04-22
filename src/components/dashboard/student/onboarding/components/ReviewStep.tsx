
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CalendarCheck, 
  Clock, 
  BookOpen, 
  Star, 
  AlertTriangle, 
  Gauge,
  Calendar
} from "lucide-react";

interface ReviewStepProps {
  studyPlanData: {
    examGoal: string;
    examDate: string;
    daysLeft: number;
    studyHoursPerDay: number;
    strongSubjects: string[];
    weakSubjects: string[];
    studyPace: 'slow' | 'moderate' | 'fast';
    preferredStudyTime: 'morning' | 'afternoon' | 'evening' | 'night';
  };
}

const ReviewStep: React.FC<ReviewStepProps> = ({ studyPlanData }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Helper function for getting pace display
  const getPaceDisplay = (pace: string) => {
    switch (pace) {
      case 'slow': return 'Relaxed';
      case 'moderate': return 'Balanced';
      case 'fast': return 'Aggressive';
      default: return 'Balanced';
    }
  };

  // Helper function for getting time display
  const getTimeDisplay = (time: string) => {
    switch (time) {
      case 'morning': return 'Morning (5 AM - 12 PM)';
      case 'afternoon': return 'Afternoon (12 PM - 5 PM)';
      case 'evening': return 'Evening (5 PM - 10 PM)';
      case 'night': return 'Night (10 PM - 5 AM)';
      default: return 'Not specified';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Review Your Study Plan</h2>
        <p className="text-muted-foreground">
          Please review your personalized study plan details below. Click "Create My Plan" when you're ready.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Exam Goal and Date */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <CalendarCheck className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Exam Target</h3>
                <div className="flex flex-col mt-1">
                  <span className="text-lg font-bold">{studyPlanData.examGoal}</span>
                  <span className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <Calendar className="h-3.5 w-3.5" /> 
                    {formatDate(studyPlanData.examDate)}
                    <Badge variant="secondary" className="ml-1">
                      {studyPlanData.daysLeft} days left
                    </Badge>
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Daily Study Hours */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 rounded-full">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h3 className="font-medium">Daily Study Commitment</h3>
                <div className="mt-1">
                  <span className="text-lg font-bold">{studyPlanData.studyHoursPerDay} hours per day</span>
                  <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                    <Gauge className="h-3.5 w-3.5" /> 
                    <span>Study Pace: {getPaceDisplay(studyPlanData.studyPace)}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> 
                    <span>Preferred Time: {getTimeDisplay(studyPlanData.preferredStudyTime)}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Strong Subjects */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Star className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Strong Subjects</h3>
                {studyPlanData.strongSubjects.length > 0 ? (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {studyPlanData.strongSubjects.map(subject => (
                      <Badge key={subject} variant="secondary" className="bg-green-100 text-green-800 border-green-200">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">
                    No strong subjects selected
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weak Subjects */}
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Subjects to Improve</h3>
                {studyPlanData.weakSubjects.length > 0 ? (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {studyPlanData.weakSubjects.map(subject => (
                      <Badge key={subject} variant="secondary" className="bg-red-100 text-red-800 border-red-200">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">
                    No subjects to improve selected
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-full">
            <BookOpen className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-blue-900">What happens next?</h3>
            <p className="text-sm text-blue-700 mt-1">
              Based on your inputs, we'll generate a personalized study plan that includes:
            </p>
            <ul className="list-disc list-inside text-sm text-blue-700 mt-2 space-y-1">
              <li>Daily and weekly study schedules</li>
              <li>Concept cards tailored to your strong and weak areas</li>
              <li>Practice tests to track your progress</li>
              <li>Adaptive quizzes that get smarter as you learn</li>
              <li>Personalized recommendations for better results</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
