
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserProfileType } from '@/types/user/base';
import { CalendarDays, Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileDetailsSectionProps {
  userProfile?: UserProfileType;
}

const ProfileDetailsSection: React.FC<ProfileDetailsSectionProps> = ({ 
  userProfile = {
    id: "user_1",
    name: "Amit Singh",
    email: "amit@example.com",
    phoneNumber: "9876543210",
    role: "student",
    goal: "IIT-JEE",
    examDate: "April 30, 2025",
    city: "Mumbai",
    state: "Maharashtra",
    school: "Delhi Public School",
    grade: "12th",
    board: "CBSE"
  }
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: userProfile?.name || "",
    email: userProfile?.email || "",
    phoneNumber: userProfile?.phoneNumber || "",
    goal: userProfile?.goal || "",
    examDate: userProfile?.examDate || "",
    city: userProfile?.city || "",
    state: userProfile?.state || "",
    school: userProfile?.school || "",
    grade: userProfile?.grade || "",
    board: userProfile?.board || ""
  });
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    // In a real app, you would save the changes to the server
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile details have been updated successfully.",
    });
  };
  
  const handleCancel = () => {
    // Reset form data and exit editing mode
    setFormData({
      name: userProfile?.name || "",
      email: userProfile?.email || "",
      phoneNumber: userProfile?.phoneNumber || "",
      goal: userProfile?.goal || "",
      examDate: userProfile?.examDate || "",
      city: userProfile?.city || "",
      state: userProfile?.state || "",
      school: userProfile?.school || "",
      grade: userProfile?.grade || "",
      board: userProfile?.board || ""
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Personal Information</CardTitle>
          <Button 
            variant={isEditing ? "default" : "outline"} 
            size="sm"
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange}
                />
              ) : (
                <div className="py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  {formData.name}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  disabled
                />
              ) : (
                <div className="py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  {formData.email}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              {isEditing ? (
                <Input 
                  id="phoneNumber" 
                  name="phoneNumber" 
                  value={formData.phoneNumber} 
                  onChange={handleInputChange}
                />
              ) : (
                <div className="py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  {formData.phoneNumber}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="goal">Preparing For</Label>
              {isEditing ? (
                <Select 
                  value={formData.goal} 
                  onValueChange={(value) => handleSelectChange("goal", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IIT-JEE">IIT-JEE</SelectItem>
                    <SelectItem value="NEET">NEET</SelectItem>
                    <SelectItem value="CAT">CAT</SelectItem>
                    <SelectItem value="UPSC">UPSC</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  {formData.goal}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Educational Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="examDate">Exam Date</Label>
              {isEditing ? (
                <div className="relative">
                  <CalendarDays className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="examDate" 
                    name="examDate" 
                    value={formData.examDate} 
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
              ) : (
                <div className="py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  {formData.examDate}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="school">School/College</Label>
              {isEditing ? (
                <Input 
                  id="school" 
                  name="school" 
                  value={formData.school} 
                  onChange={handleInputChange}
                />
              ) : (
                <div className="py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  {formData.school}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="board">Board</Label>
              {isEditing ? (
                <Select 
                  value={formData.board} 
                  onValueChange={(value) => handleSelectChange("board", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select board" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CBSE">CBSE</SelectItem>
                    <SelectItem value="ICSE">ICSE</SelectItem>
                    <SelectItem value="State Board">State Board</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  {formData.board}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="grade">Grade/Class</Label>
              {isEditing ? (
                <Select 
                  value={formData.grade} 
                  onValueChange={(value) => handleSelectChange("grade", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="11th">11th</SelectItem>
                    <SelectItem value="12th">12th</SelectItem>
                    <SelectItem value="College">College</SelectItem>
                    <SelectItem value="Graduate">Graduate</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  {formData.grade}
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              {isEditing ? (
                <Input 
                  id="city" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleInputChange}
                />
              ) : (
                <div className="py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  {formData.city}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              {isEditing ? (
                <Input 
                  id="state" 
                  name="state" 
                  value={formData.state} 
                  onChange={handleInputChange}
                />
              ) : (
                <div className="py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                  {formData.state}
                </div>
              )}
            </div>
          </div>
          
          {isEditing && (
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileDetailsSection;
