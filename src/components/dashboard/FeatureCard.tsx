
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, Crown, Users } from 'lucide-react';
import { SubscriptionTypeValue } from '@/types/user/base';

interface FeatureCardProps {
  title: string;
  description: string;
  requiredSubscription: SubscriptionTypeValue;
  isAvailable: boolean;
  onUpgrade?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  requiredSubscription,
  isAvailable,
  onUpgrade
}) => {
  const getSubscriptionIcon = (subscription: SubscriptionTypeValue) => {
    switch (subscription) {
      case 'free':
        return <Users className="h-4 w-4" />;
      case 'pro_monthly':
      case 'pro_yearly':
        return <Crown className="h-4 w-4" />;
      case 'group':
        return <Users className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <Card className={`${isAvailable ? 'border-green-200' : 'border-yellow-200'}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getSubscriptionIcon(requiredSubscription)}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <Badge variant={isAvailable ? "default" : "secondary"}>
            {requiredSubscription.toUpperCase()}
          </Badge>
          {!isAvailable && onUpgrade && (
            <Button size="sm" onClick={onUpgrade}>
              Upgrade
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
