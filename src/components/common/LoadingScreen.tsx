
import React from 'react';
import { Loader2 } from 'lucide-react';
import PrepzrLogo from './PrepzrLogo';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-violet-50 dark:from-blue-950/30 dark:to-violet-950/30">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <PrepzrLogo width={80} />
        </div>
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mt-4" />
        <h2 className="mt-4 text-xl font-medium">Loading...</h2>
        <p className="mt-2 text-muted-foreground">Please wait while we prepare your experience</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
