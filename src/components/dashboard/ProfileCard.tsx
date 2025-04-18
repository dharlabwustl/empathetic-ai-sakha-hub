
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { UserProfileType } from "@/types/user/base";
import { formatDistanceToNow } from "date-fns";
import { capitalizeFirstLetter } from "@/lib/utils";

interface ProfileCardProps {
  profile: UserProfileType;
  loading?: boolean;
  onUploadImage?: (file: File) => void;
  showPeerRanking?: boolean;
  currentMood?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  profile, 
  loading = false,
  onUploadImage,
  showPeerRanking,
  currentMood
}) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-24 w-24 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
            <div className="space-y-2 w-full">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="text-center p-4">
            <p className="text-red-500">Failed to load profile</p>
            <Button variant="outline" className="mt-2" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Handle subscription display
  const subscriptionPlan = profile.subscriptionPlan || profile.subscription || "Free";
  const hasActiveSubscription = subscriptionPlan !== "Free" && subscriptionPlan !== "free";
  const subscriptionEndDate = profile.subscriptionEndDate ? new Date(profile.subscriptionEndDate) : null;
  const formattedEndDate = subscriptionEndDate ? formatDistanceToNow(subscriptionEndDate, { addSuffix: true }) : null;

  const handleUpgradeClick = () => {
    navigate("/pricing");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  // Handle avatar upload if that functionality is provided
  const handleAvatarClick = () => {
    if (onUploadImage) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file && onUploadImage) {
          onUploadImage(file);
        }
      };
      input.click();
    }
  };

  return (
    <Card className="relative mb-6 overflow-hidden">
      {hasActiveSubscription && (
        <div className="absolute top-0 right-0 bg-green-500 text-white px-3 py-1 text-xs rounded-bl-lg">
          {capitalizeFirstLetter(String(subscriptionPlan))} Plan
        </div>
      )}
      <CardContent className="pt-6">
        <div className="flex flex-col items-center text-center">
          <Avatar 
            className={`h-24 w-24 mb-4 border-4 border-white shadow-lg ${onUploadImage ? 'cursor-pointer hover:opacity-90' : ''}`}
            onClick={onUploadImage ? handleAvatarClick : undefined}
          >
            {profile.avatar ? (
              <AvatarImage src={profile.avatar} alt={profile.name} />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-xl">
                {getInitials(profile.name)}
              </AvatarFallback>
            )}
          </Avatar>
          <h2 className="text-xl font-bold mb-1">{profile.name}</h2>
          <p className="text-muted-foreground mb-1">{profile.email}</p>
          <div className="text-sm text-muted-foreground flex items-center space-x-2 mb-4">
            <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded-full text-xs font-semibold">
              {capitalizeFirstLetter(profile.role)}
            </span>
            {profile.completedOnboarding && (
              <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full text-xs font-semibold">
                Onboarded
              </span>
            )}
          </div>
          
          {/* Subscription Section */}
          <div className="w-full px-2 py-3 mb-4 bg-gray-50 dark:bg-gray-800 rounded-md">
            <h3 className="font-medium text-sm mb-2">Subscription</h3>
            <div className="flex justify-between items-center">
              <div className="text-sm">
                <span className={`font-semibold ${hasActiveSubscription ? "text-green-600" : ""}`}>
                  {capitalizeFirstLetter(String(subscriptionPlan))} Plan
                </span>
                {formattedEndDate && <p className="text-xs text-muted-foreground">Renews {formattedEndDate}</p>}
              </div>
              {!hasActiveSubscription && (
                <Button size="sm" onClick={handleUpgradeClick} className="text-xs bg-gradient-to-r from-blue-600 to-indigo-700">
                  Upgrade
                </Button>
              )}
              {hasActiveSubscription && (
                <Button size="sm" variant="outline" onClick={handleUpgradeClick} className="text-xs">
                  Manage
                </Button>
              )}
            </div>
          </div>

          <div className="w-full space-y-2 text-sm">
            {profile.joinDate && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Joined</span>
                <span>{profile.joinDate}</span>
              </div>
            )}
            {profile.lastActive && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last active</span>
                <span>{profile.lastActive}</span>
              </div>
            )}
            {profile.institute && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Institute</span>
                <span>{profile.institute}</span>
              </div>
            )}
            {profile.examPreparation && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Exam</span>
                <span>{profile.examPreparation}</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
