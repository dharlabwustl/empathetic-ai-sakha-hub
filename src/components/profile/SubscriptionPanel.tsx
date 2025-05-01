
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckIcon, XIcon } from "lucide-react";
import type { SubscriptionPlan } from "@/types/user/base";

interface SubscriptionPanelProps {
  subscription?: SubscriptionPlan;
}

export const SubscriptionPanel = ({ subscription }: SubscriptionPanelProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = () => {
    if (!subscription) {
      return <Badge variant="outline" className="bg-gray-100 text-gray-800">Free</Badge>;
    }
    
    if (!subscription.isActive) {
      return <Badge variant="outline" className="bg-red-100 text-red-800">Expired</Badge>;
    }
    
    const endDate = subscription.endDate ? new Date(subscription.endDate) : null;
    const today = new Date();
    
    if (endDate && endDate < today) {
      return <Badge variant="outline" className="bg-red-100 text-red-800">Expired</Badge>;
    }
    
    if (endDate && endDate.getTime() - today.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Expiring Soon</Badge>;
    }
    
    return <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>;
  };

  const getSubscriptionType = () => {
    if (!subscription) return "Free";
    
    const planType = subscription.planType;
    
    if (planType.includes("group") || planType.includes("batch")) {
      return subscription.memberLimit ? `Group Plan (${subscription.memberLimit} members)` : "Group Plan";
    }
    
    return planType.charAt(0).toUpperCase() + planType.slice(1);
  };

  const getPlanFeatures = () => {
    if (!subscription) {
      return [
        { name: "Limited access to practice exams", included: true },
        { name: "Basic concept cards", included: true },
        { name: "Community forums", included: false },
        { name: "AI-powered tutor (limited)", included: true },
        { name: "Batch creation", included: false },
        { name: "Advanced analytics", included: false }
      ];
    }
    
    if (subscription.planType.includes("premium")) {
      return [
        { name: "Unlimited practice exams", included: true },
        { name: "All concept cards", included: true },
        { name: "Community forums", included: true },
        { name: "Unlimited AI-powered tutor", included: true },
        { name: "Batch creation", included: false },
        { name: "Advanced analytics", included: true }
      ];
    }
    
    if (subscription.planType.includes("group") || subscription.planType.includes("batch")) {
      return [
        { name: "Unlimited practice exams", included: true },
        { name: "All concept cards", included: true },
        { name: "Community forums", included: true },
        { name: "Unlimited AI-powered tutor", included: true },
        { name: `Batch management (up to ${subscription.memberLimit} members)`, included: true },
        { name: "Advanced analytics", included: true }
      ];
    }
    
    // Default to basic plan
    return [
      { name: "5 practice exams per month", included: true },
      { name: "Basic concept cards", included: true },
      { name: "Community forums", included: true },
      { name: "AI-powered tutor (limited)", included: true },
      { name: "Batch creation", included: false },
      { name: "Basic analytics", included: true }
    ];
  };
  
  const isExpiringSoon = () => {
    if (!subscription || !subscription.endDate) return false;
    
    const endDate = new Date(subscription.endDate);
    const today = new Date();
    
    return endDate > today && endDate.getTime() - today.getTime() < 7 * 24 * 60 * 60 * 1000;
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Subscription Details</span>
            {getStatusBadge()}
          </CardTitle>
          <CardDescription>
            Your current plan and subscription details
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Plan Type</h3>
              <p className="text-lg font-semibold">{getSubscriptionType()}</p>
            </div>
            
            {subscription && (
              <>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Start Date</h3>
                  <p className="text-lg font-semibold">{formatDate(subscription.startDate)}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">End Date</h3>
                  <p className="text-lg font-semibold">{formatDate(subscription.endDate)}</p>
                </div>
              </>
            )}
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Plan Benefits</h3>
            <ul className="space-y-3">
              {getPlanFeatures().map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  {feature.included ? (
                    <CheckIcon className="h-5 w-5 text-green-500" />
                  ) : (
                    <XIcon className="h-5 w-5 text-gray-300" />
                  )}
                  <span className={feature.included ? "" : "text-muted-foreground"}>{feature.name}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            {isExpiringSoon() && (
              <Button className="flex-1">
                Renew Subscription
              </Button>
            )}
            
            {!subscription?.planType.includes('group') && !subscription?.planType.includes('batch') && (
              <Button variant={isExpiringSoon() ? "outline" : "default"} className="flex-1">
                Upgrade to {subscription?.planType.includes('premium') ? 'Group' : 'Premium'} Plan
              </Button>
            )}
            
            {subscription && (
              <Button variant="outline" className="flex-1">
                Manage Subscription
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
