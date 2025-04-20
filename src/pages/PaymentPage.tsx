
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard, Building, CircleDollarSign } from "lucide-react";
import { SubscriptionPlan } from "@/types/user";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UPIPayment from "@/components/subscription/payment/UPIPayment";
import NetBankingPayment from "@/components/subscription/payment/NetBankingPayment";
import { GroupPaymentSection } from "@/components/checkout/GroupPaymentSection";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "netbanking">("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });
  
  const selectedPlan = location.state?.selectedPlan as SubscriptionPlan;
  const isGroup = location.state?.isGroup as boolean;
  const userInfo = location.state?.userInfo;
  
  if (!selectedPlan || !userInfo) {
    navigate("/");
    return null;
  }

  const handlePaymentProcess = async () => {
    // Validate based on payment method
    if (paymentMethod === "card") {
      if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
        toast({
          title: "Missing information",
          description: "Please fill in all card details to proceed.",
          variant: "destructive",
        });
        return;
      }
    }
    
    setIsProcessing(true);
    
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
          Back to Checkout
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Complete Payment</h1>
        <p className="text-gray-500 mb-8">Choose your preferred payment method</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="md:col-span-2 space-y-6">
            {isGroup ? (
              <GroupPaymentSection
                paymentMethod={paymentMethod}
                onPaymentMethodChange={setPaymentMethod}
                loading={isProcessing}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "card" | "upi" | "netbanking")}>
                    <TabsList className="grid grid-cols-3 mb-6">
                      <TabsTrigger value="card" disabled={isProcessing}>Credit/Debit Card</TabsTrigger>
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
                      <UPIPayment 
                        amount={selectedPlan.price * 1.18}
                        onSubmit={handlePaymentProcess} 
                        isProcessing={isProcessing}
                      />
                    </TabsContent>
                    
                    <TabsContent value="netbanking">
                      <NetBankingPayment 
                        amount={selectedPlan.price * 1.18}
                        onSubmit={handlePaymentProcess}
                        isProcessing={isProcessing} 
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
            
            {paymentMethod === "card" && !isGroup && (
              <Button 
                className="w-full" 
                size="lg" 
                onClick={handlePaymentProcess}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : `Pay ${formatPrice(selectedPlan.price * 1.18)}`}
              </Button>
            )}
            
            {isGroup && (
              <Button
                className="w-full"
                size="lg"
                onClick={handlePaymentProcess}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : `Pay ${formatPrice(selectedPlan.price * 1.18)}`}
              </Button>
            )}
            
            <div className="text-xs text-center text-muted-foreground">
              <p>Your payment information is encrypted and secure. We do not store your card details.</p>
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
                {/* User Info */}
                <div>
                  <h3 className="text-sm font-medium mb-1">Account</h3>
                  <p className="text-sm">{userInfo.name}</p>
                  <p className="text-sm text-muted-foreground">{userInfo.email}</p>
                </div>
                
                <Separator />
                
                {/* Plan details */}
                <div>
                  <h3 className="font-semibold">{selectedPlan.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>
                  {isGroup && <p className="text-sm">Group plan (up to {selectedPlan.maxMembers} members)</p>}
                </div>
                
                <Separator />
                
                {/* Pricing */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Subtotal</span>
                    <span>{formatPrice(selectedPlan.price)}</span>
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

                  <p className="text-xs text-muted-foreground text-center mt-2">
                    Billed monthly. You can cancel anytime.
                  </p>
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

export default PaymentPage;
