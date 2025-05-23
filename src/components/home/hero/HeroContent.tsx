
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

  // Enhanced 3D background with exam success theme
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
    camera.position.z = 25;

    // Renderer with enhanced settings
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Create floating success elements
    const geometries = [];
    
    // Success pathway - floating graduation caps
    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.ConeGeometry(0.8, 1.2, 6);
      const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color().setHSL(0.6 + (i * 0.03), 0.8, 0.7),
        transparent: true,
        opacity: 0.4,
        shininess: 120
      });
      const cone = new THREE.Mesh(geometry, material);
      
      const angle = (i / 8) * Math.PI * 2;
      cone.position.x = Math.cos(angle) * 18;
      cone.position.y = Math.sin(angle) * 8;
      cone.position.z = (i - 4) * 2;
      
      geometries.push(cone);
      scene.add(cone);
    }

    // Knowledge crystals - diamond shapes
    for (let i = 0; i < 12; i++) {
      const geometry = new THREE.OctahedronGeometry(1);
      const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color().setHSL(0.15 + (i * 0.02), 0.9, 0.8),
        transparent: true,
        opacity: 0.3,
        shininess: 200
      });
      const crystal = new THREE.Mesh(geometry, material);
      
      crystal.position.x = (Math.random() - 0.5) * 35;
      crystal.position.y = (Math.random() - 0.5) * 20;
      crystal.position.z = (Math.random() - 0.5) * 15;
      
      geometries.push(crystal);
      scene.add(crystal);
    }

    // Achievement rings - success symbols
    for (let i = 0; i < 6; i++) {
      const geometry = new THREE.RingGeometry(2, 3, 16);
      const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color().setHSL(0.3 + (i * 0.05), 0.9, 0.7),
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(geometry, material);
      
      ring.position.x = (Math.random() - 0.5) * 25;
      ring.position.y = (Math.random() - 0.5) * 15;
      ring.position.z = (Math.random() - 0.5) * 10;
      ring.rotation.x = Math.random() * Math.PI;
      ring.rotation.y = Math.random() * Math.PI;
      
      geometries.push(ring);
      scene.add(ring);
    }

    // Floating text elements (books/knowledge)
    for (let i = 0; i < 5; i++) {
      const geometry = new THREE.BoxGeometry(2, 0.3, 1.5);
      const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color().setHSL(0.8, 0.7, 0.6),
        transparent: true,
        opacity: 0.4
      });
      const book = new THREE.Mesh(geometry, material);
      
      book.position.x = (Math.random() - 0.5) * 30;
      book.position.y = (Math.random() - 0.5) * 18;
      book.position.z = (Math.random() - 0.5) * 12;
      book.rotation.x = Math.random() * 0.5;
      book.rotation.z = Math.random() * 0.3;
      
      geometries.push(book);
      scene.add(book);
    }

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
    scene.add(ambientLight);
    
    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(15, 10, 8);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Success-themed accent lights
    const successLight = new THREE.PointLight(0x00ff88, 0.8, 25);
    successLight.position.set(-12, 8, 10);
    scene.add(successLight);
    
    const knowledgeLight = new THREE.PointLight(0x4169E1, 1, 30);
    knowledgeLight.position.set(10, -5, 8);
    scene.add(knowledgeLight);
    
    const achievementLight = new THREE.PointLight(0xFFD700, 0.6, 20);
    achievementLight.position.set(0, 15, 5);
    scene.add(achievementLight);

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

    // Enhanced animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime() * 0.4;
      
      // Graduation caps rotation
      geometries.slice(0, 8).forEach((cone, i) => {
        cone.rotation.x += 0.01;
        cone.rotation.z += 0.008;
        cone.position.y += Math.sin(time + i * 0.8) * 0.02;
      });
      
      // Knowledge crystals floating
      geometries.slice(8, 20).forEach((crystal, i) => {
        crystal.rotation.x += 0.015;
        crystal.rotation.y += 0.012;
        crystal.position.y += Math.sin(time * 0.7 + i * 0.4) * 0.025;
      });
      
      // Achievement rings rotation
      geometries.slice(20, 26).forEach((ring, i) => {
        ring.rotation.z += 0.008 + (i * 0.002);
        ring.position.x += Math.cos(time * 0.3 + i) * 0.01;
      });
      
      // Books gentle movement
      geometries.slice(26).forEach((book, i) => {
        book.rotation.y += 0.005;
        book.position.z += Math.sin(time * 0.5 + i * 0.6) * 0.015;
      });
      
      // Dynamic lighting
      successLight.position.x = Math.sin(time * 0.4) * 20;
      knowledgeLight.position.z = Math.cos(time * 0.3) * 15;
      achievementLight.intensity = 0.6 + Math.sin(time * 0.8) * 0.2;
      
      // Smooth camera response to mouse
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.015;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.015;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', mouseMoveHandler);
      
      geometries.forEach(mesh => {
        scene.remove(mesh);
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      
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
          opacity: 0.7
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

      {/* Enhanced NEET Live Now Badge */}
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
        className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6"
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

      {/* COMPACT 5 KEY BENEFITS SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mb-6 p-4 rounded-xl border-2 border-blue-200 dark:border-blue-800/50 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 shadow-lg"
      >
        <motion.h3 
          className="text-center font-bold text-lg text-blue-800 dark:text-blue-300 mb-3"
          animate={{ 
            scale: [1, 1.02, 1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🎯 Five Key Benefits For Your Success 🎯
        </motion.h3>
        
        <div className="grid grid-cols-5 gap-2">
          {[
            { icon: "🏆", label: "Confidence Builder", color: "bg-gradient-to-br from-green-500 to-emerald-600" },
            { icon: "🎓", label: "Exam Success", color: "bg-gradient-to-br from-blue-500 to-blue-700" },
            { icon: "⚡", label: "Time Saver", color: "bg-gradient-to-br from-amber-500 to-yellow-600" },
            { icon: "🧘", label: "Stress-Free", color: "bg-gradient-to-br from-purple-500 to-purple-700" },
            { icon: "😊", label: "Happy Learning", color: "bg-gradient-to-br from-pink-500 to-rose-600" }
          ].map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
              whileHover={{ 
                scale: 1.05, 
                y: -3
              }}
              className={`${benefit.color} text-white rounded-lg py-2 px-2 flex flex-col items-center justify-center gap-1 shadow-md hover:shadow-lg transition-all duration-300 text-center cursor-pointer`}
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: idx * 0.5
                }}
                className="text-xl bg-white/20 rounded-full p-1"
              >
                {benefit.icon}
              </motion.div>
              <span className="font-bold text-xs">{benefit.label}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Success Mindset Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mb-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-950/30 rounded-lg p-3 border border-indigo-100 dark:border-indigo-800/30 shadow-inner"
      >
        <p className="text-base text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          Transform your exam journey with our <span className="font-semibold text-indigo-700 dark:text-indigo-400">AI-driven platform</span> for comprehensive exam success.
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
