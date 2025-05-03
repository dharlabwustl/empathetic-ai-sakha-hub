
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

interface PostLoginPromptProps {
  returnUrl?: string;
}

const PostLoginPrompt: React.FC<PostLoginPromptProps> = ({ returnUrl }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleContinue = () => {
    if (returnUrl) {
      navigate(returnUrl);
    } else {
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
              className="rounded-full bg-blue-100 p-3"
            >
              <CheckCircle className="h-10 w-10 text-blue-600" />
            </motion.div>
          </div>
          <CardTitle className="text-center text-2xl">Welcome back!</CardTitle>
          <CardDescription className="text-center text-lg">
            Great to see you again, {user?.name || 'Student'}!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center">
            You've successfully logged in. Ready to continue your learning journey?
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
            <h4 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Your Progress</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Study Plan Completion</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="w-full bg-blue-100 dark:bg-blue-800/40 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Practice Tests Taken</span>
                  <span className="font-medium">8/20</span>
                </div>
                <div className="w-full bg-blue-100 dark:bg-blue-800/40 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Flashcards Mastered</span>
                  <span className="font-medium">32/60</span>
                </div>
                <div className="w-full bg-blue-100 dark:bg-blue-800/40 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '53%' }}></div>
                </div>
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
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PostLoginPrompt;
