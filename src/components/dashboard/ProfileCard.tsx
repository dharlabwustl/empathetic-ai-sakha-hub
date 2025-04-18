
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProfileType, MoodType, SubscriptionType } from "@/types/user/base";
import { getMoodTheme } from "./student/mood-tracking/moodThemes";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Phone, Award, Star, User, Brain, Calendar, Camera, Lock, Upload, CreditCard, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { PlanType } from "@/services/featureService";
import { Link } from "react-router-dom";

interface ProfileCardProps {
  profile: UserProfileType;
  currentMood?: MoodType;
  peerRanking?: {
    rank: number;
    total: number;
    percentile: number;
  };
  onUploadImage?: (file: File) => void;
  showPeerRanking?: boolean;
}

const ProfileCard = ({ 
  profile, 
  currentMood, 
  peerRanking = { rank: 35, total: 500, percentile: 93 },
  onUploadImage,
  showPeerRanking = false
}: ProfileCardProps) => {
  const [isHoveringAvatar, setIsHoveringAvatar] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const moodTheme = currentMood ? getMoodTheme(currentMood) : null;
  
  // Determine which avatar to display based on gender and mood
  const getAvatarSrc = () => {
    if (currentMood && moodTheme) {
      return profile.gender === 'female' 
        ? moodTheme.avatarUrlFemale || "/lovable-uploads/5bcb1535-8a84-4a7d-a508-e0acf87487f5.png"
        : moodTheme.avatarUrlMale || "/lovable-uploads/01737148-61ec-4c48-8cd4-d3cbe28124a3.png";
    }
    return profile.avatar || (profile.gender === 'female' 
      ? "/lovable-uploads/5bcb1535-8a84-4a7d-a508-e0acf87487f5.png"
      : "/lovable-uploads/01737148-61ec-4c48-8cd4-d3cbe28124a3.png");
  };

  // Calculate progress bar width based on percentile
  const progressWidth = peerRanking ? `${peerRanking.percentile}%` : "50%";
  
  // Get ring color for avatar based on mood
  const getRingColorClass = () => {
    return currentMood && moodTheme ? `ring-[${moodTheme.colors.text}]` : "ring-primary";
  };

  // Format join date if available
  const formatJoinDate = () => {
    if (!profile.joinDate) return "Recently joined";
    
    try {
      return `Joined ${format(new Date(profile.joinDate), 'MMM yyyy')}`;
    } catch (e) {
      return "Recently joined";
    }
  };
  
  // Handle image upload
  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      if (onUploadImage) {
        onUploadImage(files[0]);
        toast({
          title: "Image uploaded",
          description: "Your profile image has been updated successfully."
        });
      } else {
        toast({
          title: "Image upload not supported",
          description: "Image upload functionality is not available at this time.",
          variant: "destructive"
        });
      }
    }
  };

  // Check if user can view peer ranking
  const canViewPeerRanking = () => {
    // Only premium users who opted in can view ranking, and only after 1 month of joining
    const joinDate = profile.joinDate ? new Date(profile.joinDate) : new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    
    const hasBeenMemberLongEnough = joinDate < oneMonthAgo;
    const isPremiumUser = profile.subscription === SubscriptionType.Premium || 
                         profile.subscription === SubscriptionType.Enterprise;
    
    return showPeerRanking && hasBeenMemberLongEnough && isPremiumUser;
  };

  // Get subscription plan details
  const getSubscriptionDetails = () => {
    const planTypeMap: Record<SubscriptionType, string> = {
      [SubscriptionType.Free]: 'Free Trial',
      [SubscriptionType.Basic]: 'Basic Plan',
      [SubscriptionType.Premium]: 'Premium Plan',
      [SubscriptionType.Enterprise]: 'Enterprise Plan'
    };

    const planTypeColorMap: Record<SubscriptionType, string> = {
      [SubscriptionType.Free]: 'bg-gray-100 text-gray-800',
      [SubscriptionType.Basic]: 'bg-blue-100 text-blue-800',
      [SubscriptionType.Premium]: 'bg-violet-100 text-violet-800',
      [SubscriptionType.Enterprise]: 'bg-amber-100 text-amber-800'
    };

    return {
      planName: planTypeMap[profile.subscription || SubscriptionType.Free] || 'Free Trial',
      planClass: planTypeColorMap[profile.subscription || SubscriptionType.Free] || 'bg-gray-100 text-gray-800'
    };
  };

  const { planName, planClass } = getSubscriptionDetails();
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`overflow-hidden ${moodTheme?.colors.cardBackground || "bg-white"}`}>
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-violet-200 to-pink-200">
          <motion.div 
            className="h-full bg-gradient-to-r from-violet-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: progressWidth }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
        
        <div className="p-4">
          <div className="flex items-center space-x-4">
            <motion.div
              className="relative cursor-pointer group"
              whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
              onHoverStart={() => setIsHoveringAvatar(true)}
              onHoverEnd={() => setIsHoveringAvatar(false)}
              onClick={handleImageClick}
            >
              <Avatar 
                className={`h-16 w-16 ring-2 ring-offset-2 transition-all duration-300 ${getRingColorClass()}`}
              >
                <AvatarImage src={getAvatarSrc()} alt={profile.name} className="object-cover" />
                <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              <div className={`absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center transition-opacity duration-200 ${isHoveringAvatar ? 'opacity-100' : 'opacity-0'}`}>
                <Upload className="h-6 w-6 text-white" />
              </div>
              
              {currentMood && (
                <motion.div 
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white p-0.5 shadow-md"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className={`w-full h-full rounded-full ${moodTheme?.colors.moodIndicator || "bg-green-500"} flex items-center justify-center text-xs font-bold text-white`}>
                    {currentMood.charAt(0).toUpperCase()}
                  </div>
                </motion.div>
              )}
              
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </motion.div>
            
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className={`font-medium text-lg ${moodTheme?.colors.heading || "text-gray-900"}`}>{profile.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-3 w-3 mr-1" />
                    {profile.phoneNumber || "+91 98765 43210"}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatJoinDate()}
                  </div>
                </motion.div>
                
                <Badge variant="outline" className={`${moodTheme?.colors.personalityBadge || "bg-blue-50 text-blue-600 border-blue-200"}`}>
                  {profile.personalityType || "Analytical"}
                </Badge>
              </div>
              
              {moodTheme && (
                <motion.div 
                  className={`text-sm ${moodTheme.colors.text} mt-1 p-2 rounded-lg ${moodTheme.colors.moodBackground || "bg-blue-50"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <p className="font-medium">{moodTheme.message}</p>
                </motion.div>
              )}
            </div>
          </div>
          
          <div className="mt-4 space-y-3">
            {/* Subscription Plan - New Addition */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <CreditCard className="h-3.5 w-3.5 mr-1.5 text-violet-500" />
                <span className="text-gray-600">Subscription</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className={planClass}>
                  {planName}
                </Badge>
                <Link to="/pricing" className="text-xs text-blue-500 flex items-center hover:underline">
                  Upgrade <ArrowUpRight className="h-3 w-3 ml-0.5" />
                </Link>
              </div>
            </div>
            
            {/* User Type */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <User className="h-3.5 w-3.5 mr-1.5 text-gray-500" />
                <span className="text-gray-600">User Type</span>
              </div>
              <Badge variant="secondary" className="font-normal">
                {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
              </Badge>
            </div>
            
            {/* Exam Goal */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <Award className="h-3.5 w-3.5 mr-1.5 text-indigo-500" />
                <span className="text-gray-600">Exam Goal</span>
              </div>
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200 font-medium">
                {profile.examPreparation || profile.goals?.[0]?.title || "IIT-JEE"}
              </Badge>
            </div>
            
            {/* Peer Ranking - Only visible for premium users who have been members for 1+ month */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <Brain className="h-3.5 w-3.5 mr-1.5 text-violet-500" />
                  <span className="text-gray-600">Peer Ranking</span>
                </div>
                
                {canViewPeerRanking() ? (
                  <div className="flex items-center">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                      {`Top ${100 - peerRanking.percentile}%`}
                    </Badge>
                  </div>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Lock className="h-3 w-3" />
                            Premium Feature
                          </Badge>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Available for premium users after 1 month of joining</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              
              {canViewPeerRanking() && (
                <>
                  <div className="relative h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-violet-500"
                      initial={{ width: 0 }}
                      animate={{ width: progressWidth }}
                      transition={{ duration: 0.8 }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Rank #{peerRanking.rank}</span>
                    <span>Out of {peerRanking.total} students</span>
                  </div>
                </>
              )}
            </div>
            
            {/* Subject Progress */}
            {profile.areasOfInterest && profile.areasOfInterest.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {profile.areasOfInterest.map((subject, index) => (
                  <motion.div 
                    key={subject.id} 
                    className="flex items-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Badge 
                      className="flex items-center gap-1 px-2 py-1" 
                      variant="outline"
                      style={{
                        background: `linear-gradient(90deg, ${getSubjectColor(subject.name)}20, ${getSubjectColor(subject.name)}10)`,
                        color: getSubjectColor(subject.name),
                        borderColor: `${getSubjectColor(subject.name)}40`
                      }}
                    >
                      <Star className="h-3 w-3 fill-current" />
                      {subject.name}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Helper function to get colors for different subjects
const getSubjectColor = (subject: string) => {
  const colors: Record<string, string> = {
    "Physics": "#3b82f6",
    "Chemistry": "#10b981",
    "Mathematics": "#8b5cf6",
    "Biology": "#ef4444",
    "Computer Science": "#f59e0b",
    "English": "#6366f1",
    "History": "#d97706",
    "Geography": "#059669",
    "Economics": "#7c3aed",
    "Psychology": "#ec4899"
  };
  
  // Return the color if it exists, or a default color
  return colors[subject] || "#6b7280";
};

export default ProfileCard;
