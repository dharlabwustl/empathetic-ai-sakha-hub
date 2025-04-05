
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  Book, Briefcase, Stethoscope, Rocket, Send, Smile, Heart, Brain, 
  Mic, Check, ArrowRight, User, Lightbulb, Target, Building, Clock,
  BookOpen, Code, MapPin, Award, MessageSquare, X
} from "lucide-react";
import { PersonalityType, MoodType } from "@/types/user";

// Helper interface for onboarding
interface OnboardingData {
  role: string;
  personalInfo: {
    age?: string;
    grade?: string;
    location?: string;
    examPrep?: string;
    jobTitle?: string;
    experienceLevel?: string;
    industry?: string;
    skillsToGrow?: string[];
    specialization?: string;
    institution?: string;
    researchTopic?: string;
    clinicalInterest?: string;
    startupStage?: string;
    teamSize?: string;
    startupIndustry?: string;
    immediateGoal?: string;
  };
  personalityAnswers: {[key: string]: string};
  personalityType?: PersonalityType;
  mood?: MoodType;
  habits: {
    wakeupTime?: string;
    focusHours?: string;
    stressManagement?: string;
    breaksRoutine?: string;
  };
  interests: string[];
  goals: string[];
  personalDetails: {
    fullName: string;
    phoneNumber: string;
    otp: string;
  };
}

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [showPersonalityTest, setShowPersonalityTest] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showDashboardIntro, setShowDashboardIntro] = useState(false);
  
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    role: "",
    personalInfo: {},
    personalityAnswers: {},
    habits: {},
    interests: [],
    goals: [],
    personalDetails: {
      fullName: "",
      phoneNumber: "",
      otp: "",
    },
  });
  
  const [chatMessages, setChatMessages] = useState([
    { 
      type: "bot", 
      content: "Hi, I'm Sakha – your personal AI companion for learning, growth, and well-being. What best describes you?" 
    }
  ]);

  // Update progress bar based on current step
  useEffect(() => {
    const totalSteps = 7; // Total number of steps in onboarding
    setProgress((step / totalSteps) * 100);
  }, [step]);

  const addChatMessage = (message: string, type: "user" | "bot") => {
    setChatMessages(prev => [...prev, { type, content: message }]);
  };

  const addBotReply = (message: string, delay: number = 800) => {
    setTimeout(() => {
      addChatMessage(message, "bot");
    }, delay);
  };

  const handleRoleSelect = (role: string) => {
    setOnboardingData(prev => ({ ...prev, role }));
    addChatMessage(`I'm a ${role.toLowerCase()}.`, "user");
    
    let nextPrompt = "";
    switch(role) {
      case "Student":
        nextPrompt = "Great! As a student, I'll help you with your learning journey. Could you tell me a bit more about your education?";
        break;
      case "Employee":
        nextPrompt = "Great! As an employee, I'll help you with your professional development. Could you tell me more about your work?";
        break;
      case "Doctor":
        nextPrompt = "Great! As a doctor/researcher, I'll help you with your research and clinical work. Could you tell me more about your specialization?";
        break;
      case "Founder":
        nextPrompt = "Great! As a founder, I'll help you with your startup journey. Could you tell me more about your venture?";
        break;
    }
    
    addBotReply(nextPrompt);
    setStep(2);
  };

  const handlePersonalInfoSubmit = () => {
    addChatMessage("I've shared my details.", "user");
    
    let responseText = "Thank you for sharing those details. I've noted them down.";
    
    // Add personalized response based on role
    switch(onboardingData.role) {
      case "Student":
        if (onboardingData.personalInfo.examPrep) {
          responseText += ` For ${onboardingData.personalInfo.examPrep} preparation, I'll make sure to provide relevant resources and study plans.`;
        }
        break;
      case "Employee":
        responseText += ` I'll help you develop skills in ${onboardingData.personalInfo.skillsToGrow?.join(", ")}.`;
        break;
      case "Doctor":
        responseText += ` I'll help with your research on ${onboardingData.personalInfo.researchTopic}.`;
        break;
      case "Founder":
        responseText += ` I'll help you with your ${onboardingData.personalInfo.immediateGoal?.toLowerCase()} goals for your startup.`;
        break;
    }
    
    responseText += " Would you like to take a short personality quiz to help me understand your working style better?";
    
    addBotReply(responseText);
    setShowPersonalityTest(true);
  };

  const handlePersonalityTestStart = () => {
    setShowPersonalityTest(false);
    addChatMessage("Yes, I'd like to take the personality quiz.", "user");
    addBotReply("Great! Let's understand your working style with a few questions.");
    setStep(3);
  };

  const handlePersonalityTestSkip = () => {
    setShowPersonalityTest(false);
    addChatMessage("I'll skip the personality quiz for now.", "user");
    addBotReply("No problem! We can always do this later. Let's continue with how you're feeling today.");
    setStep(4);
  };

  const handlePersonalitySubmit = () => {
    // Simple algorithm to determine personality type based on answers
    const answers = Object.values(onboardingData.personalityAnswers);
    let personalityType: PersonalityType = "Strategic Thinker"; // Default
    
    const planningScore = answers.filter(a => a.includes("plan") || a.includes("structure")).length;
    const empathyScore = answers.filter(a => a.includes("people") || a.includes("help")).length;
    const creativeScore = answers.filter(a => a.includes("creative") || a.includes("innovative")).length;
    const analyticalScore = answers.filter(a => a.includes("analyze") || a.includes("details")).length;
    const collaborativeScore = answers.filter(a => a.includes("team") || a.includes("together")).length;
    
    // Find the highest score
    const scores = [
      { type: "Strategic Thinker", score: planningScore },
      { type: "Empathetic Learner", score: empathyScore },
      { type: "Creative Builder", score: creativeScore },
      { type: "Analytical Problem Solver", score: analyticalScore },
      { type: "Collaborative Leader", score: collaborativeScore }
    ];
    
    const highestScore = scores.reduce((prev, current) => 
      (prev.score > current.score) ? prev : current);
    
    personalityType = highestScore.type as PersonalityType;
    setOnboardingData(prev => ({ ...prev, personalityType }));
    
    addChatMessage("I've completed the personality assessment.", "user");
    addBotReply(`Based on your responses, you have qualities of a ${personalityType}. This will help me personalize your experience. Now, how are you feeling today?`);
    
    setStep(4);
  };

  const handleMoodSelect = (mood: MoodType) => {
    setOnboardingData(prev => ({ ...prev, mood }));
    
    addChatMessage(`I'm feeling ${mood.toLowerCase()} today.`, "user");
    
    let response = `Thanks for sharing that you're feeling ${mood.toLowerCase()}. `;
    switch(mood) {
      case "Happy":
        response += "Let's build on that positive energy today!";
        break;
      case "Okay":
        response += "Let's make today productive and balanced.";
        break;
      case "Tired":
        response += "I'll suggest some gentle activities and opportunities for rest today.";
        break;
      case "Overwhelmed":
        response += "I'll help you prioritize and take things step by step today.";
        break;
    }
    
    response += " Let's understand your daily habits a bit better to help personalize your experience.";
    
    addBotReply(response);
    setStep(5);
  };

  const handleHabitsSubmit = () => {
    addChatMessage("I've shared my habits and routines.", "user");
    
    const response = "Thank you for sharing your routines. This will help me provide timely nudges and suggestions. Now, let's talk about your interests and goals.";
    
    addBotReply(response);
    setStep(6);
  };

  const handleInterestsSubmit = () => {
    addChatMessage(`My interests include ${onboardingData.interests.join(", ")} and my goals are ${onboardingData.goals.join(", ")}.`, "user");
    
    let response = "Perfect! With these interests and goals, I can provide more targeted resources and support. ";
    
    switch(onboardingData.role) {
      case "Student":
        response += "I'll help you master these subjects and achieve your academic goals.";
        break;
      case "Employee":
        response += "I'll help you develop these skills and advance in your career.";
        break;
      case "Doctor":
        response += "I'll help you with your research areas and clinical interests.";
        break;
      case "Founder":
        response += "I'll help you build and grow your startup in these areas.";
        break;
    }
    
    response += " Your personalized Sakha dashboard is almost ready. Let's complete your registration!";
    
    addBotReply(response);
    setStep(7);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOnboardingData(prev => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        [name]: value
      }
    }));
  };

  const handleSendOtp = () => {
    if (!onboardingData.personalDetails.phoneNumber || onboardingData.personalDetails.phoneNumber.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number.",
        variant: "destructive"
      });
      return;
    }
    
    addChatMessage(`My name is ${onboardingData.personalDetails.fullName} and my phone number is ${onboardingData.personalDetails.phoneNumber}.`, "user");
    
    setTimeout(() => {
      addBotReply("Great! I've sent a verification code to your phone.");
      toast({
        title: "OTP Sent",
        description: "A verification code has been sent to your phone.",
      });
    }, 800);
  };

  const handleVerifyOtp = () => {
    if (!onboardingData.personalDetails.otp || onboardingData.personalDetails.otp.length < 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid verification code.",
        variant: "destructive"
      });
      return;
    }
    
    addChatMessage(`My verification code is ${onboardingData.personalDetails.otp}.`, "user");
    
    setTimeout(() => {
      addBotReply("Perfect! Your phone number has been verified. Welcome to Sakha AI!");
      
      toast({
        title: "Verification Successful",
        description: "Your account has been created successfully!",
      });
      
      // Show dashboard introduction
      setShowDashboardIntro(true);
    }, 800);
  };

  const handleDashboardIntroComplete = () => {
    setShowDashboardIntro(false);
    
    // Navigate to the appropriate dashboard based on role
    setTimeout(() => {
      navigate(`/dashboard/${onboardingData.role.toLowerCase()}`);
    }, 1000);
  };
  
  // Render different content based on the current step
  const renderStepContent = () => {
    switch(step) {
      case 1: // Role Selection
        return (
          <RadioGroup 
            className="grid grid-cols-2 gap-4"
            value={onboardingData.role}
            onValueChange={handleRoleSelect}
          >
            <div className={`border rounded-xl p-4 cursor-pointer transition-all ${
              onboardingData.role === "Student" ? "border-sakha-blue bg-sakha-blue/5" : "hover:bg-gray-50"
            }`}>
              <RadioGroupItem 
                value="Student" 
                id="student" 
                className="sr-only" 
              />
              <Label 
                htmlFor="student" 
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <Book size={32} className={onboardingData.role === "Student" ? "text-sakha-blue" : ""} />
                <span className="font-medium">Student</span>
              </Label>
            </div>
            
            <div className={`border rounded-xl p-4 cursor-pointer transition-all ${
              onboardingData.role === "Employee" ? "border-sakha-blue bg-sakha-blue/5" : "hover:bg-gray-50"
            }`}>
              <RadioGroupItem 
                value="Employee" 
                id="employee" 
                className="sr-only" 
              />
              <Label 
                htmlFor="employee" 
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <Briefcase size={32} className={onboardingData.role === "Employee" ? "text-sakha-blue" : ""} />
                <span className="font-medium">Employee</span>
              </Label>
            </div>
            
            <div className={`border rounded-xl p-4 cursor-pointer transition-all ${
              onboardingData.role === "Doctor" ? "border-sakha-blue bg-sakha-blue/5" : "hover:bg-gray-50"
            }`}>
              <RadioGroupItem 
                value="Doctor" 
                id="doctor" 
                className="sr-only" 
              />
              <Label 
                htmlFor="doctor" 
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <Stethoscope size={32} className={onboardingData.role === "Doctor" ? "text-sakha-blue" : ""} />
                <span className="font-medium">Doctor / Researcher</span>
              </Label>
            </div>
            
            <div className={`border rounded-xl p-4 cursor-pointer transition-all ${
              onboardingData.role === "Founder" ? "border-sakha-blue bg-sakha-blue/5" : "hover:bg-gray-50"
            }`}>
              <RadioGroupItem 
                value="Founder" 
                id="founder" 
                className="sr-only" 
              />
              <Label 
                htmlFor="founder" 
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <Rocket size={32} className={onboardingData.role === "Founder" ? "text-sakha-blue" : ""} />
                <span className="font-medium">Founder</span>
              </Label>
            </div>
          </RadioGroup>
        );
        
      case 2: // Role-based personal information
        switch(onboardingData.role) {
          case "Student":
            return (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="age">What's your age?</Label>
                  <Input 
                    id="age" 
                    placeholder="Enter your age" 
                    value={onboardingData.personalInfo.age || ""}
                    onChange={(e) => setOnboardingData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, age: e.target.value }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="grade">What class/grade are you in?</Label>
                  <Select 
                    value={onboardingData.personalInfo.grade || ""} 
                    onValueChange={(value) => setOnboardingData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, grade: value }
                    }))}
                  >
                    <SelectTrigger id="grade">
                      <SelectValue placeholder="Select your grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={`Class ${i + 1}`}>
                          Class {i + 1}
                        </SelectItem>
                      ))}
                      <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                      <SelectItem value="PhD">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Where are you located?</Label>
                  <Input 
                    id="location" 
                    placeholder="Enter your location" 
                    value={onboardingData.personalInfo.location || ""}
                    onChange={(e) => setOnboardingData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, location: e.target.value }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="examPrep">Are you preparing for any of these exams?</Label>
                  <Select 
                    value={onboardingData.personalInfo.examPrep || ""} 
                    onValueChange={(value) => setOnboardingData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, examPrep: value }
                    }))}
                  >
                    <SelectTrigger id="examPrep">
                      <SelectValue placeholder="Select an exam" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="NEET">NEET</SelectItem>
                      <SelectItem value="IIT-JEE">IIT-JEE</SelectItem>
                      <SelectItem value="UPSC">UPSC</SelectItem>
                      <SelectItem value="Board Exams">Board Exams</SelectItem>
                      <SelectItem value="None">None of these</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={handlePersonalInfoSubmit}
                  disabled={!onboardingData.personalInfo.grade}
                >
                  Continue
                </Button>
              </div>
            );
            
          case "Employee":
            return (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">What's your job title?</Label>
                  <Input 
                    id="jobTitle" 
                    placeholder="Enter your job title" 
                    value={onboardingData.personalInfo.jobTitle || ""}
                    onChange={(e) => setOnboardingData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, jobTitle: e.target.value }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">What's your experience level?</Label>
                  <Select 
                    value={onboardingData.personalInfo.experienceLevel || ""} 
                    onValueChange={(value) => setOnboardingData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, experienceLevel: value }
                    }))}
                  >
                    <SelectTrigger id="experienceLevel">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Intern">Intern</SelectItem>
                      <SelectItem value="Junior">Junior</SelectItem>
                      <SelectItem value="Mid-level">Mid-level</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="Lead">Lead/Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="industry">What industry or domain do you work in?</Label>
                  <Input 
                    id="industry" 
                    placeholder="Enter your industry" 
                    value={onboardingData.personalInfo.industry || ""}
                    onChange={(e) => setOnboardingData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, industry: e.target.value }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>What skills do you want to grow?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Python", "Leadership", "Design", "Marketing", "Data Analysis", "Communication", "Project Management"].map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox 
                          id={skill} 
                          checked={(onboardingData.personalInfo.skillsToGrow || []).includes(skill)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setOnboardingData(prev => ({
                                ...prev,
                                personalInfo: { 
                                  ...prev.personalInfo, 
                                  skillsToGrow: [...(prev.personalInfo.skillsToGrow || []), skill]
                                }
                              }));
                            } else {
                              setOnboardingData(prev => ({
                                ...prev,
                                personalInfo: { 
                                  ...prev.personalInfo, 
                                  skillsToGrow: (prev.personalInfo.skillsToGrow || []).filter(s => s !== skill)
                                }
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={skill}>{skill}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={handlePersonalInfoSubmit}
                  disabled={!onboardingData.personalInfo.jobTitle || !(onboardingData.personalInfo.skillsToGrow || []).length}
                >
                  Continue
                </Button>
              </div>
            );
            
          case "Doctor":
            return (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="specialization">What is your specialization?</Label>
                  <Input 
                    id="specialization" 
                    placeholder="Enter your specialization" 
                    value={onboardingData.personalInfo.specialization || ""}
                    onChange={(e) => setOnboardingData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, specialization: e.target.value }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="institution">Which institution or hospital are you affiliated with?</Label>
                  <Input 
                    id="institution" 
                    placeholder="Enter your institution" 
                    value={onboardingData.personalInfo.institution || ""}
                    onChange={(e) => setOnboardingData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, institution: e.target.value }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Are you working on a thesis or publication?</Label>
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="thesis-yes" />
                      <Label htmlFor="thesis-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="thesis-no" />
                      <Label htmlFor="thesis-no">No</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="researchTopic">What's your current research topic or clinical interest?</Label>
                  <Input 
                    id="researchTopic" 
                    placeholder="Enter your research topic" 
                    value={onboardingData.personalInfo.researchTopic || ""}
                    onChange={(e) => setOnboardingData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, researchTopic: e.target.value }
                    }))}
                  />
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={handlePersonalInfoSubmit}
                  disabled={!onboardingData.personalInfo.specialization || !onboardingData.personalInfo.institution}
                >
                  Continue
                </Button>
              </div>
            );
            
          case "Founder":
            return (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="startupStage">What stage is your startup in?</Label>
                  <Select 
                    value={onboardingData.personalInfo.startupStage || ""} 
                    onValueChange={(value) => setOnboardingData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, startupStage: value }
                    }))}
                  >
                    <SelectTrigger id="startupStage">
                      <SelectValue placeholder="Select your startup stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Idea">Idea</SelectItem>
                      <SelectItem value="Prototype">Prototype</SelectItem>
                      <SelectItem value="Fundraising">Fundraising</SelectItem>
                      <SelectItem value="Growth">Growth</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="teamSize">How big is your team?</Label>
                  <Select 
                    value={onboardingData.personalInfo.teamSize || ""} 
                    onValueChange={(value) => setOnboardingData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, teamSize: value }
                    }))}
                  >
                    <SelectTrigger id="teamSize">
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Solo">Solo founder</SelectItem>
                      <SelectItem value="2-5">2-5 people</SelectItem>
                      <SelectItem value="6-10">6-10 people</SelectItem>
                      <SelectItem value="11-50">11-50 people</SelectItem>
                      <SelectItem value="50+">Over 50 people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="startupIndustry">What industry are you in?</Label>
                  <Input 
                    id="startupIndustry" 
                    placeholder="Enter your industry" 
                    value={onboardingData.personalInfo.startupIndustry || ""}
                    onChange={(e) => setOnboardingData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, startupIndustry: e.target.value }
                    }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="immediateGoal">What's your immediate goal?</Label>
                  <Select 
                    value={onboardingData.personalInfo.immediateGoal || ""} 
                    onValueChange={(value) => setOnboardingData(prev => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, immediateGoal: value }
                    }))}
                  >
                    <SelectTrigger id="immediateGoal">
                      <SelectValue placeholder="Select your immediate goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Launch MVP">Launch MVP</SelectItem>
                      <SelectItem value="Raise funds">Raise funds</SelectItem>
                      <SelectItem value="Grow users">Grow users</SelectItem>
                      <SelectItem value="Hire team">Hire team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  className="w-full mt-4" 
                  onClick={handlePersonalInfoSubmit}
                  disabled={!onboardingData.personalInfo.startupStage || !onboardingData.personalInfo.startupIndustry}
                >
                  Continue
                </Button>
              </div>
            );
            
          default:
            return null;
        }
        
      case 3: // Personality Test
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Do you plan ahead or go with the flow?</Label>
              <Select 
                value={onboardingData.personalityAnswers.planning || ""} 
                onValueChange={(value) => setOnboardingData(prev => ({
                  ...prev,
                  personalityAnswers: { ...prev.personalityAnswers, planning: value }
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="detailed-planning">I prefer detailed planning</SelectItem>
                  <SelectItem value="flexible-planning">I plan but stay flexible</SelectItem>
                  <SelectItem value="spontaneous">I'm more spontaneous</SelectItem>
                  <SelectItem value="go-with-flow">I go with the flow</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Do you prefer working alone or in groups?</Label>
              <Select 
                value={onboardingData.personalityAnswers.workStyle || ""} 
                onValueChange={(value) => setOnboardingData(prev => ({
                  ...prev,
                  personalityAnswers: { ...prev.personalityAnswers, workStyle: value }
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="always-alone">Always alone</SelectItem>
                  <SelectItem value="mostly-alone">Mostly alone</SelectItem>
                  <SelectItem value="balanced">A balance of both</SelectItem>
                  <SelectItem value="mostly-team">Mostly in teams</SelectItem>
                  <SelectItem value="always-team">Always in teams</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>What motivates you more?</Label>
              <Select 
                value={onboardingData.personalityAnswers.motivation || ""} 
                onValueChange={(value) => setOnboardingData(prev => ({
                  ...prev,
                  personalityAnswers: { ...prev.personalityAnswers, motivation: value }
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your motivation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="praise">Recognition and praise</SelectItem>
                  <SelectItem value="purpose">Purpose and meaning</SelectItem>
                  <SelectItem value="achievement">Achievement and success</SelectItem>
                  <SelectItem value="helping">Helping others</SelectItem>
                  <SelectItem value="learning">Learning new things</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>When solving problems, you typically:</Label>
              <Select 
                value={onboardingData.personalityAnswers.problemSolving || ""} 
                onValueChange={(value) => setOnboardingData(prev => ({
                  ...prev,
                  personalityAnswers: { ...prev.personalityAnswers, problemSolving: value }
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your approach" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="analyze">Analyze all details carefully</SelectItem>
                  <SelectItem value="creative">Look for creative solutions</SelectItem>
                  <SelectItem value="collaborate">Collaborate with others</SelectItem>
                  <SelectItem value="strategic">Think about long-term impact</SelectItem>
                  <SelectItem value="intuition">Go with your gut feeling</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>How do you handle stress?</Label>
              <Select 
                value={onboardingData.personalityAnswers.stressHandling || ""} 
                onValueChange={(value) => setOnboardingData(prev => ({
                  ...prev,
                  personalityAnswers: { ...prev.personalityAnswers, stressHandling: value }
                }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your approach" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="organize">Organize and plan</SelectItem>
                  <SelectItem value="talk">Talk to others</SelectItem>
                  <SelectItem value="break">Take a break</SelectItem>
                  <SelectItem value="physical">Physical activity</SelectItem>
                  <SelectItem value="creative-outlet">Creative outlet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handlePersonalitySubmit}
              disabled={Object.keys(onboardingData.personalityAnswers).length < 5}
            >
              Submit
            </Button>
          </div>
        );
        
      case 4: // Mood Selection
        return (
          <div className="space-y-6">
            <Label className="block text-center mb-4">How are you feeling today?</Label>
            <div className="flex justify-center gap-8">
              <Button
                variant="ghost"
                className="flex flex-col items-center gap-2 hover:bg-sakha-blue/10"
                onClick={() => handleMoodSelect("Happy")}
              >
                <div className="text-4xl">😊</div>
                <span>Happy</span>
              </Button>
              
              <Button
                variant="ghost"
                className="flex flex-col items-center gap-2 hover:bg-sakha-blue/10"
                onClick={() => handleMoodSelect("Okay")}
              >
                <div className="text-4xl">😐</div>
                <span>Okay</span>
              </Button>
              
              <Button
                variant="ghost"
                className="flex flex-col items-center gap-2 hover:bg-sakha-blue/10"
                onClick={() => handleMoodSelect("Tired")}
              >
                <div className="text-4xl">😔</div>
                <span>Tired</span>
              </Button>
              
              <Button
                variant="ghost"
                className="flex flex-col items-center gap-2 hover:bg-sakha-blue/10"
                onClick={() => handleMoodSelect("Overwhelmed")}
              >
                <div className="text-4xl">😢</div>
                <span>Overwhelmed</span>
              </Button>
            </div>
          </div>
        );
        
      case 5: // Habit & Behavior Analysis
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="wakeupTime">What time do you usually wake up?</Label>
              <Select 
                value={onboardingData.habits.wakeupTime || ""} 
                onValueChange={(value) => setOnboardingData(prev => ({
                  ...prev,
                  habits: { ...prev.habits, wakeupTime: value }
                }))}
              >
                <SelectTrigger id="wakeupTime">
                  <SelectValue placeholder="Select wake up time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="before-5">Before 5 AM</SelectItem>
                  <SelectItem value="5-6">5 - 6 AM</SelectItem>
                  <SelectItem value="6-7">6 - 7 AM</SelectItem>
                  <SelectItem value="7-8">7 - 8 AM</SelectItem>
                  <SelectItem value="8-9">8 - 9 AM</SelectItem>
                  <SelectItem value="after-9">After 9 AM</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="focusHours">How many hours can you focus without a break?</Label>
              <Select 
                value={onboardingData.habits.focusHours || ""} 
                onValueChange={(value) => setOnboardingData(prev => ({
                  ...prev,
                  habits: { ...prev.habits, focusHours: value }
                }))}
              >
                <SelectTrigger id="focusHours">
                  <SelectValue placeholder="Select focus duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-30">Less than 30 minutes</SelectItem>
                  <SelectItem value="30-60">30 - 60 minutes</SelectItem>
                  <SelectItem value="1-2">1 - 2 hours</SelectItem>
                  <SelectItem value="more-than-2">More than 2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stressManagement">How do you currently manage stress?</Label>
              <Select 
                value={onboardingData.habits.stressManagement || ""} 
                onValueChange={(value) => setOnboardingData(prev => ({
                  ...prev,
                  habits: { ...prev.habits, stressManagement: value }
                }))}
              >
                <SelectTrigger id="stressManagement">
                  <SelectValue placeholder="Select your method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exercise">Exercise</SelectItem>
                  <SelectItem value="meditation">Meditation</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="talking">Talking to friends/family</SelectItem>
                  <SelectItem value="hobbies">Hobbies</SelectItem>
                  <SelectItem value="none">I don't have a method</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="breaksRoutine">Do you take regular breaks?</Label>
              <Select 
                value={onboardingData.habits.breaksRoutine || ""} 
                onValueChange={(value) => setOnboardingData(prev => ({
                  ...prev,
                  habits: { ...prev.habits, breaksRoutine: value }
                }))}
              >
                <SelectTrigger id="breaksRoutine">
                  <SelectValue placeholder="Select your routine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Yes, scheduled breaks</SelectItem>
                  <SelectItem value="when-needed">Yes, when I feel I need them</SelectItem>
                  <SelectItem value="rarely">Rarely</SelectItem>
                  <SelectItem value="never">Never</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleHabitsSubmit}
              disabled={Object.keys(onboardingData.habits).length < 4}
            >
              Continue
            </Button>
          </div>
        );
        
      case 6: // Area of Interest
        return (
          <div className="space-y-6">
            {onboardingData.role === "Student" && (
              <>
                <div className="space-y-2">
                  <Label>Which subjects are you interested in?</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {["Math", "Physics", "Chemistry", "Biology", "History", "Geography", "Literature", "Computer Science", "Economics"].map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox 
                          id={subject} 
                          checked={(onboardingData.interests).includes(subject)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setOnboardingData(prev => ({
                                ...prev,
                                interests: [...prev.interests, subject]
                              }));
                            } else {
                              setOnboardingData(prev => ({
                                ...prev,
                                interests: prev.interests.filter(s => s !== subject)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={subject}>{subject}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>What are your academic goals?</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {["Crack competitive exam", "Improve grades", "Build a project", "Win Olympiad/Competition", "Master specific topic", "Learn new skill"].map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Checkbox 
                          id={goal} 
                          checked={(onboardingData.goals).includes(goal)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setOnboardingData(prev => ({
                                ...prev,
                                goals: [...prev.goals, goal]
                              }));
                            } else {
                              setOnboardingData(prev => ({
                                ...prev,
                                goals: prev.goals.filter(g => g !== goal)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={goal}>{goal}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {onboardingData.role === "Employee" && (
              <>
                <div className="space-y-2">
                  <Label>Which skills are you working on?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Technical skills", "Leadership", "Communication", "Project Management", "Design", "Marketing", "Data Analysis", "Public Speaking", "Writing", "Problem Solving"].map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox 
                          id={skill} 
                          checked={(onboardingData.interests).includes(skill)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setOnboardingData(prev => ({
                                ...prev,
                                interests: [...prev.interests, skill]
                              }));
                            } else {
                              setOnboardingData(prev => ({
                                ...prev,
                                interests: prev.interests.filter(s => s !== skill)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={skill}>{skill}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>What are your career goals?</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {["Get promoted", "Switch careers", "Develop new skills", "Better work-life balance", "Increase productivity", "Lead a team", "Start a side project"].map((goal) => (
                      <div key={goal} className="flex items-center space-x-2">
                        <Checkbox 
                          id={goal} 
                          checked={(onboardingData.goals).includes(goal)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setOnboardingData(prev => ({
                                ...prev,
                                goals: [...prev.goals, goal]
                              }));
                            } else {
                              setOnboardingData(prev => ({
                                ...prev,
                                goals: prev.goals.filter(g => g !== goal)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={goal}>{goal}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {onboardingData.role === "Doctor" && (
              <>
                <div className="space-y-2">
                  <Label>Areas of focus:</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Cardiology", "Neurology", "Oncology", "Public Health", "Pediatrics", "Genomics", "Surgery", "Infectious Diseases", "Mental Health", "Nutrition"].map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <Checkbox 
                          id={area} 
                          checked={(onboardingData.interests).includes(area)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setOnboardingData(prev => ({
                                ...prev,
                                interests: [...prev.interests, area]
                              }));
                            } else {
                              setOnboardingData(prev => ({
                                ...prev,
                                interests: prev.interests.filter(a => a !== area)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={area}>{area}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Research tools needed:</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {["Literature review", "Data analysis", "Publication assistance", "Grant writing", "Clinical trials", "Patient management", "Research methodology", "Thesis writing"].map((tool) => (
                      <div key={tool} className="flex items-center space-x-2">
                        <Checkbox 
                          id={tool} 
                          checked={(onboardingData.goals).includes(tool)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setOnboardingData(prev => ({
                                ...prev,
                                goals: [...prev.goals, tool]
                              }));
                            } else {
                              setOnboardingData(prev => ({
                                ...prev,
                                goals: prev.goals.filter(t => t !== tool)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={tool}>{tool}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {onboardingData.role === "Founder" && (
              <>
                <div className="space-y-2">
                  <Label>What are you building?</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {["Mobile App", "Web Platform", "SaaS Product", "Hardware", "Marketplace", "AI Tool", "Healthcare Solution", "Fintech Product", "Educational Product", "E-commerce"].map((product) => (
                      <div key={product} className="flex items-center space-x-2">
                        <Checkbox 
                          id={product} 
                          checked={(onboardingData.interests).includes(product)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setOnboardingData(prev => ({
                                ...prev,
                                interests: [...prev.interests, product]
                              }));
                            } else {
                              setOnboardingData(prev => ({
                                ...prev,
                                interests: prev.interests.filter(p => p !== product)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={product}>{product}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>What help do you need?</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {["Build MVP", "Pitch deck", "Team setup", "Fundraising", "Growth strategy", "Market research", "Product development", "Business model"].map((help) => (
                      <div key={help} className="flex items-center space-x-2">
                        <Checkbox 
                          id={help} 
                          checked={(onboardingData.goals).includes(help)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setOnboardingData(prev => ({
                                ...prev,
                                goals: [...prev.goals, help]
                              }));
                            } else {
                              setOnboardingData(prev => ({
                                ...prev,
                                goals: prev.goals.filter(h => h !== help)
                              }));
                            }
                          }}
                        />
                        <Label htmlFor={help}>{help}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            <Button 
              className="w-full" 
              onClick={handleInterestsSubmit}
              disabled={!onboardingData.interests.length || !onboardingData.goals.length}
            >
              Continue
            </Button>
          </div>
        );
        
      case 7: // Phone verification
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={onboardingData.personalDetails.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={onboardingData.personalDetails.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                type="tel"
              />
            </div>
            
            {onboardingData.personalDetails.phoneNumber.length >= 10 ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    name="otp"
                    value={onboardingData.personalDetails.otp}
                    onChange={handleInputChange}
                    placeholder="Enter the code sent to your phone"
                    maxLength={6}
                  />
                </div>
                
                <Button 
                  className="w-full"
                  onClick={handleVerifyOtp}
                  disabled={!onboardingData.personalDetails.otp}
                >
                  Verify & Create Account
                </Button>
              </>
            ) : (
              <Button 
                className="w-full"
                onClick={handleSendOtp}
                disabled={!onboardingData.personalDetails.fullName || !onboardingData.personalDetails.phoneNumber}
              >
                Send Verification Code
              </Button>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  // Dashboard Introduction Dialog content
  const renderDashboardIntro = () => {
    return (
      <Dialog open={showDashboardIntro} onOpenChange={setShowDashboardIntro}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Welcome to Your Personalized Dashboard!</DialogTitle>
            <DialogDescription>
              Your Sakha AI dashboard has been customized based on your preferences and needs
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-6">
            {/* Role-specific dashboard introduction */}
            <div className="space-y-8">
              <div className="flex items-center gap-5">
                <div className="bg-sakha-blue/10 p-4 rounded-full">
                  <MessageSquare size={32} className="text-sakha-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Central AI Chat Assistant</h3>
                  <p className="text-gray-600">Your personal AI assistant is always available to help with questions and tasks</p>
                </div>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="bg-sakha-blue/10 p-4 rounded-full">
                  <Target size={32} className="text-sakha-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Personalized Task Board</h3>
                  <p className="text-gray-600">Goals and tasks tailored to your specific needs and interests</p>
                </div>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="bg-sakha-blue/10 p-4 rounded-full">
                  <Lightbulb size={32} className="text-sakha-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Smart Nudges Area</h3>
                  <p className="text-gray-600">Timely recommendations and nudges based on your goals and habits</p>
                </div>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="bg-sakha-blue/10 p-4 rounded-full">
                  <Heart size={32} className="text-sakha-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Emotional Health Tracker</h3>
                  <p className="text-gray-600">Monitor your emotional well-being and get personalized support</p>
                </div>
              </div>
              
              <div className="flex items-center gap-5">
                <div className="bg-sakha-blue/10 p-4 rounded-full">
                  <BookOpen size={32} className="text-sakha-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Interest-Based Tools</h3>
                  <p className="text-gray-600">Tools and resources based on the interests and goals you've shared</p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-sakha-blue/5 rounded-lg border border-sakha-blue/20">
                <h4 className="font-medium mb-2">Your Profile Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  <div className="bg-sakha-blue/10 text-sakha-blue text-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <User size={14} />
                    <span>Role: {onboardingData.role}</span>
                  </div>
                  
                  {onboardingData.personalityType && (
                    <div className="bg-sakha-purple/10 text-sakha-purple text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <Brain size={14} />
                      <span>Personality: {onboardingData.personalityType}</span>
                    </div>
                  )}
                  
                  {onboardingData.mood && (
                    <div className="bg-sakha-lavender/20 text-sakha-purple text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <Smile size={14} />
                      <span>Mood: {onboardingData.mood}</span>
                    </div>
                  )}
                  
                  {onboardingData.interests.length > 0 && (
                    <div className="bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <Book size={14} />
                      <span>Interests: {onboardingData.interests.length}</span>
                    </div>
                  )}
                  
                  {onboardingData.goals.length > 0 && (
                    <div className="bg-amber-100 text-amber-600 text-sm px-3 py-1 rounded-full flex items-center gap-1">
                      <Target size={14} />
                      <span>Goals: {onboardingData.goals.length}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium flex items-center mb-4">
                  <Award className="text-gray-400 mr-2" size={16} />
                  <span>Basic vs Premium Features</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h5 className="font-medium mb-2">Basic Features</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li className="flex items-start">
                        <Check size={16} className="text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                        <span>Limited daily queries</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                        <span>Basic templates</span>
                      </li>
                      <li className="flex items-start">
                        <Check size={16} className="text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                        <span>Daily check-ins</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-sakha-blue/5 p-4 rounded-lg border border-sakha-blue/30 shadow-sm md:col-span-2">
                    <h5 className="font-medium mb-2 text-sakha-blue">Premium Features</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-start">
                          <Check size={16} className="text-sakha-blue mr-1 mt-0.5 flex-shrink-0" />
                          <span>Unlimited queries & support</span>
                        </li>
                        <li className="flex items-start">
                          <Check size={16} className="text-sakha-blue mr-1 mt-0.5 flex-shrink-0" />
                          <span>Advanced tools & analytics</span>
                        </li>
                        <li className="flex items-start">
                          <Check size={16} className="text-sakha-blue mr-1 mt-0.5 flex-shrink-0" />
                          <span>Smart guidance system</span>
                        </li>
                      </ul>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-start">
                          <Check size={16} className="text-sakha-blue mr-1 mt-0.5 flex-shrink-0" />
                          <span>Personalized programs</span>
                        </li>
                        <li className="flex items-start">
                          <Check size={16} className="text-sakha-blue mr-1 mt-0.5 flex-shrink-0" />
                          <span>Weekly detailed reports</span>
                        </li>
                        <li className="flex items-start">
                          <Check size={16} className="text-sakha-blue mr-1 mt-0.5 flex-shrink-0" />
                          <span>Priority support system</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button onClick={handleDashboardIntroComplete} className="bg-gradient-to-r from-sakha-blue to-sakha-purple text-white px-8">
              Let's Go!
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakha-light-blue/10 via-white to-sakha-lavender/10 flex flex-col">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
              alt="Sakha AI Logo" 
              className="w-10 h-10 object-contain"
            />
            <span className="text-2xl font-display font-semibold gradient-text">Sakha AI</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <span className="text-gray-600">Already have an account?</span>
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Progress value={progress} className="h-2 w-full" />
            <div className="flex justify-between mt-2 text-sm text-gray-500">
              <span>Start</span>
              <span>Complete Profile</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4 mb-8">
                <div className="relative">
                  <div className="avatar-pulse"></div>
                  <div className="avatar-pulse" style={{ animationDelay: "0.5s" }}></div>
                  <img 
                    src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
                    alt="Sakha AI Avatar" 
                    className="w-12 h-12 rounded-full z-10 relative"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-semibold">Sign Up</h1>
                  <p className="text-gray-600">Personalized onboarding with Sakha AI</p>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      step >= 1 ? "bg-sakha-blue text-white" : "bg-gray-200 text-gray-500"
                    }`}>1</div>
                    <h3 className="font-medium">Role Selection</h3>
                  </div>
                  
                  {step === 1 && (
                    <div className="mt-4 animate-fade-in">
                      {renderStepContent()}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      step >= 2 ? "bg-sakha-blue text-white" : "bg-gray-200 text-gray-500"
                    }`}>2</div>
                    <h3 className="font-medium">Personal Information</h3>
                  </div>
                  
                  {step === 2 && (
                    <div className="mt-4 animate-fade-in">
                      {renderStepContent()}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      step >= 3 ? "bg-sakha-blue text-white" : "bg-gray-200 text-gray-500"
                    }`}>3</div>
                    <h3 className="font-medium">Personality Style</h3>
                  </div>
                  
                  {step === 3 && (
                    <div className="mt-4 animate-fade-in">
                      {renderStepContent()}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      step >= 4 ? "bg-sakha-blue text-white" : "bg-gray-200 text-gray-500"
                    }`}>4</div>
                    <h3 className="font-medium">Emotional Check-in</h3>
                  </div>
                  
                  {step === 4 && (
                    <div className="mt-4 animate-fade-in">
                      {renderStepContent()}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      step >= 5 ? "bg-sakha-blue text-white" : "bg-gray-200 text-gray-500"
                    }`}>5</div>
                    <h3 className="font-medium">Habit & Behavior Analysis</h3>
                  </div>
                  
                  {step === 5 && (
                    <div className="mt-4 animate-fade-in">
                      {renderStepContent()}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      step >= 6 ? "bg-sakha-blue text-white" : "bg-gray-200 text-gray-500"
                    }`}>6</div>
                    <h3 className="font-medium">Areas of Interest & Goals</h3>
                  </div>
                  
                  {step === 6 && (
                    <div className="mt-4 animate-fade-in">
                      {renderStepContent()}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      step >= 7 ? "bg-sakha-blue text-white" : "bg-gray-200 text-gray-500"
                    }`}>7</div>
                    <h3 className="font-medium">Account Setup</h3>
                  </div>
                  
                  {step === 7 && (
                    <div className="mt-4 animate-fade-in">
                      {renderStepContent()}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col">
              <div className="p-4 bg-gradient-to-r from-sakha-blue to-sakha-purple text-white">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="avatar-pulse"></div>
                    <img 
                      src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
                      alt="Sakha AI Avatar" 
                      className="w-10 h-10 rounded-full z-10 relative"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Sakha AI</h3>
                    <p className="text-xs opacity-80">Personalized AI Companion</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-grow p-4 overflow-y-auto h-96">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index}
                    className={`mb-4 p-3 rounded-lg max-w-[90%] ${
                      msg.type === 'user' 
                        ? 'ml-auto bg-sakha-blue text-white' 
                        : 'bg-gray-100'
                    }`}
                  >
                    <p>{msg.content}</p>
                  </div>
                ))}
              </div>
              
              <Tabs defaultValue="chat" className="p-4 border-t border-gray-200">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="chat" className="flex items-center gap-2">
                    <Send size={16} /> Chat
                  </TabsTrigger>
                  <TabsTrigger value="mood" className="flex items-center gap-2">
                    <Smile size={16} /> Mood
                  </TabsTrigger>
                  <TabsTrigger value="wellness" className="flex items-center gap-2">
                    <Heart size={16} /> Well-being
                  </TabsTrigger>
                  <TabsTrigger value="goals" className="flex items-center gap-2">
                    <Brain size={16} /> Goals
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="chat">
                  <p className="text-xs text-gray-500 mb-2 text-center">
                    Continue your conversation with Sakha
                  </p>
                  <div className="flex gap-2">
                    <Input placeholder="Type your message..." disabled={step === 1} />
                    <Button size="icon" disabled={step === 1}>
                      <Send size={16} />
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="mood">
                  <p className="text-xs text-gray-500 mb-2 text-center">
                    How are you feeling today?
                  </p>
                  <div className="flex justify-center gap-4">
                    {["😊", "😐", "😔", "😢"].map((emoji) => (
                      <button 
                        key={emoji} 
                        className="text-2xl hover:scale-110 transition-transform"
                        disabled={step === 1}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="wellness">
                  <p className="text-center text-sm text-gray-600">
                    Complete your profile to unlock wellness features
                  </p>
                </TabsContent>
                
                <TabsContent value="goals">
                  <p className="text-center text-sm text-gray-600">
                    Complete your profile to set personal goals
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dialog for personality test option */}
      <Dialog open={showPersonalityTest} onOpenChange={setShowPersonalityTest}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Would you like to take a short personality quiz?</DialogTitle>
            <DialogDescription>
              This will help me understand your working style better and tailor my assistance to your preferences.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" onClick={handlePersonalityTestSkip}>Skip for now</Button>
            <Button onClick={handlePersonalityTestStart}>Take the quiz</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Dashboard Introduction Dialog */}
      {renderDashboardIntro()}
    </div>
  );
};

export default SignUp;
