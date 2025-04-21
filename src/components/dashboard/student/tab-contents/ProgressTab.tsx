
import React from 'react';
import { UserProfileType } from "@/types/user/base";

interface ProgressTabProps {
  userProfile: UserProfileType;
}

const ProgressTab: React.FC<ProgressTabProps> = ({ userProfile }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Your Progress</h2>
      <p className="text-muted-foreground mt-2">
        Track your learning journey and academic achievements.
      </p>
    </div>
  );
};

export default ProgressTab;
