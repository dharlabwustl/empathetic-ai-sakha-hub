
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ChatMessage from "@/components/signup/ChatMessage";
import { ArrowRight, X, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UserRole, OnboardingData } from "@/types/user";
import OnboardingQuestions from "@/components/signup/OnboardingQuestions";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [messages, setMessages] = useState([
    { type: "bot", content: "Hello! I'm Sakha AI, your personalized education assistant. Let's get to know you better!" },
  ]);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});

  const roles = [
    { id: "Student", label: "Student", description: "Preparing for exams and academic success", icon: "📚" },
    { id: "Employee", label: "Working Professional", description: "Career growth and skill development", icon: "💼" },
    { id: "Doctor", label: "Medical Professional", description: "Research and medical advancement", icon: "🩺" },
    { id: "Founder", label: "Entrepreneur/Founder", description: "Building and growing your startup", icon: "🚀" },
  ];

  const handleNextStep = () => {
    if (step === 1) {
      if (!name.trim()) {
        toast({
          title: "Name required",
          description: "Please enter your name to continue",
          variant: "destructive",
        });
        return;
      }
      
      setMessages([
        ...messages,
        { type: "bot", content: `Nice to meet you, ${name}! What's your mobile number?` },
      ]);
      setStep(2);
    } else if (step === 2) {
      if (!phone.trim() || phone.length < 10) {
        toast({
          title: "Valid phone number required",
          description: "Please enter a valid phone number to continue",
          variant: "destructive",
        });
        return;
      }
      
      setMessages([
        ...messages,
        { type: "user", content: phone },
        { type: "bot", content: "Great! Now, tell me which role best describes you?" },
      ]);
      setStep(3);
    } else if (step === 3) {
      if (!selectedRole) {
        toast({
          title: "Selection required",
          description: "Please select a role to continue",
          variant: "destructive",
        });
        return;
      }
      
      // Show appropriate role-specific onboarding questions
      setShowOnboarding(true);
    }
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    
    setMessages([
      ...messages,
      { type: "user", content: `I am a ${role.toLowerCase()}` },
    ]);
  };

  const handleOnboardingComplete = (data: any) => {
    setOnboardingData({
      ...onboardingData,
      role: selectedRole,
      name,
      phoneNumber: phone,
      ...data,
    });
    
    setMessages([
      ...messages,
      { type: "bot", content: "All set! Your personalized AI assistant is ready. Let's create your smart study plan." },
    ]);
    
    toast({
      title: "Account created!",
      description: "Your AI assistant is ready to help you succeed."
    });
    
    // Redirect to dashboard after a brief delay
    setTimeout(() => {
      navigate(`/dashboard/${selectedRole?.toLowerCase()}`);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNextStep();
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-white to-violet-100 dark:from-sky-900/30 dark:via-gray-900 dark:to-violet-900/30 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-sky-600 to-violet-600 p-6 flex justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Create Your Account</h1>
              <p className="text-sky-100">Your personalized AI learning assistant awaits</p>
            </div>
            <button 
              onClick={handleClose} 
              className="text-white hover:bg-white/20 p-1.5 rounded-full"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat interface */}
          <div className="p-6 max-h-[500px] overflow-y-auto">
            <div className="space-y-6">
              {messages.map((message, idx) => (
                <ChatMessage 
                  key={idx} 
                  type={message.type as "bot" | "user"} 
                  content={message.content} 
                />
              ))}
            </div>
            
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="name-input"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <form onSubmit={handleSubmit} className="mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="py-6 px-4"
                      />
                    </div>
                  </form>
                </motion.div>
              )}
              
              {step === 2 && (
                <motion.div
                  key="phone-input"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <form onSubmit={handleSubmit} className="mt-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Mobile Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="py-6 px-4"
                      />
                    </div>
                  </form>
                </motion.div>
              )}
              
              {step === 3 && !showOnboarding && (
                <motion.div
                  key="role-selection"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <RadioGroup
                    value={selectedRole || ""}
                    onValueChange={(value) => handleRoleSelect(value as UserRole)}
                    className="mt-6 space-y-3"
                  >
                    {roles.map((role) => (
                      <div
                        key={role.id}
                        className={`flex items-center border rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-50 dark:hover:bg-gray-700 ${
                          selectedRole === role.id
                            ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20"
                            : "border-gray-200 dark:border-gray-700"
                        }`}
                        onClick={() => handleRoleSelect(role.id as UserRole)}
                      >
                        <RadioGroupItem
                          value={role.id}
                          id={role.id}
                          className="mr-3"
                        />
                        <div className="mr-4 text-2xl">{role.icon}</div>
                        <div>
                          <Label htmlFor={role.id} className="text-base font-medium">
                            {role.label}
                          </Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {role.description}
                          </p>
                        </div>
                        {selectedRole === role.id && (
                          <CheckCircle2 className="ml-auto text-sky-500" size={18} />
                        )}
                      </div>
                    ))}
                  </RadioGroup>
                </motion.div>
              )}

              {showOnboarding && selectedRole && (
                <OnboardingQuestions 
                  role={selectedRole} 
                  onComplete={handleOnboardingComplete} 
                  onClose={() => setShowOnboarding(false)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
            {!showOnboarding && (
              <div className="flex justify-between items-center">
                <div className="text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-sky-600 dark:text-sky-400 font-medium">
                    Login
                  </Link>
                </div>

                <Button
                  onClick={handleNextStep}
                  className="bg-gradient-to-r from-sky-500 to-violet-500 group"
                >
                  Continue{" "}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
