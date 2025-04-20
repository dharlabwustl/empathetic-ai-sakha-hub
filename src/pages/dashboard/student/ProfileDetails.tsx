import React, { useState, useEffect } from "react";
import { UserProfileType, UserSubscription, SubscriptionType, SubscriptionPlan } from "@/types/user";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Book, Sparkles, Crown, CreditCard, School, Building, Users, Briefcase, GraduationCap, CalendarDays, User } from "lucide-react";
import BatchInvitationInput from "@/components/subscription/BatchInvitationInput";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscriptionPlans from "@/components/subscription/SubscriptionPlans";
import CheckoutPage from "@/components/subscription/CheckoutPage";
import BatchMemberUploader from "@/components/subscription/batch/BatchMemberUploader";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BatchProfileSection from "@/components/subscription/batch/BatchProfileSection";

interface ProfileDetailsProps {
  userProfile: UserProfileType;
  onUpdateProfile: (updates: Partial<UserProfileType>) => void;
}

const ProfileDetailsEdit: React.FC<{
  userProfile: UserProfileType;
  onSave: (updatedProfile: Partial<UserProfileType>) => void;
  onCancel: () => void;
}> = ({ userProfile, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: userProfile.name || "",
    bio: userProfile.bio || "",
    phoneNumber: userProfile.phoneNumber || "",
    gender: userProfile.gender || "other",
    examPreparation: userProfile.examPreparation || "",
    education: {
      level: userProfile.education?.level || "",
      institution: userProfile.education?.institution || "",
      fieldOfStudy: userProfile.education?.fieldOfStudy || "",
      graduationYear: userProfile.education?.graduationYear || undefined
    },
    address: {
      street: userProfile.address?.street || "",
      city: userProfile.address?.city || "",
      state: userProfile.address?.state || "",
      zipCode: userProfile.address?.zipCode || "",
      country: userProfile.address?.country || "India"
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.includes(".")) {
      const [category, field] = name.split(".");
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...prev[category as "education" | "address"],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Select 
            value={formData.gender} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value as "male" | "female" | "other" }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="examPreparation">Exam Preparation</Label>
          <Input
            id="examPreparation"
            name="examPreparation"
            value={formData.examPreparation}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Tell us about yourself"
          rows={3}
        />
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Education</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="education.level">Education Level</Label>
            <Input
              id="education.level"
              name="education.level"
              value={formData.education.level}
              onChange={handleChange}
              placeholder="High School, Undergraduate, etc."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="education.institution">Institution</Label>
            <Input
              id="education.institution"
              name="education.institution"
              value={formData.education.institution}
              onChange={handleChange}
              placeholder="School or college name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="education.fieldOfStudy">Field of Study</Label>
            <Input
              id="education.fieldOfStudy"
              name="education.fieldOfStudy"
              value={formData.education.fieldOfStudy}
              onChange={handleChange}
              placeholder="Science, Arts, Commerce, etc."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="education.graduationYear">Graduation Year</Label>
            <Input
              id="education.graduationYear"
              name="education.graduationYear"
              type="number"
              value={formData.education.graduationYear || ""}
              onChange={handleChange}
              placeholder="YYYY"
            />
          </div>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-medium">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address.street">Street Address</Label>
            <Input
              id="address.street"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address.city">City</Label>
            <Input
              id="address.city"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address.state">State</Label>
            <Input
              id="address.state"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address.zipCode">ZIP/Postal Code</Label>
            <Input
              id="address.zipCode"
              name="address.zipCode"
              value={formData.address.zipCode}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address.country">Country</Label>
            <Input
              id="address.country"
              name="address.country"
              value={formData.address.country}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

const ProfileReadView: React.FC<{
  userProfile: UserProfileType;
  onEdit: () => void;
}> = ({ userProfile, onEdit }) => {
  return (
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
            <Phone className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{userProfile.phoneNumber || "Not provided"}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <User className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Gender</p>
              <p className="font-medium">{userProfile.gender ? userProfile.gender.charAt(0).toUpperCase() + userProfile.gender.slice(1) : "Not provided"}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Book className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Currently Studying</p>
              <p className="font-medium">{userProfile.examPreparation || userProfile.goals?.[0]?.title || "Not specified"}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <CalendarDays className="h-5 w-5 text-gray-400 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Joined</p>
              <p className="font-medium">{userProfile.joinDate ? new Date(userProfile.joinDate).toLocaleDateString() : "Recently"}</p>
            </div>
          </div>
        </div>
      </div>
      
      {userProfile.education && (
        <div>
          <h3 className="text-lg font-medium">Education</h3>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div className="flex items-center">
              <GraduationCap className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Education Level</p>
                <p className="font-medium">{userProfile.education.level || "Not provided"}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Institution</p>
                <p className="font-medium">{userProfile.education.institution || "Not provided"}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Book className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Field of Study</p>
                <p className="font-medium">{userProfile.education.fieldOfStudy || "Not provided"}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <CalendarDays className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Graduation Year</p>
                <p className="font-medium">{userProfile.education.graduationYear || "Not provided"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {userProfile.address && (
        <div>
          <h3 className="text-lg font-medium">Address</h3>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div className="flex items-center md:col-span-2">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Street Address</p>
                <p className="font-medium">{userProfile.address.street || "Not provided"}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="font-medium">{userProfile.address.city || "Not provided"}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">State</p>
                <p className="font-medium">{userProfile.address.state || "Not provided"}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">ZIP/Postal Code</p>
                <p className="font-medium">{userProfile.address.zipCode || "Not provided"}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Country</p>
                <p className="font-medium">{userProfile.address.country || "Not provided"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {userProfile.bio && (
        <div className="pt-2">
          <h3 className="text-lg font-medium mb-2">Bio</h3>
          <p className="text-gray-700 dark:text-gray-300">{userProfile.bio}</p>
        </div>
      )}
      
      <div className="flex justify-end">
        <Button onClick={onEdit}>
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ userProfile, onUpdateProfile }) => {
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
  
  // Mock batches for batch management
  const [userBatches, setUserBatches] = useState<any[]>([]);
  
  // Get current subscription details
  const getCurrentSubscription = () => {
    if (!userProfile.subscription) {
      return { planType: SubscriptionType.Free };
    }
    
    if (typeof userProfile.subscription === 'object') {
      return userProfile.subscription;
    }
    
    return { planType: userProfile.subscription };
  };
  
  const handleSave = (updatedProfile: Partial<UserProfileType>) => {
    onUpdateProfile(updatedProfile);
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
      
      // Get current subscription
      const currentSubscription = getCurrentSubscription();
      
      // Update profile with batch info (mock)
      onUpdateProfile({
        subscription: {
          ...(typeof userProfile.subscription === 'object' ? userProfile.subscription : { planType: userProfile.subscription || SubscriptionType.Free }),
          batchCode: code,
          batchName: "Study Group",
          role: "member"
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
    
    // Create a new UserSubscription object
    const newSubscription: UserSubscription = {
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
    };
    
    // Update user profile with new subscription
    onUpdateProfile({
      subscription: newSubscription
    });
    
    // Create a mock batch if this is a group plan
    if (isGroupPlan || plan.type === SubscriptionType.School || plan.type === SubscriptionType.Corporate) {
      const newBatch = {
        id: Math.random().toString(36).substring(2, 9),
        name: newSubscription.batchName || "New Batch",
        createdAt: new Date().toISOString(),
        expiryDate: newSubscription.endDate,
        owner: {
          id: userProfile.id,
          name: userProfile.name,
          email: userProfile.email,
          role: "leader" as "leader" | "member" | "school_admin" | "corporate_admin",
          status: "active" as "active" | "pending" | "inactive"
        },
        members: [
          {
            id: userProfile.id,
            name: userProfile.name,
            email: userProfile.email,
            role: "leader" as "leader" | "member" | "school_admin" | "corporate_admin",
            status: "active" as "active" | "pending" | "inactive"
          }
        ],
        maxMembers: plan.maxMembers || 5,
        planType: isGroupPlan ? "group" : plan.type === SubscriptionType.School ? "school" : "corporate"
      };
      
      setUserBatches([...userBatches, newBatch]);
    }
    
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
      
      // Switch to batch tab after successful group plan purchase
      setActiveTab("batch");
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
  
  const handleInviteMembers = (emails: string[]) => {
    // In a real app, this would send invitations to these emails
    toast({
      title: "Invitations Sent",
      description: `${emails.length} members have been invited to join your batch.`,
    });
    
    // For mock purposes, add these as pending members to the first batch
    if (userBatches.length > 0) {
      const updatedBatches = [...userBatches];
      const firstBatch = {...updatedBatches[0]};
      
      emails.forEach(email => {
        firstBatch.members.push({
          id: Math.random().toString(36).substring(2, 9),
          name: email.split('@')[0],
          email,
          role: "member",
          status: "pending",
          invitationCode: "INV-" + Math.random().toString(36).substring(2, 8).toUpperCase()
        });
      });
      
      updatedBatches[0] = firstBatch;
      setUserBatches(updatedBatches);
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

  // Add dummy batch data for demonstration
  const dummyBatch = {
    id: "demo-batch-1",
    name: "Demo Study Group",
    members: [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "leader" as "leader",
        status: "active" as "active",
        progress: {
          completedTopics: 45,
          totalTopics: 60,
          lastActiveDate: new Date().toISOString()
        }
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "member" as "member",
        status: "active" as "active",
        progress: {
          completedTopics: 30,
          totalTopics: 60,
          lastActiveDate: new Date().toISOString()
        }
      }
    ],
    maxMembers: 5,
    activeMembersCount: 2,
    batchCode: "DEMO123",
    planType: "group" as "group"
  };

  // Initialize userBatches with dummy batch if none exist
  useEffect(() => {
    if (userBatches.length === 0) {
      setUserBatches([dummyBatch]);
    }
  }, []);

  const currentSubscription = getCurrentSubscription();
  const hasBatchManagement = 
    (typeof userProfile.subscription === 'object' && 
    (userProfile.subscription.role === 'leader' || 
     userProfile.subscription.role === 'school_admin' || 
     userProfile.subscription.role === 'corporate_admin'));

  // Show dummy batch data in the batch tab
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
                <ProfileDetailsEdit 
                  userProfile={userProfile} 
                  onSave={handleSave}
                  onCancel={() => setIsEditing(false)}
                />
              ) : (
                <ProfileReadView 
                  userProfile={userProfile} 
                  onEdit={() => setIsEditing(true)}
                />
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
                  {currentSubscription.planType}
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
                        <User className="h-5 w-5 text-blue-500 mr-2" />
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
                  currentPlanId={typeof userProfile.subscription === 'object' ? userProfile.subscription.planId : 'free'}
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
                    <Users className="h-5 w-5 text-amber-500" />
                    Study Batch
                  </CardTitle>
                  <CardDescription>
                    Manage your study batch and track member progress
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <BatchProfileSection
                userBatches={userBatches}
                onInviteMembers={handleInviteMembers}
              />
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
          <div className="py-4">
            <BatchMemberUploader 
              onUploadComplete={handleMemberUploadComplete}
              maxMembers={institutionType === "school" ? 100 : 50}
              title={`Add ${institutionType === "school" ? "Students" : "Employees"}`}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileDetails;
