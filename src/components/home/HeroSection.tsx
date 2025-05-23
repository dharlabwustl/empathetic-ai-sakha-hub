
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';
import HeroContent from './hero/HeroContent';
import PainPoints from './hero/PainPoints';

// Animated 3D Student Avatar Component
const StudentAvatar = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={meshRef} position={[2, 0, -2]}>
      {/* Student Head */}
      <Sphere args={[0.8]} position={[0, 2, 0]}>
        <meshPhongMaterial color="#FFB366" />
      </Sphere>
      
      {/* Happy Eyes */}
      <Sphere args={[0.1]} position={[-0.2, 2.2, 0.7]}>
        <meshPhongMaterial color="#000" />
      </Sphere>
      <Sphere args={[0.1]} position={[0.2, 2.2, 0.7]}>
        <meshPhongMaterial color="#000" />
      </Sphere>
      
      {/* Smile */}
      <Torus args={[0.3, 0.05]} position={[0, 1.8, 0.7]} rotation={[0, 0, Math.PI]}>
        <meshPhongMaterial color="#FF6B6B" />
      </Torus>
      
      {/* Body */}
      <Box args={[1.2, 2, 0.6]} position={[0, 0, 0]}>
        <meshPhongMaterial color="#4ECDC4" />
      </Box>
      
      {/* Success Icons floating around */}
      {[...Array(6)].map((_, i) => (
        <FloatingIcon key={i} index={i} />
      ))}
    </group>
  );
};

// Floating Success Icons
const FloatingIcon = ({ index }: { index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const angle = (index / 6) * Math.PI * 2;
  const radius = 2.5;
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + index * 0.5;
      meshRef.current.position.x = Math.cos(angle + time * 0.5) * radius;
      meshRef.current.position.y = Math.sin(time * 0.8) * 0.5 + 1;
      meshRef.current.position.z = Math.sin(angle + time * 0.5) * radius * 0.5;
      meshRef.current.rotation.y = time;
    }
  });

  const colors = ['#FFD93D', '#6BCF7F', '#4D96FF', '#FF6B6B', '#9B59B6', '#F39C12'];
  
  return (
    <Sphere ref={meshRef} args={[0.15]}>
      <meshPhongMaterial color={colors[index]} emissive={colors[index]} emissiveIntensity={0.3} />
    </Sphere>
  );
};

// Animated Geometric Shapes
const AnimatedShapes = () => {
  const shapes = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (shapes.current) {
      shapes.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={shapes}>
      {/* Floating Cubes */}
      {[...Array(8)].map((_, i) => (
        <FloatingCube key={i} index={i} />
      ))}
      
      {/* Floating Spheres */}
      {[...Array(6)].map((_, i) => (
        <FloatingSphere key={i} index={i} />
      ))}
    </group>
  );
};

const FloatingCube = ({ index }: { index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + index;
      meshRef.current.position.x = Math.sin(time * 0.3) * (5 + index);
      meshRef.current.position.y = Math.cos(time * 0.4) * 3;
      meshRef.current.position.z = Math.sin(time * 0.2) * (3 + index * 0.5);
      meshRef.current.rotation.x = time * 0.5;
      meshRef.current.rotation.y = time * 0.3;
    }
  });

  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'];
  
  return (
    <Box ref={meshRef} args={[0.3, 0.3, 0.3]}>
      <meshPhongMaterial 
        color={colors[index % colors.length]} 
        transparent 
        opacity={0.7}
        emissive={colors[index % colors.length]}
        emissiveIntensity={0.2}
      />
    </Box>
  );
};

const FloatingSphere = ({ index }: { index: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime + index * 0.7;
      meshRef.current.position.x = Math.cos(time * 0.4) * (4 + index * 0.8);
      meshRef.current.position.y = Math.sin(time * 0.6) * 2.5;
      meshRef.current.position.z = Math.cos(time * 0.3) * (2 + index);
    }
  });

  const colors = ['#A8E6CF', '#FFB347', '#87CEEB', '#DDA0DD', '#F0E68C', '#FFA07A'];
  
  return (
    <Sphere ref={meshRef} args={[0.2]}>
      <meshPhongMaterial 
        color={colors[index % colors.length]} 
        transparent 
        opacity={0.8}
        emissive={colors[index % colors.length]}
        emissiveIntensity={0.3}
      />
    </Sphere>
  );
};

// Particle System
const ParticleSystem = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  useEffect(() => {
    if (particlesRef.current) {
      const geometry = new THREE.BufferGeometry();
      const particles = 200;
      const positions = new Float32Array(particles * 3);
      
      for (let i = 0; i < particles * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 20;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particlesRef.current.geometry = geometry;
    }
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <pointsMaterial 
        color="#FFD93D" 
        size={0.05} 
        transparent 
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Enhanced Lighting
const SceneLighting = () => {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1.2} 
        color="#FFE135"
        castShadow
      />
      <pointLight 
        position={[-10, -10, -5]} 
        intensity={0.8} 
        color="#4ECDC4"
      />
      <spotLight
        position={[5, 15, 5]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        color="#FF6B6B"
      />
    </>
  );
};

interface HeroSectionProps {
  handleExamReadinessClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ handleExamReadinessClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Enhanced 3D Background */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
          }}
        >
          <SceneLighting />
          <StudentAvatar />
          <AnimatedShapes />
          <ParticleSystem />
          
          {/* Enhanced fog for depth */}
          <fog attach="fog" args={['#667eea', 15, 25]} />
        </Canvas>
      </div>
      
      {/* Content Container */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Hero Content */}
          <HeroContent handleExamReadinessClick={handleExamReadinessClick} />
          
          {/* Dashboard Preview - Restored to original size */}
          <motion.div 
            className="w-full lg:w-1/2 relative perspective-1000"
            initial={{ opacity: 0, rotateY: 20 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="relative">
              {/* Enhanced 3D Dashboard Frame */}
              <motion.div 
                className="bg-white/10 backdrop-blur-xl rounded-3xl p-2 shadow-2xl border border-white/20 preserve-3d"
                animate={{
                  rotateX: [0, 2, 0, -2, 0],
                  rotateY: [0, 1, 0, -1, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                }}
              >
                <div className="bg-slate-50 rounded-2xl overflow-hidden shadow-inner h-[500px] lg:h-[600px]">
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-700 h-16 flex items-center px-6">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="ml-4 text-white font-semibold">PREP-ZR Dashboard</div>
                  </div>
                  
                  {/* Dashboard Content */}
                  <div className="p-6 space-y-4 h-full overflow-hidden">
                    {/* Header Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { label: "Study Score", value: "94%", color: "bg-green-500" },
                        { label: "Mood", value: "😊 Happy", color: "bg-blue-500" },
                        { label: "Streak", value: "12 days", color: "bg-purple-500" }
                      ].map((stat, idx) => (
                        <motion.div 
                          key={idx}
                          className="bg-white rounded-xl p-3 shadow-md"
                          animate={{ 
                            scale: [1, 1.02, 1],
                            boxShadow: [
                              "0 4px 6px rgba(0, 0, 0, 0.1)",
                              "0 8px 15px rgba(0, 0, 0, 0.2)",
                              "0 4px 6px rgba(0, 0, 0, 0.1)"
                            ]
                          }}
                          transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
                        >
                          <div className={`w-2 h-2 ${stat.color} rounded-full mb-2`}></div>
                          <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                          <div className="text-sm font-bold text-gray-900">{stat.value}</div>
                        </motion.div>
                      ))}
                    </div>
                    
                    {/* Study Plan Section */}
                    <motion.div 
                      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4"
                      animate={{ 
                        background: [
                          "linear-gradient(45deg, #eff6ff, #e0e7ff)",
                          "linear-gradient(45deg, #e0e7ff, #eff6ff)",
                          "linear-gradient(45deg, #eff6ff, #e0e7ff)"
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    >
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        📚 Today's Study Plan
                      </h3>
                      <div className="space-y-2">
                        {[
                          { subject: "Physics", progress: "75%", time: "2h 30m" },
                          { subject: "Chemistry", progress: "60%", time: "1h 45m" },
                          { subject: "Biology", progress: "90%", time: "45m" }
                        ].map((item, idx) => (
                          <motion.div 
                            key={idx} 
                            className="flex items-center justify-between bg-white rounded-lg p-2"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.2 }}
                          >
                            <span className="text-sm font-medium text-gray-700">{item.subject}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                <motion.div 
                                  className="bg-blue-500 h-1.5 rounded-full"
                                  initial={{ width: "0%" }}
                                  animate={{ width: item.progress }}
                                  transition={{ delay: 1 + idx * 0.3, duration: 1 }}
                                />
                              </div>
                              <span className="text-xs text-gray-500">{item.time}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                    
                    {/* AI Suggestions */}
                    <motion.div 
                      className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4"
                      animate={{ 
                        scale: [1, 1.01, 1],
                      }}
                      transition={{ duration: 5, repeat: Infinity }}
                    >
                      <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                        🤖 AI Recommendations
                      </h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                          <span>Take a 15-min break for better focus</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          <span>Review Organic Chemistry concepts</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                          <span>Practice more numerical problems</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Floating Elements around Dashboard */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-70"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.random() * 10 - 5, 0],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Pain Points Section */}
        <PainPoints 
          painPoints={[
            "Feeling overwhelmed by vast syllabus",
            "Struggling with time management", 
            "Lacking personalized guidance",
            "Dealing with exam anxiety",
            "No clear progress tracking"
          ]}
          solutions={[
            "AI-curated personalized study plans",
            "Smart time allocation suggestions",
            "24/7 AI tutor for instant doubt resolution", 
            "Mood-based study recommendations",
            "Real-time progress analytics"
          ]}
        />
      </div>
    </section>
  );
};

export default HeroSection;
