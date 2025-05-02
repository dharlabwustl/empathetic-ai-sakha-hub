
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowRight, Mail, Key } from 'lucide-react';
import { useAuth } from '@/contexts/auth/AuthContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing Information",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      
      toast({
        title: "Login Successful",
        description: "Welcome back to PREPZR!",
      });
      
      // Redirect to student dashboard
      navigate('/dashboard/student');
    } catch (error) {
      console.error("Login error:", error);
      
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-md border-0">
      <CardContent className="pt-6 px-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                autoComplete="email"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                autoComplete="current-password"
                required
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="remember" className="text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
          </div>
          
          <Button 
            type="submit" 
            className="w-full flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="h-4 w-4 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2" />
                <span>Logging in...</span>
              </div>
            ) : (
              <>
                Login <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          
          <div className="mt-4 text-center text-sm">
            <p>
              New to PREPZR?{" "}
              <a href="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Create an account
              </a>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
