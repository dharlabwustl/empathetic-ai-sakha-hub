
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { ArrowRight, Book, Star, Sparkles, Mic, MicOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Hero3DSection: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<THREE.Points | null>(null);
  
  const [currentStage, setCurrentStage] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  // Speech recognition setup
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  
  // Journey stages data
  const journeyStages = [
    {
      title: "The Beginning",
      description: "Every student starts with big dreams and aspirations. The path seems challenging, but the potential is limitless.",
      color: "#6366f1",
      icon: <Book className="h-10 w-10 text-indigo-500" />,
      voiceCommands: ["beginning", "start", "dreams"]
    },
    {
      title: "The Struggle",
      description: "Studying becomes harder, concepts more complex. This is where many students feel overwhelmed and need guidance.",
      color: "#f59e0b",
      icon: <Star className="h-10 w-10 text-amber-500" />,
      voiceCommands: ["struggle", "hard", "complex", "overwhelmed"]
    },
    {
      title: "The Breakthrough",
      description: "With PREPZR's AI-powered assistance, complex concepts become clear, study plans become personalized, and confidence grows.",
      color: "#10b981", 
      icon: <Sparkles className="h-10 w-10 text-emerald-500" />,
      voiceCommands: ["breakthrough", "success", "clear", "confidence"]
    }
  ];

  useEffect(() => {
    // Setup the 3D background animation
    setupThreeJSAnimation();
    
    // Auto-advance to show "Next" button after a short delay
    const timer = setTimeout(() => {
      setShowNextButton(true);
    }, 2000);
    
    // Initialize speech recognition
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event) => {
        const speechResult = event.results[0][0].transcript.toLowerCase();
        setTranscript(speechResult);
        
        console.log("Voice command detected:", speechResult);
        
        // Process voice commands for navigation
        processVoiceCommand(speechResult);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        console.log("Speech recognition ended");
      };
      
      recognitionRef.current.onerror = (event) => {
        setIsListening(false);
        console.error("Speech recognition error", event.error);
        toast({
          title: "Voice recognition error",
          description: "Could not understand. Please try again.",
          variant: "destructive"
        });
      };
    }
    
    // Cleanup function
    return () => {
      clearTimeout(timer);
      
      // Clean up Three.js resources
      if (rendererRef.current && threeContainerRef.current) {
        threeContainerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Clean up speech recognition
      if (recognitionRef.current) {
        recognitionRef.current.onresult = null;
        recognitionRef.current.onend = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.abort();
      }
    };
  }, [toast]);

  useEffect(() => {
    // Change particle colors when stage changes
    if (particlesRef.current && sceneRef.current) {
      updateParticleColors(journeyStages[currentStage].color);
    }
  }, [currentStage]);

  const processVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Check for navigation commands
    if (lowerCommand.includes('next') || lowerCommand.includes('forward')) {
      handleNextStage();
      return;
    }
    
    if (lowerCommand.includes('back') || lowerCommand.includes('previous')) {
      handlePreviousStage();
      return;
    }
    
    if (lowerCommand.includes('start') || lowerCommand.includes('begin now') || lowerCommand.includes('get started')) {
      handleGetStarted();
      return;
    }
    
    // Check for stage-specific commands
    for (let i = 0; i < journeyStages.length; i++) {
      const stage = journeyStages[i];
      if (stage.voiceCommands.some(cmd => lowerCommand.includes(cmd))) {
        setCurrentStage(i);
        toast({
          title: "Voice command recognized",
          description: `Showing "${stage.title}" stage`,
        });
        return;
      }
    }
    
    // If no command matched
    toast({
      title: "Voice command",
      description: "Try saying 'next', 'back', or a stage name like 'breakthrough'",
    });
  };

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
    
    // Create initial particles
    createParticles(journeyStages[0].color);
    
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
          object.rotation.x += 0.001;
          object.rotation.y += 0.002;
          
          // Subtle floating motion
          object.position.y += Math.sin(Date.now() * 0.001 + object.position.x) * 0.005;
        }
      });
      
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    setAnimationComplete(true);
  };
  
  const createParticles = (color: string) => {
    if (!sceneRef.current) return;
    
    // Remove existing particles if any
    if (particlesRef.current) {
      sceneRef.current.remove(particlesRef.current);
    }
    
    // Create particles
    const particleCount = 2000;
    const particles = new THREE.BufferGeometry();
    
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Create color objects from theme
    const color1 = new THREE.Color(color);
    const color2 = new THREE.Color(0xffffff);
    
    // Distribute particles in a spherical pattern
    for (let i = 0; i < particleCount; i++) {
      // Position
      const radius = 15 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Color - interpolate between two theme colors
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
      opacity: 0.8
    });
    
    // Create points system
    const pointsSystem = new THREE.Points(particles, particleMaterial);
    sceneRef.current.add(pointsSystem);
    particlesRef.current = pointsSystem;
  };
  
  const updateParticleColors = (color: string) => {
    if (!particlesRef.current || !particlesRef.current.geometry) return;
    
    const geometry = particlesRef.current.geometry;
    const colors = geometry.attributes.color as THREE.BufferAttribute;
    const color1 = new THREE.Color(color);
    const color2 = new THREE.Color(0xffffff);
    
    for (let i = 0; i < colors.count; i++) {
      const mixRatio = Math.random();
      colors.setXYZ(
        i,
        color1.r * mixRatio + color2.r * (1 - mixRatio),
        color1.g * mixRatio + color2.g * (1 - mixRatio),
        color1.b * mixRatio + color2.b * (1 - mixRatio)
      );
    }
    
    colors.needsUpdate = true;
  };
  
  const addBackgroundShapes = () => {
    if (!sceneRef.current) return;
    
    const addShape = (geometry: THREE.BufferGeometry, color: string, position: THREE.Vector3, scale: THREE.Vector3) => {
      const material = new THREE.MeshPhongMaterial({
        color: color,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.copy(position);
      mesh.scale.copy(scale);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      sceneRef.current!.add(mesh);
    };
    
    // Create various geometric shapes
    const shapes = [
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(1, 0),
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.TorusGeometry(1, 0.3, 16, 32),
      new THREE.BoxGeometry(1, 1, 1)
    ];
    
    // Colors that match our theme
    const colors = [
      "#6366f1", // indigo
      "#10b981", // emerald
      "#f59e0b", // amber
      "#ec4899", // pink
      "#3b82f6"  // blue
    ];
    
    // Add 10 random shapes
    for (let i = 0; i < 10; i++) {
      const shapeIndex = Math.floor(Math.random() * shapes.length);
      const colorIndex = Math.floor(Math.random() * colors.length);
      
      addShape(
        shapes[shapeIndex],
        colors[colorIndex],
        new THREE.Vector3(
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20 - 5
        ),
        new THREE.Vector3(
          1 + Math.random() * 2,
          1 + Math.random() * 2,
          1 + Math.random() * 2
        )
      );
    }
  };

  const handleNextStage = () => {
    if (currentStage < journeyStages.length - 1) {
      setCurrentStage(currentStage + 1);
    } else {
      // Loop back to first stage
      setCurrentStage(0);
    }
  };
  
  const handlePreviousStage = () => {
    if (currentStage > 0) {
      setCurrentStage(currentStage - 1);
    } else {
      // Loop to last stage
      setCurrentStage(journeyStages.length - 1);
    }
  };
  
  const handleGetStarted = () => {
    navigate('/signup');
  };

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        setIsListening(true);
        recognitionRef.current.start();
        
        toast({
          title: "Listening...",
          description: "Try saying 'next', 'previous', or a stage name like 'breakthrough'",
        });
      } else {
        toast({
          title: "Voice recognition not supported",
          description: "Your browser doesn't support voice commands",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Three.js container for the background animation */}
      <div 
        ref={threeContainerRef} 
        className="absolute inset-0 z-0"
        aria-hidden="true"
      />
      
      {/* Content overlay */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Left side - Text content */}
            <div className="flex flex-col justify-center space-y-6">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600">
                  Transforming Exam Preparation
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  PREPZR uses AI to understand your learning style and creates personalized study plans for better results.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                  onClick={handleGetStarted}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2"
                  onClick={toggleListening}
                >
                  {isListening ? (
                    <>
                      <MicOff className="mr-2 h-5 w-5 text-red-500" />
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <Mic className="mr-2 h-5 w-5" />
                      Voice Commands
                    </>
                  )}
                </Button>
              </motion.div>
              
              {/* Voice transcript display */}
              {transcript && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold">You said:</span> "{transcript}"
                  </p>
                </motion.div>
              )}
            </div>
            
            {/* Right side - Student Journey Visualization */}
            <div className="relative">
              <motion.div
                key={currentStage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className={`bg-gradient-to-br p-8 rounded-xl shadow-lg ${
                  currentStage === 0 ? 'from-indigo-100 to-indigo-50 dark:from-indigo-900/30 dark:to-indigo-900/10' :
                  currentStage === 1 ? 'from-amber-100 to-amber-50 dark:from-amber-900/30 dark:to-amber-900/10' :
                  'from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-900/10'
                }`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`p-4 rounded-full ${
                    currentStage === 0 ? 'bg-indigo-200 dark:bg-indigo-800/50' :
                    currentStage === 1 ? 'bg-amber-200 dark:bg-amber-800/50' :
                    'bg-emerald-200 dark:bg-emerald-800/50'
                  }`}>
                    {journeyStages[currentStage].icon}
                  </div>
                  
                  <h2 className={`text-2xl font-bold ${
                    currentStage === 0 ? 'text-indigo-700 dark:text-indigo-300' :
                    currentStage === 1 ? 'text-amber-700 dark:text-amber-300' :
                    'text-emerald-700 dark:text-emerald-300'
                  }`}>
                    {journeyStages[currentStage].title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    {journeyStages[currentStage].description}
                  </p>
                  
                  <div className="flex justify-center space-x-2 mt-4">
                    <Button 
                      variant="outline"
                      onClick={handlePreviousStage}
                      className="rounded-full w-10 h-10 p-0 flex items-center justify-center"
                      title="Previous Stage"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                    
                    <Button
                      onClick={handleNextStage}
                      className={`rounded-full w-10 h-10 p-0 flex items-center justify-center ${
                        currentStage === 0 ? 'bg-indigo-600 hover:bg-indigo-700' :
                        currentStage === 1 ? 'bg-amber-600 hover:bg-amber-700' :
                        'bg-emerald-600 hover:bg-emerald-700'
                      }`}
                      title="Next Stage"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
              
              {/* Progress indicator */}
              <div className="flex justify-center mt-4 space-x-2">
                {journeyStages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      currentStage === index 
                        ? (index === 0 ? 'bg-indigo-600' : index === 1 ? 'bg-amber-600' : 'bg-emerald-600') 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    onClick={() => setCurrentStage(index)}
                    aria-label={`Go to stage ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Voice command suggestions */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-3 rounded-xl shadow-lg">
          <p className="text-sm font-medium text-center mb-2">Try saying:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 rounded text-xs">
              "Next stage"
            </span>
            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded text-xs">
              "Show breakthrough"
            </span>
            <span className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 rounded text-xs">
              "Get started"
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero3DSection;
