
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { UserRole } from "@/types/user/base";

// Role option interface
interface RoleOption {
  id: UserRole;
  title: string;
  description: string;
  icon: JSX.Element;
}

// Props interface
interface RoleStepProps {
  onRoleSelect: (role: UserRole) => void;
}

const RoleStep: React.FC<RoleStepProps> = ({ onRoleSelect }) => {
  // Define role options
  const roleOptions: RoleOption[] = [
    {
      id: UserRole.Student,
      title: "Student",
      description: "Preparing for competitive exams",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
          />
        </svg>
      ),
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-1">Identify yourself</h3>
        <p className="text-muted-foreground text-sm">Choose your role to get started</p>
      </div>

      <div className="grid gap-4">
        {roleOptions.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className="p-4 cursor-pointer border-2 border-blue-100 hover:border-blue-500 dark:border-blue-900 dark:hover:border-blue-700 transition-colors"
              onClick={() => onRoleSelect(option.id)}
            >
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-blue-100 dark:bg-blue-900/40 p-2 text-blue-600 dark:text-blue-400">
                  {option.icon}
                </div>
                <div>
                  <h4 className="font-medium text-base">{option.title}</h4>
                  <p className="text-muted-foreground text-sm">
                    {option.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="pt-2">
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => onRoleSelect(UserRole.Student)}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default RoleStep;
