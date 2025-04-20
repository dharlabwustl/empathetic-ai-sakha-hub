
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Check } from "lucide-react";
import { SubscriptionPlan } from "@/types/user";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  
  const selectedPlan = location.state?.selectedPlan as SubscriptionPlan;
  const isGroup = location.state?.isGroup as boolean;
  const fromPage = location.state?.fromPage;
  
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
    
    // Navigate to payment page with all the required information
    navigate("/payment", {
      state: {
        selectedPlan,
        isGroup,
        userInfo: {
          name,
          email
        }
      }
    });
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
        >
          <ArrowLeft size={16} />
          Back
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-gray-500 mb-8">Review your plan selection and proceed to payment</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan Summary */}
          <div className="md:col-span-2 space-y-8">
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
                  />
                </div>
              </CardContent>
            </Card>
            
            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleProceedToPayment}
            >
              Proceed to Payment
            </Button>
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-1">
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
