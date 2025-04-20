
import React from 'react';
import { useStudentDashboard } from '@/hooks/useStudentDashboard';
import DashboardLoading from './DashboardLoading';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { GroupPaymentSection } from '@/components/checkout/GroupPaymentSection';
import { GroupOrderSummary } from '@/components/checkout/GroupOrderSummary';
import { useGroupCheckout } from '@/hooks/useGroupCheckout';
import { DashboardLayoutWrapper } from '@/components/dashboard/student/DashboardLayoutWrapper';

export default function GroupCheckoutPage() {
  const {
    userProfile,
    loading: dashboardLoading,
  } = useStudentDashboard();
  
  const {
    state: { loading, paymentMethod, plan },
    actions: { setPaymentMethod, handleGoBack, handleProcessPayment }
  } = useGroupCheckout();
  
  if (dashboardLoading || !userProfile || !plan) {
    return <DashboardLoading />;
  }

  return (
    <DashboardLayoutWrapper userProfile={userProfile}>
      <div className="container max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center gap-2"
          onClick={handleGoBack}
        >
          <ArrowLeft size={16} />
          Back to Plans
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">Complete Your Order</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Review your order details and complete payment
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <GroupPaymentSection
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
              loading={loading}
            />
            
            <Button
              className="w-full"
              size="lg"
              onClick={handleProcessPayment}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Complete Payment'}
            </Button>
          </div>
          
          <div className="lg:col-span-5">
            <GroupOrderSummary plan={plan} />
          </div>
        </div>
      </div>
    </DashboardLayoutWrapper>
  );
}
