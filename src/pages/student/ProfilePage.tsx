
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole, MoodType } from "@/types/user/base";
import Header from '@/components/layout/Header';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, CreditCard, BookMarked, Edit } from "lucide-react";

const ProfilePage = () => {
  const { userProfile, loading, updateUserProfile } = useUserProfile(UserRole.Student);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [fileInputRef] = useState<React.RefObject<HTMLInputElement>>(React.createRef());

  const handleUploadImage = (file: File) => {
    try {
      // In a real app, we would upload the file to a server
      // For now, we'll use a local URL and update the user profile
      const imageUrl = URL.createObjectURL(file);
      
      if (userProfile) {
        updateUserProfile({
          ...userProfile,
          avatar: imageUrl
        });
        
        // Store in localStorage for persistence
        localStorage.setItem('user_profile_image', imageUrl);
      }
      
      toast({
        title: "Success",
        description: "Your profile image has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile image. Please try again.",
        variant: "destructive",
      });
      console.error("Error uploading image:", error);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUploadImage(file);
    }
  };
  
  const handleChangePhotoClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">My Profile</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center justify-between">
                    <span>Profile Information</span>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center">
                    <div className="relative mb-4">
                      <Avatar className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg">
                        {userProfile?.avatar ? (
                          <AvatarImage src={userProfile.avatar} alt={userProfile.name || "Student"} className="object-cover" />
                        ) : (
                          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-4xl">
                            {userProfile?.name ? userProfile.name.charAt(0) : "S"}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      
                      <button 
                        className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full shadow-md"
                        onClick={handleChangePhotoClick}
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                    
                    <h3 className="text-xl font-bold">{userProfile?.name || "Student"}</h3>
                    <p className="text-gray-500 mb-2">{userProfile?.email || "student@example.com"}</p>
                    
                    <div className="flex gap-2 mb-4">
                      {userProfile?.examPreparation && (
                        <Badge variant="outline" className="flex items-center gap-1 bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300">
                          <BookMarked className="h-3 w-3" />
                          {userProfile.examPreparation}
                        </Badge>
                      )}
                    </div>
                    
                    <Button size="sm" className="w-full" onClick={handleChangePhotoClick}>
                      Change Profile Picture
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-4">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Learning Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Learning Style:</span>
                      <span>{userProfile?.personalityType || "Analytical"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Study Pace:</span>
                      <span>{userProfile?.studyPreferences?.pace || "Moderate"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Hours/Day:</span>
                      <span>{userProfile?.studyPreferences?.hoursPerDay || "4"} hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Preferred Time:</span>
                      <span>
                        {userProfile?.studyPreferences?.preferredTimeStart && userProfile?.studyPreferences?.preferredTimeEnd ? 
                          `${userProfile.studyPreferences.preferredTimeStart} - ${userProfile.studyPreferences.preferredTimeEnd}` : 
                          "Evening"}
                      </span>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="h-3.5 w-3.5 mr-1.5" /> Edit Learning Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card>
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                  <div className="px-6 pt-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview" className="flex items-center gap-1.5">
                        <User className="h-4 w-4" />
                        <span>Overview</span>
                      </TabsTrigger>
                      <TabsTrigger value="settings" className="flex items-center gap-1.5">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </TabsTrigger>
                      <TabsTrigger value="subscription" className="flex items-center gap-1.5">
                        <CreditCard className="h-4 w-4" />
                        <span>Subscription</span>
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="overview" className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Personal Information</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Full Name</label>
                          <p>{userProfile?.name || "Student"}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Email Address</label>
                          <p>{userProfile?.email || "student@example.com"}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Exam Preparation</label>
                          <p>{userProfile?.examPreparation || "JEE Advanced"}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Daily Streak</label>
                          <p className="flex items-center gap-1">
                            <span className="text-amber-500">🔥</span>
                            {userProfile?.studyStreak || 12} days
                          </p>
                        </div>
                      </div>
                      
                      <hr className="my-4" />
                      
                      <h3 className="text-lg font-medium">Study Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Subjects</label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {userProfile?.subjects?.map((subject, index) => (
                              <Badge key={index} variant="secondary">{subject}</Badge>
                            )) || (
                              <>
                                <Badge variant="secondary">Physics</Badge>
                                <Badge variant="secondary">Chemistry</Badge>
                                <Badge variant="secondary">Mathematics</Badge>
                              </>
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-500">Current Mood</label>
                          <p>
                            {userProfile?.mood ? (
                              <Badge className={`mt-1 ${
                                userProfile.mood === MoodType.HAPPY ? "bg-yellow-100 text-yellow-800" :
                                userProfile.mood === MoodType.MOTIVATED ? "bg-green-100 text-green-800" :
                                userProfile.mood === MoodType.FOCUSED ? "bg-blue-100 text-blue-800" :
                                userProfile.mood === MoodType.STRESSED ? "bg-red-100 text-red-800" :
                                "bg-gray-100 text-gray-800"
                              }`}>
                                {userProfile.mood}
                              </Badge>
                            ) : (
                              <Badge variant="outline">Not set</Badge>
                            )}
                          </p>
                        </div>
                      </div>

                      <hr className="my-4" />
                      
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">AI Personalized Study Plan</h3>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Edit className="h-3.5 w-3.5" /> Edit Plan
                        </Button>
                      </div>
                      
                      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-100 dark:border-blue-900/20">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row justify-between gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">Your current goal</h4>
                              <p className="text-lg font-bold text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                                <BookMarked className="h-4 w-4" />
                                {userProfile?.examPreparation || "JEE Advanced 2025"}
                              </p>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Switch Plan</Button>
                              <Button variant="default" size="sm">New Plan</Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="settings" className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Account Settings</h3>
                      <p className="text-muted-foreground">
                        Manage your account preferences and settings
                      </p>
                      {/* Settings content would go here */}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="subscription" className="p-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Subscription Details</h3>
                      <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-100 dark:border-blue-800">
                        <p className="font-medium text-blue-800 dark:text-blue-300">
                          You are currently on the {userProfile?.subscription ? 
                            (typeof userProfile.subscription === 'string' ? 
                              userProfile.subscription.toUpperCase() : 
                              userProfile.subscription.planType?.toUpperCase() || 'FREE') : 
                            'Free'} plan
                        </p>
                        <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                          Upgrade to unlock premium features and get unlimited access
                        </p>
                      </div>
                      
                      <Button className="w-full">Upgrade to Premium</Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
