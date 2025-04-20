
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { svg } from 'lucide-react';

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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 4H2V12H14V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 7H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Card</span>
          </Button>
          <Button
            type="button"
            variant={paymentMethod === 'upi' ? 'default' : 'outline'}
            className={`flex items-center gap-2 ${paymentMethod === 'upi' ? 'bg-primary' : ''}`}
            onClick={() => onPaymentMethodChange('upi')}
            disabled={loading}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 2V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>UPI</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
