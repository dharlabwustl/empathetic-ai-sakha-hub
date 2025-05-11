
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ConceptStudyPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the concept card detail page with the correct URL structure
    // This ensures consistent navigation flow from all entry points
    navigate(`/dashboard/student/concepts/${conceptId}`, { replace: true });
  }, [conceptId, navigate]);
  
  // Return null as this is just a redirect component
  return null;
};

export default ConceptStudyPage;
