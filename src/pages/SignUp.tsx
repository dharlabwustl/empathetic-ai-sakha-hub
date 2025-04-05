
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Book, Briefcase, Stethoscope, Rocket, Send, Smile, Heart, Brain } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [userRole, setUserRole] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    otp: "",
  });
  const [chatMessages, setChatMessages] = useState([
    { 
      type: "bot", 
      content: "Hi, I'm Sakha – your personal AI companion for learning, growth, and well-being. What best describes you?" 
    }
  ]);

  const handleRoleSelect = (role: string) => {
    setUserRole(role);
    setChatMessages([
      ...chatMessages,
      { type: "user", content: `I'm a ${role.toLowerCase()}.` },
    ]);
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        type: "bot", 
        content: `Great! As a ${role.toLowerCase()}, Sakha will customize your experience with relevant tools and features. Can you tell me more about yourself?` 
      }]);
    }, 800);
    
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendOtp = () => {
    if (!formData.phoneNumber || formData.phoneNumber.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number.",
        variant: "destructive"
      });
      return;
    }
    
    setChatMessages([
      ...chatMessages,
      { type: "user", content: `My phone number is ${formData.phoneNumber}.` },
    ]);
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        type: "bot", 
        content: "Great! I've sent a verification code to your phone." 
      }]);
    }, 800);
    
    toast({
      title: "OTP Sent",
      description: "A verification code has been sent to your phone.",
    });
    
    setStep(3);
  };

  const handleVerifyOtp = () => {
    if (!formData.otp || formData.otp.length < 4) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a valid verification code.",
        variant: "destructive"
      });
      return;
    }
    
    setChatMessages([
      ...chatMessages,
      { type: "user", content: `My verification code is ${formData.otp}.` },
    ]);
    
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        type: "bot", 
        content: "Perfect! Your phone number has been verified. Welcome to Sakha AI!" 
      }]);
    }, 800);
    
    toast({
      title: "Verification Successful",
      description: "Your account has been created successfully!",
    });
    
    setTimeout(() => {
      navigate(`/dashboard/${userRole.toLowerCase()}`);
    }, 2000);
  };
  
  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    
    setChatMessages([...chatMessages, { type: "user", content: message }]);
    
    // Simulate bot response
    setTimeout(() => {
      let response;
      if (step === 2) {
        response = "Great! To create your personalized experience, I'll need your phone number for verification.";
      } else if (step === 3) {
        response = "Now, please enter the verification code sent to your phone.";
      } else {
        response = "I'd be happy to help with that! Let me know if you have any specific questions.";
      }
      
      setChatMessages(prev => [...prev, { type: "bot", content: response }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sakha-light-blue/10 via-white to-sakha-lavender/10 flex flex-col">
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-10">
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
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                    <p className="mb-4 text-gray-600">
                      Choose the option that best describes you for a personalized experience:
                    </p>
                    <RadioGroup 
                      className="grid grid-cols-2 gap-4"
                      value={userRole}
                      onValueChange={handleRoleSelect}
                    >
                      <div className={`border rounded-xl p-4 cursor-pointer transition-all ${
                        userRole === "Student" ? "border-sakha-blue bg-sakha-blue/5" : "hover:bg-gray-50"
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
                          <Book size={32} className={userRole === "Student" ? "text-sakha-blue" : ""} />
                          <span className="font-medium">Student</span>
                        </Label>
                      </div>
                      
                      <div className={`border rounded-xl p-4 cursor-pointer transition-all ${
                        userRole === "Employee" ? "border-sakha-blue bg-sakha-blue/5" : "hover:bg-gray-50"
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
                          <Briefcase size={32} className={userRole === "Employee" ? "text-sakha-blue" : ""} />
                          <span className="font-medium">Employee</span>
                        </Label>
                      </div>
                      
                      <div className={`border rounded-xl p-4 cursor-pointer transition-all ${
                        userRole === "Doctor" ? "border-sakha-blue bg-sakha-blue/5" : "hover:bg-gray-50"
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
                          <Stethoscope size={32} className={userRole === "Doctor" ? "text-sakha-blue" : ""} />
                          <span className="font-medium">Doctor / Researcher</span>
                        </Label>
                      </div>
                      
                      <div className={`border rounded-xl p-4 cursor-pointer transition-all ${
                        userRole === "Founder" ? "border-sakha-blue bg-sakha-blue/5" : "hover:bg-gray-50"
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
                          <Rocket size={32} className={userRole === "Founder" ? "text-sakha-blue" : ""} />
                          <span className="font-medium">Founder</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    step >= 2 ? "bg-sakha-blue text-white" : "bg-gray-200 text-gray-500"
                  }`}>2</div>
                  <h3 className="font-medium">Phone Verification</h3>
                </div>
                
                {step === 2 && (
                  <div className="mt-4 animate-fade-in">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber">Phone Number</Label>
                        <Input
                          id="phoneNumber"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          type="tel"
                        />
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-sakha-blue to-sakha-purple text-white"
                        onClick={handleSendOtp}
                      >
                        Send Verification Code
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                    step >= 3 ? "bg-sakha-blue text-white" : "bg-gray-200 text-gray-500"
                  }`}>3</div>
                  <h3 className="font-medium">OTP Verification</h3>
                </div>
                
                {step === 3 && (
                  <div className="mt-4 animate-fade-in">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="otp">Verification Code</Label>
                        <Input
                          id="otp"
                          name="otp"
                          value={formData.otp}
                          onChange={handleInputChange}
                          placeholder="Enter the code sent to your phone"
                          maxLength={6}
                        />
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-sakha-blue to-sakha-purple text-white"
                        onClick={handleVerifyOtp}
                      >
                        Verify & Create Account
                      </Button>
                    </div>
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
  );
};

export default SignUp;
