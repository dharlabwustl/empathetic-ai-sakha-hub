
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ContentManagementTab from '@/components/admin/dashboard/content/ContentManagementTab';

const ContentManagement = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Content Management</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Upload, generate, and manage all educational content with AI
            </p>
          </div>
        </div>
        
        <ContentManagementTab />
      </div>
    </AdminLayout>
  );
};

export default ContentManagement;
