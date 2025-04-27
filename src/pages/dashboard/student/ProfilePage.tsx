
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRole } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import SettingsTabContent from "@/components/dashboard/student/SettingsTabContent";
import BatchManagementContent from "@/components/subscription/batch/BatchManagementContent";
import InviteCodeForm from "@/components/subscription/batch/InviteCodeForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

// Import the enhanced profile components
import EnhancedProfileCard from "@/components/dashboard/student/profile/EnhancedProfileCard";
import SubscriptionDetailsCard from "@/components/dashboard/student/profile/SubscriptionDetailsCard";
import BatchManagementPanel from "@/components/dashboard/student/profile/BatchManagementPanel"; 
import ProfileBillingCard from "@/components/dashboard/student/profile/ProfileBillingCard";

const ProfilePage = () => {
  const { userProfile, loading, updateUserProfile } = useUserProfile();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleUploadImage = (file: File) => {
    try {
      // In a real app, we would upload the file to a server
      // For now, we'll use a local URL and update the user profile
      const imageUrl = URL.createObjectURL(file);
      
      if (userProfile) {
        updateUserProfile({
          avatar: imageUrl
        });
      }
      
      toast({
        title: "Success",
        description: "Your profile image has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile image. Please try again.",
        variant: "destructive",
      });
      console.error("Error uploading image:", error);
    }
  };

  const handleRedeemInvite = async (code: string) => {
    try {
      // In a real app, this would call an API to verify the code and update subscription
      toast({
        title: "Processing",
        description: "Verifying your invite code...",
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful redemption
      if (code.startsWith("SAKHA-") || code.startsWith("BATCH-")) {
        toast({
          title: "Success!",
          description: "You have been added to the batch successfully!",
        });
        
        // Update user profile with new subscription info
        if (userProfile) {
          updateUserProfile({
            subscription: {
              planType: UserRole.Student === userProfile.role ? 'premium' : 'basic',
              isActive: true,
              startDate: new Date().toISOString(),
              expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
              features: ["group", "batch_member"]
            }
          });
        }
        
        setActiveTab("batch");
        return true;
      } else {
        toast({
          title: "Invalid Code",
          description: "The invite code you entered is invalid or expired.",
          variant: "destructive",
        });
        return false;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to redeem invite code. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  // Handle subscription management
  const handleUpgradeSubscription = () => {
    // In a real app, this would navigate to the checkout page or open a checkout modal
    window.location.href = "/dashboard/student/subscription";
  };
  
  // Handle payment method management
  const handleManagePaymentMethods = () => {
    // In a real app, this would navigate to a payment method management page
    toast({
      title: "Payment Methods",
      description: "Opening payment method management interface...",
    });
  };

  // Check if user is a batch leader
  const isBatchLeader = () => {
    if (!userProfile || !userProfile.subscription) return false;
    
    if (typeof userProfile.subscription === 'object') {
      return userProfile.subscription.features?.includes('batch_leader');
    }
    
    return false;
  };

  // Check if user is a batch member (but not a leader)
  const isBatchMember = () => {
    if (!userProfile || !userProfile.subscription) return false;
    
    if (typeof userProfile.subscription === 'object') {
      return userProfile.subscription.features?.includes('batch_member') &&
             !userProfile.subscription.features?.includes('batch_leader');
    }
    
    return false;
  };

  return (
    <MainLayout>
      <div className="container py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-500 dark:text-gray-400">Loading profile...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-6">
              {/* Enhanced Profile Card */}
              {userProfile && (
                <EnhancedProfileCard 
                  profile={userProfile} 
                  onUploadImage={handleUploadImage}
                />
              )}
              
              {/* Subscription Details Card */}
              {userProfile && userProfile.subscription && (
                <SubscriptionDetailsCard
                  planType={isBatchLeader() ? "batch_leader" : isBatchMember() ? "group" : "individual"}
                  planName={typeof userProfile.subscription === 'object' 
                    ? userProfile.subscription.planType.charAt(0).toUpperCase() + userProfile.subscription.planType.slice(1)
                    : userProfile.subscription.charAt(0).toUpperCase() + userProfile.subscription.slice(1)}
                  isActive={typeof userProfile.subscription === 'object' ? userProfile.subscription.isActive : true}
                  startDate={typeof userProfile.subscription === 'object' ? userProfile.subscription.startDate : new Date().toISOString()}
                  endDate={typeof userProfile.subscription === 'object' ? (userProfile.subscription.expiryDate || userProfile.subscription.endDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()}
                  daysRemaining={30} // In a real app, calculate this from endDate
                  benefits={[]}
                  onUpgrade={handleUpgradeSubscription}
                />
              )}
              
              {/* Invite Code Redemption Section */}
              {!isBatchLeader() && !isBatchMember() && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Got an Invite Code?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <InviteCodeForm onSubmit={handleRedeemInvite} />
                  </CardContent>
                </Card>
              )}
            </div>
            
            <div className="md:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <Card>
                  <TabsList className="w-full border-b rounded-none grid grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="batch">
                      Batch
                      {(isBatchLeader() || isBatchMember()) && (
                        <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-800">
                          {isBatchLeader() ? 'Leader' : 'Member'}
                        </Badge>
                      )}
                    </TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="p-4">
                    <div className="space-y-6">
                      {/* Overview Tab Content */}
                      <div>
                        <h2 className="text-xl font-medium mb-4">Profile Overview</h2>
                        {userProfile && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                  Learning Progress
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Overall Completion</span>
                                      <span className="font-medium">68%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full">
                                      <div className="h-full bg-blue-500 rounded-full" style={{ width: "68%" }}></div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Study Streak</span>
                                      <span className="font-medium">12 days</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full">
                                      <div className="h-full bg-green-500 rounded-full" style={{ width: "80%" }}></div>
                                    </div>
                                  </div>
                                  
                                  <div>
                                    <div className="flex justify-between text-sm mb-1">
                                      <span>Quiz Accuracy</span>
                                      <span className="font-medium">76%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full">
                                      <div className="h-full bg-amber-500 rounded-full" style={{ width: "76%" }}></div>
                                    </div>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardHeader className="pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                  Recent Activity
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                    <span className="text-sm">Completed Physics Quiz</span>
                                    <span className="text-xs text-muted-foreground ml-auto">2 hours ago</span>
                                  </div>
                                  
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                    <span className="text-sm">Studied Organic Chemistry</span>
                                    <span className="text-xs text-muted-foreground ml-auto">Yesterday</span>
                                  </div>
                                  
                                  <div className="flex items-center">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                                    <span className="text-sm">Created new flashcards</span>
                                    <span className="text-xs text-muted-foreground ml-auto">3 days ago</span>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="settings" className="p-4">
                    <SettingsTabContent />
                  </TabsContent>
                  
                  <TabsContent value="batch" className="p-4">
                    {(isBatchLeader() || isBatchMember()) ? (
                      <BatchManagementPanel 
                        isBatchLeader={isBatchLeader()}
                        maxMembers={5} // In a real app, get this from subscription details
                      />
                    ) : (
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                          <AlertCircle size={28} />
                        </div>
                        <h2 className="text-xl font-bold mb-2">No Batch Membership</h2>
                        <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                          You're not part of any batch yet. Join a batch to study with peers and get access to group features.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                          <Button 
                            variant="outline" 
                            onClick={() => setActiveTab("overview")}
                          >
                            Return to Profile
                          </Button>
                          <Button onClick={() => document.getElementById('invite-code-input')?.focus()}>
                            Enter Invite Code
                          </Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="billing" className="p-4">
                    <ProfileBillingCard
                      onManagePaymentMethods={handleManagePaymentMethods}
                    />
                  </TabsContent>
                </Card>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
