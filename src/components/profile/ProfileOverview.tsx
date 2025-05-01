
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Edit, Upload, User, Mail, Phone, MapPin, Cake, School } from "lucide-react";
import { UserProfileType, Gender, StudyPace, StudyPreferenceType, SignupType } from "@/types/user/base";
import { Progress } from "@/components/ui/progress";

interface ProfileOverviewProps {
  userProfile: UserProfileType;
  onUpdateProfile: (updates: Partial<UserProfileType>) => void;
}

export const ProfileOverview = ({ userProfile, onUpdateProfile }: ProfileOverviewProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phoneNumber: userProfile.phoneNumber || "",
    bio: userProfile.bio || "",
    location: userProfile.location || "",
    personalityType: userProfile.personalityType || "",
    grade: userProfile.grade || ""
  });

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, this would upload the file to a server
      const imageUrl = URL.createObjectURL(file);
      onUpdateProfile({ avatar: imageUrl });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const formatSignupType = (type?: SignupType) => {
    if (!type) return "Email";
    
    switch (type) {
      case SignupType.Google: return "Google";
      case SignupType.Facebook: return "Facebook";
      case SignupType.Mobile: return "Mobile";
      default: return "Email";
    }
  };

  const formatStudyPace = (pace?: StudyPace) => {
    if (!pace) return "Moderate";
    
    switch (pace) {
      case StudyPace.Light: return "Light";
      case StudyPace.Intense: return "Intense";
      default: return "Moderate";
    }
  };

  const formatPreferenceType = (type?: StudyPreferenceType) => {
    if (!type) return "Solo";
    
    switch (type) {
      case StudyPreferenceType.Group: return "Group";
      case StudyPreferenceType.AIAssisted: return "AI-Assisted";
      default: return "Solo";
    }
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader className="relative pb-8">
          <div className="absolute right-6 top-6">
            <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        
        <CardContent>
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      {userProfile.avatar ? (
                        <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                      ) : (
                        <AvatarFallback className="text-2xl">
                          {getInitials(userProfile.name)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    <div 
                      className="absolute bottom-0 right-0 bg-primary rounded-full p-1.5 cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    className="mt-2"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Change Photo
                  </Button>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        readOnly={!!userProfile.signupType}
                        className={userProfile.signupType ? "bg-muted" : ""}
                      />
                      {userProfile.signupType && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Email cannot be changed for {formatSignupType(userProfile.signupType)} accounts
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input 
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="personalityType">Personality Type</Label>
                      <Input 
                        id="personalityType"
                        name="personalityType"
                        value={formData.personalityType}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="grade">Grade</Label>
                      <Input 
                        id="grade"
                        name="grade"
                        value={formData.grade}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">About Me</Label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full min-h-[100px] p-2 border rounded-md bg-background"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          ) : (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex flex-col items-center">
                  <Avatar className="w-24 h-24">
                    {userProfile.avatar ? (
                      <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                    ) : (
                      <AvatarFallback className="text-2xl">
                        {getInitials(userProfile.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                  
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge>{userProfile.role || "Student"}</Badge>
                    <Badge variant="outline">{formatSignupType(userProfile.signupType)} Signup</Badge>
                    {userProfile.gender && (
                      <Badge variant="outline">{userProfile.gender}</Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{userProfile.email}</span>
                    </div>
                    {userProfile.phoneNumber && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{userProfile.phoneNumber}</span>
                      </div>
                    )}
                    {userProfile.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{userProfile.location}</span>
                      </div>
                    )}
                    {userProfile.grade && (
                      <div className="flex items-center gap-2">
                        <School className="h-4 w-4 text-muted-foreground" />
                        <span>Grade: {userProfile.grade}</span>
                      </div>
                    )}
                  </div>
                  
                  {userProfile.bio && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">About</h3>
                      <p className="text-sm">{userProfile.bio}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Academic Goals</h3>
                
                <div className="space-y-6">
                  {userProfile.goals?.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{goal.title}</div>
                        <Badge>{goal.targetDate}</Badge>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress: {goal.progress}%</span>
                        <span>Target: {goal.targetYear || new Date(goal.targetDate).getFullYear()}</span>
                      </div>
                    </div>
                  ))}
                  
                  {(!userProfile.goals || userProfile.goals.length === 0) && (
                    <div className="text-center text-muted-foreground py-4">
                      No academic goals set yet
                    </div>
                  )}
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Study Preferences</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-muted/40">
                    <CardContent className="pt-4">
                      <div className="text-sm font-medium">Study Pace</div>
                      <div className="text-lg">
                        {formatStudyPace(userProfile.studyPreferences?.pace)}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/40">
                    <CardContent className="pt-4">
                      <div className="text-sm font-medium">Hours Per Day</div>
                      <div className="text-lg">
                        {userProfile.studyPreferences?.hoursPerDay || "Not set"}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/40">
                    <CardContent className="pt-4">
                      <div className="text-sm font-medium">Preferred Time</div>
                      <div className="text-lg">
                        {userProfile.studyPreferences?.preferredTimeStart ? 
                          `${userProfile.studyPreferences?.preferredTimeStart} - ${userProfile.studyPreferences?.preferredTimeEnd}` : 
                          "Not set"}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-muted/40">
                    <CardContent className="pt-4">
                      <div className="text-sm font-medium">Study Type</div>
                      <div className="text-lg">
                        {formatPreferenceType(userProfile.studyPreferences?.preferenceType)}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
