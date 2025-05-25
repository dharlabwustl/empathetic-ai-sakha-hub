
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StudentData } from "@/types/admin/studentData";

interface OnboardingDataViewerProps {
  studentData: StudentData;
}

const OnboardingDataViewer: React.FC<OnboardingDataViewerProps> = ({ studentData }) => {
  const onboardingData = studentData.onboardingData || {};

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Onboarding Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Role</label>
              <p className="text-sm">{onboardingData.role || 'Student'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Exam Goal</label>
              <p className="text-sm">{onboardingData.examGoal || studentData.examPrep || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Age</label>
              <p className="text-sm">{onboardingData.age || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Grade</label>
              <p className="text-sm">{onboardingData.grade || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Location</label>
              <p className="text-sm">{onboardingData.location || onboardingData.city || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Institute</label>
              <p className="text-sm">{onboardingData.institute || onboardingData.institution || 'Not specified'}</p>
            </div>
          </div>

          {onboardingData.personalityType && (
            <div>
              <label className="text-sm font-medium text-gray-600">Personality Type</label>
              <Badge variant="outline" className="ml-2">{onboardingData.personalityType}</Badge>
            </div>
          )}

          {onboardingData.mood && (
            <div>
              <label className="text-sm font-medium text-gray-600">Current Mood</label>
              <Badge variant="outline" className="ml-2">{onboardingData.mood}</Badge>
            </div>
          )}

          {onboardingData.learningStyle && (
            <div>
              <label className="text-sm font-medium text-gray-600">Learning Style</label>
              <Badge variant="outline" className="ml-2">{onboardingData.learningStyle}</Badge>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Daily Study Hours</label>
              <p className="text-sm">{onboardingData.dailyStudyHours || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Preferred Study Time</label>
              <p className="text-sm">{onboardingData.preferredStudyTime || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Study Pace</label>
              <p className="text-sm">{onboardingData.studyPace || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Study Environment</label>
              <p className="text-sm">{onboardingData.studyEnvironment || 'Not specified'}</p>
            </div>
          </div>

          {onboardingData.interests && onboardingData.interests.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-600">Interests</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {onboardingData.interests.map((interest: string, index: number) => (
                  <Badge key={index} variant="secondary">{interest}</Badge>
                ))}
              </div>
            </div>
          )}

          {onboardingData.weakSubjects && onboardingData.weakSubjects.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-600">Weak Subjects</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {onboardingData.weakSubjects.map((subject: string, index: number) => (
                  <Badge key={index} variant="destructive">{subject}</Badge>
                ))}
              </div>
            </div>
          )}

          {onboardingData.preferredSubjects && onboardingData.preferredSubjects.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-600">Preferred Subjects</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {onboardingData.preferredSubjects.map((subject: string, index: number) => (
                  <Badge key={index} variant="default">{subject}</Badge>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Sleep Schedule</label>
              <p className="text-sm">{onboardingData.sleepSchedule || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Focus Hours</label>
              <p className="text-sm">{onboardingData.focusHours || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Stress Management</label>
              <p className="text-sm">{onboardingData.stressManagement || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Break Routine</label>
              <p className="text-sm">{onboardingData.breakRoutine || 'Not specified'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingDataViewer;
