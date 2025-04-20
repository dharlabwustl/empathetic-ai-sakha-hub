
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { PlanType } from '@/services/featureService';

export interface GroupCheckoutState {
  loading: boolean;
  paymentMethod: 'card' | 'upi';
  plan: {
    id: string;
    name: string;
    price: number;
    userCount?: number;
    planType?: 'group' | 'school' | 'corporate';
  };
  emails: string[];
  inviteCodes: string[];
}

export const useGroupCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('card');
  
  const { plan, emails, inviteCodes } = location.state || {};

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleProcessPayment = () => {
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: "Your group plan has been activated.",
        variant: "default",
      });
      
      // Navigate to profile page with updated plan info
      navigate('/dashboard/student/profile', { 
        state: { 
          planUpdated: true, 
          newPlan: plan,
          isGroupLeader: true,
          invitedEmails: emails,
          inviteCodes
        }
      });
      
      setLoading(false);
    }, 2000);
  };

  const handleManageBatch = () => {
    navigate('/dashboard/student/batch');
  };

  return {
    state: {
      loading,
      paymentMethod,
      plan,
      emails,
      inviteCodes,
    },
    actions: {
      setPaymentMethod,
      handleGoBack,
      handleProcessPayment,
      handleManageBatch,
    }
  };
};
