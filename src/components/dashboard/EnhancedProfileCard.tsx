
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Smile, BookOpen, CheckCircle, BrainCircuit } from 'lucide-react';
import { getInitials } from "@/lib/utils";
import { UserProfileBase, MoodType } from "@/types/user/base";
import { MoodSelector } from './student/MoodSelector';

interface EnhancedProfileCardProps {
  userProfile: UserProfileBase;
  onMoodChange?: (mood: MoodType) => void;
  currentMood?: MoodType;
}

const EnhancedProfileCard: React.FC<EnhancedProfileCardProps> = ({ userProfile, onMoodChange, currentMood }) => {
  // Mock function to handle level up
  const handleLevelUp = () => {
    alert("Congratulations! You've leveled up!");
  };

  // Function to format the last active time
  const formatLastActive = (lastActive: string | undefined) => {
    if (!lastActive) return "Recently";
    
    const date = new Date(lastActive);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days === 1) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute top-2 right-2 z-10">
        <Badge variant="secondary">Level {userProfile.level || 1}</Badge>
      </div>
      
      <CardHeader className="relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 ring-2 ring-primary/30">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback>{getInitials(userProfile.name)}</AvatarFallback>
            </Avatar>
            
            <div>
              <CardTitle className="text-lg font-semibold">{userProfile.name}</CardTitle>
              <CardDescription>
                Last active: {formatLastActive(userProfile.lastActive)}
              </CardDescription>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" onClick={handleLevelUp}>
              Level Up
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-4 w-4 text-blue-500" />
            <span>{userProfile.conceptsLearned || 0} Concepts</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>{userProfile.testsCompleted || 0} Tests</span>
          </div>
          <div className="flex items-center space-x-2">
            <BrainCircuit className="h-4 w-4 text-purple-500" />
            <span>{userProfile.studyHours || 0} Hours</span>
          </div>
          <div className="flex items-center space-x-2">
            <Smile className="h-4 w-4 text-amber-500" />
            <span>Streak: {userProfile.streak || 0} Days</span>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">How are you feeling today?</h3>
          <MoodSelector currentMood={currentMood} onMoodSelect={onMoodChange!} />
        </div>
      </CardContent>
      
      <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none">
        <div className="w-48 h-48 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-full -mb-24 -mr-24"></div>
      </div>
    </Card>
  );
};

export default EnhancedProfileCard;
