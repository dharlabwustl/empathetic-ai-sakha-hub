
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { StudyPlan } from "@/types/user/studyPlan";
import { UserProfileBase } from "@/types/user/base";
import CreateStudyPlanWizard from "@/components/dashboard/student/academic/CreateStudyPlanWizard";
import StudyPlanSections from "@/components/dashboard/student/academic/components/StudyPlanSections";
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

interface AcademicAdvisorViewProps {
  userProfile: UserProfileBase;
}

const AcademicAdvisorView: React.FC<AcademicAdvisorViewProps> = ({ userProfile }) => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [activePlans, setActivePlans] = useState<StudyPlan[]>([]);
  const [completedPlans, setCompletedPlans] = useState<StudyPlan[]>([]);
  
  // Load plans from localStorage or initialize with signup plan on component mount
  useEffect(() => {
    const loadPlans = () => {
      try {
        // Try to get plans from localStorage
        const savedActivePlans = localStorage.getItem('active_study_plans');
        const savedCompletedPlans = localStorage.getItem('completed_study_plans');
        
        let active = savedActivePlans ? JSON.parse(savedActivePlans) : [];
        let completed = savedCompletedPlans ? JSON.parse(savedCompletedPlans) : [];
        
        // If there are no active plans or this is a new user, generate a signup plan
        if (active.length === 0) {
          const signupPlan = generateSignupStudyPlan(userProfile);
          active = [signupPlan];
          
          // Save to localStorage
          localStorage.setItem('active_study_plans', JSON.stringify(active));
        }
        
        setActivePlans(active);
        setCompletedPlans(completed);
      } catch (error) {
        console.error('Error loading study plans:', error);
        // If error loading, at least generate a signup plan
        const signupPlan = generateSignupStudyPlan(userProfile);
        setActivePlans([signupPlan]);
      }
    };
    
    loadPlans();
  }, [userProfile]);
  
  // Function to generate a study plan based on user's signup data
  const generateSignupStudyPlan = (user: UserProfileBase): StudyPlan => {
    // Get exam goal from user profile
    const examGoal = user.goals?.[0]?.title || 'NEET';
    
    // Set exam date to 3 months from now
    const examDate = new Date();
    examDate.setMonth(examDate.getMonth() + 3);
    
    // Create a study plan based on the user's exam goal
    const studyPlan: StudyPlan = {
      id: `signup-plan-${Date.now()}`,
      title: `${examGoal} Preparation Plan`,
      examGoal: examGoal,
      description: `Auto-generated study plan for ${examGoal}`,
      examDate: examDate.toISOString(),
      status: 'active',
      progress: 0,
      subjects: getDefaultSubjectsForExam(examGoal),
      studyHoursPerDay: 4,
      preferredStudyTime: 'evening',
      learningPace: 'moderate',
      createdAt: new Date().toISOString(),
    };
    
    return studyPlan;
  };
  
  // Get default subjects based on exam type
  const getDefaultSubjectsForExam = (examGoal: string) => {
    // Default subjects for common exams in India
    switch (examGoal) {
      case 'NEET':
        return [
          {
            id: 'subj-physics-neet',
            name: 'Physics',
            difficulty: 'medium',
            completed: false,
            priority: 'high',
            hoursPerWeek: 6,
            color: 'blue'
          },
          {
            id: 'subj-chemistry-neet',
            name: 'Chemistry',
            difficulty: 'medium',
            completed: false,
            priority: 'high',
            hoursPerWeek: 6,
            color: 'green'
          },
          {
            id: 'subj-biology-neet',
            name: 'Biology',
            difficulty: 'medium',
            completed: false,
            priority: 'high',
            hoursPerWeek: 8,
            color: 'red'
          }
        ];
      case 'JEE':
      case 'JEE Main':
      case 'JEE Advanced':
        return [
          {
            id: 'subj-physics-jee',
            name: 'Physics',
            difficulty: 'medium',
            completed: false,
            priority: 'high',
            hoursPerWeek: 8,
            color: 'blue'
          },
          {
            id: 'subj-chemistry-jee',
            name: 'Chemistry',
            difficulty: 'medium',
            completed: false,
            priority: 'medium',
            hoursPerWeek: 6,
            color: 'green'
          },
          {
            id: 'subj-mathematics-jee',
            name: 'Mathematics',
            difficulty: 'medium',
            completed: false,
            priority: 'high',
            hoursPerWeek: 10,
            color: 'purple'
          }
        ];
      case 'UPSC':
        return [
          {
            id: 'subj-gs-upsc',
            name: 'General Studies',
            difficulty: 'medium',
            completed: false,
            priority: 'high',
            hoursPerWeek: 10,
            color: 'blue'
          },
          {
            id: 'subj-essay-upsc',
            name: 'Essay',
            difficulty: 'medium',
            completed: false,
            priority: 'medium',
            hoursPerWeek: 4,
            color: 'yellow'
          },
          {
            id: 'subj-optional-upsc',
            name: 'Optional Subject',
            difficulty: 'medium',
            completed: false,
            priority: 'high',
            hoursPerWeek: 8,
            color: 'purple'
          }
        ];
      default:
        return [
          {
            id: 'subj-1',
            name: 'Subject 1',
            difficulty: 'medium',
            completed: false,
            priority: 'high',
            hoursPerWeek: 6,
            color: 'blue'
          },
          {
            id: 'subj-2',
            name: 'Subject 2',
            difficulty: 'medium',
            completed: false,
            priority: 'medium',
            hoursPerWeek: 6,
            color: 'green'
          },
          {
            id: 'subj-3',
            name: 'Subject 3',
            difficulty: 'medium',
            completed: false,
            priority: 'low',
            hoursPerWeek: 4,
            color: 'red'
          }
        ];
    }
  };
  
  const handleCreatePlanClick = () => {
    setShowCreateDialog(true);
  };

  const handleViewPlanDetails = (planId: string) => {
    setSelectedPlanId(planId);
    // In a real app, this would navigate to a detailed view or open a modal
    console.log(`Viewing plan details for ${planId}`);
  };

  const handleCreatePlan = (newPlanData: any) => {
    console.log("New study plan created:", newPlanData);
    
    // Create a new plan with the provided data
    const newPlan: StudyPlan = {
      id: `plan-${Date.now()}`,
      title: `${newPlanData.examGoal} Preparation`,
      description: `Study plan for ${newPlanData.examGoal} exam`,
      examGoal: newPlanData.examGoal,
      examDate: newPlanData.examDate,
      status: 'active',
      progress: 0,
      subjects: newPlanData.subjects.map((subject: any) => ({
        ...subject,
        priority: 'medium',
        color: getRandomColor()
      })),
      studyHoursPerDay: newPlanData.studyHoursPerDay,
      preferredStudyTime: newPlanData.preferredStudyTime,
      learningPace: newPlanData.learningPace,
      createdAt: new Date().toISOString(),
    };
    
    // Update the active plans list
    const updatedActivePlans = [...activePlans, newPlan];
    setActivePlans(updatedActivePlans);
    
    // Save to localStorage
    localStorage.setItem('active_study_plans', JSON.stringify(updatedActivePlans));
    
    setShowCreateDialog(false);
  };
  
  // Helper function to get random color
  const getRandomColor = () => {
    const colors = ['red', 'blue', 'green', 'purple', 'yellow', 'orange', 'indigo', 'pink'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <SharedPageLayout
      title="Academic Advisor"
      subtitle="Get personalized guidance for your academic journey"
    >
      <div className="space-y-8">
        {/* Overview Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Academic Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Current Goal</span>
                <span className="font-medium text-lg">{userProfile.goals?.[0]?.title || "NEET"}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Subjects</span>
                <span className="font-medium text-lg">
                  {activePlans.length > 0 
                    ? `${activePlans[0].subjects.length} Subjects` 
                    : "No subjects yet"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground text-sm">Progress</span>
                <span className="font-medium text-lg">
                  {activePlans.length > 0
                    ? `${activePlans[0].progress}% Complete`
                    : "0% Complete"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Study Plans Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Study Plans</h2>
            <Button onClick={handleCreatePlanClick} className="flex gap-1 items-center">
              <PlusCircle className="h-4 w-4 mr-1" />
              Create New Plan
            </Button>
          </div>

          <StudyPlanSections 
            activePlans={activePlans}
            completedPlans={completedPlans}
            onCreatePlan={handleCreatePlanClick}
            onViewPlanDetails={handleViewPlanDetails}
          />
        </div>

        {/* Create Study Plan Dialog */}
        <CreateStudyPlanWizard 
          isOpen={showCreateDialog}
          onClose={() => setShowCreateDialog(false)}
          onCreatePlan={handleCreatePlan}
          examGoal={userProfile.goals?.[0]?.title}
        />
      </div>
    </SharedPageLayout>
  );
};

export default AcademicAdvisorView;
