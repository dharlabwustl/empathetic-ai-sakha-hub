
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VoiceSettingsTab from "@/components/dashboard/student/settings/VoiceSettingsTab";
import { VoiceAnnouncerProvider } from "@/components/dashboard/student/voice/VoiceAnnouncer";

const SettingsPage = () => {
  return (
    <div className="space-y-6 pb-8">
      <div>
        <h1 className="text-3xl font-bold">Voice Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Customize your Sakha voice announcer preferences
        </p>
      </div>
      
      <VoiceAnnouncerProvider>
        <VoiceSettingsTab />
      </VoiceAnnouncerProvider>
    </div>
  );
};

export default SettingsPage;
