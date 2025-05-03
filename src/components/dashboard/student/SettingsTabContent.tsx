
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import VoiceSettingsTab from './settings/VoiceSettingsTab';
import { VoiceAnnouncerProvider } from './voice/VoiceAnnouncer';

const SettingsTabContent: React.FC = () => {
  return (
    <VoiceAnnouncerProvider>
      <Card className="border-none shadow-none">
        <CardHeader className="px-0">
          <CardTitle className="text-xl font-semibold">Settings</CardTitle>
          <CardDescription>
            Manage your voice announcement preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <VoiceSettingsTab />
        </CardContent>
      </Card>
    </VoiceAnnouncerProvider>
  );
};

export default SettingsTabContent;
