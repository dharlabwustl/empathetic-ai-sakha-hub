
import React from 'react';
import { UserProfileType } from "@/types/user/base";

interface CommunityTabProps {
  userProfile: UserProfileType;
}

const CommunityTab: React.FC<CommunityTabProps> = ({ userProfile }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Community</h2>
      <p className="text-muted-foreground mt-2">
        Connect with other students, join discussions, and participate in study groups.
      </p>
    </div>
  );
};

export default CommunityTab;
