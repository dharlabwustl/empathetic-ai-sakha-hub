
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Calendar, GraduationCap, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import VoiceGreeting from '@/components/dashboard/student/voice/VoiceGreeting';

const WelcomeToPrepr = () => {
  const navigate = useNavigate();
  
  // Get user data for personalized welcome
  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData) : null;
  const userName = user?.name || user?.firstName || 'Student';
  
  const handleContinueToDashboard = () => {
    navigate('/dashboard/student');
  };

  // Set first-time user flag
  useEffect(() => {
    localStorage.setItem('new_user_signup', 'true');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100/30 via-white to-violet-100/30 flex flex-col relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full opacity-10 animate-ping"></div>
      </div>
      
      {/* Voice Greeting for First Time User */}
      <VoiceGreeting 
        isFirstTimeUser={true}
        userName={userName}
        language="en-US"
      />
      
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-4xl"
        >
          <div className="mb-8 text-center">
            <img src="/assets/logo.svg" alt="PREPZR Logo" className="h-16 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Congratulations {userName}!
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent mt-2">
              Welcome to PREPZR!
            </h2>
            <p className="text-lg text-muted-foreground mt-2">
              Your personalized study journey begins now
            </p>
          </div>
          
          <div className="mb-8">
            <Card className="overflow-hidden border-0 shadow-lg backdrop-blur-sm bg-white/90">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-8">
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-full">
                          <GraduationCap className="h-6 w-6" />
                        </div>
                        <h2 className="text-2xl font-semibold">Your Study Plan is Ready</h2>
                      </div>
                      
                      <p className="opacity-90">
                        We've created a personalized study plan based on your goals and preferences.
                        Your journey to exam success is now optimized and structured.
                      </p>
                      
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2">
                          <div className="bg-white/20 h-6 w-6 flex items-center justify-center rounded-full text-sm">✓</div>
                          <span>Customized study schedule</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="bg-white/20 h-6 w-6 flex items-center justify-center rounded-full text-sm">✓</div>
                          <span>Topic prioritization based on your strengths</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="bg-white/20 h-6 w-6 flex items-center justify-center rounded-full text-sm">✓</div>
                          <span>AI-powered learning recommendations</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="p-8 bg-white/90 backdrop-blur-sm dark:bg-gray-900/90">
                    <h3 className="text-xl font-medium mb-4">From Our Founder</h3>
                    <div className="flex items-start gap-4">
                      <img 
                        src="/lovable-uploads/c3eac5b2-c8be-4622-8c94-681e9afdf888.png" 
                        alt="Amit Singh Founder" 
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm text-muted-foreground mb-3">
                          "At PREPZR, we believe every student deserves personalized guidance to reach their full potential. Our AI-powered platform is designed to adapt to your unique learning style and help you achieve your academic & exam goals."
                        </p>
                        <p className="text-sm mb-1 text-muted-foreground">
                          "Your journey with PREPZR begins now. We're excited to help you excel in your exams and become the best version of yourself."
                        </p>
                        <p className="font-medium">Amit Singh</p>
                        <p className="text-sm text-muted-foreground">Founder & CEO, PREPZR</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Key Features to Explore</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6 backdrop-blur-sm bg-white/90 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-violet-100 dark:bg-violet-900/30 p-3 rounded-full mb-3">
                    <Calendar className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <h3 className="font-medium mb-2">Today's Plan</h3>
                  <p className="text-sm text-muted-foreground">
                    Your daily personalized study schedule with optimized learning blocks
                  </p>
                </div>
              </Card>
              
              <Card className="p-6 backdrop-blur-sm bg-white/90 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full mb-3">
                    <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-medium mb-2">Concept Cards</h3>
                  <p className="text-sm text-muted-foreground">
                    Master key concepts with visual learning materials and interactive examples
                  </p>
                </div>
              </Card>
              
              <Card className="p-6 backdrop-blur-sm bg-white/90 hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full mb-3">
                    <Brain className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-medium mb-2">Academic Advisor</h3>
                  <p className="text-sm text-muted-foreground">
                    Get personalized guidance and optimize your exam preparation strategy
                  </p>
                </div>
              </Card>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              size="lg" 
              onClick={handleContinueToDashboard}
              className="px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg"
            >
              Continue to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </div>
      
      <footer className="p-6 text-center text-sm text-muted-foreground relative z-10">
        © {new Date().getFullYear()} PREPZR. All rights reserved.
      </footer>
    </div>
  );
};

export default WelcomeToPrepr;
