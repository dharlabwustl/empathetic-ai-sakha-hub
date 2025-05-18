
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ConceptCardDetailPage from '@/components/dashboard/student/concepts/ConceptCardDetailPage';

const ConceptDetailPage: React.FC = () => {
  const { conceptId } = useParams<{ conceptId: string }>();
  
  if (!conceptId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-semibold">Missing Concept ID</h2>
          <p className="mt-2">Please select a valid concept</p>
        </div>
      </div>
    );
  }
  
  // Directly render the ConceptCardDetailPage which handles the detailed view
  return <ConceptCardDetailPage />;
};

export default ConceptDetailPage;
