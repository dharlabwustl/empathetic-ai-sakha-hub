
import React from 'react';
import { UserProfileType } from "@/types/user";
import { Card } from "@/components/ui/card";
import { RefreshCcw, Flag, Compass } from 'lucide-react';

interface RevisionInsightsProps {
  userProfile: UserProfileType;
}

export const RevisionInsights: React.FC<RevisionInsightsProps> = ({ userProfile }) => {
  // Mock data for revision insights
  const revisionData = {
    pendingReviewConcepts: 15,
    lowRetentionFlashcards: 32,
    flaggedForRevisit: 8,
    nextWeeklyTarget: 'Complete Chemistry Module 3',
    nextPracticeExam: 'Physics Mechanics',
    nextPracticeExamDate: '2025-05-02',
    performanceCheckIn: '2025-05-05'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <RefreshCcw className="h-5 w-5 text-purple-500" />
        <h3 className="text-lg font-semibold">Revision Loop Insights</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-3">Revision Metrics</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">🔄 Pending Review Concepts:</span>
              <span className="font-medium">{revisionData.pendingReviewConcepts}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">🧠 Low Retention Flashcards:</span>
              <span className="font-medium">{revisionData.lowRetentionFlashcards}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">📌 Flagged for Revisit:</span>
              <span className="font-medium">{revisionData.flaggedForRevisit}</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h4 className="flex items-center gap-1 font-medium mb-3">
            <Compass className="h-4 w-4 text-blue-500" />
            Upcoming Milestones
          </h4>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">🗓️ Next Weekly Target:</span>
              <span className="font-medium">{revisionData.nextWeeklyTarget}</span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">✅ Next Practice Exam:</span>
              <span className="font-medium">
                {revisionData.nextPracticeExam} – {formatDate(revisionData.nextPracticeExamDate)}
              </span>
            </li>
            <li className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">📈 Performance Check-In:</span>
              <span className="font-medium">{formatDate(revisionData.performanceCheckIn)}</span>
            </li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
