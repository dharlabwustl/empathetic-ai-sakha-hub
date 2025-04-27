
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const AcademicAdvisorView = () => {
  return (
    <SharedPageLayout title="Academic Advisor" subtitle="Personalized guidance for your academic journey">
      <div className="space-y-6">
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 h-16 w-16 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
                <GraduationCap size={32} className="text-violet-600 dark:text-violet-400" />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Your Academic Success Partner</h2>
              <p className="text-muted-foreground max-w-lg mb-6">
                Get personalized guidance on course selection, study strategies, and career planning. Your academic advisor is here to help you reach your full potential.
              </p>
              <Button className="gap-2 bg-violet-600 hover:bg-violet-700">
                <Plus size={16} />
                Schedule Consultation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SharedPageLayout>
  );
};

export default AcademicAdvisorView;
