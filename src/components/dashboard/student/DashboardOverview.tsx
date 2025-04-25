
import { UserProfileType } from "@/types/user";
import { KpiData, NudgeData } from "@/hooks/useKpiTracking";
import KpiCard from "@/components/dashboard/KpiCard";
import NudgePanel from "@/components/dashboard/NudgePanel";
import ProfileCard from "@/components/dashboard/ProfileCard";

interface DashboardOverviewProps {
  userProfile: UserProfileType;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: any[];
}

export default function DashboardOverview({
  userProfile,
  kpis,
  nudges,
  markNudgeAsRead,
  features
}: DashboardOverviewProps) {
  // Mock values for KPI metrics - in a real app, these would come from your data source
  const kpiMetrics = {
    totalConceptCards: 450,
    flashcardsToComplete: 120,
    practiceExams: 45,
    averageQuizScore: 82,
    averageFlashcardAccuracy: 78,
    totalConceptsCompleted: 385
  };

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {/* Exam Goal Section */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-lg font-semibold mb-2">Your Exam Goal</h3>
              <p className="text-gray-600">{userProfile?.goals?.[0]?.title || 'IIT-JEE'}</p>
            </div>

            {/* KPI Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 bg-white rounded-lg shadow-sm border">
              <div className="space-y-1">
                <span className="text-sm text-gray-500">🧠 Total Concept Cards</span>
                <p className="text-2xl font-bold text-gray-900">{kpiMetrics.totalConceptCards}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-500">🔁 Flashcards to Complete</span>
                <p className="text-2xl font-bold text-gray-900">{kpiMetrics.flashcardsToComplete}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-500">🧪 Practice Exams</span>
                <p className="text-2xl font-bold text-gray-900">{kpiMetrics.practiceExams}</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-500">📊 Avg Quiz Score</span>
                <p className="text-2xl font-bold text-gray-900">{kpiMetrics.averageQuizScore}%</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-500">🧠 Flashcard Accuracy</span>
                <p className="text-2xl font-bold text-gray-900">{kpiMetrics.averageFlashcardAccuracy}%</p>
              </div>
              <div className="space-y-1">
                <span className="text-sm text-gray-500">✅ Concepts Completed</span>
                <p className="text-2xl font-bold text-gray-900">{kpiMetrics.totalConceptsCompleted}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ProfileCard profile={userProfile} />
        </div>
      </div>

      {/* Nudges Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <NudgePanel nudges={nudges} markAsRead={markNudgeAsRead} />
        </div>
      </div>
    </div>
  );
}
