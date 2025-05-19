
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, ZapIcon, Brain, Star, Trophy } from 'lucide-react';
import Student3DModel from './Student3DModel';
import StudentAnimatedAvatar from './StudentAnimatedAvatar';

const ImmersiveStudentExperience = () => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate('/signup');
  };

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-purple-50/10 dark:to-purple-950/5 -z-10" />
      
      {/* Animated floating shapes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-purple-300/10 to-blue-300/10 dark:from-purple-500/5 dark:to-blue-500/5 blur-xl"
          style={{
            width: Math.random() * 300 + 100,
            height: Math.random() * 300 + 100,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: -1
          }}
          animate={{
            x: [0, Math.random() * 70 - 35],
            y: [0, Math.random() * 70 - 35],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 12 + Math.random() * 8,
            ease: "easeInOut",
            repeatType: "reverse",
          }}
        />
      ))}
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-blue-600"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Immersive Learning Experience
          </motion.h2>
          
          <motion.p 
            className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ y: -10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Transform your study journey with PREPZR's engaging 3D experience designed for modern learners
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Interactive 3D Student Model */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="w-full aspect-square max-w-md mx-auto relative">
              <Student3DModel size="xl" mood="focused" className="absolute inset-0" />
              
              {/* Floating badges around the model */}
              <motion.div 
                className="absolute top-1/4 -left-4 bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800/50"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [-2, 2, -2],
                  boxShadow: [
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  ]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Concept Mastery</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-1/3 -right-4 bg-amber-100 dark:bg-amber-900/30 p-3 rounded-xl shadow-lg border border-amber-200 dark:border-amber-800/50"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [2, -2, 2],
                  boxShadow: [
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  ]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-300">Exam Success</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute top-1/2 -left-8 bg-violet-100 dark:bg-violet-900/30 p-3 rounded-xl shadow-lg border border-violet-200 dark:border-violet-800/50"
                animate={{ 
                  x: [0, -10, 0],
                  rotate: [-5, 0, -5],
                  boxShadow: [
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
                  ]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  <span className="text-sm font-medium text-violet-700 dark:text-violet-300">Personalized Path</span>
                </div>
              </motion.div>
            </div>
            
            {/* Progress indicators */}
            <div className="mt-8 flex justify-center space-x-4">
              {['beginner', 'intermediate', 'advanced', 'expert'].map((stage, index) => (
                <div key={stage} className="flex flex-col items-center">
                  <StudentAnimatedAvatar 
                    stage={stage as 'beginner' | 'intermediate' | 'advanced' | 'expert'} 
                    size="sm"
                  />
                  <motion.div 
                    className="h-1 w-full bg-gray-200 dark:bg-gray-800 mt-2 rounded-full overflow-hidden"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 + (index * 0.2) }}
                    viewport={{ once: true }}
                  >
                    <div 
                      className={`h-full ${
                        stage === 'beginner' ? 'bg-blue-400' :
                        stage === 'intermediate' ? 'bg-indigo-500' :
                        stage === 'advanced' ? 'bg-violet-500' : 'bg-purple-600'
                      } rounded-full`}
                    ></div>
                  </motion.div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Features list */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              Experience the PREPZR Difference
            </h3>
            
            <div className="space-y-4">
              {[
                {
                  title: "Personalized 3D Learning Path",
                  description: "Visualize your unique journey from beginner to expert with our immersive 3D progression system.",
                  icon: <GraduationCap className="h-5 w-5" />,
                  color: "blue"
                },
                {
                  title: "Interactive Student Experience",
                  description: "Engage with responsive 3D models that adapt to your learning style and current needs.",
                  icon: <Star className="h-5 w-5" />,
                  color: "purple"
                },
                {
                  title: "Real-time Progress Visualization",
                  description: "Watch your animated student avatar evolve as you master concepts and achieve milestones.",
                  icon: <Brain className="h-5 w-5" />,
                  color: "violet"
                },
                {
                  title: "Confidence Building Design",
                  description: "Our immersive interface is engineered to reduce stress and build confidence through visual achievement.",
                  icon: <Trophy className="h-5 w-5" />,
                  color: "amber"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`bg-${feature.color}-100 dark:bg-${feature.color}-900/30 p-3 rounded-lg text-${feature.color}-600 dark:text-${feature.color}-400`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <Button 
                onClick={handleGetStarted} 
                size="lg" 
                className="bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl"
              >
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, 0, -2, 0] 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-2"
                >
                  Start Your 3D Learning Journey
                  <ZapIcon className="h-5 w-5" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ImmersiveStudentExperience;
