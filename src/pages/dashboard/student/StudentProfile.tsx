
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { UserProfileType } from "@/types/user";
import ProfileDetails from "@/components/dashboard/student/profile/ProfileDetails";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole } from "@/types/user/base";
import { SharedPageLayout } from "@/components/dashboard/student/SharedPageLayout";
import LoadingScreen from "@/components/common/LoadingScreen";
import { VoiceAnnouncerProvider } from "@/components/dashboard/student/voice/VoiceAnnouncer";

interface StudentProfileProps {
  userProfile?: UserProfileType;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ userProfile: propUserProfile }) => {
  const { userProfile: hookUserProfile, loading } = useUserProfile(UserRole.Student);
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("My Profile");
  const [pageSubtitle, setPageSubtitle] = useState("Manage your personal information and preferences");
  
  // Use the provided userProfile if available, otherwise use the one from the hook
  const userProfile = propUserProfile || hookUserProfile;
  
  // Update page title based on active tab
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    
    if (tab === 'voice') {
      setPageTitle("Voice Control Settings");
      setPageSubtitle("Customize your AI voice announcer preferences");
    } else {
      setPageTitle("My Profile");
      setPageSubtitle("Manage your personal information and preferences");
    }
  }, [location]);
  
  if (loading || !userProfile) {
    return <LoadingScreen />;
  }
  
  const handleUpdateProfile = (updates: Partial<UserProfileType>) => {
    // In a real app, this would send the updates to the server
    console.log("Profile updates:", updates);
  };

  return (
    <VoiceAnnouncerProvider>
      <SharedPageLayout
        title={pageTitle}
        subtitle={pageSubtitle}
        activeTab="profile"
        showBackButton={true}
        backButtonUrl="/dashboard/student"
      >
        <ProfileDetails
          userProfile={userProfile}
          onUpdateProfile={handleUpdateProfile}
        />
      </SharedPageLayout>
    </VoiceAnnouncerProvider>
  );
};

export default StudentProfile;
