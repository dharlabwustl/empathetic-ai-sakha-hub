
import React from 'react';
import { Button } from '@/components/ui/button';
import { useOnboardingContext } from '../OnboardingContext';
import { motion } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';

interface ProfileCompleteStepProps {
  onComplete: () => void;
  isSubmitting: boolean;
}

const ProfileCompleteStep: React.FC<ProfileCompleteStepProps> = ({ onComplete, isSubmitting }) => {
  const { onboardingData } = useOnboardingContext();
  
  const getExamDetails = () => {
    const examName = onboardingData.goalTitle || "Your exam";
    if (onboardingData.examGoal === 'IIT-JEE') {
      return {
        title: examName,
        fact: "Did you know? More than 1.5 million students appear for JEE each year.",
        icon: "🎓"
      };
    }
    if (onboardingData.examGoal === 'NEET') {
      return {
        title: examName,
        fact: "NEET is the gateway to over 90,000 MBBS, BDS & AYUSH seats in India.",
        icon: "⚕️"
      };
    }
    if (onboardingData.examGoal === 'UPSC') {
      return {
        title: examName,
        fact: "Less than 0.1% of candidates who appear for UPSC finally get selected.",
        icon: "🏛️"
      };
    }
    return {
      title: examName,
      fact: "Consistent preparation is the key to success in any competitive exam.",
      icon: "🚀"
    };
  };

  const examDetails = getExamDetails();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
      >
        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
      </motion.div>
      
      <div>
        <h3 className="text-xl font-bold mb-1">You're all set!</h3>
        <p className="text-muted-foreground">
          Your personalized study plan is ready
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-3xl">{examDetails.icon}</span>
          <h4 className="font-medium">Preparing for {examDetails.title}</h4>
          <p className="text-xs text-blue-600 dark:text-blue-300">{examDetails.fact}</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="space-y-4"
      >
        <h4 className="font-medium">What's next?</h4>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Take a diagnostic test to assess your current level</span>
          </li>
          <li className="flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Explore your personalized study path</span>
          </li>
          <li className="flex items-center justify-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span>Start with your first recommended concept</span>
          </li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Button
          onClick={onComplete}
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Setting up your account...
            </>
          ) : (
            "Go to Dashboard"
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ProfileCompleteStep;
