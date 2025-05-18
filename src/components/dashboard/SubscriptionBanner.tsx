
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { X, Crown, Calendar, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SubscriptionBannerProps {
  planType?: string;
  expiryDate?: string;
  isExpired?: boolean;
}

const SubscriptionBanner: React.FC<SubscriptionBannerProps> = ({
  planType = 'free',
  expiryDate,
  isExpired = false
}) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const navigate = useNavigate();

  // Don't show banner for expired subscriptions
  if (isExpired || !isVisible) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
  };
  
  const handleManageSubscription = () => {
    // Navigate to the student subscription page
    navigate('/dashboard/student/subscription');
  };

  // Calculate days remaining if expiry date is provided
  const getDaysRemaining = () => {
    if (!expiryDate) return null;
    
    const expiry = new Date(expiryDate);
    const now = new Date();
    
    // If date is in the past, subscription has expired
    if (expiry < now) return "Expired";
    
    // Return human readable format (e.g., "3 days", "2 weeks")
    return formatDistanceToNow(expiry, { addSuffix: false });
  };
  
  // Format expiry date for better readability
  const formatExpiryDate = () => {
    if (!expiryDate) return null;
    return new Date(expiryDate).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  const daysRemaining = getDaysRemaining();
  const formattedExpiryDate = formatExpiryDate();
  
  // Determine banner style based on subscription type
  const getBannerStyle = () => {
    if (planType.toLowerCase().includes('premium') || planType.toLowerCase().includes('pro')) {
      return {
        bgClass: 'bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/20',
        iconClass: 'text-amber-500 dark:text-amber-400',
        borderClass: 'border-amber-200 dark:border-amber-800',
        textClass: 'text-amber-800 dark:text-amber-300'
      };
    }
    
    // Free plan
    return {
      bgClass: 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20',
      iconClass: 'text-blue-500 dark:text-blue-400',
      borderClass: 'border-blue-200 dark:border-blue-800',
      textClass: 'text-blue-800 dark:text-blue-300'
    };
  };
  
  const styles = getBannerStyle();
  
  // Only show for certain subscription types
  if (planType.toLowerCase() === 'free' || planType.toLowerCase() === 'basic') {
    return null;
  }
  
  return (
    <div className={`relative px-4 py-2 mb-4 rounded-lg border ${styles.borderClass} ${styles.bgClass}`}>
      <button
        onClick={handleClose}
        className="absolute right-2 top-2 p-1 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      </button>
      
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full bg-white/80 dark:bg-gray-800/80 ${styles.iconClass}`}>
          <Crown className="w-5 h-5" />
        </div>
        
        <div className="flex-1">
          <h3 className={`font-medium ${styles.textClass}`}>
            {planType.toLowerCase().includes('premium') || planType.toLowerCase().includes('pro')
              ? 'Premium Plan Active'
              : 'Subscription Active'}
          </h3>
          
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Thank you for your subscription! 5% of your subscription helps fund education for underprivileged students.
          </p>
          
          {expiryDate && (
            <p className="text-sm text-gray-600 dark:text-gray-300 flex items-center mt-1">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              {daysRemaining && (
                <span>Expires in {daysRemaining} ({formattedExpiryDate})</span>
              )}
            </p>
          )}
          
          <div className="flex items-center mt-1 text-xs text-pink-600">
            <Heart className="w-3.5 h-3.5 mr-1 fill-pink-100" />
            <span>Your contribution is making a difference!</span>
          </div>
        </div>
        
        <Button variant="outline" size="sm" onClick={handleManageSubscription}>
          Manage
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionBanner;
