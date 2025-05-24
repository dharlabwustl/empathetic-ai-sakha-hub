import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Volume2, Brain, Sparkles } from "lucide-react";
import { MoodType } from "@/types/user/base";
import * as THREE from "three";

interface SplashScreenProps {
  onComplete: () => void;
  mood?: MoodType;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, mood }) => {
  const [currentMood, setCurrentMood] = useState<MoodType | undefined>(mood);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [welcomeSpoken, setWelcomeSpoken] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showStudentAvatar, setShowStudentAvatar] = useState(false);
  
  // Create refs for animated elements
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<THREE.Points | null>(null);
  
  const moodAnimations = {
    [MoodType.Motivated]: {
      particles: { color: '#ff6b35', intensity: 'high' },
      text: 'Ready to conquer your goals! 🔥',
      gradient: 'from-orange-400 to-red-500'
    },
    [MoodType.Happy]: {
      particles: { color: '#ffd23f', intensity: 'medium' },
      text: 'Spreading sunshine and positivity! ☀️',
      gradient: 'from-yellow-400 to-orange-400'
    },
    [MoodType.Focused]: {
      particles: { color: '#4ecdc4', intensity: 'low' },
      text: 'Laser-focused and ready to learn! 🎯',
      gradient: 'from-teal-400 to-blue-500'
    },
    [MoodType.Okay]: {
      particles: { color: '#95a5a6', intensity: 'medium' },
      text: 'Taking it one step at a time! 👍',
      gradient: 'from-gray-400 to-gray-600'
    }
  };

  useEffect(() => {
    // Faster animation sequence for better UX
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 1200);
    
    const buttonTimer = setTimeout(() => {
      setShowButton(true);
    }, 1800);
    
    // Show student avatar with slight delay
    const avatarTimer = setTimeout(() => {
      setShowStudentAvatar(true);
    }, 700);
    
    // Setup ambient 3D animation
    setupThreeJSAnimation();
    
    return () => {
      clearTimeout(timer);
      clearTimeout(buttonTimer);
      clearTimeout(avatarTimer);
      
      // Clean up Three.js resources
      if (rendererRef.current && threeContainerRef.current) {
        threeContainerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Cancel any ongoing speech when component unmounts
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  useEffect(() => {
    // Play welcome message when animations are complete
    if (animationComplete && !welcomeSpoken) {
      speakWelcomeMessage();
      setWelcomeSpoken(true);
    }
  }, [animationComplete, welcomeSpoken]);
  
  // Setup Three.js animation for immersive 3D background
  const setupThreeJSAnimation = () => {
    if (!threeContainerRef.current) return;
    
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 30;
    cameraRef.current = camera;
    
    // Setup renderer with transparent background
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    threeContainerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Add ambient and directional light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create mood-specific particle effects
    createMoodParticles();
    
    // Add background floating shapes
    addBackgroundShapes();
    
    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.001;
      }
      
      // Rotate and animate all children in the scene
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.rotation.x += 0.002;
          object.rotation.y += 0.003;
          
          // Subtle floating motion
          object.position.y += Math.sin(Date.now() * 0.001 + object.position.x) * 0.01;
        }
      });
      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };
  
  const createMoodParticles = () => {
    if (!sceneRef.current) return;
    
    // Get mood-specific colors
    const moodTheme = getMoodSpecificContent();
    
    // Create particles
    const particleCount = 2000;
    const particles = new THREE.BufferGeometry();
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Create color object from mood theme
    const color1 = new THREE.Color(moodTheme.particleColor1 || '#6366f1');
    const color2 = new THREE.Color(moodTheme.particleColor2 || '#818cf8');
    
    // Distribute particles in a spherical pattern
    for (let i = 0; i < particleCount; i++) {
      // Position
      const radius = 15 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Color - interpolate between two mood colors
      const mixRatio = Math.random();
      colors[i * 3] = color1.r * mixRatio + color2.r * (1 - mixRatio);
      colors[i * 3 + 1] = color1.g * mixRatio + color2.g * (1 - mixRatio);
      colors[i * 3 + 2] = color1.b * mixRatio + color2.b * (1 - mixRatio);
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Create point material
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    
    // Create points system
    const pointsSystem = new THREE.Points(particles, particleMaterial);
    sceneRef.current.add(pointsSystem);
    
    particlesRef.current = pointsSystem;
  };
  
  const addBackgroundShapes = () => {
    if (!sceneRef.current) return;
    
    // Get mood specific content
    const moodTheme = getMoodSpecificContent();
    
    // Add geometric shapes based on mood
    const geometries = [
      new THREE.IcosahedronGeometry(2, 0),  // Brain-like shape
      new THREE.TorusGeometry(3, 1, 16, 100),  // Ring/orbit
      new THREE.TetrahedronGeometry(1.5, 0),  // Sharp focus shape
    ];
    
    // Create materials with mood theme
    const materials = [
      new THREE.MeshPhongMaterial({ 
        color: moodTheme.shape1Color || "#4f46e5", 
        transparent: true, 
        opacity: 0.7,
        wireframe: Math.random() > 0.5
      }),
      new THREE.MeshPhongMaterial({ 
        color: moodTheme.shape2Color || "#818cf8", 
        transparent: true, 
        opacity: 0.5,
        wireframe: Math.random() > 0.7
      }),
      new THREE.MeshPhongMaterial({ 
        color: moodTheme.shape3Color || "#a5b4fc", 
        transparent: true, 
        opacity: 0.6,
        wireframe: Math.random() > 0.3
      })
    ];
    
    // Place shapes around the scene
    for (let i = 0; i < 12; i++) {
      const geomIndex = i % geometries.length;
      const matIndex = (i + 1) % materials.length;
      
      const mesh = new THREE.Mesh(geometries[geomIndex], materials[matIndex]);
      
      // Position in a orbital pattern
      const radius = 20 + Math.random() * 10;
      const angle = (i / 12) * Math.PI * 2;
      const height = (Math.random() - 0.5) * 20;
      
      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.z = Math.sin(angle) * radius;
      mesh.position.y = height;
      
      // Randomize rotation
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;
      
      // Randomize scale (but keep it proportional)
      const scale = 0.5 + Math.random() * 1.5;
      mesh.scale.set(scale, scale, scale);
      
      sceneRef.current.add(mesh);
    }
  };
  
  const speakWelcomeMessage = () => {
    if ('speechSynthesis' in window) {
      const { message } = getMoodSpecificContent();
      
      // More personalized welcome message with improved engagement
      const welcomeText = `Welcome to Prepzer! ${message} I'm here to adapt to your learning style and emotional state for a truly personalized study experience.`;
      
      const utterance = new SpeechSynthesisUtterance(welcomeText);
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      
      // Try to find an Indian English voice first
      let selectedVoice = voices.find(voice => 
        (voice.lang === 'en-IN' || voice.name.includes('Indian')) &&
        voice.name.toLowerCase().includes('female')
      );
      
      // If no Indian English voice, try to find any English female voice
      if (!selectedVoice) {
        selectedVoice = voices.find(voice => 
          voice.lang.includes('en') && 
          voice.name.toLowerCase().includes('female')
        );
      }
      
      // Fall back to any available voice if needed
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      // Improved voice parameters for more natural speech
      utterance.pitch = 1.1;
      utterance.rate = 0.98;
      utterance.volume = 0.9;
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };
  
  const greetingVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  };
  
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
  };
  
  const studentAvatarVariants = {
    initial: { opacity: 0, scale: 0.7 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        delay: 0.5
      }
    }
  };
  
  // Map mood to specific quotes, messages, and visual themes
  const getMoodSpecificContent = () => {
    const defaultQuote = "Study hard and be awesome!";
    const defaultMessage = "Let's achieve something great today!";
    const defaultImage = "/lovable-uploads/b3337c40-376b-4764-bee8-d425abf31bc8.png";
    
    const moodContent = {
      [MoodType.Motivated]: {
        quote: "Success is the sum of small efforts, repeated day in and day out.",
        message: "You're motivated! Let's channel that energy into focused study.",
        image: "/lovable-uploads/1d4f90c6-4bcf-4265-89ba-b51ffa584307.png",
        avatarImage: "/lovable-uploads/f0722b8a-3f2f-499b-9bd9-fe9e07d94c41.png",
        particleColor1: '#6366f1',
        particleColor2: '#818cf8',
        shape1Color: '#4f46e5',
        shape2Color: '#818cf8',
        shape3Color: '#a5b4fc'
      },
      [MoodType.Happy]: {
        quote: "A positive mindset brings positive results.",
        message: "Great to see you happy! Ready to learn something new?",
        image: "/lovable-uploads/16da1ff5-9fab-4b4b-bd21-5977748acd16.png",
        avatarImage: "/lovable-uploads/1bd9164d-90e1-4088-b058-0fa5966be194.png",
        particleColor1: '#f59e0b',
        particleColor2: '#fcd34d',
        shape1Color: '#d97706',
        shape2Color: '#fbbf24',
        shape3Color: '#fcd34d'
      },
      [MoodType.FOCUSED]: {
        quote: "Discipline is the bridge between goals and accomplishment.",
        message: "You're in the zone! Let's make progress on important concepts.",
        image: "/lovable-uploads/c22d3091-93f3-466d-ac2a-a871167e98e4.png",
        avatarImage: "/lovable-uploads/9ca5a007-1086-4c37-81cc-cc869e880b5b.png",
        particleColor1: '#059669',
        particleColor2: '#10b981',
        shape1Color: '#047857',
        shape2Color: '#10b981',
        shape3Color: '#6ee7b7'
      },
      [MoodType.OKAY]: {
        quote: "Small progress is still progress.",
        message: "Let's build some momentum with your studies today.",
        image: "/lovable-uploads/26a404be-3145-4a01-9204-8e74a5984c36.png",
        avatarImage: "/lovable-uploads/8b654e3b-59bb-4288-9e3c-b3299d9cdfb3.png",
        particleColor1: '#2563eb',
        particleColor2: '#3b82f6',
        shape1Color: '#1d4ed8',
        shape2Color: '#3b82f6',
        shape3Color: '#93c5fd'
      },
      [MoodType.STRESSED]: {
        quote: "Take a deep breath. You've got this.",
        message: "Let's break down your work into manageable chunks.",
        image: "/lovable-uploads/c34ee0e2-be15-44a9-971e-1c65aa62095a.png",
        avatarImage: "/lovable-uploads/671c8cbb-4d23-4d74-afc5-5977b926a678.png",
        particleColor1: '#dc2626',
        particleColor2: '#ef4444',
        shape1Color: '#b91c1c',
        shape2Color: '#ef4444',
        shape3Color: '#fca5a5'
      },
      [MoodType.TIRED]: {
        quote: "Rest if you must, but don't quit.",
        message: "Let's focus on review and light learning today.",
        image: "/lovable-uploads/0fa1cac6-aec8-4484-82f8-54739838449c.png",
        avatarImage: "/lovable-uploads/9296075b-86c2-49b6-84c1-2679c2d4ed94.png",
        particleColor1: '#7c3aed',
        particleColor2: '#8b5cf6',
        shape1Color: '#6d28d9',
        shape2Color: '#8b5cf6',
        shape3Color: '#c4b5fd'
      }
    };
    
    if (!currentMood || !Object.prototype.hasOwnProperty.call(moodContent, currentMood)) {
      return { 
        quote: defaultQuote, 
        message: defaultMessage,
        image: defaultImage,
        avatarImage: "/lovable-uploads/942253c5-380a-4285-85aa-06a90b045ade.png",
        particleColor1: '#6366f1',
        particleColor2: '#818cf8',
        shape1Color: '#4f46e5',
        shape2Color: '#818cf8',
        shape3Color: '#a5b4fc'
      };
    }
    
    return moodContent[currentMood as keyof typeof moodContent];
  };
  
  const { quote, message, image, avatarImage } = getMoodSpecificContent();
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Background */}
      <div 
        ref={threeContainerRef}
        className="absolute inset-0 w-full h-full -z-10"
      />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div 
          className="max-w-md w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-8 text-center relative">
            {/* Animated avatar representation of student */}
            <AnimatePresence>
              {showStudentAvatar && (
                <motion.div
                  className="absolute -top-24 left-1/2 transform -translate-x-1/2 z-20"
                  variants={studentAvatarVariants}
                  initial="initial"
                  animate="animate"
                >
                  <div className="relative">
                    <img 
                      src={avatarImage}
                      alt="Student Avatar" 
                      className="h-32 w-32 object-contain"
                    />
                    
                    {/* Animated thought bubble connecting to avatar */}
                    <motion.div 
                      className="absolute -right-6 -top-10 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Brain className="h-5 w-5 text-blue-500" />
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.div 
              className="mb-6 flex justify-center"
              variants={logoVariants}
              initial="initial"
              animate="animate"
            >
              <div className="relative mt-6">
                <img 
                  src={image}
                  alt="PREPZR Logo" 
                  className="h-20 w-20"
                />
                
                {/* Animated pulsing effect */}
                <motion.div 
                  className="absolute inset-0"
                  animate={{ 
                    opacity: [0, 0.5, 0],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sparkles className="h-20 w-20 text-blue-300 opacity-50" />
                </motion.div>
                
                {/* Audio indicator */}
                {isPlaying && (
                  <motion.div 
                    className="absolute inset-0 rounded-full border-4 border-blue-400 -m-2"
                    animate={{ 
                      scale: [1, 1.1, 1.2, 1.1, 1],
                      opacity: [0.7, 0.5, 0.3, 0.5, 0.7] 
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 1.5
                    }}
                  />
                )}
              </div>
            </motion.div>
            
            <motion.div
              variants={greetingVariants}
              initial="initial"
              animate="animate"
            >
              <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Welcome to PREPZR
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The world's first emotionally intelligent study companion
              </p>
            </motion.div>
            
            {animationComplete && (
              <motion.div 
                className="mb-6"
                variants={quoteVariants}
                initial="initial"
                animate="animate"
              >
                <blockquote className="italic text-gray-700 dark:text-gray-300 border-l-4 border-blue-500 pl-4 py-2 text-left">
                  "{quote}"
                </blockquote>
                <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
                  {message}
                </p>
                
                {/* Audio indicator */}
                <motion.div 
                  className="mt-4 flex items-center justify-center gap-2 text-sm text-blue-600 dark:text-blue-400"
                  animate={isPlaying ? { opacity: [1, 0.7, 1] } : { opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <Volume2 className="h-4 w-4" />
                  <span>{isPlaying ? "Listening to welcome message..." : "Welcome message completed"}</span>
                </motion.div>
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showButton ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-3"
            >
              <Button 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 overflow-hidden relative"
                onClick={onComplete}
                disabled={isPlaying}
              >
                {isPlaying ? (
                  "Listening to welcome message..."
                ) : (
                  <>
                    Continue to Dashboard 
                    <ArrowRight className="ml-2 h-4 w-4" />
                    
                    {/* Animated shine effect */}
                    <motion.div 
                      className="absolute inset-0 bg-white opacity-20"
                      animate={{ 
                        x: ["100%", "-100%"],
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2, 
                        ease: "easeInOut",
                        repeatDelay: 1
                      }}
                      style={{ clipPath: "polygon(0 0, 20% 0, 60% 100%, 40% 100%)" }}
                    />
                  </>
                )}
              </Button>
              
              <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-md text-xs text-amber-800 dark:text-amber-300">
                <div className="flex items-center gap-1 justify-center mb-1">
                  <Heart className="h-3 w-3 text-red-500 fill-red-500" />
                  <span className="font-medium">Support PREPZR</span>
                </div>
                <p>PREPZR is free for students. Consider a donation to help us keep improving and supporting students worldwide.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SplashScreen;
