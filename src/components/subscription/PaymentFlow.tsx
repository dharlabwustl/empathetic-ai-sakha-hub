
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CheckoutPage from './CheckoutPage';
import BatchInvitationInput from './BatchInvitationInput';
import { SubscriptionPlan } from '@/types/user/base';

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
  const [activeStep, setActiveStep] = useState<'team' | 'checkout'>(!isGroupPlan ? 'checkout' : 'team');
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);
  
  // If this is a trial or free plan, bypass payment
  const isFreeOrTrial = selectedPlan.price === 0 || selectedPlan.id.includes('trial');
  
  const handleTeamContinue = () => {
    setActiveStep('checkout');
  };
  
  const handleAddEmail = (email: string) => {
    if (email && !invitedEmails.includes(email)) {
      setInvitedEmails(prevEmails => [...prevEmails, email]);
      return true;
    }
    return false;
  };
  
  const handleRemoveEmail = (email: string) => {
    setInvitedEmails(prevEmails => prevEmails.filter(e => e !== email));
  };
  
  if (isFreeOrTrial) {
    // For free trials, skip payment flow
    setTimeout(() => {
      onSuccess(selectedPlan);
    }, 0);
    return null;
  }
  
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Complete Your Subscription</h1>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
        
        {isGroupPlan && (
          <Tabs value={activeStep} className="mb-6">
            <TabsList>
              <TabsTrigger value="team" disabled={activeStep === 'checkout'}>Invite Team Members</TabsTrigger>
              <TabsTrigger value="checkout">Checkout</TabsTrigger>
            </TabsList>
            <TabsContent value="team">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Invite Team Members</h2>
                <p className="mb-4">Invite team members to join your group plan. You can add up to 10 members.</p>
                
                <div className="mb-6">
                  <BatchInvitationInput 
                    onAddEmail={handleAddEmail}
                    onRemoveEmail={handleRemoveEmail}
                    invitedEmails={invitedEmails}
                    maxInvites={10}
                  />
                </div>
                
                <div className="text-right">
                  <Button onClick={handleTeamContinue}>
                    Continue to Checkout
                  </Button>
                </div>
              </Card>
            </TabsContent>
            <TabsContent value="checkout">
              <CheckoutPage 
                selectedPlan={selectedPlan}
                onCancel={onCancel}
                onSuccess={onSuccess}
                isGroupPlan={isGroupPlan}
                invitedEmails={invitedEmails}
              />
            </TabsContent>
          </Tabs>
        )}
        
        {!isGroupPlan && (
          <CheckoutPage 
            selectedPlan={selectedPlan}
            onCancel={onCancel}
            onSuccess={onSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentFlow;
