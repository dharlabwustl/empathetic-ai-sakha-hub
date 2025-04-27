
import React, { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import StudentProfile from "@/pages/dashboard/student/StudentProfile";
import { useUserProfile } from "@/hooks/useUserProfile";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileCard from "@/components/dashboard/ProfileCard";
import { UserRole } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import SettingsTabContent from "@/components/dashboard/student/SettingsTabContent";

const ProfilePage = () => {
  const { userProfile, loading, updateUserProfile } = useUserProfile();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleUploadImage = (file: File) => {
    try {
      // In a real app, we would upload the file to a server
      // For now, we'll use a local URL and update the user profile
      const imageUrl = URL.createObjectURL(file);
      
      if (userProfile) {
        updateUserProfile({
          avatar: imageUrl
        });
      }
      
      toast({
        title: "Success",
        description: "Your profile image has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile image. Please try again.",
        variant: "destructive",
      });
      console.error("Error uploading image:", error);
    }
  };

  return (
    <MainLayout>
      <div className="container py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-500 dark:text-gray-400">Loading profile...</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              {userProfile && (
                <ProfileCard 
                  profile={userProfile} 
                  onUploadImage={handleUploadImage}
                  showPeerRanking={true}
                  currentMood="motivated"
                />
              )}
            </div>
            
            <div className="md:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <Card>
                  <TabsList className="w-full border-b rounded-none grid grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="p-4">
                    {userProfile && <StudentProfile userProfile={userProfile} />}
                  </TabsContent>
                  
                  <TabsContent value="settings" className="p-4">
                    <SettingsTabContent />
                  </TabsContent>
                  
                  <TabsContent value="achievements" className="p-4">
                    <h2 className="text-xl font-medium mb-4">Your Achievements</h2>
                    <p className="text-muted-foreground">
                      Track your learning journey and celebrate your achievements.
                      This section will display badges, certificates, and milestones
                      you've earned through your studies.
                    </p>
                    {/* Achievements content will be implemented in the future */}
                  </TabsContent>
                </Card>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
