
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { UserProfileType } from "@/types/user/base";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Upload, Star, Users, User, Settings, CreditCard } from "lucide-react";
import { MoodType } from "@/types/user/base";
import { formatDate } from "@/utils/dateUtils";

interface ProfileCardProps {
  profile: UserProfileType;
  showPeerRanking?: boolean;
  onUploadImage?: (file: File) => void;
  currentMood?: MoodType;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  showPeerRanking = false,
  onUploadImage,
  currentMood
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [imageHover, setImageHover] = useState(false);
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB.",
          variant: "destructive"
        });
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file.",
          variant: "destructive"
        });
        return;
      }
      
      // Call the upload function
      onUploadImage && onUploadImage(file);
    }
  };
  
  const handleEditProfile = () => {
    navigate("/profile/edit");
  };
  
  const handleEditAvatar = () => {
    fileInputRef.current?.click();
  };
  
  const handleUpgradePlan = () => {
    navigate("/subscription/plans");
  };
  
  const getSubscriptionDisplay = () => {
    if (!profile.subscription) {
      return { label: "Free Plan", badgeColor: "bg-gray-100 text-gray-800 border-gray-200" };
    }
    
    const subscriptionType = typeof profile.subscription === 'string' 
      ? profile.subscription 
      : profile.subscription.planType;
    
    switch (subscriptionType) {
      case "premium":
        return { label: "Premium Plan", badgeColor: "bg-purple-100 text-purple-800 border-purple-200" };
      case "enterprise":
        return { label: "Enterprise", badgeColor: "bg-indigo-100 text-indigo-800 border-indigo-200" };
      case "school":
        return { label: "School Plan", badgeColor: "bg-green-100 text-green-800 border-green-200" };
      case "corporate":
        return { label: "Corporate", badgeColor: "bg-blue-100 text-blue-800 border-blue-200" };
      case "basic":
        return { label: "Basic Plan", badgeColor: "bg-amber-100 text-amber-800 border-amber-200" };
      default:
        return { label: "Free Plan", badgeColor: "bg-gray-100 text-gray-800 border-gray-200" };
    }
  };
  
  const getSubscriptionDetails = () => {
    if (typeof profile.subscription === 'object' && profile.subscription) {
      const endDate = profile.subscription.endDate || profile.subscription.expiresAt;
      
      const isGroupLeader = profile.subscription.role === 'leader' || profile.subscription.isGroupLeader;
      const planName = profile.subscription.planName || profile.subscription.plan || "Subscription";
      
      return {
        endDate,
        isGroupLeader,
        planName
      };
    }
    
    return null;
  };
  
  const subscriptionDisplay = getSubscriptionDisplay();
  const subscriptionDetails = getSubscriptionDetails();

  return (
    <Card>
      <CardHeader className="pb-2 pt-6">
        <div className="flex justify-center items-center relative">
          <div
            className="relative"
            onMouseEnter={() => setImageHover(true)}
            onMouseLeave={() => setImageHover(false)}
            onClick={handleEditAvatar}
          >
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatar || ""} />
              <AvatarFallback className="text-lg">
                {profile.name ? profile.name.charAt(0).toUpperCase() : "U"}
              </AvatarFallback>
            </Avatar>
            {onUploadImage && (
              <div
                className={`absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center transition-opacity cursor-pointer ${
                  imageHover ? "opacity-100" : "opacity-0"
                }`}
              >
                <Upload className="h-6 w-6 text-white" />
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <h2 className="text-lg font-medium">{profile.name}</h2>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          <div className="mt-2">
            <Badge 
              variant="outline" 
              className={`${subscriptionDisplay.badgeColor}`}
            >
              {subscriptionDisplay.label}
            </Badge>
            
            {currentMood && (
              <Badge 
                variant="outline" 
                className="ml-2 bg-blue-50 text-blue-700 border-blue-100"
              >
                {currentMood}
              </Badge>
            )}
          </div>
        </div>

        {showPeerRanking && (
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-sm">
              <span>Peer Ranking</span>
              <span className="font-medium">Top 15%</span>
            </div>
            <Progress value={85} className="h-2" />
            <div className="flex items-center justify-center text-xs text-muted-foreground">
              <Star className="h-3 w-3 mr-1 text-amber-500" />
              <span>Based on your performance</span>
            </div>
          </div>
        )}
        
        {/* Subscription details section */}
        {profile.subscription && (
          <div className="border rounded-md p-3 space-y-2 bg-gray-50">
            <h3 className="text-sm font-medium flex items-center gap-1">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              Subscription Details
            </h3>
            
            <div className="space-y-1">
              {subscriptionDetails?.planName && (
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Plan:</span>
                  <span>{subscriptionDetails.planName}</span>
                </div>
              )}
              
              {subscriptionDetails?.endDate && (
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Expires:</span>
                  <span>{formatDate(new Date(subscriptionDetails.endDate))}</span>
                </div>
              )}
              
              {typeof profile.subscription === 'object' && profile.subscription.batchCode && (
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Batch:</span>
                  <span>{profile.subscription.batchName || profile.subscription.batchCode}</span>
                </div>
              )}
              
              {subscriptionDetails?.isGroupLeader && (
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Role:</span>
                  <Badge variant="outline" className="text-[10px] py-0 h-4 bg-blue-50 text-blue-700 border-blue-100">
                    Group Leader
                  </Badge>
                </div>
              )}
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-2 text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-50"
              onClick={handleUpgradePlan}
            >
              Upgrade Plan
            </Button>
          </div>
        )}

        <div className="flex flex-col space-y-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={handleEditProfile}
          >
            <User className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
          
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate("/settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          
          {typeof profile.subscription === 'object' && 
           profile.subscription.batchCode && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate("/group-management")}
            >
              <Users className="mr-2 h-4 w-4" />
              Manage Group
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
