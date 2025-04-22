
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getSubjectsForGoal } from '../SubjectData';

interface Subject {
  name: string;
  key: string;
  group?: string;
}

export const useOnboardingForm = (examGoal: string, onComplete: () => void) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(0);
  const [examDate, setExamDate] = useState<Date | undefined>(undefined);
  const [studyHours, setStudyHours] = useState<number>(4);
  const [allSubjects, setAllSubjects] = useState<Subject[]>([]);
  const [strongSubjects, setStrongSubjects] = useState<Subject[]>([]);
  const [weakSubjects, setWeakSubjects] = useState<Subject[]>([]);
  const [studyPace, setStudyPace] = useState<'slow' | 'moderate' | 'fast'>('moderate');
  const [studyTime, setStudyTime] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('evening');
  const [loading, setLoading] = useState(true);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [savingStudyPlan, setSavingStudyPlan] = useState(false);
  const [stepComplete, setStepComplete] = useState(false);

  // Initialize subjects based on exam goal
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        // Get subjects for the selected exam goal
        const subjects = getSubjectsForGoal(examGoal);
        setAllSubjects(subjects);

        // Check if we have userData from signup with subject preferences
        const userData = localStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          
          if (parsedData.studyPlan) {
            const { 
              examDate: storedExamDate, 
              studyHoursPerDay, 
              strongSubjects: storedStrong, 
              weakSubjects: storedWeak, 
              studyPace: storedPace, 
              preferredStudyTime 
            } = parsedData.studyPlan;
            
            // Set exam date if available
            if (storedExamDate) {
              setExamDate(new Date(storedExamDate));
            }
            
            // Set study hours if available
            if (studyHoursPerDay) {
              setStudyHours(studyHoursPerDay);
            }
            
            // Set study pace if available
            if (storedPace) {
              setStudyPace(storedPace as 'slow' | 'moderate' | 'fast');
            }
            
            // Set preferred study time if available
            if (preferredStudyTime) {
              setStudyTime(preferredStudyTime as 'morning' | 'afternoon' | 'evening' | 'night');
            }
            
            // Set strong and weak subjects if available
            if (storedStrong && storedStrong.length > 0) {
              const strongSubjectsFromData = subjects.filter(s => 
                storedStrong.includes(s.name)
              );
              setStrongSubjects(strongSubjectsFromData);
            }
            
            if (storedWeak && storedWeak.length > 0) {
              const weakSubjectsFromData = subjects.filter(s => 
                storedWeak.includes(s.name)
              );
              setWeakSubjects(weakSubjectsFromData);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
        toast({
          title: "Error",
          description: "Failed to load subjects. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [examGoal, toast]);

  // Check if current step is complete
  useEffect(() => {
    const checkStepComplete = () => {
      switch (currentStep) {
        case 0: // Exam date step
          return examDate !== undefined;
        case 1: // Study hours step
          return studyHours > 0;
        case 2: // Subjects step
          return strongSubjects.length > 0 || weakSubjects.length > 0;
        case 3: // Study pace step
          return !!studyPace;
        case 4: // Study time step
          return !!studyTime;
        case 5: // Review step
          return true;
        default:
          return false;
      }
    };
    
    setStepComplete(checkStepComplete());
  }, [currentStep, examDate, studyHours, strongSubjects, weakSubjects, studyPace, studyTime]);

  const handleToggleSubject = (subject: Subject, type: 'strong' | 'weak') => {
    if (type === 'strong') {
      // Add to strong, remove from weak if present
      if (strongSubjects.some(s => s.key === subject.key)) {
        setStrongSubjects(strongSubjects.filter(s => s.key !== subject.key));
      } else {
        setStrongSubjects([...strongSubjects, subject]);
        setWeakSubjects(weakSubjects.filter(s => s.key !== subject.key));
      }
    } else {
      // Add to weak, remove from strong if present
      if (weakSubjects.some(s => s.key === subject.key)) {
        setWeakSubjects(weakSubjects.filter(s => s.key !== subject.key));
      } else {
        setWeakSubjects([...weakSubjects, subject]);
        setStrongSubjects(strongSubjects.filter(s => s.key !== subject.key));
      }
    }
  };

  const handleNext = async () => {
    // Last step - submit the study plan
    if (currentStep === 5) {
      setSavingStudyPlan(true);
      
      try {
        // Create study plan data
        const studyPlanData = {
          examGoal,
          examDate: examDate?.toISOString(),
          daysLeft: examDate 
            ? Math.ceil((examDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)) 
            : 180,
          studyHoursPerDay: studyHours,
          subjects: [...strongSubjects, ...weakSubjects].map(s => s.name),
          strongSubjects: strongSubjects.map(s => s.name),
          weakSubjects: weakSubjects.map(s => s.name),
          studyPace,
          preferredStudyTime: studyTime
        };
        
        console.log("Saving study plan data:", studyPlanData);
        
        // In a real app, this would be an API call to save the study plan
        // await studyPlanService.createStudyPlan(studyPlanData);
        
        // Save to localStorage for now
        const userData = localStorage.getItem("userData");
        if (userData) {
          const parsedData = JSON.parse(userData);
          localStorage.setItem("userData", JSON.stringify({
            ...parsedData,
            studyPlan: studyPlanData,
            completedOnboarding: true
          }));
        } else {
          localStorage.setItem("userData", JSON.stringify({
            studyPlan: studyPlanData,
            completedOnboarding: true
          }));
        }
        
        // Show success animation
        setShowSuccessCard(true);
        
        // Wait 2 seconds and then complete the onboarding process
        setTimeout(() => {
          onComplete();
        }, 2000);
        
      } catch (error) {
        console.error("Error saving study plan:", error);
        toast({
          title: "Error",
          description: "Failed to save your study plan. Please try again.",
          variant: "destructive"
        });
      } finally {
        setSavingStudyPlan(false);
      }
    } else {
      // Just go to the next step
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return {
    currentStep,
    stepComplete,
    loading,
    showSuccessCard,
    savingStudyPlan,
    examDate,
    studyHours,
    strongSubjects,
    weakSubjects,
    allSubjects,
    studyPace,
    studyTime,
    setExamDate,
    setStudyHours,
    setStudyPace,
    setStudyTime,
    handleNext,
    handlePrevious,
    handleToggleSubject
  };
};
