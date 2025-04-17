
import React from "react";
import { Button } from "@/components/ui/button";
import { UserRole, UserRoleEnum } from "@/types/user/base";

interface RoleStepProps {
  onRoleSelect: (role: UserRole) => void;
}

const RoleStep: React.FC<RoleStepProps> = ({ onRoleSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        onClick={() => onRoleSelect("student")}
        className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-6 flex flex-col items-center"
        variant="outline"
      >
        <span className="text-xl mb-2">🎓</span>
        <span>Student</span>
      </Button>
      <Button
        onClick={() => onRoleSelect("employee" as UserRole)}
        className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-6 flex flex-col items-center"
        variant="outline"
      >
        <span className="text-xl mb-2">💼</span>
        <span>Employee</span>
      </Button>
      <Button
        onClick={() => onRoleSelect("doctor" as UserRole)}
        className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-6 flex flex-col items-center"
        variant="outline"
      >
        <span className="text-xl mb-2">🏥</span>
        <span>Doctor</span>
      </Button>
      <Button
        onClick={() => onRoleSelect("founder" as UserRole)}
        className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-6 flex flex-col items-center"
        variant="outline"
      >
        <span className="text-xl mb-2">🚀</span>
        <span>Founder</span>
      </Button>
    </div>
  );
};

export default RoleStep;
