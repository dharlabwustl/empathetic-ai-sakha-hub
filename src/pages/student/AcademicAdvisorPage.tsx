
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import BackToDashboardButton from "@/components/dashboard/BackToDashboardButton";

const AcademicAdvisorPage = () => {
  return (
    <MainLayout>
      <div className="container py-8">
        <BackToDashboardButton />
        <h1 className="text-3xl font-bold mb-4">Academic Advisor</h1>
        
        <div className="bg-white shadow rounded-lg p-6">
          {/* Academic Advisor content would go here */}
          <p className="text-gray-600">
            This is where your personalized academic advisor would interact with you.
            You can ask questions about your academic future, get recommendations on
            study plans, and more.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default AcademicAdvisorPage;
