
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [animationDone, setAnimationDone] = useState(false);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Stats to animate
  const stats = [
    { label: "Students", value: "10,000+", icon: "👨‍🎓" },
    { label: "Success Rate", value: "95%", icon: "🎯" },
    { label: "Practice Questions", value: "500,000+", icon: "📝" },
    { label: "Avg Score Improvement", value: "850", icon: "📈" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center p-4">
      <motion.div
        className="max-w-2xl w-full text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-blue-700 mb-4">Welcome to Sakha AI!</h1>
        <p className="text-gray-600 mb-8">We're glad you're here. Your personalized learning journey begins now.</p>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          onAnimationComplete={() => setAnimationDone(true)}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
            >
              <span className="text-2xl mb-2">{stat.icon}</span>
              <motion.span 
                className="text-2xl font-bold text-blue-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 + index * 0.2, duration: 0.5 }}
              >
                {stat.value}
              </motion.span>
              <span className="text-sm text-gray-600">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={animationDone ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4">Your account is ready!</h2>
              
              <motion.div className="flex flex-col space-y-3 mb-6">
                {[
                  "Personalized study plan created",
                  "Progress tracking enabled",
                  "AI tutor access activated",
                  "Daily recommendations ready"
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 2.5 + i * 0.2 }}
                    className="flex items-center gap-2 text-left"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </Card>

          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 h-auto text-lg"
            onClick={onComplete}
          >
            Start My Learning Journey
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
