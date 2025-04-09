
import React from 'react';

const DashboardLoading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 dark:from-sky-900/10 dark:via-gray-900 dark:to-violet-900/10">
      <div className="text-center">
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-400 to-violet-500 animate-pulse blur-md"></div>
          <img 
            src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
            alt="Sakha AI" 
            className="w-20 h-20 mx-auto relative z-10" 
          />
        </div>
        <h2 className="text-xl font-medium mb-2">Generating your smart study plan...</h2>
        <p className="text-muted-foreground">Personalizing your learning experience</p>
        
        <div className="mt-8 max-w-xs mx-auto">
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="h-2 w-2 bg-sky-500 rounded-full animate-pulse mr-2"></div>
              <p className="text-sm">Analyzing exam syllabus...</p>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 bg-violet-500 rounded-full animate-pulse mr-2"></div>
              <p className="text-sm">Creating personalized study calendar...</p>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
              <p className="text-sm">Generating adaptive flashcards...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLoading;
