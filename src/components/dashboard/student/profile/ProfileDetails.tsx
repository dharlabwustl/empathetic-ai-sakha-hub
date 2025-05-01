
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { UserProfileType } from "@/types/user";
import { useToast } from "@/hooks/use-toast";

interface ProfileDetailsProps {
  userProfile: UserProfileType;
  onUpdateProfile: (updates: Partial<UserProfileType>) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ 
  userProfile, 
  onUpdateProfile 
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: userProfile.name || '',
    email: userProfile.email || '',
    phoneNumber: userProfile.phoneNumber || '',
    bio: userProfile.bio || '',
    examPreparation: userProfile.examPreparation || '',
  });

  const [isEditing, setIsEditing] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Profile Information</h2>
          <Button 
            variant={isEditing ? "outline" : "default"} 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                readOnly={!isEditing}
                className={!isEditing ? "bg-gray-100 dark:bg-gray-800" : ""}
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
                readOnly={!isEditing}
                className={!isEditing ? "bg-gray-100 dark:bg-gray-800" : ""}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                readOnly={!isEditing}
                className={!isEditing ? "bg-gray-100 dark:bg-gray-800" : ""}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="examPreparation">Exam Preparation</Label>
              <Input
                id="examPreparation"
                name="examPreparation"
                value={formData.examPreparation}
                onChange={handleChange}
                readOnly={!isEditing}
                className={!isEditing ? "bg-gray-100 dark:bg-gray-800" : ""}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                readOnly={!isEditing}
                className={!isEditing ? "bg-gray-100 dark:bg-gray-800" : ""}
                rows={4}
              />
            </div>
          </div>
          
          {isEditing && (
            <div className="flex justify-end mt-6">
              <Button type="submit">Save Changes</Button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default ProfileDetails;
