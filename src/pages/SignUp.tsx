
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { PersonalityType, UserRole, OnboardingData, MoodType } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { 
  Send, ArrowRight, User, Book, Briefcase, 
  Stethoscope, Rocket, Brain, Users, Calendar, 
  Clock, Target, Smile, Frown, Meh, Moon, Sun, 
  Check, ChevronRight, Sparkles
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import ChatMessage from "@/components/signup/ChatMessage";
import { examGoals } from "@/data/mockProfiles/index";

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
  const [onboardingProgress, setOnboardingProgress] = useState(0);

  // Update progress based on which step we're on
  useEffect(() => {
    // Calculate progress percentage based on completed steps
    let progress = 0;
    
    if (onboardingData.role) progress += 20;
    if (onboardingData.personalityType) progress += 20;
    if (onboardingData.mood) progress += 20;
    if (onboardingData.name) progress += 20;
    if (onboardingData.phoneNumber) progress += 20;
    
    setOnboardingProgress(progress);
  }, [onboardingData]);

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
      
      // Show success toast
      toast({
        title: "Success",
        description: "Account created successfully! Redirecting to dashboard...",
      });
      
      // Redirect after a delay
      setTimeout(() => {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl"
      >
        <Card className="shadow-2xl overflow-hidden bg-white/95 backdrop-blur rounded-2xl border-0">
          <CardHeader className="bg-gradient-to-br from-blue-600 to-indigo-800 text-white py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14 border-2 border-white/50 shadow-lg">
                  <AvatarImage src="/lovable-uploads/2a3b330c-09e1-40bd-b9bd-85ecb5cc394a.png" alt="Sakha AI" />
                  <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-blue-500">SA</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                    Sakha AI
                    <span className="bg-blue-400/20 text-xs font-normal px-2 py-1 rounded-full">Beta</span>
                  </h1>
                  <p className="text-blue-100 text-sm md:text-base">Your personalized learning companion</p>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="hidden md:flex items-center gap-2">
                <div className="w-32 h-2 bg-blue-900/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-300 to-indigo-300 rounded-full transition-all duration-500"
                    style={{ width: `${onboardingProgress}%` }}
                  ></div>
                </div>
                <span className="text-xs text-blue-100">{onboardingProgress}%</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="h-[500px] overflow-y-auto p-6 bg-gradient-to-b from-blue-50 to-indigo-50" id="chat-container">
              {messages.map((msg, index) => (
                <ChatMessage key={index} type={msg.type} content={msg.content} />
              ))}

              {/* Role Selection Options */}
              {showRoleOptions && (
                <motion.div 
                  className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <Button 
                    onClick={() => handleRoleSelection("Student")}
                    className="flex justify-start gap-3 p-4 h-auto bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 shadow-md group transform transition-all hover:-translate-y-1"
                  >
                    <div className="p-2 bg-white/20 rounded-lg">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Student</div>
                      <div className="text-xs text-blue-100">For exam preparation & academic support</div>
                    </div>
                  </Button>
                  
                  <Button 
                    onClick={() => handleRoleSelection("Employee")}
                    className="flex justify-start gap-3 p-4 h-auto bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white border-0 shadow-md group transform transition-all hover:-translate-y-1"
                  >
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Briefcase className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Employee</div>
                      <div className="text-xs text-indigo-100">For career growth & skill development</div>
                    </div>
                  </Button>
                  
                  <Button 
                    onClick={() => handleRoleSelection("Doctor")}
                    className="flex justify-start gap-3 p-4 h-auto bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white border-0 shadow-md group transform transition-all hover:-translate-y-1"
                  >
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Stethoscope className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Doctor / Research Scholar</div>
                      <div className="text-xs text-purple-100">For research & medical expertise</div>
                    </div>
                  </Button>
                  
                  <Button 
                    onClick={() => handleRoleSelection("Founder")}
                    className="flex justify-start gap-3 p-4 h-auto bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white border-0 shadow-md group transform transition-all hover:-translate-y-1"
                  >
                    <div className="p-2 bg-white/20 rounded-lg">
                      <Rocket className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">Founder</div>
                      <div className="text-xs text-pink-100">For startup guidance & growth</div>
                    </div>
                  </Button>
                </motion.div>
              )}

              {/* Student Age Input */}
              {showStudentAgeInput && (
                <motion.div 
                  className="animate-fade-in space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Input
                        type="number"
                        placeholder="Enter your age"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        min={13}
                        className="bg-white/80"
                      />
                    </div>
                    <Button onClick={handleStudentAgeSubmit} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Grade Options */}
              {showGradeOptions && (
                <motion.div
                  className="animate-fade-in my-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {grades.map((grade) => (
                      <Button
                        key={grade}
                        variant="outline"
                        onClick={() => handleGradeSelection(grade)}
                        className="bg-white/80 hover:bg-blue-50 border-blue-100"
                      >
                        {grade}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Location Input */}
              {showLocationInput && (
                <motion.div 
                  className="animate-fade-in space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Input
                        type="text"
                        placeholder="Enter your city/country"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="bg-white/80"
                      />
                    </div>
                    <Button onClick={handleLocationSubmit} size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
              
              {/* Exam Goal Options */}
              {showExamGoalOptions && (
                <motion.div
                  className="animate-fade-in my-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="grid grid-cols-2 gap-2">
                    {examGoals.map((examGoal) => (
                      <Button
                        key={examGoal}
                        variant="outline"
                        onClick={() => handleExamGoalSelection(examGoal)}
                        className="bg-white/80 hover:bg-blue-50 border-blue-100"
                      >
                        {examGoal}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Reference to the end of messages for auto-scroll */}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          <CardFooter className="border-t border-gray-100 p-4">
            <div className="flex w-full gap-2 items-center">
              <Input
                placeholder="Type a message..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={!(
                  showStudentAgeInput || 
                  showLocationInput || 
                  showJobTitleInput || 
                  showIndustryInput || 
                  showSkillsInput || 
                  showSpecializationInput || 
                  showInstitutionInput || 
                  showResearchTopicInput || 
                  showTeamSizeInput || 
                  showStartupIndustryInput ||
                  showSleepScheduleInput ||
                  showFocusHoursInput ||
                  showStressInput ||
                  showBreakInput ||
                  showNameInput ||
                  showPhoneInput
                )}
                className="bg-white"
              />
              <Button 
                size="icon" 
                disabled={!(
                  showStudentAgeInput || 
                  showLocationInput || 
                  showJobTitleInput || 
                  showIndustryInput || 
                  showSkillsInput || 
                  showSpecializationInput || 
                  showInstitutionInput || 
                  showResearchTopicInput || 
                  showTeamSizeInput || 
                  showStartupIndustryInput ||
                  showSleepScheduleInput ||
                  showFocusHoursInput ||
                  showStressInput ||
                  showBreakInput ||
                  showNameInput ||
                  showPhoneInput
                )}
                onClick={() => {
                  if (showStudentAgeInput) handleStudentAgeSubmit();
                  else if (showLocationInput) handleLocationSubmit();
                  else if (showJobTitleInput) handleJobTitleSubmit();
                  else if (showIndustryInput) handleIndustrySubmit();
                  else if (showSkillsInput) handleSkillsSubmit();
                  else if (showSpecializationInput) handleSpecializationSubmit();
                  else if (showInstitutionInput) handleInstitutionSubmit();
                  else if (showResearchTopicInput) handleResearchTopicSubmit();
                  else if (showTeamSizeInput) handleTeamSizeSubmit();
                  else if (showStartupIndustryInput) handleStartupIndustrySubmit();
                  else if (showSleepScheduleInput) handleSleepScheduleSubmit();
                  else if (showFocusHoursInput) handleFocusHoursSubmit();
                  else if (showStressInput) handleStressManagementSubmit();
                  else if (showBreakInput) handleBreakRoutineSubmit();
                  else if (showNameInput) handleNameSubmit();
                  else if (showPhoneInput) handlePhoneSubmit();
                }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUp;
