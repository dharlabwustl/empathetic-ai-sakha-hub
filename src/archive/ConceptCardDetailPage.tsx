
// Archived on 2025-05-20
// This file was replaced by ConceptDetailPage.tsx
// Archiving for reference

import React from 'react';
import { useParams } from 'react-router-dom';

// Content moved to ConceptDetailPage.tsx
// This file is now archived as redundant

const ConceptCardDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div>
      <p>This file has been archived. Please use ConceptDetailPage.tsx instead.</p>
    </div>
  );
};

export default ConceptCardDetailPage;
