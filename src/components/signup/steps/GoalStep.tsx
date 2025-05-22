
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { UserRole } from "@/types/user/base";
import { BookOpen, CheckCircle2 } from "lucide-react";

interface GoalStepProps {
  role: UserRole;
  onGoalSelect: (goal: string) => void;
}

const GoalStep: React.FC<GoalStepProps> = ({ role, onGoalSelect }) => {
  const [selectedGoal, setSelectedGoal] = useState<string>("NEET"); // Auto-select NEET

  // Only show NEET as an option
  const studentGoals = [
    {
      id: "NEET",
      title: "NEET",
      description: "National Eligibility cum Entrance Test for Medical Studies",
      color: "bg-green-600",
      benefit: "Become a medical professional and make a difference in people's lives"
    }
  ];
  
  // Auto-select and continue after a short delay
  useEffect(() => {
    const timer = setTimeout(() => {
      onGoalSelect("NEET");
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [onGoalSelect]);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-1">Your Exam Goal</h3>
        <p className="text-muted-foreground text-sm">
          Get personalized preparation for your target exam
        </p>
      </div>

      <div className="grid gap-3">
        {studentGoals.map((goal) => (
          <motion.div
            key={goal.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              className={`p-4 cursor-pointer border-2 transition-all ${
                selectedGoal === goal.id
                  ? "border-blue-500 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-100 dark:border-gray-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-10 w-10 rounded-full ${goal.color} text-white flex items-center justify-center font-bold`}
                >
                  {selectedGoal === goal.id ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <BookOpen className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium">{goal.title}</h4>
                  <p className="text-muted-foreground text-sm">
                    {goal.description}
                  </p>
                  
                  <motion.div 
                    className="mt-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-md text-sm text-green-700 dark:text-green-300 border border-green-100 dark:border-green-800/50"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <span className="font-medium">Why this matters:</span> {goal.benefit}
                  </motion.div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="pt-4"
      >
        <div className="flex items-center justify-center space-x-2">
          <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
          <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse delay-100"></div>
          <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse delay-200"></div>
        </div>
        <p className="text-center text-sm text-blue-600 dark:text-blue-400 mt-2">
          Auto-selecting NEET exam for your preparation...
        </p>
      </motion.div>

      <div className="pt-4">
        <Button
          type="button"
          className="w-full"
          disabled={!selectedGoal}
          onClick={() => onGoalSelect(selectedGoal)}
        >
          Continue
        </Button>
        <p className="text-center text-xs text-gray-500 mt-2">
          We'll personalize your experience based on your selection
        </p>
      </div>
    </div>
  );
};

export default GoalStep;
