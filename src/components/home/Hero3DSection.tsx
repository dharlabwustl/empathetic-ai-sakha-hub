
import React, { useState, useEffect, useRef } from 'react';
import HeroContent from './hero/HeroContent';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// Array of 3D animation paths
const animations = [
  "/animations/brain-animation.svg",
  "/animations/student-success.svg",
  "/animations/learning-journey.svg",
  "/animations/exam-prep.svg"
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
    clock: THREE.Clock;
    animationId: number | null;
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

  // Initialize and animate THREE.js scene
  useEffect(() => {
    if (!threeContainerRef.current) return;
    
    // Initialize THREE.js scene if not already created
    if (!sceneRef.current) {
      const container = threeContainerRef.current;
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      // Create scene, camera, renderer
      const scene = new THREE.Scene();
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
      
      // Create immersive grid
      const gridHelper = new THREE.GridHelper(200, 40, 0x3730a3, 0x4338ca);
      gridHelper.position.y = -10;
      gridHelper.rotation.x = Math.PI / 2;
      scene.add(gridHelper);
      
      // Create particle system
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 500;
      
      const posArray = new Float32Array(particlesCount * 3);
      const scaleArray = new Float32Array(particlesCount);
      
      for (let i = 0; i < particlesCount * 3; i+=3) {
        // Position particles in a sphere
        const radius = 50 * Math.random() + 20;
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
        size: 0.5,
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });
      
      // Create particle system
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      
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
      
      const clock = new THREE.Clock();
      
      sceneRef.current = {
        scene,
        camera,
        renderer,
        particles,
        gridHelper,
        clock,
        animationId: null
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
      
      const { scene, camera, renderer, particles, gridHelper, clock } = sceneRef.current;
      
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate particles slowly
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.025;
      
      // Move grid to create flying effect
      gridHelper.position.z = (elapsedTime * 5) % 20 - 10;
      
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
        
        {/* Right side - 3D animation */}
        <div className="w-full lg:w-1/2 flex justify-center items-center mb-8 lg:mb-0">
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
