
import React from 'react';
import VoiceSettingsTab from './settings/VoiceSettingsTab';
import { VoiceAnnouncerProvider } from './voice/VoiceAnnouncer';

const SettingsTabContent: React.FC = () => {
  return (
    <VoiceAnnouncerProvider>
      <VoiceSettingsTab />
    </VoiceAnnouncerProvider>
  );
};

export default SettingsTabContent;
