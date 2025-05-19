
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import StudentLoginForm from "./forms/StudentLoginForm";

interface LoginPageProps {
  returnTo?: string;
  onError?: (error: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ returnTo = '/dashboard/student', onError }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return (
    <div className="p-6 space-y-6">
      <StudentLoginForm />
    </div>
  );
};

export default LoginPage;
