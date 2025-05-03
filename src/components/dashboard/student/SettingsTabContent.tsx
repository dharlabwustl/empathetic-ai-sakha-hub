
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Volume2 } from "lucide-react";
import VoiceSettingsTab from './settings/VoiceSettingsTab';
import { VoiceAnnouncerProvider } from './voice/VoiceAnnouncer';

const SettingsTabContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("voice");

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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="voice" className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Voice Announcements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="voice" className="space-y-4">
              <VoiceSettingsTab />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </VoiceAnnouncerProvider>
  );
};

export default SettingsTabContent;
