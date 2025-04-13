import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Lock, Mail, User, Loader2, School, Building2, Phone } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("student");
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
        if (activeTab === "admin") {
          navigate("/admin/login");
          return;
        }
        
        if (activeTab === "student") {
          navigate("/dashboard/student");
        } else if (activeTab === "tutor") {
          toast({
            title: "Tutor login successful",
            description: "Redirecting to tutor dashboard",
          });
          navigate("/dashboard/student");
        } else {
          navigate("/dashboard/student");
        }
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="p-8 bg-white dark:bg-gray-950 rounded-2xl shadow-xl w-full max-w-md relative overflow-hidden border border-gray-100 dark:border-gray-800">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br from-violet-200/30 to-indigo-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-gradient-to-tr from-blue-200/30 to-purple-300/20 rounded-full blur-3xl"></div>
        
        <div className="text-center mb-8 relative">
          <div className="flex justify-center mb-4">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png"
                alt="Sakha AI"
                className="w-10 h-10"
              />
              <span className="font-display font-bold text-xl bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Sakha AI
              </span>
            </Link>
          </div>
          <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
          <p className="text-gray-500 dark:text-gray-400">Sign in to your account to continue</p>
        </div>
        
        <Tabs defaultValue="student" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <School size={16} />
              Student
            </TabsTrigger>
            <TabsTrigger value="tutor" className="flex items-center gap-2">
              <User size={16} />
              Tutor
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center gap-2">
              <Lock size={16} />
              Admin
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="student">
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
          </TabsContent>
          
          <TabsContent value="tutor">
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input 
                    type="email" 
                    placeholder="Email address"
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
                    id="remember-me-tutor"
                    name="remember-me-tutor"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="remember-me-tutor" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
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
            </form>
          </TabsContent>
          
          <TabsContent value="admin">
            <div className="space-y-6">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg border border-indigo-100 dark:border-indigo-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-800 rounded-full">
                    <Building2 size={20} className="text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Admin Access</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Secure login for administrators</p>
                  </div>
                </div>
              </div>
              
              <Button 
                type="button" 
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600"
                onClick={() => navigate("/admin/login")}
              >
                Continue to Admin Login
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;
