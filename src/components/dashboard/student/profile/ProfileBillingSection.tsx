
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UserProfileType } from '@/types/user/base';
import { useToast } from '@/hooks/use-toast';
import { CalendarClock, CreditCard, Download, Users, CheckCircle2 } from 'lucide-react';
import { formatDate } from '@/utils/dateUtils';
import { SubscriptionPlan } from '@/types/subscription';

interface ProfileBillingSectionProps {
  userProfile: UserProfileType;
  onUpdateProfile: (updates: Partial<UserProfileType>) => void;
}

const ProfileBillingSection: React.FC<ProfileBillingSectionProps> = ({
  userProfile,
  onUpdateProfile
}) => {
  const { toast } = useToast();
  const [showChangeModal, setShowChangeModal] = useState(false);
  
  // Mock subscription plans
  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Free Trial',
      price: 0,
      billing: 'monthly',
      features: ['Basic features', 'Limited access to materials', '3 practice tests'],
      type: 'free'
    },
    {
      id: 'basic',
      name: 'Basic',
      price: 499,
      billing: 'monthly',
      features: ['All free features', 'Full access to materials', 'Unlimited practice tests', 'Basic analytics'],
      type: 'basic'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 999,
      billing: 'monthly',
      features: ['All basic features', 'Personalized study plan', 'AI-powered recommendations', 'Priority support'],
      isPopular: true,
      type: 'premium'
    },
    {
      id: 'group',
      name: 'Group Pro',
      price: 3999,
      billing: 'monthly',
      features: ['All premium features', 'Up to 5 users', 'Group analytics', 'Batch leader tools'],
      userCount: 5,
      type: 'group'
    }
  ];
  
  // Mock invoice data
  const mockInvoices = [
    {
      id: 'INV-001',
      date: '2023-04-10',
      amount: 999,
      status: 'Paid'
    },
    {
      id: 'INV-002',
      date: '2023-05-10',
      amount: 999,
      status: 'Paid'
    },
    {
      id: 'INV-003',
      date: '2023-06-10',
      amount: 999,
      status: 'Upcoming'
    }
  ];
  
  // Take current subscription from user profile, default to free plan
  const currentSubscription = userProfile.subscription || {
    plan: 'free',
    status: 'active' as const,
    endDate: new Date().toISOString()
  };
  
  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Invoice Download",
      description: `Invoice ${invoiceId} has been downloaded.`,
    });
  };
  
  const handleUpgradePlan = () => {
    setShowChangeModal(false);
    // Navigate to subscription checkout page
    window.location.href = '/dashboard/student/subscription';
  };
  
  const handleCancelSubscription = () => {
    toast({
      title: "Cancellation Requested",
      description: "Your cancellation request has been received. Your subscription will remain active until the end of the billing period.",
    });
  };
  
  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Billing & Subscription</h2>
          <p className="text-sm text-muted-foreground">Manage your subscription and payment methods</p>
        </div>
        <Button onClick={handleUpgradePlan}>
          Upgrade Plan
        </Button>
      </div>
      
      <div className="space-y-6">
        {/* Current Subscription */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Current Plan</span>
              <Badge className={currentSubscription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                {currentSubscription.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
            </CardTitle>
            <CardDescription>Details of your current subscription</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">{currentSubscription.plan}</h3>
                  <p className="text-sm text-muted-foreground">
                    {userProfile.isGroupLeader ? 'Group Leader Account' : 'Individual Account'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground flex items-center justify-end">
                    <CalendarClock className="h-4 w-4 mr-1" />
                    Renews on {formatDate(currentSubscription.endDate)}
                  </p>
                  {userProfile.isGroupLeader && (
                    <p className="text-sm text-primary flex items-center justify-end mt-1">
                      <Users className="h-4 w-4 mr-1" />
                      Managing 5 users
                    </p>
                  )}
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <h4 className="text-sm font-medium mb-2">Included Features</h4>
                <ul className="space-y-1">
                  {subscriptionPlans.find(plan => plan.name.toLowerCase() === currentSubscription.plan.toLowerCase())?.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="text-sm flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {userProfile.batchCode && (
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-md">
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Batch Code: {userProfile.batchCode}</p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    {userProfile.isGroupLeader 
                      ? 'Share this code with users you want to invite to your batch'
                      : 'You are part of a group subscription batch'}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCancelSubscription}
              className={currentSubscription.plan === 'free' ? 'invisible' : ''}
            >
              Cancel Subscription
            </Button>
            <Button
              size="sm"
              onClick={handleUpgradePlan}
            >
              {currentSubscription.plan === 'free' ? 'Subscribe Now' : 'Change Plan'}
            </Button>
          </CardFooter>
        </Card>
        
        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage your payment details</CardDescription>
          </CardHeader>
          <CardContent>
            {currentSubscription.plan !== 'free' ? (
              <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Update</Button>
              </div>
            ) : (
              <p className="text-muted-foreground">No payment methods added yet.</p>
            )}
          </CardContent>
          {currentSubscription.plan !== 'free' && (
            <CardFooter>
              <Button variant="outline" size="sm">Add Payment Method</Button>
            </CardFooter>
          )}
        </Card>
        
        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>View and download your previous invoices</CardDescription>
          </CardHeader>
          <CardContent>
            {currentSubscription.plan !== 'free' ? (
              <div className="space-y-2">
                {mockInvoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(invoice.date)}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`text-sm ${invoice.status === 'Paid' ? 'text-green-600' : 'text-amber-600'}`}>
                        {invoice.status}
                      </span>
                      <span className="text-sm font-medium">₹{invoice.amount}</span>
                      {invoice.status === 'Paid' && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDownloadInvoice(invoice.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No billing history available.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProfileBillingSection;
