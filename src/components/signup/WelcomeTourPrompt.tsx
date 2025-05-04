
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Play, Book, GraduationCap } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface WelcomeTourPromptProps {
  onCompleted: (showTour: boolean) => void;
}

const WelcomeTourPrompt: React.FC<WelcomeTourPromptProps> = ({ onCompleted }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Welcome to PREPZR</h1>
        <p className="text-gray-600 dark:text-gray-300">Let us show you around!</p>
      </div>

      {/* Founder message card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-purple-600" />
            A Message From Our Founder
          </CardTitle>
          <CardDescription>
            Helping students achieve academic excellence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              {/* Placeholder founder image - replace with actual image */}
              <img 
                src="/assets/images/founder.jpg" 
                alt="Founder" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/200x200?text=Founder";
                }}
              />
            </div>
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                "Welcome to PREPZR! Our mission is to transform how students prepare for exams using AI-powered personalization. We're excited to help you achieve your academic goals and make learning more effective and enjoyable."
              </p>
              <p className="text-sm font-medium mt-2">
                - Dr. Sarah Johnson, Founder & CEO
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Would you like a quick tour?</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          See how PREPZR works and discover all the powerful features available to help you succeed in your exams.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={() => onCompleted(true)} 
                variant="default" 
                className="w-full flex gap-2"
              >
                <Play className="h-4 w-4" />
                Yes, show me around
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Take a quick tour of the platform</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={() => onCompleted(false)} 
                variant="outline" 
                className="w-full"
              >
                Skip for now
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Skip the tour and go directly to setup</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-md">
          <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
            <Book className="h-4 w-4 text-blue-600" />
            What's included in the tour
          </h3>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <li>• Dashboard overview and navigation</li>
            <li>• Study plan creation and management</li>
            <li>• AI-powered learning tools</li>
            <li>• Practice exams and assessments</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeTourPrompt;
