
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Clock, CreditCard, Download, Info, AlertCircle, Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BillingCycle {
  nextBillingDate: string;
  amount: number;
  planName: string;
  status: 'active' | 'pending' | 'canceled';
  autoRenew: boolean;
}

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  downloadUrl: string;
}

interface ProfileBillingSectionProps {
  subscriptionId?: string;
  planName?: string;
  currentPeriodEnd?: string;
  billingCycle?: BillingCycle;
  invoices?: Invoice[];
}

const ProfileBillingSection: React.FC<ProfileBillingSectionProps> = ({
  subscriptionId = 'sub_12345',
  planName = 'Free Trial',
  currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  billingCycle = {
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    amount: 0,
    planName: 'Free Trial',
    status: 'active' as const,
    autoRenew: true
  },
  invoices = [
    {
      id: 'inv_12345',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      amount: 0,
      status: 'paid' as const,
      downloadUrl: '#'
    }
  ]
}) => {
  const navigate = useNavigate();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'paid':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'canceled':
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };
  
  const handleUpgrade = () => {
    navigate('/dashboard/student/subscription');
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Current Subscription</CardTitle>
          <Button 
            variant="default"
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
            onClick={handleUpgrade}
          >
            <Crown className="mr-2 h-4 w-4" />
            Upgrade Plan
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-lg">{planName}</h3>
                <Badge className={getStatusColor(billingCycle.status)}>
                  {billingCycle.status.charAt(0).toUpperCase() + billingCycle.status.slice(1)}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Renews on {formatDate(billingCycle.nextBillingDate)}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold">
                ₹{billingCycle.amount.toFixed(2)}
              </div>
              <div className="text-sm text-muted-foreground">per month</div>
            </div>
          </div>
          
          <div className="flex items-start p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              {billingCycle.autoRenew ? (
                <>
                  Your subscription will automatically renew on {formatDate(billingCycle.nextBillingDate)}.
                  You can cancel or change your plan at any time.
                </>
              ) : (
                <>
                  Your subscription will expire on {formatDate(billingCycle.nextBillingDate)}.
                  To continue using premium features, please renew your subscription.
                </>
              )}
            </div>
          </div>
          
          {subscriptionId && (
            <div className="text-xs text-muted-foreground">
              Subscription ID: {subscriptionId}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Billing History</CardTitle>
          <Button variant="outline" size="sm">
            <CalendarDays className="mr-2 h-4 w-4" />
            View All
          </Button>
        </CardHeader>
        <CardContent>
          {invoices.length > 0 ? (
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                      <CreditCard className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    </div>
                    <div>
                      <div className="font-medium">{formatDate(invoice.date)}</div>
                      <div className="text-sm text-muted-foreground">Invoice #{invoice.id}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">₹{invoice.amount.toFixed(2)}</div>
                      <Badge variant="outline" className={getStatusColor(invoice.status)}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <AlertCircle className="h-10 w-10 text-muted-foreground mb-2" />
              <h3 className="font-medium">No invoices yet</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Your billing history will appear here once you've made a payment
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileBillingSection;
