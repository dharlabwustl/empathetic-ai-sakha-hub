
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Brain } from 'lucide-react';

const FlashcardsView = () => {
  return (
    <SharedPageLayout 
      title="Flashcards" 
      subtitle="Review and reinforce your knowledge"
      showBackButton={true}
      backButtonUrl="/dashboard/student"
    >
      <div className="space-y-6">
        <div className="flex items-center mb-4 gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Your Flashcards</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <CardContent className="p-0">
              <p className="text-muted-foreground">Your flashcards will appear here.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
};

export default FlashcardsView;
