
import React from 'react';
import UniversalVoiceAssistant from './UniversalVoiceAssistant';
import { useUserProfile } from '@/hooks/useUserProfile';
import { UserRole } from '@/types/user/base';

interface PageVoiceAssistantProps {
  pageType?: 'concepts' | 'flashcards' | 'practice-exam' | 'formula-lab' | 'academic-advisor' | 'feel-good-corner';
}

const PageVoiceAssistant: React.FC<PageVoiceAssistantProps> = ({
  pageType = 'concepts'
}) => {
  const { userProfile } = useUserProfile(UserRole.Student);
  
  return (
    <UniversalVoiceAssistant 
      userName={userProfile?.name || 'Student'}
    />
  );
};

export default PageVoiceAssistant;
