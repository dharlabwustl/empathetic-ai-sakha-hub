
import React, { useState } from "react";
import { UserProfileType } from "@/types/user/base";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Edit2, Save } from "lucide-react";

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
    name: userProfile.name || "",
    email: userProfile.email || "",
    phone: userProfile.phone || "",
    address: userProfile.address || "",
    dateOfBirth: userProfile.dateOfBirth || "",
    bio: userProfile.bio || "",
    school: userProfile.school || "",
    grade: userProfile.grade || "",
    interests: userProfile.interests || []
  });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdateProfile(formData);
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile details have been saved successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Profile Details</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Cancel" : (
            <>
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Profile
            </>
          )}
        </Button>
      </div>
      
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded-md">{formData.name || "Not provided"}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              {isEditing ? (
                <Input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  disabled
                />
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded-md">{formData.email || "Not provided"}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded-md">{formData.phone || "Not provided"}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of Birth</Label>
              {isEditing ? (
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  type="date"
                />
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded-md">{formData.dateOfBirth || "Not provided"}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            {isEditing ? (
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            ) : (
              <p className="text-sm p-2 bg-gray-50 rounded-md">{formData.address || "Not provided"}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="school">School/Institution</Label>
              {isEditing ? (
                <Input
                  id="school"
                  name="school"
                  value={formData.school}
                  onChange={handleChange}
                />
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded-md">{formData.school || "Not provided"}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="grade">Grade/Year</Label>
              {isEditing ? (
                <Select 
                  value={formData.grade} 
                  onValueChange={(value) => handleSelectChange("grade", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9">Grade 9</SelectItem>
                    <SelectItem value="10">Grade 10</SelectItem>
                    <SelectItem value="11">Grade 11</SelectItem>
                    <SelectItem value="12">Grade 12</SelectItem>
                    <SelectItem value="college">College</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded-md">{formData.grade || "Not provided"}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">About Me</Label>
            {isEditing ? (
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
              />
            ) : (
              <p className="text-sm p-2 bg-gray-50 rounded-md whitespace-pre-wrap">{formData.bio || "No bio provided"}</p>
            )}
          </div>
          
          {isEditing && (
            <div className="flex justify-end">
              <Button onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Account Information</h3>
        <Card>
          <CardContent className="pt-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <dt className="text-sm text-muted-foreground">Account Type</dt>
                <dd>{userProfile.role.charAt(0).toUpperCase() + userProfile.role.slice(1)}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Member Since</dt>
                <dd>{userProfile.createdAt ? new Date(userProfile.createdAt).toLocaleDateString() : "Not available"}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Last Login</dt>
                <dd>{userProfile.lastLogin ? new Date(userProfile.lastLogin).toLocaleDateString() : "Not available"}</dd>
              </div>
              <div>
                <dt className="text-sm text-muted-foreground">Login Count</dt>
                <dd>{userProfile.loginCount || 0}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Education & Goals</h3>
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {userProfile.goals && userProfile.goals.length > 0 ? (
                <div>
                  <h4 className="font-medium mb-2">Current Goals</h4>
                  <ul className="space-y-2">
                    {userProfile.goals.map((goal) => (
                      <li key={goal.id} className="border p-3 rounded-md">
                        <div className="flex justify-between">
                          <span className="font-medium">{goal.title}</span>
                          <span className="text-sm text-muted-foreground">
                            {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm mt-1">{goal.description}</p>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs text-muted-foreground">
                            Target Date: {new Date(goal.targetDate).toLocaleDateString()}
                          </span>
                          <span className="text-xs font-medium">
                            Progress: {goal.progress}%
                          </span>
                        </div>
                        {goal.examDate && (
                          <span className="block text-xs text-red-500 mt-1">
                            Exam Date: {goal.examDate}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-muted-foreground">No goals set yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileDetailsSection;
