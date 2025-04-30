
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Calendar, 
  GraduationCap, 
  Heart 
} from 'lucide-react';

export const QuickAccess = () => {
  const quickAccessItems = [
    {
      title: '24/7 AI Tutor',
      icon: <Brain className="h-6 w-6 text-blue-600" />,
      description: 'Get instant help with any topic',
      path: '/dashboard/student/tutor'
    },
    {
      title: 'Study Plan',
      icon: <Calendar className="h-6 w-6 text-purple-600" />,
      description: 'View your personalized study schedule',
      path: '/dashboard/student/today'
    },
    {
      title: 'Academic Advisor',
      icon: <GraduationCap className="h-6 w-6 text-green-600" />,
      description: 'Get guidance for your academic journey',
      path: '/dashboard/student/advisor'
    },
    {
      title: 'Feel Good Corner',
      icon: <Heart className="h-6 w-6 text-red-600" />,
      description: 'Relaxation and stress management tools',
      path: '/dashboard/student/feel-good-corner'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <div className="p-4 border-b dark:border-gray-700">
        <h2 className="font-semibold text-lg">Quick Access</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-2">
        {quickAccessItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
          >
            <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 mb-2">
              {item.icon}
            </div>
            <span className="text-sm font-medium text-center">{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;
