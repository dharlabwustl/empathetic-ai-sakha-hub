
import React from 'react';
import TodayStudyPlan from '@/components/dashboard/student/TodayStudyPlan';
import TodaysPlanView from '@/components/dashboard/student/todays-plan/TodaysPlanView';

export function TodayPlanView() {
  return (
    <div className="space-y-6">
      <TodaysPlanView />
    </div>
  );
}

export function FlashcardsView() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Flashcards</h2>
      <p className="text-muted-foreground">
        Review and practice with your personalized flashcards.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Placeholder for flashcards content */}
        <div className="p-6 border rounded-lg bg-gray-50 dark:bg-gray-800 text-center">
          <p>Flashcards content will appear here.</p>
        </div>
      </div>
    </div>
  );
}

export function PracticeExamsView() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Practice Exams</h2>
      <p className="text-muted-foreground">
        Test your knowledge with practice exams tailored to your study goals.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Placeholder for practice exams content */}
        <div className="p-6 border rounded-lg bg-gray-50 dark:bg-gray-800 text-center">
          <p>Practice exams content will appear here.</p>
        </div>
      </div>
    </div>
  );
}

export function MicroConceptView() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Micro Concepts</h2>
      <p className="text-muted-foreground">
        Browse and learn with bite-sized concept explanations.
      </p>
      <div className="grid grid-cols-1 gap-4">
        {/* Placeholder for micro concepts content */}
        <div className="p-6 border rounded-lg bg-gray-50 dark:bg-gray-800 text-center">
          <p>Micro concepts content will appear here.</p>
        </div>
      </div>
    </div>
  );
}

export function NotificationsView() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Notifications</h2>
      <p className="text-muted-foreground">
        Stay updated with important announcements and reminders.
      </p>
      <div className="grid grid-cols-1 gap-4">
        {/* Placeholder for notifications content */}
        <div className="p-6 border rounded-lg bg-gray-50 dark:bg-gray-800 text-center">
          <p>Notifications content will appear here.</p>
        </div>
      </div>
    </div>
  );
}
