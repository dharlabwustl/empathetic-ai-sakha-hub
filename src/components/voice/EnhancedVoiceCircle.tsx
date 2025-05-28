
import React from 'react';
import { motion } from 'framer-motion';

interface EnhancedVoiceCircleProps {
  isSpeaking: boolean;
  isListening?: boolean;
  size?: number;
  className?: string;
  onClick?: () => void;
}

export const EnhancedVoiceCircle: React.FC<EnhancedVoiceCircleProps> = ({
  isSpeaking,
  isListening = false,
  size = 56,
  className = "",
  onClick
}) => {
  const handleClick = () => {
    // Stop voice assistant when microphone is clicked
    window.dispatchEvent(new Event('microphone-clicked'));
    if (onClick) onClick();
  };

  return (
    <div 
      className={`relative cursor-pointer ${className}`} 
      style={{ width: size, height: size }}
      onClick={handleClick}
    >
      {/* Outer vibrant pulse ring */}
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
      
      {/* Middle pulse ring */}
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
      
      {/* Inner active ring */}
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
      
      {/* Main AI circle with dynamic color changes */}
      <motion.div
        className={`relative z-10 w-full h-full rounded-full border-2 border-white shadow-lg flex items-center justify-center ${
          isSpeaking 
            ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600' 
            : isListening
            ? 'bg-gradient-to-r from-green-500 to-blue-500'
            : 'bg-gradient-to-r from-blue-500 to-purple-500'
        }`}
        animate={isSpeaking ? {
          background: [
            'linear-gradient(45deg, #9333ea, #3b82f6, #ec4899)',
            'linear-gradient(45deg, #ec4899, #9333ea, #3b82f6)',
            'linear-gradient(45deg, #3b82f6, #ec4899, #9333ea)',
            'linear-gradient(45deg, #9333ea, #3b82f6, #ec4899)'
          ],
          scale: [1, 1.05, 1, 1.02, 1]
        } : {}}
        transition={{
          background: {
            duration: 3,
            repeat: isSpeaking ? Infinity : 0,
            ease: "easeInOut"
          },
          scale: {
            duration: 0.8,
            repeat: isSpeaking ? Infinity : 0,
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
      
      {/* Sound waves */}
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
  className = "",
  onClick
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
        onClick={onClick}
      />
    </motion.div>
  );
};
