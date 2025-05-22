
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Star, Check, Award, Trophy, GraduationCap } from 'lucide-react';

interface HeroSliderProps {
  activeSlide: number;
  setActiveSlide: (index: number) => void;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ activeSlide, setActiveSlide }) => {
  // Track animation progress
  const [animationProgress, setAnimationProgress] = useState(0);
  
  useEffect(() => {
    const duration = 5000; // 5 seconds same as rotation interval
    const intervalTime = 50; // Update every 50ms for smoother progress
    const steps = duration / intervalTime;
    let currentStep = 0;
    
    const progressInterval = setInterval(() => {
      currentStep = (currentStep + 1) % steps;
      setAnimationProgress((currentStep / steps) * 100);
    }, intervalTime);
    
    // Auto-rotate slides
    const autoRotateInterval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % storyboardJourneyPhases.length);
    }, duration);
    
    return () => {
      clearInterval(progressInterval);
      clearInterval(autoRotateInterval);
    };
  }, [activeSlide, setActiveSlide]);

  // Student journey phases - from struggle to success
  const storyboardJourneyPhases = [
    {
      id: "phase1",
      title: "The Struggle Phase",
      description: "Overwhelmed with vast syllabus and ineffective study methods, losing confidence and motivation.",
      studentName: "Ananya",
      examType: "NEET",
      challenges: ["Inconsistent performance", "Lack of proper guidance", "Test anxiety"],
      emotion: "stressed",
      color: "from-red-300 to-red-100 dark:from-red-900/40 dark:to-red-800/30",
      textColor: "text-red-700 dark:text-red-300",
      achievement: "before PREP-zer",
      progress: "20%",
      animationDelay: 0
    },
    {
      id: "phase2",
      title: "The Discovery Phase",
      description: "Found PREP-zer's personalized approach that adapts to individual learning style and pace.",
      studentName: "Raj",
      examType: "JEE",
      challenges: ["Identifying knowledge gaps", "Finding the right resources", "Creating a study plan"],
      emotion: "curious",
      color: "from-amber-300 to-amber-100 dark:from-amber-900/40 dark:to-amber-800/30",
      textColor: "text-amber-700 dark:text-amber-300", 
      achievement: "first week with PREP-zer",
      progress: "40%", 
      animationDelay: 0.2
    },
    {
      id: "phase3",
      title: "The Growth Phase",
      description: "Rapidly improving with AI-powered guidance, personalized feedback, and adaptive learning paths.",
      studentName: "Priya",
      examType: "UPSC",
      challenges: ["Converting theory to application", "Time management", "Comprehensive revision"],
      emotion: "focused", 
      color: "from-blue-300 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/30", 
      textColor: "text-blue-700 dark:text-blue-300",
      achievement: "using PREP-zer for a month",
      progress: "65%",
      animationDelay: 0.4
    },
    {
      id: "phase4",
      title: "The Triumph Phase",
      description: "Achieved remarkable exam success with confidence, mastery of concepts, and strategic preparation.",
      studentName: "Vikram",
      examType: "CAT",
      challenges: ["Turning weaknesses into strengths", "Building exam temperament", "Perfecting time strategy"],
      emotion: "motivated",
      color: "from-green-300 to-green-100 dark:from-green-900/40 dark:to-green-800/30",
      textColor: "text-green-700 dark:text-green-300",
      achievement: "scored in top 1% with PREP-zer",
      progress: "100%",
      animationDelay: 0.6
    }
  ];

  const slideVariants = {
    enter: { x: 300, opacity: 0, scale: 0.8, rotateY: -30 },
    center: { x: 0, opacity: 1, scale: 1, rotateY: 0 },
    exit: { x: -300, opacity: 0, scale: 0.8, rotateY: 30 }
  };

  return (
    <div className="w-full lg:w-1/2 relative">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[450px] md:h-[550px] perspective-1000"
      >
        {/* 3D animated journey phases - automatically rotating */}
        <AnimatePresence mode="wait">
          <motion.div
            key={storyboardJourneyPhases[activeSlide].id}
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              transformStyle: 'preserve-3d',
              transformOrigin: 'center center',
              perspective: '1000px'
            }}
            initial="enter"
            animate="center"
            exit="exit"
            variants={slideVariants}
            transition={{ 
              duration: 0.5,
              type: "spring", 
              stiffness: 100,
              damping: 20
            }}
            className="flex flex-col items-center justify-center"
          >
            <JourneyPhaseCard phase={storyboardJourneyPhases[activeSlide]} />
          </motion.div>
        </AnimatePresence>

        {/* 3D floating particles for depth effect */}
        <Particles />

        {/* Student avatar matching the current phase */}
        <StudentAvatar 
          activeSlide={activeSlide} 
          storyPhases={storyboardJourneyPhases} 
        />

        {/* Celebration confetti for success phase */}
        {activeSlide === 3 && <SuccessConfetti />}

        {/* Slide navigation dots and progress indicator */}
        <div className="absolute bottom-0 left-0 w-full p-4">
          {/* Progress bar */}
          <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-3">
            <div 
              className="h-1 bg-gradient-to-r from-indigo-600 to-purple-500 rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${animationProgress}%` }}
            />
          </div>
          
          {/* Navigation dots */}
          <div className="flex justify-center space-x-2">
            {storyboardJourneyPhases.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeSlide 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-500 scale-110' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-indigo-400'
                }`}
                aria-label={`Go to phase ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface StudentAvatarProps {
  activeSlide: number;
  storyPhases: Array<{
    studentName: string;
    examType: string;
    emotion: string;
    progress: string;
  }>;
}

const StudentAvatar: React.FC<StudentAvatarProps> = ({ activeSlide, storyPhases }) => {
  const currentPhase = storyPhases[activeSlide];
  
  return (
    <motion.div
      className="absolute -bottom-4 -left-4 z-20"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <motion.div
        className="relative"
        animate={{
          y: [0, -10, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full opacity-75 group-hover:opacity-100 blur-sm transition duration-1000 group-hover:duration-200"></div>
          <StudentAvatarImage emotion={currentPhase.emotion} />
        </div>
        <motion.div
          className="absolute -right-2 -top-1 bg-indigo-500 text-white text-xs px-2 py-1 rounded-full font-semibold border-2 border-white dark:border-gray-800"
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          {currentPhase.examType}
        </motion.div>
        
        <motion.div
          className="absolute -right-4 -bottom-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold border-2 border-white dark:border-gray-800 flex items-center gap-1 shadow-lg"
          initial={{ scale: 0, rotate: -15 }}
          animate={{
            scale: 1,
            rotate: 0,
            y: [0, -5, 0]
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        >
          <Star className="w-3 h-3 text-yellow-100 fill-yellow-100" />
          <span>{currentPhase.progress}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

interface StudentAvatarImageProps {
  emotion: string;
}

const StudentAvatarImage: React.FC<StudentAvatarImageProps> = ({ emotion }) => {
  // Create a custom dynamic avatar based on the emotion
  return (
    <div className="w-28 h-28 rounded-full bg-gradient-to-b from-amber-200 to-amber-300 border-4 border-white dark:border-gray-800 shadow-xl overflow-hidden flex items-center justify-center">
      {/* The face container */}
      <div className="relative w-20 h-20 mt-1">
        {/* Eyes based on emotion */}
        <div className="absolute flex w-full justify-between px-2 top-4">
          {emotion === "stressed" && (
            <>
              <div className="w-3 h-4 border-2 border-gray-800 rounded-full flex items-center justify-center">
                <div className="w-1 h-2 bg-gray-800 rounded-full"></div>
              </div>
              <div className="w-3 h-4 border-2 border-gray-800 rounded-full flex items-center justify-center">
                <div className="w-1 h-2 bg-gray-800 rounded-full"></div>
              </div>
            </>
          )}
          
          {emotion === "curious" && (
            <>
              <div className="w-3 h-3 border-2 border-gray-800 rounded-full"></div>
              <div className="w-3 h-3 border-2 border-gray-800 rounded-full"></div>
            </>
          )}
          
          {emotion === "focused" && (
            <>
              <div className="w-3 h-1 bg-gray-800 rounded-full mt-1"></div>
              <div className="w-3 h-1 bg-gray-800 rounded-full mt-1"></div>
            </>
          )}
          
          {emotion === "motivated" && (
            <>
              <div className="w-3 h-3 border-2 border-gray-800 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
              </div>
              <div className="w-3 h-3 border-2 border-gray-800 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
              </div>
            </>
          )}
        </div>
        
        {/* Mouth based on emotion */}
        <div className="absolute bottom-2 w-full flex justify-center">
          {emotion === "stressed" && (
            <div className="w-8 h-2 border-2 border-gray-800 rounded-full transform rotate-180"></div>
          )}
          
          {emotion === "curious" && (
            <div className="w-3 h-3 border-2 border-gray-800 rounded-full"></div>
          )}
          
          {emotion === "focused" && (
            <div className="w-6 h-1 bg-gray-800 rounded-full"></div>
          )}
          
          {emotion === "motivated" && (
            <div className="w-8 h-4 border-2 border-gray-800 rounded-full border-t-0"></div>
          )}
        </div>

        {/* Student accessories based on phase */}
        {emotion === "stressed" && (
          <div className="absolute -top-3 right-0 transform rotate-12">
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">!</span>
            </div>
          </div>
        )}
        
        {emotion === "focused" && (
          <div className="absolute -top-4 left-2 transform -rotate-12">
            <Book className="w-5 h-5 text-blue-600" />
          </div>
        )}
        
        {emotion === "motivated" && (
          <div className="absolute -top-6 right-0 transform rotate-12">
            <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          </div>
        )}
      </div>

      {/* Student hair */}
      <div className="absolute -top-1 w-full h-8 bg-gray-800"></div>
      
      {/* Student body suggestion at the bottom */}
      <div className="absolute -bottom-10 w-20 h-10 bg-indigo-500 rounded-t-full"></div>
    </div>
  );
};

interface JourneyPhaseCardProps {
  phase: {
    title: string;
    description: string;
    studentName: string;
    examType: string;
    challenges: string[];
    emotion: string;
    color: string;
    textColor: string;
    achievement: string;
    progress: string;
    animationDelay: number;
  };
}

const JourneyPhaseCard: React.FC<JourneyPhaseCardProps> = ({ phase }) => {
  return (
    <>
      {/* Achievement Badge */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-400 text-white font-bold py-2 px-6 rounded-full shadow-lg z-20"
      >
        {phase.achievement}
      </motion.div>
      
      {/* Main content with 3D effect */}
      <motion.div
        className="relative w-full h-full flex flex-col items-center justify-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: phase.animationDelay, duration: 0.5 }}
      >
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotateY: [0, 5, 0],
            rotateX: [0, 3, 0]
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative mb-8 cursor-pointer"
        >
          <div className={`absolute inset-0 bg-gradient-to-b ${phase.color} rounded-3xl transform -rotate-3 scale-105 -z-10`} />
          
          {/* 3D floating icon */}
          <motion.div
            animate={{ y: [-5, 5, -5], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
            className="absolute -top-10 -left-6 bg-white dark:bg-gray-800 p-3 rounded-xl shadow-xl"
            style={{ transformStyle: 'preserve-3d', transform: 'translateZ(40px)' }}
          >
            {phase.emotion === "stressed" && <Book size={48} className="text-red-500 drop-shadow-md" />}
            {phase.emotion === "curious" && <Award size={48} className="text-amber-500 drop-shadow-md" />}
            {phase.emotion === "focused" && <Book size={48} className="text-blue-500 drop-shadow-md" />}
            {phase.emotion === "motivated" && <GraduationCap size={48} className="text-green-500 drop-shadow-md" />}
          </motion.div>
          
          <div className="relative p-6 pt-10">
            {/* Journey phase illustration */}
            <div className="w-64 h-64 md:w-72 md:h-72 mx-auto rounded-lg overflow-hidden shadow-lg mb-4">
              <div className="w-full h-full relative bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                {/* Student journey visualization based on phase */}
                {phase.emotion === "stressed" && (
                  <JourneyStressedIllustration />
                )}
                
                {phase.emotion === "curious" && (
                  <JourneyDiscoveryIllustration />
                )}
                
                {phase.emotion === "focused" && (
                  <JourneyGrowthIllustration />
                )}
                
                {phase.emotion === "motivated" && (
                  <JourneySuccessIllustration />
                )}
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + phase.animationDelay, duration: 0.5 }}
          className="text-center max-w-md bg-white/50 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-5 shadow-lg border border-indigo-100 dark:border-indigo-900/30"
          style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}
        >
          <h3 className={`text-2xl font-bold mb-2 ${phase.textColor}`}>{phase.title}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{phase.description}</p>
          
          {/* Challenges faced in this phase */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {phase.challenges.map((challenge, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + phase.animationDelay + (idx * 0.1), duration: 0.3 }}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs px-3 py-1 rounded-full flex items-center gap-1"
              >
                <Check className="w-3 h-3" />
                {challenge}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

// Journey phase illustrations
const JourneyStressedIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-900/10 p-4 flex flex-col items-center justify-center">
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Books falling/scattered representation */}
      <motion.div 
        className="absolute w-16 h-20 bg-red-200 dark:bg-red-800/50 rounded shadow-md transform -rotate-12"
        animate={{ y: [0, 10, 0], rotate: [-12, -15, -12] }}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
      />
      <motion.div 
        className="absolute w-14 h-16 bg-amber-200 dark:bg-amber-800/50 rounded shadow-md transform rotate-30 left-12 top-12"
        animate={{ y: [0, -5, 0], rotate: [30, 25, 30] }}
        transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
      />
      <motion.div 
        className="absolute w-12 h-18 bg-blue-200 dark:bg-blue-800/50 rounded shadow-md transform rotate-45 right-10 bottom-10"
        animate={{ y: [0, 8, 0], rotate: [45, 50, 45] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
      />
      
      {/* Student figure looking stressed */}
      <div className="relative w-20 h-40">
        {/* Clock showing pressure */}
        <motion.div 
          className="absolute -top-12 -right-12 w-12 h-12 rounded-full bg-white dark:bg-gray-700 border-2 border-red-400 dark:border-red-600 flex items-center justify-center"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <div className="w-5 h-5 border-t-2 border-l-2 border-red-500 rounded-full transform -rotate-45 origin-bottom-right" />
        </motion.div>
        
        {/* Student head */}
        <div className="w-12 h-12 bg-amber-200 dark:bg-amber-700 rounded-full absolute top-0 left-4 flex items-center justify-center">
          <div className="flex space-x-3">
            <div className="w-1 h-1 bg-gray-800 rounded-full" />
            <div className="w-1 h-1 bg-gray-800 rounded-full" />
          </div>
          <div className="absolute bottom-2 w-4 h-1 bg-gray-800 rounded-full transform rotate-180" />
        </div>
        
        {/* Student body */}
        <div className="w-16 h-24 bg-red-300 dark:bg-red-700 rounded-t-lg absolute top-10 left-2" />
      </div>
      
      {/* Question marks to represent confusion */}
      <motion.div 
        className="absolute -top-2 left-10 text-2xl font-bold text-red-500 dark:text-red-400"
        animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ?
      </motion.div>
      <motion.div 
        className="absolute top-5 right-10 text-3xl font-bold text-red-500 dark:text-red-400"
        animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
      >
        ?
      </motion.div>
    </div>
  </div>
);

const JourneyDiscoveryIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-900/10 p-4 flex flex-col items-center justify-center">
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Laptop/tablet with PREP-zer */}
      <motion.div 
        className="absolute w-40 h-28 bg-gray-800 dark:bg-gray-900 rounded-md shadow-lg overflow-hidden"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="w-full h-6 bg-gray-700 dark:bg-gray-800 flex items-center">
          <div className="w-2 h-2 rounded-full bg-red-500 ml-2" />
          <div className="w-2 h-2 rounded-full bg-yellow-500 ml-1" />
          <div className="w-2 h-2 rounded-full bg-green-500 ml-1" />
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-xs font-bold text-white">PREP-zer</div>
        </div>
      </motion.div>
      
      {/* Student figure looking interested */}
      <div className="relative w-20 h-40 absolute right-10 bottom-5">
        {/* Student head */}
        <div className="w-12 h-12 bg-amber-200 dark:bg-amber-700 rounded-full absolute top-0 left-4 flex items-center justify-center">
          <div className="flex space-x-3">
            <div className="w-1 h-1 bg-gray-800 rounded-full" />
            <div className="w-1 h-1 bg-gray-800 rounded-full" />
          </div>
          <div className="absolute bottom-2 w-3 h-1 bg-gray-800 rounded-full transform" />
        </div>
        
        {/* Student body */}
        <div className="w-16 h-24 bg-amber-300 dark:bg-amber-700 rounded-t-lg absolute top-10 left-2" />
      </div>
      
      {/* Light bulb moment */}
      <motion.div 
        className="absolute -top-5 right-14 text-2xl text-yellow-500 dark:text-yellow-300"
        animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        💡
      </motion.div>
    </div>
  </div>
);

const JourneyGrowthIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 p-4 flex flex-col items-center justify-center">
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Growth chart */}
      <motion.div
        className="absolute w-40 h-40 bottom-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full h-full relative">
          {/* Chart background */}
          <div className="absolute bottom-0 left-0 w-full h-full border-l-2 border-b-2 border-blue-400 dark:border-blue-600" />
          
          {/* Chart line */}
          <motion.div
            className="absolute bottom-0 left-0 w-full h-full"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <motion.path
                d="M0,100 Q20,90 40,70 T80,20"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3 }}
              />
            </svg>
            
            {/* Dots on chart */}
            <motion.div
              className="absolute bottom-[30%] left-[40%] w-3 h-3 rounded-full bg-blue-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            />
            <motion.div
              className="absolute bottom-[60%] left-[65%] w-3 h-3 rounded-full bg-blue-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, duration: 0.5 }}
            />
            <motion.div
              className="absolute bottom-[80%] left-[80%] w-3 h-3 rounded-full bg-blue-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            />
          </motion.div>
        </div>
      </motion.div>
      
      {/* Student figure looking focused */}
      <div className="relative w-20 h-40 absolute right-5 top-10">
        {/* Student head */}
        <div className="w-12 h-12 bg-amber-200 dark:bg-amber-700 rounded-full absolute top-0 left-4 flex items-center justify-center">
          <div className="flex space-x-3">
            <div className="w-1 h-1 bg-gray-800 rounded-full" />
            <div className="w-1 h-1 bg-gray-800 rounded-full" />
          </div>
          <div className="absolute bottom-2 w-3 h-1 bg-gray-800 rounded-full" />
        </div>
        
        {/* Student body */}
        <div className="w-16 h-24 bg-blue-300 dark:bg-blue-700 rounded-t-lg absolute top-10 left-2" />
        
        {/* Book in hand */}
        <motion.div 
          className="absolute top-20 -left-5 w-7 h-9 bg-indigo-200 dark:bg-indigo-700 border border-indigo-300 dark:border-indigo-600"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </div>
  </div>
);

const JourneySuccessIllustration = () => (
  <div className="w-full h-full bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 p-4 flex flex-col items-center justify-center">
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Trophy/medal */}
      <motion.div 
        className="absolute top-5 w-16 h-16"
        animate={{ y: [0, -5, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-full h-full relative">
          {/* Trophy cup */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-10 h-12 bg-yellow-400 dark:bg-yellow-500 rounded-t-full overflow-hidden">
            <div className="w-8 h-8 bg-yellow-300 dark:bg-yellow-400 rounded-full absolute top-1 left-1" />
          </div>
          {/* Trophy base */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-yellow-600 dark:bg-yellow-700 rounded" />
          {/* Trophy stem */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-yellow-500 dark:bg-yellow-600" />
        </div>
      </motion.div>
      
      {/* Certificate/diploma */}
      <motion.div 
        className="absolute right-10 top-8 w-16 h-12 bg-blue-50 dark:bg-blue-900/50 border-4 border-blue-200 dark:border-blue-700 rounded"
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="w-full h-1 bg-blue-400 dark:bg-blue-500 mt-2" />
        <div className="w-full h-1 bg-blue-400 dark:bg-blue-500 mt-1" />
        <div className="w-1/2 h-1 bg-blue-400 dark:bg-blue-500 mt-1 mx-auto" />
      </motion.div>
      
      {/* Student figure celebrating */}
      <div className="relative w-20 h-40 absolute bottom-5">
        {/* Student head */}
        <div className="w-12 h-12 bg-amber-200 dark:bg-amber-700 rounded-full absolute top-0 left-4 flex items-center justify-center">
          <div className="flex space-x-3">
            <div className="w-1 h-1 bg-gray-800 rounded-full" />
            <div className="w-1 h-1 bg-gray-800 rounded-full" />
          </div>
          <div className="absolute bottom-2 w-4 h-2 bg-gray-800 rounded-t-full" />
          
          {/* Graduation cap */}
          <div className="absolute -top-5 w-14 h-3 bg-gray-800 flex justify-center">
            <div className="w-3 h-3 bg-gray-800 rounded-full relative">
              <div className="absolute w-5 h-[1px] bg-yellow-400 dark:bg-yellow-300 left-1/2 bottom-0 transform -translate-x-1/2" />
            </div>
          </div>
        </div>
        
        {/* Student body */}
        <div className="w-16 h-24 bg-green-300 dark:bg-green-700 rounded-t-lg absolute top-10 left-2" />
        
        {/* Raised arm in celebration */}
        <motion.div 
          className="absolute top-12 -right-5 w-3 h-12 bg-amber-200 dark:bg-amber-700 rounded-full"
          animate={{ rotate: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      
      {/* Confetti particles */}
      <motion.div 
        className="absolute w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              ['bg-yellow-400', 'bg-pink-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-400'][i % 5]
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, 10 + Math.random() * 30],
              opacity: [1, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: 1 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </motion.div>
    </div>
  </div>
);

// Floating particles for 3D effect
const Particles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-3 h-3 rounded-full ${
            i % 4 === 0 
              ? "bg-gradient-to-r from-indigo-400/20 to-purple-400/20" 
              : i % 4 === 1 
                ? "bg-gradient-to-r from-blue-400/20 to-teal-400/20"
                : i % 4 === 2
                  ? "bg-gradient-to-r from-amber-400/20 to-orange-400/20"
                  : "bg-gradient-to-r from-green-400/20 to-emerald-400/20"
          }`}
          initial={{
            x: Math.random() * 100 + "%",
            y: Math.random() * 100 + "%",
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{
            x: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%"
            ],
            y: [
              Math.random() * 100 + "%",
              Math.random() * 100 + "%",
              Math.random() * 100 + "%"
            ],
            opacity: [0.2, 0.8, 0.2]
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            filter: "blur(1px)"
          }}
        />
      ))}
    </div>
  );
};

// Success confetti for celebration effect
const SuccessConfetti = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(30)].map((_, i) => {
        const size = Math.random() * 8 + 5;
        const color = [
          "bg-indigo-500", "bg-purple-500", "bg-pink-500", 
          "bg-amber-500", "bg-green-500", "bg-blue-500"
        ][Math.floor(Math.random() * 6)];
        
        return (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 ${color} rounded-sm`}
            style={{ width: size, height: size }}
            initial={{ 
              top: "-5%",
              left: 30 + Math.random() * 40 + "%", 
              opacity: 1,
              rotate: Math.random() * 360
            }}
            animate={{ 
              top: "110%", 
              left: `calc(${30 + Math.random() * 40}% + ${Math.random() * 100 - 50}px)`,
              opacity: [1, 1, 0],
              rotate: Math.random() * 720
            }}
            transition={{ 
              duration: 4 + Math.random() * 4, 
              repeat: Infinity,
              delay: Math.random() * 10
            }}
          />
        );
      })}
    </div>
  );
};

export default HeroSlider;
