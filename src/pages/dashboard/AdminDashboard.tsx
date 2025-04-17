
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-muted-foreground">Admin functionality is available in the full version.</p>
    </div>
  );
};

export default AdminDashboard;
