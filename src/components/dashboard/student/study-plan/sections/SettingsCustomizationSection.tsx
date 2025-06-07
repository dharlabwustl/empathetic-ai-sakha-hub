
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Settings, Bell, Calendar, Clock, Brain, Save } from 'lucide-react';

export const SettingsCustomizationSection = () => {
  const [settings, setSettings] = useState({
    notifications: {
      studyReminders: true,
      achievementAlerts: true,
      weeklyReports: false,
      examReminders: true
    },
    study: {
      sessionDuration: 60,
      breakDuration: 15,
      dailyTarget: 6,
      weeklyTarget: 40,
      adaptiveDifficulty: true,
      autoReschedule: true
    },
    preferences: {
      theme: 'light',
      language: 'en',
      timezone: 'Asia/Kolkata',
      dateFormat: 'DD/MM/YYYY'
    },
    ai: {
      recommendationFrequency: 'daily',
      aiCoaching: true,
      performanceAnalysis: true,
      adaptivePlanning: true
    }
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Here you would typically save to localStorage or send to API
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
          <div className="space-y-8">
            {/* Notification Settings */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="study-reminders">Study Session Reminders</Label>
                    <p className="text-sm text-gray-600">Get notified before scheduled study sessions</p>
                  </div>
                  <Switch
                    id="study-reminders"
                    checked={settings.notifications.studyReminders}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, studyReminders: checked }
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="achievement-alerts">Achievement Alerts</Label>
                    <p className="text-sm text-gray-600">Celebrate your milestones and achievements</p>
                  </div>
                  <Switch
                    id="achievement-alerts"
                    checked={settings.notifications.achievementAlerts}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, achievementAlerts: checked }
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-reports">Weekly Progress Reports</Label>
                    <p className="text-sm text-gray-600">Receive detailed weekly performance summaries</p>
                  </div>
                  <Switch
                    id="weekly-reports"
                    checked={settings.notifications.weeklyReports}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, weeklyReports: checked }
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="exam-reminders">Exam Date Reminders</Label>
                    <p className="text-sm text-gray-600">Important exam date and preparation reminders</p>
                  </div>
                  <Switch
                    id="exam-reminders"
                    checked={settings.notifications.examReminders}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        notifications: { ...prev.notifications, examReminders: checked }
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* Study Settings */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Study Session Settings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="session-duration">Default Session Duration (minutes)</Label>
                  <div className="mt-2">
                    <Slider
                      value={[settings.study.sessionDuration]}
                      onValueChange={(value) => 
                        setSettings(prev => ({
                          ...prev,
                          study: { ...prev.study, sessionDuration: value[0] }
                        }))
                      }
                      max={120}
                      min={15}
                      step={15}
                    />
                    <div className="text-sm text-gray-600 mt-1">
                      {settings.study.sessionDuration} minutes
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="break-duration">Break Duration (minutes)</Label>
                  <div className="mt-2">
                    <Slider
                      value={[settings.study.breakDuration]}
                      onValueChange={(value) => 
                        setSettings(prev => ({
                          ...prev,
                          study: { ...prev.study, breakDuration: value[0] }
                        }))
                      }
                      max={30}
                      min={5}
                      step={5}
                    />
                    <div className="text-sm text-gray-600 mt-1">
                      {settings.study.breakDuration} minutes
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="daily-target">Daily Study Target (hours)</Label>
                  <Input
                    id="daily-target"
                    type="number"
                    value={settings.study.dailyTarget}
                    onChange={(e) => 
                      setSettings(prev => ({
                        ...prev,
                        study: { ...prev.study, dailyTarget: parseInt(e.target.value) }
                      }))
                    }
                    min="1"
                    max="12"
                  />
                </div>
                
                <div>
                  <Label htmlFor="weekly-target">Weekly Study Target (hours)</Label>
                  <Input
                    id="weekly-target"
                    type="number"
                    value={settings.study.weeklyTarget}
                    onChange={(e) => 
                      setSettings(prev => ({
                        ...prev,
                        study: { ...prev.study, weeklyTarget: parseInt(e.target.value) }
                      }))
                    }
                    min="5"
                    max="70"
                  />
                </div>
              </div>
              
              <div className="space-y-4 mt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="adaptive-difficulty">Adaptive Difficulty</Label>
                    <p className="text-sm text-gray-600">Automatically adjust question difficulty based on performance</p>
                  </div>
                  <Switch
                    id="adaptive-difficulty"
                    checked={settings.study.adaptiveDifficulty}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        study: { ...prev.study, adaptiveDifficulty: checked }
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-reschedule">Auto-Reschedule Missed Sessions</Label>
                    <p className="text-sm text-gray-600">Automatically reschedule missed study sessions</p>
                  </div>
                  <Switch
                    id="auto-reschedule"
                    checked={settings.study.autoReschedule}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        study: { ...prev.study, autoReschedule: checked }
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* AI & Personalization Settings */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Brain className="h-4 w-4" />
                AI & Personalization
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="recommendation-frequency">AI Recommendation Frequency</Label>
                  <Select
                    value={settings.ai.recommendationFrequency}
                    onValueChange={(value) => 
                      setSettings(prev => ({
                        ...prev,
                        ai: { ...prev.ai, recommendationFrequency: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="manual">Manual only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ai-coaching">AI Coaching</Label>
                    <p className="text-sm text-gray-600">Get personalized coaching tips and strategies</p>
                  </div>
                  <Switch
                    id="ai-coaching"
                    checked={settings.ai.aiCoaching}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        ai: { ...prev.ai, aiCoaching: checked }
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="performance-analysis">Performance Analysis</Label>
                    <p className="text-sm text-gray-600">Detailed AI-powered performance insights</p>
                  </div>
                  <Switch
                    id="performance-analysis"
                    checked={settings.ai.performanceAnalysis}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        ai: { ...prev.ai, performanceAnalysis: checked }
                      }))
                    }
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="adaptive-planning">Adaptive Study Planning</Label>
                    <p className="text-sm text-gray-600">Let AI automatically adjust your study plan</p>
                  </div>
                  <Switch
                    id="adaptive-planning"
                    checked={settings.ai.adaptivePlanning}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({
                        ...prev,
                        ai: { ...prev.ai, adaptivePlanning: checked }
                      }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* General Preferences */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                General Preferences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="theme">Theme</Label>
                  <Select
                    value={settings.preferences.theme}
                    onValueChange={(value) => 
                      setSettings(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, theme: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="auto">Auto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="language">Language</Label>
                  <Select
                    value={settings.preferences.language}
                    onValueChange={(value) => 
                      setSettings(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, language: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                      <SelectItem value="te">Telugu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={settings.preferences.timezone}
                    onValueChange={(value) => 
                      setSettings(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, timezone: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select
                    value={settings.preferences.dateFormat}
                    onValueChange={(value) => 
                      setSettings(prev => ({
                        ...prev,
                        preferences: { ...prev.preferences, dateFormat: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t">
              <Button onClick={handleSave} className="flex items-center gap-2">
                <Save className="h-4 w-4" />
                Save Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
