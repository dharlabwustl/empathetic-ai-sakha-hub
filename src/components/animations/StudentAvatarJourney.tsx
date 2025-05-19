
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Brain, Award, BookOpen, MoveRight, Sparkles } from 'lucide-react';

const StudentAvatarJourney = () => {
  const phases = [
    { 
      id: 'beginning', 
      title: 'The Beginning',
      description: 'Starting with challenges and uncertainty',
      icon: <Brain className="h-6 w-6" />,
      color: 'bg-blue-500 text-white'
    },
    { 
      id: 'struggle', 
      title: 'The Struggle',
      description: 'Overcoming obstacles with personalized guidance',
      icon: <BookOpen className="h-6 w-6" />,
      color: 'bg-purple-500 text-white'
    },
    { 
      id: 'breakthrough', 
      title: 'The Breakthrough', 
      description: 'Achieving success with confidence',
      icon: <Award className="h-6 w-6" />,
      color: 'bg-green-500 text-white'
    }
  ];

  return (
    <div className="relative w-full h-full">
      {/* Journey path */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 dark:from-blue-900/40 dark:via-purple-900/40 dark:to-green-900/40 rounded-full" />

      {/* Student avatar that moves along the journey */}
      <motion.div
        initial={{ x: '5%', y: '-50%' }}
        animate={{ x: '90%', y: '-50%' }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse", 
          ease: "easeInOut",
        }}
        className="absolute top-1/2 z-30"
      >
        <div className="relative -mt-16">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-lg">
            <div className="w-14 h-14 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-white">
              <svg viewBox="0 0 36 36" fill="none" role="img" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                <mask id="mask__beam" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
                  <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
                </mask>
                <g mask="url(#mask__beam)">
                  <rect width="36" height="36" fill="#5e6ad2"></rect>
                  <rect x="0" y="0" width="36" height="36" transform="translate(-4 8) rotate(288 18 18) scale(1)" fill="#d17150" rx="6"></rect>
                  <g transform="translate(-4 4) rotate(-8 18 18)">
                    <path d="M13,20 a1,0.75 0 0,0 10,0" fill="#FFFFFF"></path>
                    <rect x="10" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect>
                    <rect x="24" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#FFFFFF"></rect>
                  </g>
                </g>
              </svg>
            </div>
          </div>
          
          {/* Thought bubble with current emotion */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.1, 1],
              opacity: [0, 1]
            }}
            transition={{ 
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 3,
              repeatType: "reverse"
            }}
            className="absolute top-0 -right-16 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md border border-gray-100 dark:border-gray-700 w-24 transform -translate-y-full"
          >
            <div className="text-xs text-center font-medium flex items-center justify-center gap-1">
              <Sparkles className="h-3 w-3 text-yellow-500" />
              <span>Learning!</span>
            </div>
            <div className="absolute bottom-0 left-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white dark:bg-gray-800 border-r border-b border-gray-100 dark:border-gray-700"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* Phase markers */}
      {phases.map((phase, index) => {
        const position = `${10 + (index * 40)}%`;
        return (
          <div 
            key={phase.id}
            className="absolute top-1/2 transform -translate-y-1/2"
            style={{ left: position }}
          >
            {/* Phase point */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0.5 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className={`w-10 h-10 rounded-full ${phase.color} flex items-center justify-center shadow-lg z-20 relative`}
            >
              {phase.icon}
              
              {/* Milestone completion check */}
              {index < 2 && (
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.2, 1], opacity: 1 }}
                  transition={{ delay: 2 + index * 2, duration: 0.5 }}
                  className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5"
                >
                  <CheckCircle2 className="h-3 w-3 text-white" />
                </motion.div>
              )}
              
              {/* Connection line to text */}
              <div className="absolute top-full left-1/2 w-px h-5 bg-gray-300 dark:bg-gray-600 transform -translate-x-1/2"></div>
            </motion.div>
            
            {/* Phase text */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 pt-6 w-40">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <h3 className="font-bold text-sm mb-1">{phase.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{phase.description}</p>
              </motion.div>
            </div>
          </div>
        );
      })}

      {/* Learning activities that float up occasionally */}
      {[20, 50, 80].map((position, i) => (
        <motion.div
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={{ 
            y: -40, 
            opacity: [0, 1, 0]
          }}
          transition={{ 
            duration: 4,
            delay: i * 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
          className="absolute bottom-1/4"
          style={{ left: `${position}%` }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-full px-3 py-1 shadow-md border border-gray-100 dark:border-gray-700 flex items-center gap-1.5">
            <span className="text-xs font-medium">
              {["Mastering concepts", "Practice tests", "Skill building"][i]}
            </span>
            <MoveRight className="h-3 w-3 text-primary" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StudentAvatarJourney;
