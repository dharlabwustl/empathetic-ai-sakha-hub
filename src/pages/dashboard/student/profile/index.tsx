
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Check, CreditCard, Calendar, RefreshCw, X, Upload, Save } from "lucide-react";
import { indianCities } from "@/components/signup/steps/enhanced/indianCities";

const ProfilePage = () => {
  const { userProfile, updateUserProfile } = useUserProfile("student");
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Get initial values from userProfile
  const [formValues, setFormValues] = useState({
    name: userProfile?.name || "",
    email: userProfile?.email || "",
    phone: userProfile?.phoneNumber || "",
    city: userProfile?.address?.city || "",
    state: userProfile?.address?.state || "Maharashtra",
    country: userProfile?.address?.country || "India",
    grade: userProfile?.examPreparation || "Class 12",
    parentName: userProfile?.parentGuardian?.name || "",
    parentPhone: userProfile?.parentGuardian?.phone || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // In a real app, this would send data to the backend
    updateUserProfile({
      name: formValues.name,
      phoneNumber: formValues.phone,
      address: {
        city: formValues.city,
        state: formValues.state,
        country: formValues.country
      },
      examPreparation: formValues.grade,
      parentGuardian: {
        name: formValues.parentName,
        phone: formValues.parentPhone
      },
      profileImage: profileImage
    });
    
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully",
    });
    
    setIsEditing(false);
  };

  // Get the subscription plan info from user profile or use defaults
  const subscriptionPlan = {
    name: userProfile?.subscription || "Free",
    startDate: "January 15, 2025",
    renewalDate: "January 15, 2026",
    features: [
      "Personalized study plan",
      "24/7 AI tutor access",
      "Unlimited practice questions",
      "Basic performance analytics"
    ]
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Profile Information */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </div>
            <Button 
              variant={isEditing ? "destructive" : "secondary"} 
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? (
                <><X size={16} className="mr-2" /> Cancel</>
              ) : (
                <>Edit Profile</>
              )}
            </Button>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center sm:flex-row sm:items-center sm:space-x-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profileImage || "/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png"} />
                  <AvatarFallback>{userProfile?.name?.charAt(0) || "S"}</AvatarFallback>
                </Avatar>
                
                {isEditing && (
                  <div className="mt-4 sm:mt-0">
                    <label htmlFor="profile-picture" className="cursor-pointer">
                      <div className="flex items-center space-x-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors px-4 py-2 rounded-md">
                        <Camera size={16} />
                        <span>Change Picture</span>
                      </div>
                      <input 
                        id="profile-picture" 
                        type="file" 
                        accept="image/*" 
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formValues.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formValues.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                
                {/* Class/Grade */}
                <div className="space-y-2">
                  <Label htmlFor="grade">Class/Grade or Exam Target</Label>
                  {isEditing ? (
                    <Select 
                      value={formValues.grade} 
                      onValueChange={(value) => handleSelectChange("grade", value)}
                    >
                      <SelectTrigger id="grade">
                        <SelectValue placeholder="Select your class/exam" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Class 9">Class 9</SelectItem>
                        <SelectItem value="Class 10">Class 10</SelectItem>
                        <SelectItem value="Class 11">Class 11</SelectItem>
                        <SelectItem value="Class 12">Class 12</SelectItem>
                        <SelectItem value="JEE 2025">JEE 2025</SelectItem>
                        <SelectItem value="NEET 2025">NEET 2025</SelectItem>
                        <SelectItem value="UPSC">UPSC</SelectItem>
                        <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      id="grade"
                      value={formValues.grade}
                      disabled
                    />
                  )}
                </div>
              </div>
              
              <Separator />
              
              {/* Address */}
              <div>
                <h3 className="text-lg font-medium mb-4">Address Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    {isEditing ? (
                      <Select 
                        value={formValues.city} 
                        onValueChange={(value) => handleSelectChange("city", value)}
                      >
                        <SelectTrigger id="city">
                          <SelectValue placeholder="Select your city" />
                        </SelectTrigger>
                        <SelectContent>
                          {indianCities.map((city) => (
                            <SelectItem key={city} value={city}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id="city"
                        value={formValues.city}
                        disabled
                      />
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formValues.state}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formValues.country}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              {/* Parent/Guardian Details */}
              <div>
                <h3 className="text-lg font-medium mb-4">Parent/Guardian Details <span className="text-sm font-normal text-gray-500">(Optional)</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Full Name</Label>
                    <Input
                      id="parentName"
                      name="parentName"
                      value={formValues.parentName}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Phone Number</Label>
                    <Input
                      id="parentPhone"
                      name="parentPhone"
                      value={formValues.parentPhone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          
          {isEditing && (
            <CardFooter className="flex justify-end space-x-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsEditing(false);
                  // Reset form values to original
                  setFormValues({
                    name: userProfile?.name || "",
                    email: userProfile?.email || "",
                    phone: userProfile?.phoneNumber || "",
                    city: userProfile?.address?.city || "",
                    state: userProfile?.address?.state || "Maharashtra",
                    country: userProfile?.address?.country || "India",
                    grade: userProfile?.examPreparation || "Class 12",
                    parentName: userProfile?.parentGuardian?.name || "",
                    parentPhone: userProfile?.parentGuardian?.phone || "",
                  });
                  setProfileImage(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>
                <Save size={16} className="mr-2" /> Save Changes
              </Button>
            </CardFooter>
          )}
        </Card>
        
        {/* Subscription Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-primary" />
              Subscription Plan
            </CardTitle>
            <CardDescription>Manage your subscription</CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Current Plan</h3>
                <p className="text-sm text-gray-500">{subscriptionPlan.name}</p>
              </div>
              <Badge variant={subscriptionPlan.name === "Free" ? "outline" : "default"}>
                {subscriptionPlan.name}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-gray-500" />
                <span className="text-sm">Billing Start: {subscriptionPlan.startDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw size={16} className="text-gray-500" />
                <span className="text-sm">Renewal: {subscriptionPlan.renewalDate}</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2">Plan Features</h3>
              <ul className="space-y-2">
                {subscriptionPlan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={16} className="mr-2 text-green-500 mt-1" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-2">
              <Button className="w-full">Upgrade Plan</Button>
              {subscriptionPlan.name !== "Free" && (
                <Button variant="outline" className="w-full">Cancel Subscription</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
