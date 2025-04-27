
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const TutorView = () => {
  return (
    <SharedPageLayout title="24/7 AI Tutor" subtitle="Get personalized help anytime, anywhere">
      <div className="space-y-6">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare size={32} className="text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your 24/7 AI Study Companion</h2>
              <p className="text-muted-foreground max-w-lg mb-6">
                Ask any study question, get explanations for complex concepts, or practice with personalized quizzes.
                Your AI tutor is always ready to help with your academic needs.
              </p>
              <Button className="gap-2">
                <Plus size={16} />
                Start a New Chat
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default TutorView;
