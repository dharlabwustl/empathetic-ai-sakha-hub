
import React from 'react';
import AcademicAdvisorView from '@/components/dashboard/student/academic/AcademicAdvisorView';

interface AcademicAdvisorProps {
  userProfile?: {
    examPreparation?: string;
  };
}

const AcademicAdvisor: React.FC<AcademicAdvisorProps> = ({ userProfile }) => {
  return <AcademicAdvisorView userProfile={userProfile} />;
};

export default AcademicAdvisor;
