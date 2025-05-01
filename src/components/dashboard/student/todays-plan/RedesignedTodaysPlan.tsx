import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const RedesignedTodaysPlan = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Today's Plan</h1>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => navigate('/dashboard/student')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Daily Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground">
            Your personalized study plan for today will appear here.
          </div>
        </CardContent>
      </Card>
      
      {/* Additional content would go here */}
    </div>
  );
};

export default RedesignedTodaysPlan;
