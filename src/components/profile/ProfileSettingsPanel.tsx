
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';

interface ProfileSettingsPanelProps {
  userProfile: any;
  onUpdateProfile: (updates: any) => void;
}

export const ProfileSettingsPanel = ({ userProfile, onUpdateProfile }: ProfileSettingsPanelProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Profile Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="emailNotifications">Email Notifications</Label>
          <Switch
            id="emailNotifications"
            checked={userProfile.emailNotifications || false}
            onCheckedChange={(checked) => onUpdateProfile({ emailNotifications: checked })}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="pushNotifications">Push Notifications</Label>
          <Switch
            id="pushNotifications"
            checked={userProfile.pushNotifications || false}
            onCheckedChange={(checked) => onUpdateProfile({ pushNotifications: checked })}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="studyReminders">Study Reminders</Label>
          <Switch
            id="studyReminders"
            checked={userProfile.studyReminders || true}
            onCheckedChange={(checked) => onUpdateProfile({ studyReminders: checked })}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="darkMode">Dark Mode</Label>
          <Switch
            id="darkMode"
            checked={userProfile.darkMode || false}
            onCheckedChange={(checked) => onUpdateProfile({ darkMode: checked })}
          />
        </div>
        
        <Button variant="destructive" className="mt-6">
          Delete Account
        </Button>
      </CardContent>
    </Card>
  );
};
