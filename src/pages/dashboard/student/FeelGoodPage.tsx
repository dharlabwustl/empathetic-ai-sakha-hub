
import React from 'react';
import MainLayout from "@/components/layouts/MainLayout";
import FeelGoodCorner from "@/components/dashboard/student/FeelGoodCorner";
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FeelGoodPage = () => {
  return (
    <MainLayout>
      <div className="container py-6">
        <div className="flex items-center mb-6">
          <Link to="/dashboard/student/overview" className="inline-flex items-center text-blue-600 hover:text-blue-700 mr-4">
            <ArrowLeft size={16} className="mr-1" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold">Feel Good Corner</h1>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <FeelGoodCorner />
        </div>
      </div>
    </MainLayout>
  );
};

export default FeelGoodPage;
