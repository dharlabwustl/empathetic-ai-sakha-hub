
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, ChevronRight } from "lucide-react";
import { UserProfileType } from "@/types/user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useSubscriptionFlow } from "@/contexts/SubscriptionFlowContext";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import PricingSection from "@/components/pricing/PricingSection";

interface ProfileCardProps {
  profile: UserProfileType;
  onUploadImage?: (file: File) => void;
  showPeerRanking?: boolean;
  currentMood?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  profile, 
  onUploadImage, 
  showPeerRanking = false, 
  currentMood 
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const { startSubscriptionFlow } = useSubscriptionFlow();
  
  // Get subscription information from user profile
  const subscriptionPlan = profile.subscriptionPlan || 'free';
  const subscriptionTier = capitalizeFirstLetter(subscriptionPlan);
  const expiryDate = profile.subscriptionEndDate 
    ? new Date(profile.subscriptionEndDate).toLocaleDateString() 
    : null;
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onUploadImage) {
      onUploadImage(e.target.files[0]);
    }
  };

  const handleOpenUpgrade = () => {
    setIsUpgradeOpen(true);
  };

  const getPlanColorClass = () => {
    switch(subscriptionPlan) {
      case 'premium':
        return 'bg-gradient-to-r from-purple-600 to-violet-700 text-white';
      case 'basic':
        return 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white';
      case 'free':
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-br from-purple-600 to-violet-700 h-24"></div>
      <div className="px-5 pt-0 pb-5">
        <div className="flex justify-center -mt-12 mb-3 relative" 
          onMouseEnter={() => onUploadImage && setIsHovering(true)}
          onMouseLeave={() => onUploadImage && setIsHovering(false)}>
          <Avatar className="h-24 w-24 border-4 border-white relative">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback className="text-2xl bg-gray-200">
              {profile.name?.charAt(0).toUpperCase()}
            </AvatarFallback>
            {onUploadImage && isHovering && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <label htmlFor="avatar-upload" className="cursor-pointer text-white text-sm flex flex-col items-center">
                  <Edit size={16} />
                  <span>Change</span>
                </label>
                <input 
                  id="avatar-upload" 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload} 
                />
              </div>
            )}
          </Avatar>
        </div>
        <div className="text-center mb-4">
          <h3 className="font-semibold text-lg">{profile.name}</h3>
          <p className="text-sm text-gray-500">{profile.email}</p>
          
          <div className="flex items-center justify-center mt-2 space-x-2">
            {currentMood && (
              <Badge variant="outline" className="font-normal">
                Feeling {currentMood}
              </Badge>
            )}
            {showPeerRanking && (
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-50 border-yellow-200 font-normal">
                Top 10% in Physics
              </Badge>
            )}
          </div>
        </div>
        
        {/* Subscription Information */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">Subscription</h4>
            <Dialog open={isUpgradeOpen} onOpenChange={setIsUpgradeOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-blue-600"
                >
                  Upgrade <ChevronRight size={14} />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px] p-0">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-center mb-4">Upgrade Your Plan</h2>
                  <PricingSection currentPlan={subscriptionPlan} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className={`flex items-center justify-between p-3 rounded-md ${getPlanColorClass()}`}>
            <div>
              <span className="text-xs opacity-80">Current Plan</span>
              <h5 className="font-medium">{subscriptionTier} Plan</h5>
            </div>
            {expiryDate && (
              <div className="text-right">
                <span className="text-xs opacity-80">Renews</span>
                <p className="text-sm">{expiryDate}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-col gap-2">
            <div className="text-sm text-gray-600">
              <span className="text-gray-500">Institute: </span>
              {profile.institute || "Not specified"}
            </div>
            {profile.goals?.[0] && (
              <div className="text-sm text-gray-600">
                <span className="text-gray-500">Preparing for: </span>
                {profile.goals[0].title}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
