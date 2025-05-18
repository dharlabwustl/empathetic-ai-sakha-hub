
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, CreditCard, Banknote, Check, Loader2 } from 'lucide-react';
import { SubscriptionPlan } from '@/types/user/base';
import BatchInvitationInput from './batch/BatchInvitationInput';

interface PaymentFlowProps {
  selectedPlan: SubscriptionPlan;
  isGroupPlan?: boolean;
  onCancel: () => void;
  onSuccess: (plan: SubscriptionPlan) => void;
}

interface CardDetails {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

interface UpiDetails {
  upiId: string;
}

const PaymentFlow: React.FC<PaymentFlowProps> = ({
  selectedPlan,
  isGroupPlan = false,
  onCancel,
  onSuccess
}) => {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'payment' | 'team' | 'confirmation'>(isGroupPlan ? 'team' : 'payment');
  
  // Card payment state
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    cardNumber: '',
    cardholderName: '',
    expiryDate: '',
    cvv: ''
  });
  
  // UPI payment state
  const [upiDetails, setUpiDetails] = useState<UpiDetails>({
    upiId: ''
  });
  
  // Validation checks
  const isCardValid = () => {
    return (
      cardDetails.cardNumber.replace(/\s/g, '').length === 16 &&
      cardDetails.cardholderName.trim().length > 0 &&
      /^\d{2}\/\d{2}$/.test(cardDetails.expiryDate) &&
      cardDetails.cvv.length >= 3
    );
  };
  
  const isUpiValid = () => {
    return /^[\w.-]+@[\w-]+$/.test(upiDetails.upiId);
  };
  
  const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    
    // Format with spaces every 4 digits
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    setCardDetails({
      ...cardDetails,
      cardNumber: formatted
    });
  };
  
  const handleExpiryDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, '');
    
    if (value.length > 4) value = value.slice(0, 4);
    
    // Format as MM/YY
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    
    setCardDetails({
      ...cardDetails,
      expiryDate: value
    });
  };
  
  const handleCvvChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    
    setCardDetails({
      ...cardDetails,
      cvv: value
    });
  };
  
  const handlePaymentSubmit = async () => {
    setLoading(true);
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would call an API to process the payment
      onSuccess(selectedPlan);
      
      toast({
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
      });
    } catch (error) {
      console.error("Payment error:", error);
      toast({
        title: "Payment Failed",
        description: "There was a problem processing your payment. Please try again.",
        variant: "destructive"
      });
      setLoading(false);
    }
  };
  
  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.cardNumber}
                onChange={handleCardNumberChange}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardholderName">Cardholder Name</Label>
              <Input
                id="cardholderName"
                placeholder="John Doe"
                value={cardDetails.cardholderName}
                onChange={(e) => setCardDetails({ ...cardDetails, cardholderName: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={handleExpiryDateChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="password"
                  placeholder="123"
                  value={cardDetails.cvv}
                  onChange={handleCvvChange}
                  maxLength={4}
                />
              </div>
            </div>
          </div>
        );
        
      case 'upi':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="upiId">UPI ID</Label>
              <Input
                id="upiId"
                placeholder="yourname@upi"
                value={upiDetails.upiId}
                onChange={(e) => setUpiDetails({ ...upiDetails, upiId: e.target.value })}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Enter your UPI ID and you'll receive a payment request on your UPI app.
            </p>
          </div>
        );
        
      case 'netbanking':
        return (
          <div className="space-y-4">
            <p className="text-center py-4">
              You'll be redirected to your bank's website to complete the payment.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank', 'Kotak Bank', 'Other Banks'].map((bank) => (
                <Button
                  key={bank}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center"
                >
                  <span className="text-sm">{bank}</span>
                </Button>
              ))}
            </div>
          </div>
        );
    }
  };
  
  if (step === 'team' && isGroupPlan) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Invite Team Members</CardTitle>
          <CardDescription>Add members to your {selectedPlan.name} plan</CardDescription>
        </CardHeader>
        <CardContent>
          <BatchInvitationInput 
            planId={selectedPlan.id}
            maxMembers={selectedPlan.maxMembers || 5}
          />
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="ghost" onClick={onCancel}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <Button onClick={() => setStep('payment')}>
            Continue to Payment
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Checkout</CardTitle>
        <CardDescription>
          {selectedPlan.name} - ₹{selectedPlan.price}{selectedPlan.type.includes('annual') ? '/year' : '/month'}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Summary */}
        <Card className="bg-muted/40">
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Plan</span>
                <span className="font-medium">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Price</span>
                <span className="font-medium">₹{selectedPlan.price}{selectedPlan.type.includes('annual') ? '/year' : '/month'}</span>
              </div>
              {isGroupPlan && (
                <div className="flex justify-between">
                  <span>Team Members</span>
                  <span className="font-medium">Up to {selectedPlan.maxMembers}</span>
                </div>
              )}
              <div className="flex justify-between border-t pt-2 mt-2">
                <span className="font-medium">Total</span>
                <span className="font-bold">₹{selectedPlan.price}</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Payment Methods */}
        <div>
          <Tabs defaultValue="card" onValueChange={(value) => setPaymentMethod(value as any)}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="card" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>Card</span>
              </TabsTrigger>
              <TabsTrigger value="upi">
                <span>UPI</span>
              </TabsTrigger>
              <TabsTrigger value="netbanking">
                <span>Net Banking</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="card">
              {renderPaymentForm()}
            </TabsContent>
            <TabsContent value="upi">
              {renderPaymentForm()}
            </TabsContent>
            <TabsContent value="netbanking">
              {renderPaymentForm()}
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Features included */}
        <div>
          <h3 className="text-sm font-medium mb-2">Included in {selectedPlan.name}:</h3>
          <ul className="space-y-1">
            {selectedPlan.features.map((feature, index) => (
              <li key={index} className="text-sm flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col sm:flex-row justify-between border-t pt-6 space-y-4 sm:space-y-0">
        <Button variant="outline" onClick={isGroupPlan && step === 'payment' ? () => setStep('team') : onCancel}>
          {isGroupPlan && step === 'payment' ? 'Back to Invitations' : 'Cancel'}
        </Button>
        <Button 
          onClick={handlePaymentSubmit}
          disabled={loading || (paymentMethod === 'card' && !isCardValid()) || (paymentMethod === 'upi' && !isUpiValid())}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay ₹${selectedPlan.price}`
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentFlow;
