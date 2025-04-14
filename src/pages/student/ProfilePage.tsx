
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import StudentProfile from "@/pages/dashboard/student/StudentProfile";
import { useUserProfile } from "@/hooks/useUserProfile";

const ProfilePage = () => {
  const { userProfile, loading } = useUserProfile();

  return (
    <MainLayout>
      <div className="container py-8">
        {loading ? (
          <div>Loading profile...</div>
        ) : (
          <StudentProfile userProfile={userProfile} />
        )}
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
