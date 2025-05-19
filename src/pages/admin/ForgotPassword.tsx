
import React from "react";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import { useToast } from "@/hooks/use-toast";

const AdminForgotPassword = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Let the user know they're on the admin forgot password page
    toast({
      title: "Admin Password Reset",
      description: "You're resetting an administrator account password"
    });
  }, [toast]);

  return <ForgotPassword />;
};

export default AdminForgotPassword;
