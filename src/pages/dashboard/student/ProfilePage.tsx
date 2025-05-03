
import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole } from "@/types/user/base";
import { useToast } from "@/hooks/use-toast";
import { VoiceAnnouncerProvider } from "@/components/dashboard/student/voice/VoiceAnnouncer";
import ProfileDetails from "@/components/dashboard/student/profile/ProfileDetails";
import { Card } from "@/components/ui/card";

const ProfilePageContent = () => {
  const { userProfile, loading, updateUserProfile } = useUserProfile();
  const { toast } = useToast();
  
  if (loading) {
    return (
      <div className="container py-12">
        <div className="flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your profile, subscription, and learning preferences
        </p>
      </div>
      
      <Card className="p-6">
        {userProfile && <ProfileDetails userProfile={userProfile} onUpdateProfile={updateUserProfile} />}
      </Card>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <MainLayout>
      <VoiceAnnouncerProvider>
        <ProfilePageContent />
      </VoiceAnnouncerProvider>
    </MainLayout>
  );
};

export default ProfilePage;
