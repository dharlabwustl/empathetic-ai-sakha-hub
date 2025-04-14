
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { User, Settings, Bell, Lock, Key, BookOpen, Bookmark, Calendar } from "lucide-react";

const StudentProfile = ({ userProfile }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  const [formData, setFormData] = useState({
    name: userProfile?.name || "",
    email: userProfile?.email || "",
    phone: userProfile?.phoneNumber || "",
    class: userProfile?.class || "",
    school: userProfile?.school || "",
    location: userProfile?.location || "",
    parentName: userProfile?.parentName || "",
    parentPhone: userProfile?.parentPhone || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleUpdateProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    });
  };
  
  const handleUpdatePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Password Error",
        description: "New passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully",
    });
    
    // Reset password fields
    setFormData({
      ...formData,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };
  
  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Profile & Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={userProfile?.avatar || ""} />
                <AvatarFallback className="bg-purple-100 text-purple-800 text-2xl">
                  {userProfile?.name?.charAt(0) || "S"}
                </AvatarFallback>
              </Avatar>
              
              <h2 className="text-lg font-medium mb-1">{userProfile?.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{userProfile?.email}</p>
              
              <Button className="w-full mb-2" size="sm">
                Upload New Photo
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                Remove Photo
              </Button>
              
              <div className="w-full mt-6 space-y-1">
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("personal")}>
                  <User className="mr-2 h-4 w-4" />
                  Personal Info
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("academic")}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  Academic Details
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("preferences")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Preferences
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("notifications")}>
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => setActiveTab("security")}>
                  <Lock className="mr-2 h-4 w-4" />
                  Security
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" name="location" value={formData.location} onChange={handleInputChange} />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={handleUpdateProfile}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="academic">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Academic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="class">Class / Grade</Label>
                      <Input id="class" name="class" value={formData.class} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="school">School / Institution</Label>
                      <Input id="school" name="school" value={formData.school} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parentName">Parent/Guardian Name</Label>
                      <Input id="parentName" name="parentName" value={formData.parentName} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="parentPhone">Parent/Guardian Contact</Label>
                      <Input id="parentPhone" name="parentPhone" value={formData.parentPhone} onChange={handleInputChange} />
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={handleUpdateProfile}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Study Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Preferences settings would go here */}
                    <p className="text-gray-500">Customize your study preferences and app experience.</p>
                    
                    {/* Example preferences UI */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Dark Mode</h4>
                          <p className="text-sm text-gray-500">Toggle dark mode on/off</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="dark-mode">Off</Label>
                          <input type="checkbox" id="dark-mode" className="toggle" />
                          <Label htmlFor="dark-mode">On</Label>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Study Timer</h4>
                          <p className="text-sm text-gray-500">Default study session duration</p>
                        </div>
                        <div>
                          <select className="border rounded px-2 py-1">
                            <option>25 minutes</option>
                            <option>45 minutes</option>
                            <option>60 minutes</option>
                            <option>90 minutes</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Language</h4>
                          <p className="text-sm text-gray-500">Interface language</p>
                        </div>
                        <div>
                          <select className="border rounded px-2 py-1">
                            <option>English</option>
                            <option>Hindi</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button>Save Preferences</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Notification Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Notification settings would go here */}
                    <p className="text-gray-500">Control how and when you receive notifications.</p>
                    
                    {/* Example notification settings UI */}
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h4 className="font-medium">Study Reminders</h4>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Daily study reminders</p>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="study-reminder" className="toggle" defaultChecked />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Exam preparation alerts</p>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="exam-reminder" className="toggle" defaultChecked />
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h4 className="font-medium">Content Updates</h4>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">New concept cards</p>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="concept-update" className="toggle" defaultChecked />
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm">Practice test availability</p>
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" id="test-update" className="toggle" defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button>Save Notification Settings</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Password & Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Change Password</h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input 
                            id="currentPassword" 
                            name="currentPassword" 
                            type="password" 
                            value={formData.currentPassword} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input 
                            id="newPassword" 
                            name="newPassword" 
                            type="password" 
                            value={formData.newPassword} 
                            onChange={handleInputChange} 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input 
                            id="confirmPassword" 
                            name="confirmPassword" 
                            type="password" 
                            value={formData.confirmPassword} 
                            onChange={handleInputChange} 
                          />
                        </div>
                      </div>
                      
                      <Button onClick={handleUpdatePassword} className="mt-4">
                        <Key className="mr-2 h-4 w-4" />
                        Update Password
                      </Button>
                    </div>
                    
                    <div className="border-t my-6"></div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Login Sessions</h4>
                      <p className="text-sm text-gray-500 mb-2">
                        Devices that are currently logged into your account
                      </p>
                      
                      <div className="border rounded-md p-3 mb-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Current Session</p>
                            <p className="text-xs text-gray-500">
                              Chrome on Windows • IP: 192.168.1.1 • Location: Mumbai
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            This Device
                          </Button>
                        </div>
                      </div>
                      
                      <Button variant="destructive" size="sm">
                        Sign Out All Other Sessions
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
