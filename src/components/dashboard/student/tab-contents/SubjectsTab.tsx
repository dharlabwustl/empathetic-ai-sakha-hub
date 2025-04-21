
import React from 'react';
import { UserProfileType } from "@/types/user/base";

interface SubjectsTabProps {
  userProfile: UserProfileType;
}

const SubjectsTab: React.FC<SubjectsTabProps> = ({ userProfile }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Your Subjects</h2>
      <p className="text-muted-foreground mt-2">
        Manage and explore your academic subjects.
      </p>
    </div>
  );
};

export default SubjectsTab;
