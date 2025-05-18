
import React from 'react';
import { useParams } from 'react-router-dom';
import EnhancedConceptDetail from '@/components/dashboard/student/concepts/EnhancedConceptDetail';
import DashboardLayout from '@/components/dashboard/layouts/DashboardLayout';
import { Helmet } from 'react-helmet-async';
import VoiceGreeting from '@/components/dashboard/student/voice/VoiceGreeting';

const ConceptDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Helmet>
        <title>Concept Detail | PREPZR</title>
      </Helmet>
      <DashboardLayout>
        <VoiceGreeting 
          isFirstTimeUser={false}
          userName="Student" 
          language="en"
        />
        <EnhancedConceptDetail id={id} />
      </DashboardLayout>
    </>
  );
};

export default ConceptDetailPage;
