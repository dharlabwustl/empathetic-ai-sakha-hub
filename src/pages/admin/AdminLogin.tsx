
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import PrepzrLogo from '@/components/common/PrepzrLogo';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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
      // Simulate API call for admin login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, any login is successful
      localStorage.setItem('adminToken', 'demo-admin-token');
      localStorage.setItem('adminData', JSON.stringify({
        name: 'Admin User',
        email: credentials.email,
        role: 'admin',
      }));
      
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard"
      });
      
      navigate("/admin/dashboard");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid credentials",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-blue-100 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-700 to-slate-800 text-white text-center">
          <div className="flex justify-center mb-4">
            <PrepzrLogo width={80} height={80} />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription className="text-blue-100">
            Access the PREPZR administrator dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                placeholder="admin@example.com"
                value={credentials.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button variant="link" className="p-0 h-auto text-xs" onClick={() => toast({
                  title: "Password Reset",
                  description: "Please contact your system administrator"
                })}>
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center text-sm">
              <Button 
                type="button" 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => {
                  setCredentials({
                    email: "admin@prepzr.com",
                    password: "admin123",
                  });
                }}
              >
                Use Demo Credentials
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4 border-t pt-6">
          <p className="text-sm text-gray-500">
            Need technical support? Contact IT administration
          </p>
          <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
            Back to Student Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
