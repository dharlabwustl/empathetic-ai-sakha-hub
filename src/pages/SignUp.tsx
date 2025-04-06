
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
import { ExamGoal, PersonalityType } from "@/types/user";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    grade: "",
    examGoal: "",
    learningStyle: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match",
          variant: "destructive",
        });
        return;
      }
      
      setStep(2);
      return;
    }
    
    if (step === 2) {
      if (!formData.grade) {
        toast({
          title: "Error",
          description: "Please select your class/grade",
          variant: "destructive",
        });
        return;
      }
      
      setStep(3);
      return;
    }
    
    if (step === 3) {
      if (!formData.examGoal) {
        toast({
          title: "Error",
          description: "Please select an exam goal",
          variant: "destructive",
        });
        return;
      }
      
      // In a real application, you would submit the form to a server here
      toast({
        title: "Success",
        description: "Account created successfully!",
      });
      
      // Redirect to the appropriate dashboard based on the exam goal
      navigate("/dashboard/student");
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

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <Button className="w-full mt-4" type="submit">Next</Button>
          </>
        );
        
      case 2:
        return (
          <>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="grade">What class/grade are you in?</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("grade", value)}
                >
                  <SelectTrigger id="grade" className="bg-background">
                    <SelectValue placeholder="Select your class/grade" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-between gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="w-1/2"
              >
                Back
              </Button>
              <Button type="submit" className="w-1/2">
                Next
              </Button>
            </div>
          </>
        );
        
      case 3:
        return (
          <>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="examGoal">Are you preparing for any of these exams?</Label>
                <Select
                  onValueChange={(value) => handleSelectChange("examGoal", value)}
                >
                  <SelectTrigger id="examGoal" className="bg-background">
                    <SelectValue placeholder="Select your exam goal" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    {examGoals.map((goal) => (
                      <SelectItem key={goal} value={goal}>
                        {goal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-between gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="w-1/2"
              >
                Back
              </Button>
              <Button type="submit" className="w-1/2">
                Create Account
              </Button>
            </div>
          </>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-gray-500">Step {step} of 3</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
          </form>
        </CardContent>
        
        <CardFooter className="flex flex-col items-center justify-center space-y-2">
          <div className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
