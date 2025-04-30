
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SubscriptionType } from '@/types/user/base';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isPremium?: boolean;
  isNew?: boolean;
  path: string;
  onClick?: () => void;
  className?: string;
  userSubscription?: SubscriptionType | { planType: SubscriptionType };
}

export default function FeatureCard({
  title,
  description,
  icon: Icon,
  isPremium = false,
  isNew = false,
  path,
  onClick,
  className = '',
  userSubscription
}: FeatureCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (isPremium && (!userSubscription || 
        (typeof userSubscription === 'string' && userSubscription === 'free') ||
        (typeof userSubscription === 'object' && userSubscription.planType === 'free'))) {
      e.preventDefault();
      onClick && onClick();
    }
  };

  return (
    <Card className={`overflow-hidden hover:shadow-md transition-shadow ${className}`}>
      <CardHeader className="p-4">
        <div className="flex justify-between">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div>
            {isNew && (
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200 text-xs">
                New
              </Badge>
            )}
            {isPremium && (
              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200 text-xs">
                Premium
              </Badge>
            )}
          </div>
        </div>
        <CardTitle className="text-lg mt-3">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="p-4 pt-0">
        <Button variant="ghost" asChild className="w-full justify-between p-2">
          <Link to={path} onClick={handleClick}>
            Explore Feature
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
