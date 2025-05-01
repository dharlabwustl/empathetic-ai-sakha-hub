
import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, BookOpen, CheckCircle, Clock } from 'lucide-react';
import AcademicAdvisor from '@/pages/dashboard/student/AcademicAdvisor';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';

const AcademicAdvisorView = () => {
  const { userProfile, loading } = useUserProfile(UserRole.Student);

  return (
    <SharedPageLayout 
      title="Academic Advisor" 
      subtitle="Get guidance for your academic journey"
      backButtonUrl="/dashboard/student"
      showBackButton={true}
    >
      <div className="space-y-6">
        {loading || !userProfile ? (
          <Card>
            <CardContent className="p-6 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </CardContent>
          </Card>
        ) : (
          <AcademicAdvisor userProfile={userProfile} />
        )}
      </div>
    </SharedPageLayout>
  );
};

export default AcademicAdvisorView;
