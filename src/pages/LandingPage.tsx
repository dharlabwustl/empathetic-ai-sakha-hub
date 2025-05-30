
import React from 'react';
import { Navigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  // Redirect to index for now
  return <Navigate to="/" replace />;
};

export default LandingPage;
