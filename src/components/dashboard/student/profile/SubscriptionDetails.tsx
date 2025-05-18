
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserProfileType } from "@/types/user";
import { Check, Heart } from 'lucide-react';
import { useNavigate } from "react-router-dom";

interface SubscriptionDetailsProps {
  userProfile: UserProfileType;
  onUpgrade?: () => void;
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({ 
  userProfile,
  onUpgrade
}) => {
  const navigate = useNavigate();
  
  const getPlanDetails = () => {
    if (!userProfile.subscription) {
      return { name: "Free Plan", isActive: false, features: [] };
    }
    
    const subscription = userProfile.subscription;
    let planName = "Free Plan";
    let features: string[] = [];
    let expiryDate: string | undefined;
    let isActive = false;
    
    if (typeof subscription === 'string') {
      planName = subscription === 'free' ? "Free Plan" : 
                 subscription === 'pro_monthly' ? "Pro Plan (Monthly)" :
                 subscription === 'pro_annual' ? "Pro Plan (Annual)" : 
                 subscription.charAt(0).toUpperCase() + subscription.slice(1) + " Plan";
    } else {
      planName = subscription.planType === 'free' ? "Free Plan" : 
                 subscription.planType === 'pro_monthly' ? "Pro Plan (Monthly)" :
                 subscription.planType === 'pro_annual' ? "Pro Plan (Annual)" : 
                 (subscription.planType || "").charAt(0).toUpperCase() + (subscription.planType || "").slice(1) + " Plan";
      
      features = subscription.features || [];
      expiryDate = subscription.endDate || subscription.expiryDate;
      isActive = subscription.isActive || false;
    }
    
    return { name: planName, features, expiryDate, isActive };
  };
  
  const planDetails = getPlanDetails();
  
  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      // Correctly navigate to the subscription page
      navigate('/dashboard/student/subscription');
    }
  };
  
  const handleManageSubscription = () => {
    navigate('/dashboard/student/subscription');
  };
  
  // Default features for the free plan
  const defaultFeatures = [
    { title: "Study Planner", included: true },
    { title: "Limited Concept Cards", included: true },
    { title: "Basic Flashcards", included: true },
    { title: "3 Practice Tests / month", included: true },
    { title: "Unlimited AI Tutor", included: false },
    { title: "Advanced Study Analytics", included: false },
    { title: "Personalized Study Path", included: false },
    { title: "Unlimited Concept Cards", included: false }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Subscription Details</CardTitle>
              <CardDescription>Manage your subscription and billing</CardDescription>
            </div>
            <Badge variant={planDetails.isActive ? "default" : "outline"}>
              {planDetails.isActive ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">{planDetails.name}</h3>
                  {planDetails.expiryDate && (
                    <p className="text-sm text-gray-500">Expires: {new Date(planDetails.expiryDate).toLocaleDateString()}</p>
                  )}
                </div>
                <Button onClick={planDetails.isActive ? handleManageSubscription : handleUpgrade}>
                  {planDetails.isActive ? "Manage Plan" : "Upgrade"}
                </Button>
              </div>
            </div>
            
            {/* Donation note */}
            <div className="bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20 p-4 rounded-lg border border-pink-100 dark:border-pink-800/30 flex items-center gap-2">
              <Heart className="text-pink-500 h-5 w-5 flex-shrink-0" />
              <p className="text-sm">
                <span className="font-medium">Making a difference together:</span>{" "}
                We donate 5% of monthly subscription revenue to fund underprivileged students, providing them free access to our platform.
              </p>
            </div>

            <div>
              <h3 className="text-md font-medium mb-4">Plan Features</h3>
              <div className="grid gap-2">
                {(planDetails.features.length > 0 ? 
                  planDetails.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </div>
                  )) : 
                  defaultFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <span className="h-4 w-4 border border-gray-300 rounded-full mr-2" />
                      )}
                      <span className={feature.included ? "" : "text-gray-400"}>{feature.title}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Payment methods section */}
            <div>
              <h3 className="text-md font-medium mb-4">Payment Methods</h3>
              {userProfile.paymentMethods && userProfile.paymentMethods.length > 0 ? (
                <div className="space-y-3">
                  {userProfile.paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-3">
                        {method.type === 'card' ? (
                          <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
                        ) : (
                          <div className="w-10 h-6 bg-gradient-to-r from-green-500 to-teal-500 rounded"></div>
                        )}
                        <div>
                          <p className="font-medium">
                            {method.type === 'card' ? `${method.cardType} •••• ${method.lastFour}` : `UPI: ${method.upiId}`}
                          </p>
                          {method.type === 'card' && method.expiryDate && (
                            <p className="text-xs text-gray-500">Expires: {method.expiryDate}</p>
                          )}
                        </div>
                      </div>
                      {method.isDefault && (
                        <Badge variant="outline" className="text-xs">Default</Badge>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 border rounded-md">
                  <p className="text-gray-500">No payment methods added</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={handleManageSubscription}>
                    Add Payment Method
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View your past invoices and payments</CardDescription>
        </CardHeader>
        <CardContent>
          {userProfile.billingHistory && userProfile.billingHistory.length > 0 ? (
            <div className="space-y-4">
              {userProfile.billingHistory.map((bill, index) => (
                <div key={index} className="flex justify-between items-center p-3 border-b last:border-0">
                  <div>
                    <p className="font-medium">{bill.planName}</p>
                    <p className="text-sm text-gray-500">{new Date(bill.date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{bill.amount}</p>
                    <Badge variant={bill.status === 'paid' ? "success" : "outline"} className="text-xs">
                      {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-gray-500">No billing history available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionDetails;
