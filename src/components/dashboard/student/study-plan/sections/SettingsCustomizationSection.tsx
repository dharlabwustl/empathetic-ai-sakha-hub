
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Clock, Calendar, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SettingsCustomizationSection = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    weekendOff: true,
    autoAdjust: true,
    reminderNotifications: true,
    learningPace: 'medium',
    studyHoursPerDay: 6,
    revisionFrequency: 'weekly'
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your study plan settings have been updated successfully.",
    });
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Schedule Settings */}
            <div className="space-y-6">
              <h3 className="font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Schedule Settings
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="weekend-off">Weekend Off</Label>
                  <Switch
                    id="weekend-off"
                    checked={settings.weekendOff}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, weekendOff: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-adjust">Auto-adjust Plan</Label>
                  <Switch
                    id="auto-adjust"
                    checked={settings.autoAdjust}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoAdjust: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="reminders">Reminder Notifications</Label>
                  <Switch
                    id="reminders"
                    checked={settings.reminderNotifications}
                    onCheckedChange={(checked) => setSettings(prev => ({ ...prev, reminderNotifications: checked }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Learning Pace</Label>
                  <Select value={settings.learningPace} onValueChange={(value) => setSettings(prev => ({ ...prev, learningPace: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">Slow & Steady</SelectItem>
                      <SelectItem value="medium">Moderate</SelectItem>
                      <SelectItem value="fast">Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Study Configuration */}
            <div className="space-y-6">
              <h3 className="font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Study Configuration
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Daily Study Hours</Label>
                  <Select value={settings.studyHoursPerDay.toString()} onValueChange={(value) => setSettings(prev => ({ ...prev, studyHoursPerDay: parseInt(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="5">5 hours</SelectItem>
                      <SelectItem value="6">6 hours</SelectItem>
                      <SelectItem value="7">7 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Revision Frequency</Label>
                  <Select value={settings.revisionFrequency} onValueChange={(value) => setSettings(prev => ({ ...prev, revisionFrequency: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <Button onClick={handleSave} className="w-full">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Save & Apply Changes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
