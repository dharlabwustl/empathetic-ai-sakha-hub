
import React from 'react';
import { motion } from 'framer-motion';

interface EnhancedVoiceCircleProps {
  isSpeaking: boolean;
  isListening?: boolean;
  size?: number;
  className?: string;
}

export const EnhancedVoiceCircle: React.FC<EnhancedVoiceCircleProps> = ({
  isSpeaking,
  isListening = false,
  size = 56,
  className = ""
}) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Outer vibrant pulse ring - only when speaking */}
      {isSpeaking && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
          animate={{
            scale: [1, 1.4, 1.2, 1.6, 1],
            opacity: [0.6, 0.3, 0.5, 0.2, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Middle pulse ring - only when speaking */}
      {isSpeaking && (
        <motion.div
          className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
          animate={{
            scale: [1, 1.3, 1.1, 1.4, 1],
            opacity: [0.5, 0.7, 0.4, 0.6, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
        />
      )}
      
      {/* Inner active ring - when speaking or listening */}
      {(isSpeaking || isListening) && (
        <motion.div
          className={`absolute inset-2 rounded-full ${
            isSpeaking 
              ? 'bg-gradient-to-r from-pink-500 to-violet-500' 
              : 'bg-gradient-to-r from-green-400 to-blue-400'
          }`}
          animate={{
            scale: isSpeaking ? [1, 1.2, 1] : [1, 1.1, 1],
            opacity: [0.8, 0.9, 0.8],
          }}
          transition={{
            duration: isSpeaking ? 1 : 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Main AI circle with dynamic animations */}
      <motion.div
        className={`relative z-10 w-full h-full rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
          isSpeaking 
            ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600' 
            : isListening
            ? 'bg-gradient-to-r from-green-500 to-blue-500'
            : 'bg-gradient-to-r from-blue-500 to-purple-500'
        }`}
        animate={isSpeaking ? {
          scale: [1, 1.05, 1, 1.02, 1]
        } : isListening ? {
          scale: [1, 1.03, 1]
        } : {}}
        transition={{
          scale: {
            duration: isSpeaking ? 0.8 : 1.5,
            repeat: (isSpeaking || isListening) ? Infinity : 0,
            ease: "easeInOut"
          }
        }}
      >
        <motion.span 
          className="text-white font-bold text-lg select-none"
          animate={isSpeaking ? {
            scale: [1, 1.1, 1, 1.05, 1],
            color: ['#ffffff', '#fbbf24', '#ffffff', '#34d399', '#ffffff']
          } : {}}
          transition={{
            duration: 1.5,
            repeat: isSpeaking ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          AI
        </motion.span>
      </motion.div>
      
      {/* Sound waves animation - only when speaking */}
      {isSpeaking && (
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 bg-gradient-to-t from-purple-400 to-pink-400 rounded-full"
              style={{
                left: `${30 + i * 15}%`,
                height: '8px'
              }}
              animate={{
                scaleY: [1, 2, 0.5, 1.5, 1],
                opacity: [0.6, 1, 0.4, 0.8, 0.6]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FloatingVoiceButton: React.FC<EnhancedVoiceCircleProps> = ({
  isSpeaking,
  isListening,
  className = ""
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background gradient pulse */}
      {(isSpeaking || isListening) && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      <EnhancedVoiceCircle 
        isSpeaking={isSpeaking}
        isListening={isListening}
        size={56}
        className="relative z-10"
      />
    </motion.div>
  );
};
