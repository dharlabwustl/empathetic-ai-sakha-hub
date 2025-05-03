
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface WelcomeToPreprProps {
  userName?: string;
  onNext?: () => void;
}

const WelcomeToPrepr: React.FC<WelcomeToPreprProps> = ({
  userName = "Student",
  onNext
}) => {
  const navigate = useNavigate();
  
  // Set the first-time user flag when this component mounts
  useEffect(() => {
    localStorage.setItem('new_user_signup', 'true');
  }, []);
  
  const handleContinue = () => {
    if (onNext) {
      onNext();
    } else {
      // Create a study plan and navigate to dashboard
      localStorage.setItem('study_plan_created', 'true');
      navigate('/dashboard/student');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="mb-2 flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="rounded-full bg-green-100 p-3"
            >
              <CheckCircle className="h-10 w-10 text-green-600" />
            </motion.div>
          </div>
          <CardTitle className="text-center text-2xl">Welcome to PREPZR!</CardTitle>
          <CardDescription className="text-center text-lg">
            Congratulations, {userName}! Your account has been created successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">
            You're all set to start your personalized learning journey. Our AI-powered platform
            will help you prepare for your exams with customized study plans, interactive
            practice tests, and real-time performance tracking.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Personalized Study Plans</h4>
                <p className="text-sm text-muted-foreground">
                  Tailored to your learning style and pace
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">AI Tutor</h4>
                <p className="text-sm text-muted-foreground">
                  Get help when you need it, 24/7
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Smart Flashcards</h4>
                <p className="text-sm text-muted-foreground">
                  Memorize key concepts effectively
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 rounded-full p-2">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">Performance Analytics</h4>
                <p className="text-sm text-muted-foreground">
                  Track your progress and improve
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full"
            size="lg"
            onClick={handleContinue}
          >
            Continue to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WelcomeToPrepr;
