
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useStudyProgress } from '@/hooks/useStudyProgress';
import { UserProfileType } from '@/types/user';
import StudyPlanHeader from '@/components/study-plan/StudyPlanHeader';
import StudyPlanFooter from '@/components/study-plan/StudyPlanFooter';
import StudyPlanOverview from '@/components/study-plan/StudyPlanOverview';
import StudyPlanSubjects from '@/components/study-plan/StudyPlanSubjects';
import StudyPlanSchedule from '@/components/study-plan/StudyPlanSchedule';

// Extended types to fix TypeScript errors
interface ExtendedSubjectProgress {
  id: string;
  name: string;
  progress: number;
  totalTopics: number;
  completedTopics: number;
  expectedMastery: string;
}

interface ExtendedStudyStreak {
  current: number;
  longest: number;
  lastUpdated: Date;
}

interface StudyPlanDialogProps {
  userProfile: UserProfileType;
  onClose: () => void;
}

const StudyPlanDialog = ({ userProfile, onClose }: StudyPlanDialogProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { subjects, studyStreak } = useStudyProgress();
  const [activeTab, setActiveTab] = useState('overview');

  // Extended study streak to fix TypeScript errors
  const extendedStreak: ExtendedStudyStreak = {
    current: studyStreak?.current || 7,
    longest: studyStreak?.longest || 14,
    lastUpdated: studyStreak?.lastUpdated || new Date()
  };

  // Add missing properties to subjects
  const extendedSubjects = subjects.map(subject => ({
    ...subject,
    totalTopics: 12, // Default value
    completedTopics: Math.floor(subject.progress / 100 * 12), // Calculated value
    expectedMastery: "April 2025", // Default value
  })) as ExtendedSubjectProgress[];

  const estimatedCompletionDate = new Date();
  estimatedCompletionDate.setMonth(estimatedCompletionDate.getMonth() + 3);
  
  const formattedCompletionDate = estimatedCompletionDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Default values for missing user profile properties
  const personalityType = userProfile.personalityType || "Strategic Thinker";
  const focusDuration = userProfile.focusDuration || "45 minutes with 15-minute breaks";
  const studyPreference = userProfile.studyPreference || "Visual learning with practical applications";
  
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800">
        <StudyPlanHeader 
          isEditing={isEditing} 
          setIsEditing={setIsEditing} 
          onClose={onClose} 
        />
        
        <div className="p-6">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <StudyPlanOverview 
                userProfile={userProfile}
                formattedCompletionDate={formattedCompletionDate}
                extendedStreak={extendedStreak}
                personalityType={personalityType}
                focusDuration={focusDuration}
                studyPreference={studyPreference}
              />
            </TabsContent>
            
            <TabsContent value="subjects">
              <StudyPlanSubjects 
                subjects={extendedSubjects} 
                isEditing={isEditing} 
              />
            </TabsContent>
            
            <TabsContent value="schedule">
              <StudyPlanSchedule isEditing={isEditing} />
            </TabsContent>
          </Tabs>
        </div>
        
        <StudyPlanFooter 
          isEditing={isEditing} 
          setIsEditing={setIsEditing} 
          onClose={onClose} 
        />
      </div>
    </div>
  );
};

export default StudyPlanDialog;
