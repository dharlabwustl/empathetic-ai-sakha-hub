
import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Volume2 } from 'lucide-react';

interface EnhancedVoiceCircleProps {
  isSpeaking?: boolean;
  isListening?: boolean;
  onClick?: () => void;
  className?: string;
}

export const EnhancedVoiceCircle: React.FC<EnhancedVoiceCircleProps> = ({
  isSpeaking = false,
  isListening = false,
  onClick,
  className = ""
}) => {
  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer pulsing ring when speaking */}
      {isSpeaking && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-30"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Middle ring when listening */}
      {isListening && (
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 opacity-40"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
      
      {/* Main voice circle */}
      <motion.div
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-2 ${
          isSpeaking 
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-300' 
            : isListening
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-300'
            : 'bg-gradient-to-r from-indigo-500 to-purple-500 border-indigo-300'
        }`}
        animate={{
          boxShadow: isSpeaking || isListening
            ? [
                "0 0 20px rgba(99, 102, 241, 0.5)",
                "0 0 40px rgba(99, 102, 241, 0.8)",
                "0 0 20px rgba(99, 102, 241, 0.5)"
              ]
            : "0 4px 20px rgba(0, 0, 0, 0.1)"
        }}
        transition={{
          duration: 1.5,
          repeat: isSpeaking || isListening ? Infinity : 0
        }}
      >
        {/* Icon with animation */}
        <motion.div
          animate={{
            scale: isSpeaking || isListening ? [1, 1.2, 1] : 1,
            rotate: isSpeaking ? [0, 360] : 0
          }}
          transition={{
            scale: { duration: 1, repeat: isSpeaking || isListening ? Infinity : 0 },
            rotate: { duration: 2, repeat: isSpeaking ? Infinity : 0, ease: "linear" }
          }}
        >
          {isSpeaking ? (
            <Volume2 className="h-7 w-7 text-white" />
          ) : (
            <Mic className="h-7 w-7 text-white" />
          )}
        </motion.div>
      </motion.div>
      
      {/* Floating particles when active */}
      {(isSpeaking || isListening) && (
        <>
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 bg-white rounded-full opacity-60"
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                x: [0, Math.cos(index * 60 * Math.PI / 180) * 30],
                y: [0, Math.sin(index * 60 * Math.PI / 180) * 30],
                opacity: [0.6, 0, 0.6],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </>
      )}
    </motion.div>
  );
};

export const FloatingVoiceButton: React.FC<EnhancedVoiceCircleProps> = (props) => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <EnhancedVoiceCircle {...props} />
    </div>
  );
};
