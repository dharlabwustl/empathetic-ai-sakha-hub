
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useOnboarding } from './OnboardingContext';
import { Eye, EyeOff, Mail } from 'lucide-react';
import PrepzrLogo from '@/components/common/PrepzrLogo';

const SignUpContent: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  
  const { register, googleSignIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setIsGoogleSignUp } = useOnboarding();
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    try {
      const success = await register(name, email, phone, password);
      
      if (success) {
        localStorage.setItem('new_user_signup', 'true');
        navigate('/dashboard/student?new=true');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: "Signup Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleSignUp = async () => {
    setLoading(true);
    try {
      const success = await googleSignIn();
      
      if (success) {
        setIsGoogleSignUp(true);
        localStorage.setItem('new_user_signup', 'true');
        navigate('/dashboard/student?new=true');
      }
    } catch (error) {
      console.error('Google signup error:', error);
      toast({
        title: "Google Signup Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md shadow-xl border-gray-100 dark:border-gray-700">
      <CardHeader className="space-y-1 items-center text-center">
        <div className="mb-4">
          <PrepzrLogo width={120} height={40} />
        </div>
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>Enter your details to create your account</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youremail@example.com"
              required
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone number"
              required
              disabled={loading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input 
                id="password" 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                disabled={loading}
                className="pr-10"
              />
              <button 
                type="button"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </Button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-800 px-2 text-gray-500">Or continue with</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={handleGoogleSignUp} 
          disabled={loading}
          type="button"
        >
          <Mail className="mr-2 h-4 w-4" />
          Google
        </Button>
        
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Button 
            variant="link" 
            className="p-0 h-auto" 
            onClick={() => navigate('/login')}
            disabled={loading}
          >
            Login
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpContent;
