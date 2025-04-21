
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpRight, 
  Calendar, 
  Crown, 
  Edit, 
  Medal, 
  Star, 
  UploadCloud, 
  Users,
  User
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { getInitials } from "@/utils/stringUtils";
import { UserProfileType, MoodType } from "@/types/user/base";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  profile: UserProfileType;
  showPeerRanking?: boolean;
  showMoodStatus?: boolean;
  currentMood?: MoodType;
  onUploadImage?: (file: File) => void;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  showPeerRanking = false,
  showMoodStatus = false,
  currentMood,
  onUploadImage,
  className = "",
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0] || !onUploadImage) return;
    
    setIsUploading(true);
    setProgress(0);
    
    // Simulate progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(timer);
          return prev;
        }
        return prev + 5;
      });
    }, 50);
    
    // Simulate upload delay
    setTimeout(() => {
      onUploadImage(files[0]);
      setIsUploading(false);
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    }, 1000);
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleViewProfile = () => {
    navigate("/dashboard/student/profile");
  };
  
  const handleUpgradePlan = () => {
    navigate("/dashboard/student/subscription");
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="relative p-4 pb-0">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{profile.name}</CardTitle>
          {onUploadImage && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleUploadClick}
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CardDescription className="flex items-center gap-1 text-xs">
          {profile.role === "student" ? "Student" : profile.role}
          {profile.batchName && (
            <>
              <span className="text-gray-400">•</span>
              <Badge variant="outline" className="text-xs py-0 h-5 px-1.5">
                <Users className="h-3 w-3 mr-1" />
                {profile.batchName}
              </Badge>
            </>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-16 w-16 border-2 border-white shadow-md">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            
            {isUploading && progress > 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-black/30 flex items-center justify-center">
                  <UploadCloud className="h-6 w-6 text-white" />
                </div>
                <Progress
                  value={progress}
                  className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200"
                />
              </div>
            )}
            
            {onUploadImage && (
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col gap-1">
              {profile.goals && profile.goals[0] && (
                <div className="text-sm flex items-center">
                  <Star className="h-3.5 w-3.5 text-amber-500 mr-1" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Preparing for {profile.goals[0].title}
                  </span>
                </div>
              )}
              
              {profile.goals && profile.goals[0]?.examDate && (
                <div className="text-sm flex items-center">
                  <Calendar className="h-3.5 w-3.5 text-blue-500 mr-1" />
                  <span className="text-gray-600 dark:text-gray-300">
                    Exam Date: {profile.goals[0].examDate}
                  </span>
                </div>
              )}
              
              {showPeerRanking && profile.peerRanking && (
                <div className="text-sm flex items-center">
                  <Medal className="h-3.5 w-3.5 text-purple-500 mr-1" />
                  <span className="text-gray-600 dark:text-gray-300">
                    #{profile.peerRanking} in your batch
                  </span>
                </div>
              )}
              
              {showMoodStatus && currentMood && (
                <Badge
                  variant="outline"
                  className="w-fit text-xs py-0 px-2 gap-1 mt-1"
                >
                  Feeling {currentMood}
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        {profile.subscription && (
          <div className="mt-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Crown className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-sm font-medium text-amber-700 dark:text-amber-400">
                  {typeof profile.subscription === 'object' && profile.subscription.plan ? 
                    profile.subscription.plan : 
                    String(profile.subscription)} Plan
                </span>
              </div>
              {typeof profile.subscription === 'object' && profile.subscription.expiresAt && (
                <span className="text-xs text-gray-500">
                  Expires: {new Date(profile.subscription.expiresAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0 gap-2 flex">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex gap-1 items-center text-xs"
          onClick={handleViewProfile}
        >
          <User className="h-3.5 w-3.5" />
          View Profile
        </Button>
        <Button 
          variant="default" 
          size="sm" 
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white flex gap-1 items-center text-xs"
          onClick={handleUpgradePlan}
        >
          <Crown className="h-3.5 w-3.5" />
          Upgrade Plan
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
