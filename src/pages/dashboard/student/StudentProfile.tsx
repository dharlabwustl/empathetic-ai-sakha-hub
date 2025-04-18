
import React from "react";
import { UserProfileType } from "@/types/user";
import ProfileDetails from "./ProfileDetails";

interface StudentProfileProps {
  userProfile: UserProfileType;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ userProfile }) => {
  const handleUpdateProfile = (updates: Partial<UserProfileType>) => {
    // In a real app, this would send the updates to the server
    console.log("Profile updates:", updates);
  };

  return (
    <div className="container">
      <ProfileDetails
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
      />
    </div>
  );
};

export default StudentProfile;
