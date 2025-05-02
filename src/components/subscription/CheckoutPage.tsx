
import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { SubscriptionPlan } from '@/types/user/base';
import BatchInvitationInput from './BatchInvitationInput';

interface CheckoutPageProps {
  selectedPlan: SubscriptionPlan;
  onCancel: () => void;
  onSuccess: (plan: SubscriptionPlan, inviteCodes?: string[], emails?: string[]) => void;
  isGroupPlan: boolean;
  invitedEmails?: string[];
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  selectedPlan,
  onCancel,
  onSuccess,
  isGroupPlan,
  invitedEmails = []
}) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [savePaymentInfo, setSavePaymentInfo] = useState(true);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    emails: invitedEmails
  });
  
  const [groupEmails, setGroupEmails] = useState<string[]>([]);
  
  const addEmail = (email: string) => {
    if (!email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    if (groupEmails.includes(email)) {
      toast({
        title: "Email Already Added",
        description: "This email has already been added",
        variant: "destructive"
      });
      return;
    }
    
    setGroupEmails([...groupEmails, email]);
  };
  
  const removeEmail = (email: string) => {
    setGroupEmails(groupEmails.filter(e => e !== email));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (paymentMethod === 'card') {
      if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
        toast({
          title: "Missing Information",
          description: "Please fill in all card details",
          variant: "destructive"
        });
        return;
      }
      
      if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
        toast({
          title: "Invalid Card Number",
          description: "Please enter a valid 16-digit card number",
          variant: "destructive"
        });
        return;
      }
      
      if (formData.cvv.length < 3) {
        toast({
          title: "Invalid CVV",
          description: "Please enter a valid CVV",
          variant: "destructive"
        });
        return;
      }
    } else if (paymentMethod === 'upi' && !formData.upiId) {
      toast({
        title: "Missing UPI ID",
        description: "Please enter your UPI ID",
        variant: "destructive"
      });
      return;
    }
    
    // For group plans, check if emails are added
    if (isGroupPlan && groupEmails.length === 0 && selectedPlan.memberLimit && selectedPlan.memberLimit > 1) {
      toast({
        title: "No Team Members",
        description: "Please add at least one team member or continue without adding members",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate payment processing
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Payment Successful",
        description: `You've successfully subscribed to the ${selectedPlan.name} plan!`
      });
      
      // Generate invite codes if it's a group plan
      const inviteCodes = isGroupPlan && groupEmails.length > 0
        ? groupEmails.map(() => `PREPZR-${Math.random().toString(36).substring(2, 8).toUpperCase()}`)
        : undefined;
      
      setIsLoading(false);
      onSuccess(selectedPlan, inviteCodes, groupEmails.length > 0 ? groupEmails : undefined);
    }, 1500);
  };
  
  return (
    <div className="container max-w-4xl py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="ghost" className="mr-2" onClick={onCancel}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl font-bold">Checkout</h1>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <form onSubmit={handleFormSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select your preferred payment method</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Credit/Debit Card
                    </Label>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  {paymentMethod === 'card' && (
                    <div className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                          id="cardNumber" 
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456" 
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input 
                          id="cardName" 
                          name="cardName"
                          placeholder="John Doe" 
                          value={formData.cardName}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input 
                            id="expiryDate" 
                            name="expiryDate"
                            placeholder="MM/YY" 
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input 
                            id="cvv" 
                            name="cvv"
                            placeholder="123" 
                            type="password" 
                            value={formData.cvv}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="save-card" 
                          checked={savePaymentInfo}
                          onCheckedChange={setSavePaymentInfo}
                        />
                        <Label htmlFor="save-card">Save payment information for future purchases</Label>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2 pt-4">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi">UPI</Label>
                  </div>
                  
                  {paymentMethod === 'upi' && (
                    <div className="mt-4 space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input 
                          id="upiId" 
                          name="upiId"
                          placeholder="username@upi" 
                          value={formData.upiId}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}
                </RadioGroup>
                
                {isGroupPlan && selectedPlan.memberLimit && selectedPlan.memberLimit > 1 && (
                  <div className="mt-8 space-y-4">
                    <div>
                      <h3 className="font-semibold">Team Members</h3>
                      <p className="text-sm text-muted-foreground">
                        Add up to {selectedPlan.memberLimit - 1} team members to your {selectedPlan.name} plan
                      </p>
                    </div>
                    
                    <BatchInvitationInput 
                      onAddEmail={addEmail} 
                      placeholder="Enter email addresses"
                    />
                    
                    <div className="space-y-2">
                      {groupEmails.map((email, index) => (
                        <div key={index} className="flex items-center justify-between bg-muted/50 p-2 rounded-md">
                          <span>{email}</span>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeEmail(email)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      
                      {groupEmails.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Invite codes will be generated after checkout
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Pay ₹${selectedPlan.price}`
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>{selectedPlan.name} Plan ({selectedPlan.id.includes('annual') ? 'Annual' : 'Monthly'})</span>
                <span>₹{selectedPlan.price}</span>
              </div>
              
              {selectedPlan.originalPrice && (
                <div className="flex justify-between text-sm">
                  <span>You save</span>
                  <span className="text-green-600">₹{selectedPlan.originalPrice - selectedPlan.price}</span>
                </div>
              )}
              
              <Separator />
              
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{selectedPlan.price}</span>
              </div>
              
              <div className="mt-4 text-sm">
                <h4 className="font-medium mb-2">Plan Features:</h4>
                <ul className="space-y-1">
                  {selectedPlan.features.map((feature, i) => (
                    <li key={i} className="flex items-baseline">
                      <Check className="h-3 w-3 mr-2 text-green-500 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {isGroupPlan && (
                <div className="mt-4 text-sm">
                  <p className="text-muted-foreground">
                    This plan allows up to {selectedPlan.memberLimit} team members
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
