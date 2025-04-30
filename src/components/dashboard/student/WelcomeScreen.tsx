
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="max-w-3xl w-full shadow-lg border-0 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <h1 className="text-3xl font-bold">Welcome to Sakha AI</h1>
          <p className="mt-2 opacity-90">Your personalized study companion is ready!</p>
        </div>
        
        <CardContent className="p-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Study Plan is Ready!</h2>
              <p className="text-gray-600 mb-6">
                We've created a personalized study plan based on your preferences, goals, and learning style.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-blue-50 rounded-lg p-5 border border-blue-100"
              >
                <div className="text-blue-600 text-xl font-bold mb-2">Study Time</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">120+ hrs</div>
                <div className="text-sm text-gray-500">Optimized study schedule</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-purple-50 rounded-lg p-5 border border-purple-100"
              >
                <div className="text-purple-600 text-xl font-bold mb-2">Flashcards</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
                <div className="text-sm text-gray-500">Custom flashcards created</div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-green-50 rounded-lg p-5 border border-green-100"
              >
                <div className="text-green-600 text-xl font-bold mb-2">Practice Tests</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">25+</div>
                <div className="text-sm text-gray-500">Full-length practice exams</div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="border-t border-gray-200 my-6"></div>
              
              <h3 className="text-xl font-semibold mb-3">Key Features Available Now:</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Personalized study plan</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Smart flashcards</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Practice exams</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Progress tracking</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>AI-powered tutor</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span>Mood-based learning</span>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h4 className="text-lg font-semibold">A message from our founder</h4>
                <p className="my-3 text-gray-700">
                  "Welcome to Sakha AI! We're excited to be part of your learning journey. Our platform adapts to your unique needs and helps you achieve your academic goals efficiently. Remember, consistent practice is key to success!"
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">DR</div>
                  <div className="ml-3">
                    <p className="font-medium">Dr. Rakesh Sharma</p>
                    <p className="text-sm text-gray-500">Founder, Sakha AI</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center"
            >
              <Button 
                onClick={onComplete}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 h-auto text-lg"
              >
                Go to Dashboard
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
