
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Camera, Edit, MapPin, User, BookOpen, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { UserProfileType } from '@/types/user';
import { formatDate } from '@/utils/dateUtils';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface EnhancedProfileCardProps {
  profile: UserProfileType;
  onUploadImage?: (file: File) => void;
}

const EnhancedProfileCard: React.FC<EnhancedProfileCardProps> = ({
  profile,
  onUploadImage
}) => {
  const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: profile.name || '',
    location: profile.location || 'New Delhi, India',
    gender: profile.gender || 'Male',
    personalityType: profile.personalityType || 'Visual Learner',
    examGoal: profile.goals?.[0]?.title || 'IIT-JEE 2025',
  });
  
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0 && onUploadImage) {
      onUploadImage(files[0]);
    }
  };
  
  const handleEditProfile = () => {
    // In a real app, this would make an API call to update the profile
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
    
    setShowEditDialog(false);
  };

  return (
    <>
      <Card>
        <CardHeader className="relative pb-8">
          <div className="absolute top-4 right-4">
            <Button size="sm" variant="ghost" onClick={() => setShowEditDialog(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <div
              className="relative"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                <AvatarImage src={profile.avatar || ""} />
                <AvatarFallback className="text-3xl">
                  {profile.name
                    ? profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                    : "?"}
                </AvatarFallback>
              </Avatar>
              
              {onUploadImage && (
                <>
                  <input
                    type="file"
                    ref={setFileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*"
                  />
                  <Button
                    onClick={() => fileInputRef?.click()}
                    size="icon"
                    variant="secondary"
                    className={`absolute bottom-0 right-0 rounded-full shadow-md transition-opacity ${
                      isHovering ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Camera size={16} />
                  </Button>
                </>
              )}
            </div>

            <h3 className="font-bold text-xl mt-4">{profile.name}</h3>
            <p className="text-muted-foreground text-sm">{profile.email}</p>
            
            <div className="flex flex-wrap gap-2 mt-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <User className="h-3 w-3 mr-1" />
                {profile.role}
              </Badge>
              
              {profile.personalityType && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  {profile.personalityType}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{profile.location || 'New Delhi, India'}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span>Preparing for {profile.goals?.[0]?.title || 'IIT-JEE'}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Member since {profile.joinDate ? formatDate(profile.joinDate) : 'January 2025'}</span>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <h4 className="text-sm font-medium mb-2">Learning Statistics</h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xl font-bold">42</p>
                <p className="text-xs text-muted-foreground">Concepts</p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">Flashcards</p>
              </div>
              <div className="p-2 bg-muted rounded-md">
                <p className="text-xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Exams</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your personal information and preferences.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={editedProfile.name} 
                onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                value={editedProfile.location} 
                onChange={(e) => setEditedProfile({...editedProfile, location: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <Select 
                  value={editedProfile.gender} 
                  onValueChange={(value) => setEditedProfile({...editedProfile, gender: value})}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                    <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="personality">Learning Style</Label>
                <Select 
                  value={editedProfile.personalityType} 
                  onValueChange={(value) => setEditedProfile({...editedProfile, personalityType: value})}
                >
                  <SelectTrigger id="personality">
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Visual Learner">Visual Learner</SelectItem>
                    <SelectItem value="Auditory Learner">Auditory Learner</SelectItem>
                    <SelectItem value="Reading/Writing Learner">Reading/Writing Learner</SelectItem>
                    <SelectItem value="Kinesthetic Learner">Kinesthetic Learner</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="exam-goal">Exam Goal</Label>
              <Input 
                id="exam-goal" 
                value={editedProfile.examGoal} 
                onChange={(e) => setEditedProfile({...editedProfile, examGoal: e.target.value})}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
            <Button onClick={handleEditProfile}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EnhancedProfileCard;
