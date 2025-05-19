
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import HeroButtons from './hero/HeroButtons';
import ExamNamesBadge from './hero/ExamNamesBadge';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { toast } from 'sonner';

const Interactive3DHero = () => {
  const [currentStage, setCurrentStage] = useState(0);
  const [showJourney, setShowJourney] = useState(false);
  const [showCtaButton, setShowCtaButton] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameIdRef = useRef<number>(0);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const journeyStages = [
    {
      title: "Start Your NEET Preparation Journey",
      subtitle: "Join thousands of successful NEET aspirants",
      description: "Prepare for NEET with our AI-powered platform that adapts to your learning style and mood.",
      background: "Medical",
      voiceCommand: "start journey"
    },
    {
      title: "Personalized Study Plan",
      subtitle: "Tailored specifically for NEET examination",
      description: "Get a customized study plan that focuses on your strengths and improves your weak areas in Physics, Chemistry, and Biology.",
      background: "Books",
      voiceCommand: "study plan"
    },
    {
      title: "Track Your Progress",
      subtitle: "Monitor your NEET preparation journey",
      description: "See your improvement over time with detailed analytics and performance insights for all NEET subjects.",
      background: "Analytics",
      voiceCommand: "progress"
    },
    {
      title: "Practice With Real NEET Questions",
      subtitle: "Build exam confidence",
      description: "Access thousands of previous NEET exam questions and take full-length practice tests under timed conditions.",
      background: "Exam",
      voiceCommand: "practice"
    },
    {
      title: "Achieve Your Medical Dream",
      subtitle: "Your success is our success",
      description: "Join the ranks of PREPZR students who have successfully gained admission to top medical colleges across India.",
      background: "Success",
      voiceCommand: "success"
    }
  ];

  // Initialize 3D scene
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / (window.innerHeight * 0.9),
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight * 0.9);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Create 3D objects based on the current stage
    createBackground(currentStage);
    
    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      // Animate objects in the scene
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.rotation.x += 0.002;
          object.rotation.y += 0.003;
        }
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current || !containerRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / (window.innerHeight * 0.9);
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight * 0.9);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Show the journey after a short delay
    const journeyTimer = setTimeout(() => {
      setShowJourney(true);
    }, 1000);

    // Show the CTA button after a short delay
    const ctaTimer = setTimeout(() => {
      setShowCtaButton(true);
    }, 2000);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      clearTimeout(journeyTimer);
      clearTimeout(ctaTimer);
    };
  }, []);
  
  // Update 3D background when stage changes
  useEffect(() => {
    if (!sceneRef.current) return;
    
    // Clear previous objects
    while (sceneRef.current.children.length > 0) {
      const object = sceneRef.current.children[0];
      if (object instanceof THREE.Light) {
        sceneRef.current.remove(object);
      }
    }
    
    // Add lights back
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneRef.current.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    sceneRef.current.add(directionalLight);
    
    // Create new background
    createBackground(currentStage);
    
    // Announce stage change with voice
    announceStageChange(currentStage);
  }, [currentStage]);

  // Create background based on the current stage
  const createBackground = (stage: number) => {
    if (!sceneRef.current) return;
    
    const backgroundType = journeyStages[stage].background;
    
    switch (backgroundType) {
      case "Medical":
        // Create DNA helix
        createDNAHelix();
        break;
      case "Books":
        // Create floating books
        createFloatingBooks();
        break;
      case "Analytics":
        // Create charts and graphs
        createCharts();
        break;
      case "Exam":
        // Create exam papers and question marks
        createExamPapers();
        break;
      case "Success":
        // Create graduation caps and trophies
        createSuccessSymbols();
        break;
    }
  };
  
  // Create DNA helix for Medical background
  const createDNAHelix = () => {
    if (!sceneRef.current) return;
    
    const dnaGroup = new THREE.Group();
    
    for (let i = 0; i < 20; i++) {
      // Create helix structure
      const sphere1 = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshPhongMaterial({ color: 0x8B5CF6 })
      );
      
      const sphere2 = new THREE.Mesh(
        new THREE.SphereGeometry(0.2, 16, 16),
        new THREE.MeshPhongMaterial({ color: 0xEC4899 })
      );
      
      // Position spheres in helix formation
      const angle = i * 0.6;
      sphere1.position.set(
        Math.cos(angle) * 2,
        i * 0.4 - 4,
        Math.sin(angle) * 2
      );
      
      sphere2.position.set(
        Math.cos(angle + Math.PI) * 2,
        i * 0.4 - 4,
        Math.sin(angle + Math.PI) * 2
      );
      
      dnaGroup.add(sphere1);
      dnaGroup.add(sphere2);
      
      // Add connecting rod
      const rod = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 4, 8),
        new THREE.MeshPhongMaterial({ color: 0xA5F3FC })
      );
      
      rod.position.set(0, i * 0.4 - 4, 0);
      rod.rotation.z = angle;
      dnaGroup.add(rod);
    }
    
    sceneRef.current.add(dnaGroup);
  };
  
  // Create floating books for Books background
  const createFloatingBooks = () => {
    if (!sceneRef.current) return;
    
    for (let i = 0; i < 15; i++) {
      // Create book
      const book = new THREE.Mesh(
        new THREE.BoxGeometry(1.5, 0.2, 1),
        new THREE.MeshPhongMaterial({ 
          color: new THREE.Color().setHSL(Math.random(), 0.7, 0.5)
        })
      );
      
      // Random position
      book.position.set(
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
        Math.random() * 10 - 5
      );
      
      // Random rotation
      book.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      sceneRef.current.add(book);
    }
  };
  
  // Create charts and graphs for Analytics background
  const createCharts = () => {
    if (!sceneRef.current) return;
    
    const chartGroup = new THREE.Group();
    
    // Create bar chart
    for (let i = 0; i < 5; i++) {
      const height = Math.random() * 3 + 1;
      const bar = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, height, 0.5),
        new THREE.MeshPhongMaterial({ color: 0x3B82F6 })
      );
      
      bar.position.set(i * 1.2 - 2.4, height / 2 - 2, -2);
      chartGroup.add(bar);
    }
    
    // Create circular progress
    const circle = new THREE.Mesh(
      new THREE.TorusGeometry(2, 0.3, 16, 32, Math.PI * 1.5),
      new THREE.MeshPhongMaterial({ color: 0x10B981 })
    );
    
    circle.position.set(0, 0, -5);
    circle.rotation.x = Math.PI / 2;
    chartGroup.add(circle);
    
    sceneRef.current.add(chartGroup);
  };
  
  // Create exam papers for Exam background
  const createExamPapers = () => {
    if (!sceneRef.current) return;
    
    for (let i = 0; i < 10; i++) {
      // Create paper
      const paper = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 3),
        new THREE.MeshPhongMaterial({ 
          color: 0xFFFFFF,
          side: THREE.DoubleSide
        })
      );
      
      // Random position and rotation
      paper.position.set(
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
        Math.random() * 10 - 10
      );
      
      paper.rotation.set(
        Math.random() * Math.PI / 4,
        Math.random() * Math.PI / 4,
        Math.random() * Math.PI / 4
      );
      
      sceneRef.current.add(paper);
      
      // Add question mark
      if (i % 2 === 0) {
        const questionGroup = new THREE.Group();
        
        const circle = new THREE.Mesh(
          new THREE.TorusGeometry(0.3, 0.1, 16, 32),
          new THREE.MeshPhongMaterial({ color: 0xF97316 })
        );
        
        const stem = new THREE.Mesh(
          new THREE.CylinderGeometry(0.1, 0.1, 0.7, 8),
          new THREE.MeshPhongMaterial({ color: 0xF97316 })
        );
        
        stem.position.y = -0.5;
        stem.rotation.x = Math.PI / 2;
        
        questionGroup.add(circle);
        questionGroup.add(stem);
        questionGroup.position.set(
          Math.random() * 6 - 3,
          Math.random() * 6 - 3,
          -5
        );
        
        sceneRef.current.add(questionGroup);
      }
    }
  };
  
  // Create success symbols for Success background
  const createSuccessSymbols = () => {
    if (!sceneRef.current) return;
    
    // Create graduation caps
    for (let i = 0; i < 5; i++) {
      const capGroup = new THREE.Group();
      
      // Cap base
      const base = new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.1, 1),
        new THREE.MeshPhongMaterial({ color: 0x0F172A })
      );
      
      // Cap top
      const top = new THREE.Mesh(
        new THREE.ConeGeometry(0.7, 0.5, 4),
        new THREE.MeshPhongMaterial({ color: 0x0F172A })
      );
      
      top.position.y = 0.3;
      top.rotation.y = Math.PI / 4;
      
      // Tassel
      const tassel = new THREE.Mesh(
        new THREE.SphereGeometry(0.1, 8, 8),
        new THREE.MeshPhongMaterial({ color: 0xFCD34D })
      );
      
      tassel.position.set(0.6, 0.1, 0);
      
      capGroup.add(base);
      capGroup.add(top);
      capGroup.add(tassel);
      
      capGroup.position.set(
        Math.random() * 8 - 4,
        Math.random() * 8 - 4,
        Math.random() * 8 - 8
      );
      
      capGroup.rotation.set(
        Math.random() * Math.PI / 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI / 2
      );
      
      sceneRef.current.add(capGroup);
    }
    
    // Create trophies
    for (let i = 0; i < 3; i++) {
      const trophyGroup = new THREE.Group();
      
      // Trophy cup
      const cup = new THREE.Mesh(
        new THREE.CylinderGeometry(0.5, 0.3, 1, 16),
        new THREE.MeshPhongMaterial({ color: 0xFCD34D })
      );
      
      // Trophy base
      const trophyBase = new THREE.Mesh(
        new THREE.BoxGeometry(1, 0.2, 1),
        new THREE.MeshPhongMaterial({ color: 0x7C3AED })
      );
      
      trophyBase.position.y = -0.6;
      
      trophyGroup.add(cup);
      trophyGroup.add(trophyBase);
      
      trophyGroup.position.set(
        Math.random() * 10 - 5,
        Math.random() * 8 - 4,
        Math.random() * 5 - 10
      );
      
      sceneRef.current.add(trophyGroup);
    }
  };

  // Function to announce stage change with voice
  const announceStageChange = (stage: number) => {
    if (isSpeaking) return;
    
    setIsSpeaking(true);
    
    const message = journeyStages[stage].title;
    
    // Create a custom event that will be handled by voice assistant component
    const voiceEvent = new CustomEvent('voice-announce', {
      detail: { message }
    });
    
    document.dispatchEvent(voiceEvent);
    
    // Reset speaking state after a delay
    setTimeout(() => {
      setIsSpeaking(false);
    }, 5000);
  };

  // Handle next stage
  const handleNextStage = () => {
    if (currentStage < journeyStages.length - 1) {
      setCurrentStage(currentStage + 1);
    } else {
      // Show CTA when reaching the end
      showExamAnalyzer();
    }
  };
  
  // Handle previous stage
  const handlePrevStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    }
  };
  
  // Voice command handler
  useEffect(() => {
    const handleVoiceCommand = (e: any) => {
      const command = e.detail.command?.toLowerCase();
      
      if (command === 'next' || command === 'continue') {
        handleNextStage();
      } else if (command === 'previous' || command === 'back') {
        handlePrevStage();
      } else if (command === 'start journey') {
        setCurrentStage(0);
      } else {
        // Check if command matches any stage's voice command
        const stageIndex = journeyStages.findIndex(
          stage => stage.voiceCommand.toLowerCase() === command
        );
        
        if (stageIndex >= 0) {
          setCurrentStage(stageIndex);
        }
      }
    };
    
    document.addEventListener('voice-command', handleVoiceCommand);
    
    return () => {
      document.removeEventListener('voice-command', handleVoiceCommand);
    };
  }, [currentStage]);
  
  // Show exam analyzer
  const showExamAnalyzer = () => {
    // Dispatch event to open exam analyzer
    const event = new Event('open-exam-analyzer');
    window.dispatchEvent(event);
    
    toast.success("Let's check your exam readiness!");
  };

  // Handle NEET exam button click
  const handleNeetExamClick = () => {
    // Set user data for NEET exam
    const userData = {
      examGoal: "NEET",
      isNewUser: true,
      completedOnboarding: false
    };
    
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("new_user_signup", "true");
    
    // Navigate to signup page with NEET exam parameter
    navigate("/signup?exam=NEET");
  };

  return (
    <div className="relative overflow-hidden" style={{ height: '90vh' }}>
      {/* 3D Background container */}
      <div ref={containerRef} className="absolute inset-0 z-0">
        {/* 3D scene will render here */}
      </div>
      
      {/* Overlay with gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-center px-4 text-center">
        {/* First launch badge for NEET */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div 
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg"
            onClick={handleNeetExamClick}
            style={{ cursor: 'pointer' }}
          >
            <span className="mr-1.5 bg-white text-green-600 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              🎯
            </span>
            <span className="font-semibold mr-1">FIRST LAUNCH:</span> 
            <span className="font-bold">NEET Exam Preparation</span>
            <span className="ml-2 text-xs bg-white/20 px-2 py-0.5 rounded-full">Click to start</span>
          </div>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {showJourney && (
            <motion.div
              key={`stage-${currentStage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mb-8"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 gradient-text leading-tight">
                {journeyStages[currentStage].title}
              </h1>
              
              <h2 className="text-xl md:text-2xl text-primary/80 mb-4">
                {journeyStages[currentStage].subtitle}
              </h2>
              
              <motion.div
                className="glass-card p-6 md:p-8 rounded-xl mb-8 max-w-3xl mx-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <p className="text-lg md:text-xl">
                  {journeyStages[currentStage].description}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Journey navigation */}
        {showJourney && (
          <div className="flex justify-center items-center gap-4 mb-8">
            <motion.button
              className={`p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 ${
                currentStage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'
              }`}
              whileHover={currentStage > 0 ? { scale: 1.1 } : {}}
              whileTap={currentStage > 0 ? { scale: 0.95 } : {}}
              onClick={handlePrevStage}
              disabled={currentStage === 0}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            {/* Stage indicators */}
            <div className="flex gap-2">
              {journeyStages.map((_, index) => (
                <motion.div
                  key={`indicator-${index}`}
                  className={`h-3 w-3 rounded-full ${
                    index === currentStage ? 'bg-primary' : 'bg-white/30'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => setCurrentStage(index)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
            
            <motion.button
              className={`p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 ${
                currentStage === journeyStages.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'
              }`}
              whileHover={currentStage < journeyStages.length - 1 ? { scale: 1.1 } : {}}
              whileTap={currentStage < journeyStages.length - 1 ? { scale: 0.95 } : {}}
              onClick={handleNextStage}
              disabled={currentStage === journeyStages.length - 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        )}
        
        {/* Voice command hint */}
        <motion.div
          className="text-sm text-white/70 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          Try voice commands: "Next", "Previous", or "{journeyStages[currentStage].voiceCommand}"
        </motion.div>
        
        {/* CTA Buttons */}
        <AnimatePresence>
          {showCtaButton && (
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                transition: { 
                  type: "spring",
                  stiffness: 300,
                  delay: 0.3
                }
              }}
            >
              <HeroButtons onAnalyzeClick={showExamAnalyzer} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Exam names */}
        <ExamNamesBadge />
        
        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ 
            y: [0, 10, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2, 
            ease: "easeInOut" 
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="text-white/70"
          >
            <path d="M12 19V5"></path>
            <path d="m5 12 7 7 7-7"></path>
          </svg>
        </motion.div>
      </div>
      
      {/* If mobile, show additional hint */}
      {isMobile && (
        <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/60 px-4 z-20">
          Rotate your device for the best experience
        </div>
      )}
    </div>
  );
};

export default Interactive3DHero;
