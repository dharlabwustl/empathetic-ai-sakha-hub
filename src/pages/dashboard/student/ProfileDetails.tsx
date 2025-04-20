
import React, { useState } from "react";
import { UserProfileType } from "@/types/user";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Book, Sparkles, Crown, CreditCard } from "lucide-react";
import BatchInvitationInput from "@/components/subscription/BatchInvitationInput";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscriptionPlans from "@/components/subscription/SubscriptionPlans";

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
    }
  };

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
                <SubscriptionPlans 
                  currentPlanId={userProfile.subscription?.planId || "free"} 
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
    </div>
  );
};

export default ProfileDetails;
