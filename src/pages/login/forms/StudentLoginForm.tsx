
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface StudentLoginFormProps {
  activeTab: string;
}

const StudentLoginForm: React.FC<StudentLoginFormProps> = ({ activeTab }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      toast({
        title: "Required fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // In a real app, this would validate credentials against a backend
      console.log("Attempting to log in with:", credentials.email);
      
      // For demo purposes, consider any login valid
      const success = await login(credentials.email, credentials.password);
      
      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to Prepzr"
        });
        // Check if this appears to be a new user for demo purposes
        const isNewUser = !localStorage.getItem("hasLoggedInBefore");
        if (isNewUser) {
          localStorage.setItem("hasLoggedInBefore", "true");
          navigate("/dashboard/student?new=true");
        } else {
          navigate("/dashboard/student/today");
        }
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An error occurred while logging in",
        variant: "destructive"
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setCredentials({
      email: "demo@prepzr.com",
      password: "demo123"
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your.email@example.com"
          value={credentials.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Button
            type="button"
            variant="link"
            className="p-0 h-auto text-xs"
            onClick={() => {
              toast({
                title: "Password Reset",
                description: "Password reset functionality will be available soon."
              });
            }}
          >
            Forgot password?
          </Button>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember" className="text-sm">Remember me</Label>
      </div>
      <div className="space-y-2">
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          className="w-full mt-2" 
          onClick={handleDemoLogin}
        >
          Use Demo Account
        </Button>
      </div>
      <div className="text-center text-sm">
        <span className="text-gray-500">Don't have an account? </span>
        <Button variant="link" className="p-0 h-auto" onClick={() => navigate("/signup")}>
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default StudentLoginForm;
