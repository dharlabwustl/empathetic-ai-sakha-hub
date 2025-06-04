
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { 
  Settings, 
  Clock, 
  Calendar,
  Target,
  Save
} from 'lucide-react';

export const SettingsCustomizationSection = () => {
  const [settings, setSettings] = useState({
    studyHoursPerDay: 6,
    learningPace: 'medium',
    weekendOff: false,
    autoAdjustment: true,
    revisionFrequency: 'weekly',
    breakDuration: 15,
    notificationsEnabled: true,
    dailyReminders: true
  });

  const handleSaveSettings = () => {
    // Save settings logic here
    console.log('Settings saved:', settings);
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
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="studyHours" className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4" />
                  Study Hours per Day
                </Label>
                <div className="space-y-2">
                  <Slider
                    id="studyHours"
                    value={[settings.studyHoursPerDay]}
                    onValueChange={(value) => setSettings({...settings, studyHoursPerDay: value[0]})}
                    max={12}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="text-sm text-gray-600 text-center">
                    {settings.studyHoursPerDay} hours
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="learningPace" className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4" />
                  Learning Pace
                </Label>
                <Select 
                  value={settings.learningPace} 
                  onValueChange={(value) => setSettings({...settings, learningPace: value})}
                >
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

              <div>
                <Label htmlFor="revisionFreq" className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4" />
                  Revision Frequency
                </Label>
                <Select 
                  value={settings.revisionFrequency} 
                  onValueChange={(value) => setSettings({...settings, revisionFrequency: value})}
                >
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

              <div>
                <Label htmlFor="breakDuration" className="mb-2 block">
                  Break Duration (minutes)
                </Label>
                <Input
                  id="breakDuration"
                  type="number"
                  value={settings.breakDuration}
                  onChange={(e) => setSettings({...settings, breakDuration: parseInt(e.target.value)})}
                  min={5}
                  max={60}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="weekendOff">Weekend Off</Label>
                <Switch
                  id="weekendOff"
                  checked={settings.weekendOff}
                  onCheckedChange={(checked) => setSettings({...settings, weekendOff: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="autoAdjust">Auto-Adjustment</Label>
                <Switch
                  id="autoAdjust"
                  checked={settings.autoAdjustment}
                  onCheckedChange={(checked) => setSettings({...settings, autoAdjustment: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Notifications</Label>
                <Switch
                  id="notifications"
                  checked={settings.notificationsEnabled}
                  onCheckedChange={(checked) => setSettings({...settings, notificationsEnabled: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="dailyReminders">Daily Reminders</Label>
                <Switch
                  id="dailyReminders"
                  checked={settings.dailyReminders}
                  onCheckedChange={(checked) => setSettings({...settings, dailyReminders: checked})}
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <Button onClick={handleSaveSettings} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium mb-2">Auto-Adjustment Features</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Plan automatically adjusts based on your performance</li>
              <li>• Weak subjects get more time allocation</li>
              <li>• Study schedule adapts to your completion patterns</li>
              <li>• Break reminders based on study intensity</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
