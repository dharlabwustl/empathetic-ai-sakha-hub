
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import PersonalizationTab from "@/components/admin/dashboard/PersonalizationTab"; 

const AIPersonalizationPage = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">AI Personalization</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage AI models and personalization settings for student experience
          </p>
        </div>
      </div>
      
      <PersonalizationTab />
    </AdminLayout>
  );
};

export default AIPersonalizationPage;
