import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import { Check, Copy, Mail, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SubscriptionType } from "@/types/user/base";

interface CheckoutPageProps {
  planType: SubscriptionType;
  price: number;
  features: string[];
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ planType, price, features }) => {
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [applyingPromo, setApplyingPromo] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (paymentSuccess) {
      const timer = setTimeout(() => {
        navigate('/dashboard/student');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [paymentSuccess, navigate]);

  const applyPromo = async () => {
    setApplyingPromo(true);
    // Simulate API call to validate promo code
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (promoCode.toLowerCase() === 'sakha20') {
      setDiscount(0.2);
      toast({
        title: "Promo Applied",
        description: "Promo code applied successfully!",
      });
    } else {
      setDiscount(0);
      toast({
        title: "Invalid Promo",
        description: "Invalid promo code. Please try again.",
        variant: "destructive",
      });
    }
    setApplyingPromo(false);
  };

  const handlePayment = async () => {
    setProcessingPayment(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setPaymentSuccess(true);
    setProcessingPayment(false);
    toast({
      title: "Payment Successful",
      description: "Redirecting to dashboard...",
    });
  };

  const total = price * (1 - discount);

  const generateInviteLink = () => {
    const link = `https://sakha.ai/invite/${user?.id}`;
    setInviteLink(link);
    setShowInviteModal(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription>Complete your purchase</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Plan: {planType}</h3>
            <p className="text-sm text-muted-foreground">Enjoy these benefits:</p>
            <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <Label htmlFor="promo">Promo Code</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="promo"
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <Button size="sm" onClick={applyPromo} disabled={applyingPromo}>
                {applyingPromo ? "Applying..." : "Apply"}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <div className="flex items-center space-x-4">
              <Button
                variant={paymentMethod === 'credit_card' ? 'default' : 'outline'}
                onClick={() => setPaymentMethod('credit_card')}
              >
                Credit Card
              </Button>
              <Button
                variant={paymentMethod === 'paypal' ? 'default' : 'outline'}
                onClick={() => setPaymentMethod('paypal')}
              >
                PayPal
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${price.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between">
                <span>Discount ({discount * 100}%):</span>
                <span>-${(price * discount).toFixed(2)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-medium">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <Button size="lg" onClick={handlePayment} disabled={processingPayment}>
            {processingPayment ? "Processing..." : "Complete Payment"}
          </Button>
          {paymentSuccess && (
            <div className="text-green-500 mt-2 flex items-center">
              <Check className="h-4 w-4 mr-2" />
              Payment Successful! Redirecting...
            </div>
          )}
          <Button variant="link" onClick={() => setShowDetails(!showDetails)}>
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
          {showDetails && (
            <div className="mt-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is Sakha AI?</AccordionTrigger>
                  <AccordionContent>
                    Sakha AI is an AI-powered learning platform designed to personalize your study
                    experience.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How does the payment work?</AccordionTrigger>
                  <AccordionContent>
                    We accept all major credit cards and PayPal. Your subscription will auto-renew
                    unless cancelled.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I cancel my subscription?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can cancel your subscription at any time from your account settings.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
          {planType === SubscriptionType.Enterprise && (
            <Button variant="secondary" onClick={generateInviteLink}>
              Generate Invite Link
            </Button>
          )}
        </CardContent>
      </Card>

      <Dialog open={showInviteModal} onOpenChange={() => setShowInviteModal(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Invite Members</DialogTitle>
            <DialogDescription>
              Share this link with your team members to join your Enterprise plan.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="link" className="text-right">
                Invite Link
              </Label>
              <Input type="text" id="link" value={inviteLink} readOnly className="col-span-3" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="secondary" onClick={copyToClipboard} disabled={copied}>
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CheckoutPage;
