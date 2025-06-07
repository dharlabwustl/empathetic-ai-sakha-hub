
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Settings, Clock, Calendar, Target, BookOpen, Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SettingsCustomizationSection = () => {
  const { toast } = useToast();
  
  const [settings, setSettings] = useState({
    studyHoursPerDay: 6,
    availableDaysPerWeek: 6,
    learningPace: 'medium',
    preferredStudyTime: 'evening',
    preferredSubjectsPerDay: 2,
    weekendOff: true,
    revisionDays: 2,
    subjectRotation: 'daily',
    breakDuration: 15,
    reminderEnabled: true,
    autoAdjustment: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your study plan preferences have been updated successfully.",
    });
  };

  const handleResetSettings = () => {
    setSettings({
      studyHoursPerDay: 6,
      availableDaysPerWeek: 6,
      learningPace: 'medium',
      preferredStudyTime: 'evening',
      preferredSubjectsPerDay: 2,
      weekendOff: true,
      revisionDays: 2,
      subjectRotation: 'daily',
      breakDuration: 15,
      reminderEnabled: true,
      autoAdjustment: true
    });
    toast({
      title: "Settings Reset",
      description: "All settings have been restored to default values.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Study Plan Customization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Study Hours & Days */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  Study Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="studyHours">Study Hours per Day</Label>
                  <Input
                    id="studyHours"
                    type="number"
                    min="1"
                    max="12"
                    value={settings.studyHoursPerDay}
                    onChange={(e) => handleSettingChange('studyHoursPerDay', parseInt(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="availableDays">Available Days per Week</Label>
                  <Input
                    id="availableDays"
                    type="number"
                    min="1"
                    max="7"
                    value={settings.availableDaysPerWeek}
                    onChange={(e) => handleSettingChange('availableDaysPerWeek', parseInt(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="preferredTime">Preferred Study Time</Label>
                  <Select 
                    value={settings.preferredStudyTime} 
                    onValueChange={(value) => handleSettingChange('preferredStudyTime', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (6AM - 12PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (12PM - 6PM)</SelectItem>
                      <SelectItem value="evening">Evening (6PM - 10PM)</SelectItem>
                      <SelectItem value="night">Night (10PM - 2AM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="weekendOff">Weekend Off</Label>
                  <Switch
                    id="weekendOff"
                    checked={settings.weekendOff}
                    onCheckedChange={(checked) => handleSettingChange('weekendOff', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Learning Preferences */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="h-4 w-4 text-green-600" />
                  Learning Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="learningPace">Learning Pace</Label>
                  <Select 
                    value={settings.learningPace} 
                    onValueChange={(value) => handleSettingChange('learningPace', value)}
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
                  <Label htmlFor="subjectsPerDay">Subjects per Day</Label>
                  <Input
                    id="subjectsPerDay"
                    type="number"
                    min="1"
                    max="3"
                    value={settings.preferredSubjectsPerDay}
                    onChange={(e) => handleSettingChange('preferredSubjectsPerDay', parseInt(e.target.value))}
                  />
                </div>

                <div>
                  <Label htmlFor="subjectRotation">Subject Rotation</Label>
                  <Select 
                    value={settings.subjectRotation} 
                    onValueChange={(value) => handleSettingChange('subjectRotation', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily Rotation</SelectItem>
                      <SelectItem value="weekly">Weekly Focus</SelectItem>
                      <SelectItem value="topic-based">Topic-based</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="revisionDays">Revision Days per Week</Label>
                  <Input
                    id="revisionDays"
                    type="number"
                    min="0"
                    max="7"
                    value={settings.revisionDays}
                    onChange={(e) => handleSettingChange('revisionDays', parseInt(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Break & Notification Settings */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-4 w-4 text-purple-600" />
                  Notifications & Breaks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="breakDuration">Break Duration (minutes)</Label>
                  <Input
                    id="breakDuration"
                    type="number"
                    min="5"
                    max="60"
                    value={settings.breakDuration}
                    onChange={(e) => handleSettingChange('breakDuration', parseInt(e.target.value))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="reminderEnabled">Study Reminders</Label>
                  <Switch
                    id="reminderEnabled"
                    checked={settings.reminderEnabled}
                    onCheckedChange={(checked) => handleSettingChange('reminderEnabled', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="autoAdjustment">Auto Plan Adjustment</Label>
                  <Switch
                    id="autoAdjustment"
                    checked={settings.autoAdjustment}
                    onCheckedChange={(checked) => handleSettingChange('autoAdjustment', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Current Settings Summary */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-orange-600" />
                  Current Configuration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Daily Study Hours:</span>
                    <Badge variant="outline">{settings.studyHoursPerDay}h</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Weekly Study Days:</span>
                    <Badge variant="outline">{settings.availableDaysPerWeek} days</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Learning Pace:</span>
                    <Badge variant="outline" className="capitalize">{settings.learningPace}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Study Time:</span>
                    <Badge variant="outline" className="capitalize">{settings.preferredStudyTime}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Subjects/Day:</span>
                    <Badge variant="outline">{settings.preferredSubjectsPerDay}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Weekend Off:</span>
                    <Badge variant={settings.weekendOff ? "default" : "secondary"}>
                      {settings.weekendOff ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 mt-6">
            <Button onClick={handleSaveSettings} className="flex-1">
              <Settings className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
            <Button variant="outline" onClick={handleResetSettings}>
              Reset to Default
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
