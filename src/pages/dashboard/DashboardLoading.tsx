
import React from 'react';
import { Loader2 } from 'lucide-react';

const DashboardLoading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-xl font-medium">Loading your dashboard...</h2>
        <p className="text-muted-foreground">Please wait while we prepare your personalized experience.</p>
      </div>
    </div>
  );
};

export default DashboardLoading;
