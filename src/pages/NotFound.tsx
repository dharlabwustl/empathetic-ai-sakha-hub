
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const NotFound = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl my-4">Page not found</p>
      <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
        Return to home page
      </Link>
    </div>
  );
};

export default NotFound;
