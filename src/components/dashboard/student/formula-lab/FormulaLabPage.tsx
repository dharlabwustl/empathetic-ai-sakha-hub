
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { SharedPageLayout } from "@/components/dashboard/student/SharedPageLayout";
import FormulaTabContent from "@/components/dashboard/student/concepts/FormulaTabContent";

const FormulaLabPage: React.FC = () => {
  const { conceptId } = useParams();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(`/dashboard/student/concepts/${conceptId}`);
  };

  return (
    <SharedPageLayout
      title="Formula Practice Lab"
      subtitle="Practice and master formulas with interactive exercises"
      backAction={handleGoBack}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Concept
          </Button>
        </div>

        <FormulaTabContent 
          conceptName="Formula Practice"
          onNavigateToFormulaPractice={() => {}}
        />
      </div>
    </SharedPageLayout>
  );
};

export default FormulaLabPage;
