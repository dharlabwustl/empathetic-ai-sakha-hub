
import React, { useState } from "react";
import { UserProfileType } from "@/types/user/base";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Save, Edit } from "lucide-react";

interface ProfileDetailsSectionProps {
  userProfile: UserProfileType;
  onUpdateProfile: (updates: Partial<UserProfileType>) => void;
}

const ProfileDetailsSection: React.FC<ProfileDetailsSectionProps> = ({
  userProfile,
  onUpdateProfile
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phoneNumber: userProfile.phoneNumber || "",
    school: userProfile.school || "",
    grade: userProfile.grade || "",
    board: userProfile.board || "",
    city: userProfile.city || "",
    state: userProfile.state || ""
  });
  
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would send updates to the server
    onUpdateProfile(formData);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully."
    });
    
    setIsEditing(false);
  };
  
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Profile Details</h2>
        <Button 
          variant={isEditing ? "outline" : "default"}
          onClick={toggleEditing}
          size="sm"
          className="flex items-center gap-1"
        >
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Edit className="h-4 w-4 mr-1" />
              Edit Profile
            </>
          )}
        </Button>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={true} // Email should not be editable
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
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Academic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                <Select 
                  disabled={!isEditing}
                  value={formData.grade} 
                  onValueChange={(value) => handleSelectChange("grade", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9th">9th</SelectItem>
                    <SelectItem value="10th">10th</SelectItem>
                    <SelectItem value="11th">11th</SelectItem>
                    <SelectItem value="12th">12th</SelectItem>
                    <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="Graduate">Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="board">Board/University</Label>
                <Input
                  id="board"
                  name="board"
                  value={formData.board}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {isEditing && (
          <div className="flex justify-end mt-6">
            <Button type="submit" className="flex items-center gap-1">
              <Save className="h-4 w-4 mr-1" />
              Save Changes
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfileDetailsSection;
