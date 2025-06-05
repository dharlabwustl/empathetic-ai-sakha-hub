
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Crown, Calendar, Users } from 'lucide-react';

interface SubscriptionPanelProps {
  subscription: any;
}

export const SubscriptionPanel = ({ subscription }: SubscriptionPanelProps) => {
  const planType = subscription?.planType || 'Free';
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-5 w-5" />
          Subscription Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{planType} Plan</h3>
            <p className="text-gray-600">Your current subscription plan</p>
          </div>
          <Badge variant={planType === 'Free' ? 'secondary' : 'default'}>
            {planType}
          </Badge>
        </div>
        
        {subscription && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                Expires: {new Date(subscription.expiresAt || Date.now()).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                Member limit: {subscription.memberLimit || 1}
              </span>
            </div>
          </div>
        )}
        
        <Button variant="outline">
          Upgrade Plan
        </Button>
      </CardContent>
    </Card>
  );
};
