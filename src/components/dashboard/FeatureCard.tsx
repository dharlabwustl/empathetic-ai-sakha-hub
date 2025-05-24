
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SubscriptionTypeValue } from '@/types/user/base';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isAvailable: boolean;
  requiredPlan?: SubscriptionTypeValue;
  userSubscription?: SubscriptionTypeValue;
  onUpgrade?: () => void;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  isAvailable,
  requiredPlan,
  userSubscription,
  onUpgrade,
  onClick
}) => {
  const isAccessible = isAvailable || 
    userSubscription === 'premium' || 
    userSubscription === 'pro' ||
    userSubscription === 'enterprise' ||
    userSubscription === 'group' ||
    (requiredPlan && userSubscription === requiredPlan);

  return (
    <Card className={`cursor-pointer transition-all hover:shadow-md ${
      !isAccessible ? 'opacity-60' : ''
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-blue-600">{icon}</div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {!isAccessible && requiredPlan && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              {requiredPlan} required
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
          {description}
        </p>
        {isAccessible ? (
          <Button 
            className="w-full" 
            onClick={onClick}
          >
            Access Feature
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={onUpgrade}
          >
            Upgrade to Access
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
