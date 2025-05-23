
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

  // Clean and impressive 3D background animation for exam success
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

    // Renderer with optimized settings
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Create clean geometric shapes
    const geometries = [];
    
    // Success pathway - clean floating cubes in formation
    for (let i = 0; i < 12; i++) {
      const geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
      const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color().setHSL(0.6 + (i * 0.02), 0.7, 0.6), // Blue to purple gradient
        transparent: true,
        opacity: 0.3,
        shininess: 100
      });
      const cube = new THREE.Mesh(geometry, material);
      
      const angle = (i / 12) * Math.PI * 2;
      cube.position.x = Math.cos(angle) * 20;
      cube.position.y = Math.sin(angle) * 10;
      cube.position.z = (i - 6) * 3;
      
      geometries.push(cube);
      scene.add(cube);
    }

    // Knowledge spheres - clean floating orbs
    for (let i = 0; i < 8; i++) {
      const geometry = new THREE.SphereGeometry(0.8, 32, 32);
      const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color().setHSL(0.15, 0.8, 0.7), // Golden
        transparent: true,
        opacity: 0.4,
        shininess: 150
      });
      const sphere = new THREE.Mesh(geometry, material);
      
      sphere.position.x = (Math.random() - 0.5) * 40;
      sphere.position.y = (Math.random() - 0.5) * 25;
      sphere.position.z = (Math.random() - 0.5) * 20;
      
      geometries.push(sphere);
      scene.add(sphere);
    }

    // Achievement rings - elegant torus shapes
    for (let i = 0; i < 4; i++) {
      const geometry = new THREE.TorusGeometry(4, 0.5, 16, 100);
      const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color().setHSL(0.3, 0.8, 0.6), // Green success color
        transparent: true,
        opacity: 0.25,
        shininess: 200
      });
      const torus = new THREE.Mesh(geometry, material);
      
      torus.position.x = (Math.random() - 0.5) * 30;
      torus.position.y = (Math.random() - 0.5) * 20;
      torus.position.z = (Math.random() - 0.5) * 15;
      torus.rotation.x = Math.random() * Math.PI;
      torus.rotation.y = Math.random() * Math.PI;
      
      geometries.push(torus);
      scene.add(torus);
    }

    // Clean lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    // Main light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);
    
    // Accent lights
    const pointLight1 = new THREE.PointLight(0x4169E1, 1, 30);
    pointLight1.position.set(-10, 5, 10);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xFFD700, 0.8, 25);
    pointLight2.position.set(10, -5, 5);
    scene.add(pointLight2);

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

    // Smooth animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime() * 0.5;
      
      // Smooth rotation for success cubes
      geometries.slice(0, 12).forEach((cube, i) => {
        cube.rotation.x += 0.008;
        cube.rotation.y += 0.006;
        // Gentle floating motion
        cube.position.y += Math.sin(time + i * 0.5) * 0.01;
      });
      
      // Gentle floating for knowledge spheres
      geometries.slice(12, 20).forEach((sphere, i) => {
        sphere.position.y += Math.sin(time * 0.8 + i * 0.3) * 0.015;
        sphere.rotation.x += 0.003;
      });
      
      // Smooth rotation for achievement rings
      geometries.slice(20, 24).forEach((torus, i) => {
        torus.rotation.x += 0.005 + (i * 0.001);
        torus.rotation.y += 0.004 + (i * 0.0008);
      });
      
      // Subtle light movement
      pointLight1.position.x = Math.sin(time * 0.3) * 15;
      pointLight2.position.z = Math.cos(time * 0.4) * 10;
      
      // Gentle camera response to mouse
      camera.position.x += (mouseX * 3 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 3 - camera.position.y) * 0.02;
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
      {/* Clean 3D Background Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full -z-10"
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          pointerEvents: 'none',
          opacity: 0.6
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

      {/* ENHANCED 5 KEY BENEFITS SECTION - VERY VISIBLE */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mb-8 p-6 rounded-2xl border-4 border-blue-200 dark:border-blue-800/50 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 shadow-xl"
      >
        <motion.h3 
          className="text-center font-bold text-2xl text-blue-800 dark:text-blue-300 mb-6"
          animate={{ 
            scale: [1, 1.05, 1],
            textShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.5)", "0 0 0px rgba(59, 130, 246, 0)"]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🎯 Five Key Benefits For Your Success 🎯
        </motion.h3>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            { icon: "🏆", label: "Confidence Builder", color: "bg-gradient-to-br from-green-500 to-emerald-600", desc: "Build unshakeable confidence" },
            { icon: "🎓", label: "Exam Success", color: "bg-gradient-to-br from-blue-500 to-blue-700", desc: "Guaranteed exam success" },
            { icon: "⚡", label: "Time Saver", color: "bg-gradient-to-br from-amber-500 to-yellow-600", desc: "Study smarter, not harder" },
            { icon: "🧘", label: "Stress-Free", color: "bg-gradient-to-br from-purple-500 to-purple-700", desc: "Learn without stress" },
            { icon: "😊", label: "Happy Learning", color: "bg-gradient-to-br from-pink-500 to-rose-600", desc: "Enjoy your journey" }
          ].map((benefit, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + idx * 0.1 }}
              whileHover={{ 
                scale: 1.08, 
                y: -8,
                boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
              }}
              whileTap={{ scale: 0.95 }}
              className={`${benefit.color} text-white rounded-xl py-4 px-3 flex flex-col items-center justify-center gap-3 shadow-lg hover:shadow-2xl transition-all duration-300 text-center cursor-pointer`}
            >
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0, -10, 0] 
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: idx * 0.5
                }}
                className="text-3xl md:text-4xl bg-white/20 rounded-full p-3 mb-1"
              >
                {benefit.icon}
              </motion.div>
              <div>
                <span className="font-bold text-lg block">{benefit.label}</span>
                <span className="text-sm opacity-90 block mt-1">{benefit.desc}</span>
              </div>
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
