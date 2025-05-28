
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff } from 'lucide-react';

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
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      {/* Enhanced outer vibrant pulse ring - only when speaking */}
      {isSpeaking && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
          animate={{
            scale: [1, 1.5, 1.2, 1.7, 1],
            opacity: [0.7, 0.3, 0.6, 0.2, 0.7],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Enhanced middle pulse ring - only when speaking */}
      {isSpeaking && (
        <motion.div
          className="absolute inset-1 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
          animate={{
            scale: [1, 1.4, 1.1, 1.5, 1],
            opacity: [0.6, 0.8, 0.4, 0.7, 0.6],
          }}
          transition={{
            duration: 1.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
        />
      )}
      
      {/* Enhanced inner active ring - when speaking or listening */}
      {(isSpeaking || isListening) && (
        <motion.div
          className={`absolute inset-2 rounded-full ${
            isSpeaking 
              ? 'bg-gradient-to-r from-pink-500 to-violet-500' 
              : 'bg-gradient-to-r from-green-400 to-blue-400'
          }`}
          animate={{
            scale: isSpeaking ? [1, 1.3, 1] : [1, 1.15, 1],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: isSpeaking ? 0.8 : 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Enhanced main AI circle with smoother animations */}
      <motion.div
        className={`relative z-10 w-full h-full rounded-full border-2 border-white shadow-xl flex items-center justify-center cursor-pointer ${
          isSpeaking 
            ? 'bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600' 
            : isListening
            ? 'bg-gradient-to-r from-green-500 to-blue-500'
            : 'bg-gradient-to-r from-blue-500 to-purple-500'
        }`}
        animate={isSpeaking ? {
          scale: [1, 1.08, 1, 1.04, 1]
        } : isListening ? {
          scale: [1, 1.06, 1]
        } : {}}
        transition={{
          scale: {
            duration: isSpeaking ? 0.7 : 1.2,
            repeat: (isSpeaking || isListening) ? Infinity : 0,
            ease: "easeInOut"
          }
        }}
        onClick={onClick}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.05 }}
      >
        {/* Enhanced microphone icon with smoother transitions */}
        {onClick ? (
          <motion.div
            animate={isListening ? {
              scale: [1, 1.2, 1],
              color: ['#ffffff', '#10b981', '#ffffff']
            } : {}}
            transition={{
              duration: 0.8,
              repeat: isListening ? Infinity : 0,
              ease: "easeInOut"
            }}
            className="flex items-center justify-center"
          >
            {isListening ? (
              <MicOff className="h-6 w-6 text-white drop-shadow-lg" />
            ) : (
              <Mic className="h-6 w-6 text-white drop-shadow-lg" />
            )}
          </motion.div>
        ) : (
          <motion.span 
            className="text-white font-bold text-lg select-none drop-shadow-lg"
            animate={isSpeaking ? {
              scale: [1, 1.15, 1, 1.08, 1],
              color: ['#ffffff', '#fbbf24', '#ffffff', '#10b981', '#ffffff']
            } : {}}
            transition={{
              duration: 1.2,
              repeat: isSpeaking ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            AI
          </motion.span>
        )}
      </motion.div>
      
      {/* Enhanced sound waves animation with better visual feedback */}
      {isSpeaking && (
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 bg-gradient-to-t from-purple-400 to-pink-400 rounded-full"
              style={{
                left: `${25 + i * 12}%`,
                height: '10px'
              }}
              animate={{
                scaleY: [1, 2.5, 0.5, 1.8, 1],
                opacity: [0.7, 1, 0.4, 0.9, 0.7]
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.08,
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
  const clickedRef = useRef(false);

  const handleClick = () => {
    // Immediate feedback - stop speech instantly
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Trigger microphone clicked event immediately
    window.dispatchEvent(new Event('microphone-clicked'));
    
    clickedRef.current = true;
    
    // Enhanced voice recognition control with immediate response
    if (isListening) {
      window.dispatchEvent(new Event('stop-voice-recognition'));
    } else {
      window.dispatchEvent(new Event('start-voice-recognition'));
    }
    
    if (onClick) {
      onClick();
    }
    
    // Reset clicked state after shorter duration for better UX
    setTimeout(() => {
      clickedRef.current = false;
    }, 8000);
  };

  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {/* Enhanced background gradient pulse with smoother animations */}
      {(isSpeaking || isListening) && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{
            duration: 1.2,
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
        onClick={handleClick}
      />
    </motion.div>
  );
};
