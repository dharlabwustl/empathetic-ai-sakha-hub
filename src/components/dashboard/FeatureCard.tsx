
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SubscriptionType } from '@/types/user/base';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  isPremium: boolean;
  userSubscription?: SubscriptionType;
}

export default function FeatureCard({
  title,
  description,
  icon,
  path,
  isPremium,
  userSubscription = SubscriptionType.Basic
}: FeatureCardProps) {
  const navigate = useNavigate();
  const hasPremiumAccess = userSubscription === SubscriptionType.Premium;
  
  const handleClick = () => {
    if (isPremium && !hasPremiumAccess) {
      navigate('/pricing');
    } else {
      navigate(path);
    }
  };

  // Enhanced subtle animation variants
  const iconAnimation = {
    hover: {
      scale: 1.15, 
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.5 }
    },
    rest: { 
      scale: 1,
      rotate: 0
    },
    float: {
      y: [0, -6, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  const cardAnimation = {
    hover: {
      y: -8,
      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    },
    rest: {
      y: 0,
      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
      transition: { duration: 0.3 }
    }
  };

  const textAnimation = {
    hover: {
      color: "var(--sakha-blue)",
      transition: { duration: 0.2 }
    },
    rest: {
      color: "currentColor",
      transition: { duration: 0.2 }
    }
  };

  return (
    <TooltipProvider>
      <motion.div
        initial="rest"
        whileHover="hover"
        animate="rest"
        className="h-full"
      >
        <Card 
          className="h-full flex flex-col overflow-hidden transition-all duration-200 bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900"
          as={motion.div}
          variants={cardAnimation}
        >
          <div className="bg-gradient-to-r from-sakha-light-blue/10 to-sakha-lavender/10 dark:from-sakha-light-blue/5 dark:to-sakha-lavender/5 p-4">
            <motion.div 
              className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm mx-auto"
              variants={iconAnimation}
              animate="float"
            >
              <motion.div className="text-sakha-blue">
                {icon}
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mt-2"
            >
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {title === "24/7 AI Tutor" && "Your Personal Guide"}
                {title === "Study Plan" && "Smart Learning Path"}
                {title === "Progress Tracking" && "Track Your Growth"}
                {title === "Resources" && "Knowledge Hub"}
              </div>
            </motion.div>
          </div>

          <CardContent className="flex-grow p-4">
            <div className="flex justify-between items-start mb-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.h3 
                    className="font-medium cursor-help relative group"
                    variants={textAnimation}
                  >
                    {title}
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sakha-blue opacity-0 group-hover:w-full group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                      initial={false}
                    />
                  </motion.h3>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p>{description}</p>
                  {isPremium && !hasPremiumAccess && (
                    <p className="text-amber-500 mt-1 text-sm">✨ Premium Feature</p>
                  )}
                </TooltipContent>
              </Tooltip>
              {isPremium && !hasPremiumAccess && (
                <motion.div 
                  className="bg-amber-100 dark:bg-amber-950 p-1 rounded"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <Lock size={14} className="text-amber-600 dark:text-amber-400" />
                </motion.div>
              )}
            </div>
            <motion.p 
              className="text-sm text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {description}
            </motion.p>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full"
            >
              <Button
                variant={isPremium && !hasPremiumAccess ? "outline" : "default"}
                className={`w-full ${
                  isPremium && !hasPremiumAccess
                    ? "border-amber-300 text-amber-700 dark:border-amber-700 dark:text-amber-400"
                    : "bg-gradient-to-r from-sakha-blue to-sakha-purple text-white"
                }`}
                onClick={handleClick}
              >
                {isPremium && !hasPremiumAccess ? "Upgrade to Access" : "Open"}
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
}
