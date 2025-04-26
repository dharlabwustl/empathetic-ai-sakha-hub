import React from 'react';
import { SharedPageLayout } from '@/components/dashboard/student/SharedPageLayout';
import { SubjectTasksBreakdown } from '@/components/dashboard/student/todays-plan/SubjectTasksBreakdown';
import { HistoryAndBacklog } from '@/components/dashboard/student/todays-plan/HistoryAndBacklog';
import { Card } from "@/components/ui/card";

export function TodayPlanView() {
  return (
    <SharedPageLayout 
      title="Today's Study Plan"
      subtitle="Your personalized daily learning path"
    >
      <div className="space-y-8">
        <SubjectTasksBreakdown />
        <HistoryAndBacklog />
      </div>
    </SharedPageLayout>
  );
}

export function ConceptsView() {
  return (
    <SharedPageLayout 
      title="Concept Cards"
      subtitle="Master key concepts through interactive learning"
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Your Concept Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-6">
            <p>Your concept cards will appear here.</p>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
}

export function FlashcardsView() {
  return (
    <SharedPageLayout 
      title="Flashcards"
      subtitle="Review and reinforce your knowledge"
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Your Flashcards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6">
            <p>Your flashcards will appear here.</p>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
}

export function PracticeExamsView() {
  return (
    <SharedPageLayout 
      title="Practice Exams"
      subtitle="Test your knowledge and track progress"
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Practice Exams</h2>
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-6">
            <p>Your practice exams will appear here.</p>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
}

export function NotificationsView() {
  return (
    <SharedPageLayout 
      title="Notifications"
      subtitle="Stay updated with your learning journey"
    >
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Your Notifications</h2>
        <div className="grid grid-cols-1 gap-4">
          <Card className="p-6">
            <p>Your notifications will appear here.</p>
          </Card>
        </div>
      </div>
    </SharedPageLayout>
  );
}
