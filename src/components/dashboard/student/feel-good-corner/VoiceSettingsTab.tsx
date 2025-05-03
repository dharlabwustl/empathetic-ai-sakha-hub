
import React from 'react';
import VoiceAnnouncementSettings from './VoiceAnnouncementSettings';

const VoiceSettingsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <p className="text-muted-foreground">
        Customize your voice announcements to enhance your study experience. Voice announcements can remind you of tasks, 
        greet you with positive messages, and keep you informed of upcoming events.
      </p>
      
      <VoiceAnnouncementSettings />
    </div>
  );
};

export default VoiceSettingsTab;
