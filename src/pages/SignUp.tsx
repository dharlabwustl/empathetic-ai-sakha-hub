import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ExamGoal, PersonalityType, UserRole, OnboardingData, MoodType } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Send, ArrowRight, User, Book, Briefcase, 
  Stethoscope, Rocket, Brain, Users, Calendar, 
  Clock, Target, Smile, Frown, Meh
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import ChatMessage from "@/components/signup/ChatMessage";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [messages, setMessages] = useState<{type: "bot" | "user", content: string}[]>([
    {
      type: "bot", 
      content: "Hi, I'm Sakha – your personal AI companion for learning, growth, and well-being. What best describes you?"
    }
  ]);
  
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    role: "Student",
  });

  const [showRoleOptions, setShowRoleOptions] = useState(true);
  const [showStudentAgeInput, setShowStudentAgeInput] = useState(false);
  const [showGradeOptions, setShowGradeOptions] = useState(false);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [showExamGoalOptions, setShowExamGoalOptions] = useState(false);
  const [showJobTitleInput, setShowJobTitleInput] = useState(false);
  const [showExperienceOptions, setShowExperienceOptions] = useState(false);
  const [showIndustryInput, setShowIndustryInput] = useState(false);
  const [showSkillsInput, setShowSkillsInput] = useState(false);
  const [showSpecializationInput, setShowSpecializationInput] = useState(false);
  const [showInstitutionInput, setShowInstitutionInput] = useState(false);
  const [showResearchTopicInput, setShowResearchTopicInput] = useState(false);
  const [showStartupStageOptions, setShowStartupStageOptions] = useState(false);
  const [showTeamSizeInput, setShowTeamSizeInput] = useState(false);
  const [showStartupIndustryInput, setShowStartupIndustryInput] = useState(false);
  const [showStartupGoalOptions, setShowStartupGoalOptions] = useState(false);
  const [showPersonalityTest, setShowPersonalityTest] = useState(false);
  const [showMoodOptions, setShowMoodOptions] = useState(false);
  const [showSleepScheduleInput, setShowSleepScheduleInput] = useState(false);
  const [showFocusHoursInput, setShowFocusHoursInput] = useState(false);
  const [showStressInput, setShowStressInput] = useState(false);
  const [showBreakInput, setShowBreakInput] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [userInput, setUserInput] = useState("");

  const handleRoleSelection = (role: UserRole) => {
    setOnboardingData(prev => ({ ...prev, role }));
    setShowRoleOptions(false);
    
    // Add user selection to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: role 
    }]);
    
    // Bot follow-up based on role
    setTimeout(() => {
      if (role === "Student") {
        setMessages(prev => [...prev, { 
          type: "bot", 
          content: "Great! What's your age?" 
        }]);
        setShowStudentAgeInput(true);
      } else if (role === "Employee") {
        setMessages(prev => [...prev, { 
          type: "bot", 
          content: "What's your job title?" 
        }]);
        setShowJobTitleInput(true);
      } else if (role === "Doctor") {
        setMessages(prev => [...prev, { 
          type: "bot", 
          content: "What is your specialization?" 
        }]);
        setShowSpecializationInput(true);
      } else if (role === "Founder") {
        setMessages(prev => [...prev, { 
          type: "bot", 
          content: "What stage is your startup in?" 
        }]);
        setShowStartupStageOptions(true);
      }
    }, 500);
  };

  const handleStudentAgeSubmit = () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter your age",
        variant: "destructive",
      });
      return;
    }
    
    setOnboardingData(prev => ({ ...prev, age: parseInt(userInput) }));
    setShowStudentAgeInput(false);
    
    // Add user input to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: userInput 
    }]);
    
    setUserInput("");
    
    // Bot follow-up
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "What class/grade are you in?" 
      }]);
      setShowGradeOptions(true);
    }, 500);
  };

  const handleGradeSelection = (grade: string) => {
    setOnboardingData(prev => ({ ...prev, grade }));
    setShowGradeOptions(false);
    
    // Add user selection to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: grade 
    }]);
    
    // Bot follow-up
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "Where are you located?" 
      }]);
      setShowLocationInput(true);
    }, 500);
  };

  const handleLocationSubmit = () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter your location",
        variant: "destructive",
      });
      return;
    }
    
    setOnboardingData(prev => ({ ...prev, location: userInput }));
    setShowLocationInput(false);
    
    // Add user input to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: userInput 
    }]);
    
    setUserInput("");
    
    // Bot follow-up
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "Are you preparing for any of these exams?" 
      }]);
      setShowExamGoalOptions(true);
    }, 500);
  };

  const handleExamGoalSelection = (examGoal: string) => {
    setOnboardingData(prev => ({ ...prev, examGoal }));
    setShowExamGoalOptions(false);
    
    // Add user selection to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: examGoal 
    }]);
    
    // Bot follow-up - Personality Test
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "Let's understand your working style to better guide you. Take this short quiz? Do you plan ahead or go with the flow?" 
      }]);
      setShowPersonalityTest(true);
    }, 500);
  };

  const handlePersonalitySelection = (personalityType: PersonalityType) => {
    setOnboardingData(prev => ({ ...prev, personalityType }));
    setShowPersonalityTest(false);
    
    // Add user selection to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: personalityType 
    }]);
    
    // Bot follow-up - Mood check
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "How are you feeling today?" 
      }]);
      setShowMoodOptions(true);
    }, 500);
  };

  const handleMoodSelection = (mood: MoodType) => {
    setOnboardingData(prev => ({ ...prev, mood }));
    setShowMoodOptions(false);
    
    // Add user selection to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: mood 
    }]);
    
    // Bot follow-up - Sleep schedule
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "Let's understand your routine. What time do you usually sleep/wake up?" 
      }]);
      setShowSleepScheduleInput(true);
    }, 500);
  };

  const handleSleepScheduleSubmit = () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter your sleep schedule",
        variant: "destructive",
      });
      return;
    }
    
    setOnboardingData(prev => ({ ...prev, sleepSchedule: userInput }));
    setShowSleepScheduleInput(false);
    
    // Add user input to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: userInput 
    }]);
    
    setUserInput("");
    
    // Bot follow-up - Focus hours
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "How many hours can you focus without a break?" 
      }]);
      setShowFocusHoursInput(true);
    }, 500);
  };

  const handleFocusHoursSubmit = () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter your focus hours",
        variant: "destructive",
      });
      return;
    }
    
    setOnboardingData(prev => ({ ...prev, focusHours: parseFloat(userInput) }));
    setShowFocusHoursInput(false);
    
    // Add user input to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: userInput + " hours" 
    }]);
    
    setUserInput("");
    
    // Bot follow-up - Stress management
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "How do you currently manage stress?" 
      }]);
      setShowStressInput(true);
    }, 500);
  };

  const handleStressManagementSubmit = () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter your stress management technique",
        variant: "destructive",
      });
      return;
    }
    
    setOnboardingData(prev => ({ ...prev, stressManagement: userInput }));
    setShowStressInput(false);
    
    // Add user input to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: userInput 
    }]);
    
    setUserInput("");
    
    // Bot follow-up - Break routine
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "Do you take regular breaks? How often?" 
      }]);
      setShowBreakInput(true);
    }, 500);
  };

  const handleBreakRoutineSubmit = () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter your break routine",
        variant: "destructive",
      });
      return;
    }
    
    setOnboardingData(prev => ({ ...prev, breakRoutine: userInput }));
    setShowBreakInput(false);
    
    // Add user input to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: userInput 
    }]);
    
    setUserInput("");
    
    // Bot follow-up - Name input
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "Your personalized Sakha dashboard is ready. Please enter your name to create your account!" 
      }]);
      setShowNameInput(true);
    }, 500);
  };

  const handleJobTitleSubmit = () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter your job title",
        variant: "destructive",
      });
      return;
    }
    
    setOnboardingData(prev => ({ ...prev, jobTitle: userInput }));
    setShowJobTitleInput(false);
    
    // Add user input to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: userInput 
    }]);
    
    setUserInput("");
    
    // Bot follow-up
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "What's your experience level?" 
      }]);
      setShowExperienceOptions(true);
    }, 500);
  };

  const handleExperienceSelection = (experience: string) => {
    setOnboardingData(prev => ({ ...prev, experience }));
    setShowExperienceOptions(false);
    
    // Add user selection to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: experience 
    }]);
    
    // Bot follow-up
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "What industry or domain do you work in?" 
      }]);
      setShowIndustryInput(true);
    }, 500);
  };

  const handleIndustrySubmit = () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter your industry",
        variant: "destructive",
      });
      return;
    }
    
    setOnboardingData(prev => ({ ...prev, industry: userInput }));
    setShowIndustryInput(false);
    
    // Add user input to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: userInput 
    }]);
    
    setUserInput("");
    
    // Bot follow-up
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "What skills do you want to grow?" 
      }]);
      setShowSkillsInput(true);
    }, 500);
  };

  const handleSkillsSubmit = () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter the skills you want to grow",
        variant: "destructive",
      });
      return;
    }
    
    setOnboardingData(prev => ({ ...prev, skills: userInput.split(',').map(skill => skill.trim()) }));
    setShowSkillsInput(false);
    
    // Add user input to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: userInput 
    }]);
    
    setUserInput("");
    
    // Continue with personality test
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "Let's understand your working style to better guide you. Take this short quiz? Do you plan ahead or go with the flow?" 
      }]);
      setShowPersonalityTest(true);
    }, 500);
  };

  const handleSpecializationSubmit = () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter your specialization",
        variant: "destructive",
      });
      return;
    }
    
    setOnboardingData(prev => ({ ...prev, specialization: userInput }));
    setShowSpecializationInput(false);
    
    // Add user input to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: userInput 
    }]);
    
    setUserInput("");
    
    // Bot follow-up
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "Which institution or hospital are you affiliated with?" 
      }]);
      setShowInstitutionInput(true);
    }, 500);
  };

  const handleInstitutionSubmit = () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter your institution",
        variant: "destructive",
      });
      return;
    }
    
    setOnboardingData(prev => ({ ...prev, institution: userInput }));
    setShowInstitutionInput(false);
    
    // Add user input to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: userInput 
    }]);
    
    setUserInput("");
    
    // Bot follow-up
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "What's your current research topic or clinical interest?" 
      }]);
      setShowResearchTopicInput(true);
    }, 500);
  };

  const handleResearchTopicSubmit = () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter your research topic",
        variant: "destructive",
      });
      return;
    }
    
    setOnboardingData(prev => ({ ...prev, researchTopic: userInput }));
    setShowResearchTopicInput(false);
    
    // Add user input to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: userInput 
    }]);
    
    setUserInput("");
    
    // Continue with personality test
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "Let's understand your working style to better guide you. Take this short quiz? Do you plan ahead or go with the flow?" 
      }]);
      setShowPersonalityTest(true);
    }, 500);
  };

  const handleStartupStageSelection = (startupStage: string) => {
    setOnboardingData(prev => ({ ...prev, startupStage }));
    setShowStartupStageOptions(false);
    
    // Add user selection to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: startupStage 
    }]);
    
    // Bot follow-up
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "How big is your team?" 
      }]);
      setShowTeamSizeInput(true);
    }, 500);
  };

  const handleTeamSizeSubmit = () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter your team size",
        variant: "destructive",
      });
      return;
    }
    
    setOnboardingData(prev => ({ ...prev, teamSize: parseInt(userInput) }));
    setShowTeamSizeInput(false);
    
    // Add user input to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: userInput 
    }]);
    
    setUserInput("");
    
    // Bot follow-up
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "What industry are you in?" 
      }]);
      setShowStartupIndustryInput(true);
    }, 500);
  };

  const handleStartupIndustrySubmit = () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter your startup industry",
        variant: "destructive",
      });
      return;
    }
    
    setOnboardingData(prev => ({ ...prev, industry: userInput }));
    setShowStartupIndustryInput(false);
    
    // Add user input to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: userInput 
    }]);
    
    setUserInput("");
    
    // Bot follow-up
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "What's your immediate goal?" 
      }]);
      setShowStartupGoalOptions(true);
    }, 500);
  };

  const handleStartupGoalSelection = (startupGoal: string) => {
    setOnboardingData(prev => ({ ...prev, startupGoal }));
    setShowStartupGoalOptions(false);
    
    // Add user selection to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: startupGoal 
    }]);
    
    // Continue with personality test
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "Let's understand your working style to better guide you. Take this short quiz? Do you plan ahead or go with the flow?" 
      }]);
      setShowPersonalityTest(true);
    }, 500);
  };

  const handleNameSubmit = () => {
    if (!userInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }
    
    setOnboardingData(prev => ({ ...prev, name: userInput }));
    setShowNameInput(false);
    
    // Add user input to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: userInput 
    }]);
    
    setUserInput("");
    
    // Bot follow-up
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "Great! Please enter your phone number for verification" 
      }]);
      setShowPhoneInput(true);
    }, 500);
  };

  const handlePhoneSubmit = () => {
    if (!userInput.trim() || !/^\d{10}$/.test(userInput)) {
      toast({
        title: "Error",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive",
      });
      return;
    }
    
    setOnboardingData(prev => ({ ...prev, phoneNumber: userInput }));
    setShowPhoneInput(false);
    
    // Add user input to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: userInput 
    }]);
    
    setUserInput("");
    
    // Bot final message
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "Fantastic! Your account has been created. We're now setting up your personalized dashboard..." 
      }]);
      
      // Redirect after a delay
      setTimeout(() => {
        toast({
          title: "Success",
          description: "Account created successfully! Redirecting to dashboard...",
        });
        
        // Only proceed to the onboarding flow for students
        if (onboardingData.role === "Student") {
          navigate("/dashboard/student");
        } else if (onboardingData.role === "Employee") {
          navigate("/dashboard/employee");
        } else if (onboardingData.role === "Doctor") {
          navigate("/dashboard/doctor");
        } else {
          navigate("/dashboard/founder");
        }
      }, 2000);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (showStudentAgeInput) {
        handleStudentAgeSubmit();
      } else if (showLocationInput) {
        handleLocationSubmit();
      } else if (showJobTitleInput) {
        handleJobTitleSubmit();
      } else if (showIndustryInput) {
        handleIndustrySubmit();
      } else if (showSkillsInput) {
        handleSkillsSubmit();
      } else if (showSpecializationInput) {
        handleSpecializationSubmit();
      } else if (showInstitutionInput) {
        handleInstitutionSubmit();
      } else if (showResearchTopicInput) {
        handleResearchTopicSubmit();
      } else if (showTeamSizeInput) {
        handleTeamSizeSubmit();
      } else if (showStartupIndustryInput) {
        handleStartupIndustrySubmit();
      } else if (showSleepScheduleInput) {
        handleSleepScheduleSubmit();
      } else if (showFocusHoursInput) {
        handleFocusHoursSubmit();
      } else if (showStressInput) {
        handleStressManagementSubmit();
      } else if (showBreakInput) {
        handleBreakRoutineSubmit();
      } else if (showNameInput) {
        handleNameSubmit();
      } else if (showPhoneInput) {
        handlePhoneSubmit();
      }
    }
  };

  const grades = [
    "10th Grade",
    "11th Grade",
    "12th Grade",
    "Undergraduate",
    "Postgraduate"
  ];

  const examGoals: string[] = [
    "IIT JEE",
    "NEET",
    "MBA",
    "CUET UG",
    "UPSC",
    "CLAT",
    "BANK PO"
  ];

  const experienceLevels = ["Intern", "Junior", "Mid", "Senior"];
  const startupStages = ["Idea", "Prototype", "Fundraising", "Growth"];
  const startupGoals = ["Launch MVP", "Raise funds", "Grow users", "Hire team"];
  const personalityTypes: PersonalityType[] = ["Strategic Thinker", "Empathetic Learner", "Creative Builder", "Analytical"];
  const moods: MoodType[] = ["Happy", "Okay", "Sad", "Focused", "Tired", "Overwhelmed", "Motivated"];

  // Auto-scroll chat to bottom when messages change
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-800 p-4">
      <Card className="w-full max-w-4xl shadow-xl overflow-hidden bg-white rounded-xl">
        <CardHeader className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-white/50">
              <AvatarImage src="/lovable-uploads/2a3b330c-09e1-40bd-b9bd-85ecb5cc394a.png" alt="Sakha AI" />
              <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-blue-500">SA</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Sakha AI</h1>
              <p className="text-blue-100">Your personalized learning companion</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="h-[450px] overflow-y-auto p-6 bg-slate-50" id="chat-container">
            {messages.map((msg, index) => (
              <ChatMessage key={index} type={msg.type} content={msg.content} />
            ))}

            {/* Role Selection Options */}
            {showRoleOptions && (
              <div className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in">
                <Button 
                  onClick={() => handleRoleSelection("Student")}
                  className="flex justify-start gap-2 p-4 h-auto bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 shadow-md"
                  variant="outline"
                >
                  <User className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Student</div>
                    <div className="text-xs text-gray-500">For exam preparation & academic support</div>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => handleRoleSelection("Employee")}
                  className="flex justify-start gap-2 p-4 h-auto bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 shadow-md"
                  variant="outline"
                >
                  <Briefcase className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Employee</div>
                    <div className="text-xs text-gray-500">For career growth & skill development</div>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => handleRoleSelection("Doctor")}
                  className="flex justify-start gap-2 p-4 h-auto bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 shadow-md"
                  variant="outline"
                >
                  <Stethoscope className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Doctor / Research Scholar</div>
                    <div className="text-xs text-gray-500">For research & medical expertise</div>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => handleRoleSelection("Founder")}
                  className="flex justify-start gap-2 p-4 h-auto bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 shadow-md"
                  variant="outline"
                >
                  <Rocket className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Founder</div>
                    <div className="text-xs text-gray-500">For startup guidance & growth</div>
                  </div>
                </Button>
              </div>
            )}

            {/* Student Age Input */}
            {showStudentAgeInput && (
              <div className="animate-fade-in">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your age"
                  type="number"
                  className="bg-white border-2 border-blue-100 focus:border-blue-400"
                />
                <Button 
                  onClick={handleStudentAgeSubmit} 
                  className="mt-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Continue
                </Button>
              </div>
            )}

            {/* Grade Selection Options */}
            {showGradeOptions && (
              <div className="my-4 grid grid-cols-1 gap-2 animate-fade-in">
                {grades.map((grade) => (
                  <Button 
                    key={grade}
                    onClick={() => handleGradeSelection(grade)}
                    className="bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 justify-start shadow-md"
                    variant="outline"
                  >
                    <Book className="h-4 w-4 mr-2" />
                    {grade}
                  </Button>
                ))}
              </div>
            )}

            {/* Location Input */}
            {showLocationInput && (
              <div className="animate-fade-in">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your location (city, country)"
                  className="bg-white border-2 border-blue-100 focus:border-blue-400"
                />
                <Button 
                  onClick={handleLocationSubmit} 
                  className="mt-2 w-full bg-gradient-to-r from-blue-500 to-indigo-600"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Continue
                </Button>
              </div>
            )}

            {/* Exam Goal Selection Options */}
            {showExamGoalOptions && (
              <div className="my-4 grid grid-cols-1 gap-2 animate-fade-in">
                {examGoals.map((goal) => (
                  <Button 
                    key={goal}
                    onClick={() => handleExamGoalSelection(goal)}
                    className="flex justify-between w-full bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 shadow-md"
                    variant="outline"
                  >
                    <div className="flex items-center">
                      <Book className="h-4 w-4 mr-2" />
                      {goal}
                    </div>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ))}
              </div>
            )}

            {/* Job Title Input */}
            {showJobTitleInput && (
              <div className
