
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';

const ProfilePage = () => {
  return (
    <SharedPageLayout 
      title="Profile" 
      subtitle="Manage your personal information"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-gray-500">
            The ProfilePage component is under development. Check back later to manage your profile.
          </p>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ProfilePage;
