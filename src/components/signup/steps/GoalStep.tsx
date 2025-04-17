
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
  const studentGoals = [
    "IIT JEE (Engineering Entrance)",
    "NEET (Medical Entrance)",
    "MBA (CAT, XAT, SNAP, CMAT, etc.)",
    "CUET UG (Undergraduate Common Entrance Test)",
    "UPSC (Civil Services – Prelims & Mains)",
    "CLAT (Law Entrance)",
    "BANK PO (Bank Probationary Officer Exams)"
  ];

  const handleCustomGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const goal = formData.get("goal") as string;
    onGoalSelect(goal);
  };

  return (
    <div className="space-y-4">
      {role === UserRole.Student && (
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
      )}
      
      {role !== UserRole.Student && (
        <form onSubmit={handleCustomGoalSubmit} className="space-y-4">
          <div>
            <Label htmlFor="goal">Your Primary Goal</Label>
            <Input id="goal" name="goal" required />
          </div>
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-700">Next</Button>
        </form>
      )}
    </div>
  );
};

export default GoalStep;
