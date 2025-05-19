
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Loader2, Mail, PhoneCall } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import PrepzrLogo from "@/components/common/PrepzrLogo";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate inputs
      if (activeTab === "email" && !email) {
        setError("Please enter your email address");
        return;
      }
      
      if (activeTab === "phone" && !phone) {
        setError("Please enter your phone number");
        return;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success message
      setSuccess(true);
      toast({
        title: "Reset link sent",
        description: activeTab === "email" 
          ? `Password reset instructions sent to ${email}` 
          : `Verification code sent to ${phone}`,
        variant: "default"
      });
      
      // Navigate back to login after delay
      setTimeout(() => {
        navigate('/admin/login');
      }, 3000);
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="flex flex-col items-center justify-center w-full px-4 py-12">
        <div className="mb-8">
          <Link to="/">
            <PrepzrLogo width={180} height={60} />
          </Link>
        </div>
        
        <div className="w-full max-w-md">
          <Card className="shadow-xl">
            <CardHeader className="space-y-1 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <CardTitle className="text-2xl">Admin Password Recovery</CardTitle>
              <CardDescription className="text-blue-100">
                Reset your admin account password
              </CardDescription>
            </CardHeader>
            
            {error && (
              <div className="px-6 pt-4">
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </div>
            )}
            
            {success ? (
              <CardContent className="space-y-4 pt-6">
                <div className="bg-green-50 text-green-800 p-4 rounded-md border border-green-200">
                  <p className="font-medium">Recovery instructions sent!</p>
                  <p className="text-sm mt-1">
                    {activeTab === "email" 
                      ? `Check your email at ${email} for instructions to reset your password.`
                      : `Check your phone at ${phone} for a verification code to continue.`
                    }
                  </p>
                </div>
                <p className="text-center text-sm text-gray-500">
                  You'll be redirected to the login page shortly...
                </p>
              </CardContent>
            ) : (
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 pt-4">
                  <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "email" | "phone")}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="email">Email</TabsTrigger>
                      <TabsTrigger value="phone">Phone</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="email" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <Mail size={16} />
                          </div>
                          <Input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setError(null);
                            }}
                            placeholder="admin@prepzr.com"
                            className="pl-9"
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="phone" className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <PhoneCall size={16} />
                          </div>
                          <Input
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              setError(null);
                            }}
                            placeholder="+1 (555) 123-4567"
                            className="pl-9"
                            disabled={isLoading}
                          />
                        </div>
                        <p className="text-xs text-gray-500">Include country code for international numbers</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                
                <CardFooter className="flex flex-col gap-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800" 
                    disabled={isLoading} 
                    type="submit"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Instructions...
                      </>
                    ) : (
                      activeTab === "email" ? "Send Reset Link" : "Send Verification Code"
                    )}
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="mt-2 flex items-center gap-1"
                    onClick={() => navigate('/admin/login')}
                    type="button"
                    disabled={isLoading}
                  >
                    <ArrowLeft size={16} />
                    Back to Login
                  </Button>
                </CardFooter>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminForgotPassword;
