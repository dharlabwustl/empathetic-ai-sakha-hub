
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { useUserProfile } from "@/hooks/useUserProfile";
// Import the actual ProfilePage component we're using
import ProfilePageComponent from "@/pages/dashboard/student/ProfilePage";

const ProfilePage = () => {
  const { userProfile, loading, error, updateProfile, uploadAvatar } = useUserProfile();

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
        ) : error ? (
          <div className="text-center text-red-500">
            <p>Error loading profile: {error}</p>
          </div>
        ) : (
          <ProfilePageComponent 
            userProfile={userProfile} 
            onUpdateProfile={updateProfile} 
            onUploadAvatar={uploadAvatar}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
