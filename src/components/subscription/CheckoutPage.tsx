
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, CheckCircle, CreditCard, Wallet } from 'lucide-react';
import PaymentMethodSelector from './payment/PaymentMethodSelector';
import CreditCardForm from './payment/CreditCardForm';
import UPIPayment from './payment/UPIPayment';
import NetBankingPayment from './payment/NetBankingPayment';
import { SubscriptionPlan } from '@/types/user/base';

interface CheckoutPageProps {
  selectedPlan: SubscriptionPlan;
  onCancel: () => void;
  onSuccess: (plan: SubscriptionPlan, inviteCodes?: string[], emails?: string[]) => void;
  isGroupPlan?: boolean;
  invitedEmails?: string[];
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  selectedPlan,
  onCancel,
  onSuccess,
  isGroupPlan = false,
  invitedEmails = []
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'upi' | 'net_banking' | 'wallet'>('credit_card');
  const [emails, setEmails] = useState<string[]>(invitedEmails);

  const handlePaymentSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setIsComplete(true);
    
    // Simulate successful payment
    setTimeout(() => {
      const mockInviteCodes = isGroupPlan ? emails.map(() => `PREP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`) : undefined;
      onSuccess(selectedPlan, mockInviteCodes, isGroupPlan ? emails : undefined);
    }, 1500);
  };

  // Render payment form based on selected method
  const renderPaymentForm = () => {
    switch(paymentMethod) {
      case 'credit_card':
        return <CreditCardForm onSubmit={handlePaymentSubmit} isProcessing={isProcessing} />;
      case 'upi':
        return <UPIPayment onSubmit={handlePaymentSubmit} isProcessing={isProcessing} />;
      case 'net_banking':
        return <NetBankingPayment onSubmit={handlePaymentSubmit} isProcessing={isProcessing} />;
      case 'wallet':
        return (
          <div className="text-center py-8">
            <p className="mb-4">Wallet payment options coming soon!</p>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setPaymentMethod('credit_card')}
            >
              Try another payment method
            </Button>
          </div>
        );
      default:
        return <CreditCardForm onSubmit={handlePaymentSubmit} isProcessing={isProcessing} />;
    }
  };

  if (isComplete) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="border-green-200">
          <CardContent className="pt-6 text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your {selectedPlan.name} subscription has been activated.
              <br />
              <span className="text-sm text-green-600">
                5% of your subscription helps fund education for underprivileged students.
              </span>
            </p>
            <Button
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
              onClick={() => onSuccess(selectedPlan)}
            >
              Continue to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Order summary */}
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-bold text-lg">{selectedPlan.name} Plan</p>
              <p className="text-gray-500">{selectedPlan.description || 'Complete AI-powered learning companion'}</p>
              
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subscription</span>
                  <span>₹{selectedPlan.price}.00</span>
                </div>
                {selectedPlan.id.includes('annual') && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Savings (2 months)</span>
                    <span>-₹{Math.round(selectedPlan.price / 6)}.00</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-lg border-t border-dashed mt-2 pt-2">
                  <span>Total</span>
                  <span>₹{selectedPlan.price}.00</span>
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full mt-6"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
          
          {/* Show donation information */}
          <Card className="mt-4 bg-gradient-to-r from-purple-50 to-blue-50 border-blue-100">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-purple-100 p-1 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 text-purple-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>
                <span className="font-medium">Making a difference</span>
              </div>
              <p className="text-xs text-gray-600">
                5% of your subscription will help fund free access to our platform for underprivileged students.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Payment form */}
        <div className="w-full md:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <PaymentMethodSelector 
                selectedMethod={paymentMethod}
                onSelectPaymentMethod={(method) => setPaymentMethod(method as 'credit_card' | 'upi' | 'net_banking' | 'wallet')}
              />
              
              <div className="mt-6">
                {renderPaymentForm()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
