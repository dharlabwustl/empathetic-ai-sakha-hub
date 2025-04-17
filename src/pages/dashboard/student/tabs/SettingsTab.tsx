
import React, { useState } from 'react';
import { UserProfileType } from "@/types/user";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bell, Clock, Shield, UserCircle, Palette, Globe } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface SettingsTabProps {
  userProfile: UserProfileType;
}

const SettingsTab: React.FC<SettingsTabProps> = ({ userProfile }) => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [studyReminders, setStudyReminders] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Account Settings</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <UserCircle className="h-5 w-5 mr-2" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium block">Full Name</label>
                <input 
                  type="text" 
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2" 
                  defaultValue={userProfile.name || ''} 
                />
              </div>
              <div>
                <label className="text-sm font-medium block">Email</label>
                <input 
                  type="email" 
                  className="mt-1 w-full rounded border border-gray-300 px-3 py-2" 
                  defaultValue={userProfile.email || ''} 
                  readOnly 
                />
              </div>
              {'grade' in userProfile && (
                <div>
                  <label className="text-sm font-medium block">Grade/Class</label>
                  <input 
                    type="text" 
                    className="mt-1 w-full rounded border border-gray-300 px-3 py-2" 
                    defaultValue={userProfile.grade || ''} 
                  />
                </div>
              )}
              <Button className="w-full">Update Profile</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Bell className="h-5 w-5 mr-2" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive emails about your account activity
                  </p>
                </div>
                <Switch 
                  checked={emailNotifications} 
                  onCheckedChange={setEmailNotifications} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications in-app
                  </p>
                </div>
                <Switch 
                  checked={pushNotifications} 
                  onCheckedChange={setPushNotifications} 
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Study Reminders</p>
                  <p className="text-sm text-muted-foreground">
                    Daily reminders for scheduled study sessions
                  </p>
                </div>
                <Switch 
                  checked={studyReminders} 
                  onCheckedChange={setStudyReminders} 
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Shield className="h-5 w-5 mr-2" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Button variant="outline" className="w-full">
                  Change Password
                </Button>
              </div>
              <div>
                <Button variant="outline" className="w-full">
                  Two-Factor Authentication
                </Button>
              </div>
              <div>
                <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-lg">
              <Palette className="h-5 w-5 mr-2" />
              Appearance & Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">
                    Toggle dark mode interface
                  </p>
                </div>
                <Switch 
                  checked={darkMode} 
                  onCheckedChange={setDarkMode} 
                />
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-1">Timezone</label>
                <select 
                  className="w-full rounded border border-gray-300 px-3 py-2"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  <option value="Asia/Kolkata">(GMT+5:30) India Standard Time</option>
                  <option value="UTC">(GMT+0) Coordinated Universal Time</option>
                  <option value="America/New_York">(GMT-5) Eastern Time</option>
                  <option value="America/Los_Angeles">(GMT-8) Pacific Time</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsTab;
