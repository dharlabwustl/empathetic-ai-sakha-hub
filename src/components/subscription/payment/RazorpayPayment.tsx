
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard } from "lucide-react";

interface RazorpayPaymentProps {
  amount: number;
  onSuccess: (response: any) => void;
  onError: (error: any) => void;
}

const RazorpayPayment: React.FC<RazorpayPaymentProps> = ({
  amount,
  onSuccess,
  onError
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real implementation, this would integrate with Razorpay API
    setTimeout(() => {
      // Simulate successful payment
      if (cardNumber && expiryDate && cvv && name) {
        setLoading(false);
        onSuccess({
          paymentId: "pay_" + Math.random().toString(36).substring(2, 15),
          orderId: "order_" + Math.random().toString(36).substring(2, 15),
          signature: "sig_" + Math.random().toString(36).substring(2, 15),
        });
      } else {
        setLoading(false);
        onError(new Error("Please fill all the fields"));
      }
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="cardname">Card holder name</Label>
        <Input
          id="cardname"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardnumber">Card number</Label>
        <Input
          id="cardnumber"
          placeholder="4111 1111 1111 1111"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expirydate">Expiry date</Label>
          <Input
            id="expirydate"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "").slice(0, 4);
              if (value.length > 2) {
                setExpiryDate(value.slice(0, 2) + "/" + value.slice(2));
              } else {
                setExpiryDate(value);
              }
            }}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvv">CVV</Label>
          <Input
            id="cvv"
            type="password"
            placeholder="123"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        <CreditCard className="mr-2 h-4 w-4" />
        {loading ? "Processing..." : `Pay ₹${amount.toFixed(2)}`}
      </Button>
    </form>
  );
};

export default RazorpayPayment;
