
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

const StudentLoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Always succeed for demo purposes
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      
      // Success message
      toast({
        title: "Success",
        description: "Login successful!",
      });
      
      // Redirect to dashboard - important to use relative path here
      navigate('/dashboard/student', { replace: true });
      
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-blue-700 dark:text-blue-300">
          Email Address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          required
        />
      </div>
      
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-blue-700 dark:text-blue-300">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pr-10"
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-blue-700 dark:text-blue-300">
            Remember me
          </label>
        </div>
        
        <div className="text-sm">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
            Forgot password?
          </a>
        </div>
      </div>
      
      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
      
      <div className="mt-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-3 gap-3">
          <Button
            type="button"
            variant="outline"
            className="w-full border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <svg className="h-5 w-5 text-[#4285F4]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.79-1.677-4.184-2.702-6.735-2.702-5.514 0-9.977 4.463-9.977 9.977s4.463 9.977 9.977 9.977c8.317 0 10.141-7.721 9.312-11.618h-9.312z"/>
            </svg>
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="w-full border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <svg className="h-5 w-5 text-[#4267B2]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.04c-5.5 0-10 4.49-10 10.02 0 5 3.66 9.15 8.44 9.9v-7h-2.54v-2.9h2.54v-2.2c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.77l-.44 2.9h-2.33v7c4.78-.75 8.44-4.9 8.44-9.9 0-5.53-4.5-10.02-10-10.02z"/>
            </svg>
          </Button>
          
          <Button
            type="button"
            variant="outline"
            className="w-full border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <svg className="h-5 w-5 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.068 10.897c0-.808-.071-1.583-.2-2.329h-9.535v4.404h5.465a4.669 4.669 0 01-2.027 3.066v2.532h3.282c1.923-1.773 3.015-4.387 3.015-7.673z"/>
              <path d="M12.333 22c2.743 0 5.046-.907 6.727-2.462l-3.282-2.532c-.913.611-2.071.969-3.445.969-2.648 0-4.893-1.788-5.699-4.187H3.469v2.613A10.196 10.196 0 0012.333 22z"/>
              <path d="M6.634 13.788a6.1 6.1 0 01-.323-1.927c0-.67.114-1.32.323-1.927V7.321H3.469a10.11 10.11 0 000 9.08l3.165-2.613z"/>
              <path d="M12.333 5.875c1.489 0 2.827.511 3.884 1.519l2.914-2.914C17.189 2.73 14.887 1.778 12.333 1.778a10.196 10.196 0 00-8.864 5.11l3.165 2.613c.806-2.4 3.051-4.187 5.699-4.187z"/>
            </svg>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default StudentLoginForm;
