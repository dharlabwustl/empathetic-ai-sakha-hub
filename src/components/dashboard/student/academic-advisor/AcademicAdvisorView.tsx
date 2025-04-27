
import React from 'react';
import { UserProfileBase } from "@/types/user/base";
import AcademicAdvisorSection from './AcademicAdvisorSection';

interface AcademicAdvisorViewProps {
  userProfile: UserProfileBase;
}

export const AcademicAdvisorView: React.FC<AcademicAdvisorViewProps> = ({ userProfile }) => {
  return <AcademicAdvisorSection />;
};

export default AcademicAdvisorView;
