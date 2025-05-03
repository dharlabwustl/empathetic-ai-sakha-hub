
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { UserRole } from "@/types/user/base";

interface GoalStepProps {
  role: UserRole;
  onGoalSelect: (goal: string) => void;
}

const GoalStep: React.FC<GoalStepProps> = ({ role, onGoalSelect }) => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const studentGoals = [
    {
      id: "NEET",
      title: "NEET",
      description: "National Eligibility cum Entrance Test for Medical Studies",
      color: "bg-green-600",
    },
    {
      id: "IIT-JEE",
      title: "IIT-JEE",
      description: "Joint Entrance Examination for Engineering",
      color: "bg-blue-600",
    },
    {
      id: "UPSC",
      title: "UPSC",
      description: "Union Public Service Commission Examinations",
      color: "bg-purple-600",
    },
  ];

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
  };

  const handleContinue = () => {
    if (selectedGoal) {
      onGoalSelect(selectedGoal);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-1">Exam preparing for</h3>
        <p className="text-muted-foreground text-sm">Select the exam you're preparing for</p>
      </div>

      <div className="grid gap-3">
        {studentGoals.map((goal) => (
          <motion.div
            key={goal.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`p-4 cursor-pointer border-2 transition-all ${
                selectedGoal === goal.id
                  ? "border-blue-500 dark:border-blue-700"
                  : "border-gray-100 dark:border-gray-800"
              }`}
              onClick={() => handleGoalSelect(goal.id)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`h-8 w-8 rounded-full ${goal.color} text-white flex items-center justify-center font-bold`}
                >
                  {goal.title.charAt(0)}
                </div>
                <div>
                  <h4 className="font-medium">{goal.title}</h4>
                  <p className="text-muted-foreground text-sm">
                    {goal.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="pt-4">
        <Button
          type="button"
          className="w-full"
          disabled={!selectedGoal}
          onClick={handleContinue}
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
