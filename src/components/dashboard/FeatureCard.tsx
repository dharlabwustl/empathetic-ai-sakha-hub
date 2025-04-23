
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SubscriptionType } from "@/types/user/base";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  isPremium: boolean;
  userSubscription: string;
  className?: string;
}

const FeatureCard = ({
  title,
  description,
  icon,
  path,
  isPremium,
  userSubscription,
  className
}: FeatureCardProps) => {
  const navigate = useNavigate();
  
  // Check if feature is accessible based on subscription
  const canAccess = !isPremium || 
    userSubscription === SubscriptionType.Premium.toString() || 
    userSubscription === SubscriptionType.Pro.toString() || 
    userSubscription === SubscriptionType.Elite.toString() || 
    userSubscription === SubscriptionType.Group.toString() || 
    userSubscription === SubscriptionType.Enterprise.toString();

  const handleClick = () => {
    if (canAccess) {
      navigate(path);
    } else {
      // For premium features, redirect to upgrade page
      navigate("/dashboard/student/subscription");
    }
  };

  return (
    <Card 
      className={cn(
        "h-full overflow-hidden cursor-pointer transition-all duration-200",
        !canAccess && "opacity-90",
        className
      )}
      onClick={handleClick}
    >
      <CardContent className="p-6 pt-6">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              {icon}
            </div>
            {isPremium && !canAccess && (
              <div className="flex items-center text-xs font-medium text-amber-600">
                <Lock className="h-3 w-3 mr-1" />
                <span>Premium</span>
              </div>
            )}
          </div>
          <h3 className="font-medium mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
      <CardFooter className="p-0"></CardFooter>
    </Card>
  );
};

export default FeatureCard;
