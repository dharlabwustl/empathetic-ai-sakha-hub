
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Settings, Clock, Calendar, RotateCcw, Zap } from "lucide-react";

const SettingsCustomizationSection = () => {
  const [settings, setSettings] = useState({
    studyHours: 6,
    studyDays: 6,
    pace: "Moderate",
    weekendOff: false,
    subjectRotation: "Daily",
    revisionDays: 2,
    reminderEnabled: true,
    autoAdjust: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-gray-600" />
          ⚙️ Settings & Customization
        </CardTitle>
        <p className="text-sm text-gray-600">
          Customize your study plan preferences and behavior
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              Study Time Settings
            </h3>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Daily Study Hours: {settings.studyHours}h</Label>
                <div className="mt-2">
                  <Slider
                    value={[settings.studyHours]}
                    onValueChange={(value) => handleSettingChange('studyHours', value[0])}
                    max={12}
                    min={2}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>2h</span>
                  <span>12h</span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Study Days per Week</Label>
                <Select 
                  value={settings.studyDays.toString()} 
                  onValueChange={(value) => handleSettingChange('studyDays', parseInt(value))}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 days</SelectItem>
                    <SelectItem value="6">6 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Learning Pace</Label>
                <Select 
                  value={settings.pace} 
                  onValueChange={(value) => handleSettingChange('pace', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Slow">Slow & Steady</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-green-600" />
              Schedule Preferences
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="weekend-off" className="text-sm font-medium">
                  Weekend Off Toggle
                </Label>
                <Switch
                  id="weekend-off"
                  checked={settings.weekendOff}
                  onCheckedChange={(checked) => handleSettingChange('weekendOff', checked)}
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Subject Rotation</Label>
                <Select 
                  value={settings.subjectRotation} 
                  onValueChange={(value) => handleSettingChange('subjectRotation', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daily">Daily Rotation</SelectItem>
                    <SelectItem value="Weekly">Weekly Focus</SelectItem>
                    <SelectItem value="Custom">Custom Pattern</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Revision Days per Week: {settings.revisionDays}</Label>
                <div className="mt-2">
                  <Slider
                    value={[settings.revisionDays]}
                    onValueChange={(value) => handleSettingChange('revisionDays', value[0])}
                    max={4}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 day</span>
                  <span>4 days</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-4">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-purple-600" />
            Advanced Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Auto-adjust based on performance</Label>
                <p className="text-xs text-gray-600">Automatically modify study plan based on test scores</p>
              </div>
              <Switch
                checked={settings.autoAdjust}
                onCheckedChange={(checked) => handleSettingChange('autoAdjust', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-sm font-medium">Smart Reminders</Label>
                <p className="text-xs text-gray-600">Get personalized study reminders</p>
              </div>
              <Switch
                checked={settings.reminderEnabled}
                onCheckedChange={(checked) => handleSettingChange('reminderEnabled', checked)}
              />
            </div>
          </div>
        </Card>

        <div className="flex justify-between items-center pt-4">
          <Button variant="outline" className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4" />
            Reset to Default
          </Button>
          <div className="flex gap-3">
            <Button variant="outline">
              Preview Changes
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Save All Settings
            </Button>
          </div>
        </div>

        <Card className="p-4 bg-blue-50 border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">Current Configuration Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="text-blue-600 font-medium">{settings.studyHours}h/day</div>
              <div className="text-blue-700">Study Time</div>
            </div>
            <div>
              <div className="text-blue-600 font-medium">{settings.studyDays} days</div>
              <div className="text-blue-700">Per Week</div>
            </div>
            <div>
              <div className="text-blue-600 font-medium">{settings.pace}</div>
              <div className="text-blue-700">Pace</div>
            </div>
            <div>
              <div className="text-blue-600 font-medium">{settings.revisionDays} days</div>
              <div className="text-blue-700">Revision</div>
            </div>
          </div>
        </Card>
      </CardContent>
    </Card>
  );
};

export default SettingsCustomizationSection;
