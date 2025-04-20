import { UserProfileType } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera, Trophy, Mail, Phone, User, Crown, CalendarDays, Users, Package } from "lucide-react";
import { SubscriptionType, UserSubscription } from "@/types/user";
import { useState } from "react";
import { Link } from "react-router-dom";
import { format, addDays } from "date-fns";

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

  const isSubscriptionObject = (
    sub: SubscriptionType | UserSubscription | undefined
  ): sub is UserSubscription => {
    return typeof sub === "object" && sub !== null;
  };

  const getSubscriptionType = (
    sub: SubscriptionType | UserSubscription | undefined
  ): SubscriptionType => {
    if (!sub) return SubscriptionType.Free;
    if (isSubscriptionObject(sub)) {
      return sub.planType;
    }
    return sub;
  };

  const getSubscriptionPlanName = (): string => {
    const subscriptionType = getSubscriptionType(profile.subscription);
    
    const subscriptionDisplayNames: Record<string, string> = {
      [SubscriptionType.Free]: "Free Plan",
      [SubscriptionType.Basic]: "Basic Plan",
      [SubscriptionType.Premium]: "Premium Plan",
      [SubscriptionType.Group]: "Group Plan",
      [SubscriptionType.Institute]: "Institute Plan",
      [SubscriptionType.Corporate]: "Corporate Plan"
    };
    
    return subscriptionDisplayNames[subscriptionType] || String(subscriptionType);
  };

  const getSubscriptionBadgeColor = (): string => {
    const subscriptionType = getSubscriptionType(profile.subscription);
    
    const badgeColors: Record<string, string> = {
      [SubscriptionType.Free]: "bg-gray-500 hover:bg-gray-600",
      [SubscriptionType.Basic]: "bg-blue-500 hover:bg-blue-600",
      [SubscriptionType.Premium]: "bg-purple-500 hover:bg-purple-600",
      [SubscriptionType.Group]: "bg-amber-500 hover:bg-amber-600",
      [SubscriptionType.Institute]: "bg-green-500 hover:bg-green-600",
      [SubscriptionType.Corporate]: "bg-indigo-500 hover:bg-indigo-600"
    };
    
    return badgeColors[subscriptionType] || "bg-gray-500 hover:bg-gray-600";
  };

  const getJoinDate = (): string => {
    return profile.joinDate
      ? new Date(profile.joinDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })
      : 'N/A';
  };

  const getFreeTrialStatus = () => {
    if (getSubscriptionType(profile.subscription) === SubscriptionType.Free) {
      const joinDate = profile.joinDate ? new Date(profile.joinDate) : new Date();
      const trialEnd = addDays(joinDate, 7);
      const daysLeft = Math.max(0, Math.ceil((trialEnd.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
      return {
        isTrialActive: daysLeft > 0,
        daysLeft,
        expiryDate: format(trialEnd, 'MMM dd, yyyy')
      };
    }
    return null;
  };
  
  const hasBatchManagement = () => {
    const subscriptionType = getSubscriptionType(profile.subscription);
    return (
      subscriptionType === SubscriptionType.Group ||
      subscriptionType === SubscriptionType.Institute ||
      isSubscriptionObject(profile.subscription) && (
        profile.subscription.planType === SubscriptionType.Group ||
        profile.subscription.planType === SubscriptionType.Institute
      )
    );
  };
  
  const isGroupLeader = () => {
    if (isSubscriptionObject(profile.subscription)) {
      return profile.subscription.role === 'leader';
    }
    return false;
  };

  const trialStatus = getFreeTrialStatus();

  const getBillingCycleInfo = () => {
    if (!profile.subscription || typeof profile.subscription !== 'object') {
      return 'Monthly';
    }
    
    const startDate = profile.subscription.startDate 
      ? new Date(profile.subscription.startDate) 
      : new Date();
    const endDate = profile.subscription.endDate 
      ? new Date(profile.subscription.endDate) 
      : addDays(startDate, 30);
    
    return {
      cycle: 'Monthly',
      nextBilling: format(endDate, 'MMM dd, yyyy')
    };
  };

  const billingInfo = getBillingCycleInfo();

  const showUpgradeButton = () => {
    const subscriptionType = getSubscriptionType(profile.subscription);
    return subscriptionType === SubscriptionType.Free || 
           subscriptionType === SubscriptionType.Basic;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex justify-between items-center">
          <span>Profile</span>
          <Badge className={`${getSubscriptionBadgeColor()} text-white`}>
            {trialStatus ? `Free Trial (${trialStatus.daysLeft} days left)` : getSubscriptionPlanName()}
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
          
          <div className="flex flex-col items-center gap-1 mt-1">
            {profile.email && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail size={14} className="mr-1" />
                <a 
                  href={`mailto:${profile.email}`} 
                  className="hover:underline hover:text-primary"
                >
                  {profile.email}
                </a>
              </div>
            )}
            {profile.phoneNumber && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone size={14} className="mr-1" />
                <a 
                  href={`tel:${profile.phoneNumber}`}
                  className="hover:underline hover:text-primary"
                >
                  {profile.phoneNumber}
                </a>
              </div>
            )}
          </div>
          
          {currentMood && (
            <Badge variant="outline" className="mt-2">
              Mood: {currentMood}
            </Badge>
          )}
          
          {showPeerRanking && (
            <div className="flex items-center mt-2 text-amber-500">
              <Trophy size={16} className="mr-1" />
              <span className="text-sm">Top 15% in your peer group</span>
            </div>
          )}
        </div>
        
        <div className="border-t pt-3 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Current Plan</span>
            <Badge className={`${getSubscriptionBadgeColor()} text-white flex items-center gap-1`}>
              <Crown className="h-3 w-3" />
              {getSubscriptionPlanName()}
            </Badge>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Billing Cycle</span>
            <div className="flex items-center gap-1 text-sm">
              <CalendarDays className="h-3 w-3 text-muted-foreground" />
              {typeof billingInfo === 'string' ? billingInfo : billingInfo.cycle}
            </div>
          </div>

          {typeof billingInfo !== 'string' && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Next Billing</span>
              <span className="text-sm">{billingInfo.nextBilling}</span>
            </div>
          )}

          {/* Only show batch info for group/institutional plans */}
          {typeof profile.subscription === 'object' && profile.subscription.batchName && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Batch</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {profile.subscription.batchName}
                </Badge>
                <Users className="h-3 w-3 text-muted-foreground" />
              </div>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Role</span>
            <span className="font-medium">{profile.role}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Joined</span>
            <span>{getJoinDate()}</span>
          </div>

          {trialStatus && trialStatus.isTrialActive && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Trial Expires</span>
              <span className="text-amber-600">{trialStatus.expiryDate}</span>
            </div>
          )}
          
          {profile.goals && profile.goals.length > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Goal</span>
              <span>{profile.goals[0].title}</span>
            </div>
          )}
          
          <div className="flex justify-between items-center pt-2">
            <Link to="/dashboard/student/profile" className="w-full">
              <Button variant="outline" size="sm" className="w-full">
                <User size={16} className="mr-2" /> View Full Profile
              </Button>
            </Link>
          </div>

          {hasBatchManagement() && (
            <Link to="/dashboard/student/batch" className="w-full">
              <Button variant="default" size="sm" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600">
                Manage {isGroupLeader() ? 'Your Batch' : 'Batch'}
              </Button>
            </Link>
          )}
          
          {(!hasBatchManagement() || trialStatus?.isTrialActive) && (
            <Link to="/dashboard/student/subscription" className="w-full">
              <Button variant="default" size="sm" className="w-full bg-gradient-to-r from-purple-600 to-violet-600">
                Upgrade Plan
              </Button>
            </Link>
          )}
          
          <Link to="/dashboard/student/groups" className="w-full">
            <Button variant="outline" size="sm" className="w-full mt-2">
              Study Groups
            </Button>
          </Link>

          {showUpgradeButton() && (
            <Link to="/dashboard/student/subscription" className="block mt-2">
              <Button 
                variant="default" 
                size="sm" 
                className="w-full bg-gradient-to-r from-purple-600 to-violet-600 flex items-center justify-center gap-2"
              >
                <Package className="h-4 w-4" />
                Upgrade Plan
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
