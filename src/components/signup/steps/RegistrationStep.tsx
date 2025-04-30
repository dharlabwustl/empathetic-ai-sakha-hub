
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { useOnboardingContext } from '../OnboardingContext';

interface RegistrationStepProps {
  onNext: () => void;
}

const RegistrationStep: React.FC<RegistrationStepProps> = ({ onNext }) => {
  const { toast } = useToast();
  const { updateFormData, formData } = useOnboardingContext();
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreeTerms) {
      toast({
        title: "Terms & Conditions Required",
        description: "Please agree to our terms and conditions to continue.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Here you would normally make an API call to register the user
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      updateFormData({
        ...formData,
        agreedToTerms: agreeTerms
      });
      
      toast({
        title: "Registration successful!",
        description: "Your account has been created.",
      });
      
      onNext();
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name"
              type="text"
              placeholder="Your full name"
              value={formData.name || ''}
              onChange={(e) => updateFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email || ''}
              onChange={(e) => updateFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone"
              type="tel"
              placeholder="+91 1234567890"
              value={formData.phone || ''}
              onChange={(e) => updateFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          
          <div className="flex items-start space-x-2 pt-2">
            <Checkbox 
              id="terms" 
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(checked === true)}
            />
            <div className="grid gap-1.5 leading-none">
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the Terms & Conditions and Privacy Policy
              </Label>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Continue"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegistrationStep;
