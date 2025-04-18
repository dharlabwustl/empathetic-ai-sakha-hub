
import React from "react";
import MainLayout from "@/components/layouts/MainLayout";
import AcademicAdvisorCard from "@/components/dashboard/student/AcademicAdvisorCard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface AcademicAdvisorPageProps {
  userProfile?: any;
}

const AcademicAdvisorPage: React.FC<AcademicAdvisorPageProps> = ({ userProfile }) => {
  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/dashboard/student");
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={handleBackToDashboard}
            className="flex items-center gap-1 mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">Academic Advisor</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage your personalized study plans.
          </p>
        </div>
        
        <AcademicAdvisorCard />
      </div>
    </MainLayout>
  );
};

export default AcademicAdvisorPage;
