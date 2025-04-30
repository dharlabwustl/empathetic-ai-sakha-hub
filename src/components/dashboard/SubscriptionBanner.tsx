
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Calendar, Crown, ExternalLink, Info } from "lucide-react";

interface SubscriptionBannerProps {
  planType: string;
  expiryDate?: string;
  isExpired?: boolean;
}

const SubscriptionBanner: React.FC<SubscriptionBannerProps> = ({ 
  planType, 
  expiryDate, 
  isExpired = false 
}) => {
  // Skip banner for premium/enterprise plans
  if (planType === 'premium' || planType === 'enterprise' || planType === 'pro_annual' || planType === 'pro_monthly') {
    return null;
  }
  
  // Format expiry date if present
  const formattedDate = expiryDate ? new Date(expiryDate).toLocaleDateString() : null;
  
  // Calculate days remaining if expiry date is present
  const daysRemaining = expiryDate ? Math.max(0, Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) : null;
  
  // Determine if low days warning should be shown (7 days or less)
  const showLowDaysWarning = daysRemaining !== null && daysRemaining <= 7;
  
  // Free tier banner
  if (planType === 'free') {
    return (
      <Card className="mb-6 overflow-hidden border-blue-200 dark:border-blue-800">
        <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 dark:from-blue-950/50 dark:via-blue-900/30 dark:to-blue-950/50 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              <Crown className="h-6 w-6 text-amber-500 mr-3" />
              <div>
                <h3 className="font-medium text-blue-800 dark:text-blue-300">Upgrade to PREPZR Pro</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">Unlock all features and get unlimited access to AI tutoring</p>
              </div>
            </div>
            <Button className="whitespace-nowrap bg-blue-600 hover:bg-blue-700">
              Upgrade Now <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }
  
  // Trial banner with expiry date
  if (planType === 'trial' && formattedDate) {
    return (
      <Card className="mb-6 overflow-hidden border-amber-200 dark:border-amber-800">
        <div className="bg-gradient-to-r from-amber-50 via-amber-100 to-amber-50 dark:from-amber-950/50 dark:via-amber-900/30 dark:to-amber-950/50 p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center">
              {isExpired || showLowDaysWarning ? (
                <AlertTriangle className="h-6 w-6 text-red-500 mr-3" />
              ) : (
                <Info className="h-6 w-6 text-amber-500 mr-3" />
              )}
              <div>
                {isExpired ? (
                  <h3 className="font-medium text-red-800 dark:text-red-300">Your trial has expired</h3>
                ) : (
                  <h3 className="font-medium text-amber-800 dark:text-amber-300">
                    {showLowDaysWarning ? 'Your trial is ending soon' : 'You\'re on a trial plan'}
                  </h3>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <p className="text-sm text-amber-600 dark:text-amber-400">
                    {isExpired 
                      ? `Trial ended on ${formattedDate}` 
                      : `Trial ends on ${formattedDate}`
                    }
                  </p>
                  {!isExpired && daysRemaining !== null && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-amber-500" />
                      <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                        {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} remaining
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button className="whitespace-nowrap bg-amber-600 hover:bg-amber-700">
              {isExpired ? 'Renew Now' : 'Upgrade to Pro'}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          {!isExpired && daysRemaining !== null && (
            <div className="mt-3">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-amber-700 dark:text-amber-400">Trial Progress</span>
                <span className="text-amber-700 dark:text-amber-400">
                  {100 - Math.round((daysRemaining / 14) * 100)}%
                </span>
              </div>
              <Progress 
                value={100 - Math.round((daysRemaining / 14) * 100)} 
                className="h-1.5 bg-amber-200 dark:bg-amber-900/50" 
              />
            </div>
          )}
        </div>
      </Card>
    );
  }
  
  // Default case - basic plan or unknown
  return null;
};

export default SubscriptionBanner;
