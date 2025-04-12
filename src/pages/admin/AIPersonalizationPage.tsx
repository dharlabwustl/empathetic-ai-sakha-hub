
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AIPersonalizationTab from "@/components/admin/dashboard/tabs/AIPersonalizationTab";

const AIPersonalizationPage = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">AI Personalization Engine</h1>
        <p className="text-gray-500">Configure and manage AI personalization features for optimal learning</p>
      </div>
      
      <AIPersonalizationTab />
    </AdminLayout>
  );
};

export default AIPersonalizationPage;
