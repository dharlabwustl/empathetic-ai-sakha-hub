
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserProfileType, MoodType } from "@/types/user/base";
import { 
  Upload, 
  CreditCard, 
  TrendingUp, 
  Award, 
  Calendar, 
  Smile, 
  Meh, 
  Frown, 
  Heart, 
  ChevronDown,
  ChevronUp,
  Crown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SubscriptionTier {
  name: string;
  badge: string;
  color: string;
  expiresAt?: string;
}

interface ProfileCardProps {
  profile: UserProfileType;
  onUploadImage?: (file: File) => void;
  showPeerRanking?: boolean;
  showSubscription?: boolean;
  currentMood?: MoodType;
  onMoodChange?: (mood: MoodType) => void;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  profile,
  onUploadImage,
  showPeerRanking = false,
  showSubscription = true,
  currentMood,
  onMoodChange,
  className = ""
}) => {
  const [showBilling, setShowBilling] = useState(false);
  
  // Mock subscription data
  const subscription: SubscriptionTier = {
    name: "Premium Plan",
    badge: "PREMIUM",
    color: "text-amber-500 bg-amber-100 border-amber-200",
    expiresAt: "2025-05-20"
  };
  
  const formatExpirationDate = (dateString?: string) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const handleAvatarClick = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target.files && target.files[0] && onUploadImage) {
        onUploadImage(target.files[0]);
      }
    };
    input.click();
  };
  
  const toggleBillingSection = () => {
    setShowBilling(!showBilling);
  };
  
  const handleMoodSelection = (mood: MoodType) => {
    if (onMoodChange) {
      onMoodChange(mood);
    }
  };
  
  const getMoodIcon = (mood: MoodType) => {
    switch (mood) {
      case 'happy':
        return <Smile className="h-5 w-5 text-green-500" />;
      case 'neutral':
        return <Meh className="h-5 w-5 text-amber-500" />;
      case 'sad':
        return <Frown className="h-5 w-5 text-red-500" />;
      case 'motivated':
        return <Heart className="h-5 w-5 text-pink-500" />;
      default:
        return <Meh className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="bg-gradient-to-r from-indigo-500 to-violet-600 h-20 relative">
        {showSubscription && subscription && (
          <div className="absolute top-3 right-3">
            <Badge className={`font-bold ${subscription.color}`}>
              <Crown className="h-3 w-3 mr-1" />
              {subscription.badge}
            </Badge>
          </div>
        )}
      </div>
      
      <div className="relative px-6">
        <div className="absolute -top-12 left-6">
          <Avatar 
            className="h-24 w-24 border-4 border-white dark:border-gray-900 rounded-full relative group"
            onClick={handleAvatarClick}
          >
            <AvatarImage src={profile.avatar} alt={profile.name} className="object-cover" />
            <AvatarFallback className="text-2xl bg-indigo-100 text-indigo-800">
              {profile.name.charAt(0).toUpperCase()}
            </AvatarFallback>
            
            {onUploadImage && (
              <div className="absolute inset-0 bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Upload className="h-6 w-6 text-white" />
              </div>
            )}
          </Avatar>
        </div>
      </div>
      
      <CardContent className="pt-14 pb-4">
        <div className="flex flex-col gap-1 mb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{profile.name}</h2>
            
            {currentMood && (
              <div className="flex items-center gap-1 text-sm">
                {getMoodIcon(currentMood)}
                <span className="capitalize">{currentMood}</span>
              </div>
            )}
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {profile.goals?.[0]?.title || "Student"}
          </p>
        </div>
        
        {/* Stats and badges */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-indigo-500 mr-2" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Joined</span>
            </div>
            <p className="font-semibold">{profile.joinDate || "2023"}</p>
          </div>
          
          <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Award className="h-4 w-4 text-indigo-500 mr-2" />
              <span className="text-xs text-gray-600 dark:text-gray-400">Streaks</span>
            </div>
            <p className="font-semibold">{profile.streak || "0"} days</p>
          </div>
          
          {showPeerRanking && (
            <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 col-span-2">
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-indigo-500 mr-2" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Peer Ranking</span>
              </div>
              <p className="font-semibold">Top {profile.peerRanking || "15"}%</p>
            </div>
          )}
        </div>
        
        {/* Subscription information */}
        {showSubscription && (
          <>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full flex items-center justify-between" 
              onClick={toggleBillingSection}
            >
              <span className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                {showBilling ? "Hide Billing Info" : "View Billing Info"}
              </span>
              {showBilling ? 
                <ChevronUp className="h-4 w-4" /> : 
                <ChevronDown className="h-4 w-4" />
              }
            </Button>
            
            <AnimatePresence>
              {showBilling && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 space-y-3">
                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Current Plan</p>
                          <p className="text-lg font-bold text-amber-700 dark:text-amber-400">{subscription.name}</p>
                        </div>
                        <Badge className={subscription.color}>Active</Badge>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Expires: {formatExpirationDate(subscription.expiresAt)}
                      </div>
                    </div>
                    
                    <Button variant="default" className="w-full bg-gradient-to-r from-amber-500 to-orange-600">
                      Upgrade Plan
                    </Button>
                    
                    <Button variant="outline" size="sm" className="w-full">
                      Manage Subscription
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
        
        {/* Mood selection */}
        {onMoodChange && (
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">How are you feeling today?</p>
            <div className="flex justify-between">
              {(['sad', 'neutral', 'happy', 'motivated'] as MoodType[]).map((mood) => (
                <Button
                  key={mood}
                  variant={currentMood === mood ? "default" : "ghost"}
                  size="sm"
                  className={`px-2 ${currentMood === mood ? 'bg-indigo-500' : ''}`}
                  onClick={() => handleMoodSelection(mood)}
                >
                  {getMoodIcon(mood)}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
