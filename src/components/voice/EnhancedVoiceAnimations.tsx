
import React from 'react';
import { motion } from 'framer-motion';

interface EnhancedVoiceAnimationsProps {
  isSpeaking: boolean;
  isListening?: boolean;
  size?: number;
  className?: string;
}

export const VoiceAssistantAvatar: React.FC<EnhancedVoiceAnimationsProps> = ({
  isSpeaking,
  isListening = false,
  size = 56,
  className = ""
}) => {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
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
      
      {/* Avatar image with subtle bounce */}
      <motion.div
        className="relative z-10 w-full h-full rounded-full overflow-hidden border-2 border-white shadow-lg"
        animate={isSpeaking ? {
          y: [0, -2, 0, -1, 0],
          scale: [1, 1.02, 1, 1.01, 1]
        } : {}}
        transition={{
          duration: 0.8,
          repeat: isSpeaking ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        <img 
          src="/lovable-uploads/ffd1ed0a-7a25-477e-bc91-1da9aca3497f.png" 
          alt="PREPZR AI" 
          className="w-full h-full object-cover"
        />
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

export const FloatingVoiceButton: React.FC<EnhancedVoiceAnimationsProps> = ({
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
      
      <VoiceAssistantAvatar 
        isSpeaking={isSpeaking}
        isListening={isListening}
        size={56}
        className="relative z-10"
      />
    </motion.div>
  );
};
