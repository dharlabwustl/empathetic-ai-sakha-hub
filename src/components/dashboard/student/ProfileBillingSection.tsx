
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown, CreditCard, Download } from "lucide-react";
import { formatCurrency } from "@/utils/stringUtils";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

interface ProfileBillingSectionProps {
  subscriptionId?: string;
  planName?: string;
  currentPeriodEnd?: string;
}

const ProfileBillingSection: React.FC<ProfileBillingSectionProps> = ({
  subscriptionId,
  planName = 'Free',
  currentPeriodEnd
}) => {
  const navigate = useNavigate();
  const isPremium = planName?.toLowerCase() !== 'free';
  
  const handleUpgradePlan = () => {
    navigate('/dashboard/student/subscription');
  };
  
  // Sample billing data - In a real app, this would come from the API
  const billingHistory = isPremium ? [
    {
      id: 'INV-001',
      amount: 1999,
      date: '2023-12-01',
      status: 'paid'
    },
    {
      id: 'INV-002',
      amount: 1999,
      date: '2024-01-01',
      status: 'paid'
    },
    {
      id: 'INV-003',
      amount: 1999,
      date: '2024-02-01',
      status: 'upcoming'
    }
  ] : [];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className={`h-5 w-5 ${isPremium ? 'text-amber-500' : 'text-gray-400'}`} />
              <h3 className="text-lg font-medium">{planName} Plan</h3>
              {isPremium && (
                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                  Premium
                </Badge>
              )}
            </div>
            
            <Button 
              variant={isPremium ? "outline" : "default"}
              onClick={handleUpgradePlan}
              className={isPremium ? "border-amber-300 text-amber-700" : "bg-gradient-to-r from-amber-500 to-amber-600"}
            >
              {isPremium ? 'Change Plan' : 'Upgrade Now'}
            </Button>
          </div>
          
          {isPremium ? (
            <div className="mt-4 border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-sm">Subscription ID</p>
                  <p className="font-medium">{subscriptionId || 'SUB-12345'}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Current Period Ends</p>
                  <p className="font-medium">
                    {currentPeriodEnd ? new Date(currentPeriodEnd).toLocaleDateString() : 'March 15, 2025'}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-4 border rounded-lg p-4 bg-amber-50 border-amber-100">
              <h4 className="font-medium mb-2 text-amber-800">Upgrade to Premium Plan</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Access to all premium courses and materials</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Join study groups with peers</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Personalized learning path</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-600" />
                  <span>Direct access to expert tutors</span>
                </li>
              </ul>
              <Button 
                className="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600"
                onClick={handleUpgradePlan}
              >
                <Crown className="mr-2 h-4 w-4" />
                Get Premium Now
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {isPremium && (
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {billingHistory.map(invoice => (
                <div 
                  key={invoice.id} 
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="flex gap-3 items-center">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(invoice.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <p className="font-medium">{formatCurrency(invoice.amount)}</p>
                    <Badge 
                      variant="outline" 
                      className={
                        invoice.status === 'paid' 
                          ? "bg-green-100 text-green-800 border-green-200" 
                          : "bg-amber-100 text-amber-800 border-amber-200"
                      }
                    >
                      {invoice.status === 'paid' ? 'Paid' : 'Upcoming'}
                    </Badge>
                    {invoice.status === 'paid' && (
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
              {billingHistory.length === 0 && (
                <div className="text-center py-6 text-muted-foreground">
                  No billing history available
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProfileBillingSection;
