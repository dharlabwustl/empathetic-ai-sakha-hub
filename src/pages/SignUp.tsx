
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ExamGoal, PersonalityType, UserRole, OnboardingData } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, ArrowRight, User, Book, Briefcase, Stethoscope, Rocket } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  const [showGradeOptions, setShowGradeOptions] = useState(false);
  const [showExamGoalOptions, setShowExamGoalOptions] = useState(false);
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
          content: "Great! What class/grade are you in?" 
        }]);
        setShowGradeOptions(true);
      } else {
        setMessages(prev => [...prev, { 
          type: "bot", 
          content: "Please enter your name to continue" 
        }]);
        setShowNameInput(true);
      }
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
        content: "Are you preparing for any of these exams?" 
      }]);
      setShowExamGoalOptions(true);
    }, 500);
  };

  const handleExamGoalSelection = (examGoal: ExamGoal) => {
    setOnboardingData(prev => ({ ...prev, examGoal }));
    setShowExamGoalOptions(false);
    
    // Add user selection to chat
    setMessages(prev => [...prev, { 
      type: "user", 
      content: examGoal 
    }]);
    
    // Bot follow-up
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: "bot", 
        content: "Please enter your name to continue" 
      }]);
      setShowNameInput(true);
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
      if (showNameInput) {
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

  const examGoals: ExamGoal[] = [
    "IIT JEE",
    "NEET",
    "MBA",
    "CUET UG",
    "UPSC",
    "CLAT",
    "BANK PO"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-500 to-violet-500 p-4">
      <Card className="w-full max-w-4xl shadow-xl overflow-hidden bg-white rounded-xl">
        <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white py-6">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-white/50">
              <AvatarImage src="/lovable-uploads/c34ee0e2-be15-44a9-971e-1c65aa62095a.png" alt="Sakha AI" />
              <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-blue-500">SA</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">Sakha AI</h1>
              <p className="text-blue-100">Your personalized learning companion</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="h-[400px] overflow-y-auto p-6 bg-gray-50">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex mb-4 ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === "user" 
                      ? "bg-blue-600 text-white rounded-br-none" 
                      : "bg-white border border-gray-200 rounded-bl-none"
                  }`}
                >
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}

            {/* Role Selection Options */}
            {showRoleOptions && (
              <div className="my-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button 
                  onClick={() => handleRoleSelection("Student")}
                  className="flex justify-start gap-2 p-4 h-auto bg-white text-blue-700 border border-blue-200 hover:bg-blue-50"
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
                  className="flex justify-start gap-2 p-4 h-auto bg-white text-blue-700 border border-blue-200 hover:bg-blue-50"
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
                  className="flex justify-start gap-2 p-4 h-auto bg-white text-blue-700 border border-blue-200 hover:bg-blue-50"
                  variant="outline"
                >
                  <Stethoscope className="h-5 w-5" />
                  <div className="text-left">
                    <div className="font-medium">Doctor / Researcher</div>
                    <div className="text-xs text-gray-500">For research & medical expertise</div>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => handleRoleSelection("Founder")}
                  className="flex justify-start gap-2 p-4 h-auto bg-white text-blue-700 border border-blue-200 hover:bg-blue-50"
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

            {/* Grade Selection Options */}
            {showGradeOptions && (
              <div className="my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {grades.map((grade) => (
                  <Button 
                    key={grade}
                    onClick={() => handleGradeSelection(grade)}
                    className="bg-white text-blue-700 border border-blue-200 hover:bg-blue-50"
                    variant="outline"
                  >
                    <Book className="h-4 w-4 mr-2" />
                    {grade}
                  </Button>
                ))}
              </div>
            )}

            {/* Exam Goal Selection Options */}
            {showExamGoalOptions && (
              <div className="my-4 grid grid-cols-1 gap-2">
                {examGoals.map((goal) => (
                  <Button 
                    key={goal}
                    onClick={() => handleExamGoalSelection(goal)}
                    className="flex justify-between w-full bg-white text-blue-700 border border-blue-200 hover:bg-blue-50"
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
          </div>
        </CardContent>
        
        <CardFooter className="p-4 bg-white border-t">
          <div className="flex w-full gap-2">
            {(showNameInput || showPhoneInput) && (
              <Input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={showNameInput ? "Enter your name" : "Enter your phone number"}
                className="flex-grow"
              />
            )}
            
            {showNameInput && (
              <Button onClick={handleNameSubmit}>
                <Send className="h-4 w-4 mr-1" />
                Send
              </Button>
            )}
            
            {showPhoneInput && (
              <Button onClick={handlePhoneSubmit}>
                <Send className="h-4 w-4 mr-1" />
                Verify
              </Button>
            )}
          </div>
          
          <div className="w-full mt-4 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
