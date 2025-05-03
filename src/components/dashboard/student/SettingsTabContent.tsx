
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, FileText, ShieldCheck, Settings as SettingsIcon, Volume2 } from "lucide-react";
import VoiceSettingsTab from './settings/VoiceSettingsTab';
import { VoiceAnnouncerProvider } from './voice/VoiceAnnouncer';

interface SettingsTabContentProps {
  userProfile?: {
    name: string;
    email: string;
    avatar?: string;
    phone?: string;
    bio?: string;
  };
}

const SettingsTabContent: React.FC<SettingsTabContentProps> = ({ userProfile }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [studyReminders, setStudyReminders] = useState(true);
  const [formValues, setFormValues] = useState({
    name: userProfile?.name || "",
    email: userProfile?.email || "",
    phone: userProfile?.phone || "",
    bio: userProfile?.bio || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = () => {
    console.log("Saving profile:", formValues);
    // In a real app, you'd save to backend here
  };

  return (
    <VoiceAnnouncerProvider>
      <Card className="border-none shadow-none">
        <CardHeader className="px-0">
          <CardTitle className="text-xl font-semibold">Settings</CardTitle>
          <CardDescription>
            Manage your account settings and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <Avatar className="h-4 w-4">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                Profile
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="voice" className="flex items-center gap-2">
                <Volume2 className="h-4 w-4" />
                Voice
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="general" className="flex items-center gap-2">
                <SettingsIcon className="h-4 w-4" />
                General
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center mb-6">
                    <Avatar className="h-20 w-20">
                      {userProfile?.avatar ? (
                        <AvatarImage src={userProfile.avatar} />
                      ) : (
                        <AvatarFallback className="text-2xl">
                          {userProfile?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formValues.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formValues.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us a bit about yourself"
                        className="resize-none"
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Enable Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about your activity
                      </p>
                    </div>
                    <Switch
                      checked={notificationEnabled}
                      onCheckedChange={setNotificationEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Email Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive updates about your progress via email
                      </p>
                    </div>
                    <Switch
                      checked={emailUpdates}
                      onCheckedChange={setEmailUpdates}
                      disabled={!notificationEnabled}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Study Reminders</Label>
                      <p className="text-sm text-muted-foreground">
                        Get reminders about your scheduled study sessions
                      </p>
                    </div>
                    <Switch
                      checked={studyReminders}
                      onCheckedChange={setStudyReminders}
                      disabled={!notificationEnabled}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Notification Frequency</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="daily">Daily Digest</SelectItem>
                        <SelectItem value="weekly">Weekly Summary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Notification Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="voice" className="space-y-4">
              <VoiceSettingsTab />
            </TabsContent>

            <TabsContent value="privacy" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Manage your privacy preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Data Sharing</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow anonymized data to be used for improving our service
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Show Profile Progress</Label>
                      <p className="text-sm text-muted-foreground">
                        Show your progress and achievements to other students
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <Label>Download Your Data</Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Download a copy of all the data we have about you
                    </p>
                    <Button variant="outline" className="w-full sm:w-auto">
                      <FileText className="h-4 w-4 mr-2" />
                      Download Personal Data
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Configure your general preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="ta">Tamil</SelectItem>
                        <SelectItem value="te">Telugu</SelectItem>
                        <SelectItem value="bn">Bengali</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Time Zone</Label>
                    <Select defaultValue="ist">
                      <SelectTrigger>
                        <SelectValue placeholder="Select time zone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ist">India Standard Time (IST)</SelectItem>
                        <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                        <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Use dark mode for all screens
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save General Settings</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </VoiceAnnouncerProvider>
  );
};

export default SettingsTabContent;
