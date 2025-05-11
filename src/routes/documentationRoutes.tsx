
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DocumentationHubPage from '@/pages/documentation/DocumentationHubPage';
import DatabaseMappingPage from '@/pages/documentation/DatabaseMappingPage';

const DocumentationRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<DocumentationHubPage />} />
      <Route path="/database-mapping" element={<DatabaseMappingPage />} />
      {/* Add other documentation-related routes here */}
    </Routes>
  );
};

export default DocumentationRoutes;
