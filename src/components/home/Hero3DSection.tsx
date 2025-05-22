
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
    neuronParticles: THREE.Points;
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
      
      // Add more vibrant fog for depth
      scene.fog = new THREE.FogExp2(0x4338ca, 0.0025);
      
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
      
      // Create immersive grid with more depth and visual impact
      const gridHelper = new THREE.GridHelper(800, 100, 0x3730a3, 0x4338ca);
      gridHelper.position.y = -10;
      gridHelper.rotation.x = Math.PI / 2;
      scene.add(gridHelper);
      
      // Create particle system with more particles
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 2000; // Increased for more impact
      
      const posArray = new Float32Array(particlesCount * 3);
      const scaleArray = new Float32Array(particlesCount);
      const colorArray = new Float32Array(particlesCount * 3);
      
      for (let i = 0; i < particlesCount * 3; i+=3) {
        // Position particles in a sphere
        const radius = 120 * Math.random() + 30;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        
        posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
        posArray[i+1] = radius * Math.sin(phi) * Math.sin(theta);
        posArray[i+2] = radius * Math.cos(phi);
        
        // Random scale for particles
        scaleArray[i/3] = Math.random() * 2 + 0.5;
        
        // Graduated color array - blue/purple hues
        colorArray[i] = 0.3 + Math.random() * 0.3; // R
        colorArray[i+1] = 0.3 + Math.random() * 0.5; // G
        colorArray[i+2] = 0.7 + Math.random() * 0.3; // B
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
      particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
      
      // Create shader material for particles with custom colors
      const particlesMaterial = new THREE.PointsMaterial({
        size: 0.8,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });
      
      // Create particle system
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      
      // Add neuron-like particles that connect with lines
      const neuronCount = 300; // Increased for more connections
      const neuronGeometry = new THREE.BufferGeometry();
      const neuronPositions = new Float32Array(neuronCount * 3);
      
      for (let i = 0; i < neuronCount * 3; i += 3) {
        neuronPositions[i] = (Math.random() - 0.5) * 150;
        neuronPositions[i + 1] = (Math.random() - 0.5) * 150;
        neuronPositions[i + 2] = (Math.random() - 0.5) * 150;
      }
      
      neuronGeometry.setAttribute('position', new THREE.BufferAttribute(neuronPositions, 3));
      
      const neuronMaterial = new THREE.PointsMaterial({
        size: 1.5,
        color: 0x6d28d9,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });
      
      const neuronParticles = new THREE.Points(neuronGeometry, neuronMaterial);
      scene.add(neuronParticles);
      
      // Create neural connections - more of them
      const connections = 250; // Increased for more visual complexity
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
        
        if (distance < 60) { // Increased connection distance
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(x1, y1, z1),
            new THREE.Vector3(x2, y2, z2)
          ]);
          
          // Randomize color for more visual impact
          const hue = 0.7 + Math.random() * 0.2; // Blue-purple range
          const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
          
          const lineMaterial = new THREE.LineBasicMaterial({ 
            color: color,
            transparent: true,
            opacity: 0.2 + Math.random() * 0.3
          });
          
          const line = new THREE.Line(lineGeometry, lineMaterial);
          scene.add(line);
        }
      }
      
      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); // Brighter
      scene.add(ambientLight);
      
      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0x8b5cf6, 1.2); // Brighter
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
      
      // Add a soft point light
      const pointLight = new THREE.PointLight(0x4c1d95, 2.5, 70); // More range
      pointLight.position.set(0, 10, 10);
      scene.add(pointLight);
      
      // Add a second moving light
      const movingLight = new THREE.PointLight(0x3730a3, 2, 120); // More range
      movingLight.position.set(30, 0, 30);
      scene.add(movingLight);
      
      // Add a third colored light for more dynamic lighting
      const coloredLight = new THREE.PointLight(0x9333ea, 2, 100);
      coloredLight.position.set(-20, -10, 40);
      scene.add(coloredLight);
      
      // Add volumetric light beam effect (fake with cylinder)
      const beamGeometry = new THREE.CylinderGeometry(0, 4, 30, 32, 1, true);
      const beamMaterial = new THREE.MeshBasicMaterial({
        color: 0x6d28d9,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });
      const beam = new THREE.Mesh(beamGeometry, beamMaterial);
      beam.position.set(-15, 20, -40);
      beam.rotation.x = Math.PI / 2;
      scene.add(beam);
      
      const clock = new THREE.Clock();
      
      sceneRef.current = {
        scene,
        camera,
        renderer,
        particles,
        gridHelper,
        neuronParticles,
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
      
      const { scene, camera, renderer, particles, gridHelper, neuronParticles, clock } = sceneRef.current;
      
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate particles slowly
      particles.rotation.y = elapsedTime * 0.07; // Increased speed
      particles.rotation.x = elapsedTime * 0.03; // Increased speed
      
      // Animate neuron particles
      neuronParticles.rotation.y = elapsedTime * 0.04; // Increased speed
      neuronParticles.rotation.z = elapsedTime * 0.02; // Increased speed
      
      // Move grid to create flying effect - faster
      gridHelper.position.z = (elapsedTime * 8) % 20 - 10; // Increased speed
      
      // Add waves to particles for organic movement
      const positions = particles.geometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = positions.getZ(i);
        
        // Apply wave effect based on position and time
        const waveX = Math.sin(x * 0.05 + elapsedTime * 0.2) * 2;
        const waveY = Math.cos(y * 0.05 + elapsedTime * 0.15) * 2;
        
        positions.setZ(i, z + waveX + waveY);
      }
      positions.needsUpdate = true;
      
      // Add slight camera movement for more immersion
      camera.position.x = Math.sin(elapsedTime * 0.2) * 3;
      camera.position.y = 5 + Math.sin(elapsedTime * 0.1) * 2;
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
    <section className="min-h-[90vh] relative overflow-hidden preserve-3d perspective-2000">
      {/* THREE.js 3D Immersive Background */}
      <div 
        ref={threeContainerRef} 
        className="absolute inset-0 z-0 bg-gradient-to-br from-indigo-950/90 via-violet-950/80 to-purple-950/90 dark:from-indigo-950/90 dark:via-violet-950/80 dark:to-purple-950/90"
      />
      
      {/* Additional animated elements for more immersion */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-3xl"
            style={{
              width: Math.random() * 400 + 100,
              height: Math.random() * 400 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 20 + Math.random() * 10,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
      {/* Light rays */}
      <div className="absolute inset-0 z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            className="absolute top-0 bg-gradient-to-b from-indigo-500/20 to-transparent"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 300 + 200,
              left: `${i * 20 + Math.random() * 10}%`,
              transform: `rotate(${Math.random() * 20 - 10}deg)`,
              transformOrigin: 'top',
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              height: [300, 400, 300],
            }}
            transition={{
              repeat: Infinity,
              duration: 8 + Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      
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
              className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl"
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.5, 0.8, 0.5],
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
