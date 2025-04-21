
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface CompletedStepProps {
  onboardingData: any;
}

const CompletedStep: React.FC<CompletedStepProps> = ({ onboardingData }) => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/dashboard/student');
  };
  
  return (
    <div className="text-center space-y-6 py-4">
      <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <Check className="w-8 h-8 text-green-600" />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-2">All Set!</h2>
        <p className="text-gray-600">
          Your personalized learning experience is ready.
          We've customized your dashboard based on your preferences.
        </p>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
        <h3 className="font-medium mb-2">Your Profile Summary</h3>
        <ul className="text-sm text-left space-y-1">
          <li><span className="font-medium">Goal:</span> {onboardingData.goal?.title || "Exam Preparation"}</li>
          <li>
            <span className="font-medium">Learning Style:</span> 
            {onboardingData.personality?.learningStyle || "Visual Learner"}
          </li>
          <li>
            <span className="font-medium">Study Preference:</span> 
            {onboardingData.habits?.preferredTime === 'morning' ? 'Morning Person' : 
             onboardingData.habits?.preferredTime === 'night' ? 'Night Owl' : 
             'Afternoon/Evening Learner'}
          </li>
        </ul>
      </div>
      
      <Button 
        size="lg" 
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600"
        onClick={handleGetStarted}
      >
        Get Started
      </Button>
    </div>
  );
};

export default CompletedStep;
