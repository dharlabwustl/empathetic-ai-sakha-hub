
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CreditCard, Smartphone, Building } from 'lucide-react';

interface GroupPaymentSectionProps {
  paymentMethod: 'card' | 'upi' | 'netbanking';
  onPaymentMethodChange: (method: 'card' | 'upi' | 'netbanking') => void;
  loading: boolean;
}

export function GroupPaymentSection({
  paymentMethod,
  onPaymentMethodChange,
  loading
}: GroupPaymentSectionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Method</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={paymentMethod}
          onValueChange={(value) => onPaymentMethodChange(value as 'card' | 'upi' | 'netbanking')}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted/50">
            <RadioGroupItem value="card" id="card" disabled={loading} />
            <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
              <CreditCard className="h-4 w-4" />
              Credit/Debit Card
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted/50">
            <RadioGroupItem value="upi" id="upi" disabled={loading} />
            <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer flex-1">
              <Smartphone className="h-4 w-4" />
              UPI
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted/50">
            <RadioGroupItem value="netbanking" id="netbanking" disabled={loading} />
            <Label htmlFor="netbanking" className="flex items-center gap-2 cursor-pointer flex-1">
              <Building className="h-4 w-4" />
              Net Banking
            </Label>
          </div>
        </RadioGroup>
        
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="card-name">Name on Card</Label>
              <Input
                id="card-name"
                placeholder="John Doe"
                disabled={loading}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input
                  id="expiry"
                  placeholder="MM/YY"
                  disabled={loading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  type="password"
                  maxLength={4}
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        )}
        
        {paymentMethod === 'upi' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="upi-id">UPI ID</Label>
              <Input
                id="upi-id"
                placeholder="yourname@upi"
                disabled={loading}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              You'll receive a payment request on your UPI app.
            </p>
          </div>
        )}
        
        {paymentMethod === 'netbanking' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bank">Select Bank</Label>
              <select
                id="bank"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
              >
                <option value="">Select a bank</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="kotak">Kotak Mahindra Bank</option>
              </select>
            </div>
            <p className="text-sm text-muted-foreground">
              You'll be redirected to your bank's website to complete the payment.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
