
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Eye, EyeOff, Check, X, Mail, Smartphone, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { TabsList, TabsTrigger, Tabs, TabsContent } from '@/components/ui/tabs';

interface SignupStepProps {
  onSubmit: (formValues: { name: string; mobile: string; email: string; password: string; otp: string }) => void;
  isLoading: boolean;
}

const SignupStep: React.FC<SignupStepProps> = ({ onSubmit, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'mobile' | 'email'>('mobile');
  const [formValues, setFormValues] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });
  const [showOtpField, setShowOtpField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    
    // Check password strength when password field changes
    if (name === 'password') {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password: string) => {
    if (password.length === 0) {
      setPasswordStrength(null);
      return;
    }
    
    if (password.length < 8) {
      setPasswordStrength('weak');
      return;
    }
    
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    const strength = 
      (hasUpperCase ? 1 : 0) +
      (hasLowerCase ? 1 : 0) +
      (hasNumbers ? 1 : 0) +
      (hasSpecialChars ? 1 : 0);
      
    if (strength <= 2) {
      setPasswordStrength('weak');
    } else if (strength === 3) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('strong');
    }
  };

  const handleRequestOtp = () => {
    // Simulate OTP sending
    setOtpSent(true);
    setShowOtpField(true);
    
    // In a real app, this would make an API call to send OTP
    setTimeout(() => {
      // For demo, let's auto-fill OTP
      setFormValues((prev) => ({ ...prev, otp: '123456' }));
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formValues.password !== formValues.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    if (passwordStrength === 'weak') {
      alert("Please choose a stronger password");
      return;
    }
    
    // For email login, we don't need OTP validation
    if (activeTab === 'email' || showOtpField) {
      onSubmit({
        name: formValues.name,
        mobile: activeTab === 'mobile' ? formValues.mobile : '',
        email: activeTab === 'email' ? formValues.email : '',
        password: formValues.password,
        otp: formValues.otp
      });
    } else {
      // For mobile without OTP, request OTP first
      handleRequestOtp();
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  const renderPasswordRequirements = () => {
    const requirements = [
      { label: 'At least 8 characters', met: formValues.password.length >= 8 },
      { label: 'Contains uppercase letter', met: /[A-Z]/.test(formValues.password) },
      { label: 'Contains number', met: /[0-9]/.test(formValues.password) },
      { label: 'Contains special character', met: /[!@#$%^&*(),.?":{}|<>]/.test(formValues.password) },
    ];

    return (
      <div className="text-xs space-y-1 mt-1 text-gray-600 dark:text-gray-400">
        {requirements.map((req, idx) => (
          <div key={idx} className="flex items-center">
            {req.met ? (
              <Check className="h-3 w-3 mr-1 text-green-500" />
            ) : (
              <X className="h-3 w-3 mr-1 text-gray-400" />
            )}
            <span className={req.met ? 'text-green-600 dark:text-green-400' : ''}>{req.label}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
          >
            <Shield className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Create your account</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Enter your details to complete signup
          </p>
        </div>

        <Tabs defaultValue="mobile" className="w-full" value={activeTab} onValueChange={(value) => setActiveTab(value as 'mobile' | 'email')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="mobile" className="flex items-center gap-1">
              <Smartphone className="h-4 w-4" />
              <span>Mobile</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Your full name"
                value={formValues.name}
                onChange={handleInputChange}
                required
                className="mt-1"
              />
            </div>

            <TabsContent value="mobile" className="space-y-4 mt-0 pt-0">
              <div>
                <Label htmlFor="mobile">Mobile Number</Label>
                <div className="flex mt-1">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    +91
                  </span>
                  <Input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    placeholder="Your mobile number"
                    value={formValues.mobile}
                    onChange={handleInputChange}
                    required
                    className="rounded-l-none"
                    pattern="[0-9]{10}"
                    title="Please enter a valid 10-digit mobile number"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  We'll send you a verification code
                </p>
              </div>

              {showOtpField && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    name="otp"
                    placeholder="Enter 6-digit OTP"
                    value={formValues.otp}
                    onChange={handleInputChange}
                    required={showOtpField}
                    className="mt-1"
                  />
                  <div className="flex justify-between text-xs mt-1">
                    <span className="text-gray-500">
                      {otpSent ? "OTP sent to your mobile" : ""}
                    </span>
                    {otpSent && (
                      <button
                        type="button"
                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                        onClick={handleRequestOtp}
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="email" className="space-y-4 mt-0 pt-0">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  value={formValues.email}
                  onChange={handleInputChange}
                  required={activeTab === 'email'}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  We'll send you important updates and notifications
                </p>
              </div>
            </TabsContent>

            <div className="space-y-4">
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formValues.password}
                    onChange={handleInputChange}
                    required
                    className="pr-10"
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {formValues.password && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-2"
                  >
                    <div className="flex items-center gap-1 mb-1">
                      <div className={`h-2 flex-grow rounded-full ${getPasswordStrengthColor()}`}></div>
                      <span className="text-xs text-gray-500 w-16">
                        {passwordStrength === 'weak' && 'Weak'}
                        {passwordStrength === 'medium' && 'Medium'}
                        {passwordStrength === 'strong' && 'Strong'}
                      </span>
                    </div>
                    {renderPasswordRequirements()}
                  </motion.div>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formValues.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="pr-10"
                  />
                </div>
                {formValues.password && formValues.confirmPassword && formValues.password !== formValues.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">Passwords don't match</p>
                )}
                {formValues.password && formValues.confirmPassword && formValues.password === formValues.confirmPassword && (
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <Check className="h-4 w-4 mr-1" /> Passwords match
                  </p>
                )}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="pt-2"
            >
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
                disabled={isLoading || (showOtpField && !formValues.otp)}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account
                  </>
                ) : showOtpField ? (
                  'Create Account'
                ) : (
                  activeTab === 'mobile' ? 'Send OTP' : 'Create Account'
                )}
              </Button>
            </motion.div>

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
              By signing up, you agree to our{' '}
              <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                Privacy Policy
              </a>
            </p>
          </form>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default SignupStep;
