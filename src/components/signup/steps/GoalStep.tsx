
import React from "react";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/user/base";
import { motion } from "framer-motion";

interface GoalStepProps {
  role?: UserRole;
  onGoalSelect: (goal: string) => void;
}

const GoalStep: React.FC<GoalStepProps> = ({ role, onGoalSelect }) => {
  // Define exam goals for different roles
  const studentGoals = [
    { id: "IIT-JEE", label: "IIT-JEE", icon: "🧪" },
    { id: "NEET", label: "NEET", icon: "🩺" },
    { id: "UPSC", label: "UPSC", icon: "🏛️" }
  ];

  // Function to render the appropriate goals based on role
  const getGoals = () => {
    switch (role) {
      case UserRole.Student:
        return studentGoals;
      case UserRole.Employee:
      case UserRole.Doctor:
      case UserRole.Founder:
      default:
        return studentGoals; // Default to student goals for now
    }
  };

  const goals = getGoals();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-center mb-4">I'm preparing for...</h2>
      <div className="grid grid-cols-1 gap-3">
        {goals.map((goal) => (
          <motion.div
            key={goal.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => onGoalSelect(goal.id)}
              className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-4 px-4 w-full justify-start gap-3"
              variant="outline"
            >
              <span className="text-xl">{goal.icon}</span>
              <span>{goal.label}</span>
            </Button>
          </motion.div>
        ))}
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-4">
        We'll customize your study plan based on your exam choice
      </p>
    </div>
  );
};

export default GoalStep;
