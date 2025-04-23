
import React, { useState } from 'react';
import { UserProfileType } from "@/types/user/base";
import ActionButtons from '@/components/dashboard/student/ActionButtons';
import ConceptCard from '@/components/dashboard/student/ConceptCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MoodLogButton from '@/components/dashboard/student/mood-tracking/MoodLogButton';

interface OverviewTabProps {
  userProfile: UserProfileType;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ userProfile }) => {
  const navigate = useNavigate();
  const [currentMood, setCurrentMood] = useState<'happy' | 'sad' | 'neutral' | 'motivated' | 'tired' | 'stressed' | 'focused' | 'curious' | 'overwhelmed' | 'okay' | undefined>(undefined);
  
  const handleMoodChange = (mood: 'happy' | 'sad' | 'neutral' | 'motivated' | 'tired' | 'stressed' | 'focused' | 'curious' | 'overwhelmed' | 'okay' | undefined) => {
    setCurrentMood(mood);
  };

  // Sample concept for demonstration
  const sampleConcept = {
    id: "concept-1",
    title: "Newton's Laws of Motion",
    description: "Learn about the three fundamental laws that form the foundation of classical mechanics.",
    subject: "Physics",
    difficulty: "medium" as 'easy' | 'medium' | 'hard' | 'advanced',
    completed: false,
    progress: 25,
    isLocked: false,
    isPremium: false
  };
  
  const handleToggleComplete = (id: string, completed: boolean) => {
    console.log(`Toggled concept ${id} to ${completed ? 'completed' : 'not completed'}`);
  };
  
  const handleViewConcept = (id: string) => {
    navigate(`/dashboard/student/concept/${id}`);
  };

  // Get exam info from profile
  const examInfo = userProfile.goals && userProfile.goals.length > 0
    ? {
        title: userProfile.goals[0].title,
        examDate: userProfile.goals[0].examDate || (userProfile.examPreparation && typeof userProfile.examPreparation !== 'string' ? userProfile.examPreparation.examDate : null) || ''
      }
    : { title: "Exam", examDate: "" };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <p className="text-muted-foreground mb-6">
        Welcome to your personalized learning dashboard. Here's your overview for today.
      </p>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-medium">Continue Learning</h3>
          <p className="text-sm text-muted-foreground">Pick up where you left off</p>
        </div>
        <MoodLogButton onMoodSelect={handleMoodChange} />
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <ConceptCard
          id={sampleConcept.id}
          title={sampleConcept.title}
          description={sampleConcept.description}
          subject={sampleConcept.subject}
          difficulty={sampleConcept.difficulty}
          completed={sampleConcept.completed}
          progress={sampleConcept.progress}
          isLocked={sampleConcept.isLocked}
          isPremium={sampleConcept.isPremium}
          onToggleComplete={handleToggleComplete}
          onView={handleViewConcept}
        />
      </div>
      
      <div className="mb-8">
        <Button 
          className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white"
          onClick={() => navigate('/dashboard/student/concepts')}
        >
          View All Concepts <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <ActionButtons 
        currentExam={examInfo.title}
        nextExamDate={examInfo.examDate || "April 30, 2025"} 
      />
    </div>
  );
};

export default OverviewTab;
