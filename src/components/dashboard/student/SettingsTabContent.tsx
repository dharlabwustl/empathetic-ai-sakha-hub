
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
