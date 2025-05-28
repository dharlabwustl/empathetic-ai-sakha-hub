
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, BookOpen, Brain, CheckCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const NEETStrategyCard: React.FC = () => {
  const urgencyLevel = "MODERATE";
  const strategy = "Foundation Building + Practice";
  
  const objectives = [
    "Complete syllabus",
    "Concept clarity", 
    "Regular practice"
  ];

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative group"
    >
      <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-600" />
              NEET 2026 Strategy
            </CardTitle>
            <Badge className="bg-orange-100 text-orange-800 border-orange-300">
              {urgencyLevel}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
              {strategy}
            </h3>
          </div>
          
          <div className="space-y-2">
            {objectives.map((objective, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-gray-700 dark:text-gray-300">{objective}</span>
              </div>
            ))}
          </div>
          
          <Button 
            size="sm" 
            className="w-full bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Zap className="h-4 w-4 mr-2" />
            Start Today's Focus
          </Button>
        </CardContent>
        
        {/* Priority highlight animation */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-100"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7] 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
      </Card>
    </motion.div>
  );
};

export default NEETStrategyCard;
