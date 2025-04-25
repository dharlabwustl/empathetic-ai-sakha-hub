
import React from "react";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/user/base";

interface GoalSelectionProps {
  onSelect: (goal: string) => void;
  selectedRole: UserRole;
}

const GoalSelection: React.FC<GoalSelectionProps> = ({ onSelect, selectedRole }) => {
  // Define goals based on the selected role
  const getGoalsByRole = (role: UserRole): {id: string; emoji: string; label: string}[] => {
    switch(role) {
      case "student":
        return [
          { id: "IIT-JEE", emoji: "🧪", label: "IIT-JEE" },
          { id: "NEET", emoji: "🔬", label: "NEET" },
          { id: "Board Exams", emoji: "📝", label: "Board Exams" },
          { id: "General Study", emoji: "📚", label: "General Study" }
        ];
      case "employee":
        return [
          { id: "Career Growth", emoji: "📈", label: "Career Growth" },
          { id: "Skill Development", emoji: "🛠️", label: "Skill Development" },
          { id: "Leadership", emoji: "👔", label: "Leadership" },
          { id: "Work-Life Balance", emoji: "⚖️", label: "Work-Life Balance" }
        ];
      case "doctor":
        return [
          { id: "Medical Research", emoji: "🔬", label: "Medical Research" },
          { id: "Clinical Practice", emoji: "🏥", label: "Clinical Practice" },
          { id: "Medical Education", emoji: "🎓", label: "Medical Education" },
          { id: "Healthcare Management", emoji: "⚕️", label: "Healthcare Management" }
        ];
      case "founder":
        return [
          { id: "Startup Growth", emoji: "📈", label: "Startup Growth" },
          { id: "Product Development", emoji: "🛠️", label: "Product Development" },
          { id: "Fundraising", emoji: "💰", label: "Fundraising" },
          { id: "Team Building", emoji: "👥", label: "Team Building" }
        ];
      default:
        return [
          { id: "General Growth", emoji: "🌱", label: "General Growth" },
          { id: "Personal Development", emoji: "🧠", label: "Personal Development" }
        ];
    }
  };

  const goals = getGoalsByRole(selectedRole);

  return (
    <div className="grid grid-cols-2 gap-4">
      {goals.map((goal) => (
        <Button
          key={goal.id}
          onClick={() => onSelect(goal.id)}
          className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-6 flex flex-col items-center"
          variant="outline"
        >
          <span className="text-xl mb-2">{goal.emoji}</span>
          <span>{goal.label}</span>
        </Button>
      ))}
    </div>
  );
};

export default GoalSelection;
