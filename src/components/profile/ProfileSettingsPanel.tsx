
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  KeyIcon, 
  BellIcon,
  ShieldCheckIcon,
  EyeIcon,
  MailIcon,
  ClockIcon
} from "lucide-react";
import { UserProfileType } from "@/types/user/base";
import { useToast } from "@/hooks/use-toast";

interface ProfileSettingsPanelProps {
  userProfile: UserProfileType;
  onUpdateProfile: (updates: Partial<UserProfileType>) => void;
}

export const ProfileSettingsPanel = ({ 
  userProfile, 
  onUpdateProfile 
}: ProfileSettingsPanelProps) => {
  const [notificationSettings, setNotificationSettings] = useState({
    studyReminders: userProfile.preferences?.studyReminders ?? true,
    emailNotifications: userProfile.preferences?.emailNotifications ?? true,
    darkMode: userProfile.preferences?.darkMode ?? false,
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const { toast } = useToast();
  
  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => {
      const newSettings = { 
        ...prev, 
        [key]: !prev[key] 
      };
      
      // Update profile preferences
      onUpdateProfile({
        preferences: {
          ...userProfile.preferences,
          [key]: newSettings[key]
        }
      });
      
      return newSettings;
    });
  };
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirmation must match",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, this would call an API to change the password
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully",
    });
    
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };
  
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyIcon className="h-5 w-5 text-primary" />
            <span>Security Settings</span>
          </CardTitle>
          <CardDescription>
            Update your password and security preferences
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordInput}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordInput}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordInput}
                required
              />
            </div>
            
            <Button type="submit">Change Password</Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellIcon className="h-5 w-5 text-primary" />
            <span>Notification Settings</span>
          </CardTitle>
          <CardDescription>
            Configure how and when you receive notifications
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <ClockIcon className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="studyReminders">Study Reminders</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Receive reminders for your scheduled study sessions
                </p>
              </div>
              <Switch
                id="studyReminders"
                checked={notificationSettings.studyReminders}
                onCheckedChange={() => handleNotificationChange('studyReminders')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <MailIcon className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Receive important updates and announcements via email
                </p>
              </div>
              <Switch
                id="emailNotifications"
                checked={notificationSettings.emailNotifications}
                onCheckedChange={() => handleNotificationChange('emailNotifications')}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <EyeIcon className="h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="darkMode">Dark Mode</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  Use dark mode for better readability in low light
                </p>
              </div>
              <Switch
                id="darkMode"
                checked={notificationSettings.darkMode}
                onCheckedChange={() => handleNotificationChange('darkMode')}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheckIcon className="h-5 w-5 text-primary" />
            <span>Privacy Settings</span>
          </CardTitle>
          <CardDescription>
            Control your privacy and data sharing preferences
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="dataSharing">Data Sharing</Label>
                <p className="text-sm text-muted-foreground">
                  Allow anonymous usage data to improve our services
                </p>
              </div>
              <Switch id="dataSharing" defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="profileVisibility">Profile Visibility</Label>
                <p className="text-sm text-muted-foreground">
                  Allow other students to see your profile in groups and forums
                </p>
              </div>
              <Switch id="profileVisibility" defaultChecked />
            </div>
            
            <Separator />
            
            <div>
              <Button variant="destructive">Delete Account</Button>
              <p className="text-xs text-muted-foreground mt-2">
                This will permanently delete your account and all associated data
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
