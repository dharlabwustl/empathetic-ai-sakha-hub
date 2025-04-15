
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfileType } from "@/types/user";
import { Pencil, Save, User, BookOpen, LineChart, Bell, Shield } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface StudentProfileProps {
  userProfile: UserProfileType;
}

const StudentProfile = ({ userProfile }: StudentProfileProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [school, setSchool] = useState(userProfile.school || "");
  const [grade, setGrade] = useState(userProfile.grade || "");
  const [bio, setBio] = useState("I'm a dedicated student preparing for competitive exams.");
  
  const [notifications, setNotifications] = useState({
    studyReminders: true,
    examUpdates: true,
    progressReports: true,
    newContent: false,
  });

  const [privacy, setPrivacy] = useState({
    shareProgress: false,
    showActivity: true,
    allowAnalytics: true,
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
    setIsEditing(false);
  };

  const toggleEdit = () => {
    if (isEditing) {
      handleSaveProfile();
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Button onClick={toggleEdit} variant={isEditing ? "default" : "outline"}>
          {isEditing ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </>
          ) : (
            <>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <Card className="bg-white dark:bg-gray-800 shadow-md">
        <CardHeader className="bg-gradient-to-r from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 pb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-800">
                <AvatarImage src={userProfile.profileImage || ""} alt={userProfile.name} />
                <AvatarFallback className="text-2xl bg-violet-200 dark:bg-violet-800">
                  {userProfile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="absolute bottom-0 right-0 rounded-full h-8 w-8 p-0"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="text-center sm:text-left">
              <CardTitle className="mb-1 text-2xl">{userProfile.name}</CardTitle>
              <CardDescription className="text-sm">{userProfile.email}</CardDescription>
              <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50">
                  {userProfile.role}
                </Badge>
                {userProfile.goals && userProfile.goals[0] && (
                  <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50">
                    {userProfile.goals[0].title}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="personal">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" /> Personal
              </TabsTrigger>
              <TabsTrigger value="academic" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Academic
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Bell className="h-4 w-4" /> Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="Enter your phone number"
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="bio">About Me</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    disabled={!isEditing}
                    className="h-24"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="academic" className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="school">School/College</Label>
                    <Input
                      id="school"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="grade">Grade/Year</Label>
                    <Input
                      id="grade"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="examGoal">Exam Goal</Label>
                    <Input
                      id="examGoal"
                      value={userProfile.goals && userProfile.goals[0] ? userProfile.goals[0].title : ""}
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetDate">Target Date</Label>
                    <Input
                      id="targetDate"
                      type="date"
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">Subjects</Label>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.subjects?.map(subject => (
                      <Badge key={subject.id} className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                        {subject.name}
                      </Badge>
                    )) || (
                      <div className="text-gray-500">No subjects selected</div>
                    )}
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        + Add Subject
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="p-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium flex items-center mb-3">
                    <Bell className="mr-2 h-4 w-4" /> 
                    Notifications
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </p>
                          <p className="text-sm text-gray-500">
                            Get notified about {key.toLowerCase().includes('exam') ? 'exam updates' : key.toLowerCase().includes('study') ? 'study reminders' : 'app updates'}
                          </p>
                        </div>
                        <Switch 
                          checked={value} 
                          onCheckedChange={(checked) => setNotifications({...notifications, [key]: checked})}
                          disabled={!isEditing}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium flex items-center mb-3">
                    <Shield className="mr-2 h-4 w-4" /> 
                    Privacy
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(privacy).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </p>
                          <p className="text-sm text-gray-500">
                            {key.includes('share') ? 'Share your progress with classmates' : 
                             key.includes('activity') ? 'Show your activity status to others' : 
                             'Allow us to collect anonymous usage data'}
                          </p>
                        </div>
                        <Switch 
                          checked={value} 
                          onCheckedChange={(checked) => setPrivacy({...privacy, [key]: checked})}
                          disabled={!isEditing}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="ghost">Delete Account</Button>
          {isEditing && (
            <Button onClick={handleSaveProfile}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudentProfile;
