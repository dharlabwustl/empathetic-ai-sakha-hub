
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserGoal, UserRole } from "../OnboardingContext";

interface GoalStepProps {
  role?: UserRole;
  onGoalSelect: (goal: UserGoal) => void;
}

const GoalStep: React.FC<GoalStepProps> = ({ role, onGoalSelect }) => {
  // Updated to focus only on these 3 exams
  const studentGoals = [
    "IIT-JEE",
    "NEET",
    "UPSC"
  ];

  const handleCustomGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const goal = formData.get("goal") as string;
    onGoalSelect(goal);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3">
        {studentGoals.map((goal) => (
          <Button
            key={goal}
            onClick={() => onGoalSelect(goal)}
            className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-3 justify-start"
            variant="outline"
          >
            {goal}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GoalStep;
