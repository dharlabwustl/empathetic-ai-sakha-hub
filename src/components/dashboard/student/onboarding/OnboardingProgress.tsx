
import React from "react";
import { motion } from "framer-motion";

interface OnboardingProgressProps {
  currentStep: number;
  loading: boolean;
}

export default function OnboardingProgress({ currentStep, loading }: OnboardingProgressProps) {
  // Don't show progress indicator during loading
  if (loading) return null;
  
  return (
    <div className="bg-white/10 px-4 py-2 rounded-lg">
      Step {currentStep} of 5
    </div>
  );
}
