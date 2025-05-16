
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMultistepForm } from "@/hooks/useMultiStepForm";
import { useOnboardingContext } from "./OnboardingContext";

import { Eye, EyeOff, ArrowLeft, ArrowRight, BookOpen, Calculator, Microscope, FlaskConical } from "lucide-react";

const SignupContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { formData, updateFormData, resetFormData } = useOnboardingContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [loginMode, setLoginMode] = useState<"email" | "phone">("email");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [subjects, setSubjects] = useState<string[]>([]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // Handle form submission
  const handleSubmit = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordMatchError(true);
      return;
    }
    setPasswordMatchError(false);
    
    // Store user data
    localStorage.setItem('userData', JSON.stringify({
      name: formData.firstName + ' ' + formData.lastName,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      school: formData.school,
      grade: formData.grade,
      goal: formData.goal,
      subjects: formData.subjects
    }));
    
    // Set login state
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('new_user_signup', 'true');
    
    // Trigger auth state change event
    window.dispatchEvent(new Event('auth-state-changed'));
    
    // Show success toast
    toast({
      title: "Account created successfully!",
      description: "Welcome to PREPZR. Let's start your learning journey.",
    });
    
    // Navigate to welcome back page
    navigate('/welcome-back');
  };

  // Define form steps
  const { step, currentStepIndex, next, back, isFirstStep, isLastStep } = useMultistepForm([
    <PersonalInfoForm />,
    <GoalForm />,
    <SubjectsForm />,
  ]);

  // Update subjects when goal changes
  useEffect(() => {
    if (formData.goal === "NEET") {
      setSubjects(["Physics", "Chemistry", "Biology", "Botany", "Zoology"]);
    } else if (formData.goal === "JEE") {
      setSubjects(["Physics", "Chemistry", "Mathematics"]);
    } else {
      setSubjects(["Physics", "Chemistry", "Biology", "Mathematics"]);
    }
  }, [formData.goal]);

  function PersonalInfoForm() {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
            <Input
              id="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => updateFormData({ firstName: e.target.value })}
              className="mt-1"
              required
            />
          </div>
          <div>
            <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => updateFormData({ lastName: e.target.value })}
              className="mt-1"
              required
            />
          </div>
        </div>

        <div>
          <RadioGroup
            value={loginMode}
            onValueChange={(value) => setLoginMode(value as "email" | "phone")}
            className="flex space-x-4 my-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="email" />
              <Label htmlFor="email" className="cursor-pointer">Email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="phone" id="phone" />
              <Label htmlFor="phone" className="cursor-pointer">Phone</Label>
            </div>
          </RadioGroup>

          {loginMode === "email" ? (
            <div>
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => updateFormData({ email: e.target.value })}
                className="mt-1"
                required
              />
            </div>
          ) : (
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Your phone number"
                value={formData.phone}
                onChange={(e) => updateFormData({ phone: e.target.value })}
                className="mt-1"
                required
              />
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="school" className="text-sm font-medium">School/Institute (Optional)</Label>
            <Input
              id="school"
              placeholder="Your school or institute name"
              value={formData.school}
              onChange={(e) => updateFormData({ school: e.target.value })}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="grade" className="text-sm font-medium">Grade/Year</Label>
            <Select
              value={formData.grade}
              onValueChange={(value) => updateFormData({ grade: value })}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select Grade/Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10th</SelectItem>
                <SelectItem value="11">11th</SelectItem>
                <SelectItem value="12">12th</SelectItem>
                <SelectItem value="year1">Year 1 (College)</SelectItem>
                <SelectItem value="year2">Year 2 (College)</SelectItem>
                <SelectItem value="year3">Year 3 (College)</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="password" className="text-sm font-medium">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => updateFormData({ password: e.target.value })}
              className="mt-1 pr-10"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => {
                updateFormData({ confirmPassword: e.target.value });
                setPasswordMatchError(formData.password !== e.target.value);
              }}
              className={`mt-1 pr-10 ${passwordMatchError ? "border-red-500" : ""}`}
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {passwordMatchError && (
            <span className="text-xs text-red-500">Passwords do not match</span>
          )}
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={acceptedTerms}
            onCheckedChange={(checked) => setAcceptedTerms(checked === true)}
          />
          <Label htmlFor="terms" className="text-xs">
            I accept the <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
          </Label>
        </div>
      </div>
    );
  }

  function GoalForm() {
    return (
      <div className="space-y-6 py-4">
        <div className="text-center pb-4">
          <h3 className="text-lg font-semibold">Choose Your Goal</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            What are you preparing for?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all ${
              formData.goal === "NEET" ? "ring-2 ring-primary bg-primary/5" : ""
            }`}
            onClick={() => updateFormData({ goal: "NEET" })}
          >
            <div className="flex items-center mb-2">
              <div className="bg-purple-100 dark:bg-purple-900/20 p-2 rounded-full mr-2">
                <Microscope className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-medium">NEET</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              National Eligibility cum Entrance Test for medical courses
            </p>
          </div>

          <div
            className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all ${
              formData.goal === "JEE" ? "ring-2 ring-primary bg-primary/5" : ""
            }`}
            onClick={() => updateFormData({ goal: "JEE" })}
          >
            <div className="flex items-center mb-2">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-full mr-2">
                <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-medium">JEE</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Joint Entrance Examination for engineering courses
            </p>
          </div>

          <div
            className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all ${
              formData.goal === "SCHOOL_EXAMS" ? "ring-2 ring-primary bg-primary/5" : ""
            }`}
            onClick={() => updateFormData({ goal: "SCHOOL_EXAMS" })}
          >
            <div className="flex items-center mb-2">
              <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-full mr-2">
                <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-medium">School Exams</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Prepare for your regular school or board examinations
            </p>
          </div>

          <div
            className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-all ${
              formData.goal === "OTHER" ? "ring-2 ring-primary bg-primary/5" : ""
            }`}
            onClick={() => updateFormData({ goal: "OTHER" })}
          >
            <div className="flex items-center mb-2">
              <div className="bg-amber-100 dark:bg-amber-900/20 p-2 rounded-full mr-2">
                <FlaskConical className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h4 className="font-medium">Other</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Other competitive exams or personal learning goals
            </p>
          </div>
        </div>
      </div>
    );
  }

  function SubjectsForm() {
    return (
      <div className="space-y-6 py-4">
        <div className="text-center pb-4">
          <h3 className="text-lg font-semibold">Select Your Subjects</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Choose the subjects you want to focus on
          </p>
        </div>

        <div className="space-y-3">
          {subjects.map((subject) => (
            <div
              key={subject}
              className={`border rounded-lg p-3 cursor-pointer hover:shadow-sm transition-all ${
                formData.subjects?.includes(subject) ? "ring-2 ring-primary bg-primary/5" : ""
              }`}
              onClick={() => {
                const updatedSubjects = formData.subjects?.includes(subject)
                  ? formData.subjects.filter((s) => s !== subject)
                  : [...(formData.subjects || []), subject];
                updateFormData({ subjects: updatedSubjects });
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <h4 className="font-medium">{subject}</h4>
                </div>
                <Checkbox
                  checked={formData.subjects?.includes(subject)}
                  onCheckedChange={() => {}}
                  className="pointer-events-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{isFirstStep ? "Create an Account" : isLastStep ? "Almost There!" : "Your Goals"}</CardTitle>
        <CardDescription>
          {isFirstStep
            ? "Join PREPZR to start your personalized study journey"
            : isLastStep
            ? "Select the subjects you want to focus on"
            : "Tell us what you're preparing for"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isLastStep) {
              handleSubmit();
            } else {
              next();
            }
          }}
        >
          {step}

          <div className="flex justify-between mt-6">
            {!isFirstStep && (
              <Button type="button" variant="outline" onClick={back}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            {isFirstStep && (
              <Button type="button" variant="outline" onClick={() => navigate('/login')}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Login
              </Button>
            )}
            <Button
              type="submit"
              disabled={isFirstStep && !acceptedTerms}
            >
              {isLastStep ? "Create Account" : "Continue"} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignupContent;
