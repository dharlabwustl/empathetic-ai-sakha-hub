
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Brain, Target, Award, Zap, ArrowRight, Play, Rocket, Star, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardPreview from './DashboardPreview';

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentFeature, setCurrentFeature] = useState(0);
  const [showDashboard, setShowDashboard] = useState(false);

  const features = [
    { icon: <Brain className="w-6 h-6" />, text: "AI-Powered Learning", color: "from-blue-500 to-purple-600" },
    { icon: <Target className="w-6 h-6" />, text: "Personalized Study Plans", color: "from-purple-500 to-pink-600" },
    { icon: <Award className="w-6 h-6" />, text: "Exam Success Guarantee", color: "from-green-500 to-blue-600" },
    { icon: <Zap className="w-6 h-6" />, text: "Smart Progress Tracking", color: "from-amber-500 to-red-600" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleStartJourney = () => {
    navigate('/signup');
  };

  const handleWatchDemo = () => {
    setShowDashboard(true);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: Math.random() * 10 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-8"
          >
            {/* Live Badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2"
            >
              <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-4 py-2 text-sm font-bold rounded-full border-0 shadow-lg shadow-emerald-500/25">
                <motion.div
                  className="w-2 h-2 bg-white rounded-full mr-2"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Rocket className="w-4 h-4 mr-1" />
                NEET 2026 PREP LIVE NOW!
              </Badge>
              
              <Badge className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-3 py-1 text-xs font-bold rounded-full border-0">
                <Star className="w-3 h-3 mr-1 fill-current" />
                AI POWERED
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                  Transform
                </span>
                <br />
                <span className="text-white">Your</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
                  Exam Journey
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                From struggling student to exam champion with the world's first 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold"> emotionally intelligent</span> learning platform for 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 font-semibold"> JEE, NEET, UPSC & CAT</span>
              </motion.p>
            </div>

            {/* Dynamic Feature Showcase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-4"
                >
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${features[currentFeature].color} text-white shadow-lg`}>
                    {features[currentFeature].icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{features[currentFeature].text}</h3>
                    <p className="text-gray-300 text-sm">Join 2M+ students achieving success</p>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Feature Indicators */}
              <div className="flex gap-2 mt-4 justify-center lg:justify-start">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFeature(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentFeature ? 'bg-purple-400 w-8' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                onClick={handleStartJourney}
                size="lg"
                className="group bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 border-0 text-lg"
              >
                <Rocket className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Start Your Success Journey
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={handleWatchDemo}
                size="lg"
                variant="outline"
                className="group border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 py-4 px-8 rounded-2xl font-bold text-lg backdrop-blur-sm transition-all duration-300"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Live Demo
              </Button>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20"
            >
              {[
                { number: "2M+", label: "Students" },
                { number: "95%", label: "Success Rate" },
                { number: "4.9/5", label: "Rating" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    {stat.number}
                  </div>
                  <div className="text-gray-300 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl" />
              
              {/* Dashboard Container */}
              <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-2 border border-white/20 shadow-2xl">
                <DashboardPreview />
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-xl shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <GraduationCap className="w-6 h-6" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -right-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white p-3 rounded-xl shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <Award className="w-6 h-6" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 bg-gradient-to-r from-purple-500 to-pink-600 text-white p-3 rounded-xl shadow-lg"
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.7 }}
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Dashboard Modal */}
      <AnimatePresence>
        {showDashboard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDashboard(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDashboard(false)}
                className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Live Dashboard Preview</h3>
                <DashboardPreview />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default HeroSection;
