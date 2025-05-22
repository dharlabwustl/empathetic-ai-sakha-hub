
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ImprovedHeroBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This effect is for potential future 3D enhancements
    if (!containerRef.current) return;
    
    // Potential initialization code for more complex 3D effects
    return () => {
      // Cleanup
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden z-0"
      style={{ 
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
    >
      {/* Dashboard-style 3D gradient background layers with depth */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        style={{ 
          background: `radial-gradient(circle at 50% 50%, 
            rgba(99, 102, 241, 0.08) 0%, 
            rgba(99, 102, 241, 0.02) 50%, 
            rgba(79, 70, 229, 0.01) 100%)`,
          zIndex: -20
        }}
      />
      
      {/* Glowing orbs with depth effect - similar to dashboard */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full"
          style={{
            background: `radial-gradient(circle, 
              rgba(${120 + Math.random() * 50}, ${120 + Math.random() * 50}, ${200 + Math.random() * 55}, 0.7) 0%, 
              rgba(${100 + Math.random() * 50}, ${100 + Math.random() * 50}, ${200 + Math.random() * 55}, 0) 70%)`,
            width: `${Math.random() * 40 + 20}vh`,
            height: `${Math.random() * 40 + 20}vh`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: `blur(${Math.random() * 50 + 50}px)`,
            opacity: Math.random() * 0.3 + 0.2,
            transform: `translateZ(${-Math.random() * 200}px)`,
            zIndex: -15
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: Math.random() * 100 + 100,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Educational icons floating in 3D space */}
      {[
        "➕", "✏️", "📚", "⚗️", "🧪", "🔬", "📝", "📊", 
        "🧮", "🧠", "🧬", "📐", "⚛️", "💫", "🪐", "🧲"
      ].map((icon, i) => (
        <motion.div
          key={`edu-icon-${i}`}
          className="absolute text-4xl opacity-20 select-none"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            color: `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, ${200 + Math.random() * 55}, 0.8)`,
            textShadow: `0 0 15px rgba(99, 102, 241, 0.5)`,
            transform: `translateZ(${-Math.random() * 300}px) rotateX(${Math.random() * 360}deg) rotateY(${Math.random() * 360}deg)`,
            transformStyle: "preserve-3d",
            zIndex: Math.floor(-Math.random() * 10) - 5
          }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
            rotateZ: [0, 360],
            y: [0, Math.random() * 50 - 25],
            x: [0, Math.random() * 50 - 25],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 25 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        >
          {icon}
        </motion.div>
      ))}

      {/* Floating formulas */}
      {[
        "E = mc²", "F = ma", "a² + b² = c²", "∫f(x)dx", 
        "∑(n=1)^∞ 1/n²", "ΔS ≥ 0", "PV = nRT", "ΔG = ΔH - TΔS"
      ].map((formula, i) => (
        <motion.div
          key={`formula-${i}`}
          className="absolute font-mono text-base md:text-lg opacity-15 select-none"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            color: `rgba(${100 + Math.random() * 155}, ${100 + Math.random() * 155}, ${200 + Math.random() * 55}, 0.7)`,
            textShadow: `0 0 10px rgba(99, 102, 241, 0.3)`,
            transform: `translateZ(${-Math.random() * 200}px)`,
            zIndex: -10
          }}
          animate={{
            y: [0, Math.random() * 30 - 15],
            x: [0, Math.random() * 30 - 15],
            opacity: [0.15, 0.25, 0.15],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 20 + Math.random() * 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        >
          {formula}
        </motion.div>
      ))}

      {/* Grid pattern with perspective - dashboard-like */}
      <div 
        className="absolute inset-0" 
        style={{
          background: `linear-gradient(rgba(99,102,241,0.03) 1px, transparent 1px), 
                      linear-gradient(90deg, rgba(99,102,241,0.03) 1px, transparent 1px)`,
          backgroundSize: '30px 30px',
          perspective: "1000px",
          transform: "rotateX(60deg) scale(2.5) translateZ(-50px)",
          opacity: 0.3,
          transformStyle: "preserve-3d",
          zIndex: -5
        }} 
      />

      {/* Moving light beams */}
      <motion.div
        className="absolute w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={`beam-${i}`}
            className="absolute bg-gradient-to-r from-transparent via-indigo-400/10 to-transparent blur-2xl"
            style={{
              height: `${Math.random() * 30 + 10}rem`,
              width: '100%',
              top: `${Math.random() * 70 + 15}%`,
              transform: `rotate(${Math.random() * 10 - 5}deg) translateZ(${-Math.random() * 50}px)`,
              opacity: 0,
              zIndex: -10
            }}
            animate={{
              opacity: [0, 0.3, 0],
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 10 + Math.random() * 8,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
              delay: i * 3,
            }}
          />
        ))}
      </motion.div>

      {/* Small floating particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              backgroundColor: `rgba(${150 + Math.random() * 100}, ${150 + Math.random() * 100}, ${200 + Math.random() * 55}, ${Math.random() * 0.5 + 0.2})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: `blur(${Math.random()}px)`,
              boxShadow: `0 0 ${Math.random() * 3}px rgba(${Math.random() * 255}, ${Math.random() * 255}, 255, 0.${Math.floor(Math.random() * 5 + 5)})`,
              transform: `translateZ(${Math.random() * 200 - 100}px)`,
              zIndex: -5
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
              scale: [1, Math.random() * 0.5 + 1, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 8 + 7,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Abstract shapes for visual interest */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute rounded-full bg-gradient-to-r"
          style={{
            from: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 200 + 55}, 0.05)`,
            to: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 200 + 55}, 0.02)`,
            width: `${Math.random() * 30 + 20}vh`,
            height: `${Math.random() * 30 + 20}vh`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: `blur(${Math.random() * 50 + 40}px)`,
            transform: `translateZ(${-Math.random() * 300}px) rotate(${Math.random() * 360}deg)`,
            zIndex: -15
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 360],
            opacity: [0.03, 0.07, 0.03],
          }}
          transition={{
            duration: 30 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default ImprovedHeroBackground;
