
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, User } from "lucide-react";
import { useOnboarding } from "./OnboardingContext";
import PrepzrLogo from "../common/PrepzrLogo";

const SignUpContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { onboardingData, updateOnboardingData } = useOnboarding();
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Update the form data when onboarding data changes
  useEffect(() => {
    if (onboardingData.name) {
      setFormData(prev => ({
        ...prev,
        name: onboardingData.name
      }));
    }
  }, [onboardingData.name]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  // Validate the form
  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
    
    let isValid = true;
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }
    
    if (!formData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    
    setFormErrors(errors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real application, this would call an API
      console.log("Creating account with:", formData);
      
      // Update onboarding data with user information
      updateOnboardingData({
        ...onboardingData,
        name: formData.name,
        email: formData.email,
      });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create user account (mock)
      const token = `token_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      
      // Save auth data
      localStorage.setItem('sakha_auth_token', token);
      localStorage.setItem('userData', JSON.stringify({
        id: `user_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        role: 'student',
        completedOnboarding: false,
        isNewUser: true,
        sawWelcomeTour: false,
        loginCount: 1,
        lastLogin: new Date().toISOString()
      }));
      
      // Flag that we're dealing with a new signup - this is crucial for triggering the welcome tour
      localStorage.setItem('new_user_signup', 'true');
      
      toast({
        title: "Account created!",
        description: "Your account has been successfully created.",
      });
      
      // Redirect to the welcome flow page with new=true parameter
      navigate("/welcome-flow?new=true");
      
    } catch (error) {
      console.error("Error creating account:", error);
      toast({
        title: "Error creating account",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-xl border-0">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <PrepzrLogo width={150} height={40} />
          </div>
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>
            Join PREPZR and start your learning journey today
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
              {formErrors.name && (
                <p className="text-xs text-red-500 mt-1">{formErrors.name}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
              {formErrors.email && (
                <p className="text-xs text-red-500 mt-1">{formErrors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
              {formErrors.password && (
                <p className="text-xs text-red-500 mt-1">{formErrors.password}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                disabled={isLoading}
                required
              />
              {formErrors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">{formErrors.confirmPassword}</p>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...
                </>
              ) : (
                <>
                  <User className="mr-2 h-4 w-4" /> Create Account
                </>
              )}
            </Button>
            
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 h-auto text-blue-600 hover:text-blue-800"
                onClick={() => navigate("/login")}
                disabled={isLoading}
              >
                Log in
              </Button>
            </div>
            
            <p className="text-xs text-center text-gray-500">
              By creating an account, you agree to our{" "}
              <Button variant="link" className="p-0 h-auto text-gray-500 hover:text-gray-800 text-xs">
                Terms of Service
              </Button>{" "}
              and{" "}
              <Button variant="link" className="p-0 h-auto text-gray-500 hover:text-gray-800 text-xs">
                Privacy Policy
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default SignUpContent;
