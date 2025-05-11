
import React from "react";
import FlaskIntegrationGuide from "@/components/admin/dashboard/FlaskIntegrationGuide";

const PublicFlaskGuidePage = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Flask Integration Guide</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Complete documentation for connecting Flask backend to PREPZR frontend
          </p>
        </div>
        <FlaskIntegrationGuide />
      </div>
    </div>
  );
};

export default PublicFlaskGuidePage;
