
import React from "react";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/user/base";
import { motion } from "framer-motion";

interface RoleStepProps {
  onRoleSelect: (role: UserRole) => void;
}

const RoleStep: React.FC<RoleStepProps> = ({ onRoleSelect }) => {
  const roles = [
    { role: UserRole.Student, icon: "🎓", label: "Student" },
    { role: UserRole.Employee, icon: "💼", label: "Working Professional" },
    { role: UserRole.Doctor, icon: "⚕️", label: "Doctor" }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-center mb-4">I am a...</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {roles.map((item) => (
          <motion.div
            key={item.role}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => onRoleSelect(item.role)}
              className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 h-auto py-6 px-4 w-full flex flex-col items-center gap-2"
              variant="outline"
            >
              <span className="text-3xl mb-1">{item.icon}</span>
              <span className="text-lg font-medium">{item.label}</span>
            </Button>
          </motion.div>
        ))}
      </div>
      
      <p className="text-center text-sm text-gray-500 mt-4">
        Select an option to personalize your learning experience
      </p>
    </div>
  );
};

export default RoleStep;
