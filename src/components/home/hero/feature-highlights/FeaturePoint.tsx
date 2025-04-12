
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';

export interface FeaturePointProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
  index: number;
}

const FeaturePoint: React.FC<FeaturePointProps> = ({
  icon,
  title,
  description,
  color,
  delay,
  index
}) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        show: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 80,
            damping: 12
          }
        }
      }}
      whileHover={{
        scale: 1.05,
        y: -8,
        boxShadow: "0 15px 30px -5px rgba(139, 92, 246, 0.5)",
        transition: { 
          type: "spring", 
          stiffness: 300, 
          damping: 10
        }
      }}
      className="bg-white/95 backdrop-blur-sm dark:bg-slate-800/95 rounded-xl p-5 shadow-lg border border-purple-100 dark:border-purple-900/30 transform transition-all relative overflow-hidden"
      style={{ originY: 0.5, originX: 0.5 }}
    >
      {/* Background gradient - fixed the opacity to 0.1 from 0.1 */}
      <motion.div 
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10 dark:opacity-15`}
        variants={{
          pulse: {
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.15, 0.1], // Adjusted opacity animation
            transition: {
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
            },
          },
        }}
        animate="pulse"
      />
      
      {/* Animated sparkle */}
      <motion.div 
        className="absolute -right-2 -top-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          repeatDelay: 3 + index,
          delay: delay * 2
        }}
      >
        <Sparkles className="text-purple-400" size={16} />
      </motion.div>
      
      <div className="flex items-start gap-3">
        <FeatureIcon icon={icon} color={color} delay={delay} />
        <div>
          <h3 className="text-sm font-semibold text-black dark:text-black flex items-center gap-1.5">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 0.5 + delay,
                type: "spring",
                stiffness: 300,
                damping: 10
              }}
            >
              <CheckCircle2 size={14} className="text-green-500" />
            </motion.div>
            <span className="font-bold">{title}</span>
          </h3>
          <p className="text-xs text-black/80 dark:text-black/80 mt-1.5 font-medium">
            {description}
          </p>
        </div>
      </div>

      {/* Animated border overlay */}
      <BorderAnimation index={index} delay={delay} />

      {/* Bottom corner decoration */}
      <CornerDecoration index={index} />
    </motion.div>
  );
};

const FeatureIcon: React.FC<{ icon: React.ReactNode; color: string; delay: number }> = ({ 
  icon, color, delay 
}) => {
  const iconAnimation = {
    rotate: [0, -10, 10, -5, 0],
    scale: [1, 1.2, 1],
    transition: { 
      duration: 0.5,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div 
      whileHover={iconAnimation}
      className={`rounded-full bg-gradient-to-br ${color} p-2.5 flex-shrink-0 shadow-md`}
    >
      {icon}
      <motion.div 
        className="absolute inset-0 rounded-full"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0, 0.5, 0], 
          scale: [0.8, 1.5, 1.8]
        }}
        transition={{ 
          duration: 2.5, 
          repeat: Infinity,
          repeatDelay: 1,
          delay: delay
        }}
        style={{ 
          background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)`,
        }}
      />
    </motion.div>
  );
};

const BorderAnimation: React.FC<{ index: number; delay: number }> = ({ index, delay }) => {
  return (
    <motion.div 
      className="absolute inset-0 rounded-xl pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ 
        boxShadow: ['0 0 0 0 rgba(139, 92, 246, 0)', '0 0 0 2px rgba(139, 92, 246, 0.3)', '0 0 0 0 rgba(139, 92, 246, 0)'],
        opacity: [0, 1, 0]
      }}
      transition={{ 
        duration: 3, 
        repeat: Infinity, 
        repeatDelay: 2 + index,
        delay: delay * 3
      }}
    />
  );
};

const CornerDecoration: React.FC<{ index: number }> = ({ index }) => {
  return (
    <motion.div
      className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-full blur-md"
      animate={{ 
        scale: [1, 1.2, 1], 
        opacity: [0.5, 0.8, 0.5] 
      }}
      transition={{ 
        duration: 4, 
        repeat: Infinity,
        delay: index * 0.5
      }}
    />
  );
};

export default FeaturePoint;
