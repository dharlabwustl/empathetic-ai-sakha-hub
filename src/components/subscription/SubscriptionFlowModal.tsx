
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PaymentMethodSelector from "./payment/PaymentMethodSelector";
import CreditCardForm from "./payment/CreditCardForm";
import UPIPayment from "./payment/UPIPayment";
import NetBankingPayment from "./payment/NetBankingPayment";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SubscriptionFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: {
    id: string;
    name: string;
    price: number;
    features: string[];
    isPopular?: boolean;
    type: string;
  };
  isGroup?: boolean;
  onSuccess: (plan: any, inviteCodes?: string[], invitedEmails?: string[]) => void;
}

type PaymentMethod = "credit_card" | "upi" | "net_banking" | "wallet";

export const SubscriptionFlowModal: React.FC<SubscriptionFlowModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
  isGroup = false,
  onSuccess
}) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>("credit_card");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleProcessPayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Generate invite codes for group plans if needed
    let inviteCodes: string[] = [];
    if (isGroup) {
      inviteCodes = Array(5).fill(null).map(() => 
        `SAKHA-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
      );
    }
    
    toast({
      title: "Payment Successful!",
      description: "Your subscription has been activated successfully.",
    });
    
    setIsProcessing(false);
    onSuccess(selectedPlan, inviteCodes);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Complete Your Subscription</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-4">
          {/* Payment Section */}
          <div className="md:col-span-3 space-y-6">
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
                  <p className="text-sm text-muted-foreground mt-1">
                    Wallet payments are coming soon.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-2">
            <div className="rounded-lg border p-4 space-y-4">
              <h3 className="font-medium">Order Summary</h3>
              
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">{selectedPlan.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {isGroup ? "Group Plan (5 users)" : "Individual Plan"}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Plan Features:</p>
                <ul className="space-y-1 text-sm">
                  {selectedPlan.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-600 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-medium">
                  <span>Total Amount</span>
                  <span>₹{selectedPlan.price}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Includes 18% GST
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
