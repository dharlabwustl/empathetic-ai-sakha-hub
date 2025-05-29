
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, X, Sparkles, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const TodaysTopPrioritySection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated arrow pointing down */}
      <motion.div
        className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-red-500 text-2xl">↓</div>
      </motion.div>

      {/* Priority badge */}
      <motion.div
        className="absolute -top-2 -right-2 z-20"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Badge className="bg-red-500 text-white font-bold px-3 py-1 shadow-lg">
          TOP PRIORITY!
        </Badge>
      </motion.div>

      {/* Sparkle effects */}
      {[...Array(3)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute text-yellow-400 text-lg"
          style={{
            top: `${20 + index * 30}%`,
            left: `${10 + index * 80}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.5,
          }}
        >
          <Sparkles className="h-4 w-4" />
        </motion.div>
      ))}

      <Card className="relative shadow-lg border-2 border-gradient-to-r from-red-200 to-pink-200 dark:from-red-800 dark:to-pink-800 overflow-hidden">
        {/* Pulsing border effect */}
        <motion.div
          className="absolute inset-0 border-4 border-red-400 rounded-lg opacity-50"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(239, 68, 68, 0.4)",
              "0 0 0 20px rgba(239, 68, 68, 0)",
              "0 0 0 0 rgba(239, 68, 68, 0.4)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Glowing background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-50/50 to-pink-50/50 dark:from-red-900/20 dark:to-pink-900/20"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        <CardHeader className="pb-3 relative z-10">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Star className="h-5 w-5 text-red-600 dark:text-red-400" />
              </motion.div>
              Today's Top Priority
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-6 w-6 p-0 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <h3 className="font-semibold text-red-900 dark:text-red-100">
                Focus on Biology - Weakest Subject
              </h3>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/80 p-4 rounded-lg border border-red-200 dark:border-red-700">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Genetics Chapter - Class 12</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Complete the Heredity and Variation concepts. This is your weakest area based on recent performance.
              </p>
              
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-600">
                  High Impact
                </Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400">Est. 45 min</span>
              </div>
            </div>
            
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700">
              Start Priority Task
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TodaysTopPrioritySection;
