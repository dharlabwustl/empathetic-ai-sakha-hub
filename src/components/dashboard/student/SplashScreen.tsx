
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MoodType } from '@/types/user/base';

interface SplashScreenProps {
  onComplete: () => void;
  mood?: MoodType;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, mood }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const slides = [
    {
      title: "Welcome to PrepZR",
      subtitle: "Your AI-powered study companion",
      description: "Get ready to transform your learning experience",
      color: "from-blue-600 to-purple-600"
    },
    {
      title: "Smart Study Plans", 
      subtitle: "Personalized for your success",
      description: "AI creates custom study schedules based on your goals",
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Ready to Begin?",
      subtitle: "Let's start your journey",
      description: "Your personalized dashboard awaits",
      color: "from-purple-600 to-pink-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev < slides.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500);
          }, 2000);
          return prev;
        }
      });
    }, 3000);

    return () => clearInterval(timer);
  }, [onComplete]);

  const getMoodBasedMessage = () => {
    if (!mood) return "Ready to learn?";
    
    switch (mood) {
      case MoodType.Motivated:
        return "Your motivation will drive success!";
      case MoodType.Happy:
        return "Your positive energy is contagious!";
      case MoodType.Focused:
        return "Your focus will unlock potential!";
      case MoodType.Okay:
        return "Every step forward counts!";
      case MoodType.Stressed:
        return "We'll help you manage the stress!";
      case MoodType.Tired:
        return "Rest when needed, progress when ready!";
      default:
        return "Ready to learn?";
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <div className="text-center space-y-8 px-8 max-w-2xl">
        <div className={`bg-gradient-to-r ${slides[currentSlide].color} bg-clip-text text-transparent`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-pulse">
            {slides[currentSlide].title}
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-300 mb-2">
            {slides[currentSlide].subtitle}
          </h2>
          <p className="text-gray-400 mb-6">
            {slides[currentSlide].description}
          </p>
        </div>
        
        {mood && (
          <div className="text-lg text-blue-400 font-medium">
            {getMoodBasedMessage()}
          </div>
        )}
        
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
        
        {currentSlide === slides.length - 1 && (
          <Button
            onClick={onComplete}
            className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Enter Dashboard
          </Button>
        )}
      </div>
    </div>
  );
};

export default SplashScreen;
