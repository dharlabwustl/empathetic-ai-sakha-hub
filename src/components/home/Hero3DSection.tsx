
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
      
      // Add fog for depth - make it more visible and colorful
      scene.fog = new THREE.FogExp2(0x4338ca, 0.002); // Reduced fog density for better visibility
      
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
      
      // Create immersive grid with more depth and visibility
      const gridHelper = new THREE.GridHelper(500, 100, 0x3730a3, 0x4338ca);
      gridHelper.position.y = -10;
      gridHelper.rotation.x = Math.PI / 2;
      scene.add(gridHelper);
      
      // Create particle system with more particles for better visibility
      const particlesGeometry = new THREE.BufferGeometry();
      const particlesCount = 2500; // Increased particle count
      
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
        scaleArray[i/3] = Math.random() * 2.5 + 1;
      }
      
      particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
      
      // Create shader material for particles with higher opacity
      const particlesMaterial = new THREE.PointsMaterial({
        size: 1.8, // Larger particles
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.9, // Increased opacity
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });
      
      // Create particle system
      const particles = new THREE.Points(particlesGeometry, particlesMaterial);
      scene.add(particles);
      
      // Add neuron-like particles that connect with lines
      const neuronCount = 500; // Increased for more connections
      const neuronGeometry = new THREE.BufferGeometry();
      const neuronPositions = new Float32Array(neuronCount * 3);
      
      for (let i = 0; i < neuronCount * 3; i += 3) {
        neuronPositions[i] = (Math.random() - 0.5) * 100;
        neuronPositions[i + 1] = (Math.random() - 0.5) * 100;
        neuronPositions[i + 2] = (Math.random() - 0.5) * 100;
      }
      
      neuronGeometry.setAttribute('position', new THREE.BufferAttribute(neuronPositions, 3));
      
      const neuronMaterial = new THREE.PointsMaterial({
        size: 2.0, // Larger neuron points
        color: 0x4c1d95,
        transparent: true,
        opacity: 0.95, // Increased opacity
        blending: THREE.AdditiveBlending
      });
      
      const neuronParticles = new THREE.Points(neuronGeometry, neuronMaterial);
      scene.add(neuronParticles);
      
      // Create neural connections with more visibility
      const connections = 250; // Increased number of connections
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
            opacity: 0.6 + Math.random() * 0.4 // Increased line opacity
          });
          
          const line = new THREE.Line(lineGeometry, lineMaterial);
          scene.add(line);
        }
      }
      
      // Add education-related symbols
      addEducationSymbols(scene);
      
      // Add exam-specific 3D objects
      addExamObjects(scene);
      
      // Add some ambient light to illuminate the scene - increase brightness
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Brighter ambient light
      scene.add(ambientLight);
      
      // Add directional light for depth - increase intensity
      const directionalLight = new THREE.DirectionalLight(0x8b5cf6, 1.8); // Increased intensity
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
      
      // Add a soft point light for aesthetics - increase intensity
      const pointLight = new THREE.PointLight(0x4c1d95, 4, 70); // Increased intensity
      pointLight.position.set(0, 10, 10);
      scene.add(pointLight);
      
      // Add a second moving light
      const movingLight = new THREE.PointLight(0x3730a3, 3, 120); // Increased intensity
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
    
    // Function to add education symbols
    function addEducationSymbols(scene: THREE.Scene) {
      // Add floating educational symbols
      const symbolGeometries = [
        new THREE.TorusGeometry(3, 1, 16, 100), // Atom-like
        new THREE.TetrahedronGeometry(3), // Pyramid
        new THREE.OctahedronGeometry(3), // Diamond
        new THREE.IcosahedronGeometry(3), // Complex shape
        new THREE.BoxGeometry(3, 4, 1), // Book
        new THREE.CylinderGeometry(0, 3, 4, 32) // Pencil tip
      ];
      
      const symbolMaterials = [
        new THREE.MeshPhongMaterial({ 
          color: 0x6d28d9, 
          transparent: true, 
          opacity: 0.8,
          shininess: 100 // Added shininess for better visibility
        }),
        new THREE.MeshPhongMaterial({ 
          color: 0x4c1d95, 
          transparent: true, 
          opacity: 0.8,
          shininess: 100
        }),
        new THREE.MeshPhongMaterial({ 
          color: 0x8b5cf6, 
          transparent: true, 
          opacity: 0.8,
          shininess: 100
        }),
        new THREE.MeshPhongMaterial({ 
          color: 0xc4b5fd, 
          transparent: true, 
          opacity: 0.8,
          shininess: 100
        }),
        new THREE.MeshPhongMaterial({ 
          color: 0x7c3aed, 
          transparent: true, 
          opacity: 0.8,
          shininess: 100
        })
      ];
      
      for (let i = 0; i < 15; i++) { // Increased number of symbols
        const geometryIndex = Math.floor(Math.random() * symbolGeometries.length);
        const materialIndex = Math.floor(Math.random() * symbolMaterials.length);
        
        const symbol = new THREE.Mesh(
          symbolGeometries[geometryIndex],
          symbolMaterials[materialIndex]
        );
        
        // Position randomly in the scene
        symbol.position.set(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        );
        
        symbol.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        
        // Add animation data as user data
        symbol.userData = {
          rotationSpeed: {
            x: (Math.random() - 0.5) * 0.01,
            y: (Math.random() - 0.5) * 0.01,
            z: (Math.random() - 0.5) * 0.01
          },
          floatSpeed: 0.05 + Math.random() * 0.1,
          floatOffset: Math.random() * Math.PI * 2
        };
        
        scene.add(symbol);
      }
    }
    
    // Function to add exam-specific 3D objects
    function addExamObjects(scene: THREE.Scene) {
      // Create test paper and pen 3D models
      
      // Test paper
      const paperGeometry = new THREE.BoxGeometry(10, 12, 0.2);
      const paperMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffffff,
        shininess: 50,
        specular: 0x555555
      });
      
      const paperMesh = new THREE.Mesh(paperGeometry, paperMaterial);
      paperMesh.position.set(-15, 5, -10);
      paperMesh.rotation.set(-0.2, 0.3, 0.1);
      scene.add(paperMesh);
      
      // Add lines to simulate text on paper
      const linesMaterial = new THREE.LineBasicMaterial({ color: 0x333333 });
      
      for (let i = 0; i < 8; i++) {
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(-4, 5 - i * 1.2, 0.15),
          new THREE.Vector3(4, 5 - i * 1.2, 0.15)
        ]);
        
        const line = new THREE.Line(lineGeometry, linesMaterial);
        paperMesh.add(line);
      }
      
      // Calculator
      const calcGeometry = new THREE.BoxGeometry(5, 7, 1);
      const calcMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x222222,
        shininess: 70,
        specular: 0x888888
      });
      
      const calcMesh = new THREE.Mesh(calcGeometry, calcMaterial);
      calcMesh.position.set(18, -5, 5);
      calcMesh.rotation.set(0.2, -0.1, 0.1);
      scene.add(calcMesh);
      
      // Add calculator buttons
      const buttonMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x444444,
        shininess: 100,
        specular: 0xffffff
      });
      
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          const buttonGeometry = new THREE.BoxGeometry(1, 1, 0.3);
          const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
          button.position.set(-1.5 + j * 1.5, 2 - i * 1.5, 0.6);
          calcMesh.add(button);
        }
      }
      
      // Add diplomas/certificates floating
      const diplomaGeometry = new THREE.CylinderGeometry(0.5, 0.5, 8, 16);
      const diplomaMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xffe0b2,
        shininess: 60,
        specular: 0x666666
      });
      
      for (let i = 0; i < 5; i++) {
        const diploma = new THREE.Mesh(diplomaGeometry, diplomaMaterial);
        diploma.position.set(
          (Math.random() - 0.5) * 80,
          (Math.random() - 0.5) * 80, 
          (Math.random() - 0.5) * 80
        );
        
        diploma.rotation.set(
          Math.PI/2, 
          Math.random() * Math.PI, 
          Math.random() * Math.PI/4
        );
        
        // Add ribbon to diploma
        const ribbonGeometry = new THREE.TorusKnotGeometry(1, 0.2, 64, 8, 2, 3);
        const ribbonMaterial = new THREE.MeshPhongMaterial({ color: 0xff5252 });
        const ribbon = new THREE.Mesh(ribbonGeometry, ribbonMaterial);
        ribbon.scale.set(0.3, 0.3, 0.3);
        ribbon.position.y = 4;
        diploma.add(ribbon);
        
        // Add animation data
        diploma.userData = {
          rotationSpeed: {
            x: 0,
            y: (Math.random() - 0.5) * 0.005,
            z: 0
          },
          floatSpeed: 0.03 + Math.random() * 0.05,
          floatOffset: Math.random() * Math.PI * 2
        };
        
        scene.add(diploma);
      }
    }
    
    // Animation loop
    const animate = () => {
      if (!sceneRef.current) return;
      
      const { scene, camera, renderer, particles, gridHelper, neuronParticles, clock } = sceneRef.current;
      
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
      camera.position.x = Math.sin(elapsedTime * 0.2) * 3; // Increased camera movement
      camera.position.y = 5 + Math.sin(elapsedTime * 0.1) * 2; // Increased movement range
      camera.lookAt(0, 0, 0);
      
      // Animate education symbols and exam objects
      scene.children.forEach(child => {
        if (child instanceof THREE.Mesh && child.userData && child.userData.rotationSpeed) {
          // Rotate symbol
          child.rotation.x += child.userData.rotationSpeed.x;
          child.rotation.y += child.userData.rotationSpeed.y;
          child.rotation.z += child.userData.rotationSpeed.z;
          
          // Float up and down with higher amplitude
          child.position.y += Math.sin(elapsedTime * child.userData.floatSpeed + child.userData.floatOffset) * 0.1;
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
        className="absolute inset-0 z-0"
        style={{
          // Add gradient background that enhances the 3D effect
          background: 'linear-gradient(to bottom right, rgba(79, 70, 229, 0.1) 0%, rgba(109, 40, 217, 0.1) 50%, rgba(147, 51, 234, 0.1) 100%)',
        }}
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
            
            {/* Enhanced 3D Glow effect behind animation */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl"
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.5, 0.9, 0.5],
                rotate: [0, 360]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="absolute w-2 h-2 rounded-full bg-indigo-500/30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    scale: Math.random() * 0.5 + 0.5,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
            
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
      
      {/* Floating elements over the 3D background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Mathematical formulas floating in background */}
        {Array.from({ length: 8 }).map((_, index) => (
          <motion.div
            key={`formula-${index}`}
            className="absolute text-indigo-500/20 dark:text-indigo-400/20 font-mono text-lg md:text-xl lg:text-2xl font-bold"
            style={{
              left: `${Math.random() * 90}%`,
              top: `${Math.random() * 90}%`,
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {['E=mc²', 'F=ma', 'PV=nRT', 'x²+y²=r²', 'a²+b²=c²', 'V=πr²h', 'F=G(m₁m₂)/r²', 'E=hf'][index]}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Hero3DSection;
