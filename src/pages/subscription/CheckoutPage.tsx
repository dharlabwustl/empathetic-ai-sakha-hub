
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, ArrowLeft, Shield, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface Plan {
  id: string;
  name: string;
  price: number;
  userCount?: number;
  emails?: string[];
  inviteCodes?: string[];
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'netbanking'>('card');
  
  // Get plan data from localStorage (set in the modal)
  const planDataString = localStorage.getItem('groupPlanCheckoutData');
  const plan: Plan | null = planDataString ? JSON.parse(planDataString) : null;
  
  if (!plan) {
    // Redirect if no plan data found
    navigate('/subscription');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (paymentMethod === 'card' && (!cardNumber || !expiryDate || !cvv || !nameOnCard)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all payment details",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentCompleted(true);
      
      toast({
        title: "Payment Successful",
        description: "Your group subscription has been activated",
      });
      
      // Save subscription data to localStorage
      const subscriptionData = {
        planId: plan.id,
        planName: plan.name,
        price: plan.price,
        userCount: plan.userCount || 5,
        isGroupLeader: true,
        purchaseDate: new Date().toISOString(),
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
        members: [
          { email: localStorage.getItem('userEmail') || '', isLeader: true, status: 'active' },
          ...(plan.emails || []).map(email => ({ email, isLeader: false, status: 'invited' }))
        ],
        inviteCodes: plan.inviteCodes || [],
      };
      
      localStorage.setItem('subscriptionData', JSON.stringify(subscriptionData));
      
      // Redirect after payment completion
      setTimeout(() => {
        navigate('/dashboard/profile');
      }, 2000);
    }, 2000);
  };
  
  const formatCardNumber = (input: string) => {
    const numbers = input.replace(/\D/g, '');
    const groups = [];
    
    for (let i = 0; i < numbers.length && i < 16; i += 4) {
      groups.push(numbers.slice(i, i + 4));
    }
    
    return groups.join(' ');
  };
  
  const formatExpiryDate = (input: string) => {
    const numbers = input.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
  };

  return (
    <div className="min-h-screen py-12 px-4 max-w-5xl mx-auto">
      <div className="mb-8">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <h1 className="text-3xl font-bold">Checkout</h1>
        <p className="text-gray-500 dark:text-gray-400">Complete your purchase</p>
      </div>
      
      {paymentCompleted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto"
        >
          <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-800/30 flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <CardTitle className="text-center text-2xl">Payment Successful</CardTitle>
              <CardDescription className="text-center text-lg">
                Your group subscription has been activated
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-center">
                <p>
                  Thank you for your purchase! Your group leader account has been activated, and invitations have been sent to your group members.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  You will be redirected to your profile page shortly...
                </p>
                <div className="flex justify-center">
                  <Button onClick={() => navigate('/dashboard/profile')}>
                    Go to Profile
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>Select your payment method and enter details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <RadioGroup defaultValue="card" value={paymentMethod} onValueChange={(val) => setPaymentMethod(val as any)}>
                      <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2 border p-4 rounded-md bg-white dark:bg-gray-900">
                          <RadioGroupItem value="card" id="payment-card" />
                          <Label htmlFor="payment-card" className="flex-grow font-medium flex items-center">
                            <CreditCard className="h-4 w-4 mr-2" /> Credit/Debit Card
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border p-4 rounded-md bg-white dark:bg-gray-900">
                          <RadioGroupItem value="upi" id="payment-upi" />
                          <Label htmlFor="payment-upi" className="flex-grow font-medium">UPI</Label>
                        </div>
                        <div className="flex items-center space-x-2 border p-4 rounded-md bg-white dark:bg-gray-900">
                          <RadioGroupItem value="netbanking" id="payment-netbanking" />
                          <Label htmlFor="payment-netbanking" className="flex-grow font-medium">Net Banking</Label>
                        </div>
                      </div>
                    </RadioGroup>
                    
                    {paymentMethod === 'card' && (
                      <div className="space-y-4 mt-6">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input 
                            id="cardName" 
                            placeholder="John Doe"
                            value={nameOnCard}
                            onChange={(e) => setNameOnCard(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input 
                            id="cardNumber" 
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                            maxLength={19}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input 
                              id="expiry" 
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                              maxLength={5}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <Input 
                              id="cvv" 
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                              maxLength={3}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {paymentMethod === 'upi' && (
                      <div className="space-y-4 mt-6">
                        <div className="space-y-2">
                          <Label htmlFor="upiId">UPI ID</Label>
                          <Input 
                            id="upiId" 
                            placeholder="yourname@upi"
                            required
                          />
                        </div>
                      </div>
                    )}
                    
                    {paymentMethod === 'netbanking' && (
                      <div className="space-y-4 mt-6">
                        <div className="space-y-2">
                          <Label htmlFor="bank">Select Bank</Label>
                          <select 
                            id="bank"
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-md px-3 py-2 bg-white dark:bg-gray-900"
                            required
                          >
                            <option value="">Select your bank</option>
                            <option value="sbi">State Bank of India</option>
                            <option value="icici">ICICI Bank</option>
                            <option value="hdfc">HDFC Bank</option>
                            <option value="axis">Axis Bank</option>
                          </select>
                        </div>
                      </div>
                    )}
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-3 text-blue-800 dark:text-blue-300 text-sm flex items-start">
                      <Shield className="h-4 w-4 mr-2 mt-0.5" />
                      <div>
                        Your payment information is secure and encrypted. We do not store your card details.
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                    <h3 className="font-medium mb-2">{plan.name}</h3>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Plan price</span>
                      <span>₹{plan.price}/month</span>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Members</span>
                      <span>{plan.userCount} users</span>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Per user</span>
                      <span>₹{Math.round(plan.price / (plan.userCount || 5))}/month</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Subtotal</span>
                      <span>₹{plan.price}</span>
                    </div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm">Tax</span>
                      <span>₹{Math.round(plan.price * 0.18)}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-between font-bold">
                      <span>Total</span>
                      <span>₹{plan.price + Math.round(plan.price * 0.18)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md text-sm">
                    <div className="flex items-center gap-2 mb-2 text-gray-700 dark:text-gray-300 font-medium">
                      <Clock className="h-4 w-4" />
                      Billing Cycle
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      You'll be charged monthly. Cancel anytime from your profile.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Group Members</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex justify-between">
                        <span>You (Group Leader)</span>
                        <Badge>Leader</Badge>
                      </li>
                      {plan.emails?.map((email, index) => (
                        <li key={index} className="flex justify-between">
                          <span className="truncate max-w-[200px]">{email}</span>
                          <Badge variant="outline">Invited</Badge>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleSubmit} 
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : `Pay ₹${plan.price + Math.round(plan.price * 0.18)}`}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
