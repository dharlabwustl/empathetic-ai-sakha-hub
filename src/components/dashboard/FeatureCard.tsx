
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, ArrowRight } from 'lucide-react';
import { SubscriptionType } from '@/types/user/base';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  path: string;
  isPremium: boolean;
  userSubscription: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  path,
  isPremium,
  userSubscription
}) => {
  // Check if the user can access the feature based on their subscription
  const canAccess = () => {
    if (!isPremium) return true;
    
    // Basic subscription logic
    if (userSubscription === SubscriptionType.premium || 
        userSubscription === SubscriptionType.pro_student || 
        userSubscription === SubscriptionType.pro_educator) {
      return true;
    }
    
    return false;
  };
  
  const isAccessible = canAccess();
  
  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-5 h-full flex flex-col">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            {icon}
          </div>
          {isPremium && (
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 ml-2">
              Premium
            </Badge>
          )}
        </div>
        
        <h3 className="font-medium text-base mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">{description}</p>
        
        {isAccessible ? (
          <Button variant="default" size="sm" asChild className="w-full mt-auto">
            <a href={path}>
              Explore
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="w-full mt-auto">
            <Lock className="mr-2 h-4 w-4" />
            Upgrade to Access
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
