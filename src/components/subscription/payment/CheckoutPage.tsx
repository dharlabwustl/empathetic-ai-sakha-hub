
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CreditCard, ArrowLeft } from "lucide-react";
import RazorpayPayment from "./RazorpayPayment";
import UPIPayment from "./UPIPayment";
import NetBankingPayment from "./NetBankingPayment";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("card");
  
  const selectedPlan = location.state?.plan;
  
  if (!selectedPlan) {
    navigate("/dashboard/student/subscription");
    return null;
  }

  const handlePaymentSuccess = (response: any) => {
    // Handle successful payment
    toast({
      title: "Payment Successful!",
      description: "Your subscription has been activated.",
    });
    navigate("/dashboard/student/subscription?status=success");
  };

  const handlePaymentError = (error: any) => {
    toast({
      title: "Payment Failed",
      description: error.message || "Please try again.",
      variant: "destructive",
    });
  };

  return (
    <div className="container max-w-4xl mx-auto py-8">
      <Button 
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Plans
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Checkout</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={paymentMethod} onValueChange={setPaymentMethod}>
                <TabsList className="grid grid-cols-3 gap-4">
                  <TabsTrigger value="card">Card</TabsTrigger>
                  <TabsTrigger value="upi">UPI</TabsTrigger>
                  <TabsTrigger value="netbanking">Net Banking</TabsTrigger>
                </TabsList>

                <TabsContent value="card">
                  <RazorpayPayment 
                    amount={selectedPlan.price}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </TabsContent>

                <TabsContent value="upi">
                  <UPIPayment
                    amount={selectedPlan.price}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </TabsContent>

                <TabsContent value="netbanking">
                  <NetBankingPayment
                    amount={selectedPlan.price}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">{selectedPlan.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedPlan.description}</p>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <span>Subtotal</span>
                  <span>₹{selectedPlan.price}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>GST (18%)</span>
                  <span>₹{(selectedPlan.price * 0.18).toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t font-semibold">
                  <span>Total</span>
                  <span>₹{(selectedPlan.price * 1.18).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
