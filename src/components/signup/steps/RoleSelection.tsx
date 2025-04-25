
import React from "react";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/components/signup/OnboardingContext";

interface RoleSelectionProps {
  onSelect: (role: UserRole) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        onClick={() => onSelect(UserRole.Student)}
        className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-6 flex flex-col items-center"
        variant="outline"
      >
        <span className="text-xl mb-2">🎓</span>
        <span>Student</span>
      </Button>
      <Button
        onClick={() => onSelect(UserRole.Employee)}
        className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-6 flex flex-col items-center"
        variant="outline"
      >
        <span className="text-xl mb-2">💼</span>
        <span>Employee</span>
      </Button>
      <Button
        onClick={() => onSelect(UserRole.Doctor)}
        className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-6 flex flex-col items-center"
        variant="outline"
      >
        <span className="text-xl mb-2">🏥</span>
        <span>Doctor</span>
      </Button>
      <Button
        onClick={() => onSelect(UserRole.Founder)}
        className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-6 flex flex-col items-center"
        variant="outline"
      >
        <span className="text-xl mb-2">🚀</span>
        <span>Founder</span>
      </Button>
    </div>
  );
};

export default RoleSelection;
