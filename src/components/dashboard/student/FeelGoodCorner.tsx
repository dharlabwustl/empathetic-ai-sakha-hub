
import React from 'react';
import { useNavigate } from 'react-router-dom';

// This component now redirects to the FeelGoodCornerView
const FeelGoodCorner: React.FC = () => {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    navigate('/dashboard/student/feel-good-corner');
  }, [navigate]);

  return (
    <div className="flex items-center justify-center p-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

export default FeelGoodCorner;
