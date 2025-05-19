
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mic, Volume, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface JourneyStage {
  id: number;
  title: string;
  description: string;
  color: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  glowIntensity: number;
}

const Interactive3DHero: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const animationFrameRef = useRef<number>(0);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());
  
  // Voice recognition
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);
  
  // Journey state
  const [currentStage, setCurrentStage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showStageContent, setShowStageContent] = useState(true);
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(false);
  
  // Define the journey stages
  const journeyStages: JourneyStage[] = [
    {
      id: 1,
      title: "The Challenge",
      description: "Every student begins facing complex subjects and overwhelming study materials. The path to exam success seems unclear and intimidating.",
      color: "#8B5CF6", // Purple
      position: { x: -10, y: 0, z: 0 },
      glowIntensity: 1.5,
    },
    {
      id: 2,
      title: "The Discovery",
      description: "Finding PREPZR transforms the experience. AI personalization creates custom study paths and simplifies complex concepts.",
      color: "#3B82F6", // Blue
      position: { x: 0, y: 0, z: -10 },
      glowIntensity: 2,
    },
    {
      id: 3,
      title: "The Breakthrough",
      description: "With concepts clarified and confidence building, exam challenges become opportunities to demonstrate knowledge.",
      color: "#10B981", // Green
      position: { x: 10, y: 0, z: 0 },
      glowIntensity: 2.5,
    },
    {
      id: 4,
      title: "The Achievement",
      description: "Equipped with personalized preparation and deep understanding, success becomes the natural outcome of the journey.",
      color: "#F59E0B", // Amber
      position: { x: 0, y: 0, z: 10 },
      glowIntensity: 3,
    }
  ];

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Setup camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 20;
    cameraRef.current = camera;
    
    // Setup renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    
    // Ambient light for base illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    // Directional light for shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);
    
    // Create background particles
    createBackgroundParticles();
    
    // Create journey nodes
    createJourneyNodes();
    
    // Add central glow
    addCentralGlow();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const delta = clockRef.current.getDelta();
      const elapsedTime = clockRef.current.getElapsedTime();
      
      // Rotate entire scene slowly
      sceneRef.current.rotation.y = Math.sin(elapsedTime * 0.05) * 0.1;
      
      // Pulse and animate particles
      scene.traverse((object) => {
        if (object.name === 'particle-system') {
          const particles = object as THREE.Points;
          const positions = particles.geometry.attributes.position;
          
          for (let i = 0; i < positions.count; i++) {
            const i3 = i * 3;
            // Get original position
            const x = positions.array[i3];
            const y = positions.array[i3 + 1];
            const z = positions.array[i3 + 2];
            
            // Add subtle movement
            positions.array[i3] = x + Math.sin(elapsedTime + i) * 0.01;
            positions.array[i3 + 1] = y + Math.cos(elapsedTime + i) * 0.01;
            positions.array[i3 + 2] = z + Math.sin(elapsedTime + i * 0.5) * 0.01;
          }
          
          positions.needsUpdate = true;
        }
        
        // Animate glow of current stage
        if (object.name === `journey-node-${currentStage + 1}`) {
          // Pulse the current stage node
          const mesh = object as THREE.Mesh;
          const material = mesh.material as THREE.MeshStandardMaterial;
          material.emissiveIntensity = 1 + Math.sin(elapsedTime * 2) * 0.5;
          
          // Make it rotate a bit faster
          mesh.rotation.y += delta * 0.5;
          mesh.rotation.z += delta * 0.3;
        } else if (object.name.startsWith('journey-node')) {
          // Slower rotation for non-active nodes
          const mesh = object as THREE.Mesh;
          mesh.rotation.y += delta * 0.2;
          mesh.rotation.x += delta * 0.1;
        }
        
        // Animate central glow
        if (object.name === 'central-glow') {
          const mesh = object as THREE.Mesh;
          const material = mesh.material as THREE.MeshStandardMaterial;
          material.emissiveIntensity = 0.5 + Math.sin(elapsedTime) * 0.3;
        }
      });
      
      // Move camera if we're animating between stages
      if (isAnimating && cameraRef.current) {
        const targetStage = journeyStages[currentStage];
        const targetX = targetStage.position.x * 0.8;
        const targetZ = targetStage.position.z * 0.8;
        
        cameraRef.current.position.x += (targetX - cameraRef.current.position.x) * 0.05;
        cameraRef.current.position.z += (targetZ - cameraRef.current.position.z) * 0.05;
        
        // Check if we've arrived close enough to the target
        if (Math.abs(cameraRef.current.position.x - targetX) < 0.1 &&
            Math.abs(cameraRef.current.position.z - targetZ) < 0.1) {
          setIsAnimating(false);
        }
      }
      
      // Look at center
      if (cameraRef.current) {
        cameraRef.current.lookAt(new THREE.Vector3(0, 0, 0));
      }
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      renderer.dispose();
    };
  }, []);
  
  // Effect to handle stage transitions
  useEffect(() => {
    if (currentStage !== null && sceneRef.current) {
      // Highlight the active stage, dim others
      sceneRef.current.traverse((object) => {
        if (object.name.startsWith('journey-node')) {
          const mesh = object as THREE.Mesh;
          const material = mesh.material as THREE.MeshStandardMaterial;
          
          if (object.name === `journey-node-${currentStage + 1}`) {
            material.emissive = new THREE.Color(journeyStages[currentStage].color);
            material.emissiveIntensity = journeyStages[currentStage].glowIntensity;
          } else {
            material.emissiveIntensity = 0.5;
          }
        }
      });
      
      // Start camera animation
      setIsAnimating(true);
      setShowStageContent(false);
      
      // Show content after camera moves
      setTimeout(() => {
        setShowStageContent(true);
      }, 1000);
    }
  }, [currentStage]);
  
  // Auto-advance stages if enabled
  useEffect(() => {
    if (!autoPlayEnabled) return;
    
    const interval = setInterval(() => {
      goToNextStage();
    }, 12000); // 12 seconds per stage
    
    return () => clearInterval(interval);
  }, [autoPlayEnabled, currentStage]);
  
  // Create background particle system
  const createBackgroundParticles = useCallback(() => {
    if (!sceneRef.current) return;
    
    const particleCount = 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    // Use colors from our theme
    const color1 = new THREE.Color("#8B5CF6"); // Purple
    const color2 = new THREE.Color("#3B82F6"); // Blue
    const color3 = new THREE.Color("#10B981"); // Green
    
    for (let i = 0; i < particleCount; i++) {
      // Create a spherical distribution
      const radius = 30 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      // Convert to cartesian coordinates
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Assign random colors from our palette
      const colorChoice = Math.random();
      let selectedColor;
      
      if (colorChoice < 0.33) {
        selectedColor = color1;
      } else if (colorChoice < 0.66) {
        selectedColor = color2;
      } else {
        selectedColor = color3;
      }
      
      colors[i * 3] = selectedColor.r;
      colors[i * 3 + 1] = selectedColor.g;
      colors[i * 3 + 2] = selectedColor.b;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
      size: 0.2,
      sizeAttenuation: true,
      transparent: true,
      vertexColors: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    });
    
    const particles = new THREE.Points(geometry, material);
    particles.name = 'particle-system';
    sceneRef.current.add(particles);
  }, []);
  
  // Create journey nodes
  const createJourneyNodes = useCallback(() => {
    if (!sceneRef.current) return;
    
    journeyStages.forEach((stage, index) => {
      // Create a glowing orb for each stage
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      
      // Use standard material with emissive for glow effect
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(stage.color),
        emissive: new THREE.Color(stage.color),
        emissiveIntensity: index === currentStage ? stage.glowIntensity : 0.5,
        metalness: 0.3,
        roughness: 0.4,
      });
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(stage.position.x, stage.position.y, stage.position.z);
      mesh.name = `journey-node-${index + 1}`;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      
      // Add orbital rings around each node
      const ringGeometry = new THREE.TorusGeometry(1.8, 0.05, 16, 100);
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: new THREE.Color(stage.color),
        emissiveIntensity: 0.7,
        transparent: true,
        opacity: 0.7
      });
      
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      mesh.add(ring);
      
      // Add second ring at different angle
      const ring2 = ring.clone();
      ring2.rotation.x = Math.PI / 4;
      ring2.rotation.y = Math.PI / 3;
      mesh.add(ring2);
      
      sceneRef.current.add(mesh);
      
      // Create connections between nodes
      if (index > 0) {
        const prevStage = journeyStages[index - 1];
        const connection = createConnection(
          prevStage.position, 
          stage.position,
          prevStage.color,
          stage.color
        );
        sceneRef.current.add(connection);
      }
    });
  }, [currentStage]);
  
  // Create connecting beams between journey nodes
  const createConnection = useCallback((
    startPos: {x: number, y: number, z: number},
    endPos: {x: number, y: number, z: number},
    startColor: string,
    endColor: string
  ) => {
    // Create a curved path between points
    const curvePoints = [];
    const start = new THREE.Vector3(startPos.x, startPos.y, startPos.z);
    const end = new THREE.Vector3(endPos.x, endPos.y, endPos.z);
    
    // Midpoint with offset for curve
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.y += 5; // Curve upward
    
    curvePoints.push(start);
    curvePoints.push(mid);
    curvePoints.push(end);
    
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const geometry = new THREE.TubeGeometry(curve, 20, 0.05, 8, false);
    
    // Create gradient material
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.6
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'connection';
    
    return mesh;
  }, []);
  
  // Add a central glow effect
  const addCentralGlow = useCallback(() => {
    if (!sceneRef.current) return;
    
    // Central glow
    const geometry = new THREE.SphereGeometry(2, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x8B5CF6,
      emissiveIntensity: 1,
      transparent: true,
      opacity: 0.7,
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = 'central-glow';
    sceneRef.current.add(mesh);
    
    // Add subtle rays emanating from center
    const rayCount = 8;
    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2;
      const length = 5 + Math.random() * 5;
      
      const rayGeometry = new THREE.CylinderGeometry(0.05, 0.01, length, 8);
      const rayMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x8B5CF6,
        emissiveIntensity: 0.7,
        transparent: true,
        opacity: 0.3,
      });
      
      const ray = new THREE.Mesh(rayGeometry, rayMaterial);
      ray.position.x = Math.cos(angle) * (length / 2);
      ray.position.z = Math.sin(angle) * (length / 2);
      ray.rotation.z = Math.PI / 2;
      ray.rotation.y = angle;
      
      mesh.add(ray);
    }
  }, []);
  
  // Navigation functions
  const goToNextStage = useCallback(() => {
    setCurrentStage((prev) => {
      const next = prev + 1;
      return next < journeyStages.length ? next : 0;
    });
  }, [journeyStages.length]);
  
  const goToPrevStage = useCallback(() => {
    setCurrentStage((prev) => {
      const next = prev - 1;
      return next >= 0 ? next : journeyStages.length - 1;
    });
  }, [journeyStages.length]);
  
  const goToSpecificStage = useCallback((index: number) => {
    if (index >= 0 && index < journeyStages.length) {
      setCurrentStage(index);
    }
  }, [journeyStages.length]);
  
  // Start voice recognition
  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice commands. Try a modern browser like Chrome.",
        variant: "destructive",
      });
      return;
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => {
      setIsListening(true);
    };
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setTranscript(transcript);
      
      // Process voice commands
      if (transcript.includes('next') || transcript.includes('forward')) {
        goToNextStage();
        speakResponse("Moving to next stage");
      } else if (transcript.includes('previous') || transcript.includes('back')) {
        goToPrevStage();
        speakResponse("Moving to previous stage");
      } else if (transcript.includes('challenge') || transcript.includes('begin')) {
        goToSpecificStage(0);
        speakResponse("Going to the beginning stage");
      } else if (transcript.includes('discovery')) {
        goToSpecificStage(1);
        speakResponse("Going to the discovery stage");
      } else if (transcript.includes('breakthrough')) {
        goToSpecificStage(2);
        speakResponse("Going to the breakthrough stage");
      } else if (transcript.includes('achievement') || transcript.includes('success')) {
        goToSpecificStage(3);
        speakResponse("Going to the achievement stage");
      } else if (transcript.includes('start') || transcript.includes('play')) {
        setAutoPlayEnabled(true);
        speakResponse("Starting auto-play journey");
      } else if (transcript.includes('stop') || transcript.includes('pause')) {
        setAutoPlayEnabled(false);
        speakResponse("Paused auto-play journey");
      } else if (transcript.includes('register') || transcript.includes('sign up')) {
        speakResponse("Taking you to sign up");
        setTimeout(() => navigate('/signup'), 1500);
      } else {
        speakResponse("Try saying next, previous, or a stage name");
      }
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };
    
    recognitionRef.current = recognition;
    recognition.start();
    
    toast({
      title: "Listening for voice commands",
      description: "Try saying: next, previous, challenge, discovery, breakthrough, achievement",
    });
  }, [goToNextStage, goToPrevStage, goToSpecificStage, navigate]);
  
  // Use speech synthesis to respond
  const speakResponse = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    // Try to find a vibrant voice
    let voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      // Look for English voices, preferring US English
      const englishVoices = voices.filter(voice => 
        voice.lang.includes('en-')
      );
      
      if (englishVoices.length > 0) {
        utterance.voice = englishVoices[0];
      }
    }
    
    window.speechSynthesis.speak(utterance);
  }, []);
  
  return (
    <div className="relative w-full h-screen overflow-hidden" ref={containerRef}>
      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      
      {/* Content Overlay */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Header Text */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-8 text-center px-4"
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Your Journey to Exam Excellence
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Visualize your transformation from overwhelmed student to confident achiever with AI-powered learning
          </p>
        </motion.div>
        
        {/* Stage Content */}
        <AnimatePresence mode="wait">
          {showStageContent && (
            <motion.div 
              key={`stage-${currentStage}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
              className="glass-card max-w-md w-full mx-4 p-6 md:p-8 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <div 
                  className="h-12 w-12 rounded-full flex items-center justify-center mr-4" 
                  style={{ backgroundColor: `${journeyStages[currentStage].color}30` }}
                >
                  <motion.div 
                    className="h-8 w-8 rounded-full" 
                    style={{ backgroundColor: journeyStages[currentStage].color }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  />
                </div>
                <h2 className="text-2xl font-bold text-white">{journeyStages[currentStage].title}</h2>
              </div>
              
              <p className="text-gray-300 mb-6">
                {journeyStages[currentStage].description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {journeyStages.map((_, index) => (
                    <button
                      key={`indicator-${index}`}
                      className={`h-3 w-3 rounded-full ${
                        index === currentStage ? 'bg-white' : 'bg-gray-600'
                      }`}
                      onClick={() => goToSpecificStage(index)}
                      aria-label={`Go to stage ${index + 1}`}
                    />
                  ))}
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setAutoPlayEnabled(!autoPlayEnabled)}
                    className="text-white border-white/20"
                  >
                    {autoPlayEnabled ? (
                      <>
                        <Play className="h-4 w-4 mr-2" /> 
                        Auto-playing
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" /> 
                        Auto-play
                      </>
                    )}
                  </Button>
                  
                  <Button onClick={goToNextStage}>
                    Next <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Voice command button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center">
            <Button 
              variant={isListening ? "default" : "outline"}
              className={`rounded-full p-4 ${isListening ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'border-white/40 text-white'}`}
              onClick={startListening}
              disabled={isListening}
            >
              <Mic className="h-6 w-6" />
              <span className="ml-2">{isListening ? 'Listening...' : 'Use Voice Commands'}</span>
            </Button>
            
            {transcript && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-gray-300"
              >
                "{transcript}"
              </motion.div>
            )}
            
            <motion.div 
              className="mt-3 text-xs text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
            >
              Try saying: "next", "previous", "breakthrough", or "sign up"
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Interactive3DHero;
