
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { UserProfileType } from "@/types/user";
import { CreditCard, User, BookMarked, Edit, School } from "lucide-react";
import BatchManagement from "./BatchManagement";
import SubscriptionDetails from "./SubscriptionDetails";
import ProfileImageUpload from "./ProfileImageUpload";

interface ProfileDetailsProps {
  userProfile: UserProfileType;
  onUpdateProfile?: (updates: Partial<UserProfileType>) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  userProfile,
  onUpdateProfile
}) => {
  const [activeTab, setActiveTab] = useState("personal");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<string | undefined>(userProfile.avatar);

  const handleUpgradeSubscription = () => {
    navigate("/dashboard/student/subscription");
  };
  
  const handleImageUpload = (imageUrl: string) => {
    setProfileImage(imageUrl);
    // Save to localStorage for persistence
    localStorage.setItem('user_profile_image', imageUrl);
    
    if (onUpdateProfile) {
      onUpdateProfile({
        ...userProfile,
        avatar: imageUrl
      });
    }
    
    toast({
      title: "Success",
      description: "Profile image updated successfully",
    });
  };

  const renderPersonalInfo = () => {
    const personalInfo = [
      { label: "Name", value: userProfile.name },
      { label: "Email", value: userProfile.email },
      { label: "Phone", value: userProfile.phoneNumber || "Not provided" },
      { label: "Exam Preparation", value: userProfile.examPreparation || "Not specified" },
      { label: "Location", value: userProfile.location || "Not specified" },
      { label: "Grade", value: userProfile.grade || "Not specified" },
    ];

    const examGoal = userProfile?.examPreparation || (userProfile?.goals && userProfile.goals[0]?.title);

    return (
      <div className="space-y-6">
        <div className="flex flex-col items-center gap-6 md:flex-row">
          <div className="mx-auto md:mx-0">
            <ProfileImageUpload 
              currentImageUrl={profileImage || userProfile.avatar}
              userName={userProfile.name || "User"}
              onImageUpload={handleImageUpload}
            />
          </div>
          <div className="flex-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Your personal details and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {personalInfo.map((item, index) => (
                    <div key={index} className="grid grid-cols-3 items-center">
                      <span className="text-sm font-medium">{item.label}</span>
                      <span className="col-span-2 text-sm">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button variant="outline" size="sm" className="mt-4">
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <School className="h-5 w-5 text-purple-500" />
                <span>Exam Goal</span>
              </div>
              <Button variant="outline" size="sm" className="gap-1">
                <Edit className="h-3.5 w-3.5" />
                Change
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {examGoal ? (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-900/30">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <BookMarked className="h-5 w-5 text-purple-600" />
                      {examGoal}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Target Year: {userProfile?.goals?.[0]?.targetYear || "2025"}
                    </p>
                  </div>
                  
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" size="sm" className="flex-1 sm:flex-none">Switch Plan</Button>
                    <Button variant="default" size="sm" className="flex-1 sm:flex-none">New Plan</Button>
                  </div>
                </div>
                
                {userProfile?.goals?.[0]?.progress !== undefined && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span className="font-medium">{userProfile.goals[0].progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${userProfile.goals[0].progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No exam goal set</p>
                <Button>Set Exam Goal</Button>
              </div>
            )}
          </CardContent>
        </Card>

        <BatchManagement 
          hasSubscription={userProfile.subscription?.type === "group" || userProfile.subscription?.planType === "group"} 
        />
      </div>
    );
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-6">
      <TabsList className="grid grid-cols-2 w-full max-w-md">
        <TabsTrigger value="personal" className="flex gap-2 items-center">
          <User className="h-4 w-4" />
          <span>Personal</span>
        </TabsTrigger>
        <TabsTrigger value="subscription" className="flex gap-2 items-center">
          <CreditCard className="h-4 w-4" />
          <span>Subscription</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-6">
        {renderPersonalInfo()}
      </TabsContent>

      <TabsContent value="subscription" className="space-y-6">
        <SubscriptionDetails 
          userProfile={userProfile}
          onUpgrade={handleUpgradeSubscription}
        />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileDetails;
