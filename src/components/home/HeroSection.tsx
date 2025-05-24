
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroContent from './HeroContent';
import DashboardPreview from './DashboardPreview';
import { Sparkles, Zap, Brain, Target, Star, Rocket, Award, GraduationCap } from 'lucide-react';

interface HeroSectionProps {
  handleExamReadinessClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  handleExamReadinessClick = () => {} 
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-blue-950/30">
      {/* Modern geometric background */}
      <div className="absolute inset-0">
        {/* Diagonal stripes pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 60px,
              rgba(59, 130, 246, 0.1) 60px,
              rgba(59, 130, 246, 0.1) 120px
            )`,
          }}
        />
        
        {/* Subtle grid overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large accent circles */}
        <motion.div
          className="absolute top-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-500/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-br from-purple-400/10 to-pink-500/10 blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />

        {/* Small floating elements */}
        {Array.from({ length: 12 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Modern content layout */}
      <div className="relative z-10">
        <div className="container mx-auto px-6 lg:px-8 pt-20 pb-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left content area */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HeroContent handleExamReadinessClick={handleExamReadinessClick} />
            </motion.div>

            {/* Right content - Dashboard preview with modern styling */}
            <motion.div
              className="order-1 lg:order-2 relative"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              {/* Modern frame container */}
              <div className="relative">
                {/* Subtle glow effect */}
                <motion.div
                  className="absolute -inset-8 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-2xl"
                  animate={{
                    opacity: isHovered ? [0.5, 0.8, 0.5] : 0.3,
                    scale: isHovered ? [1, 1.05, 1] : 1,
                  }}
                  transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                />
                
                {/* Main content container with modern glassmorphism */}
                <motion.div
                  className="relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/30 rounded-2xl p-3 shadow-xl"
                  whileHover={{ 
                    scale: 1.02,
                    y: -5,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Dashboard preview */}
                  <div className="relative overflow-hidden rounded-xl bg-gray-50/50 dark:bg-gray-800/50">
                    <DashboardPreview />
                    
                    {/* Subtle overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none rounded-xl"
                      animate={{
                        opacity: isHovered ? [0, 0.3, 0] : 0,
                      }}
                      transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                    />
                  </div>
                  
                  {/* Minimal corner accents */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-blue-400/40 rounded-tl-lg" />
                  <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-purple-400/40 rounded-tr-lg" />
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-purple-400/40 rounded-bl-lg" />
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-blue-400/40 rounded-br-lg" />
                </motion.div>

                {/* Floating status badges */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-sm"
                  animate={{
                    y: [-2, 2, -2],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Star className="w-3 h-3 fill-current" />
                  <span>LIVE</span>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-sm"
                  animate={{
                    y: [2, -2, 2],
                    rotate: [0, -2, 0, 2, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  <Brain className="w-3 h-3" />
                  <span>AI POWERED</span>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Modern stats bar */}
          <motion.div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { number: "2M+", label: "Students", icon: GraduationCap, color: "from-blue-500 to-blue-600" },
              { number: "95%", label: "Success Rate", icon: Target, color: "from-green-500 to-emerald-600" },
              { number: "24/7", label: "AI Support", icon: Brain, color: "from-purple-500 to-indigo-600" },
              { number: "50+", label: "Exams Covered", icon: Award, color: "from-orange-500 to-red-600" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/30 dark:border-gray-700/20 shadow-sm"
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.2 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white mb-3 shadow-lg`}>
                  <stat.icon size={20} />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Modern scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wide">SCROLL TO EXPLORE</span>
        <div className="w-6 h-10 border-2 border-gray-300 dark:border-gray-600 rounded-full flex justify-center relative">
          <motion.div
            className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
