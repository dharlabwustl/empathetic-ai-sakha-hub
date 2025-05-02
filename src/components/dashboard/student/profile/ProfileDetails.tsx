
import React, { useState, useRef } from "react";
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
import { CreditCard, User, Upload } from "lucide-react";
import BatchManagement from "./BatchManagement";
import SubscriptionDetails from "./SubscriptionDetails";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpgradeSubscription = () => {
    navigate("/dashboard/student/subscription");
  };

  const handleProfileImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size should be less than 2MB",
        variant: "destructive"
      });
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }
    
    // Create URL for preview and update profile
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      if (onUpdateProfile) {
        onUpdateProfile({
          ...userProfile,
          avatar: imageUrl
        });
        
        toast({
          title: "Success",
          description: "Profile picture updated successfully"
        });
      }
    };
    reader.readAsDataURL(file);
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
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-16 w-16 cursor-pointer border-2 border-primary" onClick={handleProfileImageClick}>
              <AvatarImage src={userProfile.avatar || ""} />
              <AvatarFallback>{userProfile.name?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 bg-primary text-white rounded-full p-1 cursor-pointer" onClick={handleProfileImageClick}>
              <Upload className="h-3 w-3" />
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{userProfile.name}</h2>
            <p className="text-muted-foreground">{userProfile.email}</p>
          </div>
        </div>

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
