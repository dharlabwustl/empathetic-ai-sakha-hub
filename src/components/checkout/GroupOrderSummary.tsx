
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface GroupOrderSummaryProps {
  plan: {
    name: string;
    price: number;
    userCount?: number;
    planType?: 'group' | 'school' | 'corporate';
  };
}

export const GroupOrderSummary: React.FC<GroupOrderSummaryProps> = ({ plan }) => {
  const getMaxUsers = () => {
    if (plan.planType === 'school') return 50;
    if (plan.planType === 'corporate') return 100;
    return plan.userCount || 5;
  };

  const gst = plan.price * 0.18;
  const total = plan.price + gst;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
          <h3 className="font-medium text-blue-800 dark:text-blue-300">
            {plan.name} ({getMaxUsers()} Users)
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
            <Users className="inline-block mr-1 h-4 w-4" />
            Group Plan for up to {getMaxUsers()} users
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Base Price</span>
            <span>₹{plan.price}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>GST (18%)</span>
            <span>₹{gst}</span>
          </div>
          <div className="pt-2 border-t flex justify-between font-bold">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
        </div>

        <div className="text-xs text-center text-gray-500 dark:text-gray-400 pt-2">
          By proceeding, you agree to our Terms of Service and Privacy Policy.
        </div>
      </CardContent>
    </Card>
  );
};
