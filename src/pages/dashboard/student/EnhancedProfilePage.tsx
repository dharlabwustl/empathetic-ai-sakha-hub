
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { 
  User, Settings, CreditCard, Users, BookOpen, 
  GraduationCap, Calendar, Bell, Shield, Edit
} from "lucide-react";
import { UserRole } from "@/types/user/base";
import ProfileDetails from "@/pages/dashboard/student/ProfileDetails";
import BatchManagementContent from "@/components/subscription/batch/BatchManagementContent";
import SettingsTabContent from "@/components/dashboard/student/SettingsTabContent";
import InviteCodeForm from "@/components/subscription/batch/InviteCodeForm";
import SubscriptionPlans from "@/components/subscription/SubscriptionPlans";
import { SubscriptionPlan } from "@/types/user/base";

const EnhancedProfilePage = () => {
  const navigate = useNavigate();
  const { userProfile, loading, updateUserProfile } = useUserProfile();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Sample KPI data - these would come from actual user data in a real app
  const kpiData = [
    { title: "Study Hours", value: "24h", change: "+3h", trend: "up" },
    { title: "Concepts Mastered", value: "42", change: "+5", trend: "up" },
    { title: "Quiz Score Avg.", value: "82%", change: "+2%", trend: "up" },
    { title: "Days Streak", value: "7", change: "0", trend: "neutral" }
  ];
  
  // Handle profile image upload
  const handleUploadImage = (file: File) => {
    try {
      // In a real app, this would upload the file to a server
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
  
  // Handle invite code redemption
  const handleRedeemInvite = async (code: string) => {
    try {
      // Show processing toast
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
  
  // Check if user is a batch leader or member
  const isBatchLeader = () => {
    if (!userProfile || !userProfile.subscription) return false;
    
    if (typeof userProfile.subscription === 'object') {
      return userProfile.subscription.features?.includes('batch_leader');
    }
    
    return false;
  };
  
  const isBatchMember = () => {
    if (!userProfile || !userProfile.subscription) return false;
    
    if (typeof userProfile.subscription === 'object') {
      return userProfile.subscription.features?.includes('batch_member') &&
             !userProfile.subscription.features?.includes('batch_leader');
    }
    
    return false;
  };
  
  const getCurrentSubscriptionType = () => {
    if (!userProfile || !userProfile.subscription) return 'free';
    
    if (typeof userProfile.subscription === 'object') {
      return userProfile.subscription.planType;
    }
    
    return userProfile.subscription;
  };
  
  const handleSelectPlan = (plan: SubscriptionPlan) => {
    toast({
      title: "Subscription Selected",
      description: `You've selected the ${plan.name} plan. Redirecting to checkout...`,
    });
    
    // In a real app, this would redirect to a checkout page
    setTimeout(() => {
      navigate('/dashboard/student/subscription');
    }, 1500);
  };
  
  const handleCreateBatch = () => {
    navigate('/dashboard/student/batch');
  };
  
  const handleManageSubscription = () => {
    navigate('/dashboard/student/subscription');
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="container py-12">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-500 dark:text-gray-400">Loading profile...</p>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="container py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile, subscription, and learning preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            {/* Profile Card */}
            <Card className="overflow-hidden">
              <div className="h-24 bg-gradient-to-r from-violet-500 to-purple-500"></div>
              <CardContent className="pt-0 relative">
                <div className="absolute -top-12 left-4 border-4 border-background rounded-full">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userProfile?.avatar} alt={userProfile?.name || 'Profile'} />
                    <AvatarFallback className="text-2xl bg-primary/20">
                      {userProfile?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  {/* Edit button overlay */}
                  <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1.5">
                    <Edit className="h-4 w-4 text-white" />
                  </div>
                </div>
                
                <div className="mt-14 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{userProfile?.name || 'Student'}</h3>
                      <p className="text-muted-foreground text-sm">{userProfile?.email}</p>
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {getCurrentSubscriptionType()}
                    </Badge>
                  </div>
                  
                  {userProfile?.goals && userProfile.goals.length > 0 && (
                    <div className="pt-2">
                      <p className="text-sm text-muted-foreground">Exam Goal</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-medium">{userProfile.goals[0].title}</span>
                        <span className="text-sm text-primary">{userProfile.goals[0].progress}% complete</span>
                      </div>
                      <Progress value={userProfile.goals[0].progress} className="h-1.5 mt-1.5" />
                    </div>
                  )}
                  
                  <div className="pt-2 flex items-center gap-2">
                    {userProfile?.examPreparation && (
                      <Badge variant="outline" className="py-1">
                        {userProfile.examPreparation}
                      </Badge>
                    )}
                    {userProfile?.personalityType && (
                      <Badge variant="outline" className="py-1">
                        {userProfile.personalityType}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Learning Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {kpiData.map((kpi, index) => (
                    <div key={index} className="p-3 bg-primary/5 rounded-lg">
                      <div className="text-xs text-muted-foreground">{kpi.title}</div>
                      <div className="text-lg font-semibold mt-1">{kpi.value}</div>
                      <div className={`text-xs flex items-center mt-1 ${
                        kpi.trend === 'up' ? 'text-green-600' : 
                        kpi.trend === 'down' ? 'text-red-600' : 
                        'text-muted-foreground'
                      }`}>
                        {kpi.change}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Invitation Section */}
            {!isBatchLeader() && !isBatchMember() && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Got an Invite?</CardTitle>
                  <CardDescription>
                    Join a batch or create your own to study with peers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <InviteCodeForm onSubmit={handleRedeemInvite} />
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-8 xl:col-span-9">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <Card>
                <TabsList className="w-full border-b rounded-none grid grid-cols-5">
                  <TabsTrigger value="overview" className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    <span>Overview</span>
                  </TabsTrigger>
                  <TabsTrigger value="details" className="flex items-center gap-1.5">
                    <GraduationCap className="h-4 w-4" />
                    <span>Details</span>
                  </TabsTrigger>
                  <TabsTrigger value="subscription" className="flex items-center gap-1.5">
                    <CreditCard className="h-4 w-4" />
                    <span>Subscription</span>
                  </TabsTrigger>
                  <TabsTrigger value="batch" className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span>Batch</span>
                    {(isBatchLeader() || isBatchMember()) && (
                      <span className="ml-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center gap-1.5">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </TabsTrigger>
                </TabsList>
                
                {/* Overview Tab */}
                <TabsContent value="overview" className="p-6">
                  <div className="space-y-8">
                    {/* Learning Summary */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Learning Summary</h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="bg-violet-100 dark:bg-violet-900/30 p-2 rounded-full">
                                  <BookOpen className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                                </div>
                                <h3 className="font-medium">Concepts</h3>
                              </div>
                              <Badge variant="outline">42/100</Badge>
                            </div>
                            <Progress value={42} className="h-1.5 mt-4" />
                            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                              <span>42% mastered</span>
                              <span>Last studied: Today</span>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                                  <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                </div>
                                <h3 className="font-medium">Study Plan</h3>
                              </div>
                              <Badge variant="outline">9 days</Badge>
                            </div>
                            <Progress value={65} className="h-1.5 mt-4" />
                            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                              <span>65% on track</span>
                              <span>Next: Physics</span>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card>
                          <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-2 rounded-full">
                                  <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <h3 className="font-medium">Test Scores</h3>
                              </div>
                              <Badge variant="outline">82%</Badge>
                            </div>
                            <Progress value={82} className="h-1.5 mt-4" />
                            <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                              <span>12 tests taken</span>
                              <span>+3% improvement</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    {/* Upcoming Sessions */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Upcoming Study Sessions</h2>
                        <Button variant="outline" size="sm" onClick={() => navigate('/dashboard/student/studyplan')}>
                          View Full Plan
                        </Button>
                      </div>
                      <Card>
                        <CardContent className="py-4">
                          <div className="space-y-4">
                            {/* Study Session Items */}
                            <div className="flex items-start gap-4 p-3 bg-violet-50 dark:bg-violet-900/10 rounded-lg">
                              <div className="bg-white dark:bg-slate-800 rounded-md p-2 shadow-sm">
                                <div className="text-xs text-center text-muted-foreground">APR</div>
                                <div className="text-lg font-bold text-center">28</div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">Physics - Wave Mechanics</h4>
                                <div className="text-sm text-muted-foreground mt-1">
                                  <span>3:00 PM • 60 minutes • High priority</span>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">Reschedule</Button>
                            </div>
                            
                            <div className="flex items-start gap-4 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg">
                              <div className="bg-white dark:bg-slate-800 rounded-md p-2 shadow-sm">
                                <div className="text-xs text-center text-muted-foreground">APR</div>
                                <div className="text-lg font-bold text-center">29</div>
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium">Chemistry - Organic Chemistry</h4>
                                <div className="text-sm text-muted-foreground mt-1">
                                  <span>10:00 AM • 45 minutes • Medium priority</span>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">Reschedule</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Recent Activity */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                      <Card>
                        <CardContent className="py-4">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3 pb-3 border-b">
                              <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                                <BookOpen className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                              </div>
                              <div>
                                <p className="font-medium">Completed Concept: Kinematics</p>
                                <p className="text-xs text-muted-foreground">Today at 2:30 PM</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 pb-3 border-b">
                              <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                                <Shield className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                              </div>
                              <div>
                                <p className="font-medium">Scored 85% on Chemistry Quiz</p>
                                <p className="text-xs text-muted-foreground">Yesterday at 5:15 PM</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                                <Bell className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                              </div>
                              <div>
                                <p className="font-medium">Created study reminder</p>
                                <p className="text-xs text-muted-foreground">Apr 26 at 9:20 AM</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Profile Details Tab */}
                <TabsContent value="details" className="p-6">
                  {userProfile && (
                    <ProfileDetails userProfile={userProfile} onUpdateProfile={updateUserProfile} />
                  )}
                </TabsContent>
                
                {/* Subscription Tab */}
                <TabsContent value="subscription" className="p-6">
                  <div className="space-y-8">
                    {/* Current Plan Summary */}
                    <Card className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 border-none">
                      <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <h3 className="text-xl font-semibold flex items-center gap-2">
                              <CreditCard className="h-5 w-5 text-violet-600" />
                              {getCurrentSubscriptionType() === 'free' ? 'Free Plan' : `${getCurrentSubscriptionType()} Plan`}
                            </h3>
                            <p className="text-muted-foreground mt-1">
                              {getCurrentSubscriptionType() === 'free' 
                                ? 'Upgrade to unlock premium features and accelerate your learning' 
                                : 'Your subscription is active and renews monthly'}
                            </p>
                          </div>
                          <Button size="sm" onClick={handleManageSubscription}>
                            {getCurrentSubscriptionType() === 'free' ? 'Upgrade Plan' : 'Manage Subscription'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Available Plans */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Available Plans</h3>
                      <SubscriptionPlans 
                        currentPlanId={typeof userProfile?.subscription === 'object' ? userProfile.subscription.planId : 'free'}
                        onSelectPlan={handleSelectPlan}
                        showGroupOption={true}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                {/* Batch Management Tab */}
                <TabsContent value="batch" className="p-6">
                  {(isBatchLeader() || isBatchMember()) ? (
                    userProfile && <BatchManagementContent 
                      isLeader={isBatchLeader()} 
                      userProfile={userProfile}
                    />
                  ) : (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                        <Users size={28} />
                      </div>
                      <h2 className="text-xl font-bold mb-2">No Batch Membership</h2>
                      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                        You're not part of any batch yet. Join a batch to study with peers and get access to group features.
                      </p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => setActiveTab("subscription")}
                        >
                          View Subscription Plans
                        </Button>
                        <Button onClick={handleCreateBatch}>
                          Create Your Batch
                        </Button>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                {/* Settings Tab */}
                <TabsContent value="settings" className="p-6">
                  <SettingsTabContent />
                </TabsContent>
              </Card>
            </Tabs>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EnhancedProfilePage;
