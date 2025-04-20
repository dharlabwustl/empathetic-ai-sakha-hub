
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode } from "lucide-react";

interface UPIPaymentProps {
  amount: number;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
  onSubmit?: () => Promise<void>;
  isProcessing?: boolean;
}

const UPIPayment: React.FC<UPIPaymentProps> = ({
  amount,
  onSuccess,
  onError,
  onSubmit,
  isProcessing = false
}) => {
  const [upiId, setUpiId] = useState("");
  const [loading, setLoading] = useState(false);
  const qrCodeUrl = "https://placeholder-qr.com/200"; // In a real app, this would be generated

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!upiId) {
      onError(new Error("Please enter your UPI ID"));
      return;
    }

    if (onSubmit) {
      await onSubmit();
      return;
    }

    setLoading(true);
    // In a real implementation, this would integrate with a UPI payment gateway
    setTimeout(() => {
      setLoading(false);
      onSuccess({
        paymentId: "pay_" + Math.random().toString(36).substring(2, 15),
        method: "UPI",
        vpa: upiId
      });
    }, 1500);
  };

  return (
    <div className="space-y-6 mt-4">
      <div className="flex flex-col items-center">
        <div className="h-48 w-48 bg-gray-100 border rounded-md flex items-center justify-center mb-2">
          <QrCode size={120} className="text-primary" />
        </div>
        <p className="text-sm text-center text-muted-foreground">
          Scan this QR code with your UPI app to pay ₹{amount.toFixed(2)}
        </p>
      </div>

      <div className="text-center text-sm font-medium">OR</div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="upiId">Enter UPI ID</Label>
          <Input
            id="upiId"
            placeholder="yourname@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Example: yourname@okicici, yourname@ybl, yourname@paytm
          </p>
        </div>

        <Button type="submit" className="w-full" disabled={isProcessing || loading}>
          {isProcessing || loading ? "Processing..." : `Pay ₹${amount.toFixed(2)} with UPI`}
        </Button>
      </form>
    </div>
  );
};

export default UPIPayment;
