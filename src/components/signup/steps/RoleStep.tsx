
import React from "react";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/user/base";

interface RoleStepProps {
  onRoleSelect: (role: UserRole) => void;
}

const RoleStep: React.FC<RoleStepProps> = ({ onRoleSelect }) => {
  return (
    <div className="flex justify-center">
      <Button
        onClick={() => onRoleSelect(UserRole.Student)}
        className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-6 w-full max-w-xs flex flex-col items-center"
        variant="outline"
      >
        <span className="text-xl mb-2">🎓</span>
        <span className="text-lg font-medium">Student</span>
        <p className="text-sm text-gray-500 mt-1">Prepare for exams with personalized study plans</p>
      </Button>
    </div>
  );
};

export default RoleStep;
