
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
        Access your study materials, reference books, and online resources.
      </p>
    </div>
  );
};

export default ResourcesTab;
