
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layouts/MainLayout";
import StudentProfile from "@/pages/dashboard/student/StudentProfile";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole } from "@/types/user/base";

const ProfilePage = () => {
  const { userProfile, loading } = useUserProfile(UserRole.Student);

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
          <StudentProfile userProfile={userProfile} />
        )}
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
