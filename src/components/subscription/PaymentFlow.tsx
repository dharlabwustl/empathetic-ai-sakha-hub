
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CreditCard, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SubscriptionPlan } from '@/types/user/base';
import BatchInvitationInput from './batch/BatchInvitationInput';
import CheckoutPage from './CheckoutPage';

interface PaymentFlowProps {
  selectedPlan: SubscriptionPlan;
  isGroupPlan?: boolean;
  onCancel: () => void;
  onSuccess: (plan: SubscriptionPlan, inviteCodes?: string[], emails?: string[]) => void;
}

const PaymentFlow: React.FC<PaymentFlowProps> = ({
  selectedPlan,
  isGroupPlan = false,
  onCancel,
  onSuccess
}) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<'invitation' | 'checkout'>(isGroupPlan ? 'invitation' : 'checkout');
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);

  // Handle invitation emails for group plans
  const handleBatchInvitationComplete = (emails: string[]) => {
    setInvitedEmails(emails);
    toast({
      title: "Invitations Ready",
      description: `Added ${emails.length} email(s) for invitation after checkout`
    });
    setCurrentStep('checkout');
  };

  // Handle back button navigation
  const handleBack = () => {
    if (currentStep === 'checkout' && isGroupPlan) {
      setCurrentStep('invitation');
    } else {
      onCancel();
    }
  };

  // Determine the maximum members allowed based on the plan
  const getMaxMembers = () => {
    const planName = selectedPlan.name.toLowerCase();
    if (planName.includes('team')) return 5;
    if (planName.includes('enterprise')) return 20;
    return 3; // Default for basic group plans
  };

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center gap-1"
          onClick={handleBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <div className="flex items-center gap-2">
          {isGroupPlan && (
            <div className={`flex items-center ${currentStep === 'invitation' ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-1 text-xs">
                1
              </div>
              <span className="text-sm font-medium">Invitations</span>
            </div>
          )}
          
          <div className={`flex items-center ${currentStep === 'checkout' ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-1 text-xs">
              {isGroupPlan ? '2' : '1'}
            </div>
            <span className="text-sm font-medium">Checkout</span>
          </div>
        </div>
      </div>
      
      {currentStep === 'invitation' && isGroupPlan && (
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Group Subscription Setup
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                You're setting up a group subscription for <strong>{selectedPlan.name}</strong>. 
                You can add team members now or invite them later after checkout.
              </p>
              <BatchInvitationInput 
                planId={selectedPlan.id}
                maxMembers={getMaxMembers()}
                onComplete={handleBatchInvitationComplete}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button onClick={() => setCurrentStep('checkout')}>
                <CreditCard className="mr-2 h-4 w-4" />
                Continue to Payment
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      
      {currentStep === 'checkout' && (
        <CheckoutPage
          selectedPlan={selectedPlan}
          onCancel={handleBack}
          onSuccess={onSuccess}
          isGroupPlan={isGroupPlan}
          invitedEmails={invitedEmails}
        />
      )}
    </div>
  );
};

export default PaymentFlow;
