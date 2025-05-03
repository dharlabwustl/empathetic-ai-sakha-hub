
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import { CreditCard, User, Volume2 } from "lucide-react";
import BatchManagement from "./BatchManagement";
import SubscriptionDetails from "./SubscriptionDetails";
import ProfileImageUpload from "./ProfileImageUpload";
import VoiceSettingsTab from "../settings/VoiceSettingsTab";

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
  const location = useLocation();
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<string | undefined>(userProfile.avatar);

  // Check for voice tab in URL params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab === 'voice') {
      setActiveTab('voice');
    }
  }, [location]);

  const handleUpgradeSubscription = () => {
    navigate("/dashboard/student/subscription");
  };
  
  const handleImageUpload = (imageUrl: string) => {
    setProfileImage(imageUrl);
    if (onUpdateProfile) {
      onUpdateProfile({
        ...userProfile,
        avatar: imageUrl
      });
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    // Update URL when tab changes
    const searchParams = new URLSearchParams(location.search);
    if (value === 'voice') {
      searchParams.set('tab', 'voice');
    } else {
      searchParams.delete('tab');
    }
    
    navigate({
      pathname: location.pathname,
      search: searchParams.toString()
    }, { replace: true });
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

        <BatchManagement 
          hasSubscription={userProfile.subscription?.type === "group" || userProfile.subscription?.planType === "group"} 
        />
      </div>
    );
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full space-y-6">
      <TabsList className="grid grid-cols-3 w-full max-w-md">
        <TabsTrigger value="personal" className="flex gap-2 items-center">
          <User className="h-4 w-4" />
          <span>Personal</span>
        </TabsTrigger>
        <TabsTrigger value="subscription" className="flex gap-2 items-center">
          <CreditCard className="h-4 w-4" />
          <span>Subscription</span>
        </TabsTrigger>
        <TabsTrigger value="voice" className="flex gap-2 items-center">
          <Volume2 className="h-4 w-4" />
          <span>Voice Control</span>
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
      
      <TabsContent value="voice" className="space-y-6">
        <VoiceSettingsTab />
      </TabsContent>
    </Tabs>
  );
};

export default ProfileDetails;
