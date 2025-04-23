
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { UserProfileType } from '@/types/user/base';
import {
  BarChart4,
  Clock,
  Trophy,
  CalendarClock,
  Upload,
  Crown,
  Star,
  GraduationCap
} from "lucide-react";
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface ProfileCardProps {
  profile: UserProfileType;
  showPeerRanking?: boolean;
  currentMood?: string;
  onUploadImage?: (file: File) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  showPeerRanking = false,
  currentMood,
  onUploadImage
}) => {
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onUploadImage) {
      onUploadImage(e.target.files[0]);
    }
  };
  
  const getSubscriptionInfo = () => {
    if (!profile.subscription) return { name: 'Free Plan', active: true };
    
    if (typeof profile.subscription === 'string') {
      return { name: profile.subscription, active: true };
    }
    
    return {
      name: profile.subscription.planName || 'Premium Plan',
      active: profile.subscription.status === 'active',
      endDate: profile.subscription.endDate
    };
  };
  
  const subscriptionInfo = getSubscriptionInfo();
  
  return (
    <Card className="w-full relative overflow-hidden border-primary/10">
      <div className="h-12 bg-gradient-to-r from-indigo-400 to-primary"></div>
      
      <CardHeader className="relative pb-6">
        <div className="absolute -mt-12 left-1/2 -translate-x-1/2 md:left-6 md:translate-x-0 flex flex-col items-center md:items-start">
          <div className="relative">
            <Avatar className="w-20 h-20 border-4 border-card bg-white">
              <AvatarImage 
                src={profile.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + profile.name} 
                alt={profile.name} 
              />
              <AvatarFallback>{profile.name.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-0 right-0 rounded-full h-7 w-7 bg-white border-primary/20"
              onClick={handleUploadClick}
            >
              <Upload className="h-3.5 w-3.5" />
            </Button>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="md:ml-24 md:-mt-8 space-y-4 text-center md:text-left">
        <div>
          <div className="flex flex-col md:flex-row items-center justify-between md:items-start gap-2">
            <div className="flex flex-col">
              <h3 className="font-semibold text-xl">{profile.name}</h3>
              <p className="text-muted-foreground text-sm">{profile.email}</p>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center md:justify-end gap-2">
                {profile.isGroupLeader && (
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-800">
                    <Crown className="h-3 w-3 mr-1" /> Batch Leader
                  </Badge>
                )}
                <Badge variant={subscriptionInfo.active ? "default" : "secondary"}>
                  {subscriptionInfo.name}
                </Badge>
              </div>
              <Link to="/dashboard/student/subscription">
                <Button variant="outline" size="sm" className="text-xs">
                  Upgrade Plan
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex flex-col border rounded-md p-2">
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>Study Hours</span>
            </div>
            <span className="font-medium">{profile.totalStudyHours || 45}h</span>
          </div>
          
          <div className="flex flex-col border rounded-md p-2">
            <div className="flex items-center text-muted-foreground">
              <BarChart4 className="h-3.5 w-3.5 mr-1" />
              <span>Average Score</span>
            </div>
            <span className="font-medium">{profile.accuracyRate || 78}%</span>
          </div>
          
          <div className="flex flex-col border rounded-md p-2">
            <div className="flex items-center text-muted-foreground">
              <CalendarClock className="h-3.5 w-3.5 mr-1" />
              <span>Streak</span>
            </div>
            <span className="font-medium">{profile.streakDays || 12} days</span>
          </div>
          
          <div className="flex flex-col border rounded-md p-2">
            <div className="flex items-center text-muted-foreground">
              <GraduationCap className="h-3.5 w-3.5 mr-1" />
              <span>Completed</span>
            </div>
            <span className="font-medium">{profile.completedLessons || 24} lessons</span>
          </div>
        </div>
        
        {showPeerRanking && (
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center text-muted-foreground text-sm">
                <Trophy className="h-3.5 w-3.5 mr-1 text-yellow-500" />
                <span>Peer Ranking</span>
              </div>
              <div className="flex items-center">
                <Star className="h-3.5 w-3.5 text-yellow-500" />
                <span className="text-sm font-medium ml-1">Top 15%</span>
              </div>
            </div>
            <Progress value={85} className="h-2" />
          </div>
        )}
        
        <div className="pt-2">
          <Link to="/profile">
            <Button className="w-full">View Full Profile</Button>
          </Link>
        </div>
        
        {subscriptionInfo.endDate && (
          <div className="text-xs text-center text-muted-foreground">
            Subscription renews on {new Date(subscriptionInfo.endDate).toLocaleDateString()}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
