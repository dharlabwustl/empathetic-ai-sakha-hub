import React, { ReactNode, useState, useEffect } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { UserProfile } from '@/types/user/base';
import { KpiData, NudgeData } from '@/hooks/useKpiTracking';
import styled from '@emotion/styled';
import { useVoiceAnnouncer } from '@/hooks/useVoiceAnnouncer';
import { useMoodStudyIntegration } from '@/hooks/useMoodStudyIntegration';

interface DashboardContainerProps {
  children: ReactNode;
  userProfile: UserProfile;
  kpis: KpiData[];
  nudges: NudgeData[];
  markNudgeAsRead: (id: string) => void;
  features: any[];
  showWelcomeTour: boolean;
  handleSkipTour: () => void;
  handleCompleteTour: () => void;
  lastActivity?: { type: string; description: string } | null;
  suggestedNextAction?: string | null;
}

const MainContentContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;

const DashboardContainer: React.FC<DashboardContainerProps> = ({
  children,
  userProfile,
  kpis,
  nudges,
  markNudgeAsRead,
  features,
  showWelcomeTour,
  handleSkipTour,
  handleCompleteTour,
  lastActivity,
  suggestedNextAction
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [hideTabsNav, setHideTabsNav] = useState(!isMobile);
  const [activeTab, setActiveTab] = useState('home');
  const { speakMessage } = useVoiceAnnouncer();
  const { updateMood } = useMoodStudyIntegration();

  useEffect(() => {
    setHideTabsNav(!isMobile);
  }, [isMobile]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleToggleTabsNav = () => {
    setHideTabsNav(!hideTabsNav);
  };

  // Function to handle voice command and update mood
  const handleVoiceCommand = (command: string) => {
    if (command.includes("I'm feeling happy")) {
      updateMood('HAPPY');
    } else if (command.includes("I'm feeling tired")) {
      updateMood('TIRED');
    } else if (command.includes("I'm feeling motivated")) {
      updateMood('MOTIVATED');
    } else if (command.includes("I'm feeling stressed")) {
      updateMood('STRESSED');
    } else if (command.includes("I'm feeling anxious")) {
      updateMood('ANXIOUS');
    } else if (command.includes("I'm feeling focused")) {
      updateMood('FOCUSED');
    } else if (command.includes("How should I study when I'm confused?")) {
      updateMood('CONFUSED');
    } else if (command.includes("Update my mood to neutral")) {
      updateMood('NEUTRAL');
    } else {
      speakMessage("Sorry, I didn't understand that command.");
    }
  };

  return (
    <MainContentContainer className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Sidebar Navigation */}
      {!isMobile && (
        <aside className={`lg:col-span-3 xl:col-span-2 ${hideTabsNav ? 'hidden' : 'block'}`}>
          {children}
        </aside>
      )}
      
      {/* Main Content */}
      <div className="lg:col-span-9 xl:col-span-10">
        {children}
      </div>
    </MainContentContainer>
  );
};

export default DashboardContainer;
