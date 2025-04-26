import React from 'react';
import { SharedSectionLayout } from '@/components/dashboard/student/SharedSectionLayout';
import TodaysPlanView from '@/components/dashboard/student/todays-plan/TodaysPlanView';
import { Card } from "@/components/ui/card";

export function TodayPlanView() {
  return (
    <SharedSectionLayout 
      title="Today's Study Plan"
      subtitle="Your personalized daily learning path"
      stats={[
        { label: "📚 Tasks", value: "12 remaining" },
        { label: "⏱️ Study Time", value: "4h 15m" }
      ]}
    >
      <TodaysPlanView />
    </SharedSectionLayout>
  );
}

export function ConceptsView() {
  return (
    <SharedSectionLayout 
      title="Concept Cards"
      subtitle="Master key concepts through interactive learning"
      stats={[
        { label: "🎯 Concepts", value: "85% mastered" },
        { label: "📖 New", value: "3 available" }
      ]}
    >
      
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Your Concept Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Placeholder for concept cards content */}
          <Card className="p-6">
            <p>Your concept cards will appear here.</p>
          </Card>
        </div>
      </div>
    </SharedSectionLayout>
  );
}

export function FlashcardsView() {
  return (
    <SharedSectionLayout 
      title="Flashcards"
      subtitle="Review and reinforce your knowledge"
      stats={[
        { label: "🔄 Due", value: "15 cards" },
        { label: "✨ Streak", value: "5 days" }
      ]}
    >
      
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Your Flashcards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Placeholder for flashcards content */}
          <Card className="p-6">
            <p>Your flashcards will appear here.</p>
          </Card>
        </div>
      </div>
    </SharedSectionLayout>
  );
}

export function PracticeExamsView() {
  return (
    <SharedSectionLayout 
      title="Practice Exams"
      subtitle="Test your knowledge and track progress"
      stats={[
        { label: "📝 Available", value: "3 tests" },
        { label: "🏆 Avg Score", value: "85%" }
      ]}
    >
      
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Practice Exams</h2>
        <div className="grid grid-cols-1 gap-4">
          {/* Placeholder for practice exams content */}
          <Card className="p-6">
            <p>Your practice exams will appear here.</p>
          </Card>
        </div>
      </div>
    </SharedSectionLayout>
  );
}

export function NotificationsView() {
  return (
    <SharedSectionLayout 
      title="Notifications"
      subtitle="Stay updated with your learning journey"
      stats={[
        { label: "🔔 New", value: "3" },
        { label: "📅 Today", value: "5" }
      ]}
    >
      
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Your Notifications</h2>
        <div className="grid grid-cols-1 gap-4">
          {/* Placeholder for notifications content */}
          <Card className="p-6">
            <p>Your notifications will appear here.</p>
          </Card>
        </div>
      </div>
    </SharedSectionLayout>
  );
}
