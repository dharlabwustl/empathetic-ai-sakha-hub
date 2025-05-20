
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import authService from '@/services/auth/authService';
import adminAuthService from '@/services/auth/adminAuthService';

export const useAuthUtils = () => {
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      
      // Check if this is an admin login attempt (email contains 'admin')
      if (email.includes('admin')) {
        return handleAdminLogin(email, password);
      }
      
      const response = await authService.login({ email, password });
      
      if (response.success && response.data) {
        toast({
          title: "Login successful",
          description: "Welcome back!",
        });
        
        // Navigate based on user role
        const role = response.data.role.toLowerCase();
        
        if (role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/dashboard/student');
        }
        
        return true;
      } else {
        setError(response.error || 'Invalid credentials');
        toast({
          title: "Login failed",
          description: response.error || "Invalid email or password",
          variant: "destructive",
        });
        
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      
      toast({
        title: "Login failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return false;
    }
  };

  const handleAdminLogin = async (email: string, password: string): Promise<boolean> => {
    try {
      setError(null);
      console.log("Attempting admin login for:", email);
      
      const response = await adminAuthService.adminLogin({ email, password });
      
      if (response.success && response.data) {
        toast({
          title: "Admin login successful",
          description: "Welcome to the admin dashboard",
        });
        
        console.log("Admin login successful, navigating to dashboard");
        navigate('/admin/dashboard');
        return true;
      } else {
        setError(response.error || 'Invalid admin credentials');
        toast({
          title: "Admin login failed",
          description: response.error || "Invalid credentials or insufficient permissions",
          variant: "destructive",
        });
        
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      
      toast({
        title: "Admin login failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return false;
    }
  };

  const handleRegister = async (
    name: string, 
    email: string, 
    phoneNumber: string, 
    password: string, 
    role: string = 'student'
  ): Promise<boolean> => {
    try {
      setError(null);
      
      const response = await authService.register({
        name,
        email,
        phoneNumber,
        password,
        role
      });
      
      if (response.success && response.data) {
        toast({
          title: "Registration successful",
          description: "Your account has been created",
        });
        
        navigate('/welcome', { state: { name, email } });
        return true;
      } else {
        setError(response.error || 'Registration failed');
        toast({
          title: "Registration failed",
          description: response.error || "Could not create your account",
          variant: "destructive",
        });
        
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      
      toast({
        title: "Registration failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return false;
    }
  };

  const handleLogout = async (): Promise<void> => {
    try {
      // Check if user is admin
      const isAdmin = localStorage.getItem('admin_logged_in') === 'true';
      
      if (isAdmin) {
        await adminAuthService.adminLogout();
      } else {
        await authService.logout();
      }
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
      
      navigate('/login');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      
      toast({
        title: "Logout failed",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return {
    error,
    handleLogin,
    handleAdminLogin,
    handleRegister,
    handleLogout,
  };
};
