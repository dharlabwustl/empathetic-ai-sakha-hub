
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SubscriptionType } from '@/types/user/base';
import { Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  requiresSubscription?: boolean;
  userSubscription?: SubscriptionType;
  comingSoon?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  requiresSubscription = false,
  userSubscription = SubscriptionType.Free,
  comingSoon = false,
  disabled = false,
  onClick
}) => {
  const { toast } = useToast();

  const handleCardClick = () => {
    if (comingSoon) {
      toast({
        title: "Coming Soon",
        description: `${title} will be available soon. Stay tuned!`,
        variant: "default",
      });
      return;
    }

    if (requiresSubscription && userSubscription === SubscriptionType.Free) {
      toast({
        title: "Subscription Required",
        description: `${title} requires a premium subscription. Please upgrade to access this feature.`,
        variant: "default",
      });
      return;
    }

    if (disabled) {
      return;
    }

    if (onClick) {
      onClick();
    }
  };

  const isLocked = requiresSubscription && userSubscription === SubscriptionType.Free;

  return (
    <Card 
      className={`border overflow-hidden transition-all duration-300 cursor-pointer ${disabled ? 'opacity-60' : 'hover:shadow-md'}`}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 mr-3 flex items-center justify-center rounded-full bg-primary/10 text-primary">
              {icon}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          {isLocked && (
            <Lock size={18} className="text-muted-foreground" />
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2 text-sm text-muted-foreground">
        <p>{description}</p>
      </CardContent>
      <CardFooter className="pt-0">
        {comingSoon ? (
          <div className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/30 px-2 py-0.5 rounded">
            Coming Soon
          </div>
        ) : isLocked ? (
          <div className="text-xs font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-950/30 px-2 py-0.5 rounded">
            Premium Feature
          </div>
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
