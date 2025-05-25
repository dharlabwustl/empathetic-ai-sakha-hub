
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  Brain, 
  RotateCcw, 
  Calculator, 
  FileText, 
  TrendingUp, 
  Trophy,
  Play,
  Eye,
  Video,
  FileBarChart,
  Star,
  Target,
  Activity,
  Zap
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { RadialProgress } from "@/components/ui/radial-progress";

const DashboardPreview = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [liveMetrics, setLiveMetrics] = useState({
    readinessScore: 0,
    conceptMastery: 0,
    practiceAccuracy: 0,
    streakDays: 0
  });
  
  const dashboardSlides = [
    {
      id: 1,
      title: "Dynamic Plan As Per Your Learning Profile",
      description: "AI analyzes your learning style, pace, and preferences to create a personalized study roadmap",
      icon: <BookOpen className="w-8 h-8" />,
      gradient: "from-blue-500 to-indigo-600",
      features: ["Learning Style Analysis", "Personalized Roadmap", "Adaptive Pacing"],
      metrics: { readiness: 85, mastery: 78, accuracy: 92 }
    },
    {
      id: 2,
      title: "Daily Adaptive Plans", 
      description: "Smart daily schedules that adjust based on your progress, mood, and available time",
      icon: <Calendar className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-600",
      features: ["Smart Scheduling", "Mood-Based Adaptation", "Progress Tracking"],
      metrics: { readiness: 88, mastery: 82, accuracy: 89 }
    },
    {
      id: 3,
      title: "Concept Mastery with Multi Techniques",
      description: "Learn concepts through 3D visuals, videos, summaries, and interactive content",
      icon: <Brain className="w-8 h-8" />,
      gradient: "from-green-500 to-teal-600",
      features: ["3D Visualizations", "Video Lessons", "Interactive Summaries"],
      subIcons: [<Eye className="w-4 h-4" />, <Video className="w-4 h-4" />, <FileBarChart className="w-4 h-4" />],
      metrics: { readiness: 90, mastery: 85, accuracy: 94 }
    },
    {
      id: 4,
      title: "Recall Accuracy with Interactive Spaced Repetition",
      description: "Advanced spaced repetition system that optimizes memory retention and recall",
      icon: <RotateCcw className="w-8 h-8" />,
      gradient: "from-orange-500 to-red-600",
      features: ["Spaced Repetition", "Memory Optimization", "Recall Testing"],
      metrics: { readiness: 87, mastery: 88, accuracy: 96 }
    },
    {
      id: 5,
      title: "Formula Practice",
      description: "Interactive formula lab with step-by-step derivations and practice problems",
      icon: <Calculator className="w-8 h-8" />,
      gradient: "from-cyan-500 to-blue-600",
      features: ["Interactive Formulas", "Step-by-step Derivations", "Practice Problems"],
      metrics: { readiness: 83, mastery: 79, accuracy: 91 }
    },
    {
      id: 6,
      title: "Practice Exam",
      description: "Comprehensive practice tests with real-time analysis and performance insights",
      icon: <FileText className="w-8 h-8" />,
      gradient: "from-violet-500 to-purple-600",
      features: ["Mock Tests", "Real-time Analysis", "Performance Insights"],
      metrics: { readiness: 91, mastery: 86, accuracy: 93 }
    },
    {
      id: 7,
      title: "Improve Exam Readiness Everyday",
      description: "Daily readiness tracking with actionable insights to boost your exam preparation",
      icon: <TrendingUp className="w-8 h-8" />,
      gradient: "from-emerald-500 to-green-600",
      features: ["Daily Tracking", "Readiness Score", "Actionable Insights"],
      metrics: { readiness: 94, mastery: 90, accuracy: 97 }
    },
    {
      id: 8,
      title: "Become Exam Champion",
      description: "Achieve your dream score with our comprehensive preparation system and support",
      icon: <Trophy className="w-8 h-8" />,
      gradient: "from-yellow-500 to-orange-600",
      features: ["Dream Score Achievement", "Champion Status", "Success Guarantee"],
      metrics: { readiness: 98, mastery: 95, accuracy: 99 }
    }
  ];

  // Auto-advance slides every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % dashboardSlides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animate progress and metrics when slide changes
  useEffect(() => {
    const currentMetrics = dashboardSlides[currentSlide].metrics;
    setAnimatedProgress(0);
    setLiveMetrics({
      readinessScore: 0,
      conceptMastery: 0,
      practiceAccuracy: 0,
      streakDays: 0
    });

    const animateMetrics = () => {
      const duration = 1500;
      const steps = 60;
      const stepDuration = duration / steps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);

        setAnimatedProgress(((currentSlide + 1) / dashboardSlides.length) * 100 * easeOut);
        setLiveMetrics({
          readinessScore: Math.round(currentMetrics.readiness * easeOut),
          conceptMastery: Math.round(currentMetrics.mastery * easeOut),
          practiceAccuracy: Math.round(currentMetrics.accuracy * easeOut),
          streakDays: Math.round((currentSlide + 5) * easeOut)
        });

        if (step >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    };

    const timeout = setTimeout(animateMetrics, 200);
    return () => {
      clearTimeout(timeout);
    };
  }, [currentSlide]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative"
    >
      {/* Dashboard Container - Much Larger Size */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden w-[750px] h-[550px] relative">
        {/* Premium Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl" />
        
        {/* Dashboard Header */}
        <div className={`bg-gradient-to-r ${dashboardSlides[currentSlide].gradient} text-white p-6 relative overflow-hidden`}>
          {/* Animated Background Pattern */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
              backgroundSize: '30px 30px'
            }}
          />
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2"
              >
                <Zap className="w-5 h-5" />
                <span className="text-sm font-medium">Live Dashboard</span>
              </motion.div>
            </div>
            <motion.h3
              key={currentSlide}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold"
            >
              PREPZR Dashboard
            </motion.h3>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 animate-pulse" />
              <span className="text-sm opacity-90">Smart Learning</span>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8 h-[470px] flex flex-col relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex-1 flex flex-col"
            >
              {/* Slide Header with Premium Styling */}
              <div className="flex items-start gap-6 mb-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`p-4 rounded-2xl bg-gradient-to-br ${dashboardSlides[currentSlide].gradient} text-white shadow-lg relative overflow-hidden`}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.1, 0.3],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  {dashboardSlides[currentSlide].icon}
                </motion.div>
                <div className="flex-1">
                  <motion.h4
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2"
                  >
                    {dashboardSlides[currentSlide].title}
                  </motion.h4>
                  <motion.p
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-gray-600 dark:text-gray-400 text-base leading-relaxed"
                  >
                    {dashboardSlides[currentSlide].description}
                  </motion.p>
                </div>
              </div>

              {/* Live Metrics Dashboard */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="grid grid-cols-3 gap-4 mb-6"
              >
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-4 border border-blue-200/50 dark:border-blue-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Readiness</span>
                    <Target className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex items-center gap-3">
                    <RadialProgress
                      value={liveMetrics.readinessScore}
                      size="sm"
                      colorClassName="stroke-blue-600"
                      showValue={false}
                    />
                    <div>
                      <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                        {liveMetrics.readinessScore}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-4 border border-green-200/50 dark:border-green-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">Mastery</span>
                    <Brain className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex items-center gap-3">
                    <RadialProgress
                      value={liveMetrics.conceptMastery}
                      size="sm"
                      colorClassName="stroke-green-600"
                      showValue={false}
                    />
                    <div>
                      <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                        {liveMetrics.conceptMastery}%
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-4 border border-purple-200/50 dark:border-purple-800/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Accuracy</span>
                    <Star className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex items-center gap-3">
                    <RadialProgress
                      value={liveMetrics.practiceAccuracy}
                      size="sm"
                      colorClassName="stroke-purple-600"
                      showValue={false}
                    />
                    <div>
                      <div className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                        {liveMetrics.practiceAccuracy}%
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Features Grid with Premium Animation */}
              <div className="grid grid-cols-1 gap-3 mb-6">
                {dashboardSlides[currentSlide].features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -30, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.6 + index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-all duration-300"
                  >
                    {dashboardSlides[currentSlide].subIcons?.[index] && (
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                        className="text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg"
                      >
                        {dashboardSlides[currentSlide].subIcons[index]}
                      </motion.div>
                    )}
                    <span className="text-gray-700 dark:text-gray-300 font-medium flex-1">
                      {feature}
                    </span>
                    <motion.div
                      className="w-2 h-2 rounded-full bg-green-500"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        delay: index * 0.3
                      }}
                    />
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Progress Visualization */}
              <div className="mt-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                    Learning Journey Progress
                  </span>
                  <motion.span
                    key={currentSlide}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    {Math.round(animatedProgress)}%
                  </motion.span>
                </div>
                <div className="relative">
                  <Progress
                    value={animatedProgress}
                    className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                    indicatorClassName={`bg-gradient-to-r ${dashboardSlides[currentSlide].gradient} transition-all duration-1000 ease-out relative`}
                  />
                  <motion.div
                    className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ width: `${animatedProgress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="flex justify-center mt-6 space-x-3">
        {dashboardSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`relative overflow-hidden rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'w-8 h-3 bg-gradient-to-r from-blue-600 to-purple-600' 
                : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {index === currentSlide && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-50"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Premium Floating Elements */}
      <motion.div
        className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 blur-sm"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      
      <motion.div
        className="absolute -bottom-8 -left-8 w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60 blur-sm"
        animate={{
          y: [0, 15, 0],
          rotate: [360, 180, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <motion.div
        className="absolute top-1/2 -right-4 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-40"
        animate={{
          x: [0, 10, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default DashboardPreview;
