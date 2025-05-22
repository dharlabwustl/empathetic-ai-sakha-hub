
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
    educationSymbols: THREE.Group;
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

  // Create and initialize educational symbols for the scene
  const createEducationSymbols = () => {
    if (!sceneRef.current) return;
    
    const group = new THREE.Group();
    const symbolCount = 30;
    
    // Educational symbols and shapes
    const symbolGeometries = [
      // Small book shape
      new THREE.BoxGeometry(0.8, 0.1, 1),
      // Graduation cap shape with cylinder and cone
      new THREE.ConeGeometry(0.5, 0.5, 4),
      // Pencil shape
      new THREE.CylinderGeometry(0.1, 0.1, 1.5, 6),
      // Molecule shape (sphere)
      new THREE.SphereGeometry(0.3, 8, 8),
      // Test tube shape
      new THREE.CylinderGeometry(0.15, 0.15, 1, 8),
      // Formula symbol (thin box)
      new THREE.BoxGeometry(1, 0.05, 0.05),
      // Calculator shape
      new THREE.BoxGeometry(0.6, 0.8, 0.1),
      // Atom core (small sphere)
      new THREE.SphereGeometry(0.2, 16, 16),
      // Certificate shape
      new THREE.PlaneGeometry(0.8, 1),
      // Microscope base
      new THREE.CylinderGeometry(0.3, 0.4, 0.3, 8)
    ];
    
    // Materials with soft colors and translucency
    const materials = [
      new THREE.MeshPhongMaterial({ color: 0x6d28d9, transparent: true, opacity: 0.7 }), // Purple
      new THREE.MeshPhongMaterial({ color: 0x4f46e5, transparent: true, opacity: 0.6 }), // Indigo
      new THREE.MeshPhongMaterial({ color: 0x3b82f6, transparent: true, opacity: 0.7 }), // Blue
      new THREE.MeshPhongMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.6 }), // Violet
      new THREE.MeshPhongMaterial({ color: 0xa855f7, transparent: true, opacity: 0.7 }), // Purple
    ];
    
    // Create symbols and add to group
    for (let i = 0; i < symbolCount; i++) {
      // Pick random geometry and material
      const geometry = symbolGeometries[Math.floor(Math.random() * symbolGeometries.length)];
      const material = materials[Math.floor(Math.random() * materials.length)];
      
      // Create mesh
      const symbol = new THREE.Mesh(geometry, material);
      
      // Position randomly in scene space
      symbol.position.set(
        (Math.random() - 0.5) * 100, // x
        (Math.random() - 0.5) * 100, // y
        (Math.random() - 0.5) * 100  // z
      );
      
      // Random rotation
      symbol.rotation.set(
        Math.random() * Math.PI, 
        Math.random() * Math.PI, 
        Math.random() * Math.PI
      );
      
      // Store initial position for animation
      (symbol as any).initialY = symbol.position.y;
      (symbol as any).initialX = symbol.position.x;
      (symbol as any).initialZ = symbol.position.z;
      
      // Random scale
      const scale = Math.random() * 0.5 + 0.5;
      symbol.scale.set(scale, scale, scale);
      
      // Add to group
      group.add(symbol);
    }
    
    // Add formula rings (electron paths)
    for (let i = 0; i < 8; i++) {
      const radius = Math.random() * 10 + 5;
      const tubeRadius = 0.06;
      const radialSegments = 8;
      const tubularSegments = 50;
      
      const geometry = new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments);
      const material = new THREE.MeshPhongMaterial({ 
        color: 0x8b5cf6, 
        transparent: true, 
        opacity: 0.3 + Math.random() * 0.3 
      });
      
      const torus = new THREE.Mesh(geometry, material);
      
      // Random position
      torus.position.set(
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80
      );
      
      // Random rotation
      torus.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );
      
      group.add(torus);
    }
    
    sceneRef.current.scene.add(group);
    sceneRef.current.educationSymbols = group;
  };

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
      
      // Add fog for depth
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
      
      // Create immersive grid with more depth
      const gridHelper = new THREE.GridHelper(500, 100, 0x3730a3, 0x4338ca);
      gridHelper.position.y = -10;
      gridHelper.rotation.x = Math.PI / 2;
      scene.add(gridHelper);
      
      // Create particle system
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 1500;
      
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
      const neuronCount = 250;
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
      const connections = 150;
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
        educationSymbols: new THREE.Group(), // Initialize with empty group
        clock,
        animationId: null
      };
      
      // Create education symbols
      createEducationSymbols();
      
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
      
      const { scene, camera, renderer, particles, gridHelper, neuronParticles, educationSymbols, clock } = sceneRef.current;
      
      const elapsedTime = clock.getElapsedTime();
      
      // Rotate particles slowly
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.025;
      
      // Animate neuron particles
      neuronParticles.rotation.y = elapsedTime * 0.03;
      neuronParticles.rotation.z = elapsedTime * 0.01;
      
      // Move grid to create flying effect
      gridHelper.position.z = (elapsedTime * 5) % 20 - 10;
      
      // Add slight camera movement for more immersion
      camera.position.x = Math.sin(elapsedTime * 0.2) * 2;
      camera.position.y = 5 + Math.sin(elapsedTime * 0.1) * 1;
      camera.lookAt(0, 0, 0);
      
      // Animate educational symbols
      educationSymbols.children.forEach((symbol: THREE.Object3D) => {
        if ((symbol as any).initialY !== undefined) {
          // Float up and down
          symbol.position.y = (symbol as any).initialY + Math.sin(elapsedTime + (symbol as any).initialY * 5) * 2;
          // Gentle rotation
          symbol.rotation.x += 0.002;
          symbol.rotation.y += 0.003;
          // Subtle left-right movement
          symbol.position.x = (symbol as any).initialX + Math.sin(elapsedTime * 0.5 + (symbol as any).initialX) * 0.5;
        }
      });
      
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
      
      {/* Floating particles overlay */}
      <div className="absolute inset-0 pointer-events-none z-[5] overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-indigo-500/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              scale: Math.random() * 0.5 + 0.5,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 40 - 20, 0],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero3DSection;
