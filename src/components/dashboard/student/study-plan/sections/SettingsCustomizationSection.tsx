
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Settings, Bell, Palette, Clock } from 'lucide-react';

export const SettingsCustomizationSection = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    autoSchedule: false,
    studyReminders: true,
    weekendStudy: false,
    dailyHours: [6],
    preferredTime: 'evening',
    theme: 'light'
  });

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Settings & Customization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Study Preferences */}
            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Study Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Daily Study Hours</label>
                    <p className="text-sm text-gray-600">Target hours per day</p>
                  </div>
                  <div className="w-32">
                    <Slider
                      value={settings.dailyHours}
                      onValueChange={(value) => updateSetting('dailyHours', value)}
                      max={12}
                      min={2}
                      step={0.5}
                    />
                    <div className="text-center text-sm text-gray-600 mt-1">
                      {settings.dailyHours[0]} hours
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Preferred Study Time</label>
                    <p className="text-sm text-gray-600">When you study best</p>
                  </div>
                  <Select value={settings.preferredTime} onValueChange={(value) => updateSetting('preferredTime', value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning</SelectItem>
                      <SelectItem value="afternoon">Afternoon</SelectItem>
                      <SelectItem value="evening">Evening</SelectItem>
                      <SelectItem value="night">Night</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Weekend Study</label>
                    <p className="text-sm text-gray-600">Include weekends in schedule</p>
                  </div>
                  <Switch
                    checked={settings.weekendStudy}
                    onCheckedChange={(checked) => updateSetting('weekendStudy', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Auto-Schedule</label>
                    <p className="text-sm text-gray-600">Automatically adjust plan based on performance</p>
                  </div>
                  <Switch
                    checked={settings.autoSchedule}
                    onCheckedChange={(checked) => updateSetting('autoSchedule', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notification Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Push Notifications</label>
                    <p className="text-sm text-gray-600">Receive study reminders and updates</p>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(checked) => updateSetting('notifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Study Reminders</label>
                    <p className="text-sm text-gray-600">Daily study time reminders</p>
                  </div>
                  <Switch
                    checked={settings.studyReminders}
                    onCheckedChange={(checked) => updateSetting('studyReminders', checked)}
                  />
                </div>
              </div>
            </div>

            {/* Appearance */}
            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Appearance
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="font-medium">Theme</label>
                    <p className="text-sm text-gray-600">Choose your preferred theme</p>
                  </div>
                  <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4 border-t">
              <Button>Save Settings</Button>
              <Button variant="outline">Reset to Default</Button>
              <Button variant="outline">Export Plan</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
