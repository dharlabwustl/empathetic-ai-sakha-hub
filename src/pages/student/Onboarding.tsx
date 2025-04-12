
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Onboarding = () => {
  const navigate = useNavigate();
  
  const handleComplete = () => {
    navigate("/dashboard/student");
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Student Onboarding</h1>
        <p className="text-gray-600 mb-6">
          This is a placeholder for the student onboarding process.
        </p>
        <Button onClick={handleComplete} className="w-full">
          Complete Onboarding
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
