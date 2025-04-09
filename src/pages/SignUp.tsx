
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { OnboardingData } from "@/components/signup/OnboardingQuestions";
import { useToast } from "@/hooks/use-toast";

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import OnboardingQuestions from "@/components/signup/OnboardingQuestions";
import ChatMessage from "@/components/signup/ChatMessage";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    userType: "",
    goals: [],
    examDate: "",
    examType: "",
    studyHours: "",
    topicStrengths: [],
    topicWeaknesses: [],
    preferredStyle: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulating API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      
      toast({
        title: "Account created!",
        description: "Now let's set up your personalized experience.",
      });
    }, 1500);
  };
  
  const handleOnboardingComplete = (data: OnboardingData) => {
    setOnboardingData(data);
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to the dashboard based on user type
      navigate(`/dashboard/${data.userType.toLowerCase()}`);
      
      toast({
        title: "Setup complete!",
        description: "Your personalized dashboard is ready.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10 flex items-center justify-center p-4">
      {step === 1 ? (
        <Card className="w-full max-w-md shadow-xl border-gray-200 dark:border-gray-700">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>
              Enter your details to get started with Sakha AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                    value={formValues.name}
                    onChange={handleFormChange}
                    className="border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formValues.email}
                    onChange={handleFormChange}
                    className="border-gray-200 dark:border-gray-700"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formValues.password}
                    onChange={handleFormChange}
                    className="border-gray-200 dark:border-gray-700"
                  />
                </div>
                <Button 
                  type="submit"
                  className="bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </div>
            </form>

            <div className="mt-6 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-gray-200 dark:border-gray-700">
                  <img src="https://api.iconify.design/flat-color-icons:google.svg" className="w-5 h-5 mr-2" />
                  Google
                </Button>
                <Button variant="outline" className="border-gray-200 dark:border-gray-700">
                  <img src="https://api.iconify.design/devicon:apple.svg" className="w-5 h-5 mr-2" />
                  Apple
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pb-5">
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary underline-offset-4 hover:underline"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      ) : (
        <div className="w-full max-w-2xl">
          <Card className="shadow-xl border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle>Let's personalize your experience</CardTitle>
              <CardDescription>
                Answer a few questions to help us tailor Sakha AI to your needs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-6">
                <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 pr-6">
                  <ChatMessage
                    isBot={true}
                    message="Hi there! I'm Sakha AI. I'll help customize your learning experience."
                  />
                  <ChatMessage
                    isBot={true}
                    message="Please answer a few questions about your learning goals."
                  />
                  <ChatMessage
                    isBot={false}
                    message="Sure, I'm ready to get started!"
                  />
                </div>
                <div className="w-2/3">
                  <OnboardingQuestions 
                    onComplete={handleOnboardingComplete}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SignUp;
