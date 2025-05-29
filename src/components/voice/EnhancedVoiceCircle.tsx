
import React from 'react';
import { Button } from '@/components/ui/button';

interface EnhancedVoiceCircleProps {
  isListening?: boolean;
  isSpeaking?: boolean;
  isMuted?: boolean;
  onClick?: () => void;
  onStopSpeaking?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const EnhancedVoiceCircle: React.FC<EnhancedVoiceCircleProps> = ({
  isListening = false,
  isSpeaking = false,
  isMuted = false,
  onClick,
  onStopSpeaking,
  className = '',
  size = 'sm'
}) => {
  const sizeClasses = {
    sm: 'h-12 w-12',
    md: 'h-14 w-14',
    lg: 'h-16 w-16'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-sm'
  };

  const getAnimationClasses = () => {
    if (isSpeaking) {
      return 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg animate-pulse';
    }
    if (isListening) {
      return 'bg-gradient-to-r from-red-500 to-pink-500 shadow-lg animate-pulse';
    }
    return 'bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg hover:shadow-purple-500/30';
  };

  const handleClick = () => {
    if (isSpeaking && onStopSpeaking) {
      onStopSpeaking();
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Enhanced pulse ring for listening state */}
      {isListening && (
        <>
          <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-red-400 animate-ping opacity-40`} />
          <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-red-300 animate-ping opacity-20`} style={{ animationDelay: '0.5s' }} />
        </>
      )}
      
      {/* Enhanced speaking animation */}
      {isSpeaking && (
        <>
          <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-green-400 animate-ping opacity-30`} />
          <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-blue-300 animate-ping opacity-20`} style={{ animationDelay: '0.3s' }} />
        </>
      )}
      
      {/* Main AI button with enhanced styling */}
      <Button
        onClick={handleClick}
        variant="ghost"
        className={`
          relative ${sizeClasses[size]} rounded-full border border-white/20 
          ${getAnimationClasses()}
          text-white transition-all duration-300 hover:scale-110
          flex items-center justify-center font-bold ${textSizes[size]}
          shadow-lg backdrop-blur-sm
        `}
      >
        AI
      </Button>
      
      {/* Enhanced status indicator */}
      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white shadow-sm">
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

// Enhanced floating voice button with context awareness
interface FloatingVoiceButtonProps {
  isSpeaking?: boolean;
  isListening?: boolean;
  className?: string;
  onClick?: () => void;
  onStopSpeaking?: () => void;
}

export const FloatingVoiceButton: React.FC<FloatingVoiceButtonProps> = ({
  isSpeaking = false,
  isListening = false,
  className = '',
  onClick,
  onStopSpeaking
}) => {
  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <div className="relative">
        <EnhancedVoiceCircle
          isListening={isListening}
          isSpeaking={isSpeaking}
          onClick={onClick}
          onStopSpeaking={onStopSpeaking}
          size="sm"
          className="drop-shadow-xl"
        />
      </div>
      
      {/* Enhanced status text with better styling */}
      {(isSpeaking || isListening) && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-10">
          <div className="bg-black/90 text-white text-xs px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm border border-white/10">
            {isSpeaking ? '🗣️ Prep-Zer speaking... (tap to stop)' : '👂 Listening...'}
          </div>
        </div>
      )}
    </div>
  );
};
