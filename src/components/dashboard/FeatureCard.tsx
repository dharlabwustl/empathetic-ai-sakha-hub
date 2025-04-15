
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { SubscriptionType } from "@/types/user"; // Updated import path
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  isPremium: boolean;
  userSubscription: SubscriptionType;
}

export default function FeatureCard({
  title,
  description,
  icon,
  path,
  isPremium,
  userSubscription
}: FeatureCardProps) {
  const isPremiumUser = userSubscription === "Premium";
  const isBasicUser = userSubscription === "Basic" || userSubscription === "Premium";
  const canAccess = !isPremium || (isPremium && isPremiumUser);

  return (
    <Card className={`h-full flex flex-col ${!canAccess ? 'opacity-75' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-md bg-primary/10 text-primary">
            {icon}
          </div>
          {isPremium && (
            <Badge variant="default" className="bg-gradient-to-r from-amber-500 to-yellow-600">
              Premium
            </Badge>
          )}
        </div>
        <CardTitle className="mt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {!canAccess && (
          <div className="flex items-center gap-2 text-sm text-amber-600 mt-2">
            <Lock size={14} />
            <span>Requires Premium plan</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {canAccess ? (
          <Button asChild className="w-full">
            <Link to={path}>Open</Link>
          </Button>
        ) : (
          <Button variant="outline" className="w-full">
            Upgrade
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
