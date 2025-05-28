
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PersonalizationProfile, PersonalizedDashboardLayout } from '@/types/personalization';
import { personalizationService } from '@/services/personalizationService';
import { UserProfileBase, MoodType } from '@/types/user/base';
import PersonalizedWidget from './PersonalizedWidget';
import AIInsightsPanel from './AIInsightsPanel';

interface PersonalizedDashboardProps {
  userProfile: UserProfileBase;
  currentMood: MoodType;
}

const PersonalizedDashboard: React.FC<PersonalizedDashboardProps> = ({
  userProfile,
  currentMood
}) => {
  const [dashboardLayout, setDashboardLayout] = useState<PersonalizedDashboardLayout | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generatePersonalizedLayout();
  }, [userProfile, currentMood]);

  const generatePersonalizedLayout = async () => {
    setIsLoading(true);
    
    // Create personalization profile from user data
    const profile: PersonalizationProfile = {
      userId: userProfile.id,
      examType: userProfile.examPreparation || 'JEE',
      learningStyle: inferLearningStyle(userProfile),
      studyPreferences: {
        preferredTimeStart: userProfile.studyPreferences?.preferredTimeStart || '09:00',
        preferredTimeEnd: userProfile.studyPreferences?.preferredTimeEnd || '18:00',
        sessionDuration: 45,
        breakDuration: 15,
        dailyHours: userProfile.studyPreferences?.hoursPerDay || 4
      },
      performanceLevel: inferPerformanceLevel(userProfile),
      weakSubjects: ['Physics', 'Mathematics'], // This would come from analytics
      strongSubjects: ['Chemistry'], // This would come from analytics
      moodPatterns: {
        typical: 'motivated',
        current: currentMood,
        stressFactors: ['time-pressure', 'difficult-concepts']
      },
      priorities: ['exam-prep', 'weak-subjects', 'consistency']
    };

    const layout = personalizationService.generatePersonalizedDashboard(profile);
    
    // Add time-based adaptations
    const timeAdaptedWidgets = personalizationService.adaptForTimeContext(profile, new Date());
    layout.widgets = [...timeAdaptedWidgets, ...layout.widgets];

    setDashboardLayout(layout);
    setIsLoading(false);
  };

  const inferLearningStyle = (profile: UserProfileBase): 'visual' | 'auditory' | 'kinesthetic' | 'mixed' => {
    // This would be based on user interactions and preferences
    return 'visual'; // Default for now
  };

  const inferPerformanceLevel = (profile: UserProfileBase): 'beginner' | 'intermediate' | 'advanced' => {
    // This would be based on test scores and progress
    return 'intermediate'; // Default for now
  };

  if (isLoading || !dashboardLayout) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className={`personalized-dashboard theme-${dashboardLayout.theme}`}>
      {/* AI Insights Panel */}
      <AIInsightsPanel 
        userProfile={userProfile}
        currentMood={currentMood}
        className="mb-6"
      />

      {/* Personalized Widgets Grid */}
      <motion.div 
        className={`dashboard-grid ${dashboardLayout.layout}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {dashboardLayout.widgets.map((widget, index) => (
          <motion.div
            key={widget.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`widget-container ${widget.size}`}
            style={{
              gridRow: widget.position.row + 1,
              gridColumn: widget.position.col + 1
            }}
          >
            <PersonalizedWidget widget={widget} userProfile={userProfile} />
          </motion.div>
        ))}
      </motion.div>

      <style jsx>{`
        .dashboard-grid.grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .dashboard-grid.list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .dashboard-grid.masonry {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1rem;
          grid-auto-rows: max-content;
        }

        .widget-container.small {
          min-height: 150px;
        }
        
        .widget-container.medium {
          min-height: 250px;
        }
        
        .widget-container.large {
          min-height: 350px;
        }

        .theme-calm-blue {
          --primary-color: #3b82f6;
          --bg-color: #eff6ff;
        }
        
        .theme-energetic-orange {
          --primary-color: #f97316;
          --bg-color: #fff7ed;
        }
        
        .theme-focused-green {
          --primary-color: #10b981;
          --bg-color: #ecfdf5;
        }
      `}</style>
    </div>
  );
};

export default PersonalizedDashboard;
