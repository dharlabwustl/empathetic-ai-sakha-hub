
import { UserProfileType } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Trophy, Users, Star } from "lucide-react";
import { SubscriptionType, UserSubscription } from "@/types/user/base";
import { useState } from "react";

interface ProfileCardProps {
  profile: UserProfileType;
  showPeerRanking?: boolean;
  onUploadImage?: (file: File) => void;
  currentMood?: string;
}

export default function ProfileCard({
  profile,
  showPeerRanking = false,
  onUploadImage,
  currentMood
}: ProfileCardProps) {
  const fileInputRef = useState<HTMLInputElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);

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
        
        <div className="border-t pt-3 space-y-2">
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
          
          {profile.goals && profile.goals.length > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Goal</span>
              <span>{profile.goals[0].title}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center pt-1">
            <Button variant="outline" size="sm" className="w-full">
              <Users size={16} className="mr-2" /> View Full Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
