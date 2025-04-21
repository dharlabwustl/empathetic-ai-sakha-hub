
import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface CompletedStepProps {
  onboardingData: any;
}

const CompletedStep: React.FC<CompletedStepProps> = ({ onboardingData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto text-center"
    >
      <div className="mb-6 flex justify-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4">Onboarding Complete!</h1>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Thank you for completing your profile, {onboardingData.name || 'Student'}! 
        Your personalized learning plan is now ready.
      </p>

      <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-6 text-left">
        <h3 className="font-medium mb-2">Your Profile Summary</h3>
        <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-400">
          {onboardingData.role && (
            <li><span className="font-medium">Role:</span> {onboardingData.role}</li>
          )}
          {onboardingData.goal && (
            <li><span className="font-medium">Goal:</span> {onboardingData.goal}</li>
          )}
          {onboardingData.personalityType && (
            <li>
              <span className="font-medium">Learning Style:</span> {
                typeof onboardingData.personalityType === 'string' 
                  ? onboardingData.personalityType 
                  : onboardingData.personalityType.type || 'Not specified'
              }
            </li>
          )}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/dashboard/student">
          <Button variant="default" className="w-full">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default CompletedStep;
