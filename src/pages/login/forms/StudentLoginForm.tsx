
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Phone, Lock, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface StudentLoginFormProps {
  activeTab: string;
}

const StudentLoginForm: React.FC<StudentLoginFormProps> = ({ activeTab }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identifier || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const isPhone = /^\d+$/.test(identifier);
      const email = isPhone ? `${identifier}@sakha.ai` : identifier;
      const success = await login(email, password);
      
      if (success) {
        // Set default userData for returning users if it doesn't exist
        const existingUserData = localStorage.getItem("userData");
        if (!existingUserData) {
          const userData = {
            completedOnboarding: true, // Mark as completed for returning users
            sawWelcomeTour: true, // Skip welcome tour for returning users
            loginCount: 1,
            isNewUser: false
          };
          localStorage.setItem("userData", JSON.stringify(userData));
        } else {
          // Update existing user data to ensure proper flow
          const parsedData = JSON.parse(existingUserData);
          parsedData.isNewUser = false;
          parsedData.completedOnboarding = true; // Explicitly mark as completed for login flow
          localStorage.setItem("userData", JSON.stringify(parsedData));
        }
        
        // Redirect directly to dashboard for login flow
        navigate("/dashboard/student");
        
        toast({
          title: "Login Successful",
          description: "Welcome to your personalized learning dashboard!",
        });
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid credentials, please try again",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="space-y-4">
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Email or Phone Number"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <Input 
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
            Remember me
          </label>
        </div>
        <div className="text-sm">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Forgot password?
          </a>
        </div>
      </div>
      
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing In...
          </>
        ) : (
          "Sign In"
        )}
      </Button>
      
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don't have an account yet?{" "}
          <Link to="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400">
            Sign up
          </Link>
        </p>
      </div>
    </form>
  );
};

export default StudentLoginForm;
