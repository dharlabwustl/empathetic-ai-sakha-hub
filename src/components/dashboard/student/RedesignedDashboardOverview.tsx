import React, { useState } from 'react';
import { UserProfileBase } from '@/types/user/base';
import { KpiData } from '@/hooks/useKpiTracking';
import SmartDailySuggestions from './SmartDailySuggestions';
import { MoodType } from '@/types/user/base';

interface RedesignedDashboardOverviewProps {
  userProfile: UserProfileBase;
  kpis: KpiData[];
  currentMood?: MoodType;
}

const RedesignedDashboardOverview: React.FC<RedesignedDashboardOverviewProps> = ({
  userProfile,
  kpis,
  currentMood
}) => {
  const [showSuggestions, setShowSuggestions] = useState(true);

  return (
    <div className="space-y-6">
      {/* Smart Daily Suggestions - Now positioned below header */}
      {showSuggestions && (
        <SmartDailySuggestions
          userName={userProfile.name || userProfile.firstName || 'Student'}
          currentMood={currentMood}
          onClose={() => setShowSuggestions(false)}
        />
      )}

      {/* Rest of dashboard content remains the same */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <div key={kpi.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{kpi.label}</h3>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{kpi.value}</p>
              {kpi.change && (
                <p className={`ml-2 text-sm ${
                  kpi.trend === 'up' ? 'text-green-600' : 
                  kpi.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {kpi.change}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RedesignedDashboardOverview;
