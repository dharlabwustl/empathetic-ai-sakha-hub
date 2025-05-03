
import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Loading..." }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-blue-900/20 dark:via-gray-900 dark:to-purple-900/20">
      <div className="flex flex-col items-center gap-4 p-6">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400" />
        <p className="text-xl font-medium text-gray-800 dark:text-gray-200">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
