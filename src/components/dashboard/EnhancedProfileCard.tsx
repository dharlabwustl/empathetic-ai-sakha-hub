
import { UserProfileType } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Trophy, Users, Star, CreditCard, Award, ArrowUp, Check } from "lucide-react";
import { SubscriptionType, UserSubscription } from "@/types/user/base";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

interface EnhancedProfileCardProps {
  profile: UserProfileType;
  showPeerRanking?: boolean;
  onUploadImage?: (file: File) => void;
  currentMood?: string;
}

export default function EnhancedProfileCard({
  profile,
  showPeerRanking = false,
  onUploadImage,
  currentMood
}: EnhancedProfileCardProps) {
  const fileInputRef = useState<HTMLInputElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0 && onUploadImage) {
      onUploadImage(files[0]);
    }
  };

  // Helper function to determine if subscription is an object or enum
  const isSubscriptionObject = (
    sub: SubscriptionType | UserSubscription | undefined
  ): sub is UserSubscription => {
    return typeof sub === "object" && sub !== null;
  };

  // Get the subscription type, whether it's a direct enum or from an object
  const getSubscriptionType = (
    sub: SubscriptionType | UserSubscription | undefined
  ): SubscriptionType => {
    if (!sub) return SubscriptionType.Free;
    if (isSubscriptionObject(sub)) {
      return sub.planType;
    }
    return sub;
  };

  // Check if the subscription is active
  const isSubscriptionActive = (): boolean => {
    if (!profile.subscription) return false;
    
    if (isSubscriptionObject(profile.subscription)) {
      // Check if current date is before expiryDate
      if (profile.subscription.expiryDate) {
        const now = new Date();
        const expiry = new Date(profile.subscription.expiryDate);
        return now < expiry && profile.subscription.isActive;
      }
      return profile.subscription.isActive === true;
    }
    
    // If it's just a subscription enum, assume it's active if it's not Free
    return profile.subscription !== SubscriptionType.Free;
  };

  // Get the subscription plan name
  const getSubscriptionPlanName = (): string => {
    const subscriptionType = getSubscriptionType(profile.subscription);
    
    // Map subscription types to display names
    const subscriptionDisplayNames: Record<SubscriptionType, string> = {
      [SubscriptionType.Free]: "Free Plan",
      [SubscriptionType.Basic]: "Basic Plan",
      [SubscriptionType.Premium]: "Premium Plan",
      [SubscriptionType.Enterprise]: "Enterprise Plan",
      [SubscriptionType.School]: "School Plan",
      [SubscriptionType.Corporate]: "Corporate Plan"
    };
    
    // Use plan name from the map or fallback to subscription type
    return subscriptionDisplayNames[subscriptionType] || String(subscriptionType);
  };
  
  // Get badge color based on subscription
  const getSubscriptionBadgeColor = (): string => {
    const subscriptionType = getSubscriptionType(profile.subscription);
    
    // Map subscription types to badge colors
    const badgeColors: Record<SubscriptionType, string> = {
      [SubscriptionType.Free]: "bg-gray-500 hover:bg-gray-600",
      [SubscriptionType.Basic]: "bg-blue-500 hover:bg-blue-600",
      [SubscriptionType.Premium]: "bg-purple-500 hover:bg-purple-600",
      [SubscriptionType.Enterprise]: "bg-amber-500 hover:bg-amber-600",
      [SubscriptionType.School]: "bg-green-500 hover:bg-green-600",
      [SubscriptionType.Corporate]: "bg-indigo-500 hover:bg-indigo-600"
    };
    
    // Use color from the map or fallback to gray
    return badgeColors[subscriptionType] || "bg-gray-500 hover:bg-gray-600";
  };

  // Get formatted join date
  const getJoinDate = (): string => {
    return profile.joinDate
      ? new Date(profile.joinDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      : 'N/A';
  };
  
  // Get exam goal from profile
  const getExamGoal = (): string | null => {
    if (profile.goals && profile.goals.length > 0) {
      return profile.goals[0].title;
    }
    return null;
  };
  
  // Get target year from profile goals
  const getTargetYear = (): string | null => {
    if (profile.goals && profile.goals.length > 0 && profile.goals[0].targetDate) {
      return new Date(profile.goals[0].targetDate).getFullYear().toString();
    }
    return new Date().getFullYear().toString();
  };
  
  const handleUpgradeClick = () => {
    navigate('/dashboard/student/subscription');
  };

  const examGoal = getExamGoal();
  const targetYear = getTargetYear();
  const isActive = isSubscriptionActive();

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex justify-between items-center">
          <span>Profile</span>
          <Badge className={`${getSubscriptionBadgeColor()} text-white`}>
            {getSubscriptionPlanName()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center pb-3 relative">
          <div
            className="relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
              <AvatarImage src={profile.avatar || ""} />
              <AvatarFallback className="text-2xl">
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
                  ref={(el) => {
                    if (fileInputRef) fileInputRef[1](el);
                  }}
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*"
                />
                <Button
                  onClick={() => fileInputRef[0]?.click()}
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

          <h3 className="font-medium text-lg mt-2">{profile.name}</h3>
          <p className="text-muted-foreground text-sm">{profile.email}</p>
          
          {currentMood && (
            <Badge variant="outline" className="mt-2">
              Mood: {currentMood}
            </Badge>
          )}
          
          {showPeerRanking && (
            <div className="flex items-center mt-2 text-amber-500">
              <Trophy size={16} className="mr-1" />
              <span className="text-sm">
                Top 15% in your peer group
              </span>
            </div>
          )}
        </div>
        
        {/* Subscription Status Section */}
        <div className="border-t pt-3 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Plan Status</span>
            <Badge variant={isActive ? "default" : "destructive"} className="text-xs">
              {isActive ? "Active" : "Expired"}
            </Badge>
          </div>
          
          {isSubscriptionObject(profile.subscription) && profile.subscription.expiryDate && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Valid Until</span>
              <span className="text-sm">
                {new Date(profile.subscription.expiryDate).toLocaleDateString()}
              </span>
            </div>
          )}
          
          {getSubscriptionType(profile.subscription) === SubscriptionType.Free && (
            <Button 
              className="w-full mt-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
              size="sm"
              onClick={handleUpgradeClick}
            >
              <ArrowUp size={16} className="mr-1" /> Upgrade Plan
            </Button>
          )}
        </div>
        
        {/* Exam Goal Section */}
        {examGoal && (
          <div className="border-t mt-4 pt-3 space-y-2">
            <div className="flex items-center">
              <Award size={16} className="text-amber-500 mr-1.5" />
              <span className="text-sm font-medium">Exam Goal</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-base font-medium">{examGoal}</span>
              <Badge variant="outline">{targetYear}</Badge>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Progress</span>
                <span>65%</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          </div>
        )}
        
        <div className="border-t mt-4 pt-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Role</span>
            <span className="font-medium">{profile.role}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Joined</span>
            <span>{getJoinDate()}</span>
          </div>

          {profile.personalityType && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Personality</span>
              <span>{profile.personalityType}</span>
            </div>
          )}
        </div>
        
        {/* Billing Information Button */}
        <div className="border-t mt-4 pt-3">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full flex items-center justify-center"
            onClick={handleUpgradeClick}
          >
            <CreditCard size={16} className="mr-2" /> 
            {getSubscriptionType(profile.subscription) === SubscriptionType.Free 
              ? "View Subscription Plans" 
              : "Manage Subscription"}
          </Button>
        </div>
        
        {/* Group/Batch Information */}
        {isSubscriptionObject(profile.subscription) && 
         profile.subscription.features?.includes('batch_leader') && (
          <div className="border-t mt-4 pt-3">
            <Button 
              variant="default" 
              size="sm" 
              className="w-full flex items-center justify-center"
              onClick={() => navigate('/dashboard/student/batch')}
            >
              <Users size={16} className="mr-2" /> 
              Manage Your Batch
            </Button>
          </div>
        )}
        
        {isSubscriptionObject(profile.subscription) && 
         profile.subscription.features?.includes('batch_member') &&
         !profile.subscription.features?.includes('batch_leader') && (
          <div className="border-t mt-4 pt-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-center"
              onClick={() => navigate('/dashboard/student/batch')}
            >
              <Users size={16} className="mr-2" /> 
              View Batch Details
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
