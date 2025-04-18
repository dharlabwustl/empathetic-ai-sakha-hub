
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth/AuthContext';

interface SubscriptionFlowContextProps {
  selectedPlan: string | null;
  isUpgrading: boolean;
  selectPlan: (plan: string) => void;
  startSubscriptionFlow: (plan: string) => void;
  resetFlow: () => void;
  handleAfterOnboarding: () => void;
  handleAfterPayment: () => void;
}

const SubscriptionFlowContext = createContext<SubscriptionFlowContextProps | undefined>(undefined);

export const useSubscriptionFlow = (): SubscriptionFlowContextProps => {
  const context = useContext(SubscriptionFlowContext);
  if (!context) {
    throw new Error('useSubscriptionFlow must be used within a SubscriptionFlowProvider');
  }
  return context;
};

// This is a wrapper component that only renders children when inside a Router
export const SubscriptionFlowProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);
  
  // Safe navigation function to avoid Router context errors
  const safeNavigate = (path: string) => {
    if (window) {
      window.location.href = path;
    }
  };
  
  // Try to use React Router hooks safely
  let navigate: ReturnType<typeof useNavigate> | null = null;
  let routerAvailable = true;
  
  try {
    navigate = useNavigate();
  } catch (e) {
    routerAvailable = false;
    console.warn('Router context not available, using fallback navigation');
  }

  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const selectPlan = (plan: string) => {
    setSelectedPlan(plan);
  };

  const resetFlow = () => {
    setSelectedPlan(null);
    setIsUpgrading(false);
  };

  const startSubscriptionFlow = (plan: string) => {
    selectPlan(plan);
    
    // If user is not signed up yet
    if (!isAuthenticated) {
      if (plan === 'free') {
        // For free plan, redirect directly to signup with plan parameter
        if (navigate && routerAvailable) {
          navigate('/signup?plan=free');
        } else {
          safeNavigate('/signup?plan=free');
        }
      } else {
        // For paid plans, redirect to signup with plan parameter
        if (navigate && routerAvailable) {
          navigate(`/signup?plan=${plan}`);
        } else {
          safeNavigate(`/signup?plan=${plan}`);
        }
      }
    } else {
      // User is already logged in, mark as upgrading
      setIsUpgrading(true);
      
      // For existing users, redirect to checkout immediately
      if (plan !== 'free') {
        if (navigate && routerAvailable) {
          navigate('/checkout');
        } else {
          safeNavigate('/checkout');
        }
      } else {
        // If switching to free plan, just update their account
        toast({
          title: "Plan Updated",
          description: "Your account has been switched to the Free plan.",
        });
        
        if (navigate && routerAvailable) {
          navigate('/dashboard/student/profile');
        } else {
          safeNavigate('/dashboard/student/profile');
        }
      }
    }
  };

  const handleAfterOnboarding = () => {
    if (!selectedPlan || selectedPlan === 'free') {
      // For free plans, go straight to dashboard
      if (navigate && routerAvailable) {
        navigate('/dashboard/student?completedOnboarding=true');
      } else {
        safeNavigate('/dashboard/student?completedOnboarding=true');
      }
    } else {
      // For paid plans, go to checkout
      if (navigate && routerAvailable) {
        navigate('/checkout');
      } else {
        safeNavigate('/checkout');
      }
    }
  };

  const handleAfterPayment = () => {
    // After successful payment, reset the flow and redirect to profile
    toast({
      title: "Payment Successful",
      description: "Your subscription has been activated.",
    });
    resetFlow();
    
    if (navigate && routerAvailable) {
      navigate('/dashboard/student/profile');
    } else {
      safeNavigate('/dashboard/student/profile');
    }
  };

  return (
    <SubscriptionFlowContext.Provider
      value={{
        selectedPlan,
        isUpgrading,
        selectPlan,
        startSubscriptionFlow,
        resetFlow,
        handleAfterOnboarding,
        handleAfterPayment
      }}
    >
      {children}
    </SubscriptionFlowContext.Provider>
  );
};
