
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Check } from "lucide-react";
import { SubscriptionPlan } from '@/types/user/base';

interface CheckoutPageProps {
  selectedPlan: SubscriptionPlan;
  isGroupPlan?: boolean;
  invitedEmails?: string[];
  onCancel: () => void;
  onSuccess: (plan: SubscriptionPlan, inviteCodes?: string[], emails?: string[]) => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  selectedPlan,
  isGroupPlan = false,
  invitedEmails = [],
  onCancel,
  onSuccess
}) => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      toast({
        title: "Missing Information",
        description: "Please fill in all payment details",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Simulate success
      toast({
        title: "Payment Successful",
        description: `You have successfully subscribed to the ${selectedPlan.name} plan!`,
      });
      
      // Pass back to parent component
      onSuccess(selectedPlan, undefined, invitedEmails);
    }, 2000);
  };
  
  const formatCardNumber = (value: string) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Limit to 16 digits
    const truncated = digits.slice(0, 16);
    
    // Add spaces every 4 digits
    const formatted = truncated.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    setCardNumber(formatted);
  };
  
  const formatExpiryDate = (value: string) => {
    // Remove any non-digit characters
    const digits = value.replace(/\D/g, '');
    
    // Format as MM/YY
    if (digits.length >= 3) {
      setExpiryDate(`${digits.slice(0, 2)}/${digits.slice(2, 4)}`);
    } else {
      setExpiryDate(digits);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Order Summary */}
          <div className="bg-muted/50 p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">Order Summary</h3>
            <div className="flex justify-between text-sm mb-1">
              <span>Plan</span>
              <span className="font-medium">{selectedPlan.name} {isGroupPlan ? '(Group)' : '(Individual)'}</span>
            </div>
            
            {isGroupPlan && (
              <div className="flex justify-between text-sm mb-1">
                <span>Members</span>
                <span className="font-medium">{invitedEmails.length + 1} (You + {invitedEmails.length} invites)</span>
              </div>
            )}
            
            <div className="flex justify-between text-sm mb-1">
              <span>Duration</span>
              <span className="font-medium">{selectedPlan.id.includes('annual') ? 'Annual' : 'Monthly'}</span>
            </div>
            
            <Separator className="my-2" />
            
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${selectedPlan.price.toFixed(2)} {selectedPlan.id.includes('annual') ? '/year' : '/month'}</span>
            </div>
          </div>
          
          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Cardholder Name</Label>
                <Input 
                  id="name" 
                  placeholder="Name on card" 
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="number">Card Number</Label>
                <Input 
                  id="number" 
                  placeholder="XXXX XXXX XXXX XXXX" 
                  value={cardNumber}
                  onChange={(e) => formatCardNumber(e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input 
                    id="expiry" 
                    placeholder="MM/YY" 
                    value={expiryDate}
                    onChange={(e) => formatExpiryDate(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input 
                    id="cvv"
                    placeholder="XXX"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    required
                    type="password"
                  />
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel} disabled={isProcessing}>
            Back
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
                Processing...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Complete Payment
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckoutPage;
