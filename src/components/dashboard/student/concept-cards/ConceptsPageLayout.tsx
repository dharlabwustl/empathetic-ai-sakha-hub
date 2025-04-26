
import React from 'react';
import { SharedPageLayout } from '../SharedPageLayout';
import { useUserProfile } from '@/hooks/useUserProfile';

interface ConceptsPageLayoutProps {
  children: React.ReactNode;
}

export const ConceptsPageLayout = ({ children }: ConceptsPageLayoutProps) => {
  const { userProfile } = useUserProfile();
  const examGoal = userProfile?.goals?.[0]?.title || 'IIT-JEE';

  return (
    <SharedPageLayout
      title="Concept Cards"
      subtitle={`Master concepts aligned with your ${examGoal} preparation`}
    >
      {children}
    </SharedPageLayout>
  );
};
