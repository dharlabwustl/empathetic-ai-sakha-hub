
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight,
  GraduationCap, 
  Book, 
  BookOpen, 
  Star, 
  Award, 
  Brain,
  Layers
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentJourneySection: React.FC = () => {
  const navigate = useNavigate();
  
  // Journey stages
  const stages = [
    {
      title: "Sign Up",
      description: "Create your personalized account",
      icon: <BookOpen className="h-6 w-6 text-white" />,
      color: "from-blue-500 to-blue-600",
      position: { x: '10%', y: '50%' }
    },
    {
      title: "Learning Profile",
      description: "AI analyzes your learning style",
      icon: <Brain className="h-6 w-6 text-white" />,
      color: "from-purple-500 to-purple-600",
      position: { x: '30%', y: '20%' }
    },
    {
      title: "Daily Plans",
      description: "Personalized study schedule",
      icon: <Book className="h-6 w-6 text-white" />,
      color: "from-green-500 to-green-600",
      position: { x: '50%', y: '60%' }
    },
    {
      title: "Practice Exams",
      description: "Simulated exam environment",
      icon: <Layers className="h-6 w-6 text-white" />,
      color: "from-amber-500 to-amber-600",
      position: { x: '70%', y: '30%' }
    },
    {
      title: "Success",
      description: "Achieve your exam goals",
      icon: <GraduationCap className="h-6 w-6 text-white" />,
      color: "from-indigo-500 to-indigo-600",
      position: { x: '90%', y: '50%' }
    }
  ];

  const [activeStage, setActiveStage] = useState(2); // Default to middle stage
  
  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      <div className="container mx-auto px-4">
        {/* Section heading with new title */}
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            We Understand Your Mindset, Not Just The Exam
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Follow the journey of students who transform their exam preparation with our personalized approach
          </motion.p>
        </div>
        
        {/* Interactive Student Journey Visualization */}
        <div className="relative h-[400px] mb-12">
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>
            
            {stages.map((_, index) => {
              if (index < stages.length - 1) {
                return (
                  <motion.path
                    key={index}
                    d={`M ${parseInt(stages[index].position.x)} ${parseInt(stages[index].position.y)} 
                      C ${parseInt(stages[index].position.x) + 100} ${parseInt(stages[index].position.y)}, 
                      ${parseInt(stages[index+1].position.x) - 100} ${parseInt(stages[index+1].position.y)}, 
                      ${parseInt(stages[index+1].position.x)} ${parseInt(stages[index+1].position.y)}`}
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="5,5"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2 * index }}
                  />
                );
              }
              return null;
            })}
          </svg>
          
          {/* Avatar along the path */}
          <motion.div 
            className="absolute z-10"
            animate={{ 
              x: `calc(${stages[activeStage].position.x} - 30px)`, 
              y: `calc(${stages[activeStage].position.y} - 30px)`,
              transition: { duration: 1, type: "spring" }
            }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Avatar className="h-16 w-16 border-4 border-white shadow-xl">
                <AvatarImage src="/lovable-uploads/caff3d84-1157-41ac-961f-be3b0b5bb9b8.png" />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-xl text-white">S</AvatarFallback>
              </Avatar>
            </motion.div>
          </motion.div>
          
          {/* Journey Stages */}
          {stages.map((stage, index) => (
            <motion.div
              key={index}
              className="absolute cursor-pointer z-20"
              style={{ 
                left: stage.position.x, 
                top: stage.position.y, 
                transform: 'translate(-50%, -50%)' 
              }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveStage(index)}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <div className={`w-full max-w-[220px] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 ${activeStage === index ? 'ring-2 ring-blue-500' : ''}`}>
                <div className={`h-12 w-12 rounded-full bg-gradient-to-r ${stage.color} flex items-center justify-center mb-3 mx-auto shadow-md`}>
                  {stage.icon}
                </div>
                <h3 className="font-bold text-center mb-1">{stage.title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">{stage.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Current Stage Description */}
        <motion.div 
          className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          key={activeStage}
        >
          <div className={`h-14 w-14 rounded-full bg-gradient-to-r ${stages[activeStage].color} flex items-center justify-center mb-4 mx-auto shadow-md`}>
            {stages[activeStage].icon}
          </div>
          <h3 className="text-xl font-bold mb-2">{stages[activeStage].title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{stages[activeStage].description}</p>
          <Button 
            onClick={handleGetStarted} 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
          >
            Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
      
      {/* Background Elements - Floating Education Icons */}
      <motion.div 
        className="absolute top-20 left-10 text-blue-200 dark:text-blue-900/30 opacity-50"
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      >
        <BookOpen className="h-16 w-16" />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 right-10 text-purple-200 dark:text-purple-900/30 opacity-50"
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
      >
        <Brain className="h-20 w-20" />
      </motion.div>
      
      <motion.div 
        className="absolute top-1/2 right-1/4 text-green-200 dark:text-green-900/30 opacity-40"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
      >
        <Star className="h-12 w-12" />
      </motion.div>
    </section>
  );
};

export default StudentJourneySection;
