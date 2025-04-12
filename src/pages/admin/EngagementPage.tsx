
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import EngagementTab from "@/components/admin/dashboard/tabs/EngagementTab";

const EngagementPage = () => {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Engagement & Feedback</h1>
        <p className="text-gray-500">Monitor and manage user engagement, feedback and emotional analytics</p>
      </div>
      
      <EngagementTab />
    </AdminLayout>
  );
};

export default EngagementPage;
