
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Check, CreditCard, Users, School, Building } from "lucide-react";
import PaymentMethodSelector from "./payment/PaymentMethodSelector";
import CreditCardForm from "./payment/CreditCardForm";
import UPIPayment from "./payment/UPIPayment";
import NetBankingPayment from "./payment/NetBankingPayment";
import { SubscriptionPlan, SubscriptionType } from "@/types/user/base";

type PaymentMethod = "credit_card" | "upi" | "net_banking" | "wallet";

interface CheckoutPageProps {
  selectedPlan: SubscriptionPlan;
  onCancel: () => void;
  onSuccess: (plan: SubscriptionPlan, inviteCodes?: string[], invitedEmails?: string[]) => void;
  isGroupPlan?: boolean;
  invitedEmails?: string[];
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({
  selectedPlan,
  onCancel,
  onSuccess,
  isGroupPlan = false,
  invitedEmails = [],
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>("credit_card");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleProcessPayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Generate invite codes for group plans
    let inviteCodes: string[] = [];
    if (isGroupPlan && invitedEmails.length > 0) {
      inviteCodes = invitedEmails.map((_, index) => `SAKHA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
    }
    
    toast({
      title: "Payment Successful!",
      description: "Your subscription has been activated successfully.",
    });
    
    setIsProcessing(false);
    onSuccess(selectedPlan, inviteCodes, invitedEmails);
  };
  
  // Calculate subscription details
  const basePrice = selectedPlan.price;
  const memberCount = isGroupPlan ? invitedEmails.length + 1 : 1;
  const subtotal = basePrice * memberCount;
  const gst = subtotal * 0.18; // 18% GST
  const total = subtotal + gst;
  
  // Format functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };
  
  const getPlanIcon = () => {
    switch (selectedPlan.type) {
      case SubscriptionType.School:
        return <School className="h-5 w-5 text-green-600" />;
      case SubscriptionType.Corporate:
        return <Building className="h-5 w-5 text-blue-600" />;
      case SubscriptionType.Premium:
      case SubscriptionType.Enterprise:
        if (isGroupPlan) return <Users className="h-5 w-5 text-violet-600" />;
        return <CreditCard className="h-5 w-5 text-violet-600" />;
      default:
        return <CreditCard className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <Button 
        variant="ghost" 
        onClick={onCancel}
        className="mb-4 flex items-center gap-1"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Payment Methods Section */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Checkout</CardTitle>
              <CardDescription>Complete your subscription purchase</CardDescription>
            </CardHeader>
            
            <CardContent>
              <PaymentMethodSelector 
                onSelectPaymentMethod={setSelectedPaymentMethod}
                selectedMethod={selectedPaymentMethod}
              />
              
              <div className="mt-6">
                {selectedPaymentMethod === "credit_card" && (
                  <CreditCardForm 
                    onSubmit={handleProcessPayment}
                    isProcessing={isProcessing}
                  />
                )}
                
                {selectedPaymentMethod === "upi" && (
                  <UPIPayment 
                    onSubmit={handleProcessPayment}
                    isProcessing={isProcessing}
                  />
                )}
                
                {selectedPaymentMethod === "net_banking" && (
                  <NetBankingPayment 
                    onSubmit={handleProcessPayment}
                    isProcessing={isProcessing}
                  />
                )}
                
                {selectedPaymentMethod === "wallet" && (
                  <div className="text-center p-6">
                    <p>Please select a different payment method.</p>
                    <p className="text-sm text-muted-foreground mt-1">Wallet payments are coming soon.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Order Summary Section */}
        <div className="md:col-span-1">
          <Card className="border-muted">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Plan Details */}
              <div className="flex items-start gap-3 p-3 bg-muted/40 rounded-md">
                {getPlanIcon()}
                <div>
                  <h3 className="font-medium">{selectedPlan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {isGroupPlan ? `${memberCount} members` : "Individual Plan"}
                  </p>
                  {selectedPlan.isPopular && (
                    <Badge variant="outline" className="mt-1 bg-amber-100 text-amber-800 border-amber-200">
                      Most Popular
                    </Badge>
                  )}
                </div>
              </div>
              
              {/* Features */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Plan Features:</p>
                <ul className="space-y-1 text-sm">
                  {selectedPlan.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  {selectedPlan.features.length > 4 && (
                    <li className="text-sm text-muted-foreground">
                      +{selectedPlan.features.length - 4} more features
                    </li>
                  )}
                </ul>
              </div>
              
              <Separator />
              
              {/* Price Calculation */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Base Price</span>
                  <span>{formatCurrency(basePrice)}</span>
                </div>
                
                {isGroupPlan && (
                  <div className="flex justify-between text-sm">
                    <span>Members ({memberCount})</span>
                    <span>× {memberCount}</span>
                  </div>
                )}
                
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span>GST (18%)</span>
                  <span>{formatCurrency(gst)}</span>
                </div>
              </div>
              
              <Separator />
              
              {/* Total */}
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span className="text-lg">{formatCurrency(total)}</span>
              </div>
              
              <div className="text-xs text-center text-muted-foreground pt-2">
                By proceeding, you agree to our Terms of Service and Privacy Policy.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
