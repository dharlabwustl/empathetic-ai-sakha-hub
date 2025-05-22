
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ShieldCheck, Eye, EyeOff, Mail, Lock, Phone, Mic } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StudentLoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({ emailOrPhone: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<"email" | "phone">("email");
  const [isListening, setIsListening] = useState(false);

  // Check for saved credentials when component mounts
  useEffect(() => {
    const savedEmailOrPhone = localStorage.getItem("prepzr_remembered_login");
    if (savedEmailOrPhone) {
      setCredentials(prev => ({ ...prev, emailOrPhone: savedEmailOrPhone }));
      setRememberMe(true);
    }

    // Clear any admin login attempt flag when in student login
    localStorage.removeItem('admin_login_attempt');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    if (loginError) setLoginError(null);
  };

  const validateForm = () => {
    if (!credentials.emailOrPhone) {
      setLoginError(loginType === "email" ? "Email is required" : "Phone number is required");
      return false;
    }
    if (!credentials.password) {
      setLoginError("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setLoginError(null);
    
    try {
      // Clear any existing admin session
      localStorage.removeItem('admin_logged_in');
      localStorage.removeItem('admin_user');
      
      // Login as student
      await login(credentials.emailOrPhone, credentials.password);
      
      // Handle remember me functionality
      if (rememberMe) {
        localStorage.setItem("prepzr_remembered_login", credentials.emailOrPhone);
      } else {
        localStorage.removeItem("prepzr_remembered_login");
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back to PREPZR"
      });
      
      // Redirect to dashboard using the specified URL
      window.location.href = "https://preview--empathetic-ai-sakha-hub.lovable.app/dashboard/student";
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Invalid email/phone or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setLoginError(null);
    
    try {
      // Clear any existing admin session
      localStorage.removeItem('admin_logged_in');
      localStorage.removeItem('admin_user');
      
      // Login with demo credentials
      await login("demo@prepzr.com", "demo123");
      
      toast({
        title: "Demo Login successful",
        description: "Welcome to the demo account"
      });
      
      // Redirect to dashboard using the specified URL
      window.location.href = "https://preview--empathetic-ai-sakha-hub.lovable.app/dashboard/student";
    } catch (error) {
      console.error("Demo login error:", error);
      setLoginError("Demo login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  // Voice recognition for login form
  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support voice recognition",
        variant: "destructive"
      });
      return;
    }
    
    setIsListening(true);
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => {
      toast({
        title: "Listening...",
        description: "Say your email or 'demo login'",
      });
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      
      if (transcript.includes('demo') || transcript.includes('login as demo')) {
        handleDemoLogin();
      } else if (transcript.includes('@')) {
        // Likely an email
        setLoginType('email');
        setCredentials(prev => ({ ...prev, emailOrPhone: transcript.replace(/\s+/g, '').trim() }));
      } else if (/^\d+$/.test(transcript.replace(/\s+/g, ''))) {
        // Likely a phone number
        setLoginType('phone');
        setCredentials(prev => ({ ...prev, emailOrPhone: transcript.replace(/\s+/g, '').trim() }));
      } else if (transcript.includes('password')) {
        // Extract password after the word "password"
        const passwordMatch = transcript.match(/password\s+(.+)$/i);
        if (passwordMatch && passwordMatch[1]) {
          setCredentials(prev => ({ ...prev, password: passwordMatch[1].trim() }));
        }
      } else if (transcript.includes('submit') || transcript.includes('login')) {
        handleSubmit({ preventDefault: () => {} } as React.FormEvent);
      } else {
        toast({
          title: "Voice input not recognized",
          description: "Please try again with clear commands",
        });
      }
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: "Voice recognition error",
        description: "Please try again or use keyboard input",
        variant: "destructive"
      });
    };
    
    recognition.start();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {loginError && (
        <Alert variant="destructive">
          <AlertDescription>{loginError}</AlertDescription>
        </Alert>
      )}
      
      <div className="space-y-2">
        <Tabs defaultValue="email" onValueChange={(val) => setLoginType(val as "email" | "phone")} className="w-full">
          <TabsList className="grid grid-cols-2 mb-2">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>
          
          <TabsContent value="email" className="mt-0">
            <Label htmlFor="emailOrPhone">Email Address</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Mail size={16} />
              </div>
              <Input
                id="emailOrPhone"
                name="emailOrPhone"
                type="email"
                placeholder="Enter your email"
                value={credentials.emailOrPhone}
                onChange={handleChange}
                className={`pl-9 ${loginError && !credentials.emailOrPhone ? "border-red-500" : ""}`}
                autoComplete="email"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="phone" className="mt-0">
            <Label htmlFor="emailOrPhone">Phone Number</Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                <Phone size={16} />
              </div>
              <Input
                id="emailOrPhone"
                name="emailOrPhone"
                type="tel"
                placeholder="Enter your phone number"
                value={credentials.emailOrPhone}
                onChange={handleChange}
                className={`pl-9 ${loginError && !credentials.emailOrPhone ? "border-red-500" : ""}`}
                autoComplete="tel"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Button
            type="button"
            variant="link"
            className="p-0 h-auto text-xs"
            onClick={handleForgotPassword}
          >
            Forgot password?
          </Button>
        </div>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Lock size={16} />
          </div>
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={credentials.password}
            onChange={handleChange}
            className={`pl-9 pr-10 ${loginError && !credentials.password ? "border-red-500" : ""}`}
            autoComplete="current-password"
          />
          <Button
            type="button" 
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remember" 
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(!!checked)}
          />
          <Label htmlFor="remember" className="text-sm">Remember me</Label>
        </div>
        
        {/* Voice input button */}
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={startVoiceRecognition}
          disabled={isListening || isLoading}
        >
          <Mic size={14} className={isListening ? "animate-pulse text-red-500" : ""} />
          {isListening ? "Listening..." : "Voice Input"}
        </Button>
      </div>
      
      <div className="space-y-2">
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            <>
              <ShieldCheck className="mr-2 h-4 w-4" />
              Login
            </>
          )}
        </Button>
        
        <Button 
          type="button" 
          variant="outline" 
          className="w-full mt-2" 
          onClick={handleDemoLogin}
          disabled={isLoading}
          role="demo-login"
        >
          Use Demo Account
        </Button>
      </div>
      
      <div className="text-center text-sm">
        <span className="text-gray-500">Don't have an account? </span>
        <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/signup")}>
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default StudentLoginForm;
