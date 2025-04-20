
import { useAuth } from '@/contexts/auth/AuthContext';
import { Feature } from '@/types/features';
import { featureService, PlanType } from '@/services/featureService';
import { useQuery } from '@tanstack/react-query';
import { useToast } from './use-toast';

export const useFeatureAccess = (feature: Feature) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: hasAccess, isLoading } = useQuery({
    queryKey: ['featureAccess', feature.id, user?.id],
    queryFn: async () => {
      if (!user) return false;
      
      try {
        // Use safe type checking for subscription
        let userPlanType: PlanType = PlanType.Free;
        
        // Safely check if user has a subscription property
        if (user && typeof user === 'object') {
          const userObj = user as any;
          if ('subscription' in userObj) {
            const userSubscription = userObj.subscription;
            
            if (typeof userSubscription === 'object' && 'planType' in userSubscription) {
              userPlanType = userSubscription.planType as unknown as PlanType;
            } else if (typeof userSubscription === 'string') {
              userPlanType = userSubscription as unknown as PlanType;
            }
          }
        }
        
        return await featureService.isFeatureAccessible(
          feature,
          userPlanType,
          user.id
        );
      } catch (error) {
        toast({
          title: 'Error checking feature access',
          description: 'Please try again later',
          variant: 'destructive'
        });
        return false;
      }
    },
    enabled: !!user
  });

  const trackFeatureUsage = async () => {
    if (!user) return;
    
    try {
      await featureService.updateFeatureAccess(
        feature.id,
        user.id,
        feature.accessLevel
      );
    } catch (error) {
      console.error('Error tracking feature usage:', error);
    }
  };

  return {
    hasAccess: hasAccess || false,
    isLoading,
    trackFeatureUsage
  };
};
