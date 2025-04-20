
import React from 'react';
import { Loader2 } from 'lucide-react';

const DashboardLoading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <Loader2 className="h-10 w-10 text-primary animate-spin" />
      <p className="mt-4 text-muted-foreground">Loading your dashboard...</p>
    </div>
  );
};

export default DashboardLoading;
