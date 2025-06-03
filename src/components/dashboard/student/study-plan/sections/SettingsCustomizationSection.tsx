
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Settings, Bell, Clock, Target } from 'lucide-react';

export const SettingsCustomizationSection = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Study Plan Settings & Customization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Study Preferences */}
            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Study Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Daily Study Hours</p>
                    <p className="text-sm text-gray-600">Adjust your daily study target</p>
                  </div>
                  <div className="w-32">
                    <Slider defaultValue={[6]} max={12} min={2} step={1} />
                    <p className="text-xs text-center mt-1">6 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekend Study</p>
                    <p className="text-sm text-gray-600">Include weekends in study plan</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Adaptive Scheduling</p>
                    <p className="text-sm text-gray-600">AI adjusts plan based on performance</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Study Reminders</p>
                    <p className="text-sm text-gray-600">Get notified about study sessions</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Progress Updates</p>
                    <p className="text-sm text-gray-600">Weekly progress summaries</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">AI Recommendations</p>
                    <p className="text-sm text-gray-600">Receive AI-powered study tips</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>

            {/* Time Preferences */}
            <div>
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Study Time Preferences
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto py-3">
                  <div className="text-center">
                    <p className="font-medium">Morning</p>
                    <p className="text-xs text-gray-600">6:00 - 10:00 AM</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-3">
                  <div className="text-center">
                    <p className="font-medium">Afternoon</p>
                    <p className="text-xs text-gray-600">2:00 - 6:00 PM</p>
                  </div>
                </Button>
                <Button variant="default" className="h-auto py-3 bg-blue-600">
                  <div className="text-center">
                    <p className="font-medium">Evening</p>
                    <p className="text-xs">6:00 - 10:00 PM</p>
                  </div>
                </Button>
                <Button variant="outline" className="h-auto py-3">
                  <div className="text-center">
                    <p className="font-medium">Night</p>
                    <p className="text-xs text-gray-600">10:00 PM - 2:00 AM</p>
                  </div>
                </Button>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                Save Settings
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
