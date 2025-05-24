
import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import DocumentationGenerator from "@/components/admin/documentation/DocumentationGenerator";

export const DocumentationPage = () => {
  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Documentation Center</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Generate and manage comprehensive documentation
          </p>
        </div>
      </div>
      
      <DocumentationGenerator />
    </AdminLayout>
  );
};

export default DocumentationPage;
