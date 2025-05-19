import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, GraduationCap, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroButtons from './hero/HeroButtons';

const Interactive3DHero: React.FC = () => {
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationRef = useRef<number>(0);
  
  const [currentStage, setCurrentStage] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const speechRef = useRef<SpeechRecognition | null>(null);

  // Journey stages - educational journey with exam preparation focus
  const journeyStages = [
    {
      title: "Exam Preparation Journey",
      subtitle: "Where are you in your journey?",
      description: "From initial struggle to mastery, we walk with you through every step of your exam preparation journey.",
      color: "#8b5cf6", // Purple
      modelType: "books",
    },
    {
      title: "Personalized Learning",
      subtitle: "Tailored to your needs",
      description: "Our AI understands your strengths and weaknesses, creating a study plan that optimizes your learning.",
      color: "#3b82f6", // Blue
      modelType: "brain",
    },
    {
      title: "Mastery Through Practice",
      subtitle: "Learn by doing",
      description: "Apply concepts through interactive problems, flashcards, and simulated exam environments.",
      color: "#10b981", // Green
      modelType: "chart",
    }
  ];

  // Automatically advance to next stage
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStage < journeyStages.length - 1) {
        setCurrentStage(prev => prev + 1);
      } else {
        // Show CTA when reached the last stage
        setShowCTA(true);
      }
    }, 5000); // Auto-advance every 5 seconds
    
    return () => clearTimeout(timer);
  }, [currentStage]);

  // Show CTA regardless after some time
  useEffect(() => {
    const ctaTimer = setTimeout(() => {
      setShowCTA(true);
    }, 7000); // Show CTA after 7 seconds even if not at last stage
    
    return () => clearTimeout(ctaTimer);
  }, []);

  // Setup speech recognition
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      speechRef.current = new SpeechRecognition();
      speechRef.current.continuous = true;
      speechRef.current.interimResults = true;
      
      speechRef.current.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        
        if (finalTranscript.toLowerCase().includes('next')) {
          handleNext();
        } else if (finalTranscript.toLowerCase().includes('previous')) {
          handlePrevious();
        } else if (finalTranscript.toLowerCase().includes('start') || 
                  finalTranscript.toLowerCase().includes('begin') || 
                  finalTranscript.toLowerCase().includes('ready')) {
          handleGetStarted();
        }
        
        setTranscript(finalTranscript);
      };
    }
    
    return () => {
      if (speechRef.current) {
        speechRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    // Setup the 3D background animation
    setupThreeJSAnimation();
    
    // Clean up function
    return () => {
      // Clean up Three.js resources
      if (rendererRef.current && threeContainerRef.current) {
        threeContainerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Change 3D scene when stage changes
    if (sceneRef.current) {
      updateScene(journeyStages[currentStage].modelType, journeyStages[currentStage].color);
    }
  }, [currentStage]);

  const setupThreeJSAnimation = () => {
    if (!threeContainerRef.current) return;
    
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Add soft hemisphere light
    const hemisphereLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 0.7);
    scene.add(hemisphereLight);
    
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background
    
    threeContainerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Create initial scene based on first stage
    updateScene(journeyStages[0].modelType, journeyStages[0].color);
    
    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current && threeContainerRef.current) {
        const width = threeContainerRef.current.clientWidth;
        const height = threeContainerRef.current.clientHeight;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      // Rotate all 3D objects
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Group) {
          object.rotation.y += 0.002;
          
          // Add subtle floating motion 
          if (object.position.y !== undefined) {
            const time = Date.now() * 0.001;
            const offset = object.position.x * 0.1;
            object.position.y += Math.sin(time + offset) * 0.005;
          }
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

  const updateScene = (modelType: string, color: string) => {
    if (!sceneRef.current) return;
    
    // Remove existing objects
    while (sceneRef.current.children.length > 0) {
      const object = sceneRef.current.children[0];
      if (object instanceof THREE.Light) {
        // Keep lights
        sceneRef.current.remove(sceneRef.current.children[0]);
      } else {
        break;
      }
    }
    
    // Add ambient light back if needed
    if (sceneRef.current.children.length === 0) {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
      sceneRef.current.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(10, 10, 10);
      sceneRef.current.add(directionalLight);
      
      const hemisphereLight = new THREE.HemisphereLight(0xddeeff, 0x202020, 0.7);
      sceneRef.current.add(hemisphereLight);
    }
    
    // Create 3D model based on stage
    switch (modelType) {
      case 'books':
        createBookModel(color);
        break;
      case 'brain':
        createBrainModel(color);
        break;
      case 'chart':
        createChartModel(color);
        break;
      default:
        createParticleSystem(color);
    }
    
    // Add background particles
    createParticleSystem(color);
  };

  const createBookModel = (color: string) => {
    if (!sceneRef.current) return;

    // Create a group for all books
    const bookGroup = new THREE.Group();
    
    // Create several books with different sizes and positions
    const bookColors = [
      color,
      new THREE.Color(color).offsetHSL(0.1, 0, 0).getHexString(),
      new THREE.Color(color).offsetHSL(-0.1, 0, 0).getHexString(),
      new THREE.Color(color).offsetHSL(0, 0.2, 0).getHexString(),
      new THREE.Color(color).offsetHSL(0, -0.2, 0).getHexString()
    ];
    
    for (let i = 0; i < 5; i++) {
      // Create book
      const bookWidth = 5 + Math.random();
      const bookHeight = 0.5 + Math.random() * 0.5;
      const bookDepth = 7 + Math.random() * 2;
      
      const bookGeometry = new THREE.BoxGeometry(bookWidth, bookHeight, bookDepth);
      const bookMaterial = new THREE.MeshStandardMaterial({
        color: bookColors[i],
        roughness: 0.7,
        metalness: 0.2
      });
      
      const book = new THREE.Mesh(bookGeometry, bookMaterial);
      
      // Position books in different arrangements
      const angle = (i / 5) * Math.PI * 2;
      const radius = 8;
      book.position.x = Math.sin(angle) * radius;
      book.position.y = (i * 1.2) - 2;
      book.position.z = Math.cos(angle) * radius;
      
      // Rotate books
      book.rotation.y = Math.random() * Math.PI;
      book.rotation.z = Math.random() * 0.2 - 0.1;
      
      bookGroup.add(book);
    }
    
    // Add a floating notepad
    const notepadGeometry = new THREE.BoxGeometry(5, 0.2, 7);
    const notepadMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.8
    });
    
    const notepad = new THREE.Mesh(notepadGeometry, notepadMaterial);
    notepad.position.set(0, 3, 0);
    
    // Add pen
    const penGeometry = new THREE.CylinderGeometry(0.1, 0.1, 6, 8);
    const penMaterial = new THREE.MeshStandardMaterial({
      color: 0x2233aa,
      metalness: 0.8,
      roughness: 0.2
    });
    
    const pen = new THREE.Mesh(penGeometry, penMaterial);
    pen.rotation.z = Math.PI / 4;
    pen.position.set(2, 3.5, 2);
    
    // Add to scene
    bookGroup.add(notepad);
    bookGroup.add(pen);
    bookGroup.rotation.x = Math.PI / 6;
    sceneRef.current.add(bookGroup);
  };

  const createBrainModel = (color: string) => {
    if (!sceneRef.current) return;

    // Create a brain model using spheres
    const brainGroup = new THREE.Group();
    
    // Create primary brain mass
    const mainGeometry = new THREE.SphereGeometry(5, 16, 16);
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color),
      roughness: 0.7,
      metalness: 0.3,
      transparent: true,
      opacity: 0.8
    });
    
    const mainBrain = new THREE.Mesh(mainGeometry, mainMaterial);
    brainGroup.add(mainBrain);
    
    // Create brain convolutions with small spheres
    for (let i = 0; i < 50; i++) {
      const size = 0.5 + Math.random() * 0.8;
      const sphereGeometry = new THREE.SphereGeometry(size, 8, 8);
      
      // Adjust color for each convolution
      const hue = new THREE.Color(color);
      const adjustedColor = hue.offsetHSL(
        Math.random() * 0.1 - 0.05,
        Math.random() * 0.2,
        Math.random() * 0.2 - 0.1
      );
      
      const sphereMaterial = new THREE.MeshStandardMaterial({
        color: adjustedColor,
        roughness: 0.5,
        metalness: 0.4,
        transparent: true,
        opacity: 0.9
      });
      
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      
      // Position on the surface of the brain
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const radius = 5;
      
      sphere.position.x = radius * Math.sin(theta) * Math.cos(phi);
      sphere.position.y = radius * Math.sin(theta) * Math.sin(phi);
      sphere.position.z = radius * Math.cos(theta);
      
      brainGroup.add(sphere);
    }
    
    // Add neural connections with lines
    const linesMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.4
    });
    
    for (let i = 0; i < 30; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      
      const end = new THREE.Vector3(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      
      const lineGeometry = new THREE.BufferGeometry().setFromPoints([start, end]);
      const line = new THREE.Line(lineGeometry, linesMaterial);
      
      brainGroup.add(line);
    }
    
    brainGroup.rotation.x = Math.PI / 6;
    sceneRef.current.add(brainGroup);
  };

  const createChartModel = (color: string) => {
    if (!sceneRef.current) return;

    // Create a group for all chart elements
    const chartGroup = new THREE.Group();
    
    // Create base platform
    const baseGeometry = new THREE.BoxGeometry(16, 0.5, 16);
    const baseMaterial = new THREE.MeshStandardMaterial({
      color: 0x444444,
      roughness: 0.7
    });
    
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -4;
    chartGroup.add(base);
    
    // Create chart bars
    const barColors = [
      color,
      new THREE.Color(color).offsetHSL(0.05, 0, 0).getHexString(),
      new THREE.Color(color).offsetHSL(0.1, 0, 0).getHexString(),
      new THREE.Color(color).offsetHSL(0.15, 0, 0).getHexString(),
      new THREE.Color(color).offsetHSL(0.2, 0, 0).getHexString(),
    ];
    
    // Performance chart
    for (let i = 0; i < 5; i++) {
      const height = 2 + Math.random() * 6;
      const barGeometry = new THREE.BoxGeometry(1.5, height, 1.5);
      const barMaterial = new THREE.MeshStandardMaterial({
        color: barColors[i],
        roughness: 0.5,
        metalness: 0.2
      });
      
      const bar = new THREE.Mesh(barGeometry, barMaterial);
      bar.position.x = (i - 2) * 3;
      bar.position.y = -4 + (height / 2);
      
      chartGroup.add(bar);
    }
    
    // Add floating graph
    const graphPoints = [];
    for (let i = 0; i < 10; i++) {
      // Create a sine wave pattern
      const x = (i - 5) * 1.2;
      const y = Math.sin(i * 0.5) * 2 + 4;
      const z = 0;
      
      graphPoints.push(new THREE.Vector3(x, y, z));
    }
    
    const graphGeometry = new THREE.BufferGeometry().setFromPoints(graphPoints);
    const graphMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      linewidth: 2
    });
    
    const graph = new THREE.Line(graphGeometry, graphMaterial);
    chartGroup.add(graph);
    
    // Add data points on the graph
    for (let i = 0; i < graphPoints.length; i += 2) {
      const pointGeometry = new THREE.SphereGeometry(0.3, 16, 16);
      const pointMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: barColors[i % barColors.length],
        emissiveIntensity: 0.5
      });
      
      const point = new THREE.Mesh(pointGeometry, pointMaterial);
      point.position.copy(graphPoints[i]);
      
      chartGroup.add(point);
    }
    
    chartGroup.rotation.x = -Math.PI / 12;
    sceneRef.current.add(chartGroup);
  };

  const createParticleSystem = (color: string) => {
    if (!sceneRef.current) return;
    
    // Create particles
    const particleCount = 1000;
    const particles = new THREE.BufferGeometry();
    
    const positions = new Float32Array(particleCount * 3);
    
    // Create particle cloud in the background
    for (let i = 0; i < particleCount; i++) {
      // Position particles in a spherical shell
      const radius = 30 + Math.random() * 20; // Far in the background
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    
    particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Create point material with custom shader for glowing effect
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.4,
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    
    const particleSystem = new THREE.Points(particles, particleMaterial);
    sceneRef.current.add(particleSystem);
  };

  const handleNext = () => {
    setCurrentStage(prev => Math.min(prev + 1, journeyStages.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStage(prev => Math.max(prev - 1, 0));
  };

  const toggleVoiceRecognition = () => {
    if (speechRef.current) {
      if (listening) {
        speechRef.current.stop();
      } else {
        speechRef.current.start();
      }
      setListening(!listening);
    }
  };

  const handleGetStarted = () => {
    // Navigate to signup/analyze readiness
  };

  return (
    <div className="w-full relative overflow-hidden min-h-[90vh] bg-gradient-to-b from-purple-950/90 via-indigo-900/80 to-blue-900/90">
      {/* 3D Background */}
      <div 
        ref={threeContainerRef} 
        className="absolute inset-0 w-full h-full"
      ></div>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-background/70"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto pt-16 pb-10"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-text">
            Master Your Exam Preparation Journey
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-6">
            PREPZR combines AI-powered learning, adaptive study plans, and personalized resources
            to help you achieve exam success.
          </p>
        </motion.div>
        
        {/* Journey Stage Cards */}
        <div className="w-full max-w-4xl mx-auto py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStage}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 rounded-2xl backdrop-blur-md bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${journeyStages[currentStage].color}20, transparent)`,
                borderColor: `${journeyStages[currentStage].color}30`
              }}
            >
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/4 flex justify-center">
                  {currentStage === 0 ? (
                    <BookOpen className="h-16 w-16 text-white/90" />
                  ) : currentStage === 1 ? (
                    <Sparkles className="h-16 w-16 text-white/90" />
                  ) : (
                    <GraduationCap className="h-16 w-16 text-white/90" />
                  )}
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-lg text-white/70 mb-2">{journeyStages[currentStage].subtitle}</h3>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{journeyStages[currentStage].title}</h2>
                  <p className="text-white/80">{journeyStages[currentStage].description}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {journeyStages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentStage === index ? 'bg-white scale-125' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* CTA Buttons - automatically appear */}
        <AnimatePresence>
          {showCTA && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="mt-8 mb-10"
            >
              <HeroButtons onAnalyzeClick={() => window.dispatchEvent(new Event('open-exam-analyzer'))} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Voice Control Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-6 left-6 flex items-center gap-2 text-white/70 text-sm"
        >
          <button
            onClick={toggleVoiceRecognition}
            className={`p-2 rounded-full ${listening ? 'bg-red-500/50 animate-pulse' : 'bg-white/10'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" x2="12" y1="19" y2="22"></line>
            </svg>
          </button>
          {listening && <span>Say "next", "previous", or "start"</span>}
        </motion.div>

        {/* Navigation Controls */}
        <div className="absolute bottom-6 right-6 flex gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentStage === 0}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight className="h-5 w-5 text-white rotate-180" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentStage === journeyStages.length - 1}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interactive3DHero;
