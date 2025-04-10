
import React from "react";
import { Button } from "@/components/ui/button";
import { UserRole } from "../OnboardingContext";

interface RoleStepProps {
  onRoleSelect: (role: UserRole) => void;
}

const RoleStep: React.FC<RoleStepProps> = ({ onRoleSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {["Student", "Employee", "Doctor", "Founder"].map((role) => (
        <Button
          key={role}
          onClick={() => onRoleSelect(role as UserRole)}
          className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-6 flex flex-col items-center"
          variant="outline"
        >
          <span className="text-xl mb-2">
            {role === "Student" ? "🎓" : 
             role === "Employee" ? "💼" :
             role === "Doctor" ? "🏥" : "🚀"}
          </span>
          <span>{role}</span>
        </Button>
      ))}
    </div>
  );
};

export default RoleStep;
