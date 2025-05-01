
import React, { useState } from "react";
import { UserProfileType } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, Mail, Phone, MapPin, Calendar, Award, BookOpen, 
  Briefcase, GraduationCap, Clock, Edit2, Save, X 
} from "lucide-react";

interface ProfileDetailsProps {
  userProfile: UserProfileType;
  onUpdateProfile: (updates: Partial<UserProfileType>) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({
  userProfile,
  onUpdateProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfileType>>({
    name: userProfile.name || "",
    email: userProfile.email || "",
    phone: userProfile.phone || "",
    address: userProfile.address || "",
    bio: userProfile.bio || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setFormData({
      name: userProfile.name || "",
      email: userProfile.email || "",
      phone: userProfile.phone || "",
      address: userProfile.address || "",
      bio: userProfile.bio || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold">My Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="outline" className="flex items-center gap-2">
            <Edit2 className="h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={cancelEdit} variant="outline" className="flex items-center gap-1">
              <X className="h-4 w-4" />
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="default" className="flex items-center gap-1">
              <Save className="h-4 w-4" />
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Profile Summary</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage 
                src={userProfile.avatar || ""} 
                alt={userProfile.name || "User"} 
              />
              <AvatarFallback>{userProfile.name?.substring(0, 2).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold">{userProfile.name}</h3>
            <p className="text-sm text-muted-foreground">{userProfile.email}</p>
            <div className="mt-4 space-y-2 w-full">
              <div className="flex items-center gap-2 text-sm">
                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                <span>{userProfile.education || "Not specified"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{userProfile.address || "Not specified"}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{userProfile.phone || "Not specified"}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-xl">Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                  {isEditing ? (
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>{userProfile.name}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  {isEditing ? (
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{userProfile.email}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone</label>
                  {isEditing ? (
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{userProfile.phone || "Not specified"}</span>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="address" className="text-sm font-medium">Address</label>
                  {isEditing ? (
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-2 border rounded-md">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{userProfile.address || "Not specified"}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="bio" className="text-sm font-medium">Bio</label>
                {isEditing ? (
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={3}
                  />
                ) : (
                  <div className="p-2 border rounded-md">
                    <p>{userProfile.bio || "No bio provided."}</p>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Study Information */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-xl">Study Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Exam Preparation</h3>
                </div>
                <p className="text-sm">{userProfile.examPrep || "No exam specified"}</p>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Target Exam Date</h3>
                </div>
                <p className="text-sm">{userProfile.examDate || "No date specified"}</p>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Study Hours</h3>
                </div>
                <p className="text-sm">{userProfile.studyHours || "Not specified"} hours/week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileDetails;
