
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { UserProfileType } from "@/types/user/base";
import ProfileDetailsSection from "@/components/dashboard/student/profile/ProfileDetailsSection";
import ProfileBillingSection from "@/components/dashboard/student/profile/ProfileBillingSection";
import BatchManagementSection from "@/components/dashboard/student/BatchManagementSection";

interface ProfileDetailsProps {
  userProfile: UserProfileType;
  onUpdateProfile: (updates: Partial<UserProfileType>) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ userProfile, onUpdateProfile }) => {
  return (
    <Tabs defaultValue="details" className="w-full">
      <Card>
        <TabsList className="w-full border-b rounded-none grid grid-cols-3">
          <TabsTrigger value="details">Profile Details</TabsTrigger>
          <TabsTrigger value="billing">Billing & Plans</TabsTrigger>
          <TabsTrigger value="batch">Study Batch</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="p-4">
          <ProfileDetailsSection 
            userProfile={userProfile}
            onUpdateProfile={onUpdateProfile}
          />
        </TabsContent>
        
        <TabsContent value="billing" className="p-4">
          <ProfileBillingSection 
            userProfile={userProfile}
            onUpdateProfile={onUpdateProfile}
          />
        </TabsContent>
        
        <TabsContent value="batch" className="p-4">
          <BatchManagementSection 
            isLeader={userProfile.isGroupLeader || false}
            batchName={userProfile.batchName || ""}
            batchCode={userProfile.batchCode || ""}
          />
        </TabsContent>
      </Card>
    </Tabs>
  );
};

export default ProfileDetails;
