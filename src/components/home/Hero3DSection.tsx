
import React, { useState, useEffect, useRef } from 'react';
import HeroContent from './hero/HeroContent';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import DashboardPreview from './hero/DashboardPreview';

// Array of 3D animation paths
const animations = [
  "/animations/brain-animation.svg",
  "/animations/student-success.svg",
  "/animations/learning-journey.svg",
  "/animations/exam-prep.svg"
];

// Exam symbols for the 3D background
const examSymbols = [
  { type: 'formula', value: 'E=mc²', color: 0x8b5cf6 },
  { type: 'formula', value: 'a²+b²=c²', color: 0x4c1d95 },
  { type: 'formula', value: 'F=ma', color: 0x6d28d9 },
  { type: 'formula', value: 'pV=nRT', color: 0x4338ca },
  { type: 'symbol', value: 'Σ', color: 0x8b5cf6 },
  { type: 'symbol', value: '∫', color: 0x6d28d9 },
  { type: 'symbol', value: 'π', color: 0x4c1d95 },
  { type: 'symbol', value: '±', color: 0x3730a3 },
  { type: 'symbol', value: '∇', color: 0x3730a3 },
  { type: 'subject', value: 'Physics', color: 0x4c1d95 },
  { type: 'subject', value: 'Chemistry', color: 0x6d28d9 },
  { type: 'subject', value: 'Biology', color: 0x8b5cf6 },
  { type: 'subject', value: 'Mathematics', color: 0x4338ca }
];

const Hero3DSection: React.FC = () => {
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  const threeContainerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    gridHelper: THREE.GridHelper;
    neuronParticles: THREE.Points;
    clock: THREE.Clock;
    animationId: number | null;
    textSprites: THREE.Sprite[];
  } | null>(null);
  
  // Function to handle opening exam readiness analyzer
  const handleExamReadinessClick = () => {
    // Dispatch custom event to open analyzer
    window.dispatchEvent(new Event('open-exam-analyzer'));
  };
  
  // Setup auto-sliding for animations
  useEffect(() => {
    // Auto advance slides every 5 seconds
    const interval = setInterval(() => {
      setCurrentAnimationIndex(prev => (prev + 1) % animations.length);
    }, 5000);
    
    // Listen for custom event to advance slides
    const handleNextSlide = () => {
      setCurrentAnimationIndex(prev => (prev + 1) % animations.length);
    };
    
    document.addEventListener('hero-slider-next', handleNextSlide);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener('hero-slider-next', handleNextSlide);
    };
  }, []);

  // Create a text sprite for the 3D scene
  const createTextSprite = (text: string, color: number, size = 0.5) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return null;
    
    canvas.width = 256;
    canvas.height = 128;
    
    context.fillStyle = 'rgba(0,0,0,0)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    // Text properties
    context.font = '600 32px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    // Text gradient
    const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
    context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
    context.fillText(text, canvas.width / 2, canvas.height / 2);
    
    // Create sprite material
    const texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    
    const spriteMaterial = new THREE.SpriteMaterial({ 
      map: texture,
      transparent: true,
      alphaTest: 0.1,
      opacity: 0.8
    });
    
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(size, size * 0.5, 1);
    
    return sprite;
  };

  // Initialize and animate THREE.js scene with educational elements
  useEffect(() => {
    if (!threeContainerRef.current) return;
    
    // Initialize THREE.js scene if not already created
    if (!sceneRef.current) {
      const container = threeContainerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      // Create scene, camera, renderer
      const scene = new THREE.Scene();
      
      // Add fog for depth
      scene.fog = new THREE.FogExp2(0x4338ca, 0.005);
      
      const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
      camera.position.z = 30;
      camera.position.y = 5;
      camera.lookAt(0, 0, 0);
      
      const renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true 
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);
      
      // Create immersive grid with more depth
      const gridHelper = new THREE.GridHelper(500, 100, 0x3730a3, 0x4338ca);
      gridHelper.position.y = -10;
      gridHelper.rotation.x = Math.PI / 2;
      scene.add(gridHelper);
      
      // Create neural network particle system
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 1000;
      
      const posArray = new Float32Array(particlesCount * 3);
      const scaleArray = new Float32Array(particlesCount);
      
      for (let i = 0; i < particlesCount * 3; i+=3) {
        // Position particles in a sphere
        const radius = 80 * Math.random() + 20;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i+1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i+2] = radius * Math.cos(phi);
        
        // Random scale for particles
        scaleArray[i/3] = Math.random() * 2 + 0.5;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
      
      // Create shader material for particles
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.7,
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });
      
      // Create particle system
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      
      // Add neuron-like particles that connect with lines
      const neuronCount = 200;
      const neuronGeometry = new THREE.BufferGeometry();
      const neuronPositions = new Float32Array(neuronCount * 3);
      
      for (let i = 0; i < neuronCount * 3; i += 3) {
        neuronPositions[i] = (Math.random() - 0.5) * 100;
        neuronPositions[i + 1] = (Math.random() - 0.5) * 100;
        neuronPositions[i + 2] = (Math.random() - 0.5) * 100;
      }
      
      neuronGeometry.setAttribute('position', new THREE.BufferAttribute(neuronPositions, 3));
      
      const neuronMaterial = new THREE.PointsMaterial({
        size: 1,
        color: 0x4c1d95,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });
      
      const neuronParticles = new THREE.Points(neuronGeometry, neuronMaterial);
      scene.add(neuronParticles);
      
      // Create neural connections
      const connections = 100;
      for (let i = 0; i < connections; i++) {
        // Create random connections between particles
        const idx1 = Math.floor(Math.random() * neuronCount);
        const idx2 = Math.floor(Math.random() * neuronCount);
        
        const x1 = neuronPositions[idx1 * 3];
        const y1 = neuronPositions[idx1 * 3 + 1];
        const z1 = neuronPositions[idx1 * 3 + 2];
        
        const x2 = neuronPositions[idx2 * 3];
        const y2 = neuronPositions[idx2 * 3 + 1];
        const z2 = neuronPositions[idx2 * 3 + 2];
        
        // Only connect if within reasonable distance
        const distance = Math.sqrt(
          Math.pow(x2 - x1, 2) + 
          Math.pow(y2 - y1, 2) + 
          Math.pow(z2 - z1, 2)
        );
        
        if (distance < 40) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(x1, y1, z1),
            new THREE.Vector3(x2, y2, z2)
          ]);
          
          const lineMaterial = new THREE.LineBasicMaterial({ 
            color: 0x6d28d9,
            transparent: true,
            opacity: 0.2 + Math.random() * 0.2
          });
          
          const line = new THREE.Line(lineGeometry, lineMaterial);
          scene.add(line);
        }
      }
      
      // Add exam-related text sprites
      const textSprites: THREE.Sprite[] = [];
      examSymbols.forEach(symbol => {
        const sprite = createTextSprite(symbol.value, symbol.color, 2 + Math.random() * 2);
        if (sprite) {
          sprite.position.set(
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100,
            (Math.random() - 0.5) * 100
          );
          scene.add(sprite);
          textSprites.push(sprite);
        }
      });
      
      // Add some ambient light to illuminate the scene
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      // Add directional light for depth
      const directionalLight = new THREE.DirectionalLight(0x8b5cf6, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
      
      // Add a soft point light for aesthetics
      const pointLight = new THREE.PointLight(0x4c1d95, 2, 50);
      pointLight.position.set(0, 10, 10);
      scene.add(pointLight);
      
      // Add a second moving light
      const movingLight = new THREE.PointLight(0x3730a3, 1.5, 100);
      movingLight.position.set(30, 0, 30);
      scene.add(movingLight);
      
      const clock = new THREE.Clock();
      
      sceneRef.current = {
        scene,
        camera,
        renderer,
        particles,
        gridHelper,
        neuronParticles,
        clock,
        animationId: null,
        textSprites
      };
      
      // Handle window resize
      const handleResize = () => {
        if (!threeContainerRef.current || !sceneRef.current) return;
        
        const width = threeContainerRef.current.clientWidth;
        const height = threeContainerRef.current.clientHeight;
        
        sceneRef.current.camera.aspect = width / height;
        sceneRef.current.camera.updateProjectionMatrix();
        sceneRef.current.renderer.setSize(width, height);
      };
      
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
    
    // Animation loop
    const animate = () => {
      if (!sceneRef.current) return;
      
      const { scene, camera, renderer, particles, gridHelper, neuronParticles, clock, textSprites } = sceneRef.current;
      
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate particles slowly
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.025;
      
      // Animate neuron particles
      neuronParticles.rotation.y = elapsedTime * 0.03;
      neuronParticles.rotation.z = elapsedTime * 0.01;
      
      // Move grid to create flying effect
      gridHelper.position.z = (elapsedTime * 5) % 20 - 10;
      
      // Animate text sprites
      textSprites.forEach((sprite, i) => {
        const speed = 0.2 + (i % 5) * 0.05;
        sprite.position.y += Math.sin(elapsedTime * speed) * 0.02;
        sprite.position.x += Math.cos(elapsedTime * speed * 0.7) * 0.01;
        
        // Reset position if sprite goes too far
        if (Math.abs(sprite.position.x) > 60 || Math.abs(sprite.position.y) > 60 || Math.abs(sprite.position.z) > 60) {
          sprite.position.set(
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80
          );
        }
      });
      
      // Add slight camera movement for more immersion
      camera.position.x = Math.sin(elapsedTime * 0.2) * 2;
      camera.position.y = 5 + Math.sin(elapsedTime * 0.1) * 1;
      camera.lookAt(0, 0, 0);
      
      // Render scene
      renderer.render(scene, camera);
      
      // Continue animation loop
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup function
    return () => {
      if (sceneRef.current && sceneRef.current.animationId !== null) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      
      if (sceneRef.current && sceneRef.current.renderer) {
        threeContainerRef.current?.removeChild(sceneRef.current.renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="min-h-[85vh] relative overflow-hidden preserve-3d perspective-2000">
      {/* THREE.js 3D Immersive Background */}
      <div 
        ref={threeContainerRef} 
        className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-50/80 via-violet-50/60 to-purple-50/80 dark:from-indigo-950/80 dark:via-violet-950/60 dark:to-purple-950/80"
      />
      
      {/* Content container */}
      <div className="container mx-auto px-4 py-12 md:py-16 flex flex-col-reverse lg:flex-row items-center justify-between relative z-10">
        {/* Left side - Main content */}
        <HeroContent handleExamReadinessClick={handleExamReadinessClick} />
        
        {/* Right side - Dashboard Preview and 3D animation */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center mb-8 lg:mb-0">
          {/* Dashboard Preview */}
          <DashboardPreview />
          
          {/* 3D animation */}
          <div className="relative w-full max-w-xl aspect-square">
            <AnimatePresence mode="wait">
              <motion.div
                key={animations[currentAnimationIndex]}
                initial={{ opacity: 0, x: 100, rotateY: -15 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: 15 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
              >
                <motion.img 
                  src={animations[currentAnimationIndex]} 
                  alt="Educational concept animation" 
                  className="w-full h-full object-contain"
                  animate={{
                    rotateY: [0, 5, 0, -5, 0],
                    rotateX: [0, 3, 0, -3, 0],
                    z: [0, 10, 0, -10, 0]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  style={{ transformStyle: 'preserve-3d' }}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* 3D Glow effect behind animation */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-2xl"
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.7, 0.3],
                rotate: [0, 360]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Animation indicator dots */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-2 pb-4">
              {animations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentAnimationIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentAnimationIndex 
                      ? "bg-indigo-600 w-6"
                      : "bg-gray-300 dark:bg-gray-700"
                  }`}
                  aria-label={`View animation ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero3DSection;
