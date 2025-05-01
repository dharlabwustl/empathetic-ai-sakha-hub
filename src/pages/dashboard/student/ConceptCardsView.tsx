
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen } from 'lucide-react';

const ConceptCardsView = () => {
  return (
    <SharedPageLayout 
      title="Concept Cards" 
      subtitle="Master key concepts through interactive learning"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        <div className="flex items-center mb-4 gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Your Concept Cards</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-6">
            <CardContent className="p-0">
              <p className="text-muted-foreground">Your concept cards will appear here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default ConceptCardsView;
