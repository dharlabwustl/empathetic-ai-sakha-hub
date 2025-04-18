
import React from 'react';
import { Check } from "lucide-react";

interface WizardProgressProps {
  currentStep: number;
}

const WizardProgress: React.FC<WizardProgressProps> = ({ currentStep }) => (
  <div className="flex items-center justify-center mb-4">
    {[1, 2, 3, 4, 5].map((stepNumber) => (
      <React.Fragment key={stepNumber}>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
          currentStep === stepNumber ? 'bg-indigo-600 text-white' : 
          currentStep > stepNumber ? 'bg-green-500 text-white' : 
          'bg-gray-200 text-gray-500'
        }`}>
          {currentStep > stepNumber ? <Check className="h-4 w-4" /> : stepNumber}
        </div>
        {stepNumber < 5 && (
          <div className={`h-1 w-10 ${
            currentStep > stepNumber ? 'bg-green-500' : 'bg-gray-200'
          }`} />
        )}
      </React.Fragment>
    ))}
  </div>
);

export default WizardProgress;
