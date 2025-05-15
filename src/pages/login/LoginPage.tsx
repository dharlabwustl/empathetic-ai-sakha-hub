
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface LoginPageProps {
  returnTo?: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ returnTo = '/dashboard/student' }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        // Determine where to redirect based on email or stored role
        if (email.includes('admin')) {
          localStorage.setItem('userRole', 'admin');
          navigate('/dashboard/admin', { replace: true });
        } else {
          localStorage.setItem('userRole', 'student');
          navigate('/dashboard/student', { replace: true });
        }
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Login Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  const handleDemoStudentLogin = () => {
    setEmail('student@prepzr.com');
    setPassword('demo123');
  };

  const handleDemoAdminLogin = () => {
    setEmail('admin@prepzr.com');
    setPassword('admin123');
  };

  return (
    <CardContent className="space-y-4 pt-6">
      <form onSubmit={handleLogin} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign In"}
        </Button>
      </form>
      
      <div className="space-y-2">
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={handleDemoStudentLogin}
        >
          Use Demo Student Account
        </Button>
        
        <Button
          variant="outline"
          type="button"
          className="w-full"
          onClick={handleDemoAdminLogin}
        >
          Use Demo Admin Account
        </Button>
      </div>
    </CardContent>
  );
};

export default LoginPage;
