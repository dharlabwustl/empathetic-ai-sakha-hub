
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
        className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-6 px-8 w-full flex flex-col items-center"
        variant="outline"
      >
        <span className="text-3xl mb-3">🎓</span>
        <span className="text-lg font-medium">Student</span>
      </Button>
    </div>
  );
};

export default RoleStep;
