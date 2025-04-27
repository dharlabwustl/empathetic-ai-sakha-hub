
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, AlertCircle, Users, Crown } from 'lucide-react';
import { formatDate } from '@/utils/dateUtils';

interface SubscriptionDetailsCardProps {
  planType: 'individual' | 'group' | 'batch_leader';
  planName: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  daysRemaining: number;
  benefits: string[];
  onUpgrade: () => void;
}

const SubscriptionDetailsCard: React.FC<SubscriptionDetailsCardProps> = ({
  planType = 'individual',
  planName = 'Premium',
  isActive = true,
  startDate,
  endDate,
  daysRemaining = 30,
  benefits = [],
  onUpgrade
}) => {
  // Set icon and color based on plan type
  let planIcon;
  let planColorClass;
  let roleLabel;
  
  switch (planType) {
    case 'group':
      planIcon = <Users className="h-5 w-5" />;
      planColorClass = "bg-blue-500";
      roleLabel = "Group Member";
      break;
    case 'batch_leader':
      planIcon = <Crown className="h-5 w-5" />;
      planColorClass = "bg-amber-500";
      roleLabel = "Batch Leader";
      break;
    default:
      planIcon = <CheckCircle className="h-5 w-5" />;
      planColorClass = "bg-green-500";
      roleLabel = "Individual";
  }
  
  // Default benefits if none provided
  const defaultBenefits = [
    "Access to all exam modules",
    "Progress tracking & analytics",
    "Personalized study plans",
    "24/7 AI tutoring",
    "Unlimited practice questions"
  ];
  
  const displayBenefits = benefits.length > 0 ? benefits : defaultBenefits;
  
  // Check if subscription is nearly expired (< 7 days)
  const isNearlyExpired = daysRemaining <= 7 && daysRemaining > 0;

  return (
    <Card>
      <div className={`h-2 ${planColorClass}`}></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Subscription Details</CardTitle>
          <Badge className={isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
            {isActive ? "Active" : "Expired"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold flex items-center">
              {planName} Plan
            </h3>
            <div className="flex items-center mt-1 text-muted-foreground text-sm">
              <div className="flex items-center mr-2">
                {planIcon}
                <span className="ml-1">{roleLabel}</span>
              </div>
            </div>
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${planType === 'batch_leader' ? 'bg-amber-100' : planType === 'group' ? 'bg-blue-100' : 'bg-green-100'}`}>
            {planIcon}
          </div>
        </div>
        
        <div className="flex justify-between items-center p-3 rounded-md bg-gray-50">
          <div>
            <p className="text-sm text-muted-foreground">Valid from</p>
            <p className="font-medium">{formatDate(startDate)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="font-medium text-green-600">{isActive ? 'Active' : 'Expired'}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Valid until</p>
            <p className="font-medium">{formatDate(endDate)}</p>
          </div>
        </div>
        
        {isActive && (
          <div className={`flex items-center gap-2 p-3 rounded-md ${
            isNearlyExpired ? 'bg-amber-50 border border-amber-100' : 'bg-green-50 border border-green-100'
          }`}>
            {isNearlyExpired ? (
              <AlertCircle className="text-amber-500 h-5 w-5 flex-shrink-0" />
            ) : (
              <CheckCircle className="text-green-500 h-5 w-5 flex-shrink-0" />
            )}
            <div>
              <p className="font-medium">
                {isNearlyExpired 
                  ? `Your subscription expires in ${daysRemaining} days` 
                  : `${daysRemaining} days remaining in your subscription`
                }
              </p>
              {isNearlyExpired && (
                <p className="text-sm">Consider renewing your plan to avoid interruption</p>
              )}
            </div>
          </div>
        )}
        
        <div>
          <h4 className="text-sm font-medium mb-2">Plan Benefits</h4>
          <ul className="space-y-1 text-sm">
            {displayBenefits.map((benefit, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        
        <Separator />
        
        {isActive ? (
          isNearlyExpired ? (
            <Button className="w-full" onClick={onUpgrade}>
              Renew Subscription
            </Button>
          ) : (
            <Button variant="outline" className="w-full" onClick={onUpgrade}>
              Upgrade Plan
            </Button>
          )
        ) : (
          <Button className="w-full" onClick={onUpgrade}>
            Reactivate Subscription
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionDetailsCard;
