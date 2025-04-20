
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/student/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Check, CreditCard, Users, Calendar, ArrowRight } from "lucide-react";
import SubscriptionPlans from "@/components/subscription/SubscriptionPlans";
import { SubscriptionPlan } from "@/types/user";
import { useStudentDashboard } from "@/hooks/useStudentDashboard";
import DashboardLoading from "./DashboardLoading";

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { userProfile, loading } = useStudentDashboard();
  const [activePlan, setActivePlan] = useState<SubscriptionPlan | null>(null);
  const [activeTab, setActiveTab] = useState("current");
  const [showUpgradeOptions, setShowUpgradeOptions] = useState(false);
  
  // Get information from location state (if redirected from checkout/payment)
  const planUpdated = location.state?.planUpdated;
  const newPlan = location.state?.newPlan;
  const isGroup = location.state?.isGroup;
  const isGroupLeader = location.state?.isGroupLeader;
  const inviteCodes = location.state?.inviteCodes;
  const invitedEmails = location.state?.invitedEmails;
  
  // Format date for display
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  // Calculate next billing date (1 month from now)
  const getNextBillingDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    return formatDate(date.toISOString());
  };
  
  useEffect(() => {
    // If we have plan update information in location state, update the active plan
    if (planUpdated && newPlan) {
      setActivePlan(newPlan);
      
      // Show success toast
      toast({
        title: "Subscription Activated",
        description: `Your ${newPlan.name} plan has been successfully activated.`,
      });
      
      // Clear the location state to prevent showing the toast again on refresh
      window.history.replaceState({}, document.title, window.location.pathname);
    } else {
      // In a real app, fetch the active plan from the backend
      // For now, simulate having an active plan with the Basic plan
      // This would normally be fetched from the user profile data
      setActivePlan({
        id: "basic",
        name: "Basic Plan",
        description: "Access to core learning materials",
        price: 499,
        features: [
          "Access to core learning materials",
          "Practice question banks",
          "Basic progress tracking",
          "Community forum access",
        ],
        isPopular: false,
        maxMembers: isGroup ? 5 : undefined,
      });
    }
  }, [planUpdated, newPlan]);

  if (loading || !userProfile) {
    return <DashboardLoading />;
  }

  const handleUpgrade = (plan: SubscriptionPlan, isGroupPlan?: boolean) => {
    navigate("/checkout", {
      state: {
        selectedPlan: plan, 
        isGroup: isGroupPlan,
        userInfo: {
          name: userProfile.name,
          email: userProfile.email,
        }
      }
    });
  };

  const handleManageGroupMembers = () => {
    navigate("/dashboard/student/manage-group");
  };

  return (
    <DashboardLayout userProfile={userProfile}>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6">Subscription</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="current">Current Plan</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="upgrade">Upgrade</TabsTrigger>
          </TabsList>
          
          <TabsContent value="current">
            {activePlan ? (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Your Current Plan</CardTitle>
                        {isGroup && (
                          <p className="text-sm text-muted-foreground mt-1">Group Plan</p>
                        )}
                      </div>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        Active
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h2 className="text-2xl font-bold">{activePlan.name}</h2>
                        <p className="text-muted-foreground">{activePlan.description}</p>
                        
                        <div className="mt-4 flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">Next billing: {getNextBillingDate()}</span>
                        </div>
                        
                        {isGroup && isGroupLeader && (
                          <div className="mt-4">
                            <p className="text-sm font-medium mb-1">Group Members</p>
                            <p className="text-sm text-muted-foreground">
                              {invitedEmails ? invitedEmails.length + 1 : 1} of {activePlan.maxMembers} members
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div className="text-right">
                          <span className="text-2xl font-bold">₹{activePlan.price}</span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button onClick={() => setActiveTab("upgrade")} variant="outline">
                            Upgrade Plan
                          </Button>
                          {isGroup && isGroupLeader && (
                            <Button onClick={handleManageGroupMembers}>
                              Manage Group
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 border-t pt-4">
                      <p className="font-medium mb-2">Plan Features:</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {activePlan.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-green-600 mt-1" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                {isGroup && isGroupLeader && inviteCodes && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Invitation Codes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        Share these codes with your team members to join your group plan.
                      </p>
                      <div className="space-y-3">
                        {inviteCodes.map((code, index) => (
                          <div key={index} className="flex justify-between items-center bg-muted/30 p-3 rounded-md">
                            <div>
                              <p className="font-mono font-medium">{code}</p>
                              <p className="text-sm text-muted-foreground">{invitedEmails?.[index]}</p>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => {
                              navigator.clipboard.writeText(code);
                              toast({
                                title: "Code copied",
                                description: "Invitation code copied to clipboard",
                              });
                            }}>
                              Copy Code
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>No Active Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    You don't have an active subscription plan. Choose a plan to get started.
                  </p>
                  <Button onClick={() => setActiveTab("upgrade")}>
                    Choose a Plan
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                {activePlan ? (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium">Billing Information</h3>
                      <div className="bg-muted/50 p-4 rounded-md space-y-2">
                        <div className="flex justify-between">
                          <span>Current Plan</span>
                          <span className="font-medium">{activePlan.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly Cost</span>
                          <span className="font-medium">₹{activePlan.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Next Billing Date</span>
                          <span className="font-medium">{getNextBillingDate()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Payment Method</span>
                          <span className="font-medium">•••• 4242</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Recent Transactions</h3>
                      <div className="border rounded-md overflow-hidden">
                        <table className="min-w-full divide-y divide-border">
                          <thead className="bg-muted/50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Date
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Description
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Amount
                              </th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-background divide-y divide-border">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {formatDate(new Date().toISOString())}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                {activePlan.name} Subscription
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                ₹{activePlan.price}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                  Paid
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Button variant="outline">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Update Payment Method
                      </Button>
                      <Button variant="outline">
                        Download Invoices
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      No billing history available. Subscribe to a plan to view your billing information.
                    </p>
                    <Button onClick={() => setActiveTab("upgrade")}>
                      Choose a Plan
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="upgrade">
            <div className="space-y-6">
              {activePlan && (
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="text-lg font-medium">Current Plan: {activePlan.name}</h3>
                        <p className="text-muted-foreground">
                          You're currently on the {activePlan.name} (₹{activePlan.price}/month)
                        </p>
                      </div>
                      <Button variant="outline" onClick={() => setActiveTab("current")}>
                        View Plan Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              <div>
                <h2 className="text-2xl font-bold mb-2">Choose a Plan</h2>
                <p className="text-muted-foreground mb-6">
                  Select the plan that works best for your learning goals.
                </p>
                
                <Tabs defaultValue="individual">
                  <TabsList className="mb-6">
                    <TabsTrigger value="individual">Individual Plans</TabsTrigger>
                    <TabsTrigger value="group">Group Plans</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="individual">
                    <SubscriptionPlans 
                      currentPlanId={activePlan?.id} 
                      onSelectPlan={(plan) => handleUpgrade(plan)}
                      showGroupOption={false}
                    />
                  </TabsContent>
                  
                  <TabsContent value="group">
                    <SubscriptionPlans 
                      currentPlanId={activePlan?.id}
                      onSelectPlan={(plan) => handleUpgrade(plan, true)}
                      showGroupOption={true}
                      forceGroupPlans={true}
                    />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionPage;
