
import React from 'react';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="py-4">
      <div className="flex items-center justify-center">
        <div className="flex items-center w-full max-w-3xl">
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isActive = index === currentStep;
            
            return (
              <React.Fragment key={step}>
                {/* Step circle */}
                <div className="relative">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      isCompleted 
                        ? 'bg-primary border-primary text-white' 
                        : isActive 
                          ? 'border-primary text-primary'
                          : 'border-gray-300 text-gray-300'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                  {/* Step name */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span 
                      className={`text-xs ${
                        isCompleted || isActive ? 'text-primary font-medium' : 'text-gray-400'
                      }`}
                    >
                      {step.charAt(0).toUpperCase() + step.slice(1)}
                    </span>
                  </div>
                </div>
                
                {/* Connector line between steps */}
                {index < steps.length - 1 && (
                  <div 
                    className={`flex-1 h-0.5 ${
                      index < currentStep ? 'bg-primary' : 'bg-gray-300'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
