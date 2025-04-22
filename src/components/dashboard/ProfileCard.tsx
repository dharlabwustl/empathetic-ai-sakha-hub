
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfileType } from "@/types/user/base";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, User, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface ProfileCardProps {
  profile: UserProfileType;
  className?: string;
  onUploadImage?: (file: File) => void;
  showPeerRanking?: boolean;
  currentMood?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  profile, 
  className = "", 
  onUploadImage,
  showPeerRanking = false,
  currentMood
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  
  const handleViewProfile = () => {
    navigate("/dashboard/student/profile");
  };
  
  const handleUpgradePlan = () => {
    navigate("/dashboard/student/subscription");
  };

  // Default avatar images
  const femaleAvatar = "/lovable-uploads/f436a725-c9b9-4a8c-964e-0c271ed95dd4.png";
  const maleAvatar = "/lovable-uploads/ad945ccd-0301-4d99-938f-aee38d42e2d1.png";
  const defaultAvatar = profile?.personalDetails?.gender === 'female' ? femaleAvatar : maleAvatar;

  // Helper function to determine if user needs to upgrade
  const needsUpgrade = () => {
    if (!profile.subscription) return true;
    
    // If subscription is a string (enum value)
    if (typeof profile.subscription === 'string') {
      return profile.subscription === 'basic' || profile.subscription === 'free';
    }
    
    // If subscription is an object with plan property
    if (typeof profile.subscription === 'object' && profile.subscription !== null && 'plan' in profile.subscription) {
      return profile.subscription.plan === 'basic' || profile.subscription.plan === 'free';
    }
    
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      const file = e.target.files[0];
      
      if (onUploadImage) {
        onUploadImage(file);
        setTimeout(() => {
          setIsUploading(false);
          toast({
            title: "Avatar Updated",
            description: "Your profile image has been updated successfully.",
          });
        }, 1000);
      } else {
        // Mock implementation if onUploadImage is not provided
        setTimeout(() => {
          toast({
            title: "Avatar Updated",
            description: "Your profile image has been updated successfully.",
          });
          setIsUploading(false);
        }, 1000);
      }
    }
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-4">
        <div className="flex flex-col items-center gap-3 mb-4">
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatar || defaultAvatar} />
              <AvatarFallback>
                {profile.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            
            <div className="absolute bottom-0 right-0">
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="bg-primary text-white rounded-full p-1 hover:opacity-90">
                  <Upload className="h-4 w-4" />
                </div>
              </label>
              <Input 
                id="avatar-upload" 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </div>
            
            {currentMood && (
              <div className="absolute top-0 right-0">
                <Badge variant="outline" className="bg-white">
                  {currentMood}
                </Badge>
              </div>
            )}
          </div>
          
          <div className="text-center">
            <h3 className="font-medium">{profile.name}</h3>
            <p className="text-sm text-muted-foreground">{profile.email}</p>
            
            {profile.batchName && (
              <Badge variant="outline" className="mt-1 bg-blue-50 text-blue-700 border-blue-200">
                Batch: {profile.batchName}
              </Badge>
            )}
            
            {profile.isGroupLeader && (
              <Badge className="mt-1 ml-2 bg-amber-100 text-amber-800 border-amber-200">
                <Crown className="h-3 w-3 mr-1" /> Leader
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex flex-col gap-3">
          {needsUpgrade() && (
            <Button 
              variant="outline" 
              size="sm"
              className="text-amber-700 border-amber-200 hover:bg-amber-50 w-full"
              onClick={handleUpgradePlan}
            >
              <Crown className="mr-2 h-4 w-4" />
              Upgrade Plan
            </Button>
          )}
          
          <Button 
            variant="outline"
            className="w-full"
            onClick={handleViewProfile}
          >
            <User className="mr-2 h-4 w-4" />
            View Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
