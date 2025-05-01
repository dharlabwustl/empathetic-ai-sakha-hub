
import React from "react";
import { UserProfileType } from "@/types/user";
import ProfileDetails from "@/components/dashboard/student/profile/ProfileDetails";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole } from "@/types/user/base";
import { SharedPageLayout } from "@/components/dashboard/student/SharedPageLayout";
import LoadingScreen from "@/components/common/LoadingScreen";

const StudentProfile = () => {
  const { userProfile, loading } = useUserProfile(UserRole.Student);
  
  if (loading || !userProfile) {
    return <LoadingScreen />;
  }
  
  const handleUpdateProfile = (updates: Partial<UserProfileType>) => {
    // In a real app, this would send the updates to the server
    console.log("Profile updates:", updates);
  };

  return (
    <SharedPageLayout
      title="My Profile"
      subtitle="Manage your personal information and preferences"
      activeTab="profile"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <ProfileDetails
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
      />
    </SharedPageLayout>
  );
};

export default StudentProfile;
