
import React, { useState, useEffect } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole } from "@/types/user/base";
import { useToast } from "@/hooks/use-toast";
import { VoiceAnnouncerProvider } from "@/components/dashboard/student/voice/VoiceAnnouncer";
import ProfileDetails from "@/components/dashboard/student/profile/ProfileDetails";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import VoiceSettingsTab from "@/components/dashboard/student/settings/VoiceSettingsTab";
import { useSearchParams } from "react-router-dom";

const ProfilePageContent = () => {
  const { userProfile, loading, updateUserProfile } = useUserProfile();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'profile';
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  useEffect(() => {
    // Update active tab when URL search params change
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);
  
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
          Manage your profile, subscription, learning preferences, and voice settings
        </p>
      </div>
      
      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="profile">Profile Details</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="voice">Voice Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card className="p-6">
            {userProfile && <ProfileDetails userProfile={userProfile} onUpdateProfile={updateUserProfile} />}
          </Card>
        </TabsContent>
        
        <TabsContent value="subscription">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Subscription</h2>
            <p className="text-muted-foreground">
              {userProfile?.subscription?.planType || "Free plan"} - Manage your subscription details
            </p>
          </Card>
        </TabsContent>
        
        <TabsContent value="preferences">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Learning Preferences</h2>
            <p className="text-muted-foreground">
              Configure your study preferences and learning style
            </p>
          </Card>
        </TabsContent>
        
        <TabsContent value="voice">
          <VoiceSettingsTab />
        </TabsContent>
      </Tabs>
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
