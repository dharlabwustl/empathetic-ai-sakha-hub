
import React from "react";
import { motion } from "framer-motion";
import { useOnboarding } from "../OnboardingContext";
import { cn } from "@/lib/utils";

interface UserTypeOption {
  id: string;
  title: string;
  description: string;
  icon: string;
  isAvailable: boolean;
}

const userTypes: UserTypeOption[] = [
  {
    id: "student",
    title: "Student",
    description: "Prepare for exams with AI assistance",
    icon: "👨‍🎓",
    isAvailable: true
  },
  {
    id: "doctor",
    title: "Doctor",
    description: "Medical exam preparation",
    icon: "👨‍⚕️",
    isAvailable: false
  },
  {
    id: "employee",
    title: "Working Professional",
    description: "Upskill with AI-guided learning",
    icon: "👨‍💼",
    isAvailable: false
  },
  {
    id: "founder",
    title: "Founder",
    description: "Learn while building your venture",
    icon: "👨‍💻",
    isAvailable: false
  }
];

const UserTypeStep = () => {
  const { onboardingData, updateOnboardingData, goToNextStep } = useOnboarding();
  
  const selectUserType = (userType: string) => {
    updateOnboardingData({ userType });
    goToNextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-center mb-2">I am a...</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Please select your profile type
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-6">
        {userTypes
          .filter(type => type.isAvailable)
          .map((type) => (
            <motion.div
              key={type.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onClick={() => selectUserType(type.id)}
              className={cn(
                "cursor-pointer group p-4 border rounded-lg",
                "hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/20",
                "transition-all duration-200 transform hover:-translate-y-1",
                onboardingData.userType === type.id
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                  : "border-gray-200 dark:border-gray-700"
              )}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{type.icon}</div>
                <div className="flex-1">
                  <h3 className="font-medium">{type.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {type.description}
                  </p>
                </div>
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    onboardingData.userType === type.id
                      ? "border-purple-500 bg-purple-500"
                      : "border-gray-300 dark:border-gray-600 group-hover:border-purple-300"
                  )}
                >
                  {onboardingData.userType === type.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default UserTypeStep;
