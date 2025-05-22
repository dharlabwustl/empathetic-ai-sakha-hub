
import React from 'react';
import { Award, Clock, Smile, Brain, Rocket } from 'lucide-react';

export const featurePoints = [
  {
    title: 'Confidence Builder',
    description: 'Boosts your exam confidence with personalized practice',
    icon: <Award className="w-8 h-8" />,
    color: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    delay: 0.1
  },
  {
    title: 'Exam Success',
    description: 'Proven strategies that lead to higher scores',
    icon: <Rocket className="w-8 h-8" />,
    color: 'bg-gradient-to-r from-green-500 to-emerald-600',
    delay: 0.2
  },
  {
    title: 'Time Saver',
    description: 'Study smarter, not harder with optimized learning paths',
    icon: <Clock className="w-8 h-8" />,
    color: 'bg-gradient-to-r from-purple-500 to-pink-600',
    delay: 0.3
  },
  {
    title: 'Stress-Free',
    description: 'Reduces anxiety with adaptive learning techniques',
    icon: <Brain className="w-8 h-8" />,
    color: 'bg-gradient-to-r from-amber-500 to-red-500',
    delay: 0.4
  },
  {
    title: 'Happy Learning',
    description: 'Enjoy the journey with engaging study materials',
    icon: <Smile className="w-8 h-8" />,
    color: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    delay: 0.5
  }
];
