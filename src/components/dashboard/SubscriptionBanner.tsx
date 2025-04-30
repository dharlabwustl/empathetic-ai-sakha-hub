
import { Button } from '@/components/ui/button';
import { Clock, AlertTriangle } from 'lucide-react';
import { SubscriptionType } from '@/types/user/base';

interface SubscriptionBannerProps {
  planType: SubscriptionType | string;
  expiryDate?: string;
  isExpired?: boolean;
}

const SubscriptionBanner = ({ planType, expiryDate, isExpired }: SubscriptionBannerProps) => {
  // Skip rendering for premium plans that aren't expired
  if ((planType === SubscriptionType.Premium || planType === SubscriptionType.Pro) && !isExpired) {
    return null;
  }
  
  // Determine banner style based on subscription status
  const getBannerStyle = () => {
    if (isExpired) {
      return "bg-red-50 text-red-800 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800/30";
    }
    
    if (planType === SubscriptionType.Free) {
      return "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800/30";
    }
    
    if (planType === SubscriptionType.Trial) {
      return "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800/30";
    }
    
    return "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800/30";
  };

  // Get message based on subscription type and status
  const getMessage = () => {
    if (isExpired) {
      return "Your subscription has expired. Upgrade now to continue accessing premium features.";
    }
    
    if (planType === SubscriptionType.Free) {
      return "You're using the Free plan. Upgrade to unlock premium features and unlimited access.";
    }
    
    if (planType === SubscriptionType.Trial) {
      const daysLeft = expiryDate ? Math.max(0, Math.ceil((new Date(expiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : 0;
      return `Your trial expires in ${daysLeft} days. Upgrade to continue accessing premium features.`;
    }
    
    return "Upgrade your plan to access more features.";
  };

  return (
    <div className={`mb-6 p-3 border rounded-lg flex flex-col sm:flex-row items-center justify-between gap-2 ${getBannerStyle()}`}>
      <div className="flex items-center gap-2">
        {isExpired ? (
          <AlertTriangle className="h-5 w-5" />
        ) : (
          <Clock className="h-5 w-5" />
        )}
        <p className="text-sm font-medium">{getMessage()}</p>
      </div>
      <Button 
        size="sm" 
        className={isExpired ? "bg-red-600 hover:bg-red-700 text-white" : ""}
      >
        Upgrade Now
      </Button>
    </div>
  );
};

export default SubscriptionBanner;
