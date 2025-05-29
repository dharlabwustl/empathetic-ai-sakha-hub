
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
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-12 w-12',
    lg: 'h-14 w-14'
  };

  const textSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const getAnimationClasses = () => {
    if (isSpeaking) {
      return 'bg-gradient-to-r from-green-500 to-blue-500 shadow-lg shadow-green-500/50';
    }
    if (isListening) {
      return 'animate-ping bg-gradient-to-r from-red-500 to-pink-500 shadow-lg shadow-red-500/50';
    }
    return 'bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-lg hover:shadow-purple-500/50';
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
      {/* Outer pulse ring for listening state */}
      {isListening && (
        <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-red-400 animate-ping opacity-75`} />
      )}
      
      {/* Volume waves for speaking state */}
      {isSpeaking && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full border-2 border-green-400 animate-pulse opacity-60`}
              style={{
                width: `${100 + (i + 1) * 20}%`,
                height: `${100 + (i + 1) * 20}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>
      )}
      
      {/* Main button */}
      <Button
        onClick={handleClick}
        variant="ghost"
        className={`
          relative ${sizeClasses[size]} rounded-full border-2 border-white/20 
          ${getAnimationClasses()}
          text-white transition-all duration-300 hover:scale-105
          flex items-center justify-center font-bold ${textSizes[size]}
        `}
      >
        AI
      </Button>
      
      {/* Status indicator */}
      <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white">
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

// Enhanced floating voice button with smaller size to prevent feedback
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
        {/* Smaller size to prevent microphone feedback */}
        <EnhancedVoiceCircle
          isListening={isListening}
          isSpeaking={isSpeaking}
          onClick={onClick}
          onStopSpeaking={onStopSpeaking}
          size="md"
          className="drop-shadow-2xl"
        />
      </div>
      
      {/* Status text */}
      {(isSpeaking || isListening) && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <div className="bg-black/80 text-white text-xs px-3 py-1 rounded-full">
            {isSpeaking ? 'PREPZR is speaking... (tap to stop)' : 'Listening...'}
          </div>
        </div>
      )}
    </div>
  );
};
