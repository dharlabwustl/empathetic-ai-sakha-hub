
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, History } from 'lucide-react';

interface PaymentMethodsPanelProps {
  paymentMethods: any[];
  billingHistory: any[];
}

export const PaymentMethodsPanel = ({ paymentMethods, billingHistory }: PaymentMethodsPanelProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Methods
          </CardTitle>
        </CardHeader>
        <CardContent>
          {paymentMethods.length > 0 ? (
            <div className="space-y-2">
              {paymentMethods.map((method, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <p className="font-medium">**** **** **** {method.last4}</p>
                  <p className="text-sm text-gray-600">{method.brand} • Expires {method.expiry}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No payment methods added yet.</p>
          )}
          <Button variant="outline" className="mt-4">
            Add Payment Method
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Billing History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {billingHistory.length > 0 ? (
            <div className="space-y-2">
              {billingHistory.map((bill, index) => (
                <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{bill.description}</p>
                    <p className="text-sm text-gray-600">{new Date(bill.date).toLocaleDateString()}</p>
                  </div>
                  <p className="font-medium">${bill.amount}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No billing history available.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
