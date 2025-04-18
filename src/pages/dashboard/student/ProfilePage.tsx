
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { UserProfileType, SubscriptionType } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { 
  Pencil, Save, X, Camera, Clock, CalendarIcon, CreditCard, 
  Star, Check, ArrowUpRight, Shield, User
} from "lucide-react";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ProfilePageProps {
  userProfile: UserProfileType;
  onUpdateProfile?: (updatedProfile: Partial<UserProfileType>) => void;
  onUploadAvatar?: (file: File) => void;
}

interface FormDataType {
  name: string;
  email: string;
  phoneNumber: string;
  school: string;
  grade: string;
  examTarget: string;
  bio: string;
  address: {
    city: string;
    state: string;
    country: string;
  };
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  [key: string]: any; // Add index signature
}

const ProfilePage: React.FC<ProfilePageProps> = ({ 
  userProfile, 
  onUpdateProfile,
  onUploadAvatar
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // Default subscription data
  const subscriptionData = {
    plan: userProfile?.subscription || SubscriptionType.Free,
    startDate: userProfile?.joinDate || '2024-04-01T00:00:00Z',
    renewalDate: '2025-04-01T00:00:00Z',
    features: [
      { name: "AI Tutor Access", included: true },
      { name: "Academic Advisor", included: userProfile?.subscription !== SubscriptionType.Free },
      { name: "Peer Ranking", included: userProfile?.subscription === SubscriptionType.Premium || userProfile?.subscription === SubscriptionType.Enterprise },
      { name: "Unlimited Flashcards", included: userProfile?.subscription !== SubscriptionType.Free },
      { name: "Mock Exams", included: true },
      { name: "Study Materials", included: true },
      { name: "Priority Support", included: userProfile?.subscription === SubscriptionType.Enterprise },
    ]
  };
  
  // Form state
  const [formData, setFormData] = useState<FormDataType>({
    name: userProfile?.name || "",
    email: userProfile?.email || "",
    phoneNumber: userProfile?.phoneNumber || "",
    school: "",
    grade: "",
    examTarget: userProfile?.goals?.[0]?.title || "JEE",
    bio: userProfile?.bio || "",
    address: {
      city: "",
      state: "",
      country: "India"
    },
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Handle nested fields
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSave = () => {
    // Create updated profile object with only changed fields
    const updatedProfile: Partial<UserProfileType> = {
      name: formData.name,
      phoneNumber: formData.phoneNumber,
      bio: formData.bio,
      // Add other fields as appropriate
    };
    
    if (onUpdateProfile) {
      onUpdateProfile(updatedProfile);
    }
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully"
    });
    setIsEditing(false);
  };
  
  const handleChangePassword = () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.currentPassword) {
      toast({
        title: "Error",
        description: "Please enter your current password",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully"
    });
    
    // Reset password fields
    setFormData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }));
  };
  
  const handleUploadAvatar = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && onUploadAvatar) {
      onUploadAvatar(files[0]);
      toast({
        title: "Avatar Updated",
        description: "Your profile picture has been updated."
      });
    }
  };
  
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy');
    } catch (e) {
      return 'Not available';
    }
  };
  
  const handleUpgradeSubscription = () => {
    toast({
      title: "Subscription Upgrade",
      description: "Redirecting to subscription plans..."
    });
    // Redirect logic would go here
  };
  
  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your account settings and preferences
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="flex items-center gap-2">
            <Pencil size={16} />
            Edit Profile
          </Button>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="default" onClick={handleSave} className="flex items-center gap-2">
              <Save size={16} />
              Save Changes
            </Button>
            <Button variant="ghost" onClick={() => setIsEditing(false)} className="flex items-center gap-2">
              <X size={16} />
              Cancel
            </Button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-32 h-32 border-2 border-primary">
                    <AvatarImage src={userProfile?.avatar || ""} />
                    <AvatarFallback className="text-4xl bg-primary/20">
                      {userProfile?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full shadow-lg"
                      onClick={handleUploadAvatar}
                    >
                      <Camera size={16} />
                    </Button>
                  )}
                  <input 
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleAvatarFileChange}
                    accept="image/*"
                  />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-semibold">{userProfile?.name}</h2>
                  <p className="text-gray-500 dark:text-gray-400">{userProfile?.email}</p>
                  <div className="flex justify-center items-center mt-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                      {userProfile?.personalityType || "Analytical"}
                    </Badge>
                  </div>
                </div>
                
                <div className="w-full pt-4">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Account Type</span>
                    <span className="font-medium">{userProfile?.role.charAt(0).toUpperCase() + userProfile?.role.slice(1)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Member Since</span>
                    <span className="font-medium flex items-center">
                      <Clock size={14} className="mr-1" />
                      {userProfile?.joinDate ? formatDate(userProfile.joinDate) : "April 2025"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Last Login</span>
                    <span className="font-medium">Today</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>Your current plan and usage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-violet-100 to-blue-100 dark:from-violet-900/40 dark:to-blue-900/40 rounded-lg p-4 relative overflow-hidden">
                <div className="absolute top-0 right-0">
                  {subscriptionData.plan !== SubscriptionType.Free && (
                    <Badge className="m-3 bg-gradient-to-r from-violet-600 to-blue-600">Current Plan</Badge>
                  )}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{subscriptionData.plan}</h3>
                  <CreditCard className="h-5 w-5 text-violet-600" />
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Started: {formatDate(subscriptionData.startDate)}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-gray-500" />
                    <span>Renews: {formatDate(subscriptionData.renewalDate)}</span>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h4 className="font-medium mb-3">Plan Features</h4>
                <ul className="space-y-2">
                  {subscriptionData.features.map((feature, index) => (
                    <li key={index} className="flex items-center justify-between text-sm">
                      <span>{feature.name}</span>
                      {feature.included ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-gray-300" />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pt-2 space-y-2">
                <Button 
                  className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                  onClick={handleUpgradeSubscription}
                >
                  <ArrowUpRight className="mr-2 h-4 w-4" />
                  Upgrade Plan
                </Button>
                
                {subscriptionData.plan !== SubscriptionType.Free && (
                  <Button variant="outline" className="w-full text-gray-600">
                    Manage Subscription
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <Tabs defaultValue="personal" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="academic">Academic Details</TabsTrigger>
                <TabsTrigger value="parent">Parent/Guardian</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="personal" className="space-y-4 mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    disabled={true} // Email always disabled as it's the primary identifier
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input 
                    id="phoneNumber" 
                    name="phoneNumber" 
                    value={formData.phoneNumber} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.city">City</Label>
                  <Input 
                    id="address.city" 
                    name="address.city" 
                    value={formData.address.city} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.state">State</Label>
                  <Input 
                    id="address.state" 
                    name="address.state" 
                    value={formData.address.state} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address.country">Country</Label>
                  <Input 
                    id="address.country" 
                    name="address.country" 
                    value={formData.address.country} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    name="bio" 
                    value={formData.bio} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                    placeholder="Tell us about yourself" 
                    className="resize-none min-h-[100px]"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="academic" className="space-y-4 mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="school">School/College</Label>
                  <Input 
                    id="school" 
                    name="school" 
                    value={formData.school} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade">Grade/Year</Label>
                  <Input 
                    id="grade" 
                    name="grade" 
                    value={formData.grade} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="examTarget">Target Exam</Label>
                  <Select 
                    disabled={!isEditing}
                    value={formData.examTarget}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, examTarget: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select exam" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="JEE">IIT-JEE</SelectItem>
                      <SelectItem value="NEET">NEET</SelectItem>
                      <SelectItem value="UPSC">UPSC</SelectItem>
                      <SelectItem value="CAT">CAT</SelectItem>
                      <SelectItem value="GATE">GATE</SelectItem>
                      <SelectItem value="GMAT">GMAT</SelectItem>
                      <SelectItem value="GRE">GRE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Areas of interest list */}
                <div className="sm:col-span-2 space-y-2">
                  <Label>Areas of Interest</Label>
                  <div className="flex flex-wrap gap-2">
                    {(userProfile.areasOfInterest || []).map(area => (
                      <Badge key={area.id} variant="outline" className="py-1">
                        {area.name} - {area.level}
                      </Badge>
                    ))}
                    {(userProfile.areasOfInterest?.length || 0) === 0 && (
                      <p className="text-sm text-gray-500">No areas of interest selected</p>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="parent" className="space-y-4 mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentName">Parent/Guardian Name</Label>
                  <Input 
                    id="parentName" 
                    name="parentName" 
                    value={formData.parentName} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentEmail">Parent/Guardian Email</Label>
                  <Input 
                    id="parentEmail" 
                    name="parentEmail"
                    type="email"
                    value={formData.parentEmail} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
                  <Input 
                    id="parentPhone" 
                    name="parentPhone"
                    value={formData.parentPhone} 
                    onChange={handleChange} 
                    disabled={!isEditing} 
                  />
                </div>
                <div className="sm:col-span-2">
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-amber-500" />
                      <span className="font-medium text-amber-800">Guardian Access</span>
                    </div>
                    <p className="mt-2 text-sm text-amber-700">
                      Adding parent or guardian details allows them to receive updates about your progress and access a connected dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="security" className="space-y-4 mt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input 
                    id="currentPassword" 
                    name="currentPassword" 
                    type="password" 
                    value={formData.currentPassword} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    id="newPassword" 
                    name="newPassword" 
                    type="password" 
                    value={formData.newPassword} 
                    onChange={handleChange} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    type="password" 
                    value={formData.confirmPassword} 
                    onChange={handleChange} 
                  />
                </div>
                <Button onClick={handleChangePassword}>Change Password</Button>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">Account Security</h3>
                    <p className="text-sm text-gray-500">Additional security settings for your account</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-xs text-gray-500">Add an extra layer of security</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Login Activity</p>
                        <p className="text-xs text-gray-500">View your recent logins</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">View</Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
