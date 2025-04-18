
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import BackToDashboardButton from "@/components/dashboard/BackToDashboardButton";

const TutorPage = () => {
  return (
    <MainLayout>
      <div className="container py-8">
        <BackToDashboardButton />
        <h1 className="text-3xl font-bold mb-4">AI Tutor</h1>
        
        <div className="bg-white shadow rounded-lg p-6">
          {/* AI Tutor content would go here */}
          <p className="text-gray-600">
            This is where your 24/7 AI Tutor would interact with you.
            You can ask questions about your coursework, request explanations
            for difficult concepts, and get help solving problems.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default TutorPage;
