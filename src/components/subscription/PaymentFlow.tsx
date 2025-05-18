
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, CheckCircle, CreditCard, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import CreditCardForm from './payment/CreditCardForm';
import UPIPayment from './payment/UPIPayment';
import NetBankingPayment from './payment/NetBankingPayment';
import { SubscriptionPlan } from '@/types/user/base';

interface PaymentFlowProps {
  selectedPlan: SubscriptionPlan;
  onCancel: () => void;
  onSuccess: (plan: SubscriptionPlan) => void;
}

const PaymentFlow: React.FC<PaymentFlowProps> = ({
  selectedPlan,
  onCancel,
  onSuccess
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handlePaymentSubmit = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    toast({
      title: "Processing payment",
      description: "Please wait while we process your payment..."
    });
    
    setTimeout(() => {
      setIsProcessing(false);
      setActiveTab('confirmation');
      
      toast({
        title: "Payment successful!",
        description: "Your subscription has been activated.",
        variant: "success"
      });
    }, 2000);
  };
  
  const handleComplete = () => {
    onSuccess(selectedPlan);
    navigate('/dashboard/student/profile', { state: { activeTab: 'billing' } });
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <Tabs value={activeTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="details" disabled={isProcessing}>Plan Details</TabsTrigger>
          <TabsTrigger value="payment" disabled={isProcessing || activeTab === 'confirmation'}>Payment</TabsTrigger>
          <TabsTrigger value="confirmation" disabled={activeTab !== 'confirmation'}>Confirmation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="py-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3">
              <Card>
                <CardHeader>
                  <CardTitle>Plan Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold">{selectedPlan.name}</h3>
                      <p className="text-muted-foreground">{selectedPlan.description}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">Features included:</h4>
                      <ul className="space-y-1">
                        {selectedPlan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <p className="text-sm text-muted-foreground">
                        By continuing, you agree to our Terms of Service and acknowledge that 
                        5% of your subscription will fund education for underprivileged students.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="w-full md:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>{selectedPlan.name}</span>
                      <span>₹{selectedPlan.price}</span>
                    </div>
                    
                    {selectedPlan.id.includes('annual') && (
                      <div className="flex justify-between text-green-600">
                        <span>Savings (vs monthly)</span>
                        <span>-₹{Math.round(selectedPlan.price / 6)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between font-bold border-t pt-4">
                      <span>Total</span>
                      <span>₹{selectedPlan.price}</span>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        className="w-full" 
                        onClick={() => setActiveTab('payment')}
                      >
                        Continue to Payment
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-2"
                        onClick={onCancel}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="payment" className="py-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-2/3">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'card' | 'upi' | 'netbanking')}>
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="card" className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        <span>Card</span>
                      </TabsTrigger>
                      <TabsTrigger value="upi" className="flex items-center gap-2">
                        <div className="h-4 w-4 bg-purple-100 rounded-full flex items-center justify-center text-xs font-bold text-purple-600">U</div>
                        <span>UPI</span>
                      </TabsTrigger>
                      <TabsTrigger value="netbanking" className="flex items-center gap-2">
                        <Wallet className="h-4 w-4" />
                        <span>Net Banking</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card">
                      <CreditCardForm onSubmit={handlePaymentSubmit} isProcessing={isProcessing} />
                    </TabsContent>
                    
                    <TabsContent value="upi">
                      <UPIPayment onSubmit={handlePaymentSubmit} isProcessing={isProcessing} />
                    </TabsContent>
                    
                    <TabsContent value="netbanking">
                      <NetBankingPayment onSubmit={handlePaymentSubmit} isProcessing={isProcessing} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
            
            <div className="w-full md:w-1/3">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>{selectedPlan.name}</span>
                      <span>₹{selectedPlan.price}</span>
                    </div>
                    
                    {selectedPlan.id.includes('annual') && (
                      <div className="flex justify-between text-green-600">
                        <span>Savings (vs monthly)</span>
                        <span>-₹{Math.round(selectedPlan.price / 6)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between font-bold border-t pt-4">
                      <span>Total</span>
                      <span>₹{selectedPlan.price}</span>
                    </div>
                    
                    <div className="pt-4">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setActiveTab('details')}
                      >
                        Back to Plan Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="confirmation" className="py-6">
          <Card className="max-w-md mx-auto border-green-200">
            <CardContent className="pt-6 text-center">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-green-100 p-6">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-muted-foreground mb-6">
                Your {selectedPlan.name} subscription has been activated.
                Thank you for contributing to our education fund for underprivileged students.
              </p>
              
              <Button
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500"
                onClick={handleComplete}
              >
                Continue to Dashboard
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentFlow;
