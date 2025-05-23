
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, Text3D, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import HeroContent from './HeroContent';
import HeroDashboard from './HeroDashboard';

// Enhanced 3D Background with emotionally intelligent elements
const Enhanced3DBackground = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      
      // Interactive movement based on mouse
      groupRef.current.position.x = mousePosition.x * 0.5;
      groupRef.current.position.y = mousePosition.y * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Emotionally intelligent floating elements */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <Sphere args={[0.8, 32, 32]} position={[-4, 2, -3]}>
          <meshPhongMaterial 
            color="#8B5CF6" 
            transparent 
            opacity={0.6}
            emissive="#4C1D95"
            emissiveIntensity={0.3}
          />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
        <Box args={[1.2, 1.2, 1.2]} position={[4, -1, -4]} rotation={[0.5, 0.5, 0]}>
          <meshPhongMaterial 
            color="#3B82F6" 
            transparent 
            opacity={0.7}
            emissive="#1E40AF"
            emissiveIntensity={0.4}
          />
        </Box>
      </Float>

      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.7}>
        <Torus args={[1, 0.4, 16, 100]} position={[2, 3, -5]} rotation={[1, 1, 0]}>
          <meshPhongMaterial 
            color="#06B6D4" 
            transparent 
            opacity={0.5}
            emissive="#0891B2"
            emissiveIntensity={0.5}
          />
        </Torus>
      </Float>

      {/* Brain-like neural network connections */}
      {Array.from({ length: 15 }, (_, i) => (
        <Float key={i} speed={1 + i * 0.1} rotationIntensity={0.2} floatIntensity={0.4}>
          <Sphere 
            args={[0.1 + Math.random() * 0.2, 8, 8]} 
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 8,
              -8 + Math.random() * 4
            ]}
          >
            <meshPhongMaterial 
              color={`hsl(${240 + Math.random() * 60}, 70%, 60%)`}
              transparent 
              opacity={0.4 + Math.random() * 0.3}
              emissive={`hsl(${240 + Math.random() * 60}, 50%, 30%)`}
              emissiveIntensity={0.6}
            />
          </Sphere>
        </Float>
      ))}

      {/* Exam success symbols */}
      <Float speed={2.2} rotationIntensity={0.6} floatIntensity={0.9}>
        <Box args={[0.6, 0.6, 0.6]} position={[-3, -2, -2]} rotation={[0.8, 0.8, 0]}>
          <meshPhongMaterial 
            color="#10B981" 
            transparent 
            opacity={0.8}
            emissive="#059669"
            emissiveIntensity={0.4}
          />
        </Box>
      </Float>

      <Float speed={1.7} rotationIntensity={0.5} floatIntensity={0.6}>
        <Sphere args={[0.5, 16, 16]} position={[3, 1, -6]}>
          <meshPhongMaterial 
            color="#F59E0B" 
            transparent 
            opacity={0.7}
            emissive="#D97706"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </Float>

      {/* Ambient lighting for emotional depth */}
      <ambientLight intensity={0.4} color="#E0E7FF" />
      <pointLight position={[10, 10, 10]} intensity={1.2} color="#8B5CF6" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#3B82F6" />
      <spotLight 
        position={[0, 20, 10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1.5} 
        color="#06B6D4"
        castShadow 
      />
    </group>
  );
};

const HeroSection = () => {
  const [showExamAnalyzer, setShowExamAnalyzer] = useState(false);

  const handleExamReadinessClick = () => {
    setShowExamAnalyzer(true);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 overflow-hidden">
      {/* Enhanced vibrant 3D background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          style={{ background: 'transparent' }}
        >
          <Enhanced3DBackground />
        </Canvas>
      </div>

      {/* Vibrant gradient overlays for emotional depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/15 to-indigo-600/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/10 to-purple-600/20 z-10" />
      
      {/* Animated particles for emotional intelligence */}
      <div className="absolute inset-0 z-10">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.6, 1, 0.6],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content with enhanced text styling */}
      <div className="relative z-20 container mx-auto px-4 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 min-h-[80vh]">
          {/* Enhanced Hero Content with better text-background integration */}
          <div className="w-full lg:w-1/2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Text shadow backdrop for better readability */}
              <div className="absolute inset-0 bg-white/10 dark:bg-gray-900/20 backdrop-blur-sm rounded-3xl -z-10 border border-white/20" />
              
              <HeroContent handleExamReadinessClick={handleExamReadinessClick} />
            </motion.div>
          </div>

          {/* Enhanced Dashboard Preview */}
          <div className="w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              {/* Enhanced glow effect for dashboard */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 via-blue-500/20 to-indigo-500/30 rounded-3xl blur-3xl -z-10 animate-pulse" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-3xl -z-10 border border-white/30" />
              
              <HeroDashboard />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced ambient lighting effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse z-5" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse z-5" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl animate-pulse z-5" style={{ animationDelay: '4s' }} />
    </section>
  );
};

export default HeroSection;
