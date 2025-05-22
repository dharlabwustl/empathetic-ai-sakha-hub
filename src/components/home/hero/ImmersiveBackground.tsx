
import React from 'react';
import { motion } from 'framer-motion';

const ImmersiveBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* 3D floating grid pattern with continuous movement */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(rgba(79,70,229,0.03) 1px, transparent 1px), 
                      linear-gradient(90deg, rgba(79,70,229,0.03) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          perspective: "1000px",
          transformStyle: "preserve-3d",
          opacity: 0.7,
        }}
        animate={{
          backgroundPosition: ['0px 0px', '40px 40px'],
          rotateX: [15, 5, 15],
          rotateY: [-5, 5, -5],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
          backgroundPosition: {
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }
        }}
      />
      
      {/* Dynamic flowing gradients with continuous movement */}
      <motion.div
        className="absolute -left-1/4 -top-1/4 w-[150%] h-[150%]" 
        style={{
          background: "radial-gradient(circle, rgba(124, 58, 237, 0.05) 0%, rgba(79, 70, 229, 0.03) 25%, rgba(99, 102, 241, 0.02) 50%, transparent 70%)",
          transformStyle: "preserve-3d",
        }}
        animate={{
          x: ['-5%', '5%', '-5%'],
          y: ['-5%', '5%', '-5%'],
          scale: [1, 1.05, 1],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute -right-1/4 -bottom-1/4 w-[120%] h-[120%]" 
        style={{
          background: "radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, rgba(5, 150, 105, 0.03) 25%, rgba(6, 182, 212, 0.02) 50%, transparent 70%)",
          transformStyle: "preserve-3d",
        }}
        animate={{
          x: ['5%', '-5%', '5%'],
          y: ['5%', '-5%', '5%'],
          scale: [1.05, 1, 1.05],
          opacity: [0.7, 0.9, 0.7],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Dynamic floating particles with continuous movement */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-gradient-radial"
          style={{
            width: Math.random() * 12 + 4,
            height: Math.random() * 12 + 4,
            background: `radial-gradient(circle, rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 200 + 55}, ${Math.random() * 0.7 + 0.3}) 0%, rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 200 + 55}, 0) 70%)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: `blur(${Math.random() * 2}px)`,
            boxShadow: `0 0 ${Math.random() * 10 + 5}px rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, ${Math.random() * 255}, 0.${Math.floor(Math.random() * 8 + 2)})`,
            zIndex: Math.floor(Math.random() * 20) - 10,
            transform: `translateZ(${Math.random() * 50 - 25}px)`,
            opacity: Math.random() * 0.6 + 0.2,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50],
            y: [0, Math.random() * 100 - 50],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, Math.random() * 0.5 + 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}

      {/* 3D Rotating educational symbols with continuous movement */}
      {[
        { icon: "➕", color: "rgba(147, 51, 234, 0.4)", size: 1.2 }, // Math symbol
        { icon: "🧪", color: "rgba(79, 70, 229, 0.4)", size: 1.3 },  // Science symbol
        { icon: "📝", color: "rgba(59, 130, 246, 0.4)", size: 1.1 }, // Notes symbol
        { icon: "🔬", color: "rgba(16, 185, 129, 0.4)", size: 1.4 }, // Research symbol
        { icon: "📊", color: "rgba(245, 158, 11, 0.4)", size: 1.2 }, // Analysis symbol
        { icon: "📚", color: "rgba(236, 72, 153, 0.4)", size: 1.3 }, // Books symbol
        { icon: "🧠", color: "rgba(139, 92, 246, 0.4)", size: 1.2 }, // Brain/knowledge symbol
        { icon: "⚗️", color: "rgba(6, 182, 212, 0.4)", size: 1.1 },  // Chemistry symbol
        { icon: "🔢", color: "rgba(124, 58, 237, 0.4)", size: 1.3 }, // Numbers symbol
        { icon: "🪐", color: "rgba(220, 38, 38, 0.4)", size: 1.4 },  // Planet/physics symbol
        { icon: "🧬", color: "rgba(5, 150, 105, 0.4)", size: 1.2 },  // DNA/biology symbol
        { icon: "📐", color: "rgba(245, 158, 11, 0.4)", size: 1.3 }  // Geometry symbol
      ].map((item, i) => (
        <motion.div
          key={`symbol-${i}`}
          className="absolute text-2xl md:text-4xl font-bold"
          style={{
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%`,
            color: item.color,
            textShadow: `0 0 15px ${item.color.replace('0.4', '0.7')}`,
            zIndex: -5,
            transformStyle: "preserve-3d",
            perspective: "1000px",
            scale: item.size,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            rotateX: [0, 360],
            rotateY: [0, 360],
            rotateZ: [0, 360],
            scale: [item.size * 0.9, item.size * 1.1, item.size * 0.9],
            opacity: [0.5, 0.9, 0.5],
            textShadow: [
              `0 0 15px ${item.color.replace('0.4', '0.4')}`,
              `0 0 25px ${item.color.replace('0.4', '0.8')}`,
              `0 0 15px ${item.color.replace('0.4', '0.4')}`
            ],
          }}
          transition={{
            duration: Math.random() * 45 + 30,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Pulsating glow orbs with continuous movement */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 200 + 55}, 0.3) 0%, rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 200 + 55}, 0) 70%)`,
            width: `${Math.random() * 40 + 20}%`,
            height: `${Math.random() * 40 + 20}%`,
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 80}%`,
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, Math.random() * 40 - 20, 0],
            y: [0, Math.random() * 40 - 20, 0],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}

      {/* Moving light beams with volumetric effect */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-2/3 h-32 bg-gradient-to-r from-transparent via-indigo-400/10 to-transparent rotate-45 blur-md"
        style={{
          transform: "translateZ(-10px) rotateX(45deg)",
          transformStyle: "preserve-3d"
        }}
        animate={{
          opacity: [0, 0.7, 0],
          width: ["40%", "70%", "40%"],
          x: ["-25%", "25%", "-25%"],
          filter: ["blur(10px)", "blur(20px)", "blur(10px)"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-1/2 h-24 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -rotate-45 blur-md"
        style={{
          transform: "translateZ(-15px) rotateX(-30deg)",
          transformStyle: "preserve-3d"
        }}
        animate={{
          opacity: [0, 0.6, 0],
          width: ["30%", "60%", "30%"],
          x: ["25%", "-25%", "25%"],
          filter: ["blur(10px)", "blur(25px)", "blur(10px)"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />

      {/* Floating educational formulas with physics appearance */}
      {[
        "E = mc²", 
        "F = ma", 
        "PV = nRT", 
        "a² + b² = c²", 
        "ΔG = ΔH - TΔS",
        "∫f(x)dx"
      ].map((formula, i) => (
        <motion.div
          key={`formula-${i}`}
          className="absolute text-xl md:text-2xl font-mono opacity-20"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: `${Math.random() * 90 + 5}%`,
            color: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, ${Math.random() * 200 + 55}, 0.7)`,
            textShadow: `0 0 10px rgba(255,255,255,0.5)`,
            zIndex: -3
          }}
          animate={{
            y: [0, Math.random() * 70 - 35],
            x: [0, Math.random() * 70 - 35],
            opacity: [0.1, 0.25, 0.1],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 20 + Math.random() * 15,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
          }}
        >
          {formula}
        </motion.div>
      ))}
    </div>
  );
};

export default ImmersiveBackground;
