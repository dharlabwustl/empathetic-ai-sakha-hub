
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Target, 
  Clock, 
  TrendingUp, 
  Brain,
  Award,
  Zap,
  CheckCircle,
  BarChart3,
  Heart,
  Calendar,
  Trophy,
  FlaskConical,
  Calculator,
  Star,
  Lightbulb
} from 'lucide-react';

const DashboardPreview = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Enhanced sections with actual PREPZR learning features
  const sections = [
    {
      title: "Dynamic Exam Plan",
      subtitle: "Personalized Learning Profile",
      icon: <Target className="w-5 h-5" />,
      color: "from-blue-500 to-indigo-600",
      slides: [
        { title: "Adaptive Study Path", progress: 85, items: "Custom Plan", detail: "AI creates your unique learning journey" },
        { title: "Weakness Analysis", progress: 72, items: "3 Focus Areas", detail: "Targeting your improvement zones" },
        { title: "Goal Tracking", progress: 90, items: "On Schedule", detail: "NEET 2026 preparation timeline" },
        { title: "Performance Insights", progress: 78, items: "Improving", detail: "Smart analytics guide your study" }
      ]
    },
    {
      title: "Adaptive Daily Plan",
      subtitle: "Mood-Based Learning",
      icon: <Calendar className="w-5 h-5" />,
      color: "from-green-500 to-emerald-600",
      slides: [
        { title: "Today's Focus", progress: 82, items: "4 Topics", detail: "Personalized daily learning goals" },
        { title: "Energy Optimization", progress: 95, items: "Peak Hours", detail: "Study when you're most alert" },
        { title: "Break Intervals", progress: 88, items: "Scheduled", detail: "Scientific rest periods for retention" },
        { title: "Mood Adaptation", progress: 75, items: "Balanced", detail: "Content adjusts to your mindset" }
      ]
    },
    {
      title: "Mood Based Changes",
      subtitle: "Emotional Intelligence",
      icon: <Heart className="w-5 h-5" />,
      color: "from-pink-500 to-rose-600",
      slides: [
        { title: "Stress Management", progress: 85, items: "Calm Mode", detail: "Gentle learning when stressed" },
        { title: "Motivation Boost", progress: 92, items: "High Energy", detail: "Challenging content when motivated" },
        { title: "Confidence Building", progress: 78, items: "Growing", detail: "Easier topics when confidence is low" },
        { title: "Emotional Support", progress: 88, items: "Active", detail: "AI tutor understands your feelings" }
      ]
    },
    {
      title: "Multimodal Concept Master",
      subtitle: "Complete Understanding",
      icon: <Brain className="w-5 h-5" />,
      color: "from-purple-500 to-violet-600",
      slides: [
        { title: "Visual Learning", progress: 88, items: "3D Models", detail: "Interactive diagrams and animations" },
        { title: "Audio Concepts", progress: 84, items: "Voice Guide", detail: "Listen while you learn concepts" },
        { title: "Text Mastery", progress: 79, items: "Detailed", detail: "Comprehensive written explanations" },
        { title: "Practice Labs", progress: 91, items: "Hands-on", detail: "Virtual experiments and simulations" }
      ]
    },
    {
      title: "Recall Practice",
      subtitle: "Memory Mastery",
      icon: <Zap className="w-5 h-5" />,
      color: "from-orange-500 to-amber-600",
      slides: [
        { title: "Spaced Repetition", progress: 91, items: "Optimized", detail: "Scientific memory reinforcement" },
        { title: "Active Recall", progress: 87, items: "Effective", detail: "Test yourself for better retention" },
        { title: "Memory Palace", progress: 73, items: "Building", detail: "Visualization techniques for concepts" },
        { title: "Quick Reviews", progress: 95, items: "Daily", detail: "Bite-sized revision sessions" }
      ]
    },
    {
      title: "Exam Practice",
      subtitle: "Test Readiness",
      icon: <BarChart3 className="w-5 h-5" />,
      color: "from-cyan-500 to-blue-600",
      slides: [
        { title: "Mock Exams", progress: 82, items: "NEET Pattern", detail: "Real exam simulation experience" },
        { title: "Time Management", progress: 88, items: "Improving", detail: "Speed and accuracy training" },
        { title: "Question Bank", progress: 76, items: "10K+ Questions", detail: "Comprehensive practice database" },
        { title: "Weak Area Focus", progress: 69, items: "Targeted", detail: "Extra practice where you need it" }
      ]
    },
    {
      title: "Become Exam Champion",
      subtitle: "Success Mindset",
      icon: <Trophy className="w-5 h-5" />,
      color: "from-yellow-500 to-orange-600",
      slides: [
        { title: "Champion Mindset", progress: 94, items: "Developing", detail: "Mental preparation for success" },
        { title: "Success Strategies", progress: 86, items: "Applied", detail: "Proven techniques from toppers" },
        { title: "Confidence Building", progress: 89, items: "Strong", detail: "Self-belief through achievement" },
        { title: "Final Readiness", progress: 92, items: "Exam Ready", detail: "Complete preparation assessment" }
      ]
    }
  ];

  // Auto-rotate sections every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % sections.length);
      setCurrentSlide(0);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate slides within active section every 1.2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const currentSection = sections[activeSection];
      setCurrentSlide((prev) => (prev + 1) % currentSection.slides.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [activeSection]);

  const currentSection = sections[activeSection];
  const currentSlideData = currentSection.slides[currentSlide];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative perspective-1000"
    >
      {/* Enhanced 3D background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl scale-110 animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-pink-400/10 rounded-3xl blur-2xl scale-105" />
      
      {/* Main preview container with 3D effect */}
      <div className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl lg:rounded-3xl border border-white/30 shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
        {/* Enhanced header with depth */}
        <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 px-4 py-3 border-b border-gray-200/50 dark:border-gray-600/50 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400 shadow-sm"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm"></div>
                <div className="w-3 h-3 rounded-full bg-green-400 shadow-sm"></div>
              </div>
              <span className="ml-4 text-sm font-medium text-gray-600 dark:text-gray-300">
                PREPZR Student Dashboard
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-xs text-gray-500">Live Preview</span>
            </div>
          </div>
        </div>

        {/* Content area with enhanced 3D depth */}
        <div className="p-4 lg:p-6 space-y-4">
          {/* Welcome section with animation */}
          <motion.div 
            className="text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white mb-1">
              Welcome back, Student!
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your AI-powered learning companion
            </p>
          </motion.div>

          {/* Active section display with enhanced 3D effects */}
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20, rotateX: 15 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="transform-gpu"
          >
            <Card className={`bg-gradient-to-br ${currentSection.color} text-white border-0 shadow-2xl transform hover:scale-102 transition-all duration-300`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-base lg:text-lg">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                      {currentSection.icon}
                    </div>
                    <div>
                      <div className="font-bold">{currentSection.title}</div>
                      <div className="text-xs opacity-90 font-normal">{currentSection.subtitle}</div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                    {activeSection + 1}/7
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 30, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <span className="text-sm lg:text-base font-semibold block">
                        {currentSlideData.title}
                      </span>
                      <span className="text-xs opacity-80 mt-1 block">
                        {currentSlideData.detail}
                      </span>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                        {currentSlideData.items}
                      </Badge>
                      <span className="text-xs opacity-80">{currentSlideData.progress}%</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Progress 
                      value={currentSlideData.progress} 
                      className="h-3 bg-white/20 shadow-inner"
                    />
                    <div className="flex justify-between text-xs opacity-90">
                      <span>Progress</span>
                      <span className="font-medium">{currentSlideData.progress}% complete</span>
                    </div>
                  </div>

                  {/* Enhanced slide indicators */}
                  <div className="flex justify-center gap-1.5 mt-3">
                    {currentSection.slides.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide 
                            ? 'bg-white shadow-lg scale-125' 
                            : 'bg-white/40 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Section indicators with enhanced styling */}
          <div className="flex justify-center gap-2 mt-4">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.2 }}
                className={`relative group cursor-pointer`}
                onClick={() => setActiveSection(index)}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === activeSection 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {section.title}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced quick stats with 3D effects */}
          <div className="grid grid-cols-3 gap-2 lg:gap-4 mt-4">
            <motion.div 
              className="text-center p-2 lg:p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
              whileHover={{ y: -2 }}
            >
              <div className="p-1 bg-blue-500/10 rounded-full w-fit mx-auto mb-1">
                <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 mx-auto" />
              </div>
              <div className="text-sm lg:text-base font-bold text-blue-700 dark:text-blue-300">
                247
              </div>
              <div className="text-xs text-blue-600 dark:text-blue-400">
                Concepts Mastered
              </div>
            </motion.div>
            
            <motion.div 
              className="text-center p-2 lg:p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
              whileHover={{ y: -2 }}
            >
              <div className="p-1 bg-green-500/10 rounded-full w-fit mx-auto mb-1">
                <Zap className="w-4 h-4 lg:w-5 lg:h-5 text-green-600 mx-auto" />
              </div>
              <div className="text-sm lg:text-base font-bold text-green-700 dark:text-green-300">
                94%
              </div>
              <div className="text-xs text-green-600 dark:text-green-400">
                Study Efficiency
              </div>
            </motion.div>
            
            <motion.div 
              className="text-center p-2 lg:p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105"
              whileHover={{ y: -2 }}
            >
              <div className="p-1 bg-purple-500/10 rounded-full w-fit mx-auto mb-1">
                <TrendingUp className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600 mx-auto" />
              </div>
              <div className="text-sm lg:text-base font-bold text-purple-700 dark:text-purple-300">
                +23%
              </div>
              <div className="text-xs text-purple-600 dark:text-purple-400">
                This Week
              </div>
            </motion.div>
          </div>

          {/* AI Insights section */}
          <motion.div 
            className="mt-4 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-200/50 dark:border-indigo-800/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-800 dark:text-indigo-300">AI Insight</span>
            </div>
            <p className="text-xs text-indigo-700 dark:text-indigo-400">
              "Your Physics concepts are strong! Focus more on Chemistry numericals for balanced preparation."
            </p>
          </motion.div>
        </div>
      </div>

      {/* Additional 3D floating elements */}
      <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
    </motion.div>
  );
};

export default DashboardPreview;
