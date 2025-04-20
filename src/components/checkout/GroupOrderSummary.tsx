
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from '@/components/ui/separator';
import { Check, Users } from 'lucide-react';

interface GroupOrderSummaryProps {
  plan: {
    id: string;
    name: string;
    price: number;
    userCount?: number;
    planType?: 'group' | 'school' | 'corporate';
    maxMembers?: number;
    features?: string[];
  };
}

export function GroupOrderSummary({ plan }: GroupOrderSummaryProps) {
  // Format price for display
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const features = plan.features || [
    'Group access for up to ' + (plan.maxMembers || 5) + ' members',
    'Shared study materials and resources',
    'Group progress tracking',
    'Collaborative learning tools',
    'Priority support'
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-muted/30 rounded-md">
          <h3 className="font-semibold">{plan.name}</h3>
          <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
            <Users className="h-3.5 w-3.5" />
            <span>Group plan (up to {plan.maxMembers || 5} members)</span>
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Base Price</span>
            <span>{formatPrice(plan.price)}</span>
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{formatPrice(plan.price)}</span>
          </div>
          
          <div className="flex justify-between">
            <span>GST (18%)</span>
            <span>{formatPrice(plan.price * 0.18)}</span>
          </div>
          
          <Separator className="my-2" />
          
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatPrice(plan.price * 1.18)}</span>
          </div>
        </div>
        
        <div className="space-y-2 mt-4">
          <p className="font-medium text-sm">Included benefits:</p>
          <ul className="space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <Check className="h-4 w-4 text-green-600 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <p className="text-xs text-muted-foreground">
          By proceeding with the payment, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardContent>
    </Card>
  );
}
