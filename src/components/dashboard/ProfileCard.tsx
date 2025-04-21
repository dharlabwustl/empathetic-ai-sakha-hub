
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserProfileType } from "@/types/user/base";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Crown, User } from "lucide-react";

interface ProfileCardProps {
  profile: UserProfileType;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, className = "" }) => {
  const navigate = useNavigate();
  
  const handleViewProfile = () => {
    navigate("/dashboard/student/profile");
  };
  
  const handleUpgradePlan = () => {
    navigate("/dashboard/student/subscription");
  };

  // Helper function to determine if user needs to upgrade
  const needsUpgrade = () => {
    if (!profile.subscription) return true;
    
    // If subscription is a string (enum value)
    if (typeof profile.subscription === 'string') {
      return profile.subscription === 'basic' || profile.subscription === 'free';
    }
    
    // If subscription is an object
    return profile.subscription.plan === 'basic' || profile.subscription.plan === 'free';
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback>
                {profile.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div>
              <h3 className="font-medium">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
            </div>
          </div>
          
          {needsUpgrade() && (
            <Button 
              variant="outline" 
              size="sm"
              className="text-amber-700 border-amber-200 hover:bg-amber-50"
              onClick={handleUpgradePlan}
            >
              <Crown className="mr-2 h-4 w-4" />
              Upgrade
            </Button>
          )}
        </div>
        
        <Button 
          variant="outline"
          className="w-full mt-4"
          onClick={handleViewProfile}
        >
          <User className="mr-2 h-4 w-4" />
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
