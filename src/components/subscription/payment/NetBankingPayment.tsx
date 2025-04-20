
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NetBankingPaymentProps {
  amount?: number;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  onSubmit?: () => Promise<void>;
  isProcessing?: boolean;
}

const NetBankingPayment: React.FC<NetBankingPaymentProps> = ({
  amount = 999,
  onSuccess = () => {},
  onError = () => {},
  onSubmit,
  isProcessing = false
}) => {
  const [bank, setBank] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bank) {
      onError(new Error("Please select your bank"));
      return;
    }

    if (onSubmit) {
      await onSubmit();
      return;
    }

    setLoading(true);
    // In a real implementation, this would redirect to the bank's login page
    setTimeout(() => {
      setLoading(false);
      onSuccess({
        paymentId: "pay_" + Math.random().toString(36).substring(2, 15),
        method: "NetBanking",
        bank: bank
      });
    }, 1500);
  };

  const popularBanks = [
    { id: "sbi", name: "State Bank of India" },
    { id: "hdfc", name: "HDFC Bank" },
    { id: "icici", name: "ICICI Bank" },
    { id: "axis", name: "Axis Bank" },
    { id: "kotak", name: "Kotak Mahindra Bank" },
    { id: "yes", name: "Yes Bank" },
  ];

  const otherBanks = [
    { id: "pnb", name: "Punjab National Bank" },
    { id: "bob", name: "Bank of Baroda" },
    { id: "idfc", name: "IDFC First Bank" },
    { id: "federal", name: "Federal Bank" },
    { id: "indian", name: "Indian Bank" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
      <div className="space-y-2">
        <Label htmlFor="bank">Select your bank</Label>
        <Select value={bank} onValueChange={setBank}>
          <SelectTrigger>
            <SelectValue placeholder="Select your bank" />
          </SelectTrigger>
          <SelectContent>
            <div className="p-2 text-sm font-medium text-muted-foreground">Popular Banks</div>
            {popularBanks.map((bank) => (
              <SelectItem key={bank.id} value={bank.id}>{bank.name}</SelectItem>
            ))}
            <div className="p-2 text-sm font-medium text-muted-foreground">Other Banks</div>
            {otherBanks.map((bank) => (
              <SelectItem key={bank.id} value={bank.id}>{bank.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>You will be redirected to your bank's website to complete the payment.</p>
        <p>After successful payment, you will be redirected back to this page.</p>
      </div>

      <Button type="submit" className="w-full" disabled={isProcessing || loading}>
        {isProcessing || loading ? "Redirecting to bank..." : `Pay ₹${amount?.toFixed(2)} with Net Banking`}
      </Button>
    </form>
  );
};

export default NetBankingPayment;
