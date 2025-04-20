import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Check, CreditCard, CircleDollarSign } from "lucide-react";
import { SubscriptionPlan } from "@/types/user";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "netbanking">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  const [upiId, setUpiId] = useState("");
  const [bank, setBank] = useState("");
  
  const selectedPlan = location.state?.selectedPlan as SubscriptionPlan;
  const isGroup = location.state?.isGroup as boolean;
  const fromPage = location.state?.fromPage;
  
  useEffect(() => {
    // If user is coming from authentication, pre-fill email and name
    if (localStorage.getItem('userProfile')) {
      try {
        const profile = JSON.parse(localStorage.getItem('userProfile') || '');
        if (profile.email) setEmail(profile.email);
        if (profile.name) setName(profile.name);
      } catch (e) {
        console.error("Could not parse user profile from localStorage");
      }
    }
  }, []);
  
  if (!selectedPlan) {
    // Redirect if no plan is selected
    if (fromPage === "pricing") {
      navigate("/pricing");
    } else {
      navigate("/");
    }
    return null;
  }

  const handleProceedToPayment = () => {
    if (!email || !name) {
      toast({
        title: "Missing information",
        description: "Please fill in your name and email to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Validate based on payment method
    if (paymentMethod === "card") {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        toast({
          title: "Missing information",
          description: "Please fill in all card details to continue.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
    } else if (paymentMethod === "upi") {
      if (!upiId) {
        toast({
          title: "Missing information",
          description: "Please enter your UPI ID to continue.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
    } else if (paymentMethod === "netbanking") {
      if (!bank) {
        toast({
          title: "Missing information",
          description: "Please select your bank to continue.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
    }
    
    // In a real application, here you would:
    // 1. Call your payment gateway API
    // 2. Process the payment
    // 3. Handle the response
    
    // For this demo, we'll simulate a successful payment after a delay
    setTimeout(() => {
      // Handle successful payment
      toast({
        title: "Payment Successful",
        description: "Your subscription has been activated successfully!",
      });
      
      // Redirect to subscription page with updated plan info
      navigate("/dashboard/student/subscription", { 
        state: { 
          planUpdated: true,
          newPlan: selectedPlan,
          isGroup: isGroup,
          isGroupLeader: isGroup ? true : undefined,
          // If it's a group plan, we'd also include invite codes and emails
          inviteCodes: isGroup ? ["SAKHA-ABC123", "SAKHA-DEF456", "SAKHA-GHI789"] : undefined,
          invitedEmails: isGroup ? ["friend1@example.com", "friend2@example.com", "friend3@example.com"] : undefined
        } 
      });
      
      setIsProcessing(false);
    }, 2000);
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
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container max-w-5xl mx-auto py-16 px-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2"
          disabled={isProcessing}
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-gray-500 mb-8">Complete your {selectedPlan.name} purchase</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Payment Section */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Enter your full name"
                    required
                    disabled={isProcessing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email address"
                    required
                    disabled={isProcessing}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "card" | "upi" | "netbanking")}>
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="card" disabled={isProcessing}>Card</TabsTrigger>
                    <TabsTrigger value="upi" disabled={isProcessing}>UPI</TabsTrigger>
                    <TabsTrigger value="netbanking" disabled={isProcessing}>Net Banking</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="card-number">Card Number</Label>
                        <Input
                          id="card-number"
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                          disabled={isProcessing}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="card-name">Name on Card</Label>
                        <Input
                          id="card-name"
                          placeholder="John Doe"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                          disabled={isProcessing}
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
                            disabled={isProcessing}
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
                            disabled={isProcessing}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="upi">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="upi-id">UPI ID</Label>
                        <Input
                          id="upi-id"
                          placeholder="yourname@upi"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          disabled={isProcessing}
                        />
                      </div>
                      <div className="rounded-md border border-dashed p-6 text-center">
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mb-3">
                          <CircleDollarSign className="h-5 w-5 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          You'll receive a payment request on your UPI app.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="netbanking">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bank">Select Bank</Label>
                        <select
                          id="bank"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          value={bank}
                          onChange={(e) => setBank(e.target.value)}
                          disabled={isProcessing}
                        >
                          <option value="">Select a bank</option>
                          <option value="hdfc">HDFC Bank</option>
                          <option value="sbi">State Bank of India</option>
                          <option value="icici">ICICI Bank</option>
                          <option value="axis">Axis Bank</option>
                          <option value="kotak">Kotak Mahindra Bank</option>
                        </select>
                      </div>
                      <div className="rounded-md border border-dashed p-6 text-center">
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mb-3">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          You'll be redirected to your bank's website to complete the payment.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleProceedToPayment}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `Pay ${formatPrice(selectedPlan.price * 1.18)}`}
            </Button>
            
            <div className="text-xs text-center text-muted-foreground">
              <p>Your payment information is encrypted and secure.</p>
              <p className="mt-1">By proceeding, you agree to our Terms of Service and Privacy Policy.</p>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Plan details */}
                <div className="p-3 bg-muted/30 rounded-md">
                  <h3 className="font-semibold">{selectedPlan.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>
                  {isGroup && <p className="text-sm">Group plan (up to {selectedPlan.maxMembers} members)</p>}
                  {selectedPlan.isPopular && (
                    <Badge variant="outline" className="mt-1 bg-amber-100 text-amber-800">Most Popular</Badge>
                  )}
                </div>
                
                {/* Features */}
                <div className="space-y-2">
                  <p className="text-sm font-medium">Included features:</p>
                  <ul className="space-y-1 text-sm">
                    {selectedPlan.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-600 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {selectedPlan.features.length > 3 && (
                      <li className="text-sm text-muted-foreground">
                        +{selectedPlan.features.length - 3} more features
                      </li>
                    )}
                  </ul>
                </div>
                
                <Separator />
                
                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Subtotal</span>
                    <span className="font-medium">{formatPrice(selectedPlan.price)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm">GST (18%)</span>
                    <span>{formatPrice(selectedPlan.price * 0.18)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span className="text-lg">{formatPrice(selectedPlan.price * 1.18)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
