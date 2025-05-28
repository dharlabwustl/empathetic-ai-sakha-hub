
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
      weakSubjects: ['Physics', 'Mathematics'],
      strongSubjects: ['Chemistry'],
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
    return 'visual';
  };

  const inferPerformanceLevel = (profile: UserProfileBase): 'beginner' | 'intermediate' | 'advanced' => {
    return 'intermediate';
  };

  const getGridClass = (layout: string) => {
    switch (layout) {
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      case 'list':
        return 'flex flex-col gap-4';
      case 'masonry':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  const getWidgetSizeClass = (size: string) => {
    switch (size) {
      case 'small':
        return 'min-h-[150px]';
      case 'medium':
        return 'min-h-[250px]';
      case 'large':
        return 'min-h-[350px] md:col-span-2';
      default:
        return 'min-h-[250px]';
    }
  };

  const getThemeClass = (theme: string) => {
    switch (theme) {
      case 'calm-blue':
        return 'theme-calm-blue';
      case 'energetic-orange':
        return 'theme-energetic-orange';
      case 'focused-green':
        return 'theme-focused-green';
      default:
        return 'theme-default';
    }
  };

  if (isLoading || !dashboardLayout) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className={`personalized-dashboard ${getThemeClass(dashboardLayout.theme)}`}>
      {/* AI Insights Panel */}
      <AIInsightsPanel 
        userProfile={userProfile}
        currentMood={currentMood}
        className="mb-6"
      />

      {/* Personalized Widgets Grid */}
      <motion.div 
        className={getGridClass(dashboardLayout.layout)}
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
            className={getWidgetSizeClass(widget.size)}
          >
            <PersonalizedWidget widget={widget} userProfile={userProfile} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PersonalizedDashboard;
