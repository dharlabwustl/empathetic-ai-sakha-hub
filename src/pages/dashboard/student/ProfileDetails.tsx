
import React, { useState } from "react";
import { UserProfileType } from "@/types/user";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Book, Sparkles } from "lucide-react";
import BatchInvitationInput from "@/components/subscription/BatchInvitationInput";

interface ProfileDetailsProps {
  userProfile: UserProfileType;
  onUpdateProfile: (updates: Partial<UserProfileType>) => void;
}

const ProfileDetails: React.FC<ProfileDetailsProps> = ({ userProfile, onUpdateProfile }) => {
  const [name, setName] = useState(userProfile.name || "");
  const [bio, setBio] = useState(userProfile.bio || "");
  const [location, setLocation] = useState(userProfile.location || "");
  const [phone, setPhone] = useState(userProfile.phone || "");
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    onUpdateProfile({
      name,
      bio,
      location,
      phone,
    });
    
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile details have been updated successfully.",
    });
  };

  const handleJoinBatch = async (code: string): Promise<boolean> => {
    try {
      // In a real app, this would make an API call to verify the code and join the batch
      console.log("Joining batch with code:", code);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update profile with batch info (mock)
      onUpdateProfile({
        batchCode: code,
        batchName: "Study Group",
      });
      
      return true;
    } catch (error) {
      console.error("Error joining batch:", error);
      return false;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>
            Your personal information visible to others
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="City, State"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (123) 456-7890"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Personal Information</h3>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{userProfile.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{userProfile.phone || "Not provided"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">{userProfile.location || "Not provided"}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Book className="h-5 w-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Currently Studying</p>
                      <p className="font-medium">{userProfile.examPrep || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {userProfile.bio && (
                <div className="pt-2">
                  <h3 className="text-lg font-medium mb-2">Bio</h3>
                  <p className="text-gray-700 dark:text-gray-300">{userProfile.bio}</p>
                </div>
              )}
              
              <div className="flex justify-end">
                <Button onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Batch Management Section */}
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-500" />
                  Study Batch
                </CardTitle>
                <CardDescription>
                  Join or create a study batch with friends or classmates
                </CardDescription>
              </div>
              {userProfile.batchName ? (
                <Button
                  variant="outline"
                  onClick={() => window.location.href = '/dashboard/student/batch-management'}
                >
                  Manage Batch
                </Button>
              ) : (
                <Button
                  onClick={() => window.location.href = '/dashboard/student/subscription'}
                >
                  Create Batch
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {userProfile.batchName ? (
              <div className="rounded-lg border p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-lg">{userProfile.batchName}</p>
                    <p className="text-sm text-muted-foreground">
                      You're currently part of this study batch
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <BatchInvitationInput onJoinBatch={handleJoinBatch} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileDetails;
