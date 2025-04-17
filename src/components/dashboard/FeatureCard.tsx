
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SubscriptionType } from '@/types/user/base';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  isPremium: boolean;
  userSubscription?: SubscriptionType;
}

export default function FeatureCard({
  title,
  description,
  icon,
  path,
  isPremium,
  userSubscription = "basic"
}: FeatureCardProps) {
  const navigate = useNavigate();
  const hasPremiumAccess = userSubscription === "premium";
  
  const handleClick = () => {
    if (isPremium && !hasPremiumAccess) {
      // Redirect to upgrade page
      navigate('/pricing');
    } else {
      // Navigate to feature
      navigate(path);
    }
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-all duration-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900 hover:shadow-md">
      <div className="bg-gradient-to-r from-sakha-light-blue/10 to-sakha-lavender/10 dark:from-sakha-light-blue/5 dark:to-sakha-lavender/5 p-3">
        <div className="bg-white dark:bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center shadow-sm">
          <div className="text-sakha-blue">
            {icon}
          </div>
        </div>
      </div>
      <CardContent className="flex-grow p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium">{title}</h3>
          {isPremium && !hasPremiumAccess && (
            <div className="bg-amber-100 dark:bg-amber-950 p-1 rounded">
              <Lock size={14} className="text-amber-600 dark:text-amber-400" />
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          variant={isPremium && !hasPremiumAccess ? "outline" : "default"}
          className={`w-full ${
            isPremium && !hasPremiumAccess
              ? "border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-400"
              : "bg-gradient-to-r from-sakha-blue to-sakha-purple text-white"
          }`}
          onClick={handleClick}
        >
          {isPremium && !hasPremiumAccess ? "Upgrade to Access" : "Open"}
        </Button>
      </CardFooter>
    </Card>
  );
}
