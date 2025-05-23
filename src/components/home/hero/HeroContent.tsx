
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, Sparkles, GraduationCap, Award, TrendingUp } from 'lucide-react';
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

  // Enhanced 3D background animation focused on exam success theme
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
    camera.position.z = 40;

    // Renderer with improved settings
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Create exam-themed geometric shapes
    const geometries = [];
    
    // Success path - curved line of golden cubes
    for (let i = 0; i < 15; i++) {
      const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color().setHSL(0.15, 0.8, 0.6 + (i * 0.02)), // Golden gradient
        transparent: true,
        opacity: 0.7
      });
      const cube = new THREE.Mesh(geometry, material);
      
      const angle = (i / 15) * Math.PI * 2;
      cube.position.x = Math.cos(angle) * 25 + Math.sin(angle * 2) * 5;
      cube.position.y = Math.sin(angle) * 15 + Math.cos(angle * 3) * 3;
      cube.position.z = (i - 7) * 2;
      
      geometries.push(cube);
      scene.add(cube);
    }

    // Knowledge nodes - floating spheres representing concepts
    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.SphereGeometry(0.5, 16, 16);
      const hue = i < 7 ? 0.6 : i < 14 ? 0.75 : 0.9; // Blue to purple spectrum
      const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color().setHSL(hue, 0.7, 0.6),
        transparent: true,
        opacity: 0.6,
        emissive: new THREE.Color().setHSL(hue, 0.3, 0.1)
      });
      const sphere = new THREE.Mesh(geometry, material);
      
      sphere.position.x = (Math.random() - 0.5) * 60;
      sphere.position.y = (Math.random() - 0.5) * 40;
      sphere.position.z = (Math.random() - 0.5) * 30;
      
      geometries.push(sphere);
      scene.add(sphere);
    }

    // Achievement rings - torus shapes for milestone visualization
    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.TorusGeometry(3, 0.3, 8, 20);
      const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color().setHSL(0.1 + (i * 0.05), 0.9, 0.5), // Orange to yellow
        transparent: true,
        opacity: 0.4,
        emissive: new THREE.Color().setHSL(0.1 + (i * 0.05), 0.5, 0.1)
      });
      const torus = new THREE.Mesh(geometry, material);
      
      torus.position.x = (Math.random() - 0.5) * 50;
      torus.position.y = (Math.random() - 0.5) * 30;
      torus.position.z = (Math.random() - 0.5) * 25;
      torus.rotation.x = Math.random() * Math.PI;
      torus.rotation.y = Math.random() * Math.PI;
      
      geometries.push(torus);
      scene.add(torus);
    }

    // Success particles - small tetrahedrons
    const particlesGroup = new THREE.Group();
    for (let i = 0; i < 100; i++) {
      const geometry = new THREE.TetrahedronGeometry(0.2);
      const material = new THREE.MeshBasicMaterial({ 
        color: new THREE.Color().setHSL(0.6 + Math.random() * 0.3, 0.8, 0.7),
        transparent: true,
        opacity: 0.8
      });
      const particle = new THREE.Mesh(geometry, material);
      
      particle.position.x = (Math.random() - 0.5) * 80;
      particle.position.y = (Math.random() - 0.5) * 50;
      particle.position.z = (Math.random() - 0.5) * 40;
      
      particlesGroup.add(particle);
    }
    scene.add(particlesGroup);

    // Enhanced lighting for exam success theme
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
    scene.add(ambientLight);
    
    // Golden success light
    const goldenLight = new THREE.PointLight(0xFFD700, 2, 50);
    goldenLight.position.set(15, 10, 15);
    scene.add(goldenLight);
    
    // Blue knowledge light
    const blueLight = new THREE.PointLight(0x4169E1, 1.5, 40);
    blueLight.position.set(-15, -10, 10);
    scene.add(blueLight);
    
    // Purple innovation light
    const purpleLight = new THREE.PointLight(0x9370DB, 1, 35);
    purpleLight.position.set(0, 15, -10);
    scene.add(purpleLight);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
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

    // Enhanced animation loop with exam success theme
    const clock = new THREE.Clock();
    let time = 0;
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      time = clock.getElapsedTime() * 0.3;
      
      // Rotate success path cubes
      geometries.slice(0, 15).forEach((cube, i) => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.008;
        // Pulsing effect for achievement
        const scale = 1 + Math.sin(time * 2 + i * 0.5) * 0.1;
        cube.scale.setScalar(scale);
      });
      
      // Float knowledge spheres
      geometries.slice(15, 35).forEach((sphere, i) => {
        sphere.position.y += Math.sin(time + i * 0.3) * 0.02;
        sphere.rotation.x += 0.005;
        sphere.rotation.z += 0.003;
      });
      
      // Rotate achievement rings
      geometries.slice(35, 43).forEach((torus, i) => {
        torus.rotation.x += 0.01 + (i * 0.002);
        torus.rotation.y += 0.008 + (i * 0.001);
        torus.rotation.z += 0.005;
      });
      
      // Animate particles
      particlesGroup.children.forEach((particle, i) => {
        particle.rotation.x += 0.02;
        particle.rotation.y += 0.015;
        particle.position.y += Math.sin(time * 1.5 + i * 0.1) * 0.01;
      });
      
      // Dynamic light movement
      goldenLight.position.x = Math.sin(time * 0.7) * 20;
      goldenLight.position.z = Math.cos(time * 0.7) * 20;
      
      blueLight.position.x = Math.cos(time * 0.5) * 25;
      blueLight.position.y = Math.sin(time * 0.8) * 15;
      
      purpleLight.position.y = Math.sin(time * 0.6) * 20;
      purpleLight.position.z = Math.cos(time * 0.9) * 15;
      
      // Responsive to mouse movement
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', mouseMoveHandler);
      
      // Dispose of all geometries and materials
      geometries.forEach(mesh => {
        scene.remove(mesh);
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      
      particlesGroup.children.forEach(particle => {
        particle.geometry.dispose();
        particle.material.dispose();
      });
      scene.remove(particlesGroup);
      
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
          opacity: 0.8
        }}
      />

      {/* Success Achievement Badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="absolute -top-2 -right-2 md:top-0 md:-right-8 z-30 transform rotate-12"
      >
        <div className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white px-4 py-1 rounded-lg shadow-lg flex items-center gap-2">
          <Award className="w-4 h-4" />
          <span className="font-bold text-sm">SUCCESS</span>
        </div>
      </motion.div>

      {/* Enhanced NEET Live Now Badge with exam success theme */}
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
            filter: "drop-shadow(0 0 8px rgba(16, 185, 129, 0.6))"
          }}
        >
          <motion.span 
            className="h-2.5 w-2.5 bg-white rounded-full"
            animate={{ 
              opacity: [1, 0.4, 1],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          <motion.span className="font-bold flex items-center gap-1">
            <GraduationCap className="w-3 h-3" />
            NEET is live now!
          </motion.span>
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-25"
            animate={{
              left: ["-100%", "100%"],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Future Success Message */}
      <motion.div
        className="mb-4 text-xl md:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Welcome to your future success story with PREPZR - The world's first emotionally aware, hyper-personalized exam prep platform.
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

      {/* Success Mindset Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-950/30 rounded-lg p-3 border border-indigo-100 dark:border-indigo-800/30 shadow-inner"
      >
        <p className="text-base text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Transform your exam journey with our <span className="font-semibold text-indigo-700 dark:text-indigo-400">AI-driven platform</span> designed for 
          <span className="font-semibold text-purple-700 dark:text-purple-400"> NEET, JEE, UPSC, and CAT</span> success.
        </p>
      </motion.div>
      
      <ExamNamesBadge />

      {/* Enhanced CTA Buttons */}
      <div className="space-y-4 mt-6">
        <motion.button
          onClick={handleFreeTrialClick}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center group relative overflow-hidden"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <GraduationCap className="mr-2 h-5 w-5" />
          <span className="mr-2">Start Your Success Journey - 7 Days Free</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>
        
        <motion.button
          onClick={handleExamReadinessClick}
          className="w-full border-2 border-purple-300 hover:border-purple-400 dark:border-purple-700 dark:hover:border-purple-600 text-purple-700 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/30 py-3 px-6 rounded-xl flex items-center justify-center group"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Sparkles className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
          Analyze Your Exam Readiness
        </motion.button>
      </div>
      
      {/* Success Community Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="mt-4 text-center"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          Join <span className="font-medium text-indigo-600 dark:text-indigo-400">2 million+</span> students achieving exam success
        </p>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
