
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

interface GroupPaymentSectionProps {
  paymentMethod: 'card' | 'upi';
  onPaymentMethodChange: (method: 'card' | 'upi') => void;
  loading: boolean;
}

export const GroupPaymentSection: React.FC<GroupPaymentSectionProps> = ({
  paymentMethod,
  onPaymentMethodChange,
  loading,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Payment Method</CardTitle>
        <CardDescription>Choose your preferred payment method</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant={paymentMethod === 'card' ? 'default' : 'outline'}
            className={`flex items-center gap-2 ${paymentMethod === 'card' ? 'bg-primary' : ''}`}
            onClick={() => onPaymentMethodChange('card')}
            disabled={loading}
          >
            <CreditCard className="h-4 w-4" />
            <span>Card</span>
          </Button>
          <Button
            type="button"
            variant={paymentMethod === 'upi' ? 'default' : 'outline'}
            className={`flex items-center gap-2 ${paymentMethod === 'upi' ? 'bg-primary' : ''}`}
            onClick={() => onPaymentMethodChange('upi')}
            disabled={loading}
          >
            <CreditCard className="h-4 w-4" />
            <span>UPI</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
