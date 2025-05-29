
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
      return 'bg-gradient-to-r from-green-500 to-blue-500 shadow-md';
    }
    if (isListening) {
      return 'bg-gradient-to-r from-red-500 to-pink-500 shadow-md';
    }
    return 'bg-gradient-to-r from-purple-500 to-blue-500 hover:shadow-md hover:shadow-purple-500/30';
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
      {/* Main button - no pulse ring or vibration to prevent echo */}
      <Button
        onClick={handleClick}
        variant="ghost"
        className={`
          relative ${sizeClasses[size]} rounded-full border border-white/20 
          ${getAnimationClasses()}
          text-white transition-all duration-200 hover:scale-105
          flex items-center justify-center font-bold ${textSizes[size]}
        `}
      >
        AI
      </Button>
      
      {/* Simple status indicator */}
      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border border-white">
        {isSpeaking && (
          <div className="h-full w-full rounded-full bg-green-500" />
        )}
        {isListening && !isSpeaking && (
          <div className="h-full w-full rounded-full bg-red-500" />
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

// Simplified floating voice button without text overlays or vibrations
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
          className="drop-shadow-lg"
        />
      </div>
    </div>
  );
};
