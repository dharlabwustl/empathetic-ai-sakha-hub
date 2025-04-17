
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserProfileType } from "@/types/user";
import { ArrowLeft, Camera, Check, Clock, Loader2, MapPin, Mail, Phone, Calendar, School, Trophy } from "lucide-react";
import { useUserProfile } from "@/hooks/useUserProfile";
import { UserRole } from "@/types/user/base";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phoneNumber: z.string().min(10, "Phone number is required"),
  bio: z.string().optional(),
  location: z.string().optional(),
  educationLevel: z.string().optional(),
  schoolName: z.string().optional(),
  dateOfBirth: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const { userProfile, loading, updateUserProfile } = useUserProfile(UserRole.Student);
  
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userProfile?.name || "",
      email: userProfile?.email || "",
      phoneNumber: userProfile?.phoneNumber || "",
      bio: userProfile?.bio || "",
      location: userProfile?.location || "",
      educationLevel: userProfile?.educationLevel || "",
      schoolName: userProfile?.schoolName || "",
      dateOfBirth: userProfile?.dateOfBirth || "",
    },
  });
  
  // Update form values when user profile loads
  React.useEffect(() => {
    if (userProfile && !loading) {
      form.reset({
        name: userProfile.name || "",
        email: userProfile.email || "",
        phoneNumber: userProfile.phoneNumber || "",
        bio: userProfile.bio || "",
        location: userProfile.location || "",
        educationLevel: userProfile.educationLevel || "",
        schoolName: userProfile.schoolName || "",
        dateOfBirth: userProfile.dateOfBirth || "",
      });
    }
  }, [userProfile, loading, form]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProfileFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, you would upload the avatar and update the profile
      console.log("Updating profile with data:", data);
      console.log("Avatar file:", avatarFile);
      
      // Update user profile
      await updateUserProfile({
        ...data,
      } as Partial<UserProfileType>);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update failed",
        description: "There was a problem updating your profile.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-violet-500" />
      </div>
    );
  }

  return (
    <div className="container max-w-4xl py-6">
      <Button 
        variant="ghost" 
        className="mb-6 hover:bg-slate-100" 
        onClick={() => navigate("/dashboard/student")}
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
      </Button>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Summary Card */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Profile Summary</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="relative mb-4 group">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                      <AvatarImage src={avatarPreview || "/lovable-uploads/37933273-088b-4a83-a5ec-24b13c8c89f5.png"} />
                      <AvatarFallback className="bg-violet-500 text-2xl text-white">
                        {userProfile?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <label 
                      htmlFor="avatar-upload"
                      className="absolute bottom-0 right-0 bg-violet-600 text-white p-1 rounded-full cursor-pointer hover:bg-violet-700 transition-colors"
                    >
                      <Camera size={14} />
                      <input 
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                    </label>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-1">{userProfile?.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{userProfile?.personalityType}</p>
                  
                  <div className="w-full space-y-3">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="truncate">{userProfile?.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{userProfile?.phoneNumber}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{userProfile?.location || "Location not set"}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <School className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{userProfile?.educationLevel || "Education level not set"}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Joined: {userProfile?.joinDate || "Unknown"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Profile Edit Form */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Your email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="dateOfBirth"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Date of Birth</FormLabel>
                              <FormControl>
                                <Input type="date" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input placeholder="City, State" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="educationLevel"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Education Level</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., 11th Grade" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="schoolName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>School Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your school" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell us a bit about yourself..."
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit"
                        className="bg-violet-600 hover:bg-violet-700"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Check className="mr-2 h-4 w-4" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
              
              {/* Achievement & Stats Card */}
              <Card className="md:col-span-3 mt-4">
                <CardHeader>
                  <CardTitle>Achievements & Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-violet-50 p-4 rounded-lg flex items-center">
                      <div className="bg-violet-100 p-2 rounded-full mr-3">
                        <Trophy className="h-5 w-5 text-violet-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Study Streak</p>
                        <p className="text-lg font-semibold">{userProfile?.studyStreak || 0} days</p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <School className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Quizzes Taken</p>
                        <p className="text-lg font-semibold">{userProfile?.quizzesTaken || 0}</p>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg flex items-center">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Trophy className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Quiz Performance</p>
                        <p className="text-lg font-semibold">{userProfile?.quizPerformance || 0}%</p>
                      </div>
                    </div>
                    
                    <div className="bg-amber-50 p-4 rounded-lg flex items-center">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        <Calendar className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Syllabus Coverage</p>
                        <p className="text-lg font-semibold">{userProfile?.syllabusCoverage || 0}%</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="settings">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Notification Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Settings will go here */}
                      <p className="text-muted-foreground col-span-2">Notification settings coming soon</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Settings will go here */}
                      <p className="text-muted-foreground col-span-2">Privacy settings coming soon</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Reset to Defaults</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
