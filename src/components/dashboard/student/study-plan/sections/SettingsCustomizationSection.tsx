
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Save, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const SettingsCustomizationSection = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    studyHoursPerDay: 6,
    availableDaysPerWeek: 6,
    learningPace: 'medium',
    weekendOff: true,
    revisionDays: 2,
    subjectRotation: 'daily',
    breakTime: 15,
    focusSessionLength: 45
  });

  const handleSaveSettings = () => {
    // Save settings logic here
    toast({
      title: "Settings Updated",
      description: "Your study plan settings have been successfully updated.",
    });
  };

  const handleResetSettings = () => {
    setSettings({
      studyHoursPerDay: 6,
      availableDaysPerWeek: 6,
      learningPace: 'medium',
      weekendOff: true,
      revisionDays: 2,
      subjectRotation: 'daily',
      breakTime: 15,
      focusSessionLength: 45
    });
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Study Schedule</h3>
              
              <div className="space-y-2">
                <Label htmlFor="studyHours">Study Hours per Day</Label>
                <Input
                  id="studyHours"
                  type="number"
                  min="1"
                  max="12"
                  value={settings.studyHoursPerDay}
                  onChange={(e) => setSettings({...settings, studyHoursPerDay: parseInt(e.target.value)})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="availableDays">Available Days per Week</Label>
                <Input
                  id="availableDays"
                  type="number"
                  min="1"
                  max="7"
                  value={settings.availableDaysPerWeek}
                  onChange={(e) => setSettings({...settings, availableDaysPerWeek: parseInt(e.target.value)})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="learningPace">Learning Pace</Label>
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
              
              <div className="flex items-center justify-between">
                <Label htmlFor="weekendOff">Weekend Off</Label>
                <Switch
                  id="weekendOff"
                  checked={settings.weekendOff}
                  onCheckedChange={(checked) => setSettings({...settings, weekendOff: checked})}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Study Preferences</h3>
              
              <div className="space-y-2">
                <Label htmlFor="revisionDays">Revision Days per Week</Label>
                <Input
                  id="revisionDays"
                  type="number"
                  min="0"
                  max="3"
                  value={settings.revisionDays}
                  onChange={(e) => setSettings({...settings, revisionDays: parseInt(e.target.value)})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subjectRotation">Subject Rotation</Label>
                <Select 
                  value={settings.subjectRotation} 
                  onValueChange={(value) => setSettings({...settings, subjectRotation: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily Rotation</SelectItem>
                    <SelectItem value="weekly">Weekly Focus</SelectItem>
                    <SelectItem value="mixed">Mixed Approach</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="focusSession">Focus Session Length (minutes)</Label>
                <Input
                  id="focusSession"
                  type="number"
                  min="25"
                  max="90"
                  value={settings.focusSessionLength}
                  onChange={(e) => setSettings({...settings, focusSessionLength: parseInt(e.target.value)})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="breakTime">Break Time (minutes)</Label>
                <Input
                  id="breakTime"
                  type="number"
                  min="5"
                  max="30"
                  value={settings.breakTime}
                  onChange={(e) => setSettings({...settings, breakTime: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <Button onClick={handleSaveSettings} className="bg-green-600 hover:bg-green-700">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
            <Button variant="outline" onClick={handleResetSettings}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Default
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
