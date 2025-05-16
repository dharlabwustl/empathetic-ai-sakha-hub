
import React from 'react';
import { useParams } from 'react-router-dom';
import ConceptCardDetailPage from '@/components/dashboard/student/concepts/ConceptCardDetailPage';

const ConceptDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  return <ConceptCardDetailPage />;
};

export default ConceptDetailPage;
