
import React, { useState } from "react";
import { UserProfileType } from "@/types/user";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Book, Sparkles, Crown, CreditCard, School, Building, Users } from "lucide-react";
import BatchInvitationInput from "@/components/subscription/BatchInvitationInput";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscriptionPlans from "@/components/subscription/SubscriptionPlans";
import CheckoutPage from "@/components/subscription/CheckoutPage";
import BatchMemberUploader from "@/components/subscription/batch/BatchMemberUploader";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { SubscriptionPlan, SubscriptionType } from "@/types/user/base";

interface ProfileDetailsProps {
  userProfile: UserProfileType;
  onUpdateProfile: (updates: Partial<UserProfileType>) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ userProfile, onUpdateProfile }) => {
  const [name, setName] = useState(userProfile.name || "");
  const [bio, setBio] = useState(userProfile.bio || "");
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();
  
  // Checkout state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [isGroupPlan, setIsGroupPlan] = useState(false);
  const [invitedEmails, setInvitedEmails] = useState<string[]>([]);

  // Institutional plan dialog
  const [isInstitutionDialogOpen, setIsInstitutionDialogOpen] = useState(false);
  const [institutionType, setInstitutionType] = useState<"school" | "corporate" | null>(null);
  
  const handleSave = () => {
    onUpdateProfile({
      name,
      bio,
    });
    
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile details have been updated successfully.",
    });
  };

  const handleJoinBatch = async (code: string): Promise<void> => {
    try {
      // In a real app, this would make an API call to verify the code and join the batch
      console.log("Joining batch with code:", code);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update profile with batch info (mock)
      onUpdateProfile({
        subscription: {
          ...userProfile.subscription,
          batchCode: code,
          batchName: "Study Group",
        }
      });
      
      toast({
        title: "Success!",
        description: "You have successfully joined the batch.",
      });
    } catch (error) {
      console.error("Error joining batch:", error);
      toast({
        title: "Error",
        description: "Failed to join batch. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };
  
  const handleSelectPlan = (plan: SubscriptionPlan, isGroup: boolean = false) => {
    setSelectedPlan(plan);
    setIsGroupPlan(isGroup);
    setIsCheckoutOpen(true);
  };
  
  const handleCancelCheckout = () => {
    setIsCheckoutOpen(false);
    setSelectedPlan(null);
    setIsGroupPlan(false);
    setInvitedEmails([]);
  };
  
  const handleCheckoutSuccess = (plan: SubscriptionPlan, inviteCodes?: string[], emails?: string[]) => {
    setIsCheckoutOpen(false);
    
    // Update user profile with new subscription
    onUpdateProfile({
      subscription: {
        planId: plan.id,
        planType: plan.type,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        role: isGroupPlan || plan.type === SubscriptionType.School || plan.type === SubscriptionType.Corporate ? 'leader' : undefined,
        batchName: isGroupPlan ? 'Study Group' : 
                  plan.type === SubscriptionType.School ? 'School Batch' : 
                  plan.type === SubscriptionType.Corporate ? 'Corporate Batch' : undefined,
        batchCode: isGroupPlan || plan.type === SubscriptionType.School || plan.type === SubscriptionType.Corporate 
                  ? 'BATCH-' + Math.random().toString(36).substring(2, 8).toUpperCase() 
                  : undefined
      }
    });
    
    toast({
      title: "Subscription Activated",
      description: `Your ${plan.name} has been activated successfully.`,
    });
    
    // We'd also handle invite codes and emails here in a real implementation
    if ((isGroupPlan || plan.type === SubscriptionType.School || plan.type === SubscriptionType.Corporate) && inviteCodes && emails) {
      toast({
        title: "Batch Created",
        description: `Invitation codes have been sent to ${emails.length} members.`,
      });
    }
    
    setSelectedPlan(null);
    setIsGroupPlan(false);
    setInvitedEmails([]);
  };
  
  const handleOpenInstitutionDialog = (type: "school" | "corporate") => {
    setInstitutionType(type);
    setIsInstitutionDialogOpen(true);
  };
  
  const handleMemberUploadComplete = (emails: string[]) => {
    setInvitedEmails(emails);
    setIsInstitutionDialogOpen(false);
    
    // Find the appropriate plan based on institution type
    const planType = institutionType === "school" ? SubscriptionType.School : SubscriptionType.Corporate;
    const plan = institutionalPlans.find(p => p.type === planType);
    
    if (plan) {
      setSelectedPlan(plan);
      setIsGroupPlan(true);
      setIsCheckoutOpen(true);
      
      toast({
        title: "Proceeding to Checkout",
        description: `Setting up ${institutionType} plan for ${emails.length} members.`,
      });
    }
  };
  
  // Sample institutional plans
  const institutionalPlans: SubscriptionPlan[] = [
    {
      id: "school-basic",
      name: "School Basic",
      price: 4999,
      features: [
        "Access for up to 30 students",
        "Basic study materials",
        "Monthly progress reports",
        "Standard support",
        "Student activity tracking",
        "Teacher dashboard"
      ],
      type: SubscriptionType.School,
      maxMembers: 30
    },
    {
      id: "school-premium",
      name: "School Premium",
      price: 9999,
      features: [
        "Access for up to 100 students",
        "Premium study materials",
        "Weekly progress reports",
        "Priority support",
        "Advanced analytics",
        "Parent access",
        "Custom branding",
        "API integration"
      ],
      type: SubscriptionType.School,
      maxMembers: 100
    },
    {
      id: "corporate-basic",
      name: "Corporate Training",
      price: 14999,
      features: [
        "Access for up to 50 employees",
        "Custom training modules",
        "Detailed progress tracking",
        "Corporate branding",
        "Manager dashboards",
        "Regular reporting",
        "API integration",
        "Premium support"
      ],
      type: SubscriptionType.Corporate,
      maxMembers: 50
    }
  ];

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="batch">Study Batch</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Details</CardTitle>
              <CardDescription>
                Your personal information visible to others
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{userProfile.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Book className="h-5 w-5 text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Currently Studying</p>
                          <p className="font-medium">{userProfile.goals?.[0]?.title || "Not specified"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {userProfile.bio && (
                    <div className="pt-2">
                      <h3 className="text-lg font-medium mb-2">Bio</h3>
                      <p className="text-gray-700 dark:text-gray-300">{userProfile.bio}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-end">
                    <Button onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscription">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-violet-500" />
                    Current Plan
                  </CardTitle>
                  <CardDescription>
                    Manage your subscription and billing
                  </CardDescription>
                </div>
                <Badge variant="secondary">
                  {userProfile.subscription?.planType || "Free Trial"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {/* Individual Plans Section */}
                  <Card className="overflow-hidden">
                    <div className="h-1.5 bg-blue-500" />
                    <CardContent className="pt-4">
                      <div className="flex items-center mb-3">
                        <CreditCard className="h-5 w-5 text-blue-500 mr-2" />
                        <h3 className="text-lg font-medium">Individual Plans</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Standard subscription plans for individual students
                      </p>
                      <Button 
                        className="w-full"
                        variant="outline"
                        onClick={() => setActiveTab("subscription")}
                      >
                        View Plans
                      </Button>
                    </CardContent>
                  </Card>
                  
                  {/* School Plans Section */}
                  <Card className="overflow-hidden">
                    <div className="h-1.5 bg-green-500" />
                    <CardContent className="pt-4">
                      <div className="flex items-center mb-3">
                        <School className="h-5 w-5 text-green-500 mr-2" />
                        <h3 className="text-lg font-medium">School Plans</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Special plans for schools and educational institutions
                      </p>
                      <Button 
                        className="w-full"
                        variant="outline"
                        onClick={() => handleOpenInstitutionDialog("school")}
                      >
                        Get School Plan
                      </Button>
                    </CardContent>
                  </Card>
                  
                  {/* Corporate Plans Section */}
                  <Card className="overflow-hidden">
                    <div className="h-1.5 bg-amber-500" />
                    <CardContent className="pt-4">
                      <div className="flex items-center mb-3">
                        <Building className="h-5 w-5 text-amber-500 mr-2" />
                        <h3 className="text-lg font-medium">Corporate Plans</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Training solutions for businesses and organizations
                      </p>
                      <Button 
                        className="w-full"
                        variant="outline"
                        onClick={() => handleOpenInstitutionDialog("corporate")}
                      >
                        Get Corporate Plan
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                
                <SubscriptionPlans 
                  currentPlanId={userProfile.subscription?.planId || "free"}
                  onSelectPlan={handleSelectPlan}
                  showGroupOption={true}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="batch">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-amber-500" />
                    Study Batch
                  </CardTitle>
                  <CardDescription>
                    Join or create a study batch with friends or classmates
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {userProfile.subscription?.batchName ? (
                <div className="rounded-lg border p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-lg">{userProfile.subscription.batchName}</p>
                      <p className="text-sm text-muted-foreground">
                        You're currently part of this study batch
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => {}}>
                      Manage Batch
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <BatchInvitationInput onJoinBatch={handleJoinBatch} />
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-4">- OR -</p>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => setActiveTab("subscription")}
                    >
                      Create Your Own Batch
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Checkout Dialog */}
      {isCheckoutOpen && selectedPlan && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <CheckoutPage 
              selectedPlan={selectedPlan}
              onCancel={handleCancelCheckout}
              onSuccess={handleCheckoutSuccess}
              isGroupPlan={isGroupPlan}
              invitedEmails={invitedEmails}
            />
          </div>
        </div>
      )}
      
      {/* Institution Plan Dialog */}
      <Dialog open={isInstitutionDialogOpen} onOpenChange={setIsInstitutionDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <CardTitle className="mb-4 flex items-center gap-2">
            {institutionType === "school" ? (
              <>
                <School className="h-5 w-5 text-green-600" />
                School Plan Setup
              </>
            ) : (
              <>
                <Building className="h-5 w-5 text-amber-600" />
                Corporate Plan Setup
              </>
            )}
          </CardTitle>
          
          <div className="mb-4">
            <p className="text-muted-foreground mb-4">
              {institutionType === "school" 
                ? "Add student emails to create a school batch. You can add up to 100 students."
                : "Add employee emails to create a corporate training batch. You can add up to 50 employees."}
            </p>
            <BatchMemberUploader 
              onUploadComplete={handleMemberUploadComplete}
              maxMembers={institutionType === "school" ? 100 : 50}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileDetails;
