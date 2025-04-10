
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import ChatMessage from "@/components/signup/ChatMessage";

type UserRole = "Student" | "Employee" | "Doctor" | "Founder";
type UserGoal = string;
type OnboardingStep = 
  | "role"
  | "demographics"
  | "goal"
  | "personality"
  | "sentiment"
  | "habits"
  | "interests"
  | "signup";

interface OnboardingData {
  role?: UserRole;
  age?: string;
  grade?: string;
  location?: string;
  jobRole?: string;
  seniorityLevel?: string;
  domain?: string;
  specialization?: string;
  institution?: string;
  research?: string;
  startupStage?: string;
  teamSize?: string;
  industry?: string;
  goals?: UserGoal[];
  personality?: string;
  mood?: string;
  sleepPattern?: string;
  dailyRoutine?: string;
  stressManagement?: string;
  focusDuration?: string;
  studyPreference?: string;
  interests?: string[];
}

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<OnboardingStep>("role");
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});
  const [messages, setMessages] = useState([
    { content: "Hi, I'm Sakha – your personal AI companion for learning, growth, and well-being. What best describes you?", isBot: true }
  ]);
  const [formValues, setFormValues] = useState({
    name: "",
    mobile: "",
    otp: "",
  });
  
  const studentGoals = [
    "IIT JEE (Engineering Entrance)",
    "NEET (Medical Entrance)",
    "MBA (CAT, XAT, SNAP, CMAT, etc.)",
    "CUET UG (Undergraduate Common Entrance Test)",
    "UPSC (Civil Services – Prelims & Mains)",
    "CLAT (Law Entrance)",
    "BANK PO (Bank Probationary Officer Exams)"
  ];
  
  const personalityTypes = [
    "Strategic Thinker", "Curious Creator", "Focused Performer", 
    "Analytical Planner", "Intuitive Explorer"
  ];
  
  const moodOptions = [
    "😊 Motivated", "🤔 Curious", "😐 Neutral", "😓 Tired", "😔 Stressed"
  ];

  const handleRoleSelect = (role: UserRole) => {
    setOnboardingData({ ...onboardingData, role });
    setMessages([
      ...messages, 
      { content: role, isBot: false },
      { content: getDemographicsQuestion(role), isBot: true }
    ]);
    setStep("demographics");
  };
  
  const getDemographicsQuestion = (role: UserRole) => {
    switch(role) {
      case "Student": 
        return "Great! To help personalize your learning experience, could you share your age, class/grade (10th to post graduation), and location?";
      case "Employee": 
        return "Excellent! Please tell me about your job role, seniority level, and domain to customize your professional growth plan.";
      case "Doctor": 
        return "Thanks! Could you share your specialization, institution, and any ongoing research you're working on?";
      case "Founder": 
        return "Perfect! To tailor our support, please share your startup stage, team size, industry, and main goals.";
      default: 
        return "Please tell me more about yourself.";
    }
  };

  const handleDemographicsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value as string;
    });
    
    // Create a readable message for chat
    let userMessage = "";
    Object.entries(data).forEach(([key, value]) => {
      userMessage += `${key}: ${value}, `;
    });
    userMessage = userMessage.slice(0, -2); // Remove trailing comma
    
    setOnboardingData({ ...onboardingData, ...data });
    
    let nextQuestion = "What's your primary goal?";
    if (onboardingData.role === "Student") {
      nextQuestion = "Which exam are you preparing for?";
    }
    
    setMessages([
      ...messages, 
      { content: userMessage, isBot: false },
      { content: nextQuestion, isBot: true }
    ]);
    setStep("goal");
  };
  
  const handleGoalSelect = (goal: UserGoal) => {
    setOnboardingData({ ...onboardingData, goals: [goal] });
    setMessages([
      ...messages, 
      { content: goal, isBot: false },
      { content: "Let's understand your personality type with a short quiz. Which of these best describes your approach to learning?", isBot: true }
    ]);
    setStep("personality");
  };
  
  const handlePersonalitySelect = (personality: string) => {
    setOnboardingData({ ...onboardingData, personality });
    setMessages([
      ...messages,
      { content: personality, isBot: false },
      { content: "How are you feeling about your studies/work today?", isBot: true }
    ]);
    setStep("sentiment");
  };
  
  const handleMoodSelect = (mood: string) => {
    setOnboardingData({ ...onboardingData, mood });
    setMessages([
      ...messages,
      { content: mood, isBot: false },
      { content: "Let's understand your study habits better. How would you describe your sleep pattern and daily routine?", isBot: true }
    ]);
    setStep("habits");
  };
  
  const handleHabitsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const habits: Record<string, string> = {};
    formData.forEach((value, key) => {
      habits[key] = value as string;
    });
    
    let userMessage = "";
    Object.entries(habits).forEach(([key, value]) => {
      userMessage += `${key}: ${value}, `;
    });
    userMessage = userMessage.slice(0, -2);
    
    setOnboardingData({ ...onboardingData, ...habits });
    setMessages([
      ...messages,
      { content: userMessage, isBot: false },
      { content: "What are your main areas of interest? (e.g. Science, Math, Programming, Writing)", isBot: true }
    ]);
    setStep("interests");
  };
  
  const handleInterestsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const interests = formData.get("interests") as string;
    const interestsList = interests.split(",").map(i => i.trim());
    
    setOnboardingData({ ...onboardingData, interests: interestsList });
    setMessages([
      ...messages,
      { content: interests, isBot: false },
      { content: "Your personalized Sakha dashboard is ready. Please sign up to access it.", isBot: true }
    ]);
    setStep("signup");
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  
  const handleRequestOtp = () => {
    if (!formValues.name || !formValues.mobile) {
      toast({
        title: "Please fill in all fields",
        description: "We need your name and mobile number to proceed.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your mobile.",
    });
    
    setFormValues({ ...formValues, otp: "" });
  };
  
  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Store onboarding data in localStorage to trigger onboarding flow
    localStorage.setItem("needsOnboarding", "true");
    localStorage.setItem("onboardingData", JSON.stringify(onboardingData));
    localStorage.setItem("firstTimeUser", "true");
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      navigate(`/dashboard/student`);
      
      toast({
        title: "Welcome to Sakha AI!",
        description: "Your personalized dashboard is ready.",
      });
    }, 2000);
  };
  
  const renderStep = () => {
    switch (step) {
      case "role":
        return (
          <div className="grid grid-cols-2 gap-4">
            {["Student", "Employee", "Doctor", "Founder"].map((role) => (
              <Button
                key={role}
                onClick={() => handleRoleSelect(role as UserRole)}
                className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-6 flex flex-col items-center"
                variant="outline"
              >
                <span className="text-xl mb-2">
                  {role === "Student" ? "🎓" : 
                   role === "Employee" ? "💼" :
                   role === "Doctor" ? "🏥" : "🚀"}
                </span>
                <span>{role}</span>
              </Button>
            ))}
          </div>
        );
        
      case "demographics":
        return (
          <form onSubmit={handleDemographicsSubmit} className="space-y-4">
            {onboardingData.role === "Student" && (
              <>
                <div>
                  <Label htmlFor="age">Age</Label>
                  <Input id="age" name="age" required />
                </div>
                <div>
                  <Label htmlFor="grade">Class/Grade</Label>
                  <Input id="grade" name="grade" required placeholder="e.g. 12th, B.Tech 2nd year" />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" name="location" required />
                </div>
              </>
            )}
            
            {onboardingData.role === "Employee" && (
              <>
                <div>
                  <Label htmlFor="jobRole">Job Role</Label>
                  <Input id="jobRole" name="jobRole" required />
                </div>
                <div>
                  <Label htmlFor="seniorityLevel">Seniority Level</Label>
                  <Input id="seniorityLevel" name="seniorityLevel" required />
                </div>
                <div>
                  <Label htmlFor="domain">Domain</Label>
                  <Input id="domain" name="domain" required />
                </div>
              </>
            )}
            
            {onboardingData.role === "Doctor" && (
              <>
                <div>
                  <Label htmlFor="specialization">Specialization</Label>
                  <Input id="specialization" name="specialization" required />
                </div>
                <div>
                  <Label htmlFor="institution">Institution</Label>
                  <Input id="institution" name="institution" required />
                </div>
                <div>
                  <Label htmlFor="research">Ongoing Research</Label>
                  <Input id="research" name="research" required />
                </div>
              </>
            )}
            
            {onboardingData.role === "Founder" && (
              <>
                <div>
                  <Label htmlFor="startupStage">Startup Stage</Label>
                  <Input id="startupStage" name="startupStage" required />
                </div>
                <div>
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input id="teamSize" name="teamSize" required />
                </div>
                <div>
                  <Label htmlFor="industry">Industry</Label>
                  <Input id="industry" name="industry" required />
                </div>
              </>
            )}
            
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-700">Next</Button>
          </form>
        );
        
      case "goal":
        return (
          <div className="space-y-4">
            {onboardingData.role === "Student" && (
              <div className="grid grid-cols-1 gap-3">
                {studentGoals.map((goal) => (
                  <Button
                    key={goal}
                    onClick={() => handleGoalSelect(goal)}
                    className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-3 justify-start"
                    variant="outline"
                  >
                    {goal}
                  </Button>
                ))}
              </div>
            )}
            
            {onboardingData.role !== "Student" && (
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const goal = formData.get("goal") as string;
                handleGoalSelect(goal);
              }} className="space-y-4">
                <div>
                  <Label htmlFor="goal">Your Primary Goal</Label>
                  <Input id="goal" name="goal" required />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-700">Next</Button>
              </form>
            )}
          </div>
        );
        
      case "personality":
        return (
          <div className="space-y-4">
            <RadioGroup defaultValue="">
              {personalityTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-blue-50" onClick={() => handlePersonalitySelect(type)}>
                  <RadioGroupItem value={type} id={type} />
                  <Label htmlFor={type} className="flex-grow cursor-pointer">{type}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
        
      case "sentiment":
        return (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {moodOptions.map((mood) => (
              <Button
                key={mood}
                onClick={() => handleMoodSelect(mood)}
                className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-4 flex flex-col items-center"
                variant="outline"
              >
                <span className="text-2xl mb-2">{mood.split(" ")[0]}</span>
                <span>{mood.split(" ")[1]}</span>
              </Button>
            ))}
          </div>
        );
        
      case "habits":
        return (
          <form onSubmit={handleHabitsSubmit} className="space-y-4">
            <div>
              <Label htmlFor="sleepPattern">Sleep Pattern</Label>
              <Input id="sleepPattern" name="sleepPattern" placeholder="e.g. 6-8 hours daily" required />
            </div>
            <div>
              <Label htmlFor="dailyRoutine">Daily Routine</Label>
              <Input id="dailyRoutine" name="dailyRoutine" placeholder="e.g. Morning study, evening review" required />
            </div>
            <div>
              <Label htmlFor="stressManagement">Stress Management Methods</Label>
              <Input id="stressManagement" name="stressManagement" placeholder="e.g. Meditation, exercise" required />
            </div>
            <div>
              <Label htmlFor="focusDuration">Focus Duration</Label>
              <Input id="focusDuration" name="focusDuration" placeholder="e.g. 45 minutes with 15-minute breaks" required />
            </div>
            <div>
              <Label htmlFor="studyPreference">Study Preference</Label>
              <Input id="studyPreference" name="studyPreference" placeholder="e.g. Visual learning, group study" required />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-700">Next</Button>
          </form>
        );
        
      case "interests":
        return (
          <form onSubmit={handleInterestsSubmit} className="space-y-4">
            <div>
              <Label htmlFor="interests">Your Interests (comma-separated)</Label>
              <Input id="interests" name="interests" placeholder="e.g. Math, Coding, Music, Writing" required />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-700">Next</Button>
          </form>
        );
        
      case "signup":
        return (
          <form onSubmit={handleSignupSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formValues.name} 
                onChange={handleFormChange} 
                required 
              />
            </div>
            <div>
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input 
                id="mobile" 
                name="mobile" 
                value={formValues.mobile} 
                onChange={handleFormChange} 
                required 
                type="tel"
              />
            </div>
            {formValues.mobile && (
              <Button 
                type="button" 
                className="w-full" 
                variant="outline"
                onClick={handleRequestOtp}
              >
                Get OTP
              </Button>
            )}
            {formValues.mobile && (
              <div>
                <Label htmlFor="otp">OTP</Label>
                <Input 
                  id="otp" 
                  name="otp" 
                  value={formValues.otp} 
                  onChange={handleFormChange} 
                  required 
                />
              </div>
            )}
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700"
              disabled={isLoading || !formValues.name || !formValues.mobile || !formValues.otp}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
              </p>
            </div>
          </form>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl shadow-xl border-gray-200 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <CardTitle className="text-2xl flex items-center">
            <img 
              src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
              alt="Sakha AI Logo" 
              className="w-10 h-10 mr-3" 
            />
            Sakha AI Onboarding
          </CardTitle>
          <CardDescription className="text-blue-100">
            Let's personalize your learning experience
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid md:grid-cols-2">
            <div className="bg-gray-50 p-6 max-h-[600px] overflow-y-auto">
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <ChatMessage 
                    key={index} 
                    content={msg.content} 
                    isBot={msg.isBot} 
                  />
                ))}
              </div>
            </div>
            <div className="p-6">
              {renderStep()}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
