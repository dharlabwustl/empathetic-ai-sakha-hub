
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompletionStep: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center text-center py-8">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold mb-2">Registration Complete!</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Your account has been successfully created. You're all set to start your learning journey!
      </p>
      
      <div className="space-x-4">
        <Button 
          size="lg"
          onClick={() => navigate('/dashboard/student')}
        >
          Go to Dashboard
        </Button>
        
        <Button 
          variant="outline"
          size="lg"
          onClick={() => navigate('/profile/setup')}
        >
          Complete Your Profile
        </Button>
      </div>
    </div>
  );
};

export default CompletionStep;
