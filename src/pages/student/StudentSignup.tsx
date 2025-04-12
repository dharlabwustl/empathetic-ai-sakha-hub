
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const StudentSignup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSignup = () => {
    toast({
      title: "Student signup",
      description: "This is a placeholder for the student signup form.",
    });
    navigate("/onboarding");
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Student Signup</h1>
        <p className="text-gray-600 mb-6">
          Create your student account to get started.
        </p>
        <Button onClick={handleSignup} className="w-full">
          Sign Up (Placeholder)
        </Button>
      </div>
    </div>
  );
};

export default StudentSignup;
