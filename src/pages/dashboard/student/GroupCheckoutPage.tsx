
import React, { useState } from 'react';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import DashboardLoading from './DashboardLoading';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { GroupPaymentSection } from '@/components/checkout/GroupPaymentSection';
import { GroupOrderSummary } from '@/components/checkout/GroupOrderSummary';
import { useGroupCheckout } from '@/hooks/useGroupCheckout';
import { DashboardLayoutWrapper } from '@/components/dashboard/student/DashboardLayoutWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function GroupCheckoutPage() {
  const {
    userProfile,
    loading: dashboardLoading,
  } = useStudentDashboard();
  
  const {
    state: { loading, paymentMethod, plan, emails },
    actions: { setPaymentMethod, handleGoBack, handleProcessPayment }
  } = useGroupCheckout();

  const [memberEmails, setMemberEmails] = useState<string[]>(['']);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });
  const [upiId, setUpiId] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  
  const { toast } = useToast();
  
  if (dashboardLoading || !userProfile || !plan) {
    return <DashboardLoading />;
  }

  const addEmailField = () => {
    if (memberEmails.length < (plan.maxMembers || 5) - 1) {
      setMemberEmails([...memberEmails, '']);
    } else {
      toast({
        title: "Maximum members reached",
        description: `You can only invite up to ${(plan.maxMembers || 5) - 1} members with this plan.`,
      });
    }
  };

  const removeEmailField = (index: number) => {
    const newEmails = [...memberEmails];
    newEmails.splice(index, 1);
    setMemberEmails(newEmails);
  };

  const updateEmail = (index: number, value: string) => {
    const newEmails = [...memberEmails];
    newEmails[index] = value;
    setMemberEmails(newEmails);
  };

  const validateEmails = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validEmails = memberEmails.filter(email => email && emailRegex.test(email));
    
    if (validEmails.length !== memberEmails.filter(email => email).length) {
      toast({
        title: "Invalid emails",
        description: "Please enter valid email addresses for all members.",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const handlePayment = () => {
    if (!validateEmails()) return;
    
    if (paymentMethod === 'card') {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        toast({
          title: "Missing information",
          description: "Please fill in all card details.",
          variant: "destructive"
        });
        return;
      }
    } else if (paymentMethod === 'upi') {
      if (!upiId) {
        toast({
          title: "Missing information",
          description: "Please enter your UPI ID.",
          variant: "destructive"
        });
        return;
      }
    } else if (paymentMethod === 'netbanking') {
      if (!selectedBank) {
        toast({
          title: "Missing information",
          description: "Please select your bank.",
          variant: "destructive"
        });
        return;
      }
    }
    
    handleProcessPayment();
  };

  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <DashboardLayoutWrapper userProfile={userProfile}>
      <div className="container max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2"
          onClick={handleGoBack}
          disabled={loading}
        >
          <ArrowLeft size={16} />
          Back to Plans
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Complete Your Group Order</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Add group members and complete payment
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            {/* Group Members Section */}
            <Card>
              <CardHeader>
                <CardTitle>Group Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label>Group Leader</Label>
                    <Input value={userProfile.email} disabled className="bg-muted" />
                    <p className="text-xs text-muted-foreground">You will be the group leader</p>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-3">
                    <Label>Group Members</Label>
                    {memberEmails.map((email, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input 
                          placeholder={`Member ${index + 1} email`}
                          value={email}
                          onChange={(e) => updateEmail(index, e.target.value)}
                          disabled={loading}
                        />
                        {memberEmails.length > 1 && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeEmailField(index)}
                            disabled={loading}
                          >
                            &times;
                          </Button>
                        )}
                      </div>
                    ))}
                    
                    {memberEmails.length < (plan.maxMembers || 5) - 1 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={addEmailField}
                        disabled={loading}
                      >
                        + Add Another Member
                      </Button>
                    )}
                    
                    <p className="text-xs text-muted-foreground mt-2">
                      Members will receive an email invitation to join your group.
                      Each member will get full access to the plan benefits.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Payment Method Section */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as 'card' | 'upi')}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="card">Card</TabsTrigger>
                    <TabsTrigger value="upi">UPI</TabsTrigger>
                    <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card" className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                        disabled={loading}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="card-name">Name on Card</Label>
                      <Input
                        id="card-name"
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                        disabled={loading}
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
                          disabled={loading}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          type="password"
                          maxLength={4}
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="upi" className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="upi-id">UPI ID</Label>
                      <Input
                        id="upi-id"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You'll receive a payment request on your UPI app.
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="netbanking" className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bank">Select Bank</Label>
                      <select
                        id="bank"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        disabled={loading}
                      >
                        <option value="">Select a bank</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You'll be redirected to your bank's website to complete the payment.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Button
              className="w-full"
              size="lg"
              onClick={handlePayment}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Complete Payment'}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground">
              By proceeding with the payment, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
          
          <div className="lg:col-span-5">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted/30 rounded-md">
                  <h3 className="font-semibold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Plan Price</span>
                    <span>{formatPrice(plan.price)}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Group Size</span>
                    <span>{memberEmails.filter(e => e).length + 1} members</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(plan.price)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>{formatPrice(plan.price * 0.18)}</span>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(plan.price * 1.18)}</span>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    Billed monthly. You can cancel anytime.
                  </p>
                </div>
                
                <div className="text-sm space-y-2 mt-4">
                  <p className="font-medium">Plan Benefits:</p>
                  <ul className="space-y-1 text-sm list-disc pl-5">
                    {plan.planType && <li>Group access for up to {plan.maxMembers} members</li>}
                    <li>Shared study materials and resources</li>
                    <li>Group progress tracking</li>
                    <li>Collaborative learning tools</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayoutWrapper>
  );
}
