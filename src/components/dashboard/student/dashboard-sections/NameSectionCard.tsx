
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Crown, Clock, Flame, Bell, LogOut, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { UserProfileType } from '@/types/user/base';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NameSectionCardProps {
  userProfile: UserProfileType;
}

const NameSectionCard: React.FC<NameSectionCardProps> = ({ userProfile }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleUpgradeClick = () => {
    navigate('/dashboard/student/subscription');
  };

  const handleLogout = () => {
    // Clear any stored auth data
    localStorage.removeItem('userToken');
    localStorage.removeItem('user_profile_image');
    navigate('/auth/login');
  };

  const dailyStreak = userProfile.studyStreak || 12;
  const userName = userProfile.name || userProfile.firstName || 'Student';
  
  // Calculate expiry based on plan
  const getExpiryInfo = () => {
    const signupDate = new Date(userProfile.createdAt || Date.now());
    const currentPlan = userProfile.subscriptionPlan || "Free Plan";
    
    switch (currentPlan) {
      case "Free Plan":
        const freeExpiry = new Date(signupDate);
        freeExpiry.setDate(freeExpiry.getDate() + 7);
        return {
          plan: "Free Plan",
          expiry: freeExpiry.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
      case "Monthly Premium":
        const monthlyExpiry = new Date(signupDate);
        monthlyExpiry.setMonth(monthlyExpiry.getMonth() + 1);
        return {
          plan: "Monthly Premium",
          expiry: monthlyExpiry.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
      case "Annual Premium":
        const annualExpiry = new Date(signupDate);
        annualExpiry.setFullYear(annualExpiry.getFullYear() + 1);
        return {
          plan: "Annual Premium", 
          expiry: annualExpiry.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
      default:
        return {
          plan: "Free Plan",
          expiry: "7 days from signup"
        };
    }
  };

  const { plan: currentPlan, expiry: expiryDate } = getExpiryInfo();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="premium-card shadow-lg border-2 border-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-white dark:border-gray-700 shadow-sm">
                <AvatarImage src={userProfile.avatar} alt={userName} />
                <AvatarFallback className="text-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                  {getInitials(userName)}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <motion.h2 
                  className="text-2xl font-bold text-gray-900 dark:text-white"
                  animate={{ 
                    color: ["#1f2937", "#7c3aed", "#1f2937"]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {getGreeting()}, {userName}!
                </motion.h2>
                
                <div className="flex items-center gap-3 mt-1 flex-wrap">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">{formatDate(currentTime)}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <motion.span
                      key={formatTime(currentTime)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="font-mono font-medium"
                    >
                      {formatTime(currentTime)}
                    </motion.span>
                  </div>
                  
                  <motion.div 
                    className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 px-3 py-1 rounded-full"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Flame className="h-4 w-4 text-orange-600" />
                    </motion.div>
                    <span className="text-sm font-bold text-orange-700 dark:text-orange-300">
                      {dailyStreak} day streak!
                    </span>
                  </motion.div>
                </div>
                
                {/* Subscription Info */}
                <div className="mt-2 flex items-center gap-2 text-xs">
                  <span className="text-gray-600 dark:text-gray-400">Plan:</span>
                  <span className="font-semibold text-purple-700 dark:text-purple-300">{currentPlan}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600 dark:text-gray-400">Expires: {expiryDate}</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="relative hover:bg-blue-50"
                  >
                    <Bell className="h-4 w-4" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white dark:bg-gray-800 z-50">
                  <DropdownMenuItem onClick={() => navigate('/dashboard/student/notifications')}>
                    <Bell className="h-4 w-4 mr-2" />
                    View All Notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:bg-gray-50"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white dark:bg-gray-800 z-50">
                  <DropdownMenuItem onClick={() => navigate('/dashboard/student/profile')}>
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              {/* Upgrade Button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleUpgradeClick}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-0 shadow-lg"
                >
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade Plan
                </Button>
              </motion.div>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>
    </motion.div>
  );
};

export default NameSectionCard;
