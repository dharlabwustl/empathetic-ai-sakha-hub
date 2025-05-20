
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface ImmersiveBackgroundProps {
  activeSlide: number;
}

const ImmersiveBackground: React.FC<ImmersiveBackgroundProps> = ({ activeSlide }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Colors based on active slide
  const colors = [
    new THREE.Color(0x6D28D9), // purple for JEE
    new THREE.Color(0x8B5CF6), // violet for NEET
    new THREE.Color(0x0EA5E9), // blue for UPSC
  ];

  useEffect(() => {
    if (!containerRef.current) return;

    // Create scene, camera, and renderer if they don't exist
    if (!sceneRef.current) {
      sceneRef.current = new THREE.Scene();
      cameraRef.current = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      rendererRef.current = new THREE.WebGLRenderer({ alpha: true });
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      rendererRef.current.setClearColor(0x000000, 0);
      containerRef.current.appendChild(rendererRef.current.domElement);

      cameraRef.current.position.z = 30;

      // Create particles
      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = 2000;
      
      const positionArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        positionArray[i] = (Math.random() - 0.5) * 100;
        positionArray[i + 1] = (Math.random() - 0.5) * 100;
        positionArray[i + 2] = (Math.random() - 0.5) * 100;
      }
      
      particleGeometry.setAttribute(
        'position',
        new THREE.BufferAttribute(positionArray, 3)
      );
      
      const particleMaterial = new THREE.PointsMaterial({
        size: 0.2,
        transparent: true,
        opacity: 0.8,
        color: colors[0],
        blending: THREE.AdditiveBlending,
      });
      
      particlesRef.current = new THREE.Points(particleGeometry, particleMaterial);
      sceneRef.current.add(particlesRef.current);

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      sceneRef.current.add(ambientLight);

      // Animate function
      const animate = () => {
        requestAnimationFrame(animate);
        
        if (particlesRef.current) {
          particlesRef.current.rotation.x += 0.0005;
          particlesRef.current.rotation.y += 0.001;
        }
        
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      };

      animate();

      // Handle window resize
      const handleResize = () => {
        if (cameraRef.current && rendererRef.current) {
          cameraRef.current.aspect = window.innerWidth / window.innerHeight;
          cameraRef.current.updateProjectionMatrix();
          rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        }
      };

      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        // Clean up the WebGL context when unmounting
        if (rendererRef.current && containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
          rendererRef.current.dispose();
        }
      };
    }
  }, []);

  // Change particle color when active slide changes
  useEffect(() => {
    if (particlesRef.current && particlesRef.current.material instanceof THREE.PointsMaterial) {
      (particlesRef.current.material as THREE.PointsMaterial).color = colors[activeSlide];
    }
  }, [activeSlide, colors]);

  return (
    <>
      {/* 3D Canvas Container */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 -z-10"
        style={{ pointerEvents: 'none' }} // Allow clicks to pass through
      />
      
      {/* Background with 3D depth effect */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/70 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950/50">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
          style={{
            backgroundImage: "linear-gradient(#5c6bc0 1px, transparent 1px), linear-gradient(to right, #5c6bc0 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}>
        </div>
      
        {/* Abstract shapes */}
        <motion.div 
          className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 dark:bg-blue-700/5 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 1.2, 1], 
            x: [0, 30, 0], 
            y: [0, -50, 0] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
        
        <motion.div 
          className="absolute top-40 right-20 w-64 h-64 bg-purple-300/20 dark:bg-purple-700/10 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 0.8, 1], 
            x: [0, -20, 0], 
            y: [0, 20, 0] 
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 2
          }}
        />
      
        <motion.div 
          className="absolute bottom-10 left-1/3 w-96 h-96 bg-indigo-300/20 dark:bg-indigo-600/10 rounded-full mix-blend-multiply filter blur-xl"
          animate={{ 
            scale: [1, 1.1, 1], 
            x: [0, 20, 0], 
            y: [0, 30, 0] 
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 4
          }}
        />
      </div>
    </>
  );
};

export default ImmersiveBackground;
