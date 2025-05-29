
import React from 'react';
import { UserProfileBase, MoodType } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookMarked } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EnhancedExamReadinessScore from '../student/dashboard-sections/EnhancedExamReadinessScore';

interface ComprehensiveAdaptiveDashboardProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
}

const ComprehensiveAdaptiveDashboard: React.FC<ComprehensiveAdaptiveDashboardProps> = ({
  userProfile,
  kpis,
  currentMood,
  onMoodChange
}) => {
  return (
    <div className="space-y-6">
      {/* Exam Goal Section */}
      <Card className="bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookMarked className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Current Exam Goal</p>
                <p className="font-semibold text-lg">{userProfile.examPreparation || "NEET 2024"}</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Switch Plan
              </Button>
              <Button size="sm">
                New Plan
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Exam Readiness Score */}
      <EnhancedExamReadinessScore 
        overallScore={72}
        confidenceLevel={68}
        predictiveFinalScore={78}
        targetExam={userProfile.examPreparation || "NEET"}
        daysUntilExam={85}
      />
    </div>
  );
};

export default ComprehensiveAdaptiveDashboard;
