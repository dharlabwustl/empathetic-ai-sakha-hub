import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ExamNamesBadge from './ExamNamesBadge';
import * as THREE from 'three';

interface HeroContentProps {
  handleExamReadinessClick: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ handleExamReadinessClick }) => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  
  const handleFreeTrialClick = () => {
    navigate('/signup');
  };

  // Enhanced 3D background with more particles, better colors, and dynamic movement
  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.z = 30;

    // Renderer with enhanced settings
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      precision: "highp"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Create particles with enhanced count and colors
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2500; // Increased particle count
    const posArray = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position with more depth variation
      posArray[i] = (Math.random() - 0.5) * 70;
      posArray[i+1] = (Math.random() - 0.5) * 70;
      posArray[i+2] = (Math.random() - 0.5) * 70;

      // Enhanced color palette - purple to blue gradient with more vibrant colors
      const colorChoice = Math.random();
      if (colorChoice < 0.3) {
        // Blue shades
        colors[i] = 0.2 + Math.random() * 0.1; // R
        colors[i+1] = 0.3 + Math.random() * 0.2; // G
        colors[i+2] = 0.7 + Math.random() * 0.3; // B
      } else if (colorChoice < 0.6) {
        // Purple shades
        colors[i] = 0.4 + Math.random() * 0.2; // R
        colors[i+1] = 0.1 + Math.random() * 0.1; // G
        colors[i+2] = 0.6 + Math.random() * 0.4; // B
      } else {
        // Indigo shades
        colors[i] = 0.3 + Math.random() * 0.1; // R
        colors[i+1] = 0.2 + Math.random() * 0.1; // G
        colors[i+2] = 0.8 + Math.random() * 0.2; // B
      }
      
      // Varied particle sizes
      sizes[i/3] = Math.random() * 3 + 0.5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Enhanced material with custom shaders for better particles
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    });

    // Points
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Add some soft lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);
    
    // Add directional light for better depth
    const directionalLight = new THREE.DirectionalLight(0x9090ff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Animate on mouse movement with enhanced response
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const mouseMoveHandler = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener('mousemove', mouseMoveHandler);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation loop with smoother movements
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth mouse tracking
      targetX = mouseX * 0.2;
      targetY = mouseY * 0.2;
      
      // Base rotation
      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.z += 0.0003;
      
      // Enhanced response to mouse movement with easing
      particlesMesh.rotation.x += (targetY - particlesMesh.rotation.x) * 0.03;
      particlesMesh.rotation.y += (targetX - particlesMesh.rotation.y) * 0.03;
      
      // Dynamic particle movement
      const positions = particlesMesh.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        // Add subtle wave effect
        const x = positions[i];
        const y = positions[i+1];
        const z = positions[i+2];
        
        const time = Date.now() * 0.0001;
        positions[i] = x + Math.sin(time + x * 0.1) * 0.05;
        positions[i+1] = y + Math.cos(time + y * 0.1) * 0.05;
        positions[i+2] = z + Math.sin(time + z * 0.1) * 0.05;
      }
      particlesMesh.geometry.attributes.position.needsUpdate = true;
      
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', mouseMoveHandler);
      
      scene.remove(particlesMesh);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="w-full lg:w-1/2 pt-4 lg:pt-0 lg:pr-8 relative z-20"
    >
      {/* Enhanced 3D Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full -z-10"
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          pointerEvents: 'none',
          opacity: 0.7 // Increased opacity for better visibility
        }}
      />

      {/* Premium Experience Badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="absolute -top-2 -right-2 md:top-0 md:-right-8 z-30 transform rotate-12"
      >
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-1 rounded-lg shadow-lg flex items-center gap-2">
          <span className="font-bold text-sm">PREMIUM</span>
        </div>
      </motion.div>

      {/* Enhanced NEET Live Now Glowing Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-4 inline-block"
      >
        <motion.div 
          className="bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 shadow-lg relative overflow-hidden"
          animate={{ 
            boxShadow: ["0 0 10px rgba(16, 185, 129, 0.5)", "0 0 25px rgba(16, 185, 129, 0.8)", "0 0 10px rgba(16, 185, 129, 0.5)"] 
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))" // Extra glow effect
          }}
        >
          {/* Enhanced pulsating dot */}
          <motion.span 
            className="h-2.5 w-2.5 bg-white rounded-full"
            animate={{ 
              opacity: [1, 0.4, 1],
              scale: [1, 1.3, 1],
              boxShadow: ["0 0 0px rgba(255,255,255,0.8)", "0 0 10px rgba(255,255,255,0.9)", "0 0 0px rgba(255,255,255,0.8)"]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          {/* Glowing text */}
          <motion.span
            animate={{ 
              textShadow: [
                "0 0 5px rgba(255,255,255,0.5)",
                "0 0 10px rgba(255,255,255,0.8)",
                "0 0 5px rgba(255,255,255,0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-bold"
          >
            NEET is live now!
          </motion.span>
          
          {/* Enhanced glowing overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-25"
            animate={{
              left: ["-100%", "100%"],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Welcome Message - New Position */}
      <motion.div
        className="mb-4 text-xl md:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Welcome to PREPZR - We are world's first emotionally aware, hyper personalized an adaptive exam prep platform.
      </motion.div>

      <motion.h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <span className="relative inline-block">
          <motion.span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600"
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          >
            We understand your mindset,
          </motion.span>
          <motion.span
            className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          />
        </span>
        <br />
        <motion.span 
          className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
          }}
          transition={{ duration: 15, delay: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          not just the exam
        </motion.span>
      </motion.h1>

      {/* Emotional Connection Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-950/30 rounded-lg p-3 border border-indigo-100 dark:border-indigo-800/30 shadow-inner"
      >
        <p className="text-base text-gray-700 dark:text-gray-300">
          Our <span className="font-semibold text-indigo-700 dark:text-indigo-400">AI-driven platform</span> is specifically designed for Indian competitive exams like 
          <span className="font-semibold text-purple-700 dark:text-purple-400"> NEET, JEE, UPSC, and CAT</span>.
        </p>
      </motion.div>
      
      {/* Improved Exam Names Badge */}
      <ExamNamesBadge />

      {/* CTA Buttons */}
      <div className="space-y-4 mt-6">
        {/* Primary CTA */}
        <motion.button
          onClick={handleFreeTrialClick}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="mr-2">Your first 7 days of free exam preparation are on us</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
        
        {/* Secondary CTA */}
        <motion.button
          onClick={handleExamReadinessClick}
          className="w-full border-2 border-purple-300 hover:border-purple-400 dark:border-purple-700 dark:hover:border-purple-600 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 py-3 px-6 rounded-xl flex items-center justify-center"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Analyze Your Exam Readiness
        </motion.button>
      </div>
      
      {/* Active Users */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mt-4 text-center"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Join <span className="font-medium text-indigo-600 dark:text-indigo-400">2 million+</span> students already on their path to success
        </p>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
