
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface CompletionStepProps {
  onNext?: () => void;
}

const CompletionStep: React.FC<CompletionStepProps> = ({ onNext }) => {
  return (
    <motion.div 
      className="text-center py-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-2">Registration Complete!</h3>
      <p className="text-muted-foreground mb-6">
        Your account has been created successfully. You can now access all features and start your learning journey.
      </p>
      
      <div className="space-y-4">
        <Button onClick={onNext} className="w-full">
          Go to Dashboard
        </Button>
        <div className="text-sm text-muted-foreground">
          <span>Want to explore first? </span>
          <Link to="/" className="text-primary hover:underline">
            Visit our homepage
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CompletionStep;
