
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/components/signup/OnboardingContext";
import { Graduation } from "lucide-react";

interface RoleStepProps {
  onRoleSelect: (role: UserRole) => void;
}

const RoleStep: React.FC<RoleStepProps> = ({ onRoleSelect }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">Welcome to PREPZR</h2>
        <p className="text-gray-500">Your personal AI study partner for exam preparation</p>
      </div>
      
      <div className="flex justify-center">
        <Card 
          className="bg-blue-50 border-blue-200 p-6 cursor-pointer hover:shadow-md transition-all w-full max-w-xs"
          onClick={() => onRoleSelect(UserRole.Student)}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Graduation className="text-blue-600 h-8 w-8" />
            </div>
            <h3 className="text-xl font-medium mb-2">Student</h3>
            <p className="text-gray-500 text-sm">
              Personalized study plans, concept mastery, and exam preparation
            </p>
          </div>
        </Card>
      </div>
      
      <Button 
        className="w-full mt-4"
        onClick={() => onRoleSelect(UserRole.Student)}
      >
        Continue as Student
      </Button>
    </div>
  );
};

export default RoleStep;
