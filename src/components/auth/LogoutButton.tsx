
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showIcon?: boolean;
  showText?: boolean;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  variant = "ghost", 
  size = "default", 
  className = "",
  showIcon = true,
  showText = true
}) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = async () => {
    try {
      await logout();
      
      toast({
        title: "Logout successful",
        description: "You have been logged out successfully"
      });
      
      // Navigate to login page
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Logout failed",
        description: "An error occurred while logging out. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      className={`gap-2 ${className}`}
    >
      {showIcon && <LogOut className="h-4 w-4" />}
      {showText && "Logout"}
    </Button>
  );
};

export default LogoutButton;
