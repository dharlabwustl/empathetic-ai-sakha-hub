
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth/AuthContext";
import { useSubscriptionFlow } from "@/contexts/SubscriptionFlowContext";
import { Check, ChevronLeft } from "lucide-react";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { selectedPlan, handleAfterPayment } = useSubscriptionFlow();
  const [loading, setLoading] = useState(false);
  
  // Plan details based on selection
  const getPlanDetails = () => {
    switch (selectedPlan) {
      case 'basic':
        return {
          name: 'Basic Plan',
          price: '$7.99',
          period: '/month',
          features: [
            'Personalized Study Plans',
            'Basic AI Tutor Access',
            'Limited Practice Questions',
            'Email Support'
          ]
        };
      case 'premium':
        return {
          name: 'Premium Plan',
          price: '$14.99',
          period: '/month',
          features: [
            'Everything in Basic',
            'Unlimited AI Tutor Access',
            'Advanced Analytics',
            'Unlimited Practice Materials',
            'Priority Support',
            'Study Group Access'
          ]
        };
      default:
        return {
          name: 'Free Plan',
          price: '$0',
          period: '/month',
          features: [
            'Limited Study Plans',
            'Basic Study Materials',
            'Community Forum Access'
          ]
        };
    }
  };

  const planDetails = getPlanDetails();
  
  // Simulate a payment process
  const handlePaymentProcess = async () => {
    setLoading(true);
    
    // In a real app, this would connect to Stripe or other payment processor
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Simulate successful payment
      // Update user data with subscription info
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        const updatedData = {
          ...parsedData,
          subscriptionPlan: selectedPlan,
          subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        };
        localStorage.setItem("userData", JSON.stringify(updatedData));
      }
      
      // Handle successful payment
      handleAfterPayment();
    } catch (error) {
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment",
        variant: "destructive"
      });
      setLoading(false);
    }
  };
  
  const handleCancel = () => {
    navigate(-1);
  };
  
  // Protect this page - redirect if no plan is selected
  useEffect(() => {
    if (!selectedPlan || selectedPlan === 'free') {
      navigate('/pricing');
    }
  }, [selectedPlan, navigate]);

  if (!selectedPlan || selectedPlan === 'free') {
    return null; // Prevent flash of content before redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100/30 via-white to-violet-100/30 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1 bg-gradient-to-r from-purple-600 to-violet-700 text-white">
            <CardTitle className="text-2xl font-bold text-center">Complete Your Subscription</CardTitle>
            <p className="text-center text-purple-100">
              {user?.name || 'Welcome'}, you're just one step away!
            </p>
          </CardHeader>
          
          <CardContent className="p-6 space-y-4">
            <div className="rounded-lg border p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg">{planDetails.name}</h3>
                <div className="text-right">
                  <span className="text-2xl font-bold">{planDetails.price}</span>
                  <span className="text-sm text-gray-500">{planDetails.period}</span>
                </div>
              </div>
              
              <ul className="space-y-2">
                {planDetails.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check size={16} className="text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{planDetails.price}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total (including taxes)</span>
                <span>{planDetails.price}</span>
              </div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-600">
              Your subscription will renew automatically each month until canceled.
              You can manage your subscription anytime from your profile.
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-3">
            <Button 
              onClick={handlePaymentProcess}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-violet-700"
            >
              {loading ? "Processing..." : `Complete Payment (${planDetails.price})`}
            </Button>
            
            <Button 
              variant="ghost" 
              onClick={handleCancel}
              disabled={loading}
              className="w-full flex items-center gap-1"
            >
              <ChevronLeft size={16} /> Cancel
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
