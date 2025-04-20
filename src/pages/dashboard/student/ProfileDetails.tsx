import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfileType } from "@/types/user";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Save, XCircle } from "lucide-react";

interface ProfileDetailsProps {
  userProfile: UserProfileType;
  onUpdateProfile?: (newProfile: Partial<UserProfileType>) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ userProfile, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile.name || "",
    email: userProfile.email || "",
    phoneNumber: userProfile.phoneNumber || "",
    bio: userProfile.bio || "",
    examType: userProfile.examPreparation || "",
    institution: userProfile.education?.institution || "",
    graduationYear: userProfile.education?.graduationYear?.toString() || "",
  });

  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (onUpdateProfile) {
      // Fix the spread issue by creating a proper object
      const updatedProfile = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        bio: formData.bio,
        examPreparation: formData.examType,
        education: {
          ...(userProfile.education || {}),
          institution: formData.institution,
          graduationYear: formData.graduationYear ? parseInt(formData.graduationYear, 10) : undefined,
        }
      };
      
      onUpdateProfile(updatedProfile);
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      });
    }
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: userProfile.name || "",
      email: userProfile.email || "",
      phoneNumber: userProfile.phoneNumber || "",
      bio: userProfile.bio || "",
      examType: userProfile.examPreparation || "",
      institution: userProfile.education?.institution || "",
      graduationYear: userProfile.education?.graduationYear?.toString() || "",
    });
    setIsEditing(false);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Profile Details</CardTitle>
        {isEditing ? (
          <div className="space-x-2">
            <Button variant="ghost" onClick={handleCancel}>
              <XCircle className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        ) : (
          <Button variant="outline" onClick={() => setIsEditing(true)}>
            <Pencil className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback>{userProfile.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold">{userProfile.name}</h2>
              <p className="text-sm text-muted-foreground">{userProfile.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="examType">Exam Type</Label>
              <Select disabled={!isEditing} onValueChange={(value) => setFormData({ ...formData, examType: value })}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={formData.examType || "Select Exam"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IIT-JEE">IIT-JEE</SelectItem>
                  <SelectItem value="NEET">NEET</SelectItem>
                  <SelectItem value="CAT">CAT</SelectItem>
                  <SelectItem value="Civil Services">Civil Services</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Tell us a little about yourself"
              value={formData.bio}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="institution">Institution</Label>
              <Input
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="graduationYear">Graduation Year</Label>
              <Input
                id="graduationYear"
                name="graduationYear"
                type="number"
                min="1900"
                max={new Date().getFullYear() + 5}
                value={formData.graduationYear}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileDetails;
