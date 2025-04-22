
import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface OnboardingFooterProps {
  currentStep: number;
  stepComplete: boolean;
  handlePrevious: () => void;
  handleNext: () => void;
  loading?: boolean; // Added loading prop
}

export default function OnboardingFooter({ 
  currentStep, 
  stepComplete, 
  handlePrevious, 
  handleNext,
  loading = false
}: OnboardingFooterProps) {
  return (
    <div className="w-full bg-gray-50 p-6 flex justify-between">
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={currentStep === 0 || loading}
      >
        Back
      </Button>
      
      <Button
        onClick={handleNext}
        disabled={!stepComplete || loading}
        className={cn(
          currentStep === 5 ? "bg-gradient-to-r from-sky-600 to-indigo-600" : ""
        )}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : currentStep < 5 ? (
          <>
            Next <ChevronRight size={16} className="ml-1" />
          </>
        ) : (
          "Generate My Smart Plan"
        )}
      </Button>
    </div>
  );
}
