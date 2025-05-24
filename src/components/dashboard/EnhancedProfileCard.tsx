import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  User, 
  Calendar, 
  Target, 
  Trophy, 
  BookOpen, 
  Clock,
  Edit,
  Camera
} from "lucide-react";
import { MoodType, UserProfileBase } from "@/types/user/base";

interface EnhancedProfileCardProps {
  userProfile: UserProfileBase;
  onProfileImageUpdate?: (imageUrl: string) => void;
}

const EnhancedProfileCard: React.FC<EnhancedProfileCardProps> = ({ 
  userProfile, 
  onProfileImageUpdate 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newProfileImage, setNewProfileImage] = useState<string | null>(null);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (newProfileImage && onProfileImageUpdate) {
      onProfileImageUpdate(newProfileImage);
    }
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewProfileImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const moodEmojis = {
    [MoodType.Happy]: '😊',
    [MoodType.Motivated]: '🔥',
    [MoodType.Focused]: '🎯',
    [MoodType.Calm]: '😌',
    [MoodType.Tired]: '😴',
    [MoodType.Confused]: '😕',
    [MoodType.Anxious]: '😰',
    [MoodType.Stressed]: '😫',
    [MoodType.Overwhelmed]: '😵',
    [MoodType.Neutral]: '😐',
    [MoodType.Okay]: '👍',
    [MoodType.Sad]: '😢'
  };

  return (
    <Card className="w-full">
      <CardContent className="flex flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              {isEditing ? (
                <label htmlFor="image-upload" className="cursor-pointer">
                  {newProfileImage ? (
                    <AvatarImage src={newProfileImage} alt="New Profile" className="rounded-full" />
                  ) : (
                    <AvatarImage src={userProfile.avatar} alt={userProfile.name} className="rounded-full" />
                  )}
                  <div className="absolute inset-0 bg-black opacity-50 rounded-full flex items-center justify-center">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </label>
              ) : (
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} className="rounded-full" />
              )}
              <AvatarFallback>{userProfile.name?.charAt(0)}</AvatarFallback>
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{userProfile.name}</h3>
              <p className="text-sm text-muted-foreground">{userProfile.email}</p>
              {userProfile.mood && (
                <Badge variant="secondary" className="mt-1">
                  {moodEmojis[userProfile.mood]} {userProfile.mood}
                </Badge>
              )}
            </div>
          </div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={handleCancelClick}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveClick}>
                Save
              </Button>
            </div>
          ) : (
            <Button size="sm" variant="ghost" onClick={handleEditClick}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {userProfile.grade || 'N/A'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Joined {new Date(userProfile.loginCount ? Date.now() : Date.now()).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Goal Progress</span>
            </div>
            <span className="text-sm text-muted-foreground">75%</span>
          </div>
          <Progress value={75} />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Study Streak</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {userProfile.studyStreak || 0} days
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">24 Concepts</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Avg. 2.5 hrs/day</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedProfileCard;
