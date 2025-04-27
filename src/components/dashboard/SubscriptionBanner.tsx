
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShieldCheck, Bell, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SubscriptionBannerProps {
  planType: string;
  expiryDate?: string;
  isExpired?: boolean;
}

const SubscriptionBanner: React.FC<SubscriptionBannerProps> = ({
  planType = 'free',
  expiryDate,
  isExpired = false
}) => {
  const navigate = useNavigate();
  
  // Get remaining days until expiry
  const getRemainingDays = () => {
    if (!expiryDate) return 0;
    
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = Math.abs(expiry.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  const remainingDays = getRemainingDays();
  
  // Handle banner appearance based on subscription type and status
  const getBannerColor = () => {
    if (isExpired) return "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800";
    
    switch (planType.toLowerCase()) {
      case 'premium':
        return "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800";
      case 'enterprise':
        return "bg-purple-50 border-purple-200 text-purple-800 dark:bg-purple-900/20 dark:border-purple-800";
      default:
        return "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800";
    }
  };
  
  const getIcon = () => {
    if (isExpired) return <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />;
    
    if (planType.toLowerCase() === 'free') {
      return <Bell className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
    }
    
    return <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
  };
  
  const handleUpgrade = () => {
    navigate('/dashboard/student/profile?tab=subscription');
  };
  
  return (
    <div className={`px-4 py-3 rounded-lg border flex items-center justify-between mb-4 ${getBannerColor()}`}>
      <div className="flex items-center gap-2 text-sm">
        {getIcon()}
        
        <span>
          {isExpired ? (
            <span className="font-medium">Subscription expired! Upgrade now to continue accessing premium features.</span>
          ) : planType.toLowerCase() === 'free' ? (
            <span>You're on a <span className="font-medium">Free Plan</span>. Upgrade to unlock all premium features.</span>
          ) : remainingDays <= 7 ? (
            <span>Your <span className="font-medium capitalize">{planType}</span> subscription expires in {remainingDays} days.</span>
          ) : (
            <span>You're on a <span className="font-medium capitalize">{planType}</span> subscription.</span>
          )}
        </span>
      </div>
      
      {(planType.toLowerCase() === 'free' || isExpired || remainingDays <= 7) && (
        <Button size="sm" onClick={handleUpgrade}>
          {isExpired ? 'Renew Now' : 'Upgrade'}
        </Button>
      )}
    </div>
  );
};

export default SubscriptionBanner;
