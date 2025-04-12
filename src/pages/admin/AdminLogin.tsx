
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogin = () => {
    toast({
      title: "Admin login",
      description: "This is a placeholder for the admin login form.",
    });
    navigate("/admin/dashboard");
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <p className="text-gray-600 mb-6">
          Please login with your admin credentials.
        </p>
        <Button onClick={handleLogin} className="w-full">
          Login (Placeholder)
        </Button>
      </div>
    </div>
  );
};

export default AdminLogin;
