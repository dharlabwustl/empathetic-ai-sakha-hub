
import React from "react";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/user/base";

interface RoleSelectionProps {
  onSelect: (role: UserRole) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        onClick={() => onSelect("student" as UserRole)}
        className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-6 flex flex-col items-center"
        variant="outline"
      >
        <span className="text-xl mb-2">🎓</span>
        <span>Student</span>
      </Button>
      <Button
        onClick={() => onSelect("employee" as UserRole)}
        className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-6 flex flex-col items-center"
        variant="outline"
      >
        <span className="text-xl mb-2">💼</span>
        <span>Employee</span>
      </Button>
      <Button
        onClick={() => onSelect("doctor" as UserRole)}
        className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-6 flex flex-col items-center"
        variant="outline"
      >
        <span className="text-xl mb-2">🏥</span>
        <span>Doctor</span>
      </Button>
      <Button
        onClick={() => onSelect("founder" as UserRole)}
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
