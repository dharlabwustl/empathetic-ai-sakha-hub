
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Settings, Clock, Calendar, RefreshCw, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SettingsCustomizationSectionProps {
  data: any;
  onUpdate: (data: any) => void;
}

const SettingsCustomizationSection: React.FC<SettingsCustomizationSectionProps> = ({ data, onUpdate }) => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    studyHours: data.studyHours || '6',
    studyDays: data.studyDays || '6',
    learningPace: data.learningPace || 'moderate',
    weekendOff: data.weekendOff || false,
    autoAdjustment: data.autoAdjustment || true,
    revisionFrequency: data.revisionFrequency || 'weekly',
    subjectRotation: data.subjectRotation || 'daily',
    breakDuration: data.breakDuration || '15',
    studyReminders: data.studyReminders || true
  });

  const handleSettingChange = (key: string, value: any) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
  };

  const saveSettings = () => {
    onUpdate(settings);
    toast({
      title: "Settings Updated",
      description: "Your study plan settings have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-gray-600" />
            Study Plan Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="study-hours">Daily Study Hours</Label>
              <Select value={settings.studyHours} onValueChange={(value) => handleSettingChange('studyHours', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">4 hours</SelectItem>
                  <SelectItem value="6">6 hours</SelectItem>
                  <SelectItem value="8">8 hours</SelectItem>
                  <SelectItem value="10">10 hours</SelectItem>
                  <SelectItem value="12">12 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="study-days">Study Days per Week</Label>
              <Select value={settings.studyDays} onValueChange={(value) => handleSettingChange('studyDays', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 days</SelectItem>
                  <SelectItem value="6">6 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="learning-pace">Learning Pace</Label>
              <Select value={settings.learningPace} onValueChange={(value) => handleSettingChange('learningPace', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow">Slow & Steady</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="revision-frequency">Revision Frequency</Label>
              <Select value={settings.revisionFrequency} onValueChange={(value) => handleSettingChange('revisionFrequency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="biweekly">Bi-weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject-rotation">Subject Rotation</Label>
              <Select value={settings.subjectRotation} onValueChange={(value) => handleSettingChange('subjectRotation', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily Rotation</SelectItem>
                  <SelectItem value="weekly">Weekly Blocks</SelectItem>
                  <SelectItem value="mixed">Mixed Approach</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="break-duration">Break Duration (minutes)</Label>
              <Select value={settings.breakDuration} onValueChange={(value) => handleSettingChange('breakDuration', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="20">20 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4 border-t pt-6">
            <h4 className="font-medium text-lg">Preferences</h4>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weekend-off">Weekend Off</Label>
                <p className="text-sm text-gray-600">Take weekends off from studying</p>
              </div>
              <Switch
                id="weekend-off"
                checked={settings.weekendOff}
                onCheckedChange={(value) => handleSettingChange('weekendOff', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-adjustment">Auto-Adjustment</Label>
                <p className="text-sm text-gray-600">Automatically adjust plan based on performance</p>
              </div>
              <Switch
                id="auto-adjustment"
                checked={settings.autoAdjustment}
                onCheckedChange={(value) => handleSettingChange('autoAdjustment', value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="study-reminders">Study Reminders</Label>
                <p className="text-sm text-gray-600">Get notifications for study sessions</p>
              </div>
              <Switch
                id="study-reminders"
                checked={settings.studyReminders}
                onCheckedChange={(value) => handleSettingChange('studyReminders', value)}
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={saveSettings} className="flex-1">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset to Default
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsCustomizationSection;
