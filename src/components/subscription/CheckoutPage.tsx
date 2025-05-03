
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle } from 'lucide-react';
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
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');
  const [emails, setEmails] = useState<string[]>(invitedEmails);
  const [newEmail, setNewEmail] = useState('');

  const handleAddEmail = () => {
    if (newEmail && !emails.includes(newEmail) && emails.length < 4) {
      setEmails([...emails, newEmail]);
      setNewEmail('');
    }
  };

  const handleRemoveEmail = (email: string) => {
    setEmails(emails.filter(e => e !== email));
  };

  const handlePaymentMethodChange = (method: 'card' | 'upi') => {
    setPaymentMethod(method);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
              <p className="text-gray-500">{selectedPlan.description}</p>
              
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
          
          {isGroupPlan && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">Invite up to 4 team members to join your group plan.</p>
                
                <div className="space-y-2 mb-4">
                  {emails.map((email, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded">
                      <span className="flex-1 text-sm truncate">{email}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 w-6 p-0"
                        onClick={() => handleRemoveEmail(email)}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
                
                {emails.length < 4 && (
                  <div className="flex gap-2">
                    <Input 
                      type="email" 
                      placeholder="Enter email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleAddEmail}>Add</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Payment form */}
        <div className="w-full md:w-2/3">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Button 
                  type="button"
                  variant={paymentMethod === 'card' ? 'default' : 'outline'}
                  className={`flex-1 ${paymentMethod === 'card' ? 'bg-blue-600' : ''}`}
                  onClick={() => handlePaymentMethodChange('card')}
                >
                  Credit/Debit Card
                </Button>
                <Button 
                  type="button"
                  variant={paymentMethod === 'upi' ? 'default' : 'outline'}
                  className={`flex-1 ${paymentMethod === 'upi' ? 'bg-blue-600' : ''}`}
                  onClick={() => handlePaymentMethodChange('upi')}
                >
                  UPI
                </Button>
              </div>
              
              <form onSubmit={handleSubmit}>
                {paymentMethod === 'card' ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input 
                        id="card-number" 
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                        required={paymentMethod === 'card'}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Name on Card</Label>
                      <Input 
                        id="card-name" 
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                        required={paymentMethod === 'card'}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input 
                          id="expiry" 
                          placeholder="MM/YY"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                          required={paymentMethod === 'card'}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input 
                          id="cvv" 
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                          required={paymentMethod === 'card'}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="upi-id">UPI ID</Label>
                      <Input 
                        id="upi-id" 
                        placeholder="your-upi-id@bank"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        required={paymentMethod === 'upi'}
                      />
                    </div>
                  </div>
                )}
                
                <div className="mt-6">
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay ₹${selectedPlan.price}.00`
                    )}
                  </Button>
                  
                  <p className="text-xs text-center mt-4 text-gray-500">
                    Your payment is secure and encrypted. By proceeding, you agree to our Terms of Service.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
