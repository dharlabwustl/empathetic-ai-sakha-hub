
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

  // Floating particles data
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }));

  const floatingIcons = [
    { icon: Brain, color: 'text-blue-400', delay: 0 },
    { icon: Target, color: 'text-purple-400', delay: 1 },
    { icon: Zap, color: 'text-yellow-400', delay: 2 },
    { icon: Award, color: 'text-green-400', delay: 3 },
    { icon: GraduationCap, color: 'text-indigo-400', delay: 4 },
    { icon: Rocket, color: 'text-pink-400', delay: 5 },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/20">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px),
              linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [-20, -100],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.color} opacity-20`}
            style={{
              left: `${10 + index * 15}%`,
              top: `${20 + (index % 2) * 40}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8 + index,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <item.icon size={24 + index * 4} />
          </motion.div>
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [0.8, 1.5, 0.8],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 4 }}
        />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 pt-16 pb-12">
          {/* Hero Content Area */}
          <motion.div
            className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {/* Left Content */}
            <motion.div
              className="lg:w-1/2 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <HeroContent handleExamReadinessClick={handleExamReadinessClick} />
            </motion.div>

            {/* Right Content - Dashboard Preview */}
            <motion.div
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Decorative Frame */}
              <div className="relative">
                {/* Glowing Border Effect */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                
                {/* Content Container */}
                <motion.div
                  className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 rounded-2xl p-2 shadow-2xl"
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 5,
                    rotateX: 5,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Dashboard Preview */}
                  <div className="relative overflow-hidden rounded-xl">
                    <DashboardPreview />
                    
                    {/* Overlay Effects */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-blue-500/10 pointer-events-none"
                      animate={{
                        opacity: isHovered ? [0, 0.3, 0] : 0,
                      }}
                      transition={{ duration: 2, repeat: isHovered ? Infinity : 0 }}
                    />
                  </div>
                  
                  {/* Corner Accents */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-blue-500/60 rounded-tl-lg" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-purple-500/60 rounded-tr-lg" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-purple-500/60 rounded-bl-lg" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-pink-500/60 rounded-br-lg" />
                </motion.div>

                {/* Floating Success Indicators */}
                <motion.div
                  className="absolute -top-6 -right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
                  animate={{
                    y: [-5, 5, -5],
                    rotate: [0, 5, 0, -5, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Star className="w-3 h-3 fill-current" />
                  <span>LIVE NOW</span>
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
                  animate={{
                    y: [5, -5, 5],
                    rotate: [0, -5, 0, 5, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  <Sparkles className="w-3 h-3" />
                  <span>AI POWERED</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Bottom Stats Bar */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { number: "2M+", label: "Students", icon: GraduationCap },
              { number: "95%", label: "Success Rate", icon: Target },
              { number: "24/7", label: "AI Support", icon: Brain },
              { number: "50+", label: "Exams Covered", icon: Award },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/30"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg">
                  <stat.icon size={16} />
                </div>
                <div>
                  <div className="font-bold text-lg text-gray-900 dark:text-white">{stat.number}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs font-medium">Explore More</span>
        <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-current rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
