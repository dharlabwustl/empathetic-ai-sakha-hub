
import React from 'react';
import { Mic, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EnhancedVoiceCircleProps {
  isListening?: boolean;
  isSpeaking?: boolean;
  isMuted?: boolean;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const EnhancedVoiceCircle: React.FC<EnhancedVoiceCircleProps> = ({
  isListening = false,
  isSpeaking = false,
  isMuted = false,
  onClick,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-20 w-20'
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };

  const getIcon = () => {
    if (isMuted) return <VolumeX size={iconSizes[size]} />;
    if (isSpeaking) return <Volume2 size={iconSizes[size]} />;
    return <Mic size={iconSizes[size]} />;
  };

  const getAnimationClasses = () => {
    if (isSpeaking) {
      return 'animate-pulse bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-green-500/50';
    }
    if (isListening) {
      return 'animate-ping bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/50';
    }
    return 'bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg hover:shadow-purple-500/50';
  };

  return (
    <div className={`relative ${className}`}>
      {/* Outer pulse ring for listening state */}
      {isListening && (
        <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-red-400 animate-ping opacity-75`} />
      )}
      
      {/* Outer glow ring for speaking state */}
      {isSpeaking && (
        <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-green-400 animate-pulse opacity-60 blur-sm`} />
      )}
      
      {/* Main button */}
      <Button
        onClick={onClick}
        variant="ghost"
        className={`
          relative ${sizeClasses[size]} rounded-full border-2 border-white/20 
          ${getAnimationClasses()}
          text-white transition-all duration-300 hover:scale-105
          flex items-center justify-center
        `}
      >
        {getIcon()}
      </Button>
      
      {/* Status indicator */}
      <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white">
        {isSpeaking && (
          <div className="h-full w-full rounded-full bg-green-500 animate-pulse" />
        )}
        {isListening && !isSpeaking && (
          <div className="h-full w-full rounded-full bg-red-500 animate-pulse" />
        )}
        {!isListening && !isSpeaking && !isMuted && (
          <div className="h-full w-full rounded-full bg-purple-500" />
        )}
        {isMuted && (
          <div className="h-full w-full rounded-full bg-gray-500" />
        )}
      </div>
    </div>
  );
};

// Enhanced floating voice button with more animations
interface FloatingVoiceButtonProps {
  isSpeaking?: boolean;
  isListening?: boolean;
  className?: string;
  onClick?: () => void;
}

export const FloatingVoiceButton: React.FC<FloatingVoiceButtonProps> = ({
  isSpeaking = false,
  isListening = false,
  className = '',
  onClick
}) => {
  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <div className="relative">
        {/* Floating animation wrapper */}
        <div className="animate-bounce">
          <EnhancedVoiceCircle
            isListening={isListening}
            isSpeaking={isSpeaking}
            onClick={onClick}
            size="lg"
            className="drop-shadow-2xl"
          />
        </div>
        
        {/* Floating particles effect when speaking */}
        {isSpeaking && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute h-2 w-2 bg-green-400 rounded-full animate-ping opacity-70`}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1.5s'
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Status text */}
      {(isSpeaking || isListening) && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <div className="bg-black/80 text-white text-xs px-3 py-1 rounded-full">
            {isSpeaking ? 'PREPZR is speaking...' : 'Listening...'}
          </div>
        </div>
      )}
    </div>
  );
};
