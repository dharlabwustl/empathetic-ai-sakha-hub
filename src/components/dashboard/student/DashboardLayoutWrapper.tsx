
import React from 'react';
import { UserProfileType } from '@/types/user';

interface DashboardLayoutWrapperProps {
  userProfile: UserProfileType;
  children: React.ReactNode;
}

export function DashboardLayoutWrapper({ userProfile, children }: DashboardLayoutWrapperProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b bg-background py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold">Sakha AI</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm">{userProfile.name || userProfile.email}</span>
          </div>
        </div>
      </header>
      
      <main className="flex-1 py-6">
        {children}
      </main>
    </div>
  );
}
