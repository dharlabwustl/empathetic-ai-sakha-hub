
import React from 'react';
import { UserProfileType } from "@/types/user/base";

interface ResourcesTabProps {
  userProfile: UserProfileType;
}

const ResourcesTab: React.FC<ResourcesTabProps> = ({ userProfile }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Learning Resources</h2>
      <p className="text-muted-foreground mt-2">
        Access study materials and reference content for your exams.
      </p>
    </div>
  );
};

export default ResourcesTab;
